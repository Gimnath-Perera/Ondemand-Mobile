import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import {NHCTextTypes} from '../enums';
import {useSelector} from 'react-redux';
import {NHCText, NHCPrimaryHeader} from '../components';
import {getScaledNumber} from '../library/utils';
import colors from '../res/colors';

const Emergency = () => {
  const user = useSelector(state => state?.user?.user);

  const dialCall = number => {
    console.log('ooo');
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
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
          <NHCText label="EMERGENCY" type={NHCTextTypes.H4} bold />
        </View>
      </View>

      <View style={styles.commonContent}>
        <TouchableOpacity
          onPress={() => {
            dialCall('000');
          }}
          style={styles.commonContainer}>
          <NHCText
            label="Medical Assist"
            type={NHCTextTypes.H4}
            bold
            style={styles.commonTextstyle}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            dialCall('000');
          }}
          style={styles.commonContainer}>
          <NHCText
            label="Police"
            type={NHCTextTypes.H4}
            bold
            style={styles.commonTextstyle}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            dialCall('000');
          }}
          style={styles.commonContainer}>
          <NHCText
            label="Fire"
            type={NHCTextTypes.H4}
            bold
            style={styles.commonTextstyle}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            dialCall('1300 908 120');
          }}
          style={styles.commonContainer}>
          <NHCText
            label="Management"
            type={NHCTextTypes.H4}
            bold
            style={styles.commonTextstyle}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dialCall('0400870148');
          }}
          style={styles.commonContainer}>
          <NHCText
            label="My HR"
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
    backgroundColor: '#fd9116',
    shadowColor: colors.shadowBlack,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    marginTop: getScaledNumber(20),
    borderRadius: getScaledNumber(5),
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

export default Emergency;
