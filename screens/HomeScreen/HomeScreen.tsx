import React, { useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Pressable, Alert, ScrollView } from "react-native";
import { Favorites, StockID } from "../../types";
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

    useEffect(() => {
        const storeData = async () => {
            try { await AsyncStorage.setItem("storedfavs", JSON.stringify(favorites)); }
            catch (error) { };
        }
        storeData();
    }, [favorites]);

    const deleteFavorite = (stockid: StockID) => {

        if (favorites !== undefined) {

            let updatedarray = favorites?.myFavorites.filter((el) => el["1. symbol"] !== stockid["1. symbol"])
            setFavorites({ myFavorites: updatedarray });
            Alert.alert(`${stockid['1. symbol']} removed from favorites`);
        }
    }

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
        backgroundColor: '#ededed',
    },
    title: {
        marginTop: 20,
        fontSize: 20,
        color: "#424242",
        fontWeight: "bold",
        paddingLeft: 25,
    },
    placeholder: {
        alignSelf: "center",
        marginTop: 30,
    }
});

export default HomeScreen;