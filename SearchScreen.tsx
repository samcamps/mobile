import React from "react";
import { View, Text } from "react-native";
import Search from "./Search";

const SearchScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Search</Text>
            <Search />
        </View>
    );
}

export default SearchScreen;