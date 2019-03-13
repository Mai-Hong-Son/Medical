import React from 'react';
import { View, StyleSheet, StatusBar, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import HeaderResearch from './headerResearch';
import DanhSachThuoc from '../Reusables/UICustom/UIdanhsachthuoc';
import * as commonActions from '../../../redux/actions';

@connect(
  state => ({
    thuocmoicapnhat: state.thuocmoicapnhat,
    mainRouter: state.mainRouter
  }),
  { ...commonActions }
)
export default class ResearchView extends React.Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    this.props.laythuocmoicapnhat();

    BackHandler.addEventListener('backPress', () => {
      const { navigation: { dispatch }, mainRouter } = this.props;

      if (mainRouter.index === 0) return false;
      dispatch({ type: 'Navigation/BACK' });
      return true;
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
      thuocmoicapnhat: { data }
    } = nextProps;

    if (data) {
      this.setState({
        isLoading: false
      });
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('backPress');
  }

  onRefresh = () => {
    this.props.laythuocmoicapnhat();
  }

  render() {
    const {
      thuocmoicapnhat: { data },
      navigation
    } = this.props;
    const { isLoading } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <HeaderResearch navigation={navigation} />
        <DanhSachThuoc
          data={data}
          isLoading={isLoading}
          type={'research'}
          navigation={navigation}
          onRefresh={this.onRefresh}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 60
  }
});
