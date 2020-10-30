import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Button,
  TextInput,
} from "react-native";
import H1 from "../../texts/H1";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const countries = [
  {
    value: "Canada",
    label: "Canada",
  },
  {
    value: "USA",
    label: "USA",
  },
  {
    value: "UK",
    label: "UK",
  },
];

const provinces = [
  {
    value: "British Columbia",
    label: "BC",
  },
  {
    value: "Ontario",
    label: "ON",
  },
  {
    value: "Alberta",
    label: "AB",
  },
];

const cities = [
  {
    value: "Vancouver",
    label: "Vancouver",
  },
  {
    value: "Burnaby",
    label: "Burnaby",
  },
  {
    value: "Surrey",
    label: "Surrey",
  },
  {
    value: "Richmond",
    label: "Richmond",
  },
];

const useStyles = makeStyles({
  inputField: {
    borderRadius: 20,
    width: Dimensions.get("screen").width * 0.8,
    paddingLeft: 1,
    marginBottom: 20,
  },
});

export default function DeliveryInfo() {
  const classes = useStyles();
  const [country, setCountry] = React.useState("null");
  const [province, setProvince] = React.useState("null");
  const [city, setCity] = React.useState("null");

  const handleChange1 = (event) => {
    setCountry(event.target.value);
  };

  const handleChange2 = (event) => {
    setProvince(event.target.value);
  };

  const handleChange3 = (event) => {
    setCity(event.target.value);
  };
  return (
    <ScrollView>
      <View style={styles.text}>
        <H1 h1Text="Delivery Information" />
        <Text>You say when and where</Text>
      </View>
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

      <TextInput
        placeholder={"Address"}
        textContentType={"fullStreetAddress"}
      />

      <TextInput placeholder={"Postcode"} textContentType={"postalCode"} />

      <TextInput
        placeholder={"Delivery Instruction"}
        textContentType={"none"}
      />

      <Button title="Done" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    marginTop: 30,
    marginBottom: 30,
  },
});
