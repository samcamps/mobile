import React, { useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import { FavoritesTileProps, StockData } from '../../types';
import { useNavigation } from "@react-navigation/native";

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

    console.log(stockData);

    return (
        <View style={styles.container}>
            <Text>{`Name: ${stockid['2. name']}`}</Text>
            <Text>{`Symbol: ${stockid['1. symbol']}`}</Text>
            <Text>{`Price: ${stockData?.['Global Quote']['05. price']} ${stockid['8. currency']}`}</Text>
            <Text>{`Latest trading day: ${stockData?.['Global Quote']['07. latest trading day']}`}</Text>
            <View>
                <Pressable
                    onPress={() => {
                        deleteFavorite(stockid);
                    }}
                >
                    <Text>Delete</Text>
                </Pressable>
            </View>

            <View style={{ alignItems: "flex-end" }}>
                <Button title="More info" onPress={() => navigation.navigate("Yahoo", { symbol: stockData?.['Global Quote']['01. symbol'] })} />
            </View>

        </View >
    )
}

//CSS nog aanpassen
const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        marginTop: 20,
        marginLeft: 30,
        marginRight: 30,
        width: 315,
        backgroundColor: "#dedddc",
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    }
});

export default FavoritesTile;