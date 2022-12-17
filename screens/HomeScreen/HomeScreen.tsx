import React, { useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Pressable, Alert, ScrollView } from "react-native";
import { Favorites, StockID } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FavoritesTile from "../../components/Favorites/FavoritesTile";
import Constants from "expo-constants";

const HomeScreen = () => {

    const [favorites, setFavorites] = useState<Favorites>();
    const [favoriteDeleted, setFavoriteDeleted] = useState<boolean>(false);

    useFocusEffect(
        React.useCallback(() => {
            const getData = async () => {
                let result = await AsyncStorage.getItem("storedfavs");
                if (result !== null) {
                    setFavorites(JSON.parse(result));
                }
            };
            getData();
        }, [favoriteDeleted])
    );

    const deleteFavorite = (stockid: StockID) => {
        const indexOfObject = favorites?.myFavorites.findIndex(item => item["1. symbol"] === stockid["1. symbol"])

        if (indexOfObject !== undefined && favorites !== undefined) {
            let updatedarray = favorites?.myFavorites.splice(indexOfObject, 1);
            setFavoriteDeleted(true);
            setFavorites({ myFavorites: updatedarray });
        }

        storeData();
        Alert.alert(`${stockid['1. symbol']} removed from favorites`);
    }

    const storeData = async () => {
        await AsyncStorage.setItem("storedfavs", JSON.stringify(favorites));
        setFavoriteDeleted(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Favorites</Text>

            <ScrollView>
                {(favorites === undefined || favorites.myFavorites.length == 0) ? <Text style={styles.placeholder}>Search and add your favorite stocks</Text>
                    : <View>
                        {favorites?.myFavorites.map((favorite, index) => (
                            <FavoritesTile stockid={favorite} deleteFavorite={deleteFavorite} key={index} />
                        ))}
                    </View>
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        marginTop: 20,
        fontWeight: "bold",
        alignSelf: "center",
    },
    placeholder: {
        alignSelf: "center",
        marginTop: 30,
    }
});

export default HomeScreen;