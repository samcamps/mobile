import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SearchResult } from '../../types';

const Search = () => {

    const [userInput, setUserInput] = useState<string>("tesla")
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