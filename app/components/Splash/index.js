import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import types from '../../../redux/actions/serviceApi/types';
import { fetch } from '../../../redux/actions';
import Loading from '../Reusables/UICustom/Loading';

class Splash extends Component {

    componentDidMount() {
        let body = {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
            },
            method: 'POST',
            url: "https://duocquocgia.com.vn/api/tai_khoan/dang_nhap",
            data: {
                usr: "api_tracuuthuoc",
                pwd: "123456@tracuu"
            }
        }
        this.props.fetchLogin(body);
    }
    shouldComponentUpdate(nextProps) {
        if (nextProps.dataLogin.data != this.props.dataLogin.data) {
            this.props.navigation.navigate("HomeTab")
        }
        return false
    }
    render() {
        return (
            <View style={styles.container}>
                <Loading />
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        dataLogin: state.dataLogin,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchLogin: (body) => dispatch(fetch(body, types.LOGIN)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Splash);
const styles = {
    container: {
        flex: 1
    }
}