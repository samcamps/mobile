import React from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//naar het portfoliscreen gaan cleared de local storage (voor testing)

const PortfolioScreen = () => {

    const clearAsyncStorage = async () => {
        AsyncStorage.clear();
    }
    clearAsyncStorage();

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Portfolio</Text>
        </View>
    );
}

export default PortfolioScreen;