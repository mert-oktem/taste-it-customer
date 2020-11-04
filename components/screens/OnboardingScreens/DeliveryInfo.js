import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Button,
  TextInput,
  Alert
} from "react-native";
import H1 from "../../texts/H1";
import AsyncStorage from "@react-native-community/async-storage";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";


// const countries = [
//   {
//     value: "Canada",
//     label: "Canada",
//   },
//   {
//     value: "USA",
//     label: "USA",
//   },
//   {
//     value: "UK",
//     label: "UK",
//   },
// ];

// const provinces = [
//   {
//     value: "British Columbia",
//     label: "BC",
//   },
//   {
//     value: "Ontario",
//     label: "ON",
//   },
//   {
//     value: "Alberta",
//     label: "AB",
//   },
// ];

// const cities = [
//   {
//     value: "Vancouver",
//     label: "Vancouver",
//   },
//   {
//     value: "Burnaby",
//     label: "Burnaby",
//   },
//   {
//     value: "Surrey",
//     label: "Surrey",
//   },
//   {
//     value: "Richmond",
//     label: "Richmond",
//   },
// ];

const useStyles = makeStyles({
  inputField: {
    borderRadius: 20,
    width: Dimensions.get("screen").width * 0.8,
    paddingLeft: 1,
    marginBottom: 20,
  },
});

export default function DeliveryInfo({navigation}) {
  const classes = useStyles();
  const [country, setCountry] = React.useState("null");
  const [province, setProvince] = React.useState("null");
  const [city, setCity] = React.useState("null");


  // const handleChange1 = (event) => {
  //   setCountry(event.target.value);
  // };

  // const handleChange2 = (event) => {
  //   setProvince(event.target.value);
  // };

  // const handleChange3 = (event) => {
  //   setCity(event.target.value);
  // };
  const [data, setData] = React.useState({
    countryName: "",
    provinceName: "",
    cityName: "",
    address: "",
    postcode: "",
    instructions: "",
  });
  const [userToken, setUserToken] = React.useState(null);
  const textInputCountryChange = (val) => {
    setData({
      ...data,
      countryName: val,
    });
  };
  const textInputProvinceChange = (val) => {
    setData({
      ...data,
      provinceName: val,
    });
  };
  const textInputCityChange = (val) => {
    setData({
      ...data,
      cityName: val,
    });
  };
  const textInputAddressChange = (val) => {
    setData({
      ...data,
      address: val,
    });
  };
  const textInputPostChange = (val) => {
    setData({
      ...data,
      postcode: val,
    });
  };
  const textInputInfoChange = (val) => {
    setData({
      ...data,
      instructions: val,
    });
  };
  const deliveryHandle = async () => {
    if (
      data.countryName.length == 0 ||
      data.provinceName.length == 0 ||
      data.cityName.length == 0 ||
      data.address.length == 0 ||
      data.postcode.length == 0 ||
      data.instructions.length == 0
    ) {
      Alert.alert("Wrong Input!", "fields cannot be empty.", [
        { text: "Okay" },
      ]);
      return;
    }
    let token = null;
    try {
      token = await AsyncStorage.getItem("userToken");

      setUserToken(token);
      let response = await fetch(
        "http://localhost:5000/api/customers/address",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            countryName: data.countryName,
            provinceName: data.provinceName,
            cityName: data.cityName,
            address: data.address,
            postcode: data.postcode,
          
            instructions: data.instructions,
          }),
        }
      );

      const res = await response.json();

      if (response.status >= 200 && response.status < 300) {
        //Handle success
      
        Alert.alert("User delivery Info saved successfully", "Thank you", [{ text: "Ok" }]);
        navigation.navigate("WelcomeScreen1")
        
      } else {
        Alert.alert("Invalid Input!", "Something went wrong, Try again", [
          { text: "Okay" },
        ]);
        //Handle error
        let error = res;
        throw error;
      }
    } catch (error) {
      // this.setState({error: error});
      console.log(error);
      // this.setState({showProgress: false});
    }
  };

  return (
    <ScrollView>
      <View style={styles.body}>
        <View style={styles.text}>
          <H1 h1Text="Delivery Information" />
          <Text>You say when and where</Text>
        </View>
        <TextInput
          placeholder={"Country Name"}
          textContentType={"name"}
          autoCapitalize="none"
          onChangeText={(val) => textInputCountryChange(val)}
          style={styles.textInput}
        />
        <TextInput
          placeholder={"Province Name"}
          textContentType={"name"}
          autoCapitalize="none"
          onChangeText={(val) => textInputProvinceChange(val)}
          style={styles.textInput}
        />
        <TextInput
          placeholder={"City Name"}
          textContentType={"name"}
          autoCapitalize="none"
          onChangeText={(val) => textInputCityChange(val)}
          style={styles.textInput}
        />

        <TextInput
          placeholder={"Address"}
          textContentType={"fullStreetAddress"}
          autoCapitalize="none"
          onChangeText={(val) => textInputAddressChange(val)}
          style={styles.textInput}
        />

        <TextInput
          placeholder={"Postcode"}
          textContentType={"postalCode"}
          autoCapitalize="none"
          onChangeText={(val) => textInputPostChange(val)}
          style={styles.textInput}
        />

        <TextInput
          placeholder={"Delivery Instruction"}
          textContentType={"none"}
          autoCapitalize="none"
          onChangeText={(val) => textInputInfoChange(val)}
          style={styles.textInput}
        />

        <Button title="Done" type="submit" onPress={() => deliveryHandle()} />

        <Button
            title="Next"
            onPress={() => navigation.navigate("Footer")}
          />

        {/* <TextField
        id="select-country"
        select
        label="Country"
        value={country}
        onChange={handleChange1}
        variant="outlined"
        InputProps={{
          className: classes.inputField,
        }}
      >
        {countries.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        id="select-province"
        select
        label="Province"
        value={province}
        onChange={handleChange2}
        variant="outlined"
        InputProps={{
          className: classes.inputField,
        }}
      >
        {provinces.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        id="select-city"
        select
        label="City"
        value={city}
        onChange={handleChange3}
        variant="outlined"
        InputProps={{
          className: classes.inputField,
        }}
      >
        {cities.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField> */}

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    width: Dimensions.get("screen").width * 0.8,
    // backgroundColor: "lightgreen",
    marginLeft: Dimensions.get("screen").width * 0.1,
    marginTop: Dimensions.get("screen").width * 0.1,
  },
  text: {
    marginBottom: 20,
  },
  textInput: {
    height: Dimensions.get("screen").width * 0.1,
    width: Dimensions.get("screen").width * 0.8,
    backgroundColor: "lightgray",
    marginLeft: Dimensions.get("screen").width * 0.01,
    marginRight: Dimensions.get("screen").width * 0.01,
    marginTop: Dimensions.get("screen").width * 0.02,
    marginBottom: Dimensions.get("screen").width * 0.02,
    fontSize: 23,
    borderRadius: 20,
    paddingLeft: 15,
  },
});
