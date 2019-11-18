import React from "react";
import { Router, Scene } from "react-native-router-flux";
import { View } from "react-native";
import Register from "./registerScreen";
import Login from "./loginScreen";
import HomeScreen from "./homeScreen";
import TripsScreen from "./tripsScreen";
import OurTripScreen from "./ourTripScreen";
import TripScreen from "./tripScreen";

export default function Routers() {
  return (
    <Router>
      <View>
        <Scene key="TripsScreen" component={TripsScreen} />
        <Scene key="HomeScreen" component={HomeScreen} />
        <Scene key="Register" component={Register} />
        <Scene key="Login" component={Login} />
        <Scene key="OurTripScreen" component={OurTripScreen} />
        <Scene key="TripScreen" component={TripScreen} />
      </View>
    </Router>
  );
}
