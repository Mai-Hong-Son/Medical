import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'react-native-fetch-blob';
import ImageCard from './ImageCard';
import Header from './../Reusables/UICustom/header';
import * as commonActions from '../../../redux/actions';
import { isPhoneNumber } from '../Reusables/ValidateData';

const PLACEHOLDER_TEXT_COLOR = '#BBB';

const reasons = ['Thuốc giả', 'Thuốc kém chất lượng', 'Lý do khác'];

@connect(
  state => ({
    ketquacanhbaothuoc: state.ketquacanhbaothuoc
  }),
  { ...commonActions }
)
export default class WarningView extends React.Component {
  constructor(props) {
    super(props);

    this.initialValues = {};
    this.populated = false;
    if (props.navigation.state.params) {
      this.populated = true;
      const { ten_thuoc, so_dang_ky, so_lo, ten_co_so, dia_chi } = props.navigation.state.params;
      this.initialValues = {
        ten_thuoc,
        so_dang_ky,
        so_lo,
        ten_co_so,
        dia_chi
      };
    }

    this.state = {
      horizontalScrollViewHeight: 0,
      reason: null,
      loading: false,
      tenThuoc: '',
      soDangKy: '',
      soLo: '',
      chiTietCanhBao: '',
      tenNhaThuoc: '',
      diaChiNhaThuoc: '',
      hoVaTen: '',
      soDienThoai: '',
      diaChiNguoiGui: '',

      emptyTenThuoc: false,
      emptySoDangKy: false,
      emptySoLo: false,
      emptyChiTietCanhBao: false,
      emptyTenNhaThuoc: false,
      emptyDiaChiNhaThuoc: false,
      emptyHovaTen: false,
      emptySoDienThoai: false,
      saiSoDienThoai: false,
      emptyDiaChiNguoiGui: false
    };

    this._ref = {
      imageCard1: React.createRef(),
      imageCard2: React.createRef(),
      imageCard3: React.createRef()
    };

    this._submitPending = false;
  }

