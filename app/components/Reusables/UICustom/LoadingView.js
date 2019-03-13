import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from './header';

export default class LoadingView extends React.Component {
  render() {
    const { text } = this.props;
    return (
      <LinearGradient
        colors={['#f37545', '#f04e4b']}
        end={{ x: 1, y: 1.5 }}
        start={{ x: 0.0, y: 0.25 }}
        style={[
          styles.container,
          { paddingBottom: this.props.paddingBottom ? this.props.paddingBottom : 0 }
        ]}
      >
        <Header
          navigation={this.props.navigation}
          type={this.props.hideBackButton ? null : 'stack'}
          title={''}
        />
        <View style={styles.body}>
          <Text style={styles.loadingText}>{text}</Text>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  loadingText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16
  }
});
