import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { StockData } from "../../types";

//de localstorage bevat een key "storedfavs" met als value 1 Favorites-object.
//dit Favorites object heeft 1 property "myFavorites" wat bestaat uit een array van maximaal 5 lang met de Symbols als string
//een favoriet toevoegen of verwijderen betekent dus die array pushen of poppen
//voor elk Symbol moet een fetch gedaan worden om de actuele prijs/change/etc op te halen


const GetQuote = () => {

    const [stockData, setStockData] = useState<StockData>();

    const getStockData = async () => {
        let response = await fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=GOOGL&apikey=A7ESV77V11YJI2U0');
        let result = await response.json();

        setStockData(result as StockData);
    }

    useEffect(() => {
        getStockData();
    }, []);

    return (
        <View style={styles.container}>

            <Text style={{ fontSize: 30 }}>Stock Shock !!!</Text>

            <Text>{`Symbool: ${stockData?.['Global Quote']['01. symbol']}`}</Text>
            <Text>{`Prijs: ${stockData?.['Global Quote']['05. price']}`}</Text>
            <Text>{`Datum: ${stockData?.['Global Quote']['07. latest trading day']}`}</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default GetQuote;