import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image
} from 'react-native';

const icon1 = require('./../../../assets/contenticon/icon1.png');
const icon2 = require('./../../../assets/contenticon/icon2.png');
const icon3 = require('./../../../assets/contenticon/icon3.png');


const { width: SCREEN_WIDTH } = Dimensions.get('window');
const fontSizer = (size) => {
  return size * SCREEN_WIDTH / 320;
}

export default class ContentTop extends React.Component {

  render() {

    const viewBox = (
      <View style={styles.listViewBox}>
        <View style={styles.wrapRow}>
          <View style={[styles.viewBox, {
            backgroundColor: '#73CA3D'
          }]}>
            <Image source={icon1} style={{ width: 27, height: 27 }} />
            <Text style={styles.txtContent}>{'120.000'}</Text>
            <Text style={styles.txtContent}>{'BIỆT DƯỢC'}</Text>
          </View>
          <View style={[styles.viewBox, {
            backgroundColor: '#009A9A'
          }]}>
            <Image source={icon2} style={{ width: 27, height: 27 }} />
            <Text style={styles.txtContent}>{'2033'}</Text>
            <Text style={styles.txtContent}>{'HOẠT CHẤT'}</Text>
          </View>
        </View>
        <View style={styles.wrapRow}>
          <View style={[styles.viewBox, {
            backgroundColor: '#07C7A1'
          }]}>
            <Image source={icon3} style={{ width: 27, height: 27 }} />
            <Text style={styles.txtContent}>{'4505'}</Text>
            <Text style={styles.txtContent}>{'DƯỢC LIỆU'}</Text>
          </View>
          <View style={[styles.viewBox, {
            backgroundColor: '#E18748'
          }]}>
            <Image source={icon3} style={{ width: 27, height: 27 }} />
            <Text style={styles.txtContent}>{'NHIỀU NỮA'}</Text>
          </View>
        </View>
      </View>
    );

    return (
      <View style={styles.container}>
        {/* {viewBox} */}
        <Text style={styles.txtThuoc}>{'Thuốc mới cập nhật'}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // height: SCREEN_WIDTH * 2.8 / 2.7,
    // width: SCREEN_WIDTH,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 20,
    justifyContent: 'space-between'
  },
  listViewBox: {
    width: '100%',
    height: '80%'
  },
  viewBox: {
    height: SCREEN_WIDTH / 2.7,
    width: SCREEN_WIDTH > 320 ? SCREEN_WIDTH / 2.25 : SCREEN_WIDTH / 2.3,
    backgroundColor: '#fff',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  wrapRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SCREEN_WIDTH > 320 ? 15 : 10
  },
  txtThuoc: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#595A5C'
  },
  txtContent: {
    fontSize: fontSizer(16),
    color: '#fff',
    fontWeight: 'bold'
  }
});
