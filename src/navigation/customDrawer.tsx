import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
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

const CustomDrawer = props => {
  const dispatch = useDispatch();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <HeaderLogo />
      </View>
      <DrawerItemList {...props} />
      <TouchableOpacity
        style={styles.bottomCategory}
        onPress={() => dispatch(setUserLoggedOut())}>
        <SignOutIcon />
        <NHCText label="SIGN OUT" bold style={styles.mainCategoryText} />
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: getScaledNumber(50),
    marginHorizontal: getScaledNumber(10),
    // alignItems: 'center',
  },
  bottomCategory: {
    // backgroundColor: Colors.lightSilver,
    padding: getScaledNumber(12),
    borderRadius: getScaledNumber(5),
    marginHorizontal: getScaledNumber(10),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: getScaledNumber(30),
    marginBottom: getScaledNumber(10),
    borderColor: Colors.lightSilver,
  },
  mainCategoryText: {
    paddingLeft: getScaledNumber(18),
    color: Colors.darkGray,
  },
  headerContainer: {
    marginBottom: getScaledNumber(20),
    alignItems: 'center',
  },
});

export default CustomDrawer;
