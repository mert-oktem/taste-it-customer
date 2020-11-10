import React from 'react'
import {Image,Text, ScrollView, Button} from "react-native"


export default function OrderHistory(props) {
    return (
        <ScrollView>
            <Image />
        
        <Text>No active Orders History</Text>
        
        <Button
            title="Order Now"
            onPress={props.onHandleOrder}
          />
      </ScrollView>
    )
}
