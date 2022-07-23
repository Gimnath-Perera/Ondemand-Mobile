import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

export default () => (
  <View style={styles.container}>
    <View style={styles.indicator}>
      <ActivityIndicator size="large" color="white" />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    ...StyleSheet.absoluteFillObject,
  },
  indicator: {
    paddingRight: 15,
    paddingLeft: 18,
    paddingBottom: 15,
    paddingTop: 18,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});
