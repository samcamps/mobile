import React, { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text } from 'react-native';
import { Portfolio, ResultTileAddProps } from '../../types';
import AsyncStorage from "@react-native-async-storage/async-storage";

const ResultTile = ({ item, onAddID }: ResultTileAddProps) => {

    const handlePress = () => {
        onAddID(item)
    }


    return (

        <Pressable style={{
            flexDirection: "column", flex: 1, justifyContent: 'space-between', maxHeight: 80,
            marginTop: 20, marginLeft: 30, marginRight: 30,
            backgroundColor: "#dedddc",
            paddingVertical: 10, paddingHorizontal: 10

        }} delayLongPress={500}
            onLongPress={handlePress}
        >
            <Text>{`Symbol: ${item['1. symbol']}`}</Text>
            <Text>{`Name: ${item['2. name']}`}</Text>
            <Text>{`Region: ${item['4. region']}`}</Text>

        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ResultTile;