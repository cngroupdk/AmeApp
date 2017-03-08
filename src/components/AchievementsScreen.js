import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
} from 'react-native';

import AchievementCell from './AchievementCell';

export default class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this._renderChannelItem = this._renderChannelItem.bind(this);

    const ds = new ListView.DataSource({ rowHasChanged: (row, newRow) => row !== newRow });
    this.state = {
      dataSource: ds.cloneWithRows([
        { name: "Lukas Salek", badgeName: "He is best!", score: "1000/100", },{ name: "Lukas Salek", badgeName: "He is nice", score: "100", },
      ])
    };
  }

  _renderChannelItem(data) {
    return (
      <AchievementCell
        name={data.name}
        badgeName={data.badgeName}
        score={data.score}
        image={'https://facebook.github.io/react/img/logo_og.png'}
      />
    );
  }

  render() {
    return (
      <ListView
        enableEmptySections
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={this._renderChannelItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
});
