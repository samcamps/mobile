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
    },[stockid]);

    return (
        <View style={styles.container}>

            <View style={styles.textContainer}>
                <Text style={styles.title}>{stockid['1. symbol']}</Text>
                <Text style={styles.text}>{stockid['2. name']}</Text>
                <Text style={styles.text}>{`Price: ${parseFloat(stockData?.['Global Quote']['05. price']!).toFixed(2)} ${stockid['8. currency']}`}</Text>
                <Text style={styles.text}>{`Latest trading day: ${stockData?.['Global Quote']['07. latest trading day']}`}</Text>
                <Pressable
                    style={styles.pressableYahoo}
                    onPress={() => {
                        navigation.navigate("Yahoo", { symbol: stockData?.['Global Quote']['01. symbol'] })
                    }}
                >
                    <Text style={styles.pressableYahooText}>More info</Text>
                </Pressable>
            </View>

            <Pressable
                onPress={() => {
                    deleteFavorite(stockid);
                }}
            >
                <Feather name="x" size={25} color="#7b7b7b" />
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "90%",
        alignSelf: "center",
        borderRadius: 10,
        maxHeight: 180,
        marginTop: 15,
        backgroundColor: "white",
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    textContainer: {
        width: "85%",
        marginRight: 17,
    },
    title: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#424242",
        paddingBottom: 7,
    },
    text: {
        lineHeight: 18,
    },
    pressableYahoo: {
        alignItems: "center",
        marginTop: 12,
        marginBottom: 2,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "#165578",
        borderRadius: 15,
        width: 83,
    },
    pressableYahooText: {
        color: "white",
    },
    pressable: {
        paddingTop: 5,
    }
});

export default FavoritesTile;