import React from 'react'
import {Image,Text, ScrollView, Button} from "react-native"


export default function OrderHistoryMade(props) {
    return (
        <ScrollView>
      <Image />
      {props.onRenderOrders()}
    </ScrollView>
    )
}
