import React, { Component } from 'react';
import { Text, View ,TextInput , Button} from "react-native";

class OurTripScreen extends Component {
  state = {
    Budget:''
  };

  findBestTrip =() =>{
    
  }
  
  changeBudget = (budget) =>{
    this.setState({Budget:budget})
    
  }
  render() {

    return (
      <View>
        <Text>ourTripScreen</Text>
        <TextInput placeholder="Your Budget" onChangeText={this.changeBudget} />
        <Button title="Find Best Trips" />
        
      </View>
    );
  }
}

export default OurTripScreen;
