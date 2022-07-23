import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import colors from '../res/colors';
//import LinearGradient from 'react-native-linear-gradient';

const NHCButton = ({label, style, onPress, disabled}: IProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        disabled ? styles.disabledContainer : styles.container,
        style,
        styles.shadowProp,
      ]}
      onPress={onPress}>
      <Text style={styles.btnText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingVertical: 13,
    alignItems: 'center',
    width: '100%',
    borderRadius: 20,
    marginTop: 10,
    backgroundColor: colors.primary,
  },
  disabledContainer: {
    justifyContent: 'center',
    paddingVertical: 13,
    alignItems: 'center',
    width: '100%',
    borderRadius: 20,
    marginTop: 10,
    backgroundColor: colors.lightGray,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  btnText: {
    fontWeight: '700',
    fontSize: 16,
    color: colors.white,
  },
});

export interface IProps {
  label?: string;
  disabled?: boolean;
  containerStyle?: StyleProp<TextStyle>;
  onPress: Function;
  style?: StyleProp<TextStyle>;
}

export default NHCButton;
