import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { SearchResult, StockID } from "../../types";
import ResultTileAdd from "../../components/Search/ResultTileAdd";

//eerst StockID, prijs, en aantal selecteren (bijgehouden in state)
//setten van selectedStock (StockID) gebeurt door de set-functie door te geven naar de ResultTileAdd en bij longPress op een result
//currentAankooprijs wordt gefetched en getoond, maar uiteindelijke aankoopprijs wordt in selectedAankoopprijs gezet
//opt einde pas het gehele Portfolio-object wegschrijven naar Local Storage

const AddScreen = () => {

    const [selectedStock, setSelectedStock] = useState<StockID>();
    const [selectedAantal, setSelectedAantal] = useState<number>();
    const [selectedAankoopprijs, setSelectedAankoopprijs] = useState<string>();
    const [currentAankoopprijs, setCurrentAankoopprijs] = useState<string>();

    const [userInput, setUserInput] = useState<string>('')
    const [searchResult, setSearchResult] = useState<SearchResult>();

    const checkandSet = (input: string) => {
        input = input.replace(",", ".")
        setSelectedAankoopprijs(input)
    }
    const getSearch = async () => {

        let response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${userInput}&apikey=SU7DQ25CON952VSZ`);
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

    return (

        <View style={styles.container} >

            <Text>Input Fields</Text>
            <Text style={{ fontSize: 20 }}>Voeg uw aandeel toe:</Text>

            <View>

                <TextInput
                    style={{ height: 40, width: 315, borderColor: "gray", borderWidth: 1, marginLeft: 10 }}
                    placeholder="Geef naam of symbool in"
                    onSubmitEditing={(event) => setUserInput(event.nativeEvent.text)}
                />

                {searchResult === undefined || searchResult['Error Message'] ? null
                    : searchResult.bestMatches.length === 0 ? <Text style={{ marginLeft: 10, marginTop: 20 }}>Geen zoekresultaat</Text>
                        : searchResult.bestMatches.slice(0, 1).map((el, index) => <ResultTileAdd item={el} key={index} onAddID={setSelectedStock} />)
                }
            </View>

            <Text style={{ fontSize: 14 }}>Voeg uw aantal toe:</Text>
            <TextInput
                style={{ height: 40, width: 315, borderColor: "gray", borderWidth: 1, marginLeft: 10 }}
                placeholder="Geef aantal in"
                keyboardType="number-pad"
                returnKeyType="done"
                onSubmitEditing={(event) => setSelectedAantal(parseInt(event.nativeEvent.text))} //nog inputvalidatie voorzien
            />
            <Text style={{ fontSize: 14 }}>Voeg uw aankoopprijs toe:</Text>
            <TextInput
                style={{ height: 40, width: 315, borderColor: "gray", borderWidth: 1, marginLeft: 10 }}
                keyboardType="decimal-pad"
                returnKeyType="done"
                placeholder={selectedStock ? `Actuele prijs: ${selectedStock?.["1. symbol"]}: ${currentAankoopprijs?.toString()}` : ''}
                placeholderTextColor="#444444"
                onSubmitEditing={(event) => checkandSet(event.nativeEvent.text)} //nog verdere inputvalidatie voorzien
            />

            {selectedStock ?
                <Text style={{ alignSelf: "flex-start" }}>{`Aandeel ${selectedStock?.['1. symbol']} werd geselecteerd`}</Text> : null}

            {selectedAantal ? <Text style={{ alignSelf: "flex-start" }}>{`Aantal ${selectedAantal} werd geselecteerd`}</Text> : null}

            {selectedAankoopprijs ?
                <Text style={{ alignSelf: "flex-start" }}>{`Aankoopprijs ${selectedAankoopprijs} werd geselecteerd`}</Text> : null}

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