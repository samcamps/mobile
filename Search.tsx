import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { SearchResult, StockData } from './types';

const Search = () => {
console.log("laad search component")
    const [userInput, setUserInput] = useState<string>("roekoekoe")
    const [searchResult, setSearchResult] = useState<SearchResult>();

    const getSearch = async () => {
        let response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${userInput}&apikey=A7ESV77V11YJI2U0`);
        let result = await response.json();

        console.log(JSON.stringify(result))
        setSearchResult(result);
       
    }

    useEffect(() => {
        getSearch();
    }, [userInput]);


    return (

        <View>

            <View style={{ flexDirection: "column", flex: 0.5 }}>
                <TextInput
                    style={{ height: 40, width: 300, borderColor: "gray", borderWidth: 1 }}
                    onSubmitEditing={(event) => setUserInput(event.nativeEvent.text)}
                />

                <Text>{`Symbol: ${searchResult?.bestMatches[0]?.['1. symbol']}`}</Text>
                <Text>{`Name: ${searchResult?.bestMatches[0]?.['2. name']}`}</Text>
                <Text>{`Region: ${searchResult?.bestMatches[0]?.['4. region']}`}</Text>

                <Text>{`Symbol: ${searchResult?.bestMatches[1]?.['1. symbol']}`}</Text>
                <Text>{`Name: ${searchResult?.bestMatches[1]?.['2. name']}`}</Text>
                <Text>{`Region: ${searchResult?.bestMatches[1]?.['4. region']}`}</Text>

                <Text>{`Symbol: ${searchResult?.bestMatches[2]?.['1. symbol']}`}</Text>
                <Text>{`Name: ${searchResult?.bestMatches[2]?.['2. name']}`}</Text>
                <Text>{`Region: ${searchResult?.bestMatches[2]?.['4. region']}`}</Text>
            </View>

        </View>



    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Search;