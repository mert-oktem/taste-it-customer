import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const ProfileTab = ({navigation}) =>
  <ScrollView >
    <View>
    	<Text >Hi, Mehedi</Text>
      <Image />
    </View>
    <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
      <Image />
      <Text>Account Profile</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("DeliveryInfo")}>
      <Image />
      <Text>Delivery Information</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("FlavourProfile")}>
      <Image />
      <Text>Flavour Profile</Text>
    </TouchableOpacity>
  </ScrollView>

export default ProfileTab;

export const styles = StyleSheet.create({
    center: {
      flex: 1,
      margin: 24,
      justifyContent: 'center',
      alignItems: 'center'
    },
    title: {
      fontSize: 36,
      marginBottom: 16
    }
  });