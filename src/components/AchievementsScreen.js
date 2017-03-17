import React, {Component} from 'react';
import {StyleSheet, Text, View, ListView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {getAllUsers, getChannelsHistory} from '../helpers/backend';
import AchievementCell from './AchievementCell';
import colorContstants from '../helpers/color-constants';
import Header from './Header';

export default class HomeScreen extends Component {
  static navigationOptions = {
    tabBar: {
      icon: ({tintColor}) => <Icon name="trophy" size={28} color={tintColor} />,
    },
  };

  constructor(props) {
    super(props);
    this._getAllUsers = this._getAllUsers.bind(this);
    this._getAllMessages = this._getAllMessages.bind(this);

    this.state = {
      allUsers: [],
      messages: [],
    };
  }

  componentWillMount() {
    getAllUsers(this._getAllUsers);
    getChannelsHistory(this._getAllMessages);
  }

  _getAllUsers(users) {
    if (this.refs.achievementsRef) {
      this.setState({allUsers: users});
    }
  }

  _getAllMessages(messages) {
    if (this.refs.achievementsRef) {
      const mappedMessages = messages.map(message => {
        const {text, user} = message;
        return {text, length: text.length, user};
      });
      this.setState({messages: mappedMessages});
    }
  }

  render() {
    const {allUsers, messages} = this.state;
    const longestMessage = messages.reduce(
      (longestMessage, message) => {
        return longestMessage.length > message.length
          ? longestMessage
          : message;
      },
      {length: 0},
    );
    return (
      <View style={styles.achievementsContainer} ref="achievementsRef">
        <Header title="Achievements" />
        <View style={[styles.cellContainer, {flexDirection: 'row'}]}>
          <Icon name="trophy" size={40} color={colorContstants.colorCrimson} />
          <View style={styles.messagesContainer}>
            <Text
              style={[
                styles.messageText,
                {color: colorContstants.colorCrimson},
              ]}
            >
              The longest message:
            </Text>
            <Text style={styles.messageText}>{longestMessage.text}</Text>
            <View style={styles.reactionContainer}>
              <Text style={styles.reactionNumber}>
                {' '}{longestMessage.length}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  achievementsContainer: {
    flex: 1,
    backgroundColor: colorContstants.colorFoam,
  },
  cellContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: colorContstants.colorFoam,
    backgroundColor: colorContstants.colorWhite,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cellNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: colorContstants.colorCrimson,
  },
  messagesContainer: {
    marginLeft: 10,
    flex: 1,
  },
  messageText: {
    fontSize: 16,
    color: colorContstants.colorTarawera,
  },
  reactionContainer: {
    marginTop: 3,
    marginLeft: 1,
    borderLeftWidth: 2,
    borderColor: colorContstants.colorCrimson,
  },
});
