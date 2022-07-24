import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Colors from '../res/colors';
import WelcomeScreen from '../screens/welcome.screen';
import SignUpScreen1 from '../screens/signUp.screen1';
import SignUpScreen2 from '../screens/signUp.screen2';
import SignUpScreen3 from '../screens/signUp.screen3';
import SignUpScreen4 from '../screens/signUp.screen4';
import SignUpScreen5 from '../screens/signUp.screen5';
import SignUpScreen6 from '../screens/signUp.screen6';
import SignInScreen from '../screens/signIn.screen';
import ReviewScreen from '../screens/review.screen';
import ForgotPassword from '../screens/forgotPassword';
import HomeScreen from '../screens/home.screen';
import EmergencyScreen from '../screens/emergency.screen';
import WorkScreen from '../screens/work.screen';
import MessengerScreen from '../screens/messenger.screen';
import CurrentJobScreen from '../screens/currentJob.screen';
import CompletedRecordScreen from '../screens/completedRecord.screen';
import UserProfileScreen from '../screens/userProfile.screen';
import GuideScreen from '../screens/guide.screen';
import LeaveScreen from '../screens/leave.screen';
import TimeCaptureScreen from '../screens/timeCapture.screen';
import PaymentScreen from '../screens/payment.screen';

import {
  HOME_SCREEN,
  FORGOT_PASSWORD_SCREEN,
  REVIEW_SCREEN,
  SIGN_UP_SCREEN_1,
  SIGN_UP_SCREEN_6,
  SIGN_UP_SCREEN_3,
  SIGN_UP_SCREEN_2,
  SIGN_UP_SCREEN_5,
  SIGN_UP_SCREEN_4,
  HR_SCREEN,
  TAB_ROUTES,
  DRAWER_ROUTES,
  SIGN_IN_SCREEN,
  WELCOME_SCREEN,
  USER_PROFILE_SCREEN,
  HOME_ROUTES,
  EMERGENCY_SCREEN,
  WORK_SCREEN,
  WORK_ROUTES,
  CURRENT_JOB_SCREEN,
  GUIDE_SCREEN,
  TIME_CAPTURE_SCREEN,
  LEAVE_SCREEN,
  COMPLETED_RECORD_SCREEN,
  PAYMENT_SCREEN,
} from '../common/constants';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomeSideMenu from './customDrawer';

import HomeTab from '../res/images/homeTab.svg';
import FocusedHomeTab from '../res/images/focusedHomeTab.svg';
import UserTab from '../res/images/userTab.svg';
import FocusedUserTab from '../res/images/focusedUserTab.svg';

import UserIcon from '../res/images/userDrawerIcon.svg';
import HomeIcon from '../res/images/homeDrawerIcon.svg';
import WorkIcon from '../res/images/workDrawerIcon.svg';
import EmergencyIcon from '../res/images/emergencyDrawerIcon.svg';
import HRIcon from '../res/images/hrDrawerIcon.svg';
import GuideIcon from '../res/images/guideDrawerIcon.svg';
import LeaveIcon from '../res/images/leaveDrawerIcon.svg';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const NHCTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.backgroundColor,
  },
};

const drawerItemStyle = {
  // borderWidth: 1,
  borderColor: Colors.lightSilver,
};

const drawerItmLabelStyle = {
  fontFamily: 'Raleway-Medium',
};

const WorkRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={WORK_SCREEN}>
      <Stack.Screen name={WORK_SCREEN} component={WorkScreen} />
      <Stack.Screen name={CURRENT_JOB_SCREEN} component={CurrentJobScreen} />
      <Stack.Screen
        name={COMPLETED_RECORD_SCREEN}
        component={CompletedRecordScreen}
      />
    </Stack.Navigator>
  );
};

const HomeRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={HOME_SCREEN}>
      <Stack.Screen name={HOME_SCREEN} component={HomeScreen} />
      <Stack.Screen name={EMERGENCY_SCREEN} component={EmergencyScreen} />
      <Stack.Screen name={HR_SCREEN} component={MessengerScreen} />
      <Stack.Screen name={GUIDE_SCREEN} component={GuideScreen} />
      <Stack.Screen name={WORK_ROUTES} component={WorkRoutes} />
      <Stack.Screen name={LEAVE_SCREEN} component={LeaveScreen} />
      <Stack.Screen name={TIME_CAPTURE_SCREEN} component={TimeCaptureScreen} />
    </Stack.Navigator>
  );
};

