import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import {CheckBox} from 'react-native-elements';


export default class AllergyOptions extends Component {
    render() {
        return (
            <View>
                <View>
                    <Text> Milk </Text>
                    <CheckBox />
                </View>
                <View>
                    <Text> Eggs </Text>
                    <CheckBox />
                </View>
                <View>
                    <Text> Fish </Text>
                    <CheckBox />
                </View>
                <View>
                    <Text> Crustacean Shellfish </Text>
                    <CheckBox />
                </View>
                <View>
                    <Text> Tree Nuts </Text>
                    <CheckBox />
                </View>
                <View>
                    <Text> Peanuts </Text>
                    <CheckBox />
                </View>
                <View>
                    <Text> Wheat </Text>
                    <CheckBox />
                </View>
                <View>
                    <Text> Soybeans </Text>
                    <CheckBox />
                </View>
            </View> 
        )
    }
}

const styles = StyleSheet.create({})
