import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const HomeTab = () =>
  <View style={styles.center}>
    <Text style={styles.title}>Home</Text>
  </View>


export default HomeTab;

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