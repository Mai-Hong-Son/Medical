import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  Dimensions
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default class DataRow extends React.Component {
  _onPress(id) {
    this.props.navigation.navigate('Details', { detailsId: id });
  }

  render() {
    const { duongDanAnh, tenThuoc, id } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={this._onPress.bind(this, id)}
      >
        <View style={styles.wrapItem}>
          <Image source={{ uri: duongDanAnh }} style={styles.imageOfItem} />
          <View style={styles.wrapTextOfItem}>
            <Text numberOfLines={1} style={styles.tenThuoc}>
              {tenThuoc}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  wrapItem: {
    alignItems: 'center',
    flex: 1,
    marginTop: SCREEN_WIDTH > 320 ? 17 : 10,
    backgroundColor: '#fff',
    height: SCREEN_WIDTH / 1.5,
    width: SCREEN_WIDTH > 320 ? SCREEN_WIDTH / 2.25 : SCREEN_WIDTH / 2.3,
    borderRadius: 4,
    overflow: 'hidden'
  },
  imageOfItem: {
    height: '80%',
    width: '100%'
  },
  wrapTextOfItem: {
    height: 45,
    marginTop: 10,
    width: '90%'
  },
  tenThuoc: {
    fontWeight: 'bold',
    fontSize: 15
  }
});
