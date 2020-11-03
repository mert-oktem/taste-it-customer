import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput } from 'react-native';
import H1 from '../texts/H1';


const ContactTab = () =>
  <ScrollView >
    <Image />
    <H1 h1Text="Contact Us" />
    <Text>Leave us a message, we will get in
        touch with you as soon as possible.</Text>
      <TextInput
        placeholder={"Subject"}
        textContentType={"none"}
      />
      <TextInput
        placeholder={"Message"}
        textContentType={"none"}
      />
      
  </ScrollView>

export default ContactTab;

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