import React, { Component } from 'react';
import {
  Dimensions,
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

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
  listContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  homeCellContainer: {
    alignItems: 'center',
    backgroundColor: colorContstants.colorWhite,
    paddingTop: 20,
    paddingBottom: 20,
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

  _getCustomStyles(rowID) {
    const { width } = Dimensions.get('window');

    return {
      width: rowID === '0' ? width : width/2,
      borderTopWidth: rowID === '0' ? null : StyleSheet.hairlineWidth,
      // TODO find better solution and not use 2
      borderRightWidth: rowID === '0' || rowID === '2' ? null : StyleSheet.hairlineWidth,
    };
  }

  _renderHomeCell(rowData, sectionID, rowID) {
    const { countId, icon, title } = rowData;

    return (
      <View key={rowID} style={[styles.homeCellContainer, this._getCustomStyles(rowID)]}>
        <Icon name={icon} size={30} color={colorContstants.colorAquaIsland} />
        <Text style={styles.homeCellTitle}>{title}</Text>
        <Text style={styles.homeCellText}>{this.state[countId]}</Text>
      </View>
    );
  }

  render() {
    const homeProps = [
      {
        icon: 'comment',
        title: 'Total Messages',
        countId: 'totalMessages',
      },
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
    ];

    const dataSource = this.state.ds.cloneWithRows(homeProps);

    return (
      <View style={styles.homeContainer} ref='homeRef'>
        <Header title='Home' />
        <ListView
          contentContainerStyle={styles.listContainer}
          dataSource={dataSource}
          renderRow={this._renderHomeCell}
          enableEmptySections
        />
      </View>
    );
  }
}

export default HomeScreen;
