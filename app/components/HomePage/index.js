import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator, createTabNavigator } from 'react-navigation';
import Header from '../Reusables/UICustom/header';
import { connect } from 'react-redux';
import Newsfeed from './Newsfeed';
import { TabHomePage } from './TabHomePage';
import { fetch } from '../../../redux/actions';
import types from '../../../redux/actions/serviceApi/types';
import Loading from '../Reusables/UICustom/Loading';

const TabNavigatorConfig = {
    tabBarComponent: TabHomePage,
    lazy: true,
    swipeEnabled: true,
    tabBarOptions: {
        indicatorStyle: {
            backgroundColor: "red",
            height: 10,
            width: 100
        }
    }

}

class Home extends Component {
    componentDidMount() {
        let body = {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
            },
            method: 'GET',
            url: "https://suckhoetoandan.vn/wp-json/wp/v2/categories"
        }
        this.props.fetchCategories(body);
    }

    createRouteConfigs() {
        let RouteConfigs = {};
        let { data } = this.props.dataCategory
        for (let i = 0; i < data.length; i++) {
            RouteConfigs[`${data[i].id}`] = {
                screen: Newsfeed,
                navigationOptions: {
                    title: data[i].name
                }
            }
        }
        return RouteConfigs;
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.dataCategory.data !== this.props.dataCategory.data) return true;
        return false;
    }
    render() {
        let { isLoading, isLoaded, data, err } = this.props.dataCategory
        if ((isLoading === false && isLoaded === false) || (isLoading === true && isLoaded === false)) {
            return (
                <View style={{ flex: 1 }}>
                    <StatusBar barStyle="light-content" />
                    <Header type={'tab'} />
                    <Loading />
                </View>
            )
        } else {
            const Tab = createMaterialTopTabNavigator(this.createRouteConfigs(), TabNavigatorConfig);
            return (
                <View style={{ flex: 1 }}>
                    <StatusBar barStyle="light-content" />
                    <Header type={'tab'} title={'Medical Hub'} />
                    <Tab goToDetail={(id) => alert("xxx")} />
                </View>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        dataCategory: state.dataCategori,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: (body) => dispatch(fetch(body, types.CATEGORI)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
