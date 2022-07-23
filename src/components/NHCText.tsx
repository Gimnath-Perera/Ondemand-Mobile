import React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';

import {NHCTextTypes} from '../enums';
import colors from '../res/colors';
import {getScaledNumber} from '../library/utils';

const NHCText = ({label, bold, type, style}: IProps) => {
  const getStyle = () => {
    if (type === NHCTextTypes.DISPLAY) return styles.display;
    if (type === NHCTextTypes.H1) return styles.headerOne;
    if (type === NHCTextTypes.H2) return styles.headerTwo;
    if (type === NHCTextTypes.H3) return styles.headerThree;
    if (type === NHCTextTypes.H4) return styles.headerFour;
    if (type === NHCTextTypes.CUSTOM) return styles.custom;
    if (type === NHCTextTypes.SUBTITLE) return styles.subtitle;
    if (type === NHCTextTypes.BODY_SMALL) return styles.bodySmall;
    if (type === NHCTextTypes.EYEBROW) return styles.eyebrow;
    if (type === NHCTextTypes.BUTTON_LBL) return styles.buttonLbl;
    if (type === NHCTextTypes.HINT) return styles.hint;
    if (type === NHCTextTypes.ERROR) return styles.error;
    if (type === NHCTextTypes.TINY) return styles.tiny;
    return styles.default;
  };

  return (
    <Text
      allowFontScaling={false}
      style={[getStyle(), bold && styles.bold, style]}>
      {label}
    </Text>
  );
};

const styles = StyleSheet.create({
  display: {
    fontSize: getScaledNumber(40),
    color: colors.lightBlack,
    fontFamily: 'Raleway-Medium',
  },
  default: {
    fontSize: getScaledNumber(13),
    color: colors.lightBlack,
    fontFamily: 'Raleway-Medium',
  },
  headerOne: {
    fontSize: getScaledNumber(28),
    color: colors.lightBlack,
    fontFamily: 'Raleway-Medium',
  },
  headerTwo: {
    fontSize: getScaledNumber(24),
    color: colors.lightBlack,
    fontFamily: 'Raleway-Medium',
  },
  headerThree: {
    fontSize: getScaledNumber(20),
    color: colors.lightBlack,
    fontFamily: 'Raleway-Medium',
  },
  headerFour: {
    fontSize: getScaledNumber(14),
    color: colors.lightBlack,
    fontFamily: 'Raleway-Medium',
  },
  custom: {
    fontSize: getScaledNumber(16),
    color: colors.lightBlack,
    fontFamily: 'Raleway-Medium',
  },
  subtitle: {
    fontSize: getScaledNumber(18),
    color: colors.lightBlack,
    fontFamily: 'Raleway-Medium',
  },
  bodySmall: {
    fontSize: getScaledNumber(16),
    color: colors.lightBlack,
    fontFamily: 'Raleway-Medium',
    weight: '400',
  },
  eyebrowThin: {
    fontSize: getScaledNumber(12),
    color: colors.lightBlack,
    fontFamily: 'Raleway-Medium',
  },
  eyebrow: {
    fontSize: getScaledNumber(12),
    color: colors.lightBlack,
    fontFamily: 'Raleway-Medium',
  },
  buttonLbl: {
    fontSize: getScaledNumber(12),
    color: colors.lightBlack,
    fontFamily: 'Raleway-Medium',
  },
  hint: {
    fontSize: getScaledNumber(12),
    color: colors.lightBlack,
    fontFamily: 'Raleway-Medium',
  },
  error: {
    fontSize: getScaledNumber(12),
    color: colors.primary,
    fontFamily: 'Raleway-Medium',
  },
  tiny: {
    fontSize: getScaledNumber(10),
    color: colors.lightBlack,
    fontFamily: 'Raleway-Medium',
  },
  bold: {
    fontFamily: 'Raleway-Bold',
  },
});

export interface IProps {
  label?: string;
  bold?: boolean;
  type?: string;
  style?: StyleProp<TextStyle>;
}

export default NHCText;
