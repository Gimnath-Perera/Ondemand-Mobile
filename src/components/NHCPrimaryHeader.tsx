import React, {ReactChild, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {CricantoTextTypes} from '../enums';
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Image,
  StyleProp,
  TextStyle,
  ScrollView,
} from 'react-native';
import colors from '../res/colors';
import {getScaledNumber} from '../library/utils';
import DrawerIcon from '../res/images/DrawerIcon.svg';
import LeftArrow from '../res/images/LeftArrow.svg';
import CricantoText from './cricantoText';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderLogo from '../res/images/headerLogo.svg';
import {DrawerActions} from '@react-navigation/native';

const NHCPrimaryHeader = ({
  headerTitle,
  headerStyle,
  RightIcon,
  onPress,
  safeAreaStyle,
  enableDrawer,
  containerStyle,
  backKey,
  rightIconAction,
  disableBottomPadding,
  headerTitleStyle,
  children,
  isScrollView,
  autoScroll,
}: IProps) => {
  const navigation = useNavigation();
  const scrollViewRef = useRef();
  return (
    <>
      <SafeAreaView
        edges={
          disableBottomPadding
            ? ['top', 'right', 'left']
            : ['top', 'bottom', 'right', 'left']
        }
        style={[styles.safeAreaContainer, safeAreaStyle]}>
        <View style={[styles.headerContainer, headerStyle]}>
          {enableDrawer ? (
            <TouchableOpacity
              style={styles.headerBtn}
              onPress={
                backKey
                  ? () => navigation?.goBack()
                  : () => navigation.dispatch(DrawerActions.toggleDrawer())
              }>
              {backKey ? <LeftArrow /> : <DrawerIcon />}
            </TouchableOpacity>
          ) : (
            <View />
          )}
          <View style={styles.headerLogo}>
            <HeaderLogo />
          </View>
        </View>

        {isScrollView ? (
          <ScrollView
            style={styles.container}
            ref={scrollViewRef}
            onContentSizeChange={() =>
              autoScroll && scrollViewRef.current.scrollToEnd({animated: true})
            }
            contentContainerStyle={[containerStyle]}>
            {children}
          </ScrollView>
        ) : (
          <View style={[styles.container, containerStyle]}>{children}</View>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  headerLogo: {
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: getScaledNumber(25),
    paddingVertical: getScaledNumber(33),
    borderRadius: getScaledNumber(140),
    marginTop:
      Platform.OS === 'android' ? getScaledNumber(-70) : getScaledNumber(-70),
    marginRight:
      Platform.OS === 'android' ? getScaledNumber(-10) : getScaledNumber(-20),
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop:
      Platform.OS === 'android' ? getScaledNumber(20) : getScaledNumber(0),
  },
  headerContainer: {
    flexDirection: 'row',
    //paddingHorizontal: getScaledNumber(20),
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleStyle: {
    fontWeight: '500',
  },
  headerBtn: {
    width: getScaledNumber(30),
    height: getScaledNumber(30),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: getScaledNumber(20),
  },
  btnText: {
    fontWeight: '700',
    fontSize: 16,
    color: colors.white,
  },
});

export interface IProps {
  RightIcon?: Image;
  disableBottomPadding?: boolean;
  enableDrawer?: boolean;
  safeAreaStyle?: StyleProp<TextStyle>;
  headerStyle?: StyleProp<TextStyle>;
  headerTitleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<TextStyle>;
  headerTitle?: string;
  backKey?: boolean;
  onPress?: Function;
  children?: any;
  rightIconAction?: any;
  isScrollView?: boolean;
  autoScroll?: false;
}

export default NHCPrimaryHeader;
