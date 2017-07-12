import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';

import { user } from '../mock-data';
import colorContstants from '../helpers/color-constants';
import { getAllUsers } from '../helpers/backend';

class UsersScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],
    };
    this.setUsersToState = this.setUsersToState.bind(this);
  }

  componentWillMount() {
    getAllUsers(this.setUsersToState);
  }

  setUsersToState(users) {
    if (users) {
      this.setState({ users });
    }
  }

  renderUserCell(user) {
    const { profile } = user;
    const {
      first_name,
      last_name,
      image_48,
    } = profile;

    return (
      <View key={user.id} style={{ backgroundColor: colorContstants.colorFoam, flex: 1, padding: 30, flexDirection: 'row' }}>
        <Image source={{ uri: image_48 }} style={{ width: 60, height: 60 }}/>
        <View style={{ padding: 10 }}>
          <Text style={{ color: 'green' }}>{first_name}</Text>
          <Text>{last_name}</Text>
        </View>
      </View>
    );
  }

  render() {
    if (this.state.users.length > 0) {
      const { users } = this.state;

      return (
        <ScrollView style={{ flex: 1 }}>
          {users.map(this.renderUserCell)}
        </ScrollView>
      );
    }
    return null;
  }
}

export default UsersScreen;
