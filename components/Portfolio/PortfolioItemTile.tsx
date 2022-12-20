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

            <Text style={styles.company}>{`${portfolioItem.stockid['2. name']} (${portfolioItem.stockid['1. symbol']})`}</Text>
            <View style={styles.info}>
                <Text style={styles.title}>Number of stocks: </Text>
                <Text style={styles.value}>{parseFloat(portfolioItem.aantal).toFixed(3)}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.title}>Amount invested: </Text>
                <Text style={styles.value}>{aankoopprijs.toFixed(3)} {portfolioItem.stockid['8. currency']}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.title}>Current value: </Text>
                <Text style={styles.value}>{marktwaarde.toFixed(3)} {portfolioItem.stockid['8. currency']}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.title}>Performance: </Text>
                <Text style={styles.value}>
                    {prestatiePercentage > 0 ?
                        <View style={styles.performance}>
                            <Text style={{ color: "green" }}>{`${prestatie.toFixed(3)} ${portfolioItem.stockid['8. currency']}`}</Text>
                            <Text style={{ color: "green" }}>{`+${prestatiePercentage.toFixed(3)}%`}</Text>
                        </View>

                        : <View style={styles.performance}>
                            <Text style={{ color: "red" }}>{`${prestatie.toFixed(3)} ${portfolioItem.stockid['8. currency']}`}</Text>
                            <Text style={{ color: "red", }}>{`${prestatiePercentage.toFixed(3)}%`}</Text>
                        </View>}
                </Text>
            </View>

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
        width: "100%",
        alignSelf: "center",
        marginTop: 12,
        borderBottomColor: "darkgrey",
        borderBottomWidth: 1,
        paddingBottom: 12,

        paddingLeft: 20,
        paddingRight: 20,
    },
    company: {
        paddingBottom: 5,
    },
    info: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    title: {
    },
    value: {
    },
    performance: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end"
    },
    pressable: {
        alignItems: "center",
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "#bdbcbb",
        borderRadius: 15,
        width: 70,
    }
});

export default PortfolioItemTile;