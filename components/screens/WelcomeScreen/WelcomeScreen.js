import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  Button
} from "react-native";
import ReusableBtn from "../../buttons/ReusableBtn";
import AsyncStorage from "@react-native-community/async-storage";

const WelcomeScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.page}>
      <Image style={styles.image} />
      <View>
        <Text style={styles.heading}>Tailored Food Just For You.</Text>
        <Text style={styles.text}>
          Get a unique culinary experience by having a delivered surprise meal
          picked out to suit your preferences.
        </Text>
        <Button
          title="Sign out"
          
          onPress={() => {
            AsyncStorage.clear()
            navigation.navigate('SignIn')
          }}
          
        />
      </View>
      {/* <ReusableBtn btnText="Get Started" /> */}
    </ScrollView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  image: {
    height: Dimensions.get("screen").width,
    backgroundColor: "lightgray",
    marginTop: Dimensions.get("screen").width * 0.15,
  },
  page: {
    width: Dimensions.get("screen").width * 0.8,
  },
  text: {
    marginBottom: 15,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 15,
    lineHeight: 40,
  },
});
