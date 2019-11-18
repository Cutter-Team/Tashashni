import React, { Component } from "react";
import { Alert, View, Button, Keyboard } from "react-native";
import axios from "axios";
import t from "tcomb-form-native";
import TripComponent from "../components/tripComponent";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

const Form = t.form.Form;

const User = t.struct({
  value: t.Number
});

class OurTripScreen extends Component {
  state = {
    trips: [],
    currentLocation: {}
  };

  componentDidMount = () => {
    this._getLocation();
    this.setState({ trips: [] });
  };

  findBestTrip = async () => {
    if (this._form.getValue() == null) {
      Alert.alert("PLease Input your Budget");
    } else {
      var value = this._form.getValue();
      var amount = {
        transportation: value.value * 0.2,
        entertainment: value.value * 0.5,
        eat: value.value * 0.3
      };
    }
    Keyboard.dismiss();
    axios
      .post("http://10.60.243.14:9000/getBestTrip", amount)
      .then(({ data }) => {
        this.setState({ trips: data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  distance = (lat1, lon1, lat2, lon2) => {
    var radLat1 = (Math.PI * lat1) / 180;

    var radLat2 = (Math.PI * lat2) / 180;

    var theta = lon1 - lon2;

    var radTheta = (Math.PI * theta) / 180;

    var dist =
      Math.sin(radLat1) * Math.sin(radLat2) +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
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
        <Form type={User} ref={formValues => (this._form = formValues)} />
        {this.state.trips.map(item => {
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
