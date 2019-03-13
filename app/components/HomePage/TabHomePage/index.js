import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ScrollView, View } from 'react-native';
import { g } from '../../../Utils';

export class TabHomePage extends React.Component {
    renderTabBarButton = (route, idx) => {
        const { navigation, getLabelText, renderIcon } = this.props;
        const { state } = navigation;
        const { routes } = state;
        const color = state.index === idx ? '#f37545' : '#7F94A0';
        const label = getLabelText({ route });
        return (
            <ItemTabs
                routes={routes}
                route={route}
                color={color}
                label={label}
                idx={idx}
                key={route.routeName}
                navigation={navigation}
            />
        );
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.navigationState.index !== this.props.navigationState.index && nextProps.navigationState.index < this.props.navigationState.routes.length - 2) {
            this.ScrollView.scrollTo({ x: (nextProps.navigationState.index * g.WIDTH_SCREEN / 3), y: 0, animated: true })

        }
    }
    shouldComponentUpdate(nextProps) {

        if (nextProps.navigationState.index !== this.props.navigationState.index) return true
        return false
    }
    render() {
        const { navigation } = this.props;
        const {
            state: { routes }
        } = navigation;
        const tabBarButtons = routes.map(this.renderTabBarButton);
        return (
            // <LinearGradient
            //     // colors={['#f37545', '#f04e4b']}
            //     end={{ x: 1, y: 1.5 }}
            //     start={{ x: 0.0, y: 0.25 }}
            //     style={styles.wrapTabBar}
            // >
            <View style={styles.wrapTabBar}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    ref={(ref) => this.ScrollView = ref}
                >
                    {tabBarButtons}
                </ScrollView>
            </View>
            // </LinearGradient>
        );
    }
}
class ItemTabs extends React.Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps.color !== this.props.color) return true;
        return false
    }

    render() {
        let { routes, route, color, label, idx, navigation } = this.props;
        switch (label) {
            case "Tài liệu truyền thông":
                label = "Truyền thông"
                break;
            case "Tấm lòng nhân ái":
                label = "Nhân ái"
                break;
            case "Chủ đề liên quan bệnh":
                label = "Chủ đề bệnh"
                break;
            case "Một số tình huống khẩn cấp":
                label = "Sơ cứu"
                break;
            case "Câu hỏi thường gặp bệnh":
                label = "Hỏi đáp bệnh"
                break;
            case "Chăm sóc sức khỏe":
                label = "Sức khoẻ"
                break;
            case "Kiến thức tiêm chủng":
                label = "Tiêm chủng"
                break;
            case "Phòng chống Thuốc lá - Rượu - Bia":
                label = "Thuốc lá-Rượu-Bia"
                break;
            case "10.000 bước chân":
                label = "Vận động"
                break;
            default:
                break;
        }

        return (
            <TouchableOpacity
                onPress={() => {
                    if (routes.index !== idx) {
                        navigation.navigate(route.routeName);
                    }
                }}
                style={styles.touch}
            >
                <Text style={[styles.txtTabBar, { color }]} numberOfLines={1}>{label}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    wrapTabBar: {
        height: 50,
        zIndex: 9999,
        backgroundColor: "white",
        borderBottomWidth: 2,
        borderColor: "#b3b3b3"
    },
    txtTabBar: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 4,
    },
    touch: {
        justifyContent: 'center',
        alignItems: "center",
        padding: 10,
        width: g.WIDTH_SCREEN / 3
    }


});
