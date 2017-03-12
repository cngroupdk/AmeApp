import React, { PropTypes } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import colorContstants from '../helpers/color-constants';

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
});

class UserCell extends React.Component {
  static propTypes = {
    index: PropTypes.string,
    userID: PropTypes.string,
    userName: PropTypes.string,
    userImage: PropTypes.string,
  };

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

    return (
      <View style={[styles.userCellContainer, this._getCustomStyles(index)]}>
        <View style={styles.userImageContainer}>
          <Image style={styles.userImage} source={{uri: userImage}} />
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>{userName}</Text>
        </View>
      </View>
    );
  }
}

export default UserCell;
