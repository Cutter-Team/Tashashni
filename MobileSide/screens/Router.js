import React from "react";
import { Router, Scene } from "react-native-router-flux";
import { Text, View } from "react-native";
import Register from "./registerScreen";
import HomeScreen from "./homeScreen";
import TripsScreen from "./tripsScreen";
import OurTripScreen from "./ourTripScreen";
export default function Routers() {
  return (
    <Router>
      <View>
        <Scene key="TripsScreen" component={TripsScreen} />
        <Scene key="HomeScreen" component={HomeScreen} />
        <Scene key="Register" component={Register} />
        <Scene key="OurTripScreen" component={OurTripScreen} />
      </View>
    </Router>
  );
}
