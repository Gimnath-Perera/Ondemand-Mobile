import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Platform, View, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {NHCTextTypes} from '../enums';
import moment from 'moment';
import {setRegiserDetails} from '../actions/user.actions';
import {NHCText, NHCHeader, NHCButton} from '../components';
import {getScaledNumber, SCREEN_HEIGHT} from '../library/utils';
import {SIGN_UP_SCREEN_4} from '../common/constants';
import colors from '../res/colors';
import DatePicker from 'react-native-date-picker';
import {showMessage} from 'react-native-flash-message';

const SignUpScreen3 = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [dob, setDob] = useState(new Date());
  const [open, setOpen] = useState(false);

  const onSubmit = () => {
    const years = moment().diff(dob, 'years');
    if (years > 18) {
      dispatch(setRegiserDetails({dob: moment(dob).format('YYYY-MM-DD')}));
      navigation.navigate(SIGN_UP_SCREEN_4);
    } else {
      showMessage({
        message: 'Warning',
        description: 'Age must be at least 18 years',
        type: 'warning',
      });
    }
  };

  return (
    <NHCHeader disableBottomPadding safeAreaStyle={styles.headerStyle}>
      <View style={styles.topContent} />
      <View style={styles.container}>
        <View style={styles.inputContent}>
          <NHCText label=" Sign Up" type={NHCTextTypes.H1} />

          <NHCText
            label="Date of Birth"
            type={NHCTextTypes.BODY_SMALL}
            style={styles.dateOfBirthText}
          />

          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={styles.pickerButton}>
            <NHCText label={dob.toDateString()} style={styles.dobText} />
          </TouchableOpacity>

          <DatePicker
            modal
            open={open}
            mode="date"
            date={dob}
            onConfirm={date => {
              setOpen(false);
              setDob(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>

        <View style={styles.bottomContent}>
          <NHCButton onPress={onSubmit} label="Next" />
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
    color: colors.darkGray,
  },
  dateOfBirthText: {
    alignSelf: 'flex-start',
    marginTop: getScaledNumber(40),
    marginBottom: getScaledNumber(20),
  },
  pickerButton: {
    paddingHorizontal: 19,
    height: getScaledNumber(40),
    width: '100%',
    paddingVertical: Platform.OS === 'ios' ? 10 : 1,
    backgroundColor: colors.lightDarkGray,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray,
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

export default SignUpScreen3;
