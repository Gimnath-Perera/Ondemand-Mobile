import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useSelector, RootStateOrAny} from 'react-redux';

import {NHCTextTypes} from '../enums';
import {NHCText, NHCHeader, NHCButton} from '../components';
import {getScaledNumber} from '../library/utils';
import {SIGN_UP_SCREEN_1, REVIEW_SCREEN} from '../common/constants';
import colors from '../res/colors';
import WelcomeLogo from '../res/images/headerLogo.svg';

type Nav = {
  navigate: (value: string) => void;
};

const Welcome = () => {
  const userId = useSelector(({user}: RootStateOrAny) => user?.userId);

  const {navigate} = useNavigation<Nav>();

  const onSubmit = () => {
    if (userId !== null) {
      navigate(REVIEW_SCREEN);
    } else {
      navigate(SIGN_UP_SCREEN_1);
    }
  };

  return (
    <NHCHeader containerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <WelcomeLogo />
      </View>
      <NHCButton onPress={onSubmit} label="Let’s Get Started" />
      <View style={styles.bottomTextContent}>
        <NHCText label="Already have an account?" type={NHCTextTypes.HINT} />
        <TouchableOpacity onPress={onSubmit}>
          <NHCText
            label=" Sign In?"
            type={NHCTextTypes.HINT}
            style={styles.signInText}
          />
        </TouchableOpacity>
      </View>
    </NHCHeader>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: getScaledNumber(30),
    marginVertical: getScaledNumber(20),
    justifyContent: 'flex-end',
  },
  bottomTextContent: {
    alignItems: 'center',
    marginTop: getScaledNumber(30),
    justifyContent: 'center',
    flexDirection: 'row',
  },
  logoContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: getScaledNumber(250),
    // paddingLeft: getScaledNumber(50),
    // paddingRight: getScaledNumber(50),
  },
  signInText: {
    fontWeight: '700',
    color: colors.secondary,
  },
});

export default Welcome;
