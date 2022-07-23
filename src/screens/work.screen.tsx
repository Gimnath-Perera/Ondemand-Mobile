import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {NHCTextTypes} from '../enums';
import {NHCText, NHCPrimaryHeader} from '../components';
import {getScaledNumber} from '../library/utils';
import {CURRENT_JOB_SCREEN, COMPLETED_RECORD_SCREEN} from '../common/constants';
import colors from '../res/colors';
import {getCompletedRecordsByUser, getJobTypes} from '../actions/user.actions';
import {showMessage, hideMessage} from 'react-native-flash-message';
import moment from 'moment';

const startOfMonth = moment()
  .clone()
  .startOf('month')
  .format('YYYY-MM-DDTHH:mm:ssZ');
const endOfMonth = moment()
  .clone()
  .endOf('month')
  .format('YYYY-MM-DDTHH:mm:ssZ');

const Work = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [jobs, setJobs] = useState([]);
  const user = useSelector(state => state?.user?.user);

  const getCurrentJobs = status => {
    dispatch(
      getJobTypes(
        {status},
        data => {
          setJobs(data);

          navigation.navigate(CURRENT_JOB_SCREEN, {status, data});
        },
        () => {
          showMessage({
            message: 'Error',
            description: 'Something went Wrong',
            type: 'danger',
          });
        },
      ),
    );
  };

  const getCompletedRecords = status => {
    const payload = {
      limit: 1000,
      sortBy: 'createdAt:desc',
      page: 1,
      status: 'Completed',
      startDate: moment(startOfMonth).format('YYYY-MM-DD'),
      endDate: moment(endOfMonth).format('YYYY-MM-DD'),
    };
    dispatch(
      getCompletedRecordsByUser(
        payload,
        list => {
          navigation.navigate(COMPLETED_RECORD_SCREEN, {list, status});
        },
        () => {
          showMessage({
            message: 'Error',
            description: 'Something went Wrong',
            type: 'danger',
          });
        },
      ),
    );
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
          <NHCText label="WORK" type={NHCTextTypes.H4} bold />
        </View>
      </View>

      <View style={styles.commonContent}>
        <TouchableOpacity
          style={styles.commonContainer}
          onPress={() => getCurrentJobs('Active')}>
          <NHCText
            label="Active Jobs"
            type={NHCTextTypes.H4}
            bold
            style={styles.commonTextstyle}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => getCompletedRecords('Completed')}
          style={styles.commonContainer}>
          <NHCText
            label="Completed Records"
            type={NHCTextTypes.H4}
            bold
            style={styles.commonTextstyle}
          />
        </TouchableOpacity>
      </View>
    </NHCPrimaryHeader>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: getScaledNumber(40),
  },
  commonTextstyle: {
    color: colors.white,
  },
  commonContent: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  age: {
    marginTop: getScaledNumber(16),
  },
  commonContainer: {
    paddingVertical: getScaledNumber(13),
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    shadowColor: colors.shadowBlack,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
    marginTop: getScaledNumber(20),
    borderRadius: getScaledNumber(25),
  },
  tileText: {
    marginTop: getScaledNumber(3),
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

  userInfoContainer: {
    backgroundColor: colors.primary,
    width: '100%',
    paddingHorizontal: getScaledNumber(20),
    paddingBottom: getScaledNumber(20),
    borderBottomLeftRadius: getScaledNumber(40),
    borderBottomRightRadius: getScaledNumber(40),

    marginBottom: getScaledNumber(20),
  },
});

export default Work;
