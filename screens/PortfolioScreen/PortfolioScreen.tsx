import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
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

    const navigation : any = useNavigation();

    const [portfolio, setPortfolio] = useState<Portfolio>();
    const [marktwaarden, setMarktwaarden] = useState<number[]>([]);    
    const [aankoopwaarden, setAankoopwaarden] = useState<number[]>([]);

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

    const addMarktwaarden = (marktwaarde: number): void => {
        setMarktwaarden([...marktwaarden, marktwaarde]);
    }

    const addAankoopwaarden = (aankoopwaarde: number): void => {
        setAankoopwaarden([...aankoopwaarden, aankoopwaarde]);
    }

    console.log(marktwaarden);
    console.log(aankoopwaarden);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Portfolio</Text>
            <Button title="Add stock" onPress={() => navigation.navigate("Add")}/>
            <PortfolioTotal marktwaardenArray={marktwaarden} aankoopwaardenArray={aankoopwaarden}/>

            {(portfolio === undefined || portfolio.myPortfolio.length == 0) ? <Text style={styles.placeholder}>U heeft nog geen portfolio samengesteld.</Text>
                : <View>                   
                    {portfolio?.myPortfolio.map((portfolioItem,index) => (
                        <PortfolioItemTile portfolioItem={portfolioItem} addMarktwaarden={addMarktwaarden} addAankoopwaarden={addAankoopwaarden} key={index} />
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