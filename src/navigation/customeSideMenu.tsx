import React from 'react';
import {SafeAreaView, View, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../res/colors';
import {NHCText} from '../components';
import {NHCTextTypes} from '../enums';
import {useDispatch, useSelector} from 'react-redux';

import {setUserLoggedOut} from '../actions/user.actions';

import UserIcon from '../res/images/userDrawerIcon.svg';
import HeaderLogo from '../res/images/headerLogo.svg';
import HomeIcon from '../res/images/homeDrawerIcon.svg';
import WorkIcon from '../res/images/workDrawerIcon.svg';
import EmergencyIcon from '../res/images/emergencyDrawerIcon.svg';
import HRIcon from '../res/images/hrDrawerIcon.svg';
import GuideIcon from '../res/images/guideDrawerIcon.svg';
import LeaveIcon from '../res/images/leaveDrawerIcon.svg';
import SignOutIcon from '../res/images/signOut.svg';

import {
  WORK_ROUTES,
  HR_SCREEN,
  WORK_SCREEN,
  HOME_SCREEN,
  USER_PROFILE_SCREEN,
  EMERGENCY_SCREEN,
  GUIDE_SCREEN,
  LEAVE_SCREEN,
  SIGN_IN_SCREEN,
} from '../common/constants';
import {getScaledNumber} from '../library/utils';

const CustomSidebarMenu = ({navigation}) => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <HeaderLogo />
        <TouchableOpacity
          style={styles.topCategory}
          onPress={() => navigation.navigate(HOME_SCREEN)}>
          <HomeIcon />
          <NHCText label="Home" bold style={styles.mainCategoryText} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mainCategory}
          onPress={() => navigation.navigate(USER_PROFILE_SCREEN)}>
          <UserIcon />
          <NHCText label="Profile" bold style={styles.mainCategoryText} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mainCategory}
          onPress={() =>
            navigation.navigate(WORK_ROUTES, {screen: WORK_SCREEN})
          }>
          <WorkIcon />
          <NHCText label="Work" bold style={styles.mainCategoryText} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mainCategory}
          onPress={() => navigation.navigate(HR_SCREEN)}>
          <HRIcon />
          <NHCText label="My HR" bold style={styles.mainCategoryText} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mainCategory}
          onPress={() => navigation.navigate(GUIDE_SCREEN)}>
          <GuideIcon />
          <NHCText label="Guide" bold style={styles.mainCategoryText} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mainCategory}
          onPress={() => navigation.navigate(LEAVE_SCREEN)}>
          <LeaveIcon />
          <NHCText label="Leave" bold style={styles.mainCategoryText} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mainCategory}
          onPress={() => navigation.navigate(EMERGENCY_SCREEN)}>
          <EmergencyIcon />
          <NHCText label="Emergency" bold style={styles.mainCategoryText} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomCategory}
          onPress={() => dispatch(setUserLoggedOut())}>
          <SignOutIcon />
          <NHCText label="SIGN OUT" bold style={styles.mainCategoryText} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: getScaledNumber(50),
    marginHorizontal: getScaledNumber(20),
    alignItems: 'center',
  },
  topCategory: {
    // backgroundColor: Colors.lightSilver,
    padding: getScaledNumber(15),
    borderRadius: getScaledNumber(5),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getScaledNumber(10),
    marginTop: getScaledNumber(30),
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.lightSilver,
  },
  mainCategory: {
    // backgroundColor: Colors.lightSilver,
    padding: getScaledNumber(12),
    borderRadius: getScaledNumber(5),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getScaledNumber(10),
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.lightSilver,
  },
  bottomCategory: {
    // backgroundColor: Colors.lightSilver,
    padding: getScaledNumber(12),
    borderRadius: getScaledNumber(5),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: getScaledNumber(30),
    marginBottom: getScaledNumber(10),
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.lightSilver,
  },
  mainCategoryText: {
    paddingLeft: getScaledNumber(18),
    color: Colors.darkGray,
  },
  subCategoryText: {
    color: Colors.darkGray,
    paddingLeft: getScaledNumber(18),
  },
  subCategory: {
    paddingHorizontal: getScaledNumber(14),
    paddingVertical: getScaledNumber(8),
    borderRadius: getScaledNumber(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomSidebarMenu;
