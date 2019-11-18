import React, { Component } from "react";
import { View, StyleSheet, Button } from "react-native";
import axios from "axios";
import formComb from "tcomb-form-native";

const Form = formComb.form.Form;

const User = formComb.struct({
  email: formComb.String,
  password: formComb.String
});

const options = {
  fields: {
    email: {
      error: "Please enter your email...."
    },
    password: {
      error: "Please enter your password...."
    }
  }
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 50,
    padding: 20,
    backgroundColor: "#ffffff"
  }
});

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10
    }
  },
  controlLabel: {
    normal: {
      color: "blue",
      fontSize: 18,
      marginBottom: 7,
      fontWeight: "600"
    },
    error: {
      color: "red",
      fontSize: 18,
      marginBottom: 7,
      fontWeight: "600"
    }
  }
};

export default class LoginScreen extends Component {
  loginIn = () => {
    const value = this._form.getValue();
    axios
      .get("https://192.168.1.10:9000/login", value)
      .then(console.log("LoginScreen"));
  };

  render() {
    return (
      <View style={styles.container}>
        <Form
          ref={formValue => (this._form = formValue)}
          type={User}
          options={options}
        />
        <Button title="Sign In!" onPress={this.loginIn} />
      </View>
    );
  }
}
