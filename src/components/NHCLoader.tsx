import React from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import {getScaledNumber} from '../library/utils';
import colors from '../res/colors';
//import LinearGradient from 'react-native-linear-gradient';

const NHCLoader = () => {
  const loading = useSelector(state => state?.common?.loading);
  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loaderContent}>
          <ActivityIndicator size="large" />
        </View>
      </View>
    );
  } else return <></>;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',

    // backgroundColor: colors.primary,
  },
  loaderContent: {
    backgroundColor: colors.black,
    opacity: 0.8,
    padding: getScaledNumber(20),
    borderRadius: getScaledNumber(10),
  },
});

export default NHCLoader;
