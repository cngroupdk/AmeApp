import React from 'react';
import { TabNavigator } from 'react-navigation';
import HomeScreen from './components/HomeScreen';
// import AchievementsScreen from './components/AchievementsScreen';
// import TopMessagesScreen from './components/TopMessagesScreen';
import UsersScreen from './components/UsersScreen';
import colorContstants from './helpers/color-constants';

const AmeApp = TabNavigator({
  Home: { screen: HomeScreen },
  Achievements: { screen: HomeScreen },
  TopMessages: { screen: HomeScreen },
  Users: { screen: UsersScreen },
}, {
  initialRouteName: 'Users',
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: colorContstants.colorCrimson,
    inactiveTintColor: colorContstants.colorTarawera,
    style: { backgroundColor: colorContstants.colorFoam },
  },
});

export default AmeApp;
