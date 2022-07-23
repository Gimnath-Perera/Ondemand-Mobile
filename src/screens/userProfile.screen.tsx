import React, {useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {NHCTextTypes} from '../enums';
import {NHCText, NHCPrimaryHeader} from '../components';
import {getScaledNumber} from '../library/utils';
import colors from '../res/colors';
import moment from 'moment';
import {launchImageLibrary} from 'react-native-image-picker';
import Avatar from '../res/images/avatar.svg';
import {uploadProfilePic} from '../actions/user.actions';
import {showMessage} from 'react-native-flash-message';

const BASE_URL = 'http://192.168.1.102:5000';

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state?.user?.user);
  const picId = useSelector(state => state?.user?.user?.profPic);

  const age = moment().diff(user?.dob, 'years');
  const userId = useSelector(state => state?.user?.user?._id);

  const chooseFile = async type => {
    const data = new FormData();
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      selectionLimit: 1,
    };
    try {
      const {assets} = await launchImageLibrary(options);

      const imageData = {
        uri: assets[0].uri,
        name: assets[0].fileName,
        type: assets[0].type,
      };

      data.append('files', imageData);

      data.append('owner', userId);

      dispatch(
        uploadProfilePic(
          data,
          () => {
            showMessage({
              message: 'Success',
              description: 'Profile picture uploaded succesfully',
              type: 'success',
            });
          },
          data => {
            showMessage({
              message: 'Error',
              description: 'Something went Wrong',
              type: 'danger',
            });
          },
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NHCPrimaryHeader
      enableDrawer
      disableBottomPadding
      containerStyle={styles.container}>
      <View style={styles.userInfoContainer}>
        <NHCText label="Welcome" type={NHCTextTypes.H3} bold />
        <NHCText label={`${user?.fullName}`} type={NHCTextTypes.H1} bold />

        <View style={styles.statusContent}>
          <NHCText label="ACTIVE" type={NHCTextTypes.H4} bold />
        </View>
      </View>

      <View style={styles.userDetails}>
        {picId === null ? (
          <Avatar />
        ) : (
          <Image
            style={styles.stretch}
            source={{
              uri: `${BASE_URL}/v1/documents/prof-pic/${picId}`,
            }}
          />
        )}

        <TouchableOpacity style={styles.uploadBtn} onPress={chooseFile}>
          <NHCText
            label="Change picture"
            type={NHCTextTypes.H4}
            style={styles.uploadBtntxt}
          />
        </TouchableOpacity>
        <NHCText
          label={user?.userType}
          type={NHCTextTypes.H4}
          style={styles.commonTextstyle}
        />

        <NHCText
          label={`Age : ${age}`}
          type={NHCTextTypes.H4}
          style={styles.age}
        />
        {/* <NHCText
          label="VID Number :  638372"
          type={NHCTextTypes.H4}
          style={styles.commonTextstyle}
        />
        <NHCText
          label="Employee ID : 28"
          type={NHCTextTypes.H4}
          style={styles.commonTextstyle}
        />
        <NHCText
          label="Working Since : 15-OCT-2020"
          type={NHCTextTypes.H4}
          style={styles.commonTextstyle}
        /> */}
      </View>
    </NHCPrimaryHeader>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // paddingHorizontal: getScaledNumber(30),
    paddingBottom: getScaledNumber(40),
    //justifyContent: 'flex-end',
  },
  stretch: {
    width: 100,
    height: 100,
    resizeMode: 'stretch',
  },
  commonTextstyle: {
    marginTop: getScaledNumber(10),
    fontWeight: '700',
  },
  uploadBtntxt: {
    color: colors.white,
    fontWeight: '700',
  },
  uploadBtn: {
    backgroundColor: colors.secondary,
    padding: getScaledNumber(7),
    justifyContent: 'center',
    borderRadius: getScaledNumber(5),
    alignItems: 'center',
    marginTop: getScaledNumber(16),
  },
  age: {
    marginTop: getScaledNumber(16),
    fontWeight: '700',
  },
  userDetails: {
    paddingVertical: getScaledNumber(30),
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    shadowColor: colors.shadowBlack,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
    borderRadius: getScaledNumber(15),
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

export default UserProfile;
