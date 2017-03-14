import React, { PropTypes } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import colorContstants from '../helpers/color-constants';
import { getChannelsHistory, getReactionsByUser } from '../helpers/backend';

const styles = StyleSheet.create({
  userCellContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderColor: colorContstants.colorFoam,
    backgroundColor: colorContstants.colorWhite,
    flexDirection: 'row',
  },
  userImage: {
    height: 48,
    width: 48,
    borderRadius: 10,
  },
  userInfoContainer: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  userName: {
    color: colorContstants.colorTarawera,
    fontSize: 18,
    fontWeight: '600',
  },
  subInfoContainer: {
    flexDirection: 'row',
  },
  subInfo: {
    color: colorContstants.colorCrimson,
  },
  subInfoNumber: {
    color: colorContstants.colorTarawera,
  },
});

class UserCell extends React.Component {
  static propTypes = {
    index: PropTypes.string,
    userID: PropTypes.string,
    userName: PropTypes.string,
    userImage: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this._getChannelsHistoryByUser = this._getChannelsHistoryByUser.bind(this);
    this._getReactionByUser = this._getReactionByUser.bind(this);

    this.state = {
        messages: 0,
        reactions: 0,
    };
  }

  componentWillMount() {
    const { userID } = this.props;

    getChannelsHistory(this._getChannelsHistoryByUser);
    getReactionsByUser(userID, this._getReactionByUser);
  }

  _getChannelsHistoryByUser(messages) {
    const { userID } = this.props;

    if (this.refs.userCellRef) {
      const filteredMessages = messages.filter((message) => {
        return userID == message.user;
      });

      this.setState({ messages: filteredMessages.length });
    }
  }

  _getReactionByUser(reactions) {
    if (this.refs.userCellRef) {
      this.setState({ reactions: reactions.length });
    }
  }

  _getCustomStyles(index) {
    return {
      borderTopWidth: index === '0' ? null : StyleSheet.hairlineWidth,
    };
  }

  render() {
    const {
      index,
      userID,
      userImage,
      userName,
    } = this.props;

    const { messages, reactions } = this.state;

    return (
      <View ref='userCellRef' style={[styles.userCellContainer, this._getCustomStyles(index)]}>
        <View style={styles.userImageContainer}>
          <Image style={styles.userImage} source={{uri: userImage}} />
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>{userName}</Text>
          <View style={styles.subInfoContainer}>
            <Text style={styles.subInfo}>Messages: </Text>
            <Text style={styles.subInfoNumber}>{messages}</Text>
            <Text style={[styles.subInfo, { marginLeft: 10 }]}>Reaction: </Text>
            <Text style={styles.subInfoNumber}>{reactions}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default UserCell;
