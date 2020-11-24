import React, { Component, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Button,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import H1 from "../../texts/H1";
import { makeStyles } from "@material-ui/core/styles";
import RNPickerSelect from "react-native-picker-select";
import {
  getCities,
  getCountries,
  getProvinces,
  putDeliveryInfo,
} from "../../../services/api";

const useStyles = makeStyles({
  inputField: {
    borderRadius: 20,
    width: Dimensions.get("screen").width * 0.8,
    paddingLeft: 1,
    marginBottom: 20,
  },
});

export default function EditDelivery({ navigation }) {
  const classes = useStyles();
  const [citydata, setCitydata] = React.useState("null");
  const [countrydata, setCountrydata] = React.useState("null");
  const [provincedata, setProvincedata] = React.useState("null");

  const [data, setData] = React.useState({
    countryName: "",
    provinceName: "",
    cityName: "",
    address: "",
    postcode: "",
    instructions: "",
    isLoaded: true,
  });

  useEffect(() => {
    getCities().then(
      (res) => {
        let needDataCity = [];
        for (let i = 0; i < res.length; i++) {
          needDataCity.push({
            label: res[i].cityDescription,
            value: res[i].cityDescription,
            key: res[i].cityDescription,
          });
        }
        setCitydata(needDataCity);
      },
      (err) => {
        console.log(err);
      }
    );
    getProvinces().then(
      (res) => {
        let needDataProvince = [];
        for (let i = 0; i < res.length; i++) {
          needDataProvince.push({
            label: res[i].provinceDescription,
            value: res[i].provinceDescription,
            key: res[i].cityDescription,
          });
        }
        setProvincedata(needDataProvince);
      },
      (err) => {
        console.log(err);
      }
    );
    getCountries().then(
      (res) => {
        let needDataCountry = [];
        for (let i = 0; i < res.length; i++) {
          needDataCountry.push({
            label: res[i].countryDescription,
            value: res[i].countryDescription,
            key: res[i].cityDescription,
          });
        }
        setCountrydata(needDataCountry);
        setData({
          ...data,
          isLoaded: false,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

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

    putDeliveryInfo(
      data.countryName,
      data.provinceName,
      data.cityName,
      data.address,
      data.postcode,
      data.instructions
    ).then(
      (res) => {
        console.log(res);
        Alert.alert("User delivery Info saved successfully", "Thank you", [
          { text: "Ok" },
        ]);
        navigation.navigate("Footer");
      },
      (err) => {
        console.log(err);
        Alert.alert("Error", `Something went wrong! ${err}`);
      }
    );
  };
  if (data.isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.text}>
            <H1 h1Text="Delivery Information" />
            <Text>You say when and where</Text>
          </View>
          <View>
            <Text>Country</Text>
            <RNPickerSelect
              onValueChange={(value) => textInputCountryChange(value)}
              items={countrydata}
            />
          </View>
          <View>
            <Text>Province</Text>
            <RNPickerSelect
              onValueChange={(value) => textInputProvinceChange(value)}
              items={provincedata}
            />
          </View>

          <View>
            <Text>City</Text>
            <RNPickerSelect
              onValueChange={(value) => textInputCityChange(value)}
              items={citydata}
            />
          </View>

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
        </View>
      </ScrollView>
    );
  }
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
