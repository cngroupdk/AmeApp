import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colorContstants from '../helpers/color-constants';
import { getAllUsers, getAllChannels, getChannelsHistory } from '../helpers/backend';
const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: colorContstants.colorFoam,
  },
  homeCellContainer: {
    backgroundColor: colorContstants.colorWhite,
    flex: 3,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colorContstants.colorFoam,
  },
  homeCellTitle: {
    color: colorContstants.colorCrimson,
    fontSize: 28,
    marginVertical: 10,
  },
  homeCellText: {
    color: colorContstants.colorTarawera,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
class HomeScreen extends Component {
  static navigationOptions = {
    tabBar: {
      icon: ({tintColor}) => <Icon name="home" size={28} color={tintColor} />,
    },
  }
  constructor(props) {
    super(props);
    this._getTotalUsers = this._getTotalUsers.bind(this);
    this._getAllChannels= this._getAllChannels.bind(this);
    this._getTotalMessages= this._getTotalMessages.bind(this);
    this.state = { totalUser: 0, totalChannels: 0, totalMessages: 0 };

  }
  componentWillMount() {
    getAllUsers(this._getTotalUsers)
    getAllChannels(this._getAllChannels)
    getChannelsHistory(this._getTotalMessages)
  }
  _getTotalUsers(users) {
    this.setState({ totalUser: users.length });
  }
  _getAllChannels(channels){

    this.setState({ totalChannels: channels.length });

  }

  _getTotalMessages(messages){
    this.setState({ totalMessages: messages.length});
  }
  render() {
    return (
      <View style={styles.homeContainer}>
        <View
          style={[
            styles.homeCellContainer,
            {
              borderBottomWidth: StyleSheet.hairlineWidth,
            }
          ]}
        >
          <Icon
            name="comment"
            size={40}
            color={colorContstants.colorAquaIsland}
          />
          <Text style={styles.homeCellTitle}>
            Total Messages
          </Text>
          <Text style={styles.homeCellText}>
          {this.state.totalMessages}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 2,
          }}
        >
          <View style={[styles.homeCellContainer, {borderRightWidth: StyleSheet.hairlineWidth }]}>
            <Icon
              name="users"
              size={40}
              color={colorContstants.colorAquaIsland}
            />
            <Text style={styles.homeCellTitle}>
              Total Users
            </Text>
            <Text style={styles.homeCellText}>
              {this.state.totalUser}
            </Text>
          </View>
          <View style={styles.homeCellContainer}>
            <Icon
              name="flag"
              size={40}
              color={colorContstants.colorAquaIsland}
            />
            <Text style={styles.homeCellTitle}>
              Total Channels
            </Text>
            <Text style={styles.homeCellText}>
              {this.state.totalChannels
              }
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
export default HomeScreen;
