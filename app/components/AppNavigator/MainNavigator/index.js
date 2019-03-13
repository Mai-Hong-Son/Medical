import React from 'react';
import { Image, BackHandler } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Login from '../../Login';
import ResearchView from '../../Research';
import CategoryView from '../../Category';
import FindingView from '../../Finding';
import ContactView from '../../Contact';
import WarningView from '../../Warning';
import WarningViewCloned from '../../Warning/WarningCloned';
import QRCodeView from '../../QRCode';
import ReasonSelect from '../../Warning/ReasonSelect';
import TruyXuat from '../../QRCode/TruyXuat';
import Details from '../../Details';
import MedicalByCategoryView from '../../MedicalByCategory';

import { MyTabBar } from './myTabBar';
import HomePage from '../../HomePage';
import Pharmacy from '../../Pharmacy';
import TraCuuNhaThuoc from '../../Search-nha-thuoc';
import DetailNhaThuoc from '../../Detail-nha-thuoc';
import Location from '../../Location';
import ResultNhaThuoc from '../../Result-nha-thuoc';
// import Splash from '../../Splash';
import DetailPost from '../../Detail-post'
import Newsfeed from '../../HomePage/Newsfeed';
import Loading from '../../Reusables/UICustom/Loading';

const barcode = require('./../../../assets/menuicon/barcode.png');
const flag = require('./../../../assets/menuicon/canhbao-icon.png');
const layers = require('./../../../assets/menuicon/home-icon.png');
const loupe = require('./../../../assets/menuicon/thuoc-icon.png');
const message = require('./../../../assets/menuicon/nhathuoc-icon.png');

export const RootTabs = createBottomTabNavigator(
  {
    HomePage: {
      screen: HomePage,
      navigationOptions: {
        title: 'Trang chủ'
      }
    },
    Pharmacy: {
      screen: Pharmacy,
      navigationOptions: {
        title: 'Nhà thuốc'
      }
    },
    QRCode: {
      screen: QRCodeView
    },
    Research: {
      screen: ResearchView,
      navigationOptions: {
        title: 'Thuốc'
      }
    },
    Warning: {
      screen: WarningView,
      navigationOptions: {
        title: 'Cảnh báo'
      }
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Research') {
          iconName = loupe;
        } else if (routeName === 'HomePage') {
          iconName = layers;
        } else if (routeName === 'QRCode') {
          iconName = barcode;
        } else if (routeName === 'Warning') {
          iconName = flag;
        } else if (routeName === 'Pharmacy') {
          iconName = message;
        }

        return <Image source={iconName} style={{ width: 27, height: 27, tintColor }} resizeMode={"contain"} />;
      }
    }),
    tabBarComponent: MyTabBar,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    lazy: true
  }
);

export const RootStacks = createStackNavigator(
  {
    HomeTab: {
      screen: RootTabs
    },
    ReasonSelect: {
      screen: ReasonSelect
    },
    Finding: {
      screen: FindingView
    },
    TruyXuat: {
      screen: TruyXuat
    },
    Details: {
      screen: Details
    },
    MedicalByCategory: {
      screen: MedicalByCategoryView
    },
    WarningCloned: {
      screen: WarningViewCloned
    },
    TraCuuNhaThuoc: {
      screen: TraCuuNhaThuoc
    },
    DetailNhaThuoc: {
      screen: DetailNhaThuoc
    },
    Location: {
      screen: Location
    },
    ResultNhaThuoc: {
      screen: ResultNhaThuoc
    },
    // Splash: {
    //   screen: Splash
    // },
    DetailPost: {
      screen: DetailPost
    }
  },
  {
    navigationOptions: {
      header: null,
      // gesturesEnabled: false
    },
    // initialRouteName: "Splash"
  }
);

export const MainStack = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    RootStack: {
      screen: RootStacks
    }
  },
  {
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  }
);


export default MainStack;
