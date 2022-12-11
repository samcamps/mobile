import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { ResultTileAddProps } from '../../types';

const ResultTile = ({ item, onAddID }: ResultTileAddProps) => {

    return (

        <Pressable style={{
            flexDirection: "column", flex: 1, justifyContent: 'space-between', maxHeight: 80,
            marginTop: 20, marginLeft: 10, marginRight: 10,
            backgroundColor: "#dedddc",
            paddingVertical: 10, paddingHorizontal: 10

        }} delayLongPress={500}
            onLongPress={() => onAddID({ ['1. symbol']: item['1. symbol'], ["2. name"]: item['2. name'], ['8. currency']:item['8. currency'] })}
        >
            <Text>{`Name: ${item['2. name']}`}</Text>
            <Text>{`Symbol: ${item['1. symbol']}`}</Text>
            <Text>{`Currency: ${item['8. currency']}`}</Text>
            <Text>{`Region: ${item['4. region']}`}</Text>

        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ResultTile;