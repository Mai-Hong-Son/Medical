import React, { Component } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { fetch } from '../../../../redux/actions';
import types from '../../../../redux/actions/serviceApi/types';
import { connect } from 'react-redux';
import { navigate } from '../../../../redux/actions/serviceApi/fetch';
import Loading from '../../Reusables/UICustom/Loading';
import iconHealth from '../../../assets/menuicon/HealthTech.jpg';

class Newsfeed extends Component {

    componentDidMount() {
        let idCategory = this.props.navigation.state.routeName;
        let body = {
            // headers: {
            //     "Content-Type": "application/json; charset=utf-8",
            //     "Accept": "application/json",
            // },
            method: 'GET',
            url: `https://suckhoetoandan.vn/wp-json/wp/v2/posts/?categories=${idCategory}&page=1`
        }
        this.props.fetchPost(body, idCategory);
    }


    _keyExtractor = (item, index) => item.id.toString();
    _renderItem = ({ item }) => {
        let title = item.title.rendered;

        let image = item.featured_image.td_534x462;
        return (
            <View style={styles.item}>
                <TouchableOpacity style={styles.itemTouch} activeOpacity={0.7} onPress={() => this.props.navigate("DetailPost", { id: item.id })}>
                    <Image
                        source={(image !== null) ? { uri: image } : iconHealth}
                        style={styles.imageItem}
                        resizeMode={"cover"}
                    />
                    <View style={{ borderRadius: 5, flexDirection: "row", position: "absolute", width: "100%", height: "100%", backgroundColor: "black", opacity: 0.4 }}>
                        <Ionicons name="md-eye" color="white" size={20} style={{ position: "absolute", bottom: 15, left: 10 }} />
                        <Text style={{ fontSize: 18, color: "white", position: "absolute", bottom: 15, left: 35 }}>13k</Text>
                        <SimpleLineIcons name="clock" color="white" size={15} style={{ position: "absolute", bottom: 17, left: 80 }} />
                        <Text style={{ fontSize: 18, color: "white", position: "absolute", bottom: 15, left: 105 }}>10 giờ trước</Text>
                    </View>
                    <Text style={{ position: "absolute", left: 10, bottom: 40, color: "white", fontSize: 20, fontWeight: 'bold', width: "60%" }} numberOfLines={2}>{title.toUpperCase()}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    shouldComponentUpdate(nextProps) {
        let data = this.props.dataPost.data.get(this.props.navigation.state.routeName);
        let nextData = nextProps.dataPost.data.get(this.props.navigation.state.routeName);
        if (data !== nextData) return true;
        return false;
    }


    render() {
        let { isLoading, isLoaded, err } = this.props.dataPost;
        let data = this.props.dataPost.data.get(this.props.navigation.state.routeName);
        if ((isLoading === false && isLoaded === false) || (isLoading === true && isLoaded === false)) return <Loading />

        return (
            <View style={styles.container}>
                <FlatList
                    data={data}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        dataPost: state.dataPosts,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPost: (body, keyData) => dispatch(fetch(body, types.POST, keyData)),
        navigate: (routeName, params) => dispatch(navigate(routeName, params))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Newsfeed);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingBottom: 70
    },
    item: {
        width: "100%",
        padding: 10,
        height: 200
    },
    itemTouch: {
        borderRadius: 5,
        width: "100%",
        height: "100%"
    },
    imageItem: {
        width: "100%",
        height: "100%",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "transparent"
    }
})