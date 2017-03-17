import React, {Component} from 'react';
import {Text, View} from 'react-native';

class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{color: 'blue', fontSize: 28}}>
          Welcome!
        </Text>
      </View>
    );
  }
}

export default HomeScreen;
