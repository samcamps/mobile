import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StockData } from './types';

export default function App() {
  const [stockData, setStockData] = useState<StockData>();

  useEffect(() => {
    getStockData();
  }, []);

  const getStockData = async () => {
    let response = await fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=GOOGL&apikey=A7ESV77V11YJI2U0');
    let result = await response.json();

    setStockData(result);
  }

  return (
    <View style={styles.container}>

      <Text style={{fontSize:30}}>Stock Shock !!!</Text>
      
      <Text>{`Symbool: ${stockData?.['Global Quote']['01. symbol']}`}</Text>
      <Text>{`Prijs: ${stockData?.['Global Quote']['05. price']}`}</Text>
      <Text>{`Datum: ${stockData?.['Global Quote']['07. latest trading day']}`}</Text>    
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
