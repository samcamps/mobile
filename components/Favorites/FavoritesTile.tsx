import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FavoritesTileProps, StockData } from '../../types';

const FavoritesTile = ({ stockid }: FavoritesTileProps) => {

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

    //returned TypeError indien limiet API calls bereikt is 
    return (
        <View style={styles.container}>
            <Pressable style={styles.pressable} >

                <Text>{`Bedrijf: ${stockid['2. name']}`}</Text>
                <Text>{`Symbool: ${stockid['1. symbol']}`}</Text>
                <Text>{`Prijs: ${stockData?.['Global Quote']['05. price']}`}</Text>
                <Text>{`Datum: ${stockData?.['Global Quote']['07. latest trading day']}`}</Text>
            </Pressable>
        </View>
    )
}

//CSS nog aanpassen
const styles = StyleSheet.create({
    container: {
    },
    pressable: {
        flexDirection: "column",
        flex: 1,
        maxHeight: 80,
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