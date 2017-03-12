import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import colorContstants from '../helpers/color-constants';

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 30,
    paddingBottom: 10,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colorContstants.colorBlackTransparent,
  },
  headerText: {
    fontSize: 18,
    color: colorContstants.colorCrimson,
  },
});

const Header = ({ title }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>
        {title}
      </Text>
    </View>
  );
}

export default Header;
