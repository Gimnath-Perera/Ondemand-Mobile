import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, Platform, TextInput} from 'react-native';
import {NHCTextTypes} from '../enums';
import {
  NHCText,
  NHCPrimaryHeader,
  NHCButton,
  NHCModal,
  ShiftCalander,
} from '../components';
import {getScaledNumber, SCREEN_WIDTH} from '../library/utils';
import {
  getUserJobs,
  setCurrentJob,
  endCurrentJob,
} from '../actions/user.actions';
import {useDispatch, useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import RNPickerSelect from 'react-native-picker-select';

import colors from '../res/colors';

const TimeCaptureScreen = () => {
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const userJobs = useSelector(state => state?.user?.jobs);
  const user = useSelector(state => state?.user?.user);
  const userId = useSelector(state => state?.user?.user?._id);
  const currentJobDetails = useSelector(state => state?.user?.currentJob);

  const [userJob, setUserJob] = useState(null);
  const [comment, setComment] = useState(null);
  const [currentJobShifts, setCurrentJobShifts] = useState([]);
  const [userJobsArray, setUserJobsArray] = useState([]);
  const [locationDetails, setLocationDetails] = useState();
  const [modalVisible, setModalVsible] = useState(false);
  const [timeSlotModalVisible, setTimeSlotModalVisible] = useState(false);

  const visiblePicker =
    userJobsArray?.length !== 0 && currentJobDetails?.startTime === undefined;
  const isShiftVisible = userJob === null || userJob === undefined;
  const isStartVisible = userJob === null || userJob === undefined;

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 150000,
    })
      .then(location => {
        setLocationDetails(location);
        mapRef.current.animateToRegion(location, 3 * 1000);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }, []);
  useEffect(() => {
    dispatch(getUserJobs());
  }, []);
  useEffect(() => {
    if (userJobs.length !== 0) {
      const jobList = userJobs.map(singleJob => ({
        label: singleJob.name,
        value: singleJob.id,
        shifts: singleJob.workers?.[0]?.shifts,
      }));

      setUserJobsArray(jobList);
    }
  }, [userJobs]);

  useEffect(() => {
    if (userJob) {
      const _selectedJob = userJobsArray.filter(job => job.value == userJob);
      setCurrentJobShifts(_selectedJob?.[0]?.shifts);
    }
  }, [userJob]);

  const endJob = () => {
    const jobId = currentJobDetails.id;
    const data = {
      location: {
        type: 'Point',
        coordinates: [locationDetails?.longitude, locationDetails?.latitude],
      },
      comment: comment,
    };
    dispatch(
      endCurrentJob(
        {data, jobId},
        () => {
          setModalVsible(false);
          setUserJob(null);
          showMessage({
            message: 'Success',
            description: 'Job is completed!',
            type: 'success',
          });
        },
        error => {
          showMessage({
            message: 'Error',
            description: error.message,
            type: 'danger',
          });
        },
      ),
    );
  };

  const submit = () => {
    const data = {
      job: userJob,
      worker: userId,
      location: {
        type: 'Point',
        coordinates: [locationDetails?.longitude, locationDetails?.latitude],
      },
    };

    dispatch(
      setCurrentJob(
        data,
        () => {
          setModalVsible(false);
          showMessage({
            message: 'Success',
            description: 'Job is started!',
            type: 'success',
          });
        },
        error => {
          showMessage({
            message: 'Error',
            description: error.message,
            type: 'danger',
          });
        },
      ),
    );
  };

  const shiftModal = () => (
    <>
      <View style={styles.modalContent}>
        {currentJobDetails !== null && (
          <TextInput
            placeholderTextColor={colors.darkGray}
            style={styles.inputStyle}
            onChangeText={setComment}
            value={comment}
            placeholder="Subject here...."
            underlineColorAndroid="transparent"
          />
        )}
        {currentJobDetails?.startTime ? (
          <NHCButton
            onPress={endJob}
            style={styles.shiftBtn}
            label="End Shift"
          />
        ) : (
          <NHCButton
            onPress={submit}
            style={styles.shiftBtn}
            label="Start Shift"
          />
        )}
      </View>
      <View style={styles.optionContent}>
        <NHCButton
          onPress={() => setModalVsible(false)}
          label="Close"
          style={styles.closeBtn}
        />
      </View>
    </>
  );

  const closeShiftModal = () => {
    setTimeSlotModalVisible(false);
  };

  return (
    <NHCPrimaryHeader
      enableDrawer
      backKey
      disableBottomPadding
      containerStyle={styles.container}>
      <View style={styles.userInfoContainer}>
        <NHCText label="Welcome" type={NHCTextTypes.H3} bold />
        <NHCText label={`${user?.fullName}`} type={NHCTextTypes.H1} bold />

        <View style={styles.statusContent}>
          <NHCText label="TIME CAPTURE" type={NHCTextTypes.H4} bold />
        </View>
      </View>

      <View style={styles.mapContent}>
        {locationDetails && (
          <MapView
            ref={mapRef}
            style={{flex: 1, marginBottom: 10}}
            showsUserLocation={true}
            provider={PROVIDER_GOOGLE}
            followsUserLocation={true}
            initialRegion={{
              latitude: locationDetails?.latitude,
              longitude: locationDetails?.longitude,
              latitudeDelta: 0.0041,
              longitudeDelta: 0.0021,
            }}
          />
        )}
      </View>

      {visiblePicker && (
        <RNPickerSelect
          useNativeAndroidPickerStyle={false}
          fixAndroidTouchableBug={true}
          placeholder={{label: 'Select Job'}}
          onValueChange={job => setUserJob(job)}
          items={userJobsArray}
          style={pickerSelectStyles}
        />
      )}

      {currentJobDetails?.startTime !== undefined && (
        <NHCText
          label={`Shift Started at : ${currentJobDetails?.startTime}`}
          type={NHCTextTypes.H3}
          bold
        />
      )}

      <NHCButton
        onPress={() => setTimeSlotModalVisible(true)}
        label={'Show Shifts'}
        style={styles.btnStyle}
        disabled={isShiftVisible}
      />
      {currentJobDetails?.startTime ? (
        <NHCButton
          onPress={() => setModalVsible(true)}
          label={'End Shift'}
          style={styles.btnStyle}
        />
      ) : (
        <NHCButton
          onPress={() => setModalVsible(true)}
          label={'Start Shift'}
          style={styles.btnStyle}
          disabled={isStartVisible}
        />
      )}

      <NHCModal
        contentStyle={styles.modalContentStyle}
        modalVisible={modalVisible}>
        {shiftModal()}
      </NHCModal>
      <NHCModal
        contentStyle={styles.modalContentStyle}
        modalVisible={timeSlotModalVisible}>
        <ShiftCalander shifts={currentJobShifts} onClose={closeShiftModal} />
      </NHCModal>
    </NHCPrimaryHeader>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: getScaledNumber(20),
  },
  slotHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginBottom: getScaledNumber(12),
  },
  slotsContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginBottom: getScaledNumber(8),
  },
  shiftBtn: {
    width: '60%',
  },
  submitBtn: {backgroundColor: colors.lightBlue, width: '30%'},
  closeBtn: {backgroundColor: '#ff7b7b', width: '50%'},
  modalContent: {
    width: '80%',
    alignItems: 'center',
  },
  modalContentStyle: {
    alignItems: 'center',
    paddingVertical: getScaledNumber(40),
  },
  btnStyle: {width: '60%', marginTop: getScaledNumber(10)},
  mapContent: {flex: 1, width: '90%'},
  userInfoContainer: {
    backgroundColor: colors.primary,
    width: '100%',
    paddingHorizontal: getScaledNumber(20),
    paddingBottom: getScaledNumber(20),
    borderBottomLeftRadius: getScaledNumber(40),
    borderBottomRightRadius: getScaledNumber(40),

    marginBottom: getScaledNumber(20),
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  statusContent: {
    backgroundColor: colors.white,
    width: '40%',
    padding: getScaledNumber(10),
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: getScaledNumber(10),
    borderRadius: getScaledNumber(20),
  },
  inputStyle: {
    padding: getScaledNumber(10),
    width: '90%',
    backgroundColor: colors.lightDarkGray,
    color: colors.darkGray,
    marginVertical: getScaledNumber(20),
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    fontSize: 20,
    backgroundColor: 'lightblue',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    paddingHorizontal: 15,
    marginTop: getScaledNumber(20),
    height: getScaledNumber(40),
    width: SCREEN_WIDTH * 0.6,
    paddingVertical: Platform.OS === 'ios' ? 10 : 1,
    backgroundColor: colors.darkGray,
    flexDirection: 'row',
    color: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
  },
  inputAndroid: {
    paddingHorizontal: 15,
    marginTop: getScaledNumber(20),
    height: getScaledNumber(40),
    width: SCREEN_WIDTH * 0.8,
    paddingVertical: Platform.OS === 'ios' ? 16 : 1,
    backgroundColor: colors.darkGray,
    flexDirection: 'row',
    color: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
  },
  viewContainer: {
    alignItems: 'center',
  },
  placeholder: {
    color: colors.white,
    fontWeight: '700',
  },
});
export default TimeCaptureScreen;
