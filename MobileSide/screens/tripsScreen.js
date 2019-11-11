import React, { Component } from "react";
import { Text, View } from "react-native";
import TripScreen from "./tripScreen";

class TripsScreen extends Component {
  state = {};
  render() {
    return (
      <View>
        <Text>tripsScreen</Text>
        <TripScreen />
      </View>
    );
  }
}

export default TripsScreen;
