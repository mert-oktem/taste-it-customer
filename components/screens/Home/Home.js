import { NavigationContainer } from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack"
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";


function Home ({navigation})  {
  return (
    <View>
      <Text style={styles.text}>Home</Text>
      <Button title="Get Started"
      onPress={() => navigation.navigate('SignIn')} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  text:{
    fontFamily: "NexaBold",
    fontSize: 40
  }
});
