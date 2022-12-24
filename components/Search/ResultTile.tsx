import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Favorites, ResultTileProps } from '../../types';
import { FontAwesome } from '@expo/vector-icons'; 

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

        let bestaatAl = favorites.myFavorites.find((el) => el['1. symbol'] === item['1. symbol']);

        if (bestaatAl) {
            Alert.alert("This stock is already in your favorites!")
        }

        else if (favorites.myFavorites.length < 5) {

            favorites.myFavorites.push({ ["1. symbol"]: item['1. symbol'], ["2. name"]: item['2. name'], ['8. currency']: item['8. currency'] })
            await AsyncStorage.setItem("storedfavs", JSON.stringify(favorites));
            Alert.alert(`${item['1. symbol']} added to favorites`)
        }
        else {
            Alert.alert("Maximum number of favorites reached!")
        }
    };

    return (

        <View style={styles.container}>

            <View style={styles.textContainer}>
                <Text style={styles.title}>{item['1. symbol']}</Text>
                <Text style={styles.text}>{`Name: ${item['2. name']}`}</Text>              
                <Text style={styles.text}>{`Currency: ${item['8. currency']}`}</Text>
                <Text style={styles.text}>{`Region: ${item['4. region']}`}</Text>
            </View>

            <Pressable
                style={styles.pressable}
                onPress={storeData}
            >
                <FontAwesome name="star-o" size={22} color="#7b7b7b" />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "93%",
        alignSelf: "center",
        borderRadius: 10,
        maxHeight: 150,
        marginTop: 15,
        backgroundColor: "white",
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    textContainer: {
        width: "90%",
        marginRight: 5,
    },
    title: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#424242",
        paddingBottom: 7,
    },
    text: {
        lineHeight: 20,
    },
    pressable: {
        paddingTop: 4,
    }
});

export default ResultTile;