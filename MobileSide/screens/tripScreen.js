import React, { Component } from "react";
import { Button, Text, View, FlatList } from "react-native";

class TripScreen extends Component {
  state = {};
  render() {
    return (
      <View>
        <FlatList
          data={this.props.Offers}
          renderItem={({ item }) => {
            return (
              <View>
                <Text>{item.name}</Text>
                <Text>{item.price}.JD</Text>
              </View>
            );
          }}
          keyExtractor={(key) => key.name}
        />
      </View>
    );
  }
}

export default TripScreen;

// <View>
//       <Text>tripScreen</Text>
//       <Button
//         onPress={() => {
//           console.log(this.props.Offers);
//         }}
//         title="TEST"
//       />
//     </View>
