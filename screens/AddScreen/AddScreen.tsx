import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { Portfolio, SearchResult, StockID } from "../../types";
import ResultTileAdd from "../../components/Search/ResultTileAdd";

//eerst StockID, prijs, en aantal selecteren (bijgehouden in state)
//setten van selectedStock (StockID) gebeurt door de set-functie door te geven naar de ResultTileAdd en bij longPress op een result
//currentAankooprijs wordt gefetched en getoond, maar uiteindelijke aankoopprijs wordt in selectedAankoopprijs gezet
//opt einde pas het gehele Portfolio-object wegschrijven naar Local Storage

const AddScreen = () => {

    const [selectedStock, setSelectedStock] = useState<StockID>();
    const [selectedAantal, setSelectedAantal] = useState<string>();
    const [selectedAankoopprijs, setSelectedAankoopprijs] = useState<string>();
    const [currentAankoopprijs, setCurrentAankoopprijs] = useState<string>();
    const [userInput, setUserInput] = useState<string>('')
    const [searchResult, setSearchResult] = useState<SearchResult>();

    const checkandSetAantal = (input: string) => {
        let toCheck: number = parseFloat(input.replace(",", "."))
        if (isNaN(toCheck)) {
            Alert.alert("This is not a number!");
        } else {
            setSelectedAantal(input)
        }
    }
    const checkandSetAankoopprijs = (input: string) => {

        let toCheck: number = parseFloat(input.replace(",", "."))
        if (isNaN(toCheck)) {
            Alert.alert("This is not a number!");
        } else {
            setSelectedAankoopprijs(input)
        }
    }

    const getSearch = async () => {

        let response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${userInput}&apikey=A7ESV77V11YJI2U0`);
        let result = await response.json();

        setSearchResult(result);
    }

    useEffect(() => {
        getSearch();
    }, [userInput]);

    const getStockPrice = async () => {

        if (selectedStock !== undefined) {
            let response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${selectedStock['1. symbol']}&apikey=A7ESV77V11YJI2U0`);
            let result = await response.json();

            setCurrentAankoopprijs(result['Global Quote']['05. price'])
        }
    }

    useEffect(() => {
        getStockPrice();
    }, [selectedStock]);

    let portfolio: Portfolio = { myPortfolio: [] }

    const getPortfolioData = async () => {

        let result = await AsyncStorage.getItem("storedportfolio");
        if (result !== null) {
            portfolio = JSON.parse(result);
        }
    };

    const storePortfolioItem = async () => {

        if (selectedStock !== undefined && selectedAankoopprijs !== undefined && selectedAantal !== undefined) {

            await getPortfolioData()

            portfolio.myPortfolio.push({ stockid: selectedStock, aantal: selectedAantal, aankoopprijs: selectedAankoopprijs })

            await AsyncStorage.setItem("storedportfolio", JSON.stringify(portfolio));

            Alert.alert("Selection added to portfolio")
        }
    };

    return (

        <View style={styles.container} >
            
            <Text style={{ fontSize: 18 }}>Search your stock:</Text>

            <View>
                <TextInput
                    style={{ height: 40, width: 315, borderColor: "gray", borderWidth: 1, marginLeft: 10 }}
                    placeholder="Enter name or symbol"
                    onSubmitEditing={(event) => setUserInput(event.nativeEvent.text)}
                />

                {searchResult === undefined || searchResult['Error Message'] ? null
                    : searchResult.bestMatches.length === 0 ? <Text style={{ marginLeft: 10, marginTop: 20 }}>No search result</Text>
                        : searchResult.bestMatches.slice(0, 1).map((el, index) => <ResultTileAdd item={el} key={index} onAddID={setSelectedStock} />)
                }
            </View>

            <Text style={{ fontSize: 18 }}>Add your number of shares:</Text>
            <TextInput
                style={{ height: 40, width: 315, borderColor: "gray", borderWidth: 1, marginLeft: 10 }}
                placeholder="Enter number of shares"
                keyboardType="decimal-pad"
                returnKeyType="done"
                onBlur={(event) => checkandSetAantal(event.nativeEvent.text)}
            />
            <Text style={{ fontSize: 18 }}>Add buying price:</Text>
            <TextInput
                style={{ height: 40, width: 315, borderColor: "gray", borderWidth: 1, marginLeft: 10 }}
                keyboardType="decimal-pad"
                returnKeyType="done"
                placeholder={selectedStock ? `Current price: ${selectedStock?.["1. symbol"]}: ${currentAankoopprijs?.toString()}` : ''}
                placeholderTextColor="#444444"
                onBlur={(event) => checkandSetAankoopprijs(event.nativeEvent.text)} 
            />

            {selectedStock ?
                <Text style={{ alignSelf: "flex-start", marginLeft: 30, marginTop: 10 }}>{`Stock ${selectedStock?.['1. symbol']} has been selected`}</Text> : null}

            {selectedAantal ?
                <Text style={{ alignSelf: "flex-start", marginLeft: 30, marginTop: 10 }}>{`${selectedAantal} shares have been selected`}</Text> : null}

            {selectedAankoopprijs ?
                <Text style={{ alignSelf: "flex-start", marginLeft: 30, marginTop: 10 }}>{`${selectedAankoopprijs} as buying price has been selected`}</Text> : null}

            {(selectedStock && selectedAankoopprijs && selectedAantal) ?

                <Pressable style={{
                    flexDirection: "column", flex: 1, justifyContent: 'space-between', maxHeight: 40,
                    marginTop: 20, marginLeft: 10, marginRight: 10,
                    backgroundColor: "#dedddc",
                    paddingVertical: 10, paddingHorizontal: 10
                }} onPress={storePortfolioItem}

                >
                    <Text>Save to portfolio</Text>
                </Pressable> : null
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        alignItems: "center",
    }
});

export default AddScreen;