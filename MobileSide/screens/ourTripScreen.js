import React, { Component } from "react";
import {
  Alert,
  Text,
  View,
  TextInput,
  Button,
  Keyboard,
  FlatList,
  TouchableHighlight
} from "react-native";
import axios from "axios";
import t from "tcomb-form-native";
import TripComponent from "../components/tripComponent";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
//form
const Form = t.form.Form;
const User = t.struct({
  value: t.Number
  // name: t.String,
  // age: t.Boolean
});
class OurTripScreen extends Component {
  state = {
    // budget: {
    //   trasnportation: "",
    //   entertainment: "",
    //   eat: ""
    // },
    trips: [],
    currentLocation: {}
  };
  findBestTrip = async () => {
    if (this._form.getValue() == null) {
      Alert.alert("PLease Input your Budget");
    } else {
      var value = this._form.getValue();
      var amount = {
        trasnportation: value.value * 0.2,
        entertainment: value.value * 0.5,
        eat: value.value * 0.3
      };
    }
    Keyboard.dismiss();
    axios
      // .post("http://10.60.243.14:9000/getBestTrip", this.state.budget)
      .post("http://10.60.243.14:9000/getBestTrip", amount)
      .then(({ data }) => {
        this.setState({ trips: data });
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount = () => {
    this._getLocation();
    this.setState({ trips: [] });
  };
  distance = (lat1, lon1, lat2, lon2) => {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    return dist * 0.2;
  };
  _getLocation = async () => {
    let { status } = await Permissions.getAsync(Permissions.LOCATION);
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
    }
    let { coords } = await Location.getCurrentPositionAsync();
    this.setState({ currentLocation: coords });
  };
  render() {
    return (
      <View>
        <Form type={User} ref={(c) => (this._form = c)} />
        {this.state.trips.map((item) => {
          let priceBetweenPlaces = this.distance(
            this.state.currentLocation.latitude,
            this.state.currentLocation.longitude,
            item[0].description[0].position[0],
            item[0].description[0].position[1]
          );
          return (
            <TripComponent
              key={Math.random() * 100}
              item={item[0].description[0].title}
              offers={item[0].offers}
            />
          );
        })}
        <Button title="Find Best Trips" onPress={this.findBestTrip} />
      </View>
    );
  }
}
export default OurTripScreen;
