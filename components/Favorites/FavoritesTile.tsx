import React, { useEffect } from 'react';
import { Alert, Pressable, StyleSheet, Text } from 'react-native';
import { Favorites } from '../../types';
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface FavoritesTileProps {

    "symbol": string
}

const FavoritesTile = ({ symbol }: FavoritesTileProps) => {

    //GetQuote(): ophalen data per favorite

    return (

        <Pressable style={{
            flexDirection: "column", flex: 1, justifyContent: 'space-between', maxHeight: 80,
            marginTop: 20, marginLeft: 30, marginRight: 30, width: 315,
            backgroundColor: "#dedddc",
            paddingVertical: 10, paddingHorizontal: 10

        }} 
        >
            <Text>{`Symbol: ${symbol}`}</Text>            

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

export default FavoritesTile;