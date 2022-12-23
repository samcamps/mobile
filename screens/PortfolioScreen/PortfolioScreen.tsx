import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, Pressable } from "react-native";
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

            <View style={styles.header}>
                <Text style={styles.title}>Portfolio</Text>
                <Pressable
                    style={styles.pressable}
                    onPress={() => {
                        navigation.navigate("Add")
                    }}
                >
                    <Text style={styles.pressableText}>Add stock</Text>
                </Pressable>
            </View>

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
        backgroundColor: '#ededed',
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 25,
    },
    title: {
        marginTop: 20,
        fontSize: 20,
        color: "#424242",
        fontWeight: "bold",
        paddingLeft: 25,
    },
    pressable: {
        marginTop: 20,
        marginBottom: 20,
        height: 32,
        width: 100,
        borderRadius: 50,
        color: "white",
        backgroundColor: "#165578",
    },
    pressableText: {
        color: "white",
        alignSelf: "center",
        paddingTop: 7,
        fontSize: 15,
    },
    portfolioItemContainer: {
        borderTopColor: "darkgrey",
        borderTopWidth: 1,
    },
    placeholder: {
        alignSelf: "center",
        marginTop: 30,
    }
});

export default PortfolioScreen;