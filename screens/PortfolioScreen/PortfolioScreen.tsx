import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { Portfolio } from "../../types";

const PortfolioScreen = () => {

    //haal onderstaande functie uit comment om local storage te wissen (testing): 

    // const clearAsyncStorage = async () => {
    //     AsyncStorage.clear();
    // }
    // clearAsyncStorage();

    const navigation : any = useNavigation();

    const [portfolio, setPortfolio] = useState<Portfolio>();

    useFocusEffect(
        React.useCallback(() => {
            const getData = async () => {
                let result = await AsyncStorage.getItem("storedportfolio");
                if (result !== null) {
                    setPortfolio(JSON.parse(result));
                }
            };
            getData();
        }, [])
    );

    console.log(portfolio);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Portfolio</Text>
            <Button title="Add stock" onPress={() => navigation.navigate("Add")}/>
        </View>
    );
}

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

export default PortfolioScreen;