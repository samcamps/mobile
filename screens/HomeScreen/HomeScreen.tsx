import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Favorites } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FavoritesTile from "../../components/Favorites/FavoritesTile";
import Constants from "expo-constants";

const HomeScreen = () => {

    const [favorites, setFavorites] = useState<Favorites>();

    useEffect(() => {
        const getData = async () => {
            let result = await AsyncStorage.getItem("storedfavs");
            if (result !== null) {
                setFavorites(JSON.parse(result));
            }
        };
        getData();
    }, []);

    console.log(favorites?.myFavorites);    

    //key = string symbol: error in console bij dubbele favorites
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Favorites</Text>
            {favorites?.myFavorites.map(favorite => (
                <FavoritesTile symbol={favorite} key={favorite} />
            ))}
        </View>
    );
}

//CSS nog aanpassen
const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        flex: 1, 
        alignItems: "center",
    },
    title: {
        marginTop: 20,
        fontWeight: "bold",
    }
});

export default HomeScreen;