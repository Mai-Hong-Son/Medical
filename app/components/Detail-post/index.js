import React, { Component } from 'react';
import { View, Text, WebView, ScrollView, BackHandler } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { connect } from 'react-redux';
import { fetch } from '../../../redux/actions';
import types from '../../../redux/actions/serviceApi/types';
import Header from '../Detail-nha-thuoc/header';
import { g } from '../../Utils';
import Loading from '../Reusables/UICustom/Loading';
class DetailPost extends Component {

    componentDidMount() {
        let id = this.props.navigation.state.params.id;
        let body = {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
            },
            method: 'GET',
            url: `https://suckhoetoandan.vn/wp-json/wp/v2/posts/${id}`
        }
        this.props.fetchDetailPost(body, id);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
    handleBackPress = () => {
        this.props.navigation.goBack(); // works best when the goBack is async
        return true;
    }

    render() {

        let data = this.props.dataDetailPost.data.get(this.props.navigation.state.params.id);
        if (data === undefined) return <Loading />

        let image = data.featured_image.td_534x462;
        let html = `<div style="font-size:20px">${data.content.rendered}</div>`;
        let title = data.title.rendered;
        return (
            <View style={styles.container}>
                <ScrollView style={{ width: g.WIDTH_SCREEN }}>
                    <Header
                        navigation={this.props.navigation}
                        icon={image}
                    />
                    <Text style={styles.title}>{title}</Text>

                    {/* <WebView
                        source={{ html: html }}
                        style={{ width: g.WIDTH_SCREEN, height: 8000 }}
                    /> */}
                    <AutoHeightWebView
                        source={{ html: html }}
                        style={{ backgroundColor: 'white', flex: 1, marginLeft: 5, marginRight: 5 }}
                    />
                </ScrollView>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        dataDetailPost: state.dataDetailPost,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDetailPost: (body, keyData) => dispatch(fetch(body, types.DETAIL_POST, keyData)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailPost);

const styles = {
    container: {
        flex: 1
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        backgroundColor: "white"
    }
}