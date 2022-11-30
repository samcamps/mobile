import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

//add een portfolio-object

const AddScreen = () => {

    const clearAsyncStorage = async () => {
        AsyncStorage.clear();
    }
    clearAsyncStorage();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Portfolio</Text>
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

export default AddScreen;