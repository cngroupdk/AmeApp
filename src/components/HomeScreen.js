import React, {Component} from 'react';
import {Dimensions, ListView, StyleSheet, Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import colorContstants from '../helpers/color-constants';
import Header from './Header';

import {
  getAllChannels,
  getAllUsers,
  getChannelsHistory,
} from '../helpers/backend';

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: colorContstants.colorFoam,
  },
  homeCellContainer: {
    alignItems: 'center',
    backgroundColor: colorContstants.colorWhite,
    paddingTop: 20,
    paddingBottom: 20,
    borderColor: colorContstants.colorFoam,
    borderWidth: 1,
    justifyContent: 'center',
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
      icon: ({tintColor}) => <Icon name="home" size={28} color={tintColor} />,
    },
  };

  constructor(props) {
    super(props);

    this._getTotalUsers = this._getTotalUsers.bind(this);
    this._getTotalChannels = this._getTotalChannels.bind(this);
    this._getTotalMessages = this._getTotalMessages.bind(this);

    this.state = {
      totalUsers: 0,
      totalChannels: 0,
      totalMessages: 0,
    };
  }

  componentWillMount() {
    getAllUsers(this._getTotalUsers);
    getAllChannels(this._getTotalChannels);
    getChannelsHistory(this._getTotalMessages);
  }

  _getTotalUsers(users) {
    if (this.refs.homeRef) {
      this.setState({totalUsers: users.length});
    }
  }

  _getTotalChannels(channels) {
    if (this.refs.homeRef) {
      this.setState({totalChannels: channels.length});
    }
  }

  _getTotalMessages(messages) {
    if (this.refs.homeRef) {
      this.setState({totalMessages: messages.length});
    }
  }

  render() {
    return (
      <View style={styles.homeContainer} ref="homeRef">
        <Header title="Home" />
        <View style={[styles.homeCellContainer, {flex: 3}]}>
          <Icon
            name={'comment'}
            size={30}
            color={colorContstants.colorAquaIsland}
          />
          <Text style={styles.homeCellTitle}>Total Messages</Text>
          <Text style={styles.homeCellText}>{this.state.totalMessages}</Text>
        </View>
        <View style={{flexDirection: 'row', flex: 2}}>
          <View style={[styles.homeCellContainer, {flex: 1}]}>
            <Icon
              name={'users'}
              size={30}
              color={colorContstants.colorAquaIsland}
            />
            <Text style={styles.homeCellTitle}>Total Users</Text>
            <Text style={styles.homeCellText}>{this.state.totalUsers}</Text>
          </View>
          <View style={[styles.homeCellContainer, {flex: 1}]}>
            <Icon
              name={'flag'}
              size={30}
              color={colorContstants.colorAquaIsland}
            />
            <Text style={styles.homeCellTitle}>Total Channels</Text>
            <Text style={styles.homeCellText}>{this.state.totalChannels}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default HomeScreen;
