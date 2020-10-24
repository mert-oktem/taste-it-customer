import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions, ScrollView } from 'react-native'

const HomeScreen = () => {
    return (
        <ScrollView>
            <View style={styles.loaction}>
                <View>
                    <Image />
                    Delivery now
                </View>
                <Text style={styles.address}></Text>
            </View>
        </ScrollView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
