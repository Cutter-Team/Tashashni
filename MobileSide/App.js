import React from "react";
import { StyleSheet, Text, View } from "react-native";
import TripsScreen from "./screens/tripsScreen";
import RegisterScreen from "./screens/registerScreen";
// import TripsScreen from "./screens/tripsScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Tashashni</Text>
      <TripsScreen />
      <RegisterScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
