import React, { Component } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import colorContstants from '../helpers/color-constants';

const styles = StyleSheet.create({
  loadingConatainer: {
    flex: 1,
    backgroundColor: colorContstants.colorFoam,
    justifyContent: 'center',
  },
});

const LoadingScreen = () => {
  const loadingIndicator = () => {
    if (Platform.OS === 'android') {
      return (
        <ActivityIndicator
          color={colorContstants.colorCrimson}
          size={50}
        />
      );
    }
    return (
      <ActivityIndicator
        color={colorContstants.colorCrimson}
        animated
        hidesWhenStopped
      />
    );
  };

  return (
    <View style={styles.loadingConatainer}>
      {loadingIndicator()}
    </View>
  );
}

export default LoadingScreen;
