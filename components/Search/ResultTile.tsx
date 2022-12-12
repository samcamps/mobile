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

        let bestaatAl = favorites.myFavorites.find((el) => el['1. symbol']=== item['1. symbol']);

        if (bestaatAl){
            Alert.alert("This stock is already in your favorites!")
        }

        else if (favorites.myFavorites.length < 5) {

            favorites.myFavorites.push({ ["1. symbol"]: item['1. symbol'], ["2. name"]: item['2. name'], ['8. currency']: item['8. currency'] })
            await AsyncStorage.setItem("storedfavs", JSON.stringify(favorites));
            Alert.alert(`${item['1. symbol']} toegevoegd aan favorieten`)
        }
        else {
            Alert.alert("Maximum number of favorites reached!")
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

            <Text>{`Name: ${item['2. name']}`}</Text>
            <Text>{`Symbol: ${item['1. symbol']}`}</Text>
            <Text>{`Currency: ${item['8. currency']}`}</Text>
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