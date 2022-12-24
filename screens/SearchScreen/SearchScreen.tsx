import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SearchResult } from '../../types';
import ResultTile from '../../components/Search/ResultTile';
import Constants from "expo-constants";

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

            <View style={styles.header}>
                <Text style={styles.title}>Search</Text>
            </View>

            <View>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search by name or symbol"
                    placeholderTextColor="#5A5A5A"
                    onSubmitEditing={(event) => setUserInput(event.nativeEvent.text)}
                />
            </View>

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
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: '#ededed',
    },
    header: {
        borderBottomColor: "darkgrey",
        borderBottomWidth: 1,
    },
    title: {
        marginTop: 20,
        fontSize: 20,
        color: "#424242",
        fontWeight: "bold",
        marginLeft: 22,
        marginBottom: 28,
    },
    searchBar: {
        height: 40,
        width: "93%",
        borderRadius: 10,
        backgroundColor: "white",
        borderColor: "lightgrey",
        borderWidth: 1,
        alignSelf: "center",
        paddingLeft: 15,
        marginTop: 28,
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