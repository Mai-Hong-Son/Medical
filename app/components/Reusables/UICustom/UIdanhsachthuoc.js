import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Text,
  Platform
} from 'react-native';
import _ from 'lodash';
import ContentTop from '../../Research/ContentTop/index';
import DataRow from './DataRow/index';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default class DanhSachThuoc extends React.Component {
  renderItem = ({ item }) => {
    const { id, duongDanAnh, tenThuoc } = item;

    return (
      <DataRow
        id={id}
        duongDanAnh={duongDanAnh}
        tenThuoc={tenThuoc}
        navigation={this.props.navigation}
      />
    );
  };

  render() {
    const { data, isLoading, type } = this.props;
    let danhSachThuoc = null;
    let contentTop = null;

    if (isLoading) {
      danhSachThuoc = <ActivityIndicator size="large" color="#4D80E6" />;
    }

    if (!_.isEmpty(data) && !isLoading) {
      switch (type) {
        case 'research':
          danhSachThuoc = (
            <FlatList
              data={data}
              columnWrapperStyle={styles.column}
              contentContainerStyle={styles.containerList}
              ListHeaderComponent={<ContentTop />}
              renderItem={this.renderItem}
              numColumns={2}
              refreshing={false}
              onRefresh={() => this.props.onRefresh()}
              keyExtractor={({ id }) => `${id}`}
            />
          );
          break;
        case 'search':
          danhSachThuoc = (
            <FlatList
              data={data}
              columnWrapperStyle={styles.column}
              contentContainerStyle={styles.containerList}
              renderItem={this.renderItem}
              numColumns={2}
              onEndReached={() => this.props.onLoadMoreData()}
              onEndReachedThreshold={Platform.OS === 'ios' ? 0 : 0.5}
              ListFooterComponent={this.props.loadingMore ? <ActivityIndicator size="small" color="#4D80E6" /> : null}
              refreshing={false}
              onRefresh={() => this.props.onLoadData()}
              keyExtractor={(item, index) => `${index}`}
            />
          );
          break;

        default:
          break;
      }
    } else if (_.isEmpty(data) && !isLoading) {
      danhSachThuoc = (
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
          {'Không tìm thấy kết quả nào'}
        </Text>
      );
    }

    return <View style={styles.container}>{danhSachThuoc}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerList: {
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: 20
  },
  column: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
    width: SCREEN_WIDTH
  }
});
