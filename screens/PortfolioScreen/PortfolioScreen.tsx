import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView, Alert } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { Portfolio, StockID } from "../../types";
import PortfolioItemTile from "../../components/Portfolio/PortfolioItemTile";


const PortfolioScreen = () => {

    //Testing: haal onderstaande functie uit comment om AsyncStorage te wissen 

    // const clearAsyncStorage = async () => {
    //     AsyncStorage.clear();
    // }
    // clearAsyncStorage();

    const navigation: any = useNavigation();

    const [portfolio, setPortfolio] = useState<Portfolio>();

    useFocusEffect(
        React.useCallback(() => {
            const getPortfolioData = async () => {
                let result = await AsyncStorage.getItem("storedportfolio");
                if (result !== null) {
                    setPortfolio(JSON.parse(result));
                }
            };
            getPortfolioData();
        }, [])
    );

    useEffect(() => {
        const storeData = async () => {
            try { await AsyncStorage.setItem("storedportfolio", JSON.stringify(portfolio)); }
            catch (error) { }
        };
        storeData();
    }, [portfolio]);


    const deletePortfolioItem = (deleteitem: StockID) => {

        let updatedmyPortfolio = portfolio?.myPortfolio.filter((el) => el.stockid["1. symbol"] !== deleteitem["1. symbol"])

        if (portfolio !== undefined && updatedmyPortfolio !== undefined) {

            setPortfolio({ myPortfolio: updatedmyPortfolio })
            Alert.alert(`${deleteitem["1. symbol"]} removed from portfolio`);
        }
    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Portfolio</Text>
            <Button title="Add stock" onPress={() => navigation.navigate("Add")} />

            <ScrollView>
                {(portfolio === undefined || portfolio.myPortfolio.length == 0) ? <Text style={styles.placeholder}>Build your portfolio by adding stocks</Text>
                    : <View>
                        {portfolio?.myPortfolio.map((portfolioItem, index) => {

                            return (<PortfolioItemTile portfolioItem={portfolioItem}
                                deletePortfolioItem={deletePortfolioItem} key={index} />)
                        })}
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