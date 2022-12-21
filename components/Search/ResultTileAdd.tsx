import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ResultTileAddProps } from '../../types';

const ResultTile = ({ item, onAddID }: ResultTileAddProps) => {

    return (

        <View>
            <Pressable
                style={styles.pressable}
                onPress={() => onAddID({ ['1. symbol']: item['1. symbol'], ["2. name"]: item['2. name'], ['8. currency']: item['8. currency'] })}
            >
                <Text style={styles.callToAction}>Press and hold to choose this stock</Text>
                <Text>{`Name: ${item['2. name']}`}</Text>
                <Text>{`Symbol: ${item['1. symbol']}`}</Text>
                <Text>{`Currency: ${item['8. currency']}`}</Text>
                <Text>{`Region: ${item['4. region']}`}</Text>

            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    pressable: {
        flexDirection: "column",
        justifyContent: "flex-start",
        width: "90%",
        alignSelf: "center",
        borderRadius: 10,
        maxHeight: 120,
        backgroundColor: "#dedddc",
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginBottom: 30,
    },
    callToAction: {
        fontWeight: "bold",
        paddingBottom: 10,
    }
});

export default ResultTile;