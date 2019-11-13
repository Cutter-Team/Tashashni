import React, { Component } from 'react';
import { Text, View ,Button} from "react-native";
import {Actions} from 'react-native-router-flux';
import Navigation from './Navigations';

class HomeScreen extends Component {
  state = {};
  render() {
    return (
      <View >
       
        <Text>homeScreen</Text>
        {/* <Button title="Our Trip"  onPress={()=>{Actions.OurTripScreen()}}/>
        <Button title="Build Your Trip"/> */}
      </View>
    );
  }
}

export default HomeScreen;
