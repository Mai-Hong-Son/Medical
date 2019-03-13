import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const TAB_BAR_HEIGHT = 60;
const BARCODE_BUTTON_MARGIN = 10;

export class MyTabBar extends React.Component {
  renderTabBarButton = (route, idx) => {
    const { navigation, getLabelText, renderIcon } = this.props;
    const { state } = navigation;
    const { routes } = state;
    const color = state.index === idx ? '#f37545' : '#7F94A0';
    const label = getLabelText({ route });

    const btnBarCode = (
      <LinearGradient
        colors={['#f37545', '#f04e4b']}
        end={{ x: 1, y: 1.5 }}
        start={{ x: 0.0, y: 0.25 }}
        style={styles.btnBarCode}
      >
        {renderIcon({ route, tintColor: '#fff' })}
      </LinearGradient>
    );

    const btnTabBarCustom =
      idx !== 2 ? (
        <View style={{ alignItems: "center", justifyContent: 'center' }}>
          {renderIcon({ route, tintColor: color })}
          < Text style={[styles.txtTabBar, { color }]} > {label}</Text >
        </View >
      ) : (
          btnBarCode
        );

    return (
      <View style={(idx !== 2) ? [styles.btnTabBar, { borderTopWidth: 0.5, marginTop: BARCODE_BUTTON_MARGIN }] : { width: 60, height: 60 }} key={route.routeName}>
        <TouchableOpacity
          onPress={() => {
            if (routes.index !== idx) {
              navigation.navigate(route.routeName);
            }
          }}

          style={(idx !== 2) ? styles.btnTabBar : { width: 60, height: 60 }}
        >
          {btnTabBarCustom}
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { navigation } = this.props;
    const {
      state: { routes }
    } = navigation;
    const tabBarButtons = routes.map(this.renderTabBarButton);

    return (
      <View style={styles.wrapTabBar}>
        {tabBarButtons}
      </View>
    );
  }
}
const { width, height } = Dimensions.get("window")
const styles = StyleSheet.create({
  wrapTabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: TAB_BAR_HEIGHT + BARCODE_BUTTON_MARGIN,
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    // shadowColor: '#000000',
    // shadowOffset: {
    //   width: 0,
    //   height: 0
    // },
    // shadowOpacity: 0.7,
    // elevation: 1,
  },

  btnTabBar: {
    alignItems: 'center',
    backgroundColor: "white",
    flex: 1,
    height: 50,
    justifyContent: 'center'
  },
  txtTabBar: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  btnBarCode: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    flex: 1
  }
});
