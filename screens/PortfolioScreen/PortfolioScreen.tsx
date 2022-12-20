import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView, Alert, Pressable } from "react-native";
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

            <Pressable
                    style={styles.pressable}
                    onPress={() => {
                        navigation.navigate("Add")
                    }}
                >
                    <Text style={styles.pressableText}>Add stock</Text>
                </Pressable>

            <ScrollView style={styles.portfolioItemContainer}>
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
    },
    title: {
        marginTop: 20,
        fontWeight: "bold",
        alignSelf: "center",
    },
    placeholder: {
        alignSelf: "center",
        marginTop: 30,
    },
    pressable: {
        marginTop: 20,
        marginBottom: 20,
        height: 40,
        width: "30%",
        borderRadius: 50,
        alignSelf: "center",
        color: "white",
        backgroundColor: "#3f75a2",
    },
    pressableText: {
        color: "white",
        alignSelf: "center",
        paddingTop: 10,
        fontSize: 16,
    },
    portfolioItemContainer: {
        borderTopColor: "darkgrey",
        borderTopWidth: 1,
    }
});

export default PortfolioScreen;