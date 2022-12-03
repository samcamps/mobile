import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import SearchScreen from "../SearchScreen/SearchScreen";
import ResultTile from "../../components/Search/ResultTile";
import { SearchResult, StockID } from "../../types";
import ResultTileAdd from "../../components/Search/ResultTileAdd";

//add een portfolio-object

const AddScreen = () => {

    const [selectedStock, setSelectedStock] = useState<StockID>();
    const [selectedAantal, setSelectedAantal] = useState<number>();
    const [selectedAankoopprijs, setSelectedAankoopprijs] = useState<number>();

    const [userInput, setUserInput] = useState<string>('')
    const [searchResult, setSearchResult] = useState<SearchResult>();

    

    const getSearch = async () => {

        let response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${userInput}&apikey=SU7DQ25CON952VSZ`);
        let result = await response.json();

        setSearchResult(result);
    }

    useEffect(() => {
        getSearch();
    }, [userInput]);

    return (


        <View style={styles.container} >

            <Text>Input Fields</Text>
            <Text>Voeg uw aandeel toe:</Text>

            <View style={{ flexDirection: "column", flex: 0.65, paddingTop: 80 }}>

                <TextInput
                    style={{ height: 40, width: 315, borderColor: "gray", borderWidth: 1, marginLeft: 30 }}
                    placeholder="Geef naam of symbool in"
                    onSubmitEditing={(event) => setUserInput(event.nativeEvent.text)}
                />

                {searchResult === undefined || searchResult['Error Message'] ? null
                    : searchResult.bestMatches.length === 0 ? <Text style={{ marginLeft: 30, marginTop: 20 }}>Geen zoekresultaat</Text>
                        : searchResult.bestMatches.slice(0, 1).map((el, index) => <ResultTileAdd item={el} key={index} onAddID={setSelectedStock} />)
                }
            </View>

            <Text>{`Aandeel ${selectedStock?.['1. symbol']} werd geselecteerd`}</Text>

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