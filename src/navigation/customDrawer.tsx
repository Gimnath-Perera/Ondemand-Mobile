import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../res/colors';
import {NHCText} from '../components';
import {useDispatch} from 'react-redux';

import {setUserLoggedOut} from '../actions/user.actions';

import HeaderLogo from '../res/images/headerLogo.svg';
import SignOutIcon from '../res/images/signOut.svg';

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
