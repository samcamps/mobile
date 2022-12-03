import React, { useEffect } from 'react';
import { Alert, Pressable, StyleSheet, Text } from 'react-native';
import { Favorites, ResultTileProps } from '../../types';
import AsyncStorage from "@react-native-async-storage/async-storage";

const ResultTile = ({ item }: ResultTileProps) => {

    let favorites: Favorites = { myFavorites: [] }

    const getData = async () => {
        let result = await AsyncStorage.getItem("storedfavs");
        if (result !== null) {
            favorites = JSON.parse(result);
        }
    };

    const storeData = async () => {

        await getData()

        if (favorites.myFavorites.length < 5) {

            favorites.myFavorites.push({ ["1. symbol"]: item['1. symbol'], ["2. name"]: item['2. name'] })
            await AsyncStorage.setItem("storedfavs", JSON.stringify(favorites));
            Alert.alert(`${item['1. symbol']} toegevoegd aan favorieten`)
        }
        else {
            Alert.alert("Maximum aantal favorieten reeds bereikt")
        }
    };

    return (

        <Pressable style={{
            flexDirection: "column", flex: 1, justifyContent: 'space-between', maxHeight: 80,
            marginTop: 20, marginLeft: 30, marginRight: 30,
            backgroundColor: "#dedddc",
            paddingVertical: 10, paddingHorizontal: 10

        }} delayLongPress={500}
            onLongPress={storeData}
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