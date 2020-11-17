import React from 'react';
import { StyleSheet, Text, View, Image, Button } from "react-native";


const ThanksFeedback = ({route, navigation}) => {
    return (
        <View>
      <Image />
      <Text> Thank You for your feedback. </Text>
      <Text> We look forward to serving you again </Text>
      <Button
        title="Order Again"
        color="purple"
        onPress={() => {
          navigation.navigate("Footer");
        }}
      />
      
    </View>
    );
}

export default ThanksFeedback;
