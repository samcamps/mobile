import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";

//naar het portfoliscreen gaan cleared de local storage (voor testing)

const PortfolioScreen = () => {

    // const clearAsyncStorage = async () => {
    //     AsyncStorage.clear();
    // }
    // clearAsyncStorage();

    const navigation : any = useNavigation();

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