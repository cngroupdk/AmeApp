import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
} from 'react-native';
import UserCell from './UserCell';

const mockData =
[
  {
    name: "Lukas Salek",
    info: "Simply ...  I am the best person in the Word!",
    description: "nice, sweet, pritty...",
    messages: 55,
    messagesShared:999,
  },
  {
    name: "Robo",
    info: "Simply ... Lukas is the best person in the Word!",
    description: "I want to be like Lukas",
    messages: 54,
    messagesShared:900,
  }
];


export default class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this._renderChannelItem = this._renderChannelItem.bind(this);

    const ds = new ListView.DataSource({ rowHasChanged: (row, newRow) => row !== newRow });
    this.state = {
      dataSource: ds.cloneWithRows(mockData)
    };
  }
  _renderChannelItem(data) {
    return (
      <UserCell
        userImage={'https://facebook.github.io/react/img/logo_og.png'}
        userName={data.name}
        userInfo={data.info}
        userDescription={data.description}
        msgCount={data.messages}
        msgSharedCount={data.messagesShared}
      />
    );
  }
  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={this._renderChannelItem}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});
