import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface PortfolioTotalProps {
    marktwaardenArray: number[],
    aankoopwaardenArray: number[],
}

const PortfolioTotal = ({ marktwaardenArray, aankoopwaardenArray }: PortfolioTotalProps) => {

    let marktwaardenSum: number = marktwaardenArray.reduce(
        (sum,element) => sum + element, 0
    );

    let aankoopwaardenSum: number = aankoopwaardenArray.reduce(
        (sum,element) => sum + element, 0
    );

    let prestatie: number = marktwaardenSum - aankoopwaardenSum;
    let prestatiePercentage: number = ((marktwaardenSum - aankoopwaardenSum) / aankoopwaardenSum) * 100;
    let symbol: string = "";
    if (prestatiePercentage > 0) {
        symbol = "+";
    }

    return (
        <View style={styles.container}>
            <Text>{`Totale marktwaarde: ${marktwaardenSum.toFixed(2)}`}</Text>
            <Text>{`Totale aankoopwaarde: ${aankoopwaardenSum.toFixed(2)}`}</Text>
            <Text>{`Prestatie: ${prestatie.toFixed(2)} (${symbol} ${prestatiePercentage.toFixed(2)}%)`}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderBottomColor: "darkgrey",
        borderBottomWidth: 1,
        paddingTop: 10,
        paddingLeft: 30,
        paddingBottom: 10
    },
});

export default PortfolioTotal;