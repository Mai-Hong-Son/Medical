import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TextInput,
  YellowBox,
  TouchableWithoutFeedback,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { connect } from 'react-redux';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import * as commonActions from '../../../redux/actions';
import LoadingView from '../Reusables/UICustom/LoadingView';
import Header from './../Reusables/UICustom/header';
import ErrorView from '../Reusables/UICustom/ErrorView';

const { width: WINDOW_WIDTH } = Dimensions.get('window');

@connect(
  state => ({
    ketquachitietthuoc: state.ketquachitietthuoc,
    ketquatruyxuathandung: state.ketquatruyxuathandung
  }),
  { ...commonActions }
)
export default class Details extends React.Component {
  constructor(props) {
    super(props);

    this._tabs = [
      {
        name: 'Mô tả',
        refs: { title: React.createRef(), marker: React.createRef() }
      },
      {
        name: 'Thành phần',
        refs: { title: React.createRef(), marker: React.createRef() }
      },
      {
        name: 'Công dụng',
        refs: { title: React.createRef(), marker: React.createRef() }
      },
      {
        name: 'Liều dùng',
        refs: { title: React.createRef(), marker: React.createRef() }
      },
      {
        name: 'Truy xuất',
        refs: { title: React.createRef(), marker: React.createRef() }
      }
    ];

    this._soLoInputRef = React.createRef();
    this._soLoSubmitted = null;

    this.state = {
      loading: true,
      loadingEXP: false,
      soLo: 'Chưa nhập',
      currentTab: 0,

      txtSolo: '',
      emptySolo: false
    };

    YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
  }

  componentDidMount() {
    const { detailsId } = this.props.navigation.state.params;
    this.props.getchitietthuoc(detailsId);
  }

  componentWillReceiveProps(nextProps) {
    const { ketquachitietthuoc } = nextProps;

    if (this.unmounted) {
      return;
    }

    if (this.state.loading) {
      this.setState({ loading: false });
    }

    if (this.state.loadingEXP) {
      this.setState({ loadingEXP: false });
    }
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  _highlightActiveTab() {
    this._tabs.forEach(({ refs }) => {
      refs.title.current.setNativeProps({ style: { color: 'black' } });
      refs.marker.current.setNativeProps({
        style: { borderTopWidth: 0 }
      });
    });

    const { title, marker } = this._tabs[this.state.currentTab].refs;
    title.current.setNativeProps({
      style: { color: 'rgb(93, 93, 139)' }
    });

    marker.current.setNativeProps({
      borderTopWidth: 2,
      borderColor: 'rgb(93, 93, 139)'
    });
  }

  _getTabBarButton({ name, refs }, index) {
    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => {
          this.setState({ currentTab: index }, () => {
            this._highlightActiveTab();
          });
        }}
      >
        <View ref={refs.marker} style={styles.tabBarItem}>
          <Text ref={refs.title} style={styles.tabBarItemTitle}>
            {name}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _renderContent() {
    switch (this.state.currentTab) {
      case 0:
        return this._renderMoTa();
      case 1:
        return this._renderThanhPhan();
      case 2:
        return this._renderCongDung();
      case 3:
        return this._renderLieuDung();
      case 4:
        return this._renderTruyXuat();
      default:
        return null;
    }
  }

  _renderMoTa() {
    const { tenThuoc, soDangKy, hoatChatChinh, hamLuong, hangSanXuat, nuocSanXuat } = this.props.ketquachitietthuoc.data;
    return (
      <View>
        <View style={styles.sectionNameContainer}>
          <Text style={styles.sectionNameText}>MÔ TẢ</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.contentRow}>
            <Text style={styles.contentRowLeftText}>Tên thương mại: </Text>
            <Text style={styles.contentRowRightText}>{tenThuoc || 'Đang cập nhật...'}</Text>
          </View>
          <View style={styles.contentRow}>
            <Text style={styles.contentRowLeftText}>Số đăng ký: </Text>
            <Text style={styles.contentRowRightText}>{soDangKy || 'Đang cập nhật...'}</Text>
          </View>
          <View style={styles.contentRow}>
            <Text style={styles.contentRowLeftText}>Hoạt chất chính: </Text>
            <Text style={styles.contentRowRightText}>{hoatChatChinh || 'Đang cập nhật...'}</Text>
          </View>
          <View style={styles.contentRow}>
            <Text style={styles.contentRowLeftText}>Hàm lượng: </Text>
            <Text style={styles.contentRowRightText}>{hamLuong || 'Đang cập nhật...'}</Text>
          </View>
          <View style={styles.contentRow}>
            <Text style={styles.contentRowLeftText}>Nhà sản xuất: </Text>
            <Text style={styles.contentRowRightText}>{hangSanXuat || 'Đang cập nhật...'}</Text>
          </View>
          <View style={styles.contentRow}>
            <Text style={styles.contentRowLeftText}>Nước sản xuất: </Text>
            <Text style={styles.contentRowRightText}>{nuocSanXuat || 'Đang cập nhật...'}</Text>
          </View>
        </View>
      </View>
    );
  }

