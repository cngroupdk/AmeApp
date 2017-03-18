import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import HomeScreen from './components/HomeScreen';
import ContactScreen from './components/ContactScreen';
// import AchievementsScreen from './components/AchievementsScreen';
// import TopMessagesScreen from './components/TopMessagesScreen';
// import UsersScreen from './components/UsersScreen';
import colorContstants from './helpers/color-constants';
const AmeApp = TabNavigator({
  Home: { screen: HomeScreen },
  // Achievements: { screen: AchievementsScreen },
  // TopMessages: { screen: TopMessagesScreen },
  Users: { screen: ContactScreen },
}, {
  tabBarOptions: {
    activeTintColor: colorContstants.colorCrimson,
    inactiveTintColor: colorContstants.colorTarawera,
    style: { backgroundColor: colorContstants.colorFoam },
    showIcon: true,
  },
  tabBarPosition: 'bottom',
});
export default AmeApp;
