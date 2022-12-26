import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Portfolio, SearchResult, StockID } from "../../types";
import ResultTileAdd from "../../components/Search/ResultTileAdd";

//eerst StockID, prijs, en aantal selecteren (bijgehouden in state)
//setten van selectedStock (StockID) gebeurt door de set-functie door te geven naar de ResultTileAdd en bij longPress op een result
//currentAankooprijs wordt gefetched en getoond, maar uiteindelijke aankoopprijs wordt in selectedAankoopprijs gezet
//aantal en aankoopprijs zijn onChange, pas wanneer ze uit focus (onBlur) gaan wordt de input gevalideerd en nogmaals geset
//opt einde pas het gehele Portfolio-object wegschrijven naar Local Storage en states worden gecleared

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
            Alert.alert("Please enter a valid number");
        } else {
            setSelectedAantal(toCheck.toString())
        }
    }

    const checkandSetAankoopprijs = (input: string) => {

        let toCheck: number = parseFloat(input.replace(",", "."))
        if (isNaN(toCheck)) {
            Alert.alert("Please enter a valid price");
        } else {
            setSelectedAankoopprijs(toCheck.toString())
        }
    }

    const getSearch = async () => {

        let response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${userInput}&apikey=A7ESV77V11YJI2U0`);
        let result = await response.json();

        setSearchResult(result);
    }


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

            let bestaatAl: number = portfolio.myPortfolio.findIndex((el) => el.stockid['1. symbol'] === selectedStock["1. symbol"]);

            if (bestaatAl === -1) {
                portfolio.myPortfolio.push({ stockid: selectedStock, aantal: selectedAantal, aankoopprijs: selectedAankoopprijs })
                Alert.alert("Selection added to portfolio")
            }

            else {

                //update het bestaande stock met nieuwe prijs en nieuwe aantal
                let newAantal: number = parseFloat(portfolio.myPortfolio[bestaatAl].aantal) + parseFloat(selectedAantal)
                let oldTotal: number = parseFloat(portfolio.myPortfolio[bestaatAl].aankoopprijs) * parseFloat(portfolio.myPortfolio[bestaatAl].aantal)
                let newTotal: number = parseFloat(selectedAankoopprijs) * parseFloat(selectedAantal)
                let newPrice: number = (oldTotal + newTotal) / newAantal

                portfolio.myPortfolio[bestaatAl] = {
                    ...portfolio.myPortfolio[bestaatAl],
                    aantal: newAantal.toString(),
                    aankoopprijs: newPrice.toString()
                }
                Alert.alert(`Stock ${portfolio.myPortfolio[bestaatAl].stockid["1. symbol"]} has been updated`)
            }

            await AsyncStorage.setItem("storedportfolio", JSON.stringify(portfolio));

            //cleared alle states na adding item
            setSelectedAantal("")
            setSelectedAankoopprijs("")
            setUserInput("")
            setSelectedStock(undefined)
            setSearchResult(undefined)
        }
    };

    return (

        <View style={styles.container} >

            <Text style={styles.label}>Search the stock</Text>
            <View>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter name or symbol"
                    placeholderTextColor="#5A5A5A"
                    value={userInput}
                    onChangeText={(el) => setUserInput(el)}
                    onSubmitEditing={() => getSearch()}
                />

                {searchResult === undefined || searchResult['Error Message'] ? null
                    : searchResult.bestMatches.length === 0 ? <Text style={styles.placeholder}>No search result</Text>
                        : searchResult.bestMatches.slice(0, 1).map((el, index) => <ResultTileAdd item={el} key={index} onAddID={setSelectedStock} />)
                }
            </View>

            <Text style={styles.label}>Add the number of shares</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Enter number of shares"
                placeholderTextColor="#5A5A5A"
                keyboardType="decimal-pad"
                returnKeyType="done"
                onChangeText={(el) => setSelectedAantal(el)}
                onBlur={(event) => checkandSetAantal(event.nativeEvent.text)}
                value={selectedAantal}
            />
            <Text style={styles.label}>Add the buying price</Text>
            <TextInput
                style={styles.textInput}
                keyboardType="decimal-pad"
                returnKeyType="done"
                placeholder={selectedStock ? `Current price ${selectedStock?.["1. symbol"]}: ${currentAankoopprijs?.toString()} ${selectedStock["8. currency"]}` : ''}
                placeholderTextColor="#5A5A5A"
                onChangeText={(el) => setSelectedAankoopprijs(el)}
                onBlur={(event) => checkandSetAankoopprijs(event.nativeEvent.text)}
                value={selectedAankoopprijs}
            />

            <View style={styles.confirmationContainer}>
                {selectedStock ?
                    <Text style={styles.confirmationText}>{`Stock ${selectedStock?.['1. symbol']} has been selected`}</Text> : null}

                {selectedAantal ?
                    <Text style={styles.confirmationText}>{`${selectedAantal} shares have been selected`}</Text> : null}

                {selectedAankoopprijs ?
                    <Text style={styles.confirmationText}>{`${selectedAankoopprijs} ${selectedStock?.["8. currency"]} as buying price has been selected`}</Text> : null}

                {(selectedStock && selectedAankoopprijs && selectedAantal) ?

                    <Pressable
                        style={styles.pressable}
                        onPress={storePortfolioItem}
                    >
                        <Text style={styles.pressableText}>Save to portfolio</Text>
                    </Pressable> : null
                }
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        flex: 1,
        backgroundColor: '#ededed',
    },
    label: {
        marginLeft: 22,
        marginBottom: 7,
    },
    textInput: {
        height: 40,
        width: "93%",
        borderRadius: 10,
        backgroundColor: "white",
        borderColor: "lightgrey",
        borderWidth: 1,
        alignSelf: "center",
        paddingLeft: 15,
        marginBottom: 15,
    },
    placeholder: {
        alignSelf: "center",
        marginBottom: 20,
    },
    confirmationContainer: {
        marginTop: 10,
    },
    confirmationText: {
        alignSelf: "flex-start",
        marginLeft: 25,
        marginBottom: 7,
    },
    pressable: {
        display: "flex",
        justifyContent: "center",
        marginTop: 20,
        height: 45,
        width: "45%",
        borderRadius: 50,
        alignSelf: "center",
        backgroundColor: "#165578",
    },
    pressableText: {
        color: "white",
        alignSelf: "center",
        fontSize: 16,
    }
});

export default AddScreen;