import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import FindingTabs from './FindTabs/findTabs';
import * as commonActions from '../../../redux/actions';

import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

@connect(
  state => ({
    ketquatimkiem: state.ketquatimkiem,
    main: state.mainRouter
  }),
  { ...commonActions }
)
export default class FindingView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      isLoading: true,
      tabId: 1,
      hasMore: true,
      loadingMore: false
    };

    this.page = 1;
  }

  componentDidMount() {
    const { text, tabId } = this.state;

    this.props.timkiemthuoc({
      tuKhoa: text,
      locTheo: tabId,
      pageNumber: 1,
      pageSize: 9
    });
  }

  componentWillReceiveProps(nextProps) {
    const { ketquatimkiem: { data } } = nextProps;

    if (data) {
      this.setState({
        isLoading: false,
        loadingMore: false
      });
    }
  }

  onLoadMoreData = () => {
    const { text, tabId } = this.state;
    const { ketquatimkiem: { data } } = this.props;

    this.page += 1;
    if (data.lenght > 9) {
      this.setState({ loadingMore: true });
    }

    this.props.timkiemthuoc({
      tuKhoa: this.state.text,
      locTheo: tabId,
      pageNumber: this.page,
      pageSize: 9
    });
  }

  onLoadData = () => {
    const { text, tabId } = this.state;

    this.page = 1;

    this.props.timkiemthuoc({
      tuKhoa: text,
      locTheo: tabId,
      pageNumber: 1,
      pageSize: 9
    });
  }

  onSubmitSearch = () => {
    const { text, tabId } = this.state;

    this.props.timkiemthuoc({
      tuKhoa: text,
      locTheo: tabId,
      pageNumber: 1,
      pageSize: 9
    });
  }

  customBackButton = () => {
    const { navigation } = this.props;

    return (
      <TouchableOpacity style={styles.contentSmall} onPress={() => navigation.goBack()}>
        <Icon name={'ios-arrow-back-outline'} size={40} color={'#fff'} />
      </TouchableOpacity>
    );
  }

  renderHeader = () => {
    const { text: txtValue } = this.state;

    return (
      <LinearGradient
        colors={['#f37545', '#f04e4b']}
        end={{ x: 1, y: 1.5 }}
        start={{ x: 0.0, y: 0.25 }}
        style={styles.containerHeader}
      >
        <View style={styles.wrapHeader} >
          {this.customBackButton()}
          <View style={styles.contentSmall}>
            <TouchableOpacity onPress={this.onSubmitSearch}>
              <Icon name={'ios-search-outline'} size={27} color={'#fff'} />
            </TouchableOpacity>
          </View>
          <View style={styles.contentLarge}>
            <TextInput
              style={styles.containerFilter}
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({ text })}
              value={txtValue}
              selectionColor={'#fff'}
              placeholder={'Tìm theo tên thuốc, số đăng kí'}
              placeholderTextColor={'white'}
              onSubmitEditing={this.onSubmitSearch}
            />
          </View>
          <View style={styles.contentRight}>
            <TouchableOpacity onPress={() => this.setState({ text: '' })}>
              <View>
                <Icon name={'ios-close-outline'} size={40} color={'#fff'} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  }

  render() {
    const { navigation, ketquatimkiem } = this.props;
    const { isLoading, loadingMore } = this.state;

    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <View style={styles.wrapTab}>
          <FindingTabs
            onTabChanged={(index, pageNumber) => {
              this.props.timkiemthuoc({
                tuKhoa: this.state.text,
                locTheo: index,
                pageNumber,
                pageSize: 9
              });
            }}
            onRefreshData={(tabId) => this.setState({ isLoading: true, tabId })}
            navigation={navigation}
            ketquatimkiem={ketquatimkiem}
            onLoadMoreData={this.onLoadMoreData}
            onLoadData={this.onLoadData}
            loadingMore={loadingMore}
            isLoading={isLoading}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapTab: {
    flex: 1,
    width: '100%'
  },
  containerHeader: {
    height: 80,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerFilter: {
    flex: 1,
    justifyContent: 'center',
    color: '#fff',
    fontSize: 17,
    paddingVertical: 0
  },
  wrapHeader: {
    width: '90%',
    height: '50%',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 0
  },
  contentSmall: {
    flex: 1
  },
  contentLarge: {
    flex: 7,
    padding: 0
  },
  contentRight: {
    flex: 1,
    alignItems: 'flex-end'
  }
});
