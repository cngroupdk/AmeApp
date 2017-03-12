import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import HomeScreen from './components/HomeScreen';
import AchievementsScreen from './components/AchievementsScreen';
import TopMessagesScreen from './components/TopMessagesScreen';
import UsersScreen from './components/UsersScreen';
import colorContstants from './helpers/color-constants';

const AmeApp = TabNavigator({
  Home: { screen: HomeScreen },
  Achievements: { screen: AchievementsScreen },
  TopMessages: { screen: TopMessagesScreen },
  Users: { screen: UsersScreen },
}, {
  tabBarOptions: {
    activeTintColor: colorContstants.colorCrimson,
    inactiveTintColor: colorContstants.colorTarawera,
    style: { backgroundColor: colorContstants.colorFoam },
  },
});

export default AmeApp;
