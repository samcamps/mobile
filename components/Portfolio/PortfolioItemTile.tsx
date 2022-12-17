import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import { PortfolioItemTileProps } from '../../types';

const PortfolioItemTile = ({ portfolioItem, addMarktwaarden, addAankoopwaarden, deletePortfolioItem }: PortfolioItemTileProps) => {

    // const [currentAankoopprijs, setCurrentAankoopprijs] = useState<string>();
    const [marktwaarde, setMarktwaarde] = useState<number>(0);
    const [aankoopprijs, setAankoopprijs] = useState<number>(0);
    const [prestatie, setPrestatie] = useState<number>(0);
    const [prestatiePercentage, setPrestatiePercentage] = useState<number>(0);
    

    let currentAankoopprijs: string = '';

    const getStockPrice = async () => {

        

        if (portfolioItem !== undefined) {
            let response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${portfolioItem.stockid['1. symbol']}&apikey=A7ESV77V11YJI2U0`);
            let result = await response.json();

            currentAankoopprijs = result['Global Quote']['05. price']
            console.log(currentAankoopprijs)
            calculations()
            console.log("calc done")
        }
        
        console.log("klaar")
    }

    useEffect(() => {
        getStockPrice();
    }, [portfolioItem]);

    useEffect(() => {
        addMarktwaarden(marktwaarde);

    }, [marktwaarde]);

    useEffect(() => {
        addAankoopwaarden(aankoopprijs);

    }, [aankoopprijs]);


    let symbol: string = "";

    const calculations = () => {
        if (currentAankoopprijs !== undefined) {

            setMarktwaarde(parseFloat(currentAankoopprijs) * parseFloat(portfolioItem.aantal));
            setAankoopprijs(parseFloat(portfolioItem.aankoopprijs) * parseFloat(portfolioItem.aantal));
            setPrestatie((parseFloat(currentAankoopprijs) * parseFloat(portfolioItem.aantal)) - (parseFloat(portfolioItem.aankoopprijs) * parseFloat(portfolioItem.aantal)));
            setPrestatiePercentage(((parseFloat(currentAankoopprijs) * parseFloat(portfolioItem.aantal)) - (parseFloat(portfolioItem.aankoopprijs) * parseFloat(portfolioItem.aantal))) / parseFloat(portfolioItem.aankoopprijs) * 100);
        }
        if (((parseFloat(currentAankoopprijs) * parseFloat(portfolioItem.aantal)) - (parseFloat(portfolioItem.aankoopprijs) * parseFloat(portfolioItem.aantal))) > 0) {
            symbol = "+";
        }
    }

    return (
        <View style={styles.container}>
            <Text>{`${portfolioItem.stockid['2. name']} (${portfolioItem.stockid['1. symbol']})`}</Text>
            <Text>{`Marktwaarde: ${marktwaarde.toFixed(3)} ${portfolioItem.stockid['8. currency']}`}</Text>
            <Text>{`Aankoopprijs: ${aankoopprijs.toFixed(3)} ${portfolioItem.stockid['8. currency']}`}</Text>
            <Text>{`Prestatie: ${prestatie.toFixed(3)} ${portfolioItem.stockid['8. currency']} (${symbol} ${prestatiePercentage.toFixed(3)}%)`}</Text>
            <Text>{`Aantal: ${parseFloat(portfolioItem.aantal).toFixed(3)}`}</Text>

            <Pressable
                style={styles.pressable}
                onPress={() => {

                    deletePortfolioItem({ symbol: portfolioItem.stockid['1. symbol'], aankoopwaarde: (aankoopprijs * -1), marktwaarde: (marktwaarde * -1) });
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