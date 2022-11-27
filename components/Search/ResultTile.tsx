
import React, { useEffect } from 'react';
import { Alert, Pressable, StyleSheet, Text } from 'react-native';
import { Favorites, ResultTileProps } from '../../types';
import AsyncStorage from "@react-native-async-storage/async-storage";



const ResultTile = ({ item }: ResultTileProps) => {

    let favorites: Favorites = { myFavorites: [] }

    const getData = async () => {
        let result = await AsyncStorage.getItem("favs");
        if (result !== null) {
            favorites = JSON.parse(result);
        }
         console.log(result)

    };

    // useEffect(() => {
    //     getData();
    // }, []);

    const storeData = async () => {

        await getData()
        favorites.myFavorites.push(`${item['1. symbol']}`)
        await AsyncStorage.setItem("favs", JSON.stringify(favorites));
        Alert.alert(`${item['1. symbol']} toegevoegd aan favorieten`)
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