  _renderThanhPhan() {
    const { hoatChatChinh, hamLuong, thanhPhan } = this.props.ketquachitietthuoc.data;
    return (
      <View>
        <View style={styles.sectionNameContainer}>
          <Text style={styles.sectionNameText}>THÀNH PHẦN</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.contentRow}>
            <Text style={styles.contentRowLeftText}>Hoạt chất chính: </Text>
            <Text style={styles.contentRowRightText}>{hoatChatChinh || 'Đang cập nhật...'}</Text>
          </View>
          <View style={styles.contentRow}>
            <Text style={styles.contentRowLeftText}>Hàm lượng: </Text>
            <Text style={styles.contentRowRightText}>{hamLuong || 'Đang cập nhật...'}</Text>
          </View>
          <View style={styles.contentRow}>
            <Text style={styles.contentRowLeftText}>Thành phần: </Text>
            <Text style={styles.contentRowRightText}>{thanhPhan || 'Đang cập nhật...'}</Text>
          </View>
        </View>
      </View>
    );
  }

  _renderCongDung() {
    const { chiDinh, chongChiDinh, khuyenCao } = this.props.ketquachitietthuoc.data;
    return (
      <View>
        <View style={styles.sectionNameContainer}>
          <Text style={styles.sectionNameText}>CÔNG DỤNG</Text>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.contentRow}>
            <Text style={styles.contentRowLeftText}>Chỉ định: </Text>
            <Text style={styles.contentRowRightText}>{chiDinh || 'Đang cập nhật...'}</Text>
          </View>
          <View style={styles.contentRow}>
            <Text style={styles.contentRowLeftText}>Chống chỉ định: </Text>
            <Text style={styles.contentRowRightText}>{chongChiDinh || 'Đang cập nhật...'}</Text>
          </View>
          <View style={styles.contentRow}>
            <Text style={styles.contentRowLeftText}>Khuyến cáo: </Text>
            <Text style={styles.contentRowRightText}>{khuyenCao || 'Đang cập nhật...'}</Text>
          </View>
        </View>
      </View>
    );
  }

  _renderLieuDung() {
    const { lieuLuong, duongDung } = this.props.ketquachitietthuoc.data;
    return (
      <View>
        <View style={styles.sectionNameContainer}>
          <Text style={styles.sectionNameText}>LIỀU DÙNG</Text>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.contentRow}>
            <Text style={styles.contentRowLeftText}>Liều dùng: </Text>
            <Text style={styles.contentRowRightText}>{lieuLuong || 'Đang cập nhật...'}</Text>
          </View>
          <View style={styles.contentRow}>
            <Text style={styles.contentRowLeftText}>Đường dùng: </Text>
            <Text style={styles.contentRowRightText}>{duongDung || 'Đang cập nhật...'}</Text>
          </View>
        </View>
      </View>
    );
  }

  _onSubmitEditing = () => {
    if (this.state.loading) {
      return;
    }

    if (!this._checkEmptyField(this.state.txtSolo)) {
      this.setState({
        emptySolo: true
      });

      return;
    }

    this.setState({ loadingEXP: true }, () => {
      const { detailsId } = this.props.navigation.state.params;
      const soLo = this.state.txtSolo;
      this.props.truyxuathandung(detailsId, soLo);
      this.setState({ soLo });
    });
  };

  _checkEmptyField = text => {
    if (text === '' || text.replace(/\s/g, '').length === 0) {
      return false;
    }

    return true;
  }

  _renderTruyXuat() {
    return (
      <View>
        <View style={styles.sectionNameContainer}>
          <Text style={styles.sectionNameText}>TRUY XUẤT</Text>
        </View>
        <View style={styles.contentContainer}>
          <View>
            <View style={styles.soLoInputContainer}>
              <TextInput
                style={styles.soLoInput}
                underlineColorAndroid="transparent"
                placeholder="Nhập số lô"
                placeholderTextColor="#888"
                onSubmitEditing={this._onSubmitEditing}
                value={this.state.txtSolo}
                onChangeText={text => this.setState({
                  txtSolo: text,
                  emptySolo: !this._checkEmptyField(text)
                })}
              />
              <TouchableWithoutFeedback onPress={this._onSubmitEditing}>
                <View style={styles.soLoButton}>
                  {this.state.loadingEXP ? (
                    <ActivityIndicator style={{ backgroundColor: '#888', flex: 1 }} />
                  ) :
                    (
                      <FontAwesome name="plus" style={{ fontSize: 20, alignSelf: 'center' }} />
                    )}
                </View>
              </TouchableWithoutFeedback>
            </View>
            {this.state.emptySolo ? <Text style={styles.txtHighLight}>{'Chưa nhập số lô'}</Text> : null}
          </View>

          <View style={styles.contentRow}>
            <Text style={styles.contentRowLeftText}>Số lô</Text>
            <Text style={([styles.contentRowRightText], { color: 'rgb(98, 164, 255)' })}>{this.state.soLo}</Text>
          </View>
          <View style={styles.contentRow}>
            <Text style={styles.contentRowLeftText}>Số đăng ký</Text>
            {this._renderSoDangKy()}
          </View>
          <View style={styles.contentRow}>
            <Text style={styles.contentRowLeftText}>Ngày sản xuất</Text>
            {this._renderNgaySanXuat()}
          </View>
          <View style={styles.contentRow}>
            <Text style={styles.contentRowLeftText}>Ngày hết hạn</Text>
            {this._renderNgayHetHan()}
          </View>
        </View>
      </View>
    );
  }

  _renderSoDangKy() {
    if (this.state.loadingEXP) {
      return <ActivityIndicator />;
    }

    return <Text style={styles.contentRowRightText}>{'Chưa có thông tin'}</Text>;
  }

  _renderNgaySanXuat() {
    if (this.state.loadingEXP) {
      return <ActivityIndicator />;
    }

    return <Text style={styles.contentRowRightText}>{this.props.ketquatruyxuathandung.ngaySanXuat || 'Chưa có thông tin'}</Text>;
  }

  _renderNgayHetHan() {
    if (this.state.loadingEXP) {
      return <ActivityIndicator />;
    }

    return <Text style={styles.contentRowRightText}>{this.props.ketquatruyxuathandung.hanDung || 'Chưa có thông tin'}</Text>;
  }

  render() {
    if (this.state.loading) {
      return <LoadingView text="Đang tải dữ liệu thuốc" navigation={this.props.navigation} type={'stack'} />;
    }

    const { ketquachitietthuoc } = this.props;
    if (ketquachitietthuoc.error) {
      return (
        <ErrorView
          navigation={this.props.navigation}
          onRetryPressed={() => {
            this.setState({ loading: true }, () => {
              const { detailsId } = this.props.navigation.state.params;
              this.props.getchitietthuoc(detailsId);
            });
          }}
        />
      );
    }

    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} type="stack" title={''} />
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: ketquachitietthuoc.data.duongDanAnh }} style={styles.image} resizeMode="contain" />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{ketquachitietthuoc.data.tenThuoc}</Text>
            </View>
            {this._renderContent()}
          </ScrollView>
        </KeyboardAvoidingView>
        <View style={styles.tabBar}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            onLayout={() => {
              this._highlightActiveTab();
            }}
          >
            {this._tabs.map(({ name, refs }, index) => this._getTabBarButton({ name, refs }, index))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  containerEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  imageContainer: {
    width: WINDOW_WIDTH,
    height: WINDOW_WIDTH
  },

  image: {
    flex: 1
  },

  titleContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white'
  },

  titleText: {
    fontSize: 17,
    fontWeight: '700'
  },

  sectionNameContainer: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: 'rgb(214, 218, 222)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#AAA'
  },

  sectionNameText: {
    fontSize: 15,
    fontWeight: '500'
  },

  contentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white'
  },

  thuocDescription: {
    fontSize: 13,
    fontWeight: '400'
  },

  tabBar: {
    backgroundColor: '#DDD',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.5,
    elevation: 1
  },

  tabBarItem: {
    paddingVertical: 17,
    paddingHorizontal: 15
  },

  tabBarItemTitle: {
    fontSize: 13,
    fontWeight: '500'
  },

  contentRow: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#CCC',
    paddingVertical: 10,
    flex: 1
  },

  contentRowLeftText: {
    color: '#888',
    flex: 1
  },

  contentRowRightText: {
    fontWeight: '500',
    // textAlign: 'right',
    flex: 2
  },

  soLoInputContainer: {
    borderRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
    paddingLeft: 10,
    marginBottom: 15,
    borderColor: '#AAA',
    flexDirection: 'row',
    alignItems: 'center'
  },

  soLoInput: {
    flex: 1
  },

  soLoButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderColor: '#AAA'
  },

  errorText: {
    fontSize: 15
  },

  txtHighLight: {
    fontSize: 11,
    color: 'red'
  }
});
