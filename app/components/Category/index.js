import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import ErrorView from '../Reusables/UICustom/ErrorView';
import LoadingView from '../Reusables/UICustom/LoadingView';

import * as commonActions from '../../../redux/actions';

@connect(
  state => ({
    danhmucthuoc: state.getdanhmucthuoc
  }),
  { ...commonActions }
)
export default class CategoryView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isShowTextInput: false,
      dataDMT: []
    };
  }

  componentDidMount() {
    this.props.getdanhmucthuoc();
  }

  componentWillReceiveProps(nextProps) {
    const { danhmucthuoc } = nextProps;

    if (this.unmounted) {
      return;
    }

    if (danhmucthuoc.data) {
      this.setState({
        dataDMT: danhmucthuoc.data
      });
    }

    this.setState({
      loading: false
    });
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  _onPress(id, ten) {
    this.props.navigation.navigate('MedicalByCategory', {
      idMedical: id,
      categoryName: ten
    });
  }

  _renderCategoryCard({ index, id, ten, so_luong }) {
    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={this._onPress.bind(this, id, ten)}
      >
        <View style={styles.categoryCard}>
          <View style={styles.indexContainer}>
            <Text style={styles.indexText}>{index + 1}</Text>
          </View>
          <View style={styles.categoryNameContainer}>
            <Text style={styles.categoryNameText}>{ten}</Text>
          </View>
          <View style={styles.categoryItemsAmountContainer}>
            <Text style={styles.categoryItemAmountText}>{so_luong}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  deleteChar = str => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    return str;
  }

  onChangeText = text => {
    const { danhmucthuoc } = this.props;
    // console.warn(this.state.dataDMT.filter(item => item.ten.toUpperCase().includes(text.toUpperCase())));
    this.setState({
      dataDMT: danhmucthuoc.data.filter(item => this.deleteChar(item.ten).toUpperCase().includes(this.deleteChar(text.trim()).toUpperCase()))
    });
  }

  renderHeader = () => {
    const { isShowTextInput } = this.state;

    return (
      <LinearGradient
        colors={['#f37545', '#f04e4b']}
        end={{ x: 1, y: 1.5 }}
        start={{ x: 0.0, y: 0.25 }}
        style={styles.containerHeader}
      >
        <View style={styles.wrapHeader} >
          <View style={[styles.wraptTitle, { alignItems: isShowTextInput ? 'flex-start' : 'center' }]}>
            {!isShowTextInput ? (<Text style={styles.txtTitle} numberOfLines={1}>{'DANH MỤC THUỐC'}</Text>) :
              (<TextInput
                style={styles.containerFilter}
                underlineColorAndroid='transparent'
                onChangeText={this.onChangeText}
                selectionColor={'#fff'}
                placeholder={'Tìm kiếm theo tên'}
                clearButtonMode='always'
              />)}
          </View>
          <TouchableOpacity
            onPress={() => this.setState({
              isShowTextInput: !isShowTextInput,
              txtSearch: ''
            })}
          >
            <Icon name={'ios-search-outline'} size={27} color={'#fff'} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <LoadingView
          text="Đang tải dữ liệu danh mục"
          navigation={this.props.navigation}
          type={'stack'}
          paddingBottom={60}
          hideBackButton
        />
      );
    }

    const { dataDMT } = this.state;
    const { danhmucthuoc } = this.props;
    if (danhmucthuoc.error) {
      return (
        <ErrorView
          navigation={this.props.navigation}
          hideBackButton
          onRetryPressed={() => {
            this.setState({ loading: true }, () => {
              this.props.getdanhmucthuoc();
            });
          }}
        />
      );
    }

    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <View style={styles.contentContainer}>
          {
            dataDMT.length === 0 ?
              (<View style={styles.emptyData}>
                <Text>{'Không thấy dữ liệu...'}</Text>
              </View>) :
              <ScrollView showsVerticalScrollIndicator={false}>
                {dataDMT.map(({ id, ten, so_luong }, index) =>
                  this._renderCategoryCard({ index, id, ten, so_luong })
                )}
              </ScrollView>
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60
  },

  containerEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15
  },

  categoryCard: {
    borderRadius: 5,
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15
  },

  indexContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgb(95, 122, 255)',
    alignItems: 'center',
    justifyContent: 'center'
  },

  indexText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center'
  },

  categoryNameContainer: {
    paddingHorizontal: 20,
    flex: 3.5
  },

  categoryNameText: {},

  categoryItemsAmountContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },

  categoryItemAmountText: {
    color: '#888'
  },

  errorText: {
    fontSize: 15
  },

  containerHeader: {
    height: 80,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 9999,
    paddingBottom: 15
  },

  wrapHeader: {
    width: '90%',
    height: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  wraptTitle: {
    flex: 7,
    padding: 0
  },

  txtTitle: {
    color: '#fff',
    fontSize: 18,
    paddingLeft: 27
  },

  containerFilter: {
    justifyContent: 'center',
    color: '#fff',
    fontSize: 17,
    paddingVertical: 0,
    width: '100%'
  },

  emptyData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
