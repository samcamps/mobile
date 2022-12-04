import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { Favorites } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FavoritesTile from "../../components/Favorites/FavoritesTile";
import Constants from "expo-constants";

const HomeScreen = () => {

    const [favorites, setFavorites] = useState<Favorites>();

    useFocusEffect(
        React.useCallback(() => {
            const getData = async () => {
                let result = await AsyncStorage.getItem("storedfavs");
                if (result !== null) {
                    setFavorites(JSON.parse(result));
                }
            };
            getData();
        }, [])
    );

    //key = string symbol: error in console bij dubbele favorites => opgelost door index van uw array waar ge over mapped te gebruiken
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Favorites</Text>

            {(favorites === undefined || favorites.myFavorites.length == 0) ? <Text style={styles.placeholder}>Zoek en voeg uw favoriete stocks toe</Text>
                : <View>                   
                    {favorites?.myFavorites.map((favorite,index) => (
                        <FavoritesTile stockid={favorite} key={index} />
                    ))}
                </View>
            }
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
    },
    placeholder: {
        marginTop: 30,
    }
});

export default HomeScreen;