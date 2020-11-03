import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import H1 from '../texts/H1';



const OrderTab = () => {

  const isFocused = useIsFocused();

  console.log(isFocused);

  return <ScrollView>
    <H1 h1Text="Order History" />
    <Text>Date</Text>
    <View>
      <Image />
      <View>
        <Text>Japanese Tsukemen</Text>
        <View>
          <Image />
          <Text>Restaurant Name</Text>
        </View>
        <View>
          <Image />
          <Text>$15</Text>
        </View>
      </View>
    </View>
  </ScrollView>

}



export default OrderTab;


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