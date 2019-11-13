import React from "react";
import { Actions } from "react-native-router-flux";
import { TouchableHighlight, Text, View } from "react-native";
const register = () => {
  Actions.Register();
};
export default function Router() {
  return (
    <TouchableHighlight
      onPress={() => {
        Actions.HomeScreen();
      }}
    >
      <View>
        <Text>Navigations</Text>
      </View>
    </TouchableHighlight>
  );
}
