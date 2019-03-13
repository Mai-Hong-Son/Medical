import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, YellowBox, Image, Alert, Linking } from 'react-native';
import Permissions from 'react-native-permissions';
import ImagePicker from 'react-native-image-picker';

const MB_TO_B = 1048576;
const MAX_IMAGE_SIZE_IN_MB = 2;
const MAX_IMAGE_SIZE_IN_B = MAX_IMAGE_SIZE_IN_MB * MB_TO_B;

export default class ImageCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageSource: null
    };

    YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
  }

  getImageSource() {
    if (!this.state.imageSource) {
      return null;
    }
    return this.state.imageSource.uri;
  }

  resetImageSource = () => {
    this.setState({
      imageSource: null
    });
  }

  async _onPress() {
    const hasPhotoPermission = await this._checkPhotoPermission();
    if (!hasPhotoPermission) {
      Alert.alert('Hãy cấp quyền truy cập ảnh', 'Hãy vào Cài đặt > Quyền riêng tư > Ảnh và cấp quyền truy cập Ảnh cho Dược Quốc Gia.', [
        {
          text: 'OK',
          onPress: () => Linking.openURL('app-settings://')
        },
        {
          text: 'Cancel'
        }
      ]);
      return;
    }
    const options = {
      title: '',
      quality: 0.8,
      maxWidth: 600,
      maxHeight: 600,
      customButtons: this.state.imageSource ? [{ name: 'delete_image', title: 'Xóa ảnh hiện tại' }] : [],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel || response.error) {
        return;
      }

      if (response.customButton) {
        if (response.customButton === 'delete_image') {
          this.setState({ imageSource: null });
        }
        return;
      }

      if (response.fileSize > MAX_IMAGE_SIZE_IN_B) {
        Alert.alert('Ảnh quá lớn', `Xin hãy chọn ảnh có dung lượng dưới ${MAX_IMAGE_SIZE_IN_MB} MB.`, [
          {
            text: 'OK'
          }
        ]);
        return;
      }

      const filepath = response.uri;
      this.setState({ imageSource: { uri: filepath } });
    });
  }

  async _checkPhotoPermission() {
    const photoPermissions = await Permissions.check('photo');
    if (photoPermissions === 'authorized') {
      return true;
    }

    const photoPermissionRequestResult = await Permissions.request('photo');
    return photoPermissionRequestResult === 'authorized';
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this._onPress.bind(this)}>
          <View style={styles.card}>
            {this.state.imageSource === null ? (
              <Text style={styles.plus}>+</Text>
            ) : (
                <Image
                  source={this.state.imageSource}
                  ref={r => {
                    if (!r) return;
                    const width = 150;
                    const height = 180;
                    r.setNativeProps({ style: { width, height } });
                  }}
                />
              )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5
  },

  card: {
    width: 150,
    height: 180,
    backgroundColor: 'rgb(243, 243, 243)',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },

  plus: {
    fontSize: 60
  }
});
