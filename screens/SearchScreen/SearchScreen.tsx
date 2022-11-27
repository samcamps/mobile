import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import ResultTile from '../../components/Search/ResultTile';
import { SearchResult } from '../../types';

const SearchScreen = () => {

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

        <View style={{ flexDirection: "column", flex: 0.65, paddingTop: 40 }}>

            <TextInput
                style={{ height: 40, width: 315, borderColor: "gray", borderWidth: 1, marginLeft: 30 }}
                placeholder="Geef naam of symbool in"
                onSubmitEditing={(event) => setUserInput(event.nativeEvent.text)}
            />

            {searchResult === undefined || searchResult['Error Message'] ? null
                : searchResult.bestMatches.length === 0 ? <Text style={{ marginLeft: 30, marginTop: 20 }}>Geen zoekresultaat</Text>
                    : searchResult.bestMatches.slice(0, 3).map((el, index) => <ResultTile item={el} key={index} />)

            }
        </View>
    )
}

export default SearchScreen;