import React from 'react';
import { View } from 'react-native';

export default class CameraFramePiece extends React.Component {
  render() {
    return (
      <View style={this.props.style}>
        <View
          style={{
            width: 42,
            height: 12,
            backgroundColor: 'rgb(81, 149, 241)',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8
          }}
        />
        <View
          style={{
            width: 12,
            height: 30,
            backgroundColor: 'rgb(81, 149, 241)',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8
          }}
        />
      </View>
    );
  }
}
