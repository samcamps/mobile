
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ResultTileProps } from '../../types';

const ResultTile = ({ item }: ResultTileProps) => {

    console.log(item);

    return (

        <Pressable style={{
            flexDirection: "column", flex: 1, justifyContent: 'space-between', maxHeight:80,
            marginTop: 20, marginLeft: 30, marginRight: 30,
            backgroundColor: "#dedddc",       
            paddingVertical:10, paddingHorizontal:10

        }}>

            <Text>{`Symbol: ${item['1. symbol']}`}</Text>
            <Text>{`Name: ${item['2. name']}`}</Text>
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