import React, { Component } from 'react';
import Header from '../Reusables/UICustom/header';
import { View, FlatList, TouchableOpacity, Image, Text, BackHandler } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { connect } from 'react-redux';
import { fetch } from '../../../redux/actions';
import types from '../../../redux/actions/serviceApi/types';
import Loading from '../Reusables/UICustom/Loading';

class ResultPharmacy extends Component {

    componentDidMount() {
        let { tu_khoa, tinh, huyen, xa } = this.props.navigation.state.params;
        let body = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `${this.props.token_type} ${this.props.token}`
            },
            method: 'POST',
            url: `https://duocquocgia.com.vn/api/cong_tra_cuu_nha_thuoc/tim_nha_thuoc`,
            data: {
                tu_khoa: tu_khoa,
                tinh: tinh,
                huyen: huyen,
                xa: xa,
                danh_gia: null,
                page_number: 1,
                page_size: 10
            }
        }
        this.props.fetchPharmacy(body);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
    handleBackPress = () => {
        this.props.navigation.goBack(); // works best when the goBack is async
        return true;
    }
    goToDetail(id) {
        this.props.navigation.navigate("DetailNhaThuoc", {
            idPharmacy: id
        })
    }

    _keyExtractor = (item, index) => item.id.toString();
    _renderItem = ({ item }) => {
        let { id, ten, dia_chi, khoang_cach, danh_gia } = item;
        return (
            <View style={styles.item}>
                <TouchableOpacity style={styles.touch} onPress={() => this.goToDetail(id)}>
                    <View style={styles.view1}>
                        <Image source={require("../../assets/menuicon/hospital.png")} style={{ width: "100%", height: "100%" }} resizeMode={"cover"} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={styles.view2}>
                            <Text style={styles.text1} numberOfLines={1}>{ten.toUpperCase()}</Text>
                            <Text style={styles.text2}>{khoang_cach}km</Text>
                        </View>
                        <View style={styles.view3}>
                            <View style={styles.view4}>
                                <EvilIcons name="location" size={27} color="gray" />
                                <Text style={styles.text3} numberOfLines={1}>{dia_chi}</Text>
                            </View>
                            {/* <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={danh_gia}
                                fullStarColor={"#ffcc00"}
                                starSize={20}
                            /> */}
                        </View>
                    </View>
                </TouchableOpacity>
            </View >
        )
    }
    shouldComponentUpdate(nextProps) {
        if (nextProps.dataPharmacy.data !== this.props.dataPharmacy.data) return true;
        return false
    }
    render() {
        let { isLoading, isLoaded, err, data } = this.props.dataPharmacy;
        return (
            <View style={styles.container}>
                <Header
                    type={'stack'}
                    title={'Kết quả tìm kiếm'}
                    navigation={this.props.navigation}
                    goToBack={() => {
                        this.props.navigation.navigate("TraCuuNhaThuoc", {
                            tinh: undefined,
                            huyen: undefined,
                            xa: undefined,
                        })
                    }}
                />
                {
                    ((isLoading === false && isLoaded === false) || (isLoading === true && isLoaded === false))
                        ? <Loading /> :
                        <FlatList
                            data={data.items}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                            style={{ flex: 1 }}
                        />
                }
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        dataPharmacy: state.dataResultPharmacy,
        token: state.tokenAccess.data.data.token,
        token_type: state.tokenAccess.data.data.token_type,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPharmacy: (body) => dispatch(fetch(body, types.RESULT_PHARMACY)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ResultPharmacy);

const styles = {
    container: {
        flex: 1,
    },
    item: {
        height: 120,
        width: "100%",
        paddingTop: 10,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
    },
    touch: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 8,
        flexDirection: "row"
    },
    view1: {
        height: 100, width: 100, padding: 10, paddingLeft: 10, paddingRight: 10
    },
    view2: {
        position: "absolute", left: 0, top: 0, height: "50%", width: "100%", alignItems: "flex-end", flexDirection: "row", justifyContent: "space-between", paddingRight: 10, paddingBottom: 10
    },
    text1: {
        color: "#4d4d4d", fontSize: 15, fontWeight: "bold", width: "80%"
    },
    text2: {
        color: "gray", fontSize: 15, width: "30%"
    },
    view3: {
        position: "absolute", left: 0, bottom: 0, height: "50%", width: "100%", flexDirection: "row", justifyContent: "space-between", paddingRight: 10, alignItems: 'center', paddingBottom: 8
    },
    view4: { flexDirection: "row", alignItems: "center", width: "50%", marginRight: 10 },
    text3: { color: "gray", fontSize: 15 }
}