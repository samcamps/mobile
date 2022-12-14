import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Alert, ScrollView } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { CalculatedPortfolioItem, Portfolio, PortfolioItem, StockID } from "../../types";
import PortfolioItemTile from "../../components/Portfolio/PortfolioItemTile";
import PortfolioTotal from "../../components/Portfolio/PortfolioTotal";

const PortfolioScreen = () => {

    //Testing: haal onderstaande functie uit comment om AsyncStorage te wissen 

    // const clearAsyncStorage = async () => {
    //     AsyncStorage.clear();
    // }
    // clearAsyncStorage();

    const navigation: any = useNavigation();

    const [portfolio, setPortfolio] = useState<Portfolio>();
    const [currentAankoopprijs, setCurrentAankoopprijs] = useState<string>();
    const [marktwaarden, setMarktwaarden] = useState<number[]>([]);
    const [aankoopwaarden, setAankoopwaarden] = useState<number[]>([]);
    const [portfolioItemDeleted, setPortfolioItemDeleted] = useState<boolean>(false);
    let calculatedPortfolio: CalculatedPortfolioItem[] = [];
    // const [calculatedPortfolio, setCalculatedPortfolio] = useState<CalculatedPortfolioItem[]>([]);

    useFocusEffect(
        React.useCallback(() => {
            const getPortfolioData = async () => {
                let result = await AsyncStorage.getItem("storedportfolio");
                if (result !== null) {
                    setPortfolio(JSON.parse(result));
                }
            };
            getPortfolioData();
        }, [portfolioItemDeleted])
    );

    const getStockPrice = async (portfolioItem: PortfolioItem) => {

        if (portfolioItem !== undefined) {
            let response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${portfolioItem.stockid['1. symbol']}&apikey=A7ESV77V11YJI2U0`);
            let result = await response.json();

            setCurrentAankoopprijs(result['Global Quote']['05. price']);

            calculations(portfolioItem);
        }
    }

    const calculations = (portfolioItem: PortfolioItem) => {
        let marktwaarde: number = 0;
        let aankoopprijs: number = 0;
        let aantal: number = 0;
        let prestatie: number = 0;
        let prestatiePercentage: number = 0;

        if (currentAankoopprijs !== undefined) {
            marktwaarde = parseFloat(currentAankoopprijs) * parseFloat(portfolioItem.aantal);

            aankoopprijs = parseFloat(portfolioItem.aankoopprijs) * parseFloat(portfolioItem.aantal);
            aantal = parseFloat(portfolioItem.aantal);

            prestatie = marktwaarde - aankoopprijs;
            prestatiePercentage = ((marktwaarde - aankoopprijs) / aankoopprijs) * 100;

            let calculatedPortfolioItem: CalculatedPortfolioItem = {
                symbol: portfolioItem.stockid["1. symbol"],
                name: portfolioItem.stockid["2. name"],
                marktwaarde: marktwaarde,
                aankoopprijs: aankoopprijs,
                aantal: aantal,
                prestatie: prestatie,
                prestatiePercentage: prestatiePercentage
            }

            calculatedPortfolio.push(calculatedPortfolioItem);
            console.log(calculatedPortfolioItem);
        }
    }

    // portfolio?.myPortfolio.map((portfolioItem) => {
    //     getStockPrice(portfolioItem);
    // });

    const deletePortfolioItem = (symbol: string) => {
        const indexOfObject = portfolio?.myPortfolio.findIndex(item => item.stockid["1. symbol"] === symbol)
        console.log(indexOfObject);

        if (indexOfObject !== undefined && portfolio !== undefined) {
            portfolio?.myPortfolio.splice(indexOfObject, 1);
            setPortfolioItemDeleted(true);
            console.log(portfolio);
            setPortfolio(portfolio);
        }

        storeData();
        Alert.alert(`${symbol} removed from portfolio`);
    }

    const storeData = async () => {
        await AsyncStorage.setItem("storedportfolio", JSON.stringify(portfolio));
        setPortfolioItemDeleted(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Portfolio</Text>
            <Button title="Add stock" onPress={() => navigation.navigate("Add")} />
            <PortfolioTotal marktwaardenArray={marktwaarden} aankoopwaardenArray={aankoopwaarden}/>

            <ScrollView>
                {(calculatedPortfolio === undefined || calculatedPortfolio.length == 0) ? <Text style={styles.placeholder}>Build your portfolio by adding stocks</Text>
                    : <View>
                        {calculatedPortfolio.map((calculatedPortfolioItem, index) => (
                            <PortfolioItemTile calculatedPortfolioItem={calculatedPortfolioItem} deletePortfolioItem={deletePortfolioItem} key={index} />
                        ))}
                    </View>
                }
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        alignItems: "center",
    },
    title: {
        marginTop: 20,
        fontWeight: "bold",
    },
    placeholder: {
        paddingTop: 20,
    }
});

export default PortfolioScreen;