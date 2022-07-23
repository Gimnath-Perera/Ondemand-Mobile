import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {NHCTextTypes} from '../enums';
import {NHCText, NHCPrimaryHeader, NHCButton} from '../components';
import {getScaledNumber} from '../library/utils';
import {
  SIGN_IN_SCREEN,
  SIGN_UP_SCREEN_1,
  SIGN_UP_SCREEN_5,
} from '../common/constants';
import colors from '../res/colors';
import {checkStatus} from '../actions/user.actions';
import {showMessage, hideMessage} from 'react-native-flash-message';
import moment from 'moment';

const Review = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userId = useSelector(state => state?.user?.userId);
  const refreshToken = useSelector(state => state?.auth?.refreshToken);
  const authToken = useSelector(state => state?.auth?.token);

  const [status, setStatus] = useState(String);

  useEffect(() => {
    dispatch(
      checkStatus(
        {userId},
        data => {
          setStatus(data.status);
        },
        () => {
          showMessage({
            message: 'Error',
            description: 'Something went wrong',
            type: 'danger',
          });
        },
      ),
    );
  });

  return (
    <NHCPrimaryHeader disableBottomPadding containerStyle={styles.container}>
      <View style={styles.userInfoContainer}>
        <View style={styles.statusContent}>
          <NHCText label={status} type={NHCTextTypes.H4} bold />
        </View>
      </View>

      <View style={{flex: 1}}>
        <View style={styles.descriptionContent}>
          <NHCText
            label="Thank you!
          We have received your registration form. Once the submitted information is reviewd you will hear back from us. Approximately this process will take up to 5 business days."
            type={NHCTextTypes.H4}
            style={styles.description}
          />
        </View>
      </View>
      {status === 'Pending' && (
        <NHCButton
          onPress={() => navigation.navigate(SIGN_UP_SCREEN_5)}
          label="Upload Files"
          style={styles.btnStyle}
        />
      )}

      <NHCButton
        onPress={() => navigation.navigate(SIGN_IN_SCREEN)}
        label="Sign In"
        style={styles.btnStyle}
      />
      <NHCButton
        onPress={() => navigation.navigate(SIGN_UP_SCREEN_1)}
        label="Sign Up"
        style={styles.btnStyle}
      />
    </NHCPrimaryHeader>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: getScaledNumber(40),
  },
  descriptionContent: {
    width: '80%',
    backgroundColor: colors.white,
    paddingHorizontal: getScaledNumber(40),
    paddingVertical: getScaledNumber(20),
    borderRadius: getScaledNumber(20),
    shadowColor: colors.shadowBlack,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
  },
  description: {
    textAlign: 'center',
    lineHeight: getScaledNumber(23),
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
  btnStyle: {
    width: '60%',
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

export default Review;
