import React, { Component } from 'react';
import {
  ListView,
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
    this._renderHomeCell = this._renderHomeCell.bind(this);

    this.state = {
      ds: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
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
      this.setState({ totalUsers: users.length });
    }
  }

  _getTotalChannels(channels) {
    if (this.refs.homeRef) {
      this.setState({ totalChannels: channels.length });
    }
  }

  _getTotalMessages(messages) {
    if (this.refs.homeRef) {
      this.setState({ totalMessages: messages.length });
    }
  }

  _renderHomeCell(rowData, sectionID, rowID) {
    const { countId, icon, title } = rowData;

    return (
      <View key={rowID} style={styles.homeCellContainer}>
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

    const dataSource = this.state.ds.cloneWithRows(homeProps);

    return (
      <View style={styles.homeContainer} ref="homeRef">
        <ListView
          dataSource={dataSource}
          renderRow={this._renderHomeCell}
        />
      </View>
    );
  }
}

export default HomeScreen;
