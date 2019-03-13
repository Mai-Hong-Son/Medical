import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Platform
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

// const barcode = require('./../../assets/menuicon/barcode.png');

export default class HeaderResearch extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { navigation: { navigate } } = this.props;

        return (
            <LinearGradient
                // colors={['#f37545', '#f04e4b']}
                colors={['#f37545', '#f04e4b']}
                end={{ x: 1, y: 1.5 }}
                start={{ x: 0.0, y: 0.25 }}
                style={styles.containerHeader}
            >
                <TouchableOpacity style={styles.touchStyle} onPress={() => navigate('Finding')}>
                    <View style={styles.btnSearch}>
                        <Icon name={'ios-search-outline'} size={20} color={'#7F94A0'} />
                        <View style={styles.middleContentBtnS}>
                            <Text>{'Tên thuốc, số đăng ký'}</Text>
                        </View>
                        <View style={{ width: 20, height: 20 }} />
                    </View>
                </TouchableOpacity>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    containerHeader: {
        height: Platform.OS === 'ios' ? 95 : 75,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 15
    },
    middleContentBtnS: {
        width: '75%',
        alignItems: 'center'
    },
    imageContentBtnS: {
        width: 27,
        height: 27,
        tintColor: '#7F94A0'
    },
    touchStyle: {
        width: '90%'
    },
    btnSearch: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 20,
        width: '100%',
        height: 45,
        backgroundColor: '#F0F1F5',
        borderRadius: 4,
        // marginTop: 20,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.7,
        elevation: 1
    }
});
