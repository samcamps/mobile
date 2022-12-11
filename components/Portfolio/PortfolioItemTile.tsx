import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { PortfolioItemTileProps } from '../../types';

const PortfolioItemTile = ({ portfolioItem, addMarktwaarden, addAankoopwaarden }: PortfolioItemTileProps) => {

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
    let aankoopprijs: number = 0;
    let aantal: number = 0;
    let prestatie: number = 0;
    let prestatiePercentage: number = 0;
    let symbol: string = "";


    if (currentAankoopprijs !== undefined) {
        marktwaarde = parseFloat(currentAankoopprijs) * parseFloat(portfolioItem.aantal);

        aankoopprijs = parseFloat(portfolioItem.aankoopprijs) * parseFloat(portfolioItem.aantal);
        aantal = parseFloat(portfolioItem.aantal);

        prestatie = marktwaarde - aankoopprijs;
        prestatiePercentage = ((marktwaarde - aankoopprijs) / aankoopprijs) * 100;
        if (prestatiePercentage > 0) {
            symbol = "+";
        }
    }

    useEffect(() => {
        addMarktwaarden(marktwaarde);
        addAankoopwaarden(aankoopprijs);
    }, [marktwaarde, aankoopprijs]);
       

        return (
            <View style={styles.container}>
                <Text>{`${portfolioItem.stockid['2. name']} (${portfolioItem.stockid['1. symbol']})`}</Text>
                <Text>{`Marktwaarde: ${marktwaarde.toFixed(3)}`}</Text>
                <Text>{`Aankoopprijs: ${aankoopprijs.toFixed(3)}`}</Text>
                <Text>{`Prestatie: ${prestatie.toFixed(3)} (${symbol} ${prestatiePercentage.toFixed(3)}%)`}</Text>
                <Text>{`Aantal: ${aantal.toFixed(3)}`}</Text>
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