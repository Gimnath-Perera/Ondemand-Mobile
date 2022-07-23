import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {NHCTextTypes} from '../enums';
import {NHCText, NHCHeader, NHCH, NHCButton, NHCInput} from '../components';
import {getScaledNumber, SCREEN_HEIGHT} from '../library/utils';
import {AUTH_ROUTES, SIGN_UP_SCREEN_1} from '../common/constants';
import colors from '../res/colors';
import {forgotPassword} from '../actions/user.actions';
import {useDispatch, useSelector} from 'react-redux';
import {showMessage, hideMessage} from 'react-native-flash-message';

import ForgotPasswordLogo from '../res/images/forgotPasswordLogo.svg';

const SignInScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState(String);

  const onSubmit = () => {
    dispatch(
      forgotPassword(
        {email},
        () => {
          showMessage({
            message: 'Success',
            description: 'Email has been sent',
            type: 'success',
          });
          // navigation.navigate(AUTH_ROUTES, {screen: HOME_SCREEN});
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
        <View>
          <View style={styles.inputContent}>
            <NHCText
              label="Forgot Password?"
              type={NHCTextTypes.H1}
              // style={styles.signInText}
            />
            <NHCText
              label="Dont worry! We will help you reset your password!"
              type={NHCTextTypes.H4}
              style={styles.hintText}
            />
            {/* <ForgotPasswordLogo/> */}
            <NHCInput
              value={email}
              setState={setEmail}
              placeholder="Email Address"
              style={styles.inputStyle}
            />
          </View>
        </View>

        <View style={styles.bottomContent}>
          <NHCButton onPress={onSubmit} label="SUBMIT" />
          <View style={styles.bottomTextContent}>
            <NHCText label="Don’t have an account?" type={NHCTextTypes.HINT} />
            <TouchableOpacity
              onPress={() => navigation.navigate(SIGN_UP_SCREEN_1)}>
              <NHCText
                label=" Sign Up"
                type={NHCTextTypes.HINT}
                style={styles.signInText}
              />
            </TouchableOpacity>
          </View>
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
    marginVertical: getScaledNumber(20),
    justifyContent: 'space-around',
  },
  hintText: {
    paddingHorizontal: getScaledNumber(30),
    textAlign: 'center',
    marginTop: getScaledNumber(10),
    color: colors.darkGray,
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
  forgotText: {
    color: colors.secondary,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: getScaledNumber(20),
  },
  inputStyle: {
    marginTop: getScaledNumber(90),
  },
  bottomTextContent: {
    alignItems: 'center',
    marginTop: getScaledNumber(20),
    justifyContent: 'center',
    flexDirection: 'row',
  },
  inputContent: {
    // justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: getScaledNumber(40),
    paddingHorizontal: getScaledNumber(15),
    paddingVertical: getScaledNumber(30),
    width: '100%',
    backgroundColor: colors.white,
    shadowColor: '#171717',
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

export default SignInScreen;