const DrawerNavigator = props => {
  return (
    <Drawer.Navigator
      useLegacyImplementation={false}
      screenOptions={{
        headerStyle: {backgroundColor: Colors.white},
        // headerTitle: 'Profile',
        headerShown: false,
        swipeEnabled: false,
      }}
      drawerContent={props => <CustomeSideMenu {...props} />}>
      <Drawer.Screen
        name={TAB_ROUTES}
        component={TabNavigator}
        options={{
          drawerIcon: () => <HomeIcon />,
          drawerLabel: 'Home',
          drawerLabelStyle: drawerItmLabelStyle,
          drawerItemStyle: drawerItemStyle,
          drawerActiveTintColor: Colors.primary,
        }}
      />
      <Drawer.Screen
        name={EMERGENCY_SCREEN}
        component={EmergencyScreen}
        options={{
          drawerIcon: () => <EmergencyIcon />,
          drawerLabel: 'Emergency',
          drawerLabelStyle: drawerItmLabelStyle,
          drawerItemStyle: drawerItemStyle,
          drawerActiveTintColor: Colors.primary,
        }}
      />
      <Drawer.Screen
        name={HR_SCREEN}
        component={MessengerScreen}
        options={{
          drawerIcon: () => <HRIcon />,
          drawerLabel: 'Messages',
          drawerLabelStyle: drawerItmLabelStyle,
          drawerItemStyle: drawerItemStyle,
          drawerActiveTintColor: Colors.primary,
        }}
      />
      <Drawer.Screen
        name={GUIDE_SCREEN}
        component={GuideScreen}
        options={{
          drawerIcon: () => <GuideIcon />,
          drawerLabel: 'Guide',
          drawerLabelStyle: drawerItmLabelStyle,
          drawerItemStyle: drawerItemStyle,
          drawerActiveTintColor: Colors.primary,
        }}
      />
      <Drawer.Screen
        name={WORK_ROUTES}
        component={WorkRoutes}
        options={{
          drawerIcon: () => <WorkIcon />,
          drawerLabel: 'Work',
          drawerLabelStyle: drawerItmLabelStyle,
          drawerItemStyle: drawerItemStyle,
          drawerActiveTintColor: Colors.primary,
        }}
      />
      {/* <Drawer.Screen
        name={LEAVE_SCREEN}
        component={LeaveScreen}
        options={{
          drawerIcon: () => <LeaveIcon />,
          drawerLabel: 'Leave',
          drawerLabelStyle: drawerItmLabelStyle,
          drawerItemStyle: drawerItemStyle,
          drawerActiveTintColor: Colors.primary,
        }}
      /> */}
      <Drawer.Screen
        name={PAYMENT_SCREEN}
        component={PaymentScreen}
        options={{
          drawerIcon: () => <LeaveIcon />,
          drawerLabel: 'Payment',
          drawerLabelStyle: drawerItmLabelStyle,
          drawerItemStyle: drawerItemStyle,
          drawerActiveTintColor: Colors.primary,
        }}
      />
    </Drawer.Navigator>
  );
};
const TabNavigator = props => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <FocusedHomeTab /> : <HomeTab />,
        }}
        name={HOME_ROUTES}
        component={HomeRoutes}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <FocusedUserTab /> : <UserTab />,
        }}
        name={USER_PROFILE_SCREEN}
        component={UserProfileScreen}
      />
    </Tab.Navigator>
  );
};

const AppRoutes = () => {
  const isUserLogged = useSelector(state => state?.user?.isUserLogged);

  return (
    <NavigationContainer theme={NHCTheme}>
      {isUserLogged ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name={DRAWER_ROUTES} component={DrawerNavigator} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={WELCOME_SCREEN}>
          <Stack.Screen name={WELCOME_SCREEN} component={WelcomeScreen} />
          <Stack.Screen name={SIGN_UP_SCREEN_1} component={SignUpScreen1} />
          <Stack.Screen name={SIGN_UP_SCREEN_2} component={SignUpScreen2} />
          <Stack.Screen name={SIGN_UP_SCREEN_3} component={SignUpScreen3} />
          <Stack.Screen name={SIGN_UP_SCREEN_4} component={SignUpScreen4} />
          <Stack.Screen name={SIGN_UP_SCREEN_5} component={SignUpScreen5} />
          <Stack.Screen name={SIGN_UP_SCREEN_6} component={SignUpScreen6} />
          <Stack.Screen name={SIGN_IN_SCREEN} component={SignInScreen} />
          <Stack.Screen name={REVIEW_SCREEN} component={ReviewScreen} />
          <Stack.Screen
            name={FORGOT_PASSWORD_SCREEN}
            component={ForgotPassword}
          />

          {/* <Stack.Screen name={AUTH_ROUTES} component={HomeRoutes} /> */}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppRoutes;
