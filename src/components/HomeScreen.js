import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import colorContstants from '../helpers/color-constants';
import { getAllUsers, getAllChannels, getChannelsHistory } from '../helpers/backend';

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: colorContstants.colorFoam,
  },
  homeHeader: {
   marginTop: 20,
   backgroundColor: colorContstants.colorCrimson,
   alignItems: 'center',
  },
  homeCellContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colorContstants.colorWhite,
    paddingTop: 20,
    paddingBottom: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colorContstants.colorFoam,
  },
  homeCellTitle: {
    fontSize: 22,
    fontWeight: '700',
    paddingBottom: 10,
    paddingTop: 10,
    color: colorContstants.colorCrimson,
  },
  homeCellText: {
    fontSize: 20,
    fontWeight: '700',
    color: colorContstants.colorTarawera,
  },
});

class HomeScreen extends Component {
  static navigationOptions = {
    tabBar: {
      icon: ({ tintColor }) => (
        <Icon name='home' size={28} color={tintColor} />
      ),
    },
  }

  constructor(props) {
    super(props);

    this._getTotalUsers = this._getTotalUsers.bind(this);
    this._getTotalChannels = this._getTotalChannels.bind(this);
    this._getTotalMessages = this._getTotalMessages.bind(this);

    this.state = { totalUsers: 0, totalChannels: 0, totalMessages: 0 };
  }

  componentDidMount() {
    getAllUsers(this._getTotalUsers);
    getAllChannels(this._getTotalChannels);
    getChannelsHistory(this._getTotalMessages);
  }

  _getTotalUsers(users) {
    this.setState({ totalUsers: users.length });
  }

  _getTotalChannels(channels) {
    this.setState({ totalChannels: channels.length });
  }

  _getTotalMessages(messages) {
    this.setState({ totalMessages: messages.length });
  }

  _renderHomeCell(prop, idx) {
    const { countId, icon, title } = prop;
    console.log(countId, icon, title)
    console.log(this.state)
    return (
      <View key={idx} style={styles.homeCellContainer}>
        <Icon name={icon} size={30} color={colorContstants.colorAquaIsland} />
        <Text style={styles.homeCellTitle}>{title}</Text>
        <Text style={styles.homeCellText}>{this.state[countId]}</Text>
      </View>
    );
  }

  render() {
    const homeProps = [
      {
        icon: 'users',
        title: 'Total Users',
        countId: 'totalUsers',
      },
      {
        icon: 'flag',
        title: 'Total Channels',
        countId: 'totalChannels',
      },
      {
        icon: 'comment',
        title: 'Total Messages',
        countId: 'totalMessages',
      },
    ];

    return (
      <ScrollView style={styles.homeContainer}>
        {homeProps.map((prop, idx) => {this._renderHomeCell(prop, idx)})}
      </ScrollView>
    );
  }
}

export default HomeScreen;
