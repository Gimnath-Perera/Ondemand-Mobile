import React from 'react';
import {StyleSheet, View, TextInput, Image, Platform} from 'react-native';
import colors from '../res/colors';

const NHCInput = ({
  placeholder,
  Icon,
  style,
  value,
  setState,
  isPassword,
}: IProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={Icon ? styles.sectionStyle : styles.sectionStyleWithoutIcon}>
        {Icon && <Icon style={styles.imageStyle} />}

        <TextInput
          placeholderTextColor={colors.darkGray}
          style={styles.inputStyle}
          secureTextEntry={isPassword && true}
          value={value}
          placeholder={placeholder}
          autoCapitalize="none"
          onChangeText={setState}
          underlineColorAndroid="transparent"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  inputStyle: {
    flex: 1,
    backgroundColor: colors.lightDarkGray,
    color: colors.darkGray,
  },
  sectionStyle: {
    flexDirection: 'row',
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 14,
  },
  sectionStyleWithoutIcon: {
    paddingHorizontal: 19,
    paddingVertical: Platform.OS === 'ios' ? 16 : 1,
    backgroundColor: colors.lightDarkGray,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: colors.secondary,
    borderRadius: 30,
  },
  imageStyle: {
    marginHorizontal: 19,
    marginVertical: 16,
  },
});

export interface IProps {
  placeholder?: string;
  setState?: Function;
  value?: string;
  isPassword?: boolean;
  Icon?: Image;
  style?: StyleProp<TextStyle>;
}

export default NHCInput;
