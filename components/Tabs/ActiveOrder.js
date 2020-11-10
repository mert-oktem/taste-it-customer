import React from 'react'
import {Image,Text, ScrollView, Button} from "react-native"


export default function ActiveOrder(props) {
    return (
        <ScrollView>
            <Image />
        
        <Text>No active Orders Currently</Text>
        
        <Button
            title="Order Now"
            onPress={props.onHandleOrder}
          />
      </ScrollView>
    )
}
