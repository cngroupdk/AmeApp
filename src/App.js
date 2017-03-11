import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import HomeScreen from './components/HomeScreen';
import AchievementsScreen from './components/AchievementsScreen';
import TopMessagesScreen from './components/TopMessagesScreen';
import UsersScreen from './components/UsersScreen';


const AmeApp = TabNavigator({
  Home: { screen: HomeScreen },
  Achievements: { screen: AchievementsScreen },
  TopMessages: { screen: TopMessagesScreen },
  Users: { screen: UsersScreen },
}, {
  tabBarOptions: {
    activeTintColor: '#ed1848',
    inactiveTintColor: '#073453',
    style: { backgroundColor: '#e6f8fc' },
  },
});

export default AmeApp;
