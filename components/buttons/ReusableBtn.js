import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const ReusableBtn = (props) => {
  return <Button title={props.btnText} onPress={props.btnAction} />;
};

export default ReusableBtn;

const styles = StyleSheet.create({});
