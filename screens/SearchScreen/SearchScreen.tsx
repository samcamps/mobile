import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SearchResult } from '../../types';
import ResultTile from '../../components/Search/ResultTile';

const SearchScreen = () => {

    const [userInput, setUserInput] = useState<string>('')
    const [searchResult, setSearchResult] = useState<SearchResult>();

    const getSearch = async () => {

        let response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${userInput}&apikey=A7ESV77V11YJI2U0`);
        let result = await response.json();

        setSearchResult(result);
    }

    useEffect(() => {
        getSearch();
    }, [userInput]);

    return (

        <View style={styles.container}>

            <TextInput
                style={styles.searchBar}
                placeholder="Search by name or symbol"
                placeholderTextColor="#5A5A5A"
                onSubmitEditing={(event) => setUserInput(event.nativeEvent.text)}
            />

            <View style={styles.resultContainer}>
                {searchResult === undefined || searchResult['Error Message'] ? null
                    : searchResult.bestMatches.length === 0 ? <Text style={styles.placeholder}>No search results</Text>
                        : searchResult.bestMatches.slice(0, 3).map((el, index) => <ResultTile item={el} key={index} />)
                }
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80,
        backgroundColor: '#fff',
    },
    searchBar: {
        height: 40,
        width: "90%",
        borderRadius: 10,
        borderColor: "lightgrey",
        borderWidth: 1,
        alignSelf: "center",
        paddingLeft: 15,
    },
    placeholder: {
        alignSelf: "center",
        marginTop: 20,
    },
    resultContainer: {
        paddingTop: 15,
    }
});

export default SearchScreen;