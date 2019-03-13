import * as React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Text
} from 'react-native';
import _ from 'lodash';
import { TabView } from 'react-native-tab-view';
import ContentTab from './contentTab';

export default class FindingTabs extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [
        { key: 'tatca', title: 'Tất cả' },
        { key: 'tenthuoc', title: 'Tên thuốc' },
        { key: 'sodangky', title: 'Số đăng ký' },
        { key: 'hoatchatchinh', title: 'Hoạt chất chính' },
      ],
      tabKey: 'tatca'
    }
  }

  renderTabBar = props => {
    const { index } = this.state;

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}

        style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const colorText = index === i ? '#3D3F7C' : '#646464';
          const colorBorder = index === i ? '#3D3F7C' : '#E9E9EE';

          return (
            <TouchableOpacity
              style={[styles.tabItem, { borderBottomColor: colorBorder }]}
              key={i}
              onPress={() => {
                this.setState({ index: i, page: 1, tabKey: route.key }, () => {
                  this.props.onRefreshData && this.props.onRefreshData(this.state.index + 1);
                  this.props.onTabChanged && this.props.onTabChanged(this.state.index + 1, 1);
                })
              }}>
              <Text style={{ color: colorText }}>{route.title}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  renderScene = ({ route }) => {
    const { ketquatimkiem, isLoading, navigation, loadingMore } = this.props;
    const { tabKey } = this.state;

    return (<ContentTab
      type={route.key}
      ketquatimkiem={route.key === tabKey ? ketquatimkiem : []}
      isLoading={isLoading}
      loadingMore={loadingMore}
      navigation={navigation}
      onLoadMoreData={() => this.props.onLoadMoreData()}
      onLoadData={() => this.props.onLoadData()}
    />);
  }

  render() {

    return (
      <TabView
        navigationState={this.state}
        swipeEnabled={false}
        renderScene={this.renderScene}
        renderTabBar={this.renderTabBar}
        lazy
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width, height: 50 }}
      />
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    flexGrow: 0
  },
  tabItem: {
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 2,
    paddingLeft: 20,
    paddingRight: 20
  }
});
