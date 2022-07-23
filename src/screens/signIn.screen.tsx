import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {NHCTextTypes} from '../enums';
import {NHCText, NHCHeader, NHCInput, NHCButton} from '../components';
import {getScaledNumber, SCREEN_HEIGHT} from '../library/utils';
import {FORGOT_PASSWORD_SCREEN, SIGN_UP_SCREEN_1} from '../common/constants';
import {userLogin} from '../actions/user.actions';
import {useDispatch} from 'react-redux';
import {showMessage} from 'react-native-flash-message';

import colors from '../res/colors';

const SignInScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState(String);
  const [password, setPassword] = useState(String);

  const onSubmit = () => {
    dispatch(
      userLogin(
        {email, password},
        () => {
          showMessage({
            message: 'Login',
            description: 'Success',
            type: 'success',
          });
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
              label=" Sign In"
              type={NHCTextTypes.H1}
              // style={styles.signInText}
            />
            <NHCInput
              setState={setEmail}
              value={email}
              placeholder="Email Address"
              style={styles.inputStyle}
            />
            <NHCInput
              setState={setPassword}
              value={password}
              isPassword
              placeholder="Password"
              style={styles.inputStyle}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate(FORGOT_PASSWORD_SCREEN)}>
              <NHCText
                style={styles.forgotText}
                type={NHCTextTypes.HINT}
                label="Forgot your password?"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomContent}>
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

          <NHCButton onPress={onSubmit} label="SIGN IN" />
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

export default SignInScreen;
