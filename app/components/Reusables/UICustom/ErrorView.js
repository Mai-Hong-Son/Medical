import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Header from './header';
import Icon from 'react-native-vector-icons/Ionicons';

export default class ErrorView extends React.Component {
  constructor(props) {
    super(props);
  }

  onPress = () => {
    this.props.onRetryPressed && this.props.onRetryPressed();
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          type={this.props.hideBackButton ? null : 'stack'}
          title={''}
        />
        <View style={styles.content}>
          <Text
            style={styles.errorText}
          >{`Có lỗi xảy ra khi tải dữ liệu\nVui lòng kiểm tra kết nối mạng và thử lại.`}</Text>
          <TouchableOpacity onPress={this.onPress}>
            <Icon name={'ios-refresh-circle-outline'} size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.retryText}>Thử lại</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  errorText: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20
  },

  retryText: {
    fontSize: 15
  }
});
