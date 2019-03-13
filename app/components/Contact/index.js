import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
  ScrollView,
  Linking,
  ActivityIndicator,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from '../Reusables/UICustom/header';
import * as commonActions from '../../../redux/actions';
import { isPhoneNumber, isEmail } from '../Reusables/ValidateData';

const ICON_SIZE = 30;

@connect(
  state => ({
    ketquaguiphanhoi: state.ketquaguiphanhoi
  }),
  { ...commonActions }
)
export default class ContactView extends React.Component {
  constructor(props) {
    super(props);

    this._noidungRef = React.createRef();
    this._hotenRef = React.createRef();
    this._emailRef = React.createRef();
    this._sdtRef = React.createRef();
  }

  state = {
    loadingSending: false,
    latitude: 21.0287799,
    longitude: 105.825849,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,

    touches: {},
    values: {},

    content: '',
    textName: '',
    textMail: '',
    phoneNumber: '',

    emptyContent: false,
    emptyName: false,
    emptyMail: false,
    emptyPhoneNumber: false
  };

  componentWillReceiveProps(nextProps) {
    if (this.unmounted) {
      return;
    }
    const { ketquaguiphanhoi } = nextProps;

    if (!ketquaguiphanhoi.error) {
      this.setState({ loading: false }, () => {
        Alert.alert('Thông báo', 'Gửi phản hồi thành công!', [
          {
            text: 'OK',
            onPress: () => {
              this.setState({
                content: '',
                textName: '',
                textMail: '',
                phoneNumber: ''
              });

              this._submitPending = false;
            }
          }
        ]);
      });

      return;
    }
    this.setState({ loading: false }, () => {
      Alert.alert('Lỗi', 'Gửi phản hồi không thành công!', [
        {
          text: 'OK',
          onPress: () => (this._submitPending = false)
        }
      ]);
    });
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  onFeedbackPressed = () => {
    const { content, textName, textMail, phoneNumber } = this.state;

    if (!this._checkEmptyField(textName)) {
      this.setState({
        emptyName: true
      });
    }

    if (!this._checkEmptyField(textMail)) {
      this.setState({
        emptyMail: true
      });
    }

    if (!this._checkEmptyField(phoneNumber)) {
      this.setState({
        emptyPhoneNumber: true
      });
    }

    // if (!this._checkEmptyField(content)) {
    //   this.setState({
    //     emptyContent: true
    //   });
    // }

    if (!this._checkEmptyField(textName) ||
      !this._checkEmptyField(textMail) || !this._checkEmptyField(phoneNumber)) {
      return;
    }

    if (!isPhoneNumber(phoneNumber)) {
      Alert.alert('Sai định dạng', 'Bạn nhập sai số điện thoại', [
        {
          text: 'OK',
          onPress: () => (this._submitPending = false)
        }
      ]);
      return;
    }

    if (!isEmail(textMail)) {
      Alert.alert('Sai định dạng', 'Bạn nhập chưa đúng email', [
        {
          text: 'OK',
          onPress: () => (this._submitPending = false)
        }
      ]);
      return;
    }

    this.sendFeedback({
      ho_ten: textName,
      email: textMail,
      so_dien_thoai: phoneNumber,
      noi_dung: content
    });
  };

  _checkEmptyField = text => {
    if (text === '' || text.replace(/\s/g, '').length === 0) {
      return false;
    }

    return true;
  }

  sendEmail = () => {
    try {
      Linking.openURL('mailto:cqldvn@moh.gov.vn');
    } catch (error) {
      console.log(error);
    }
  };

  sendFeedback = info => {
    if (this._submitPending) {
      return;
    }

    this._submitPending = true;

    this.setState({ loading: true }, () => {
      this.props.guiphanhoi(info);
    });
  };

  renderButton() {
    return (
      <TouchableOpacity onPress={this.onFeedbackPressed}>
        <View style={styles.buttonStyle}>
          {this.state.loading ? <ActivityIndicator /> : <View style={styles.wrapBtn}>
            <FontAwesome name="lock" size={16} color="white" />
            <Text style={styles.txtButton}>GỬI THÔNG TIN</Text>
          </View>}
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const {
      content,
      textName,
      textMail,
      phoneNumber,
      emptyContent,
      emptyMail,
      emptyName,
      emptyPhoneNumber
    } = this.state;

    return (
      <View style={{ flex: 1, paddingBottom: 60 }}>
        <Header type={'tab'} title={'Liên hệ'} />
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: '#F3F6FF' }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={{
              justifyContent: 'center',
              marginHorizontal: 20
            }}
          >
            <View style={styles.container}>
              <View style={styles.info}>
                <Text style={styles.infoTxt}>Bản quyền: Cục Quản lý Dược - Bộ Y tế</Text>
                <Text style={styles.infoTxt}>Điện thoại: 844.37366483</Text>
                <Text style={styles.infoTxt}>Fax: 844.38234758</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.infoTxt}>Email:</Text>
                  <TouchableOpacity style={{ marginTop: 15 }} onPress={this.sendEmail}>
                    <Text style={styles.mailTxt}>cqldvn@moh.gov.vn</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.location}>
                <Icon name={Platform.OS === 'ios' ? 'ios-pin-outline' : 'md-pin'} size={30} color={'#696969'} />
                <Text style={styles.mapTxt}>Địa chỉ: 138A Giảng Võ - Hà Nội</Text>
              </View>
              <View style={styles.mapContainer}>
                <MapView initialRegion={this.state} style={styles.mapStyle} zoomEnabled rotateEnabled>
                  <MapView.Marker coordinate={this.state} />
                </MapView>
              </View>
              <View>
                <View style={styles.inputContainer}>
                  <View style={styles.iconContainer}>
                    <Icon name={Platform.OS === 'ios' ? 'ios-person-outline' : 'md-person'} size={ICON_SIZE} color={'#696969'} />
                  </View>
                  <TextInput
                    value={textName}
                    onChangeText={text => this.setState({
                      textName: text,
                      emptyName: !this._checkEmptyField(text)
                    })}
                    style={styles.inputStyle}
                    underlineColorAndroid="transparent"
                    placeholder="HỌ VÀ TÊN"
                    placeholderTextColor="#CCC"
                    autoCorrect={false}
                    autoCapitalize="none"
                    editable
                    clearButtonMode="while-editing"
                    keyboardType="default"
                    returnKeyType="next"
                  />
                </View>
                {emptyName ? <Text style={styles.txtHighLight}>{'Nhập họ tên'}</Text> : null}
              </View>
              <View>
                <View style={styles.inputContainer}>
                  <View style={styles.iconContainer}>
                    <Icon name={Platform.OS === 'ios' ? 'ios-mail-outline' : 'md-mail'} size={ICON_SIZE} color={'#696969'} />
                  </View>
                  <TextInput
                    value={textMail}
                    onChangeText={text => this.setState({
                      textMail: text,
                      emptyMail: !this._checkEmptyField(text)
                    })}
                    style={styles.inputStyle}
                    underlineColorAndroid="transparent"
                    placeholder="EMAIL"
                    placeholderTextColor="#CCC"
                    autoCorrect={false}
                    autoCapitalize="none"
                    editable
                    clearButtonMode="while-editing"
                    keyboardType="email-address"
                    returnKeyType="next"
                  />
                </View>
                {emptyMail ? <Text style={styles.txtHighLight}>{'Nhập email'}</Text> : null}
              </View>
              <View>
                <View style={styles.inputContainer}>
                  <View style={styles.iconContainer}>
                    <Icon name={Platform.OS === 'ios' ? 'ios-phone-portrait-outline' : 'md-phone-portrait'} size={ICON_SIZE} color={'#696969'} />
                  </View>
                  <TextInput
                    value={phoneNumber}
                    onChangeText={text => this.setState({
                      phoneNumber: text,
                      emptyPhoneNumber: !this._checkEmptyField(text)
                    })}
                    style={styles.inputStyle}
                    underlineColorAndroid="transparent"
                    placeholder="SỐ ĐIỆN THOẠI"
                    placeholderTextColor="#CCC"
                    autoCorrect={false}
                    autoCapitalize="none"
                    editable
                    clearButtonMode="while-editing"
                    keyboardType="numeric"
                    returnKeyType="next"
                  />
                </View>
                {emptyPhoneNumber ? <Text style={styles.txtHighLight}>{'Nhập số điện thoại'}</Text> : null}
              </View>
              <View>
                <View style={styles.contentContainer}>
                  <TextInput
                    value={content}
                    onChangeText={text => this.setState({
                      content: text,
                      emptyContent: !this._checkEmptyField(text)
                    })}
                    style={styles.contentStyle}
                    underlineColorAndroid="transparent"
                    placeholder="NỘI DUNG"
                    placeholderTextColor="#CCC"
                    autoCorrect={false}
                    autoCapitalize="sentences"
                    multiline
                    keyboardType="default"
                  />
                </View>
                {/* {emptyContent ? <Text style={styles.txtHighLight}>{'Nhập nội dung'}</Text> : null} */}
              </View>
              <View style={{ flex: 1, justifyContent: 'center', paddingTop: 15, paddingBottom: 30, paddingHorizontal: 5 }}>
                {this.renderButton()}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  info: {
    justifyContent: 'flex-start'
  },
  infoTxt: {
    marginTop: 15,
    color: '#696969'
  },
  mailTxt: {
    color: '#51acff',
    marginLeft: 5
  },
  location: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center'
  },
  mapContainer: {
    marginBottom: 10
  },
  mapTxt: {
    marginLeft: 10,
    color: '#696969'
  },
  inputStyle: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingRight: 10,
    fontSize: 13,
    justifyContent: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingRight: 10,
    borderColor: '#696969',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 5
  },
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderColor: '#696969',
    borderRadius: 5,
    height: 150,
    marginTop: 20,
    marginBottom: 5
  },
  contentStyle: {
    fontSize: 13,
    justifyContent: 'flex-start',
    flex: 1
  },
  buttonStyle: {
    flex: 1,
    paddingVertical: 15,
    backgroundColor: '#f37545',
    borderRadius: 35,
    justifyContent: 'center'
  },
  txtButton: {
    alignSelf: 'center',
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6
  },
  mapStyle: {
    width: null,
    height: 300,
    flex: 1
  },
  errorText: {
    fontSize: 13,
    color: '#FF0508'
  },
  wrapBtn: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  txtHighLight: {
    fontSize: 11,
    color: 'red'
  }
});
