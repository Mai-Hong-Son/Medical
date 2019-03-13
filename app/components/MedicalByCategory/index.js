import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import { connect } from 'react-redux';

import Header from './../Reusables/UICustom/header';
import DanhSachThuoc from '../Reusables/UICustom/UIdanhsachthuoc';
import * as commonActions from '../../../redux/actions';

@connect(
  state => ({
    thuoctheoloai: state.thuoctheoloai
  }),
  { ...commonActions }
)
export default class MedicalByCategoryView extends React.Component {
  state = {
    page: 1,
    isLoading: true,
  };

  componentWillReceiveProps(nextProps) {
    const { thuoctheoloai: { data } } = nextProps;

    if (data)
      this.setState({
        isLoading: false
      });
  }

  componentDidMount() {
    const { navigation: { state: { params: { idMedical } } } } = this.props;

    this.props.getthuoctheoloai({
      loai_id: idMedical,
      page_number: 1,
      page_size: 10
    });
  }

  onLoadMoreData = () => {
    const { page } = this.state;
    const { navigation: { state: { params: { idMedical } } } } = this.props;

    this.setState({
      page: page + 1
    }, () => {
      this.props.getthuoctheoloai({
        loai_id: idMedical,
        page_number: this.state.page,
        page_size: 10
      });
    })
  }

  onLoadData = () => {
    const { navigation: { state: { params: { idMedical } } } } = this.props;

    this.setState({
      page: 1
    });

    this.props.getthuoctheoloai({
      loai_id: idMedical,
      page_number: 1,
      page_size: 10
    });
  }

  render() {
    const { thuoctheoloai: { data }, navigation } = this.props;
    const { navigation: { state: { params: { categoryName } } } } = this.props;
    const { isLoading } = this.state;

    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} type={'stack'} title={categoryName} />
        <DanhSachThuoc
          data={data}
          isLoading={isLoading}
          type={'search'}
          navigation={navigation}
          onLoadMoreData={this.onLoadMoreData}
          onLoadData={this.onLoadData}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
