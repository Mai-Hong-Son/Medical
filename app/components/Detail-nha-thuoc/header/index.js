import React, { Component } from 'react';
import { View, StatusBar, Image, TouchableOpacity } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import Entypo from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/Ionicons";
import iconNT from '../../../assets/menuicon/hospital-2.jpg'
import { g } from '../../../Utils';
class Header extends Component {

    render() {
        let { navigation, icon } = this.props
        return (
            <View style={{ width: g.WIDTH_SCREEN, height: g.HEIGHT_SCREEN * 3 / 10 }}>
                <StatusBar backgroundColor={"transparent"} barStyle="light-content" />
                <LinearGradient
                    colors={['black', 'transparent']}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 0.75 }}
                    style={{ width: "100%", height: "100%", opacity: 0.6, position: "absolute", zIndex: 1 }}
                />
                <Image
                    source={(icon) ? { uri: icon } : iconNT}
                    style={{ width: "100%", height: "100%" }}
                />

                <TouchableOpacity style={styles.dot}>
                    <Entypo name={'dots-three-horizontal'} size={27} color={'#fff'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.contentSmall} onPress={() => navigation.goBack()}>
                    <Icon name={'ios-arrow-back-outline'} size={27} color={'#fff'} />
                </TouchableOpacity>
            </View>
        )
    }
}
export default Header;
const styles = {

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