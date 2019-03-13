import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Platform, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import logo from '../../../assets/menuicon/logo-white-small.png'
export default class Header extends React.Component {

  customBackButton = () => {
    const { navigation, goToBack } = this.props;

    return (
      <TouchableOpacity style={styles.contentSmall} onPress={() => {
        if (goToBack) {
          goToBack()
        } else {
          navigation.goBack()
        }
      }}>
        <Icon name={'ios-arrow-back-outline'} size={27} color={'#fff'} />
      </TouchableOpacity>
    );
  }
  customDot = () => {
    const { navigation } = this.props;
    return (
      <TouchableOpacity style={styles.dot} onPress={() => navigation.goBack()}>
        <Entypo name={'dots-three-horizontal'} size={27} color={'#fff'} />
      </TouchableOpacity>
    );
  }
  customSearch = () => {
    const { navigation, goToSearch } = this.props;
    return (
      <TouchableOpacity style={styles.search} onPress={() => goToSearch()}>
        <Icon name={'ios-search'} size={27} color={'#fff'} />
      </TouchableOpacity>
    );
  }

  render() {
    const { type, title, dot, search } = this.props;

    return (
      <LinearGradient
        // colors={['#f37545', '#f04e4b']}
        colors={['#f37545', '#f04e4b']}
        end={{ x: 1, y: 1.5 }}
        start={{ x: 0.0, y: 0.25 }}
        style={styles.containerHeader}
      >
        <View style={styles.wrapHeader} >
          <View style={styles.wraptTitle}>
            {(title) ? <Text style={styles.txtTitle} numberOfLines={1}>{title === undefined ? title : title}</Text> :
              <Image
                source={logo}
                style={{ width: "40%", height: 40 }}
                resizeMode={"contain"}
              />
            }


          </View>
        </View>
        {type === 'stack' ? this.customBackButton() : null}
        {(dot) ? this.customDot() : null}
        {(search) ? this.customSearch() : null}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  containerHeader: {
    height: (Platform.OS === "ios") ? 70 : 50,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 9999,
    paddingBottom: 15
  },
  wrapHeader: {
    width: '90%',
    height: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  contentSmall: {
    width: 50,
    height: 50,
    position: "absolute",
    left: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  wraptTitle: {
    flex: 8,
    alignItems: 'center'
  },
  txtTitle: {
    color: '#fff',
    fontSize: 18
  },
  dot: {
    position: "absolute",
    right: 0,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  search: {
    position: "absolute",
    right: 0,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  }
});
