import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {NHCTextTypes} from '../enums';
import {setRegiserDetails} from '../actions/user.actions';
import {useDispatch, useSelector} from 'react-redux';
import {NHCText, NHCHeader, NHCInput, NHCButton} from '../components';
import {getScaledNumber, SCREEN_HEIGHT} from '../library/utils';
import {SIGN_IN_SCREEN, SIGN_UP_SCREEN_3} from '../common/constants';
import {showMessage, hideMessage} from 'react-native-flash-message';

import colors from '../res/colors';

const SignUpScreen2 = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [emergencyContact, setEmergencyContact] = useState(String);
  const [address, setAddress] = useState(String);
  const [nameOfBank, setNameOfBank] = useState(String);
  const [accountNumber, setAccountNumber] = useState(String);
  const [abn, setAbn] = useState(String);
  const [bsb, setBsb] = useState(String);

  const isButtonDisabled =
    address.length === 0 ||
    emergencyContact.length === 0 ||
    accountNumber.length === 0 ||
    abn.length === 0 ||
    bsb.length === 0 ||
    nameOfBank.length === 0;

  const onSubmit = () => {
    const invalidEmergencyNumber = !emergencyContact.match(
      /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g,
    );

    if (invalidEmergencyNumber) {
      showMessage({
        message: 'Warning',
        description: 'Please enter valid phone number',
        type: 'warning',
      });
    } else {
      dispatch(
        setRegiserDetails({
          address,
          emergencyContact,
          accountNumber,
          abn,
          bsb,
          nameOfBank,
        }),
      );
      navigation.navigate(SIGN_UP_SCREEN_3);
    }
  };
  return (
    <NHCHeader disableBottomPadding safeAreaStyle={styles.headerStyle}>
      <View style={styles.topContent} />
      <View style={styles.container}>
        <View>
          <View style={styles.inputContent}>
            <NHCText label=" Sign Up" type={NHCTextTypes.H1} />

            <NHCInput
              setState={setAddress}
              value={address}
              placeholder="Address"
              style={styles.inputStyle}
            />
            <NHCInput
              setState={setEmergencyContact}
              value={emergencyContact}
              placeholder="Emergency Number"
              style={styles.inputStyle}
            />
            <NHCInput
              setState={setNameOfBank}
              value={nameOfBank}
              placeholder="Bank Name"
              style={styles.inputStyle}
            />
            <NHCInput
              setState={setAccountNumber}
              value={accountNumber}
              placeholder="Account Number"
              style={styles.inputStyle}
            />
            <NHCInput
              setState={setAbn}
              value={abn}
              placeholder="ABN"
              style={styles.inputStyle}
            />
            <NHCInput
              setState={setBsb}
              value={bsb}
              placeholder="BSB"
              style={styles.inputStyle}
            />
          </View>
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
    marginTop: getScaledNumber(20),
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

export default SignUpScreen2;
