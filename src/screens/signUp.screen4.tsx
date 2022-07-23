import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Platform, View} from 'react-native';
import {NHCTextTypes} from '../enums';
import {NHCText, NHCHeader, NHCButton} from '../components';
import {getScaledNumber, SCREEN_HEIGHT, SCREEN_WIDTH} from '../library/utils';
import {REVIEW_SCREEN} from '../common/constants';
import colors from '../res/colors';
import {setRegiserDetails, userRegister} from '../actions/user.actions';
import {useDispatch} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import {showMessage} from 'react-native-flash-message';

const SignUpScreen4 = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [userType, setUserType] = useState(String);
  const [gender, setGender] = useState(String);

  const isButtonDisabled =
    userType?.length === 0 ||
    userType === null ||
    gender?.length === 0 ||
    gender === null;

  const onSubmit = () => {
    dispatch(setRegiserDetails({userType, gender}));
    dispatch(
      userRegister(
        {},
        () => {
          navigation.navigate(REVIEW_SCREEN);
        },
        data => {
          showMessage({
            message: 'Error',
            description: data.message,
            type: 'danger',
          });
        },
      ),
    );
  };

  return (
    <NHCHeader disableBottomPadding safeAreaStyle={styles.headerStyle}>
      <View style={styles.topContent} />
      <View style={styles.container}>
        <View style={styles.inputContent}>
          <NHCText label=" Sign Up" type={NHCTextTypes.H1} />

          <NHCText
            label="Applying as"
            type={NHCTextTypes.BODY_SMALL}
            style={styles.dateOfBirthText}
          />

          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            fixAndroidTouchableBug={true}
            onValueChange={type => setUserType(type)}
            items={[
              {label: 'Driver', value: 'Driver'},
              {label: 'Car Cleaner', value: 'Car Cleaner'},
              {label: 'Other', value: 'Other'},
            ]}
            style={pickerSelectStyles}
          />

          <NHCText
            label="Select your gender"
            type={NHCTextTypes.BODY_SMALL}
            style={styles.dateOfBirthText}
          />

          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            fixAndroidTouchableBug={true}
            onValueChange={gender => setGender(gender)}
            items={[
              {label: 'Male', value: 'M'},
              {label: 'Female', value: 'F'},
            ]}
            style={pickerSelectStyles}
          />
        </View>

        <View style={styles.bottomContent}>
          <NHCButton
            disabled={isButtonDisabled}
            onPress={onSubmit}
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
  dobText: {
    color: colors.white,
  },
  dateOfBirthText: {
    alignSelf: 'flex-start',
    marginTop: getScaledNumber(20),
    marginBottom: getScaledNumber(10),
  },
  picker: {
    width: '100%',
    height: getScaledNumber(20),
    backgroundColor: colors.secondary,
  },
  pickerButton: {
    paddingHorizontal: 19,
    height: getScaledNumber(55),
    width: '100%',
    paddingVertical: Platform.OS === 'ios' ? 16 : 1,
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    // borderColor: colors.gray,
    borderRadius: 30,
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
    height: getScaledNumber(40),
    width: SCREEN_WIDTH * 0.7,
    paddingVertical: Platform.OS === 'ios' ? 10 : 1,
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

export default SignUpScreen4;
