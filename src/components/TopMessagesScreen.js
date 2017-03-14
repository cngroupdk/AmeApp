import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import Header from './Header';
import colorContstants from '../helpers/color-constants';
import { getChannelsHistory } from '../helpers/backend';

const styles = StyleSheet.create({
 topMessagesContainer: {
    flex: 1,
    backgroundColor: colorContstants.colorFoam,
  },
  topMessageCellContainer: {
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
  reactionNumber: {
    marginLeft: 5,
    fontSize: 12,
    fontStyle: 'italic',
  },
});

class TopMessagesScreen extends Component {
  static navigationOptions = {
    tabBar: {
      icon: ({ tintColor }) => (
        <Icon name='comment' size={28} color={tintColor} />
      ),
    },
  }

  constructor(props) {
    super(props);

    this._getAllMessages = this._getAllMessages.bind(this);
    this._renderTopMessageCell = this._renderTopMessageCell.bind(this);

    this.state = {
      ds: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
      topMessages: [],
    };
  }

  componentWillMount() {
    getChannelsHistory(this._getAllMessages);
  }

  _getAllMessages(messages) {
    if (this.refs.topMessagesRef) {
      const messagesWithReactions = messages.filter((message) => {
        return message.reactions;
      });

      const mappedMessages = messagesWithReactions.map((message) => {
        const { text } = message;
        const reactions = message.reactions;

        const countedReaction = reactions.map((reaction) => {
          return reaction.count;
        });

        const count = countedReaction.reduce((a, b) => {
          return a + b;
        });

        return { text, count };
      });

      this.setState({ topMessages: mappedMessages });
    }
  }

  _getCustomStyles(index) {
    return {
      borderTopWidth: index === '0' ? null : StyleSheet.hairlineWidth,
    };
  }

  _renderTopMessageCell(rowData, sectionID, rowID) {
    const { text, count } = rowData;
    const messageNumber = Number(rowID) + 1;

    return (
      <View key={rowID} style={[styles.topMessageCellContainer, this._getCustomStyles(rowID)]}>
        <Text style={styles.cellNumber}>{messageNumber}</Text>
        <View style={styles.messagesContainer}>
          <Text style={styles.messageText}>{ text }</Text>
          <View style={styles.reactionContainer}>
            <Text style={styles.reactionNumber}>{ count } Reaction</Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { topMessages } = this.state;
    const sortedTopMessages = topMessages.sort((a, b) => {
      return b.count - a.count ;
    });

    const dataSource = this.state.ds.cloneWithRows(sortedTopMessages);

    return (
      <View style={styles.topMessagesContainer} ref='topMessagesRef'>
        <Header title='Top Messages' />
        <ListView
          dataSource={dataSource}
          renderRow={this._renderTopMessageCell}
          enableEmptySections
        />
      </View>
    );
  }
}

export default TopMessagesScreen;
