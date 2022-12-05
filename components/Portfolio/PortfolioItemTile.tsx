import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from "react-native";
import { PortfolioItem } from '../../types';

interface PortfolioItemTileProps {
    portfolioItem: PortfolioItem;
}

const PortfolioItemTile = ({ portfolioItem }: PortfolioItemTileProps) => {

    //namen variabelen omzetten naar Engels?
    const [currentAankoopprijs, setCurrentAankoopprijs] = useState<string>();

    const getStockPrice = async () => {

        if (portfolioItem !== undefined) {
            let response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${portfolioItem.stockid['1. symbol']}&apikey=A7ESV77V11YJI2U0`);
            let result = await response.json();

            setCurrentAankoopprijs(result['Global Quote']['05. price'])
        }
    }

    useEffect(() => {
        getStockPrice();
    }, []);

    let marktwaarde: number = 0;
    if (currentAankoopprijs !== undefined) {
        marktwaarde = parseFloat(currentAankoopprijs) * parseFloat(portfolioItem.aantal);
    }
    let aankoopprijs: number = parseFloat(portfolioItem.aankoopprijs) * parseFloat(portfolioItem.aantal);
    let prestatie: number = marktwaarde - aankoopprijs;
    let prestatiePercentage: number = ((marktwaarde - aankoopprijs) / aankoopprijs) * 100;
    let symbol: string = "+";
    if (prestatiePercentage < 0) {
        symbol = "-";
    }
    let aantal: number = parseFloat(portfolioItem.aantal);

    return (
        <View style={styles.container}>
            <Text>{`${portfolioItem.stockid['2. name']} (${portfolioItem.stockid['1. symbol']})`}</Text>
            <Text>{`Marktwaarde: ${marktwaarde.toFixed(2)}`}</Text>
            <Text>{`Aankoopprijs: ${aankoopprijs.toFixed(2)}`}</Text>
            <Text>{`Prestatie: ${prestatie.toFixed(2)} (${symbol} ${prestatiePercentage.toFixed(2)})`}</Text>
            <Text>{`Aantal: ${aantal.toFixed(2)}`}</Text>
        </View>
    )
}

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
    },
});

export default PortfolioItemTile;