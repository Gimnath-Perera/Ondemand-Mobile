import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';

import {NHCTextTypes} from '../enums';
import {NHCText, NHCPrimaryHeader} from '../components';
import {getScaledNumber} from '../library/utils';
import {
  GUIDE_SCREEN,
  EMERGENCY_SCREEN,
  WORK_ROUTES,
  HR_SCREEN,
  LEAVE_SCREEN,
  TIME_CAPTURE_SCREEN,
} from '../common/constants';
import colors from '../res/colors';
import TimeIcon from '../res/images/timeMenuIcon.svg';
import HRIcon from '../res/images/paymentMenuIcon.svg';
import LeaveIcon from '../res/images/messageMenuIcon.svg';
import WorkIcon from '../res/images/workMenuIcon.svg';
import EmergencyIcon from '../res/images/emergencyMenuIcon2.svg';
import GuideIcon from '../res/images/guideMenuIcon.svg';

const Home = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state?.user?.user);
  return (
    <NHCPrimaryHeader
      enableDrawer
      disableBottomPadding
      containerStyle={styles.container}>
      <View style={styles.userInfoContainer}>
        <NHCText label="Welcome" type={NHCTextTypes.H3} />
        <NHCText label={`${user?.fullName}`} type={NHCTextTypes.H1} bold />

        <View style={styles.statusContent}>
          <NHCText label="ACTIVE" type={NHCTextTypes.H4} bold />
        </View>
      </View>

      <View style={styles.menuContent}>
        <View style={styles.commonRow}>
          <TouchableOpacity
            onPress={() => navigation.navigate(TIME_CAPTURE_SCREEN)}
            style={styles.tile}>
            <TimeIcon></TimeIcon>
            <NHCText
              label="TIME"
              type={NHCTextTypes.TINY}
              bold
              style={styles.tileText}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tile}
            onPress={() => navigation.navigate(EMERGENCY_SCREEN)}>
            <EmergencyIcon />
            <NHCText
              label="EMERGENCY"
              type={NHCTextTypes.TINY}
              bold
              style={styles.tileText}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.commonRow}>
          <TouchableOpacity
            style={styles.tile}
            onPress={() => navigation.navigate(WORK_ROUTES)}>
            <WorkIcon />
            <NHCText
              label="WORK"
              type={NHCTextTypes.TINY}
              bold
              style={styles.tileText}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(HR_SCREEN)}
            style={styles.tile}>
            <LeaveIcon />
            <NHCText
              label="MESSAGES"
              type={NHCTextTypes.TINY}
              bold
              style={styles.tileText}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.commonRow}>
          <TouchableOpacity
            onPress={() => navigation.navigate(GUIDE_SCREEN)}
            style={styles.tile}>
            <GuideIcon></GuideIcon>
            <NHCText
              label="GUIDE"
              type={NHCTextTypes.TINY}
              bold
              style={styles.tileText}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tile}
            onPress={() => navigation.navigate(HR_SCREEN)}>
            <HRIcon />
            <NHCText
              label="PAYMENTS"
              type={NHCTextTypes.TINY}
              bold
              style={styles.tileText}
            />
          </TouchableOpacity>
        </View>
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
  commonRow: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: getScaledNumber(20),
  },
  tile: {
    borderRadius: getScaledNumber(8),
    height: getScaledNumber(80),
    width: getScaledNumber(80),
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: getScaledNumber(5),
    backgroundColor: colors.white,
    shadowColor: colors.shadowBlack,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
  },
  menuContent: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tileText: {
    marginTop: getScaledNumber(3),
    color: colors.darkGray,
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
    marginBottom: getScaledNumber(10),
  },
});

export default Home;
