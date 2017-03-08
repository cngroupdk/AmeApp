import React, { PropTypes } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class AchievementCell extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    badgeName: PropTypes.string,
    score: PropTypes.string,
    image: PropTypes.string,
  };

  render() {
    const {
      name,
      badgeName,
      score,
      image,
    } = this.props;

    return (
      <View style={styles.wrapper}>
        <Image
          style={styles.icon}
          source={{uri: image}}
        />
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{name}</Text>
          <Text style={styles.text}>{badgeName}</Text>
          <Text style={styles.text}>{score}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    margin: 10,
    paddingBottom: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    alignItems: 'stretch',
  },
  textWrapper: {
    alignItems: 'flex-start',
  },
  icon: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  text: {
    fontSize: 25
  }
});
