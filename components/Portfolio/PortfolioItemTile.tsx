import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import { PortfolioItemTileProps } from '../../types';

const PortfolioItemTile = ({ portfolioItem, deletePortfolioItem }: PortfolioItemTileProps) => {

    // const [currentAankoopprijs, setCurrentAankoopprijs] = useState<string>();
    const [marktwaarde, setMarktwaarde] = useState<number>(0);
    const [aankoopprijs, setAankoopprijs] = useState<number>(0);
    const [prestatie, setPrestatie] = useState<number>(0);
    const [prestatiePercentage, setPrestatiePercentage] = useState<number>(0);


    let currentAankoopprijs: string = '';

    const getStockPrice = async () => {
        console.log('fire')
        if (portfolioItem !== undefined) {
            let response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${portfolioItem.stockid['1. symbol']}&apikey=A7ESV77V11YJI2U0`);
            let result = await response.json();

            currentAankoopprijs = result['Global Quote']['05. price']
            console.log(currentAankoopprijs)
            calculations()
            console.log("calc done")
        }
    }

    useEffect(() => {
        getStockPrice();
    }, [portfolioItem]);

    const calculations = () => {
        if (currentAankoopprijs !== undefined) {

            setMarktwaarde(parseFloat(currentAankoopprijs) * parseFloat(portfolioItem.aantal));
            setAankoopprijs(parseFloat(portfolioItem.aankoopprijs) * parseFloat(portfolioItem.aantal));
            setPrestatie((parseFloat(currentAankoopprijs) * parseFloat(portfolioItem.aantal)) - (parseFloat(portfolioItem.aankoopprijs) * parseFloat(portfolioItem.aantal)));
            setPrestatiePercentage(((parseFloat(currentAankoopprijs) * parseFloat(portfolioItem.aantal)) - (parseFloat(portfolioItem.aankoopprijs) * parseFloat(portfolioItem.aantal))) / (parseFloat(portfolioItem.aankoopprijs) * parseFloat(portfolioItem.aantal)) * 100);
        }
    }

    return (
        <View style={styles.container}>

            <Text>{`${portfolioItem.stockid['2. name']} (${portfolioItem.stockid['1. symbol']})`}</Text>
            <Text>{`Number of stocks: ${parseFloat(portfolioItem.aantal).toFixed(3)}`}</Text>
            <Text>{`Amount invested: ${aankoopprijs.toFixed(3)} ${portfolioItem.stockid['8. currency']}`}</Text>
            <Text>{`Current value: ${marktwaarde.toFixed(3)} ${portfolioItem.stockid['8. currency']}`}</Text>
            <Text>{prestatiePercentage > 0 ? `Performance: ${prestatie.toFixed(3)} ${portfolioItem.stockid['8. currency']} (+${prestatiePercentage.toFixed(3)}%)` : `Performance: ${prestatie.toFixed(3)} ${portfolioItem.stockid['8. currency']} (${prestatiePercentage.toFixed(3)}%)`}</Text>

            <Pressable
                style={styles.pressable}
                onPress={() => {

                    deletePortfolioItem(portfolioItem.stockid);
                }}
            >
                <Text>Delete</Text>
            </Pressable>

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
    pressable: {
        marginTop: 20,
    }
});

export default PortfolioItemTile;