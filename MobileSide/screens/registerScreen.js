import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  Picker,
  Button,
  Form,
  Item,
  Label,
  Input
} from "react-native";

class RegisterScreen extends Component {
  state = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    place: ""
  };

  render() {
    return (
      <View>
        <Text>registerScreen</Text>
      </View>
    );
  }
}

export default RegisterScreen;
