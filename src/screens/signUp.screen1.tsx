import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View, TouchableOpacity} from 'react-native';

import {NHCTextTypes} from '../enums';
import {useDispatch} from 'react-redux';
import {setRegiserDetails, checkEmail} from '../actions/user.actions';
import {NHCText, NHCHeader, NHCInput, NHCButton} from '../components';
import {getScaledNumber, SCREEN_HEIGHT} from '../library/utils';
import {SIGN_IN_SCREEN, SIGN_UP_SCREEN_2} from '../common/constants';
import colors from '../res/colors';
import {showMessage} from 'react-native-flash-message';

type Nav = {
  navigate: (value: string) => void;
};

const SignUpScreen1 = () => {
  const {navigate} = useNavigation<Nav>();

  const dispatch = useDispatch();

  const [fullName, setFullName] = useState(String);
  const [email, setEmail] = useState(String);
  const [password, setPassword] = useState(String);
  const [nationality, setNationality] = useState(String);
  const [phoneNumber, setPhoneNumber] = useState(String);

  const isButtonDisabled =
    fullName.length === 0 ||
    email.length === 0 ||
    password.length === 0 ||
    phoneNumber.length === 0 ||
    nationality.length === 0;

  const onSubmit = () => {
    const invalidPhoneNumber = !phoneNumber.match(
      /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g,
    );
    if (invalidPhoneNumber) {
      return showMessage({
        message: 'Warning',
        description: 'Please enter valid phone number',
        type: 'warning',
      });
    }
    dispatch(
      checkEmail(
        {email},
        () => {
          dispatch(
            setRegiserDetails({
              email,
              password,
              fullName,
              nationality,
              phoneNumber,
            }),
          );
          navigate(SIGN_UP_SCREEN_2);
        },
        (data: {message: any}) => {
          showMessage({
            message: 'Warning',
            description: data.message,
            type: 'warning',
          });
        },
      ),
    );
  };

  return (
    <NHCHeader
      isScrollView
      disableBottomPadding
      safeAreaStyle={styles.headerStyle}>
      <View style={styles.topContent} />
      <View style={styles.container}>
        <View>
          <View style={styles.inputContent}>
            <NHCText label=" Sign Up" type={NHCTextTypes.H1} />
            <NHCInput
              setState={setFullName}
              value={fullName}
              placeholder="Full Name"
              style={styles.inputStyle}
            />

            <NHCInput
              setState={setPassword}
              value={password}
              isPassword
              placeholder="Password"
              style={styles.inputStyle}
            />
            <NHCInput
              setState={setEmail}
              value={email}
              placeholder="Email"
              style={styles.inputStyle}
            />

            <NHCInput
              setState={setPhoneNumber}
              value={phoneNumber}
              placeholder="Phone Number"
              style={styles.inputStyle}
            />

            <NHCInput
              setState={setNationality}
              value={nationality}
              placeholder="Nationality"
              style={styles.inputStyle}
            />
          </View>

          <NHCText
            style={styles.terms}
            type={NHCTextTypes.HINT}
            label="by signing up you are agreeing to our Terms and Conditions, and Privacy Policy "
          />
        </View>
        <View style={styles.bottomContent}>
          <View style={styles.bottomTextContent}>
            <NHCText
              label="Already have an account?"
              type={NHCTextTypes.HINT}
            />
            <TouchableOpacity onPress={() => navigate(SIGN_IN_SCREEN)}>
              <NHCText
                label=" Sign In?"
                type={NHCTextTypes.HINT}
                style={styles.signInText}
              />
            </TouchableOpacity>
          </View>

          <NHCButton
            disabled={isButtonDisabled}
            onPress={onSubmit}
            label="Next"
          />
        </View>
      </View>
    </NHCHeader>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 13,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: '100%',
    marginVertical: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: getScaledNumber(30),
    marginBottom: getScaledNumber(40),
    marginTop: SCREEN_HEIGHT * 0.1,
    justifyContent: 'space-between',
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

export default SignUpScreen1;
