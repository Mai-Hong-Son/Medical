import React, { Component } from 'react';
import { View, Text, TextInput, Platform, TouchableOpacity,BackHandler } from "react-native";
import Header from '../Reusables/UICustom/header';
import LinearGradient from 'react-native-linear-gradient';
import { g } from '../../Utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast, { DURATION } from 'react-native-easy-toast'
class TraCuuNhaThuoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tu_khoa: null,
            danh_gia: null,
            page_number: 1,
            page_size: 10,
            refresh: false
        }
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
    handleBackPress = () => {
        this.props.navigation.goBack(); // works best when the goBack is async
        return true;
    }
    getValueText(text) {
        this.state.tu_khoa = text;
    }
    goToLocation(title) {
        let { params } = this.props.navigation.state;
        switch (title) {
            case "Tỉnh/Thành phố":
                this.props.navigation.navigate("Location", {
                    title: title
                })
                break;
            case "Quận/Huyện":
                if (params === undefined || params.tinh === undefined) return this.refs.toast.show('Vui lòng chọn tỉnh/thành phố');
                this.props.navigation.navigate("Location", {
                    title: title,
                    value_tinh: params.value_tinh
                })
                break;
            case "Phường xã":
                if (params === undefined || params.huyen === undefined) return this.refs.toast.show('Vui lòng chọn quận/huyện');
                this.props.navigation.navigate("Location", {
                    title: title,
                    value_huyen: params.value_huyen
                })
                break;

            default:
                break;
        }
    }
    search() {
        let { params } = this.props.navigation.state;
        if (this.state.tu_khoa !== null && this.state.tu_khoa !== "") return this.props.navigation.navigate("ResultNhaThuoc", {
            tu_khoa: this.state.tu_khoa,
            tinh: null,
            huyen: null,
            xa: null,
        })
        if (params === undefined) return this.refs.toast.show('Vui lòng nhập tên nhà thuốc');
        if (params.tinh === undefined) return this.refs.toast.show('Vui lòng chọn tỉnh/thành phố');
        if (params.huyen === undefined) return this.refs.toast.show('Vui lòng chọn quận/huyện');
        if (params.xa === undefined) return this.refs.toast.show('Vui lòng chọn phường xã');
        this.props.navigation.navigate("ResultNhaThuoc", {
            tu_khoa: this.state.tu_khoa,
            tinh: params.value_tinh,
            huyen: params.value_tinh,
            xa: params.value_xa,
        })
    }


    render() {
        let { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <Header
                    type={'stack'}
                    title={'Tìm nhà thuốc'}
                    dot
                    navigation={this.props.navigation}
                />
                <LinearGradient
                    colors={['#f37545', '#f04e4b']}
                    end={{ x: 1, y: 1.5 }}
                    start={{ x: 0.0, y: 0.25 }}
                    style={styles.view1}
                />
                <View style={{ width: "100%", height: 100 }}>
                    <LinearGradient
                        colors={['#f37545', '#f04e4b']}
                        end={{ x: 1, y: 1.5 }}
                        start={{ x: 0.0, y: 0.25 }}
                        style={styles.view2}
                    />
                </View>
                <View style={styles.view3}>

                    <ItemText
                        title={"Tên nhà thuốc"}
                        placeholder={"Nhập tên nhà thuốc"}
                        getValueText={(text) => this.getValueText(text)}
                    />
                    <ItemText
                        title={"Tỉnh/Thành phố"}
                        textDropDown={(params !== undefined && params.tinh !== undefined) ? params.tinh : "Chọn Tỉnh/Thành phố"}
                        goToLocation={(title) => this.goToLocation(title)}
                    />
                    <ItemText
                        title={"Quận/Huyện"}
                        textDropDown={(params !== undefined && params.huyen !== undefined) ? params.huyen : "Chọn Quận/Huyện"}
                        goToLocation={(title) => this.goToLocation(title)}
                    />
                    <ItemText
                        title={"Phường xã"}
                        textDropDown={(params !== undefined && params.xa !== undefined) ? params.xa : "Chọn Phường/Xã"}
                        goToLocation={(title) => this.goToLocation(title)}
                    />
                    <LinearGradient
                        colors={['#f37545', '#f04e4b']}
                        end={{ x: 1, y: 1.5 }}
                        start={{ x: 0.0, y: 0.25 }}
                        style={styles.touch}
                    >
                        <TouchableOpacity style={styles.touch1} onPress={() => this.search()}>
                            <Text style={{ color: "white", fontSize: 16 }}>Tìm kiếm</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
                <Toast
                    ref="toast"
                    position='top'
                    positionValue={30}
                />
            </View>
        )
    }
}
class ItemText extends Component {
    render() {
        let { title, textDropDown, placeholder, getValueText, goToLocation } = this.props;
        return (
            <View style={{ height: 100, width: "100%" }}>
                <Text style={{ marginBottom: 10 }}>{title}</Text>
                {
                    (placeholder !== undefined) ?
                        <View style={styles.view4}>
                            <TextInput
                                placeholder={placeholder}
                                style={{ height: 40, width: "90%" }}
                                onChangeText={(text) => getValueText(text)}
                                underlineColorAndroid={"transparent"}
                            />
                            {/* <Ionicons name="ios-arrow-down" size={20} style={{ position: "absolute", right: 0, width: 30 }} /> */}
                        </View> :
                        <TouchableOpacity style={styles.view5} onPress={() => goToLocation(title)}>
                            <Text>
                                {textDropDown}
                            </Text>
                            <Ionicons name="ios-arrow-down" size={20} style={{ position: "absolute", right: 0, width: 30 }} />
                        </TouchableOpacity>
                }
            </View>
        )
    }
}

export default TraCuuNhaThuoc;
const styles = {
    container: {
        flex: 1,
        backgroundColor: "#e6e6e6"
    },
    view1: {
        height: "20%",
        width: "100%"
    },
    view2: {
        width: g.WIDTH_SCREEN,
        height: g.WIDTH_SCREEN,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: g.WIDTH_SCREEN / 2,
        borderTopWidth: g.WIDTH_SCREEN,
        borderRightColor: 'transparent',
        borderTopColor: '#e6e6e6',
        transform: [
            { rotate: '270deg' }
        ]
    },
    view3: {
        position: 'absolute',
        top: (Platform.OS === "ios") ? 70 : 50,
        width: "90%",
        left: "5%",
        backgroundColor: "white",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 5
    },
    view4: {
        width: "100%",
        height: 50,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "gray",
        alignItems: "center",
        justifyContent: "center"
    },
    view5: {
        width: "100%",
        height: 50,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "gray",
        justifyContent: "center",
        paddingLeft: 10
    },
    touch: {
        marginTop: 40,
        width: "100%",
        height: 50,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#f04e4b"
    },
    touch1: {
        width: "100%",
        height: 50,
        alignItems: 'center',
        justifyContent: "center"
    }
}