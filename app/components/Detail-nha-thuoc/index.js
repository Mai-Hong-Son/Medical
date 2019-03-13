import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, ScrollView, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import StarRating from 'react-native-star-rating';
import iconLocation from '../../assets/menuicon/group3.png';
import iconTime from '../../assets/menuicon/group4.png';
import iconPhone from '../../assets/menuicon/group5.png';
import iconPerson from '../../assets/menuicon/group6.png';
import iconGP from '../../assets/menuicon/group7.png';
import iconDS from '../../assets/menuicon/group8.png';
import Header from './header';
import types from '../../../redux/actions/serviceApi/types';
import { g } from '../../Utils';
import { fetch } from '../../../redux/actions';
import Loading from '../Reusables/UICustom/Loading';


class DetailNhaThuoc extends Component {

    componentDidMount() {
        let { idPharmacy } = this.props.navigation.state.params;
        if (this.props.dataDetailPharmacy.data.get(idPharmacy) !== undefined) return;
        let body = {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Authorization": `${this.props.token_type} ${this.props.token}`
            },
            method: 'GET',
            url: `https://duocquocgia.com.vn/api/cong_tra_cuu_nha_thuoc/chi_tiet_nha_thuoc/${idPharmacy}`
        }
        this.props.fetchDetailNT(body, idPharmacy);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
    handleBackPress = () => {
        this.props.navigation.goBack(); // works best when the goBack is async
        return true;
    }
    shouldComponentUpdate(nextProps) {
        let { idPharmacy } = this.props.navigation.state.params;
        if (nextProps.dataDetailPharmacy.data.get(idPharmacy) !== undefined) return true
        return false;
    }
    renderItemText(iconName, textContent, title) {
        return (
            <View style={{ flex: 1, flexDirection: "row", padding: 10, alignItems: "center" }}>
                <Image source={iconName} style={{ width: 30, height: 30 }} resizeMode={"contain"} />
                <Text style={{ paddingLeft: 10 }}>
                    <Text style={{ fontWeight: "bold" }}>{title}</Text>
                    <Text>{textContent}</Text>
                </Text>
            </View>
        )
    }

    render() {
        let { navigation } = this.props;
        let { idPharmacy } = this.props.navigation.state.params;
        let dataDetail = this.props.dataDetailPharmacy.data.get(idPharmacy);
        if (dataDetail == undefined) return <Loading />
        let { danh_gia, dia_chi, duoc_si, gio_lam_viec, khoang_cach, nguoi_chiu_trach_nhiem, so_bai_danh_gia, so_dien_thoai, so_giay_phep, ten } = dataDetail;
        return (
            <View style={styles.container}>
                <Header navigation={navigation} />
                <View style={{ width: "100%", height: 80, paddingTop: 10, paddingLeft: 17 }}>
                    <Text style={{ fontSize: 22 }}>{ten}</Text>
                    <View style={{ flexDirection: "row", marginTop: 10, alignItems: "center" }}>
                        {/* <SimpleLineIcons name="location-pin" size={15} color="#96939B" /> */}
                        {/* <Text style={{ color: "#96939B" }}>{khoang_cach}km</Text> */}

                    </View>
                </View>
                {/* <LinearGradient
                    style={{ height: 60, width: "100%", flexDirection: "row" }}
                    colors={['#f04e4b', '#f37545']}
                    start={{ x: 0, y: 0 }}
                >
                    {
                        dataTouch.map((item, index) => (
                            <TouchableOpacity style={{ flex: 1, alignItems: "center", justifyContent: "center" }} key={index}>
                                <SimpleLineIcons name={item.nameIcon} size={20} color="white" />
                                <Text style={{ color: "white" }}>{item.textContent}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </LinearGradient> */}
                <ScrollView style={{ flex: 1 }}>
                    {this.renderItemText(iconLocation, dia_chi)}
                    {this.renderItemText(iconTime, gio_lam_viec)}
                    {this.renderItemText(iconPhone, so_dien_thoai)}
                    {this.renderItemText(iconPerson, nguoi_chiu_trach_nhiem, "Người chịu trách nhiệm: ")}
                    {this.renderItemText(iconGP, so_giay_phep, "Số GP/GPP: ")}
                    {this.renderItemText(iconDS, duoc_si, "Dược sĩ: ")}
                </ScrollView>

            </View >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dataDetailPharmacy: state.dataDetailPharmacy,
        token: state.tokenAccess.data.data.token,
        token_type: state.tokenAccess.data.data.token_type,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDetailNT: (body, keyData) => dispatch(fetch(body, types.DETAIL_PHARMACY, keyData)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailNhaThuoc);
const styles = {
    container: {
        flex: 1,

    },
    header: {

    },
    dot: {
        flex: 1,
        position: "absolute",
        right: 0,
        top: 20,
        zIndex: 3,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentSmall: {
        flex: 1,
        position: "absolute",
        left: 0,
        top: 20,
        zIndex: 3,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
}