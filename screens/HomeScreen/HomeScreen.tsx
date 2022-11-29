import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Favorites } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {

    const [favorites, setFavorites] = useState<Favorites>();

    useEffect(() => {
        const getData = async () => {
            let result = await AsyncStorage.getItem("storedfavs");
            if (result !== null) {
                setFavorites(JSON.parse(result))
            }
        };
        getData();
    }, []);

    console.log(favorites?.myFavorites);    

    //custom Tile component voorzien voor mapping data AsyncStorage
    //GetQuote(): ophalen data per favorite
    //key = string symbol: warning in console bij dubbele favorites
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Favorites</Text>
            {favorites?.myFavorites.map(favorite => (
                <Text key={favorite}>{favorite}</Text>
            ))}
        </View>
    );
}

export default HomeScreen;