import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colorContstants from '../helpers/color-constants';
import { getAllUsers, getAllChannels, getChannelsHistory } from '../helpers/backend';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tileContainer: {
    flex: 1,
    backgroundColor: colorContstants.colorWhite,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colorContstants.colorFoam,
  },
  title: {
    color: colorContstants.colorCrimson,
    fontSize: 24,
    fontWeight: '600',
  },
  count: {
    color: colorContstants.colorTarawera,
    fontSize: 32,
  }
})

class HomeScreen extends Component {
  static navigationOptions = {
    tabBar: {
      icon: ({tintColor}) => <Icon name="home" size={28} color={tintColor} />,
    },
  };

  constructor(props) {
    super(props)

    this.state = {
      messagesCount: 0,
      usersCount: 0,
      channelsCount: 0,
    };
    this.setCount = this.setCount.bind(this);
  }

  componentWillMount() {
    getAllUsers(array => this.setCount('usersCount', array));
    getAllChannels(array => this.setCount('channelsCount', array))
    getChannelsHistory(array => this.setCount('messagesCount', array))
  }

  setCount(stateProp, array) {
    if (array) {
      this.setState({ [stateProp]: array.length });
    }
  }

  renderStatsTile({title, count, icon}) {
    return (
      <View style={styles.tileContainer}>
        <Icon name={icon} size={50} color={colorContstants.colorAquaIsland}/>
        <Text style={styles.title}>
          {title}
        </Text>
        <Text style={styles.count}>
          {count}
        </Text>
      </View>
    );
  }

  render() {
    const { usersCount, channelsCount, messagesCount } = this.state;
    return (
      <View style={styles.container}>
        {this.renderStatsTile({
          icon:'comment',
          count: messagesCount,
          title: 'Total Messages',
        })}
        <View style={{ flexDirection: 'row', flex: 1}}>
          {this.renderStatsTile({
              icon:'users',
              count: usersCount,
              title: 'Total Users',
          })}
          {this.renderStatsTile({
              icon:'flag',
              count: channelsCount,
              title: 'Total Channels',
          })}
        </View>
      </View>
    );
  }
}

export default HomeScreen;
