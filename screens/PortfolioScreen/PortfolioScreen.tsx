import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { Portfolio } from "../../types";
import PortfolioItemTile from "../../components/Portfolio/PortfolioItemTile";

const PortfolioScreen = () => {

    //haal onderstaande functie uit comment om AsyncStorage te wissen (testing): 

    // const clearAsyncStorage = async () => {
    //     AsyncStorage.clear();
    // }
    // clearAsyncStorage();

    const navigation : any = useNavigation();

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

    console.log(portfolio);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Portfolio</Text>
            <Button title="Add stock" onPress={() => navigation.navigate("Add")}/>

            {(portfolio === undefined || portfolio.myPortfolio.length == 0) ? <Text style={styles.placeholder}>U heeft nog geen portfolio samengesteld.</Text>
                : <View>                   
                    {portfolio?.myPortfolio.map((portfolioItem,index) => (
                        <PortfolioItemTile portfolioItem={portfolioItem} key={index} />
                    ))}
                </View>
            }
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

    }
});

export default PortfolioScreen;