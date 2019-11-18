import React, { Component } from "react";
import { View, StyleSheet, Button } from "react-native";
import axios from "axios";
import formComb from "tcomb-form-native";

const Form = formComb.form.Form;

const registerForm = formComb.struct({
  email: formComb.String,
  username: formComb.String,
  password: formComb.String,
  phonenumber: formComb.Number
});

const options = {
  fields: {
    email: {
      error: "Email is incorrect?"
    },
    username: {
      error: "Please enter your name"
    },
    password: {
      error: "Please enter your password"
    },
    phonenumber: {
      error: "Please enter your phone number"
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

export default class RegisterScreen extends Component {
  register = () => {
    const value = this._form.getValue();
    // console.log(value);
    axios
      .post("https://192.168.1.10:9000/register", value)
      .then(console.log("Register"));
  };

  render() {
    return (
      <View style={styles.container}>
        <Form
          ref={formValue => (this._form = formValue)}
          type={registerForm}
          options={options}
        />
        <Button title="Sign Up!" onPress={this.register} />
      </View>
    );
  }
}
