import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FavoritesTileProps } from '../../types';

const FavoritesTile = ({ symbol }: FavoritesTileProps) => {

    //GetQuote(): ophalen data per favorite

    return (

        <View style={styles.container}>
            <Pressable style={styles.pressable} >

                <Text>{`Symbol: ${symbol}`}</Text>

            </Pressable>
        </View>
    )
}

//CSS nog aanpassen
const styles = StyleSheet.create({
    container: {
    },
    pressable: {
        flexDirection: "column",
        flex: 1,
        maxHeight: 80,
        marginTop: 20,
        marginLeft: 30,
        marginRight: 30,
        width: 315,
        backgroundColor: "#dedddc",
        paddingVertical: 10,
        paddingHorizontal: 10
    }
});

export default FavoritesTile;