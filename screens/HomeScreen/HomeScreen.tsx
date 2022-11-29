import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Favorites } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FavoritesTile from "../../components/Favorites/FavoritesTile";

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

    //key = string symbol: warning in console bij dubbele favorites
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Favorites</Text>
            {favorites?.myFavorites.map(favorite => (
                // <Text key={favorite}>{favorite}</Text>
                <FavoritesTile symbol={favorite} key={favorite} />
            ))}
        </View>
    );
}

export default HomeScreen;