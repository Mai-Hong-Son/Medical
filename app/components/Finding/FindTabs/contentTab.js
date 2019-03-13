import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import _ from 'lodash';
import DanhSachThuoc from '../../Reusables/UICustom/UIdanhsachthuoc';

export default class ContentTab extends React.Component {

  render() {
    const { ketquatimkiem: { data }, isLoading, navigation, loadingMore } = this.props;

    return (
      <View style={styles.container}>
        <DanhSachThuoc
          data={data}
          isLoading={isLoading}
          loadingMore={loadingMore}
          type={'search'}
          navigation={navigation}
          onLoadMoreData={() => this.props.onLoadMoreData()}
          onLoadData={() => this.props.onLoadData()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
})
