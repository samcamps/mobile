import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

//add een portfolio-object

const AddScreen = () => {

    return (
        <View style={styles.container}>
            <Text>Input Fields</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        flex: 1, 
        alignItems: "center",
    }
});

export default AddScreen;