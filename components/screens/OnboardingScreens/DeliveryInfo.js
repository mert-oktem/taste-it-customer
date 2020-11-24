import React, { Component, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
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
  TouchableOpacity,
} from "react-native";
import H1 from "../../texts/H1";
import AsyncStorage from "@react-native-community/async-storage";
import RNPickerSelect from "react-native-picker-select";
import DropDownPicker from "react-native-dropdown-picker";
import { getCities, getCountries, getProvinces } from "../../../services/api";

export default function DeliveryInfo({ navigation }) {
  // const classes = useStyles();
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
          });
        }
        setCountrydata(needDataCountry);
      },
      (err) => {
        console.log(err);
      }
    );
    setData({
      ...data,
      isLoaded: false,
    });
  }, []);

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
      let response = await fetch("https://taste-it.ca/api/customers/address", {
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
      });

      const res = await response.json();

      if (response.status >= 200 && response.status < 300) {
        Alert.alert("User delivery Info saved successfully", "Thank you", [
          { text: "Ok" },
        ]);
        navigation.navigate("Footer");
      } else {
        Alert.alert("Invalid Input!", "Something went wrong, Try again", [
          { text: "Okay" },
        ]);
        let error = res;
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (data.isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={styles.body}>
          <View style={styles.text}>
            <H1 h1Text="Delivery Information" />
            <Text style={styles.textChild}>You say when and where</Text>
          </View>
          <View>
            <View style={{ display: "flex", zIndex: 1, flexDirection: "row" }}>
              <Text style={styles.placeholder}>Country</Text>
              <View style={{ flexGrow: 1 }} />
            </View>
            <View style={styles.picker}>
              <RNPickerSelect
                // placeholderTextColor="#3E315A"
                style={pickerSelect}
                onValueChange={(value) => textInputCountryChange(value)}
                items={countrydata}
              />
            </View>
          </View>
          <View>
            <View style={{ display: "flex", zIndex: 1, flexDirection: "row" }}>
              <Text style={styles.placeholder}>Province</Text>
              <View style={{ flexGrow: 1 }} />
            </View>
            <View style={styles.picker}>
              <RNPickerSelect
                placeholderTextColor="#3E315A"
                style={pickerSelect}
                onValueChange={(value) => textInputProvinceChange(value)}
                items={provincedata}
              />
            </View>
          </View>
          <View>
            <View style={{ display: "flex", zIndex: 1, flexDirection: "row" }}>
              <Text style={styles.placeholder}>City</Text>
              <View style={{ flexGrow: 1 }} />
            </View>
            <View style={styles.picker}>
              <RNPickerSelect
                placeholder={" "}
                placeholderTextColor="#3E315A"
                style={pickerSelect}
                onValueChange={(value) => textInputCityChange(value)}
                items={citydata}
              />
            </View>
          </View>
          <View>
            <View style={{ display: "flex", zIndex: 1, flexDirection: "row" }}>
              <Text style={styles.placeholder}>Address</Text>
              <View style={{ flexGrow: 1 }} />
            </View>
            <TextInput
              textContentType={"fullStreetAddress"}
              autoCapitalize="none"
              onChangeText={(val) => textInputAddressChange(val)}
              style={styles.textInput}
            />
          </View>

          <View>
            <View style={{ display: "flex", zIndex: 1, flexDirection: "row" }}>
              <Text style={styles.placeholder}>Postcode</Text>
              <View style={{ flexGrow: 1 }} />
            </View>

            <TextInput
              textContentType={"postalCode"}
              autoCapitalize="none"
              onChangeText={(val) => textInputPostChange(val)}
              style={styles.textInput}
            />
          </View>

          <View>
            <View style={{ display: "flex", zIndex: 1, flexDirection: "row" }}>
              <Text style={styles.placeholder}>Delivery Instructions</Text>
              <View style={{ flexGrow: 1 }} />
            </View>
            <TextInput
              textContentType={"none"}
              autoCapitalize="none"
              onChangeText={(val) => textInputInfoChange(val)}
              style={styles.textInputDelivery}
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            type="submit"
            onPress={() => deliveryHandle()}
          >
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const pickerSelect = {
  inputiOS: {
    color: "red",
    backgroundColor: "red",
  },
  placeholderColor: "white",
};

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
  textChild: {
    color: "#3E315A",
    lineHeight: 20,
  },
  textInput: {
    height: 50,
    width: Dimensions.get("screen").width * 0.8,
    backgroundColor: "white",
    // marginLeft: Dimensions.get("screen").width * 0.01,
    marginRight: Dimensions.get("screen").width * 0.01,
    marginTop: Dimensions.get("screen").width * 0.02,
    marginBottom: Dimensions.get("screen").width * 0.03,
    fontSize: 18,
    borderColor: "#D4CDE3",
    borderWidth: 2,
    borderRadius: 15,
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
  },
  textInputDelivery: {
    height: 200,
    width: Dimensions.get("screen").width * 0.8,
    backgroundColor: "white",
    // marginLeft: Dimensions.get("screen").width * 0.01,
    marginRight: Dimensions.get("screen").width * 0.01,
    marginTop: Dimensions.get("screen").width * 0.02,
    marginBottom: Dimensions.get("screen").width * 0.03,
    fontSize: 18,
    borderColor: "#D4CDE3",
    borderWidth: 2,
    borderRadius: 15,
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
  },
  button: {
    backgroundColor: "#632DF1",
    paddingTop: 17.5,
    paddingBottom: 17.5,
    borderRadius: 16,
    marginBottom: 30,
    marginTop: 50,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "NexaXBold",
  },
  picker: {
    borderColor: "#D4CDE3",
    borderWidth: 2,
    height: 50,
    paddingTop: 15,
    paddingLeft: 15,
    borderRadius: 15,
    marginTop: Dimensions.get("screen").width * 0.02,
    marginBottom: Dimensions.get("screen").width * 0.03,
  },
  placeholder: {
    fontFamily: "NexaRegular",
    fontSize: 12,
    color: "#3e315a",
    backgroundColor: "white",
    position: "relative",
    top: 17,
    left: 19,
    lineHeight: 15,
    zIndex: 1,
    paddingHorizontal: 5,
    // paddingVertical: 10,
  },
});
