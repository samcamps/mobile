import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GlobalQuote, StockData } from './types';

export default function App() {
  const [stockData, setStockData] = useState<GlobalQuote>();

  useEffect(() => {
    getStockData();
  }, []);

  const getStockData = async () => {
    let response = await fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=A7ESV77V11YJI2U0');
    let result = await response.json();

    setStockData(result['Global Quote'] as GlobalQuote);
  }

  return (
    <View style={styles.container}>
      <Text style={{fontSize:30}}>Stock Shock !!!</Text>
      
      <Text>{`Symbool: ${stockData?.['01. symbol']}`}</Text>
      <Text>{`Prijs: ${stockData?.['05. price']}`}</Text>
      <Text>{`Datum: ${stockData?.['07. latest trading day']}`}</Text>    
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
