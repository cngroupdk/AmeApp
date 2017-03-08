import React, { PropTypes } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class UserCell extends React.Component {
  static propTypes = {
    userName: PropTypes.string,
    userImage: PropTypes.string,
    userInfo: PropTypes.string,
    userDescription: PropTypes.string,
    msgCount: PropTypes.number,
    msgSharedCount: PropTypes.number,
  };

  render() {
    const {
      userImage,
      userName,
      userInfo,
      userDescription,
      msgCount,
      msgSharedCount,
    } = this.props;

    return (
      <View style={styles.wrapper}>
        <View style={styles.cellTextWrapper}>
          <Image
            style={styles.icon}
            source={{uri: userImage}}
          />
          <Text style={styles.text}>{userName}</Text>
        </View>
          <Text style={styles.text}>{userInfo}</Text>
          <Text style={styles.text}>{userDescription}</Text>
          <Text style={styles.text}>Posted messages: {msgCount}</Text>
          <Text style={styles.text}>Shared messages: {msgSharedCount}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    margin: 10,
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    alignItems: 'stretch',
  },
  cellTextWrapper: {
    alignItems: 'center',
    height: 130,
  },
  icon: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  text: {
    fontSize: 25,
  }
});
