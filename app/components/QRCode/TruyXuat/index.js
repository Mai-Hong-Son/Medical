import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import Header from '../../Reusables/UICustom/header';
import LoadingView from '../../Reusables/UICustom/LoadingView';
import * as commonActions from '../../../../redux/actions';

const { width: WINDOW_WIDTH } = Dimensions.get('window');

@connect(
  state => ({
    ketquatruyxuathoadon: state.truyxuathoadon
  }),
  { ...commonActions }
)
export default class TruyXuat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    const { receiptId } = this.props.navigation.state.params;
    this.props.truyxuathoadon(receiptId);
  }

  componentWillReceiveProps(nextProps) {
    const { ketquatruyxuathoadon } = nextProps;

    if (!ketquatruyxuathoadon.error) {
      this._ten_co_so = ketquatruyxuathoadon.data.ten_co_so;
      this._dia_chi = ketquatruyxuathoadon.data.dia_chi;
    }

    if (this.unmounted) {
      return;
    }

    this.setState({
      loading: false
    });
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  _onPress({ ten_thuoc, so_dang_ky, so_lo, ten_co_so, dia_chi }) {
    this.props.navigation.navigate('WarningCloned', {
      ten_thuoc,
      so_dang_ky,
      so_lo,
      ten_co_so,
      dia_chi
    });
  }

  _renderItem({ item }) {
    const { ten_thuoc, so_dang_ky, so_lo, so_luong, don_vi, duong_dan_anh } = item;
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 20,
          paddingVertical: 15
        }}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: duong_dan_anh }} style={styles.image} />
        </View>
        <View style={styles.thuocContentContainer}>
          <Text style={styles.tenThuoc}>{ten_thuoc}</Text>
          <Text style={styles.thuocDescription}>{`Số đăng ký: ${so_dang_ky}`}</Text>
          <Text style={styles.thuocDescription}>{`Số lô: ${so_lo}`}</Text>
          <Text style={styles.thuocDescription}>{`Số lượng: ${so_luong} ${don_vi}`}</Text>
          <TouchableWithoutFeedback
            onPress={this._onPress.bind(this, {
              ten_thuoc,
              so_dang_ky,
              so_lo,
              ten_co_so: this._ten_co_so,
              dia_chi: this._dia_chi
            })}
          >
            <View style={styles.thuocButton}>
              <Text style={styles.thuocButtonText}>CẢNH BÁO</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }

  _renderHeaderComponent() {
    const { receiptId } = this.props.navigation.state.params;
    const {
      ten_co_so,
      dia_chi,
      ngay_ban,
      nguoi_ban,
      khach_mua
    } = this.props.ketquatruyxuathoadon.data;
    return (
      <View style={styles.headerContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>{`MÃ HÓA ĐƠN: ${receiptId}`}</Text>
        </View>
        <View style={styles.sectionContent}>
          <Text style={styles.sectionContentText}>{`Nơi bán: ${ten_co_so}`}</Text>
          <Text style={styles.sectionContentText}>{`Địa chỉ: ${dia_chi}`}</Text>
          <Text style={styles.sectionContentText}>{`Ngày bán: ${ngay_ban}`}</Text>
          <Text style={styles.sectionContentText}>{`Người bán: ${nguoi_ban}`}</Text>
          <Text style={styles.sectionContentText}>{`Khách mua: ${khach_mua}`}</Text>
        </View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>CHI TIẾT HÓA ĐƠN</Text>
        </View>
      </View>
    );
  }

  _renderSeparator() {
    return (
      <View
        style={{
          height: 1,
          left: 20,
          backgroundColor: '#DDD'
        }}
      />
    );
  }

  renderTruyXuatView() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Header navigation={this.props.navigation} type={'stack'} />
        <FlatList
          data={this.props.ketquatruyxuathoadon.data.chiTiet}
          keyExtractor={item => item.thuoc_id.toString()}
          renderItem={this._renderItem.bind(this)}
          ListHeaderComponent={this._renderHeaderComponent()}
          ItemSeparatorComponent={this._renderSeparator.bind(this)}
        />
      </View>
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <LoadingView
          text="Đang tải dữ liệu hóa đơn"
          navigation={this.props.navigation}
          type={'stack'}
        />
      );
    }

    const { ketquatruyxuathoadon } = this.props;
    if (ketquatruyxuathoadon.error) {
      return (
        <View style={styles.container}>
          <Header navigation={this.props.navigation} type={'stack'} />
          <View style={styles.containerEmpty}>
            <Text style={styles.errorText}>{'Mã hóa đơn không tồn tại trong hệ thống'}</Text>
          </View>
        </View>
      );
    }

    return this.renderTruyXuatView();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },

  containerEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  sectionHeader: {
    backgroundColor: 'rgb(228, 233, 238)',
    paddingHorizontal: 10,
    paddingVertical: 10
  },

  sectionHeaderText: {
    fontWeight: '700',
    color: 'rgb(107, 111, 118)'
  },

  sectionContent: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },

  sectionContentText: {
    marginVertical: 3,
    fontWeight: '600',
    color: 'rgb(144, 147, 151)'
  },

  imageContainer: {
    width: WINDOW_WIDTH * 0.35,
    height: WINDOW_WIDTH * 0.4,
    borderRadius: 3,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: '#DDD'
  },

  image: {
    flex: 1
  },

  thuocContentContainer: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    flex: 1
  },

  tenThuoc: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5
  },

  thuocDescription: {
    fontSize: 12,
    fontWeight: '600'
  },

  thuocButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    backgroundColor: 'rgb(248, 141, 90)',
    borderRadius: 4,
    marginTop: 10
  },

  thuocButtonText: {
    color: 'white',
    fontSize: 12
  },

  errorText: {
    fontSize: 15
  }
});