  componentDidMount() {
    if (this.props.navigation.state.params) {
      const { ten_thuoc, so_dang_ky, so_lo, ten_co_so, dia_chi } = this.props.navigation.state.params;

      this.setState({
        tenThuoc: ten_thuoc,
        soDangKy: so_dang_ky,
        soLo: so_lo,
        tenNhaThuoc: ten_co_so,
        diaChiNhaThuoc: dia_chi
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.unmounted) {
      return;
    }
    const { ketquacanhbaothuoc } = nextProps;

    if (ketquacanhbaothuoc.data) {
      const image1 = this._ref.imageCard1.current.getImageSource();
      const image2 = this._ref.imageCard2.current.getImageSource();
      const image3 = this._ref.imageCard3.current.getImageSource();
      const images = [];
      if (image1) {
        images.push(image1.replace('file://', ''));
      }
      if (image2) {
        images.push(image2.replace('file://', ''));
      }
      if (image3) {
        images.push(image3.replace('file://', ''));
      }

      if (images.length === 0) {
        this.setState({ loading: false }, () => {
          Alert.alert('Thông báo', 'Gửi báo cáo thành công!', [
            {
              text: 'OK',
              onPress: () => {
                this.initialValues = {};

                this.setState({
                  reason: null,
                  tenThuoc: '',
                  soDangKy: '',
                  soLo: '',
                  chiTietCanhBao: '',
                  tenNhaThuoc: '',
                  diaChiNhaThuoc: '',
                  hoVaTen: '',
                  soDienThoai: '',
                  diaChiNguoiGui: ''
                }, () => {
                  // this._ref.imageCard1.current.resetImageSource();
                  // this._ref.imageCard2.current.resetImageSource();
                  // this._ref.imageCard3.current.resetImageSource();
                  this._submitPending = false;
                });
              }
            }
          ]);
        });
        return;
      }

      this._uploadImages({ id: ketquacanhbaothuoc.data, images });
    }
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  _uploadImages({ id, images }) {
    const files = images.map(image => {
      const ext = image.slice(image.lastIndexOf('.') + 1);
      const name = image.slice(image.lastIndexOf('/') + 1);
      let type = '';
      if (ext === 'jpg') {
        type = 'image/jpeg';
      } else if (ext === 'png') {
        type = 'image/png';
      }
      return {
        name,
        filename: name,
        type,
        data: RNFetchBlob.wrap(image)
      };
    });

    RNFetchBlob.fetch(
      'POST',
      `http://tracuu.duocquocgia.vn/api/File?id=${id}`,
      {
        'Content-Type': 'multipart/form-data'
      },
      files
    )
      .then(res => {
        if (this.unmounted) {
          return;
        }
        this.setState({ loading: false }, () => {
          this._submitPending = false;
          Alert.alert('Thông báo', 'Gửi báo cáo thành công!', [
            {
              text: 'OK',
              onPress: () => {
                this.initialValues = {};

                this.setState({
                  reason: null,
                  tenThuoc: '',
                  soDangKy: '',
                  soLo: '',
                  chiTietCanhBao: '',
                  tenNhaThuoc: '',
                  diaChiNhaThuoc: '',
                  hoVaTen: '',
                  soDienThoai: '',
                  diaChiNguoiGui: ''
                }, () => {
                  this._ref.imageCard1.current.resetImageSource();
                  this._ref.imageCard2.current.resetImageSource();
                  this._ref.imageCard3.current.resetImageSource();
                  this._submitPending = false;
                });
              }
            }
          ]);
        });
      })
      .catch(e => {
        if (this.unmounted) {
          return;
        }
        this.setState({ loading: false }, () => {
          Alert.alert('Lỗi', 'Gửi báo cáo không thành công, hãy thử lại!', [
            {
              text: 'OK',
              onPress: () => (this._submitPending = false)
            }
          ]);
        });
      });
  }

  _onReasonPress = () => {
    this.props.navigation.navigate('ReasonSelect', {
      onSelect: index => {
        this.setState({ reason: index });
      },
      reasons
    });
  };

  _checkEmptyField = text => {
    if (text === '' || text.replace(/\s/g, '').length === 0) {
      return false;
    }

    return true;
  }

  _onSubmitPress = () => {
    // if (this._submitPending) {
    //   return;
    // }

    this._submitPending = true;

    const { tenThuoc, soDangKy, soLo, chiTietCanhBao, tenNhaThuoc, diaChiNhaThuoc, hoVaTen, soDienThoai, diaChiNguoiGui } = this.state;

    if (!this._checkEmptyField(tenThuoc)) {
      this.setState({
        emptyTenThuoc: true
      });
    }
    if (!this._checkEmptyField(soDangKy)) {
      this.setState({
        emptySoDangKy: true
      });
    }
    if (!this._checkEmptyField(soLo)) {
      this.setState({
        emptySoLo: true
      });
    }
    // if (!this._checkEmptyField(chiTietCanhBao)) {
    //   this.setState({
    //     emptyChiTietCanhBao: true
    //   });
    // }
    if (!this._checkEmptyField(tenNhaThuoc)) {
      this.setState({
        emptyTenNhaThuoc: true
      });
    }
    if (!this._checkEmptyField(diaChiNhaThuoc)) {
      this.setState({
        emptyDiaChiNhaThuoc: true
      });
    }
    // if (!this._checkEmptyField(hoVaTen)) {
    //   this.setState({
    //     emptyHovaTen: true
    //   });
    // }
    // if (!this._checkEmptyField(soDienThoai)) {
    //   this.setState({
    //     emptySoDienThoai: true
    //   });
    // }
    // if (!this._checkEmptyField(diaChiNguoiGui)) {
    //   this.setState({
    //     emptyDiaChiNguoiGui: true
    //   });
    // }
    if (!this._checkEmptyField(tenThuoc) || !this._checkEmptyField(soDangKy) ||
      !this._checkEmptyField(soLo) || !this._checkEmptyField(tenNhaThuoc) || !this._checkEmptyField(diaChiNhaThuoc)) {
      return;
    }

    if (this.state.reason === null) {
      Alert.alert('Thiếu thông tin', 'Xin chọn lý do cảnh báo.', [
        {
          text: 'OK',
          onPress: () => (this._submitPending = false)
        }
      ]);
      return;
    }
    if (!isPhoneNumber(soDienThoai) && this._checkEmptyField(soDienThoai)) {
      this.setState({
        saiSoDienThoai: true
      });
      return;
    }

    this.props.canhbaothuoc({
      ten_nha_thuoc: tenNhaThuoc,
      ten_thuoc: tenThuoc,
      so_dang_ky: soDangKy,
      so_lo: soLo,
      noi_dung: chiTietCanhBao,
      ly_do: this.state.reason === null ? this.state.reason : this.state.reason + 1,
      ho_ten: hoVaTen,
      so_dien_thoai: soDienThoai,
      dia_chi_nguoi_gui: diaChiNguoiGui,
      dia_chi: diaChiNhaThuoc
    });

    this.setState({ loading: true });
  };

  render() {
    const {
      tenThuoc,
      soDangKy,
      soLo,
      chiTietCanhBao,
      tenNhaThuoc,
      diaChiNhaThuoc,
      hoVaTen,
      soDienThoai,
      diaChiNguoiGui,
      // emptyChiTietCanhBao,
      // emptyDiaChiNguoiGui,
      emptyDiaChiNhaThuoc,
      // emptyHovaTen,
      emptySoDangKy,
      saiSoDienThoai,
      // emptySoDienThoai,
      emptySoLo,
      emptyTenNhaThuoc,
      emptyTenThuoc
    } = this.state;

    return (
      <View style={[styles.container, this.populated ? {} : { paddingBottom: 60 }]}>
        <Header type={this.populated ? 'stack' : 'tab'} title={'CẢNH BÁO THUỐC'} navigation={this.props.navigation} />
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <ScrollView contentContainerStyle={styles.verticalScrollView} showsVerticalScrollIndicator={false}>
            <View
              style={{
                position: 'absolute',
                top: 0,
                height: this.state.horizontalScrollViewHeight,
                left: 0,
                right: 0,
                backgroundColor: '#C0BCB5'
              }}
            />
            <ScrollView
              horizontal
              contentContainerStyle={styles.horizontalScrollView}
              showsHorizontalScrollIndicator={false}
              onLayout={event => {
                const { height } = event.nativeEvent.layout;
                this.setState({
                  horizontalScrollViewHeight: height
                });
              }}
            >
              <ImageCard ref={this._ref.imageCard1} />
              <ImageCard ref={this._ref.imageCard2} />
              <ImageCard ref={this._ref.imageCard3} />
            </ScrollView>

            <View style={styles.formContainer}>
              <View style={styles.section}>
                <Text style={styles.sectionName}>THÔNG TIN THUỐC</Text>
                <View>
                  <View style={this.initialValues.ten_thuoc ? styles.textFieldContainerPolulated : styles.textFieldContainer}>
                    <TextInput
                      editable={!this.initialValues.ten_thuoc}
                      placeholder={!this.initialValues.ten_thuoc ? 'TÊN THUỐC' : this.initialValues.ten_thuoc}
                      value={tenThuoc}
                      onChangeText={(text) => this.setState({
                        tenThuoc: text,
                        emptyTenThuoc: !this._checkEmptyField(text)
                      })}
                      style={styles.textInput}
                      placeholderTextColor={this.initialValues.ten_thuoc ? 'black' : PLACEHOLDER_TEXT_COLOR}
                      underlineColorAndroid="transparent"
                    />
                  </View>
                  {emptyTenThuoc ? <Text style={styles.txtHighLight}>{'Nhập tên thuốc'}</Text> : null}
                </View>
                <View style={styles.soDangKyAndSoLo}>
                  <View style={styles.wrapSDKSL}>
                    <View style={this.initialValues.so_dang_ky ? styles.textFieldContainerPolulated : styles.textFieldContainer}>
                      <TextInput
                        editable={!this.initialValues.so_dang_ky}
                        placeholder={!this.initialValues.so_dang_ky ? 'SỐ ĐĂNG KÝ' : this.initialValues.so_dang_ky}
                        value={soDangKy}
                        onChangeText={(text) => this.setState({
                          soDangKy: text,
                          emptySoDangKy: !this._checkEmptyField(text)
                        })}
                        style={styles.textInput}
                        placeholderTextColor={this.initialValues.so_dang_ky ? 'black' : PLACEHOLDER_TEXT_COLOR}
                        underlineColorAndroid="transparent"
                      />
                    </View>
                    {emptySoDangKy ? <Text style={styles.txtHighLight}>{'Nhập số đăng ký'}</Text> : null}
                  </View>
                  <View style={styles.wrapSDKSL}>
                    <View style={this.initialValues.so_lo ? styles.textFieldContainerPolulated : styles.textFieldContainer}>
                      <TextInput
                        editable={!this.initialValues.so_lo}
                        placeholder={!this.initialValues.so_lo ? 'SỐ LÔ' : this.initialValues.so_lo}
                        value={soLo}
                        onChangeText={(text) => this.setState({
                          soLo: text,
                          emptySoLo: !this._checkEmptyField(text)
                        })}
                        style={styles.textInput}
                        placeholderTextColor={this.initialValues.so_lo ? 'black' : PLACEHOLDER_TEXT_COLOR}
                        underlineColorAndroid="transparent"
                      />
                    </View>
                    {emptySoLo ? <Text style={styles.txtHighLight}>{'Nhập số lô'}</Text> : null}
                  </View>
                </View>
                <TouchableOpacity onPress={this._onReasonPress}>
                  <View style={[styles.textFieldContainer, styles.reasonButtonTextRow]}>
                    {this.state.reason !== null ? (
                      <Text style={styles.reasonButtonText}>{reasons[this.state.reason]}</Text>
                    ) :
                      (
                        <Text style={styles.reasonButtonTextNull}>{'CHỌN LÝ DO'}</Text>
                      )}
                    <FontAwesome name="chevron-right" color={PLACEHOLDER_TEXT_COLOR} />
                  </View>
                </TouchableOpacity>
                <View>
                  <View style={styles.textFieldContainer}>
                    <TextInput
                      value={chiTietCanhBao}
                      onChangeText={(text) => this.setState({
                        chiTietCanhBao: text,
                        emptyChiTietCanhBao: !this._checkEmptyField(text)
                      })}
                      multiline
                      placeholder="CHI TIẾT CẢNH BÁO"
                      placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                      underlineColorAndroid="transparent"
                      style={styles.textInput}
                      minHeight={80}
                      maxHeight={80}
                    />
                  </View>
                  {/* {emptyChiTietCanhBao ? <Text style={styles.txtHighLight}>{'Nhập chi tiết cảnh báo'}</Text> : null} */}
                </View>
              </View>
              <View style={styles.section}>
                <Text style={styles.sectionName}>THÔNG TIN NHÀ THUỐC</Text>
                <View>
                  <View style={this.initialValues.ten_co_so ? styles.textFieldContainerPolulated : styles.textFieldContainer}>
                    <TextInput
                      editable={!this.initialValues.ten_co_so}
                      value={tenNhaThuoc}
                      onChangeText={(text) => this.setState({
                        tenNhaThuoc: text,
                        emptyTenNhaThuoc: !this._checkEmptyField(text)
                      })}
                      placeholder={!this.initialValues.ten_co_so ? 'TÊN NHÀ THUỐC' : this.initialValues.ten_co_so}
                      style={styles.textInput}
                      placeholderTextColor={this.initialValues.ten_co_so ? 'black' : PLACEHOLDER_TEXT_COLOR}
                      underlineColorAndroid="transparent"
                    />
                  </View>
                  {emptyTenNhaThuoc ? <Text style={styles.txtHighLight}>{'Nhập tên nhà thuốc'}</Text> : null}
                </View>
                <View>
                  <View style={this.initialValues.dia_chi ? styles.textFieldContainerPolulated : styles.textFieldContainer}>
                    <TextInput
                      editable={!this.initialValues.dia_chi}
                      value={diaChiNhaThuoc}
                      onChangeText={(text) => this.setState({
                        diaChiNhaThuoc: text,
                        emptyDiaChiNhaThuoc: !this._checkEmptyField(text)
                      })}
                      placeholder={!this.initialValues.dia_chi ? 'ĐỊA CHỈ NHÀ THUỐC' : this.initialValues.dia_chi}
                      style={styles.textInput}
                      placeholderTextColor={this.initialValues.dia_chi ? 'black' : PLACEHOLDER_TEXT_COLOR}
                      underlineColorAndroid="transparent"
                    />
                  </View>
                  {emptyDiaChiNhaThuoc ? <Text style={styles.txtHighLight}>{'Nhập địa chỉ nhà thuốc'}</Text> : null}
                </View>
              </View>
              <View style={styles.section}>
                <Text style={styles.sectionName}>THÔNG TIN NGƯỜI GỬI</Text>
                <View>
                  <View style={styles.textFieldContainer}>
                    <TextInput
                      value={hoVaTen}
                      onChangeText={(text) => this.setState({
                        hoVaTen: text,
                        emptyHovaTen: !this._checkEmptyField(text)
                      })}
                      placeholder="HỌ VÀ TÊN"
                      style={styles.textInput}
                      placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                      underlineColorAndroid="transparent"
                    />
                  </View>
                  {/* {emptyHovaTen ? <Text style={styles.txtHighLight}>{'Nhập họ tên'}</Text> : null} */}
                </View>
                <View>
                  <View style={styles.textFieldContainer}>
                    <TextInput
                      value={soDienThoai}
                      onChangeText={(text) => this.setState({
                        soDienThoai: text,
                        saiSoDienThoai: !this._checkEmptyField(text)
                      })}
                      placeholder="SỐ ĐIỆN THOẠI"
                      style={styles.textInput}
                      placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                      underlineColorAndroid="transparent"
                      keyboardType="numeric"
                    />
                  </View>
                  {saiSoDienThoai && soDienThoai !== '' ? <Text style={styles.txtHighLight}>{'Sai định dạng số điện thoại'}</Text> : null}
                </View>
                <View>
                  <View style={styles.textFieldContainer}>
                    <TextInput
                      value={diaChiNguoiGui}
                      onChangeText={(text) => this.setState({
                        diaChiNguoiGui: text,
                        emptyDiaChiNguoiGui: !this._checkEmptyField(text)
                      })}
                      placeholder="ĐỊA CHỈ NGƯỜI GỬI"
                      placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                      underlineColorAndroid="transparent"
                      style={styles.textInput}
                    />
                  </View>
                  {/* {emptyDiaChiNguoiGui ? <Text style={styles.txtHighLight}>{'Nhập địa chỉ người gửi'}</Text> : null} */}
                </View>
              </View>

              <View style={styles.submitButtonArea}>
                <TouchableOpacity onPress={this._onSubmitPress}>
                  <View style={styles.submitButton}>
                    {this.state.loading ? (
                      <ActivityIndicator color="#fff" />
                    ) :
                      (
                        <View style={styles.buttonTextRow}>
                          <View style={styles.iconContainer}>
                            <FontAwesome name="lock" size={16} color="white" />
                          </View>
                          <Text style={styles.submitButtonText}>GỬI THÔNG TIN</Text>
                        </View>
                      )}
                  </View>
                </TouchableOpacity>
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

  verticalScrollView: {
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  },

  horizontalScrollView: {
    justifyContent: 'flex-start',
    backgroundColor: '#C0BCB5',
    paddingVertical: 10,
    paddingHorizontal: 5
  },

  formContainer: {
    flex: 1,
    paddingHorizontal: 15
  },

  sectionName: {
    marginHorizontal: 5
  },

  section: {
    paddingTop: 15
  },

  textFieldContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginVertical: 5,
    marginLeft: 5,
    marginRight: 5
  },

  textFieldContainerPolulated: {
    backgroundColor: 'rgb(228, 230, 235)',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginVertical: 5,
    marginLeft: 5,
    marginRight: 5
  },

  reasonButtonTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  textInput: {
    fontSize: 14
  },

  textInputPopulated: {
    fontSize: 14,
    color: 'black'
  },

  reasonButtonText: {
    color: 'black'
  },

  reasonButtonTextNull: {
    color: PLACEHOLDER_TEXT_COLOR
  },

  soDangKyAndSoLo: {
    flexDirection: 'row'
  },

  submitButtonArea: {
    flex: 1,
    paddingVertical: 30
  },

  submitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f37545',
    paddingVertical: 15,
    borderRadius: 30
  },

  submitButtonText: {
    color: 'white',
    fontSize: 16
  },

  buttonTextRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  iconContainer: {
    paddingHorizontal: 5
  },

  txtHighLight: {
    paddingHorizontal: 5,
    fontSize: 11,
    color: 'red'
  },

  wrapSDKSL: {
    flex: 1
  }
});
