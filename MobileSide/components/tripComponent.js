import React, { Component } from "react";
import { Text, View, TouchableHighlight } from "react-native";
import { Actions } from "react-native-router-flux";

class TripComponents extends Component {
  state = {};

  offers = () => {
    Actions.TripScreen({ Offers: this.props.offers });
  };
  render() {
    return (
      <View>
        <TouchableHighlight onPress={this.offers}>
          <Text>{this.props.item}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default TripComponents;
