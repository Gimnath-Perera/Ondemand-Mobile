import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import {NHCTextTypes} from '../enums';
import {NHCText, NHCHeader, NHCInput, NHCButton} from '../components';
import {getScaledNumber, SCREEN_HEIGHT, SCREEN_WIDTH} from '../library/utils';
import {SIGN_UP_SCREEN_6} from '../common/constants';
import {setRegiserDetails} from '../actions/user.actions';
import {useDispatch, useSelector} from 'react-redux';
import UploadIcon from '../res/images/uploadIcon.svg';
import RNPickerSelect from 'react-native-picker-select';
import {launchImageLibrary} from 'react-native-image-picker';

import colors from '../res/colors';

const SignUpScreen2 = () => {
  const navigation = useNavigation();
  const [userType, setUserType] = useState(String);
  const [file, setFile] = useState(null);

  const chooseFile = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      selectionLimit: 1,
    };
    try {
      const {assets} = await launchImageLibrary(options);

      const data = {
        uri: assets[0].uri,
        name: assets[0].fileName,
        type: assets[0].type,
      };
      setFile(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NHCHeader disableBottomPadding safeAreaStyle={styles.headerStyle}>
      <View style={styles.topContent} />
      <View style={styles.container}>
        <View style={styles.inputContent}>
          <NHCText label=" Sign Up" type={NHCTextTypes.H1} />
          <NHCText
            label="Photo ID type"
            type={NHCTextTypes.BODY_SMALL}
            style={styles.dateOfBirthText}
          />

          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            fixAndroidTouchableBug={true}
            onValueChange={type => setUserType(type)}
            items={[
              {label: 'Proof of ID', value: 'proofOfId'},
              {label: 'Driving License', value: 'Driving liscense'},
            ]}
            style={pickerSelectStyles}
          />
          <NHCInput
            placeholder="License / ID number"
            style={styles.inputStyle}
          />
          <NHCText
            label="Upload Image"
            type={NHCTextTypes.H4}
            style={styles.uploadImageText}
            bold
          />
          <TouchableOpacity
            style={styles.uploadContent}
            onPress={() => chooseFile('photo')}>
            <UploadIcon />
            <NHCText
              label={file === null ? 'Upload Image' : 'Uploaded'}
              type={NHCTextTypes.H4}
              style={styles.uploadImageText}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomContent}>
          <NHCButton
            onPress={() =>
              navigation.navigate(SIGN_UP_SCREEN_6, {idPhoto: file})
            }
            label="Next"
          />
          <NHCButton onPress={() => navigation.goBack()} label="Back" />
        </View>
      </View>
    </NHCHeader>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: getScaledNumber(30),
    marginBottom: getScaledNumber(40),
    marginTop: SCREEN_HEIGHT * 0.1,
    justifyContent: 'space-between',
  },
  uploadContent: {
    flexDirection: 'row',
    marginTop: getScaledNumber(20),
    width: '95%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  uploadImageText: {
    alignSelf: 'flex-start',
    marginTop: getScaledNumber(20),
  },
  dateOfBirthText: {
    alignSelf: 'flex-start',
    marginTop: getScaledNumber(40),
    marginBottom: getScaledNumber(20),
  },
  topContent: {
    backgroundColor: colors.primary,
    position: 'absolute',
    width: '100%',
    zIndex: -1,
    right: 0,
    left: 0,
    top: 0,
    height: SCREEN_HEIGHT * 0.3,
    borderBottomLeftRadius: getScaledNumber(30),
    borderBottomRightRadius: getScaledNumber(30),
  },
  headerStyle: {
    backgroundColor: colors.primary,
  },
  bottomContent: {
    width: '100%',
  },
  terms: {
    color: colors.darkGray,
    textAlign: 'center',
    marginTop: getScaledNumber(20),
  },
  inputStyle: {
    marginTop: getScaledNumber(30),
  },
  bottomTextContent: {
    alignItems: 'center',
    marginBottom: getScaledNumber(20),
    justifyContent: 'center',
    flexDirection: 'row',
  },
  inputContent: {
    // justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: getScaledNumber(30),
    paddingHorizontal: getScaledNumber(15),
    paddingVertical: getScaledNumber(30),
    width: '100%',
    backgroundColor: colors.white,
    shadowColor: colors.shadowBlack,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
  },
  signInText: {
    fontWeight: '700',
    color: colors.secondary,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    paddingHorizontal: 19,
    height: getScaledNumber(45),
    width: SCREEN_WIDTH * 0.76,
    paddingVertical: Platform.OS === 'ios' ? 12 : 1,
    backgroundColor: colors.lightDarkGray,
    flexDirection: 'row',
    color: colors.darkGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  inputAndroid: {
    paddingHorizontal: 19,
    height: getScaledNumber(45),
    width: SCREEN_WIDTH * 0.8,
    paddingVertical: Platform.OS === 'ios' ? 16 : 1,
    backgroundColor: colors.lightDarkGray,
    flexDirection: 'row',
    color: colors.darkGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  viewContainer: {
    alignItems: 'center',
  },
  placeholder: {
    color: colors.darkGray,
  },
});

export default SignUpScreen2;
