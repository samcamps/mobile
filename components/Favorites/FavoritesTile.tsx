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

            <View style={styles.text}>
                <Text>{`${stockid['2. name']} (${stockid['1. symbol']})`}</Text>
                <Text>{`Price: ${stockData?.['Global Quote']['05. price']} ${stockid['8. currency']}`}</Text>
                <Text>{`Latest trading day: ${stockData?.['Global Quote']['07. latest trading day']}`}</Text>
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
        backgroundColor: "white",
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    text: {
        width: "85%",
        marginRight: 17,
    },
    pressableYahoo: {
        alignItems: "center",
        marginTop: 10,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "#165578",
        borderRadius: 6,
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