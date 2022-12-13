import React from 'react';
import { View, Text, StyleSheet, Pressable } from "react-native";
import { PortfolioItemTileProps } from '../../types';

const PortfolioItemTile = ({ calculatedPortfolioItem, deletePortfolioItem }: PortfolioItemTileProps) => {

    let symbol: string = "";
    if (calculatedPortfolioItem.prestatiePercentage > 0) {
        symbol = "+";
    }

    return (
        <View style={styles.container}>
            <View>
                <Text>{calculatedPortfolioItem.name} ({calculatedPortfolioItem.symbol})</Text>
                <Text>{`Marktwaarde: ${calculatedPortfolioItem.marktwaarde.toFixed(3)}`}</Text>
                <Text>{`Aankoopprijs: ${calculatedPortfolioItem.aankoopprijs.toFixed(3)}`}</Text>
                <Text>{`Prestatie: ${calculatedPortfolioItem.prestatie.toFixed(3)} (${symbol} ${calculatedPortfolioItem.prestatiePercentage.toFixed(3)}%)`}</Text>
                <Text>{`Aantal: ${calculatedPortfolioItem.aantal.toFixed(3)}`}</Text>
            </View>
            <View>
                <Pressable
                    onPress={() => {
                        deletePortfolioItem(calculatedPortfolioItem.symbol);
                    }}
                >
                    <Text>Delete</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        marginTop: 20,
        marginLeft: 30,
        marginRight: 30,
        width: 315,
        backgroundColor: "#dedddc",
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    },
});

export default PortfolioItemTile;