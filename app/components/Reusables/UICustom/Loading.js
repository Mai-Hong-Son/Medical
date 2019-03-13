import React, { Component } from 'react';
import { View, ImageBackground, Text, ActivityIndicator } from 'react-native';
export default class Loading extends Component {

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }
}