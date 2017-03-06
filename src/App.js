import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import HomeScreen from './components/HomeScreen';

const AmeApp = TabNavigator({
  Home: { screen: HomeScreen },
  Achievements: { screen: HomeScreen },
  TopMessages: { screen: HomeScreen },
  Users: { screen: HomeScreen },
}, {
  tabBarOptions: {
    activeTintColor: 'purple',
  },
});

export default AmeApp;
