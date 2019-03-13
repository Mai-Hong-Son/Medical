import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Permissions from 'react-native-permissions';
import { connect } from 'react-redux';
import CameraFramePiece from './CameraFramePiece';
import Header from '../Reusables/UICustom/header';

const { width: WINDOW_WIDTH } = Dimensions.get('window');

@connect(state => ({
  statusBack: state.statusBack
}))
export default class QRCodeView extends Component {
  constructor(props) {
    super(props);
    this._barCodeFound = false;
    this.state = {
      cameraShouldBeEnabled: false
    };
  }

  componentDidMount() {
    this.listeners = [
      this.props.navigation.addListener('didFocus', async () => {
        this.onFocus();
      }),

      this.props.navigation.addListener('willBlur', () => {
        this._barCodeFound = false;
        if (this.unmounted) return;
        this.setState({
          cameraShouldBeEnabled: false
        });
      })
    ];
  }

  componentWillReceiveProps(nextProps) {
    const { statusBack } = nextProps;
    if (statusBack) {
      this.onFocus();
    }
  }

  componentWillUnmount() {
    this.listeners.forEach(listenter => listenter.remove());
    this.unmounted = true;
  }

  onFocus = async () => {
    if (this.unmounted) return;
    this.setState({
      cameraShouldBeEnabled: true
    });

    const hasCameraPermission = await this._checkCameraPermission();
    if (!hasCameraPermission) {
      let buttons = [
        {
          text: 'OK',
          onPress: () => Linking.openURL('app-settings://')
        },
        {
          text: 'Cancel'
        }
      ];
      if (Platform.OS === 'android') {
        buttons = [
          {
            text: 'OK'
          }
        ];
      }

      Alert.alert(
        'Hãy cấp quyền truy cập camera',
        'Hãy vào Cài đặt > Quyền riêng tư > Camera và cấp quyền truy cập Camera cho Dược Quốc Gia.',
        buttons
      );
    }
  };

  async _checkCameraPermission() {
    if (Platform.OS === 'ios') {
      const cameraPermissions = await Permissions.check('camera');
      if (cameraPermissions === 'authorized') {
        return true;
      }

      const cameraPermissionRequestResult = await Permissions.request('camera');
      return cameraPermissionRequestResult === 'authorized';
    }

    const granted = await PermissionsAndroid.check('android.permission.CAMERA');
    return typeof granted === 'boolean' ? granted : granted === 'granted';
  }

  _onBarCodeRead = ({ data }) => {
    if (this._barCodeFound) {
      return;
    }
    this._barCodeFound = true;
    this.props.navigation.navigate('TruyXuat', {
      receiptId: data
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Header type={'tab'} title={'Quét Barcode'} />
        <View style={styles.cameraArea}>
          {this.state.cameraShouldBeEnabled ? (
            <RNCamera
              style={styles.cameraViewStyle}
              ref={ref => (this.camera = ref)}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.on}
              permissionDialogTitle={'Cấp quyền camera'}
              permissionDialogMessage={'Hãy cấp quyền camera để scan mã phòng'}
              onBarCodeRead={this._onBarCodeRead}
            />
          ) : null}
        </View>
        <View style={styles.frameSquareContainer}>
          <View style={styles.frameSquare}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <CameraFramePiece />
              <CameraFramePiece
                style={{
                  transform: [{ rotate: '90deg' }]
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <CameraFramePiece
                style={{
                  transform: [{ rotate: '270deg' }]
                }}
              />
              <CameraFramePiece
                style={{
                  transform: [{ rotate: '180deg' }]
                }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 60
  },
  frameSquareContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  frameSquare: {
    width: WINDOW_WIDTH,
    height: WINDOW_WIDTH * 0.65,
    justifyContent: 'space-between',
    paddingHorizontal: 40
  },
  cameraArea: {
    position: 'absolute',
    top: 80,
    right: 0,
    bottom: 60,
    left: 0
  },
  cameraViewStyle: {
    flex: 1,
    justifyContent: 'center'
  }
});
