import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from './Header';
import UserCell from './UserCell';
import colorContstants from '../helpers/color-constants';
import { getAllUsers } from '../helpers/backend';

const styles = StyleSheet.create({
  usersContainer: {
    flex: 1,
    backgroundColor: colorContstants.colorFoam,
  },
});

class UsersScreen extends Component {
  static navigationOptions = {
    tabBar: {
      icon: ({ tintColor }) => (
        <Icon name='users' size={28} color={tintColor} />
      ),
    },
  }

  constructor(props) {
    super(props);

    this._renderUserCell = this._renderUserCell.bind(this);
    this._getAllUsers = this._getAllUsers.bind(this);

    this.state = {
      ds: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
      allUsers: [],
    };
  }

  componentWillMount() {
    getAllUsers(this._getAllUsers);
  }

  _getAllUsers(users) {
    if (this.refs.usersRef) {
      this.setState({ allUsers: users });
    }
  }

  _renderUserCell(rowData, sectionID, rowID) {
    const { real_name, image_48, } = rowData.profile;

    return (
      <UserCell
        index={rowID}
        userID={rowData.id}
        userImage={image_48}
        userName={real_name}
      />
    );
  }

  render() {
    const { allUsers, ds } = this.state;
    const dataSource = ds.cloneWithRows(allUsers);

    return (
      <View style={styles.usersContainer} ref="usersRef">
        <Header title='Users' />
        <ListView
          dataSource={dataSource}
          renderRow={this._renderUserCell}
          enableEmptySections
        />
      </View>
    );
  }
}

export default UsersScreen;
