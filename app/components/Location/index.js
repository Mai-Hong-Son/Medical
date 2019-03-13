import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Header from '../Reusables/UICustom/header';
import { fetch } from '../../../redux/actions';
import types from '../../../redux/actions/serviceApi/types';
import { g } from '../../Utils';
import Loading from '../Reusables/UICustom/Loading';
class Location extends Component {

    componentDidMount() {
        let { title, value_tinh, value_huyen } = this.props.navigation.state.params;
        let url = "";
        switch (title) {
            case "Tỉnh/Thành phố":
                url = "https://duocquocgia.com.vn/api/danh_muc/tinh"
                break;
            case "Quận/Huyện":
                url = `https://duocquocgia.com.vn/api/danh_muc/huyen/${value_tinh}`
                break;
            case "Phường xã":
                url = `https://duocquocgia.com.vn/api/danh_muc/xa/${value_huyen}`
                break;

            default:
                break;
        }
        let body = {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Authorization": `${this.props.token_type} ${this.props.token}`
            },
            method: 'GET',
            url: url
        }
        this.props.fetchLocation(body, title);
    }
    chooseLocation(item) {
        let { title } = this.props.navigation.state.params;
        switch (title) {
            case "Tỉnh/Thành phố":
                this.props.navigation.navigate("TraCuuNhaThuoc", {
                    tinh: item.name,
                    value_tinh: item.value
                })
                break;
            case "Quận/Huyện":
                this.props.navigation.navigate("TraCuuNhaThuoc", {
                    huyen: item.name,
                    value_huyen: item.value
                })
                break;
            case "Phường xã":
                this.props.navigation.navigate("TraCuuNhaThuoc", {
                    xa: item.name,
                    value_xa: item.value
                })
                break;
            default:
                break;
        }
    }

    render() {
        let { title } = this.props.navigation.state.params;
        let data = this.props.dataLocation.data.get(title);
        return (
            <View style={styles.container}>
                <Header
                    type={'stack'}
                    title={title}
                    navigation={this.props.navigation}
                />
                <ScrollView style={{ flex: 1 }}>
                    {
                        (data === undefined)
                            ? <Loading/> :
                            data.map((item, index) => {
                                return (
                                    <TouchableOpacity style={styles.item} key={index} onPress={() => this.chooseLocation(item)}>
                                        <Text style={{ fontSize: 16 }}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            })

                    }
                </ScrollView>

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dataLocation: state.dataLocation,
        token: state.tokenAccess.data.data.token,
        token_type: state.tokenAccess.data.data.token_type,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchLocation: (body, keyData) => dispatch(fetch(body, types.LOCATION, keyData)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Location);

const styles = {
    container: {
        flex: 1
    },
    item: {
        width: g.WIDTH_SCREEN - 20,
        height: 50,
        justifyContent: "center",
        borderBottomWidth: 1,
        marginLeft: 10,
        marginRight: 10,
        borderBottomColor: "gray"
    }
}