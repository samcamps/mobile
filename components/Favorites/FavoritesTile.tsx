import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FavoritesTileProps, StockData } from '../../types';
import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';

const FavoritesTile = ({ stockid, deleteFavorite }: FavoritesTileProps) => {

    const navigation: any = useNavigation();
    const [stockData, setStockData] = useState<StockData>();

    const getStockData = async () => {
        let response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockid['1. symbol']}&apikey=A7ESV77V11YJI2U0`);
        let result = await response.json();

        setStockData(result as StockData);
    }

    useEffect(() => {
        getStockData();
    }, []);

    return (
        <View style={styles.container}>

            <View style={styles.text}>
                <Text>{`Name: ${stockid['2. name']}`}</Text>
                <Text>{`Symbol: ${stockid['1. symbol']}`}</Text>
                <Text>{`Price: ${stockData?.['Global Quote']['05. price']} ${stockid['8. currency']}`}</Text>
                <Text>{`Latest trading day: ${stockData?.['Global Quote']['07. latest trading day']}`}</Text>
                <Pressable
                    style={styles.pressableYahoo}
                    onPress={() => {
                        navigation.navigate("Yahoo", { symbol: stockData?.['Global Quote']['01. symbol'] })
                    }}
                >
                    <Text>More info</Text>
                </Pressable>
            </View>

            <Pressable
                onPress={() => {
                    deleteFavorite(stockid);
                }}
            >
                <Feather name="x" size={25} color="#5A5A5A" />
            </Pressable>

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "90%",
        alignSelf: "center",
        borderRadius: 10,
        maxHeight: 170,
        marginTop: 15,
        backgroundColor: "#dedddc",
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    text: {
        flexDirection: "column",
        width: "90%",
    },
    pressableYahoo: {
        alignItems: "flex-start",
        marginTop: 10,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "#bdbcbb",
        borderRadius: 12,
        width: 83,
    },
    pressable: {
        display: "flex",
        flexDirection: "row",
        paddingTop: 5,
    }
});

export default FavoritesTile;