import React from 'react';
import { View, ScrollView, StyleSheet, TouchableHighlight, Text } from 'react-native';
import Header from './../Reusables/UICustom/header';

const reasons = ['Thuốc giả', 'Thuốc kém chất lượng', 'Lý do khác'];

export default class ReasonSelect extends React.Component {
  _onRowPress(index) {
    const { onSelect } = this.props.navigation.state.params;
    onSelect && onSelect(index);
    this.props.navigation.goBack();
  }

  render() {
    // const { reasons } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Header type={'stack'} navigation={this.props.navigation} />
        <ScrollView contentContainerStyle={styles.scrollView}>
          {reasons.map((item, index) => (
            <TouchableHighlight key={index} onPress={this._onRowPress.bind(this, index)}>
              <View>
                <View style={styles.reasonRow}>
                  <Text>{item}</Text>
                </View>
                <View style={styles.separator} />
              </View>
            </TouchableHighlight>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  scrollView: {
    flex: 1,
    justifyContent: 'flex-start'
  },

  reasonRow: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10
  },

  separator: {
    height: StyleSheet.hairlineWidth
  }
});
