import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
      <Link to="/SignIn">Get Started</Link>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
