import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { getAllUsers, getAllChannels, getChannelsHistory } from '../helpers/backend';

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#e6f8fc',
  },
  homeHeader: {
   marginTop: 20,
   backgroundColor: '#ed1848',
   alignItems: 'center',
  },
  homeCellContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingTop: 20,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderColor: '#e6f8fc',
  },
  homeCellTitle: {
    fontSize: 22,
    fontWeight: '700',
    paddingBottom: 10,
    paddingTop: 10,
    color: '#ed1848',
  },
  homeCellText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#073453',
  },
});

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this._getTotalUsers = this._getTotalUsers.bind(this);
    this._getTotalChannels = this._getTotalChannels.bind(this);
    this._getTotalMessages = this._getTotalMessages.bind(this);
    this._renderHomeCell = this._renderHomeCell.bind(this);

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

  render() {
    return (
      <ScrollView style={styles.homeContainer}>
        <View style={styles.homeCellContainer}>
          <Icon name='users' size={30} color='#98d0da' />
          <Text style={styles.homeCellTitle}>
            Total Users
          </Text>
          <Text style={styles.homeCellText}>
            {this.state.totalUsers}
          </Text>
        </View>
        <View style={styles.homeCellContainer}>
          <Icon name='flag' size={30} color='#98d0da' />
          <Text style={styles.homeCellTitle}>
            Total Channels
          </Text>
          <Text style={styles.homeCellText}>
            {this.state.totalChannels}
          </Text>
        </View>
        <View style={styles.homeCellContainer}>
          <Icon name='comment' size={30} color='#98d0da' />
          <Text style={styles.homeCellTitle}>
            Total Messages
          </Text>
          <Text style={styles.homeCellText}>
            {this.state.totalMessages}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

export default HomeScreen;
