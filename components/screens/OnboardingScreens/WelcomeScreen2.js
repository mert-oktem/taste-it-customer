import React from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions, Image } from 'react-native'
import ReusableBtn from '../../Buttons/ReusableBtn'

const WelcomeScreen2 = () => {
    return (
        <ScrollView>
            <Image style={styles.image} />
            <View style={styles.page}>
                <Text style={styles.text1}>Hi Mehedi</Text>
                <Text style={styles.heading}>Welcome Aboard!</Text>
                <Text style={styles.text2}>Ready for your new food  experiences? Discover your next favourite food through mystery dishes, customized just for you.</Text>
                <ReusableBtn btnText="Create Flavour Profile" />
            </View>
            
        </ScrollView>
    )
}

export default WelcomeScreen2

const styles = StyleSheet.create({
    image:{
        height: Dimensions.get("screen").width,
        width: Dimensions.get("screen").width,
        backgroundColor: "lightgray",
        marginTop: Dimensions.get("screen").width * 0.15
    },
    page:{
        width: Dimensions.get("screen").width * 0.8,
        marginLeft: Dimensions.get("screen").width * 0.1,
        marginTop: 30
    },
    text1:{
        fontSize: 16
    },
    text2:{
        marginBottom: 15,
        fontSize: 16
    },
    heading:{
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 5,
        marginBottom: 15,
        lineHeight: 40
    }
})
