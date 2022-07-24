import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {NHCTextTypes} from '../enums';
import {NHCText, NHCPrimaryHeader} from '../components';
import {getScaledNumber} from '../library/utils';
import colors from '../res/colors';
import moment from 'moment';

const startOfMonth = moment()
  .clone()
  .startOf('month')
  .format('YYYY-MM-DDTHH:mm:ssZ');
const endOfMonth = moment()
  .clone()
  .endOf('month')
  .format('YYYY-MM-DDTHH:mm:ssZ');
const BASE_URL = 'http://192.168.1.102:5000';
const Work = () => {
  const user = useSelector(state => state?.user?.user);

  const downloadPDF = async () => {
    try {
    } catch (err) {}
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
          <NHCText label="PAYMENT" type={NHCTextTypes.H4} bold />
        </View>
      </View>

      <View style={styles.commonContent}>
        <TouchableOpacity style={styles.commonContainer} onPress={downloadPDF}>
          <NHCText
            label="Generate Invoice (Fortnite)"
            type={NHCTextTypes.H4}
            bold
            style={styles.commonTextstyle}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.commonContainer}>
          <NHCText
            label="Send Invoice (Fortnite)"
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
    backgroundColor: colors.primary,
    shadowColor: colors.shadowBlack,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
    marginTop: getScaledNumber(20),
    borderRadius: getScaledNumber(25),
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

export default Work;
