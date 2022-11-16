import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StockData } from './types';

export default function App() {
  const [stockData, setStockData] = useState<StockData>();

  useEffect(() => {
    getStockData();
  }, []);

  const getStockData = async () => {
    let response = await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=demo');
    let result = await response.json();

    setStockData(result as StockData);
  }

  return (
    <View style={styles.container}>
      <Text>!!! SHOCK STOCK !!!</Text>    
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
