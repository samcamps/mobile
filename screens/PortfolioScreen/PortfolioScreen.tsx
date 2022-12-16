import React, { useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView, Alert } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { Portfolio } from "../../types";
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
    const [marktwaarden, setMarktwaarden] = useState<number[]>([]);
    const [aankoopwaarden, setAankoopwaarden] = useState<number[]>([]);
    const [portfolioItemDeleted, setPortfolioItemDeleted] = useState<boolean>(false);

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

    const addMarktwaarden = (marktwaarde: number): void => {
        setMarktwaarden([...marktwaarden, marktwaarde]);
    }

    const addAankoopwaarden = (aankoopwaarde: number): void => {
        setAankoopwaarden([...aankoopwaarden, aankoopwaarde]);
    }

    console.log(marktwaarden);
    console.log(aankoopwaarden);

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
            <PortfolioTotal marktwaardenArray={marktwaarden} aankoopwaardenArray={aankoopwaarden} />

            <ScrollView>
                {(portfolio === undefined || portfolio.myPortfolio.length == 0) ? <Text style={styles.placeholder}>Build your portfolio by adding stocks</Text>
                    : <View>
                        {portfolio?.myPortfolio.map((portfolioItem, index) => (
                            <PortfolioItemTile portfolioItem={portfolioItem} addMarktwaarden={addMarktwaarden} addAankoopwaarden={addAankoopwaarden} deletePortfolioItem={deletePortfolioItem} key={index} />
                        ))}
                    </View>
                }
            </ScrollView>
        </View>
    );
}

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
        marginTop: 20,
    }
});

export default PortfolioScreen;