import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Search from './Search';
import { StockData } from './types';

const App = () => {

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
      <Search/>
      <StatusBar style="auto" />

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

export default App;
