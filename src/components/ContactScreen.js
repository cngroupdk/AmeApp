import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colorContstants from '../helpers/color-constants';

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

  class ContactScreen extends Component {
    static navigationOptions = {
      tabBar: {
        icon: ({tintColor}) => <Icon name="users" size={28} color={tintColor} />,
      },
    }
    render() {
      return (
        <View style={styles.homeContainer}>
        </View>
      );
    }
  }
export default ContactScreen;
