import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { COLORS } from "../constants/colors";
import { TitleText } from "./TitleText";

export const Header = (props) => {
    return (
        <View style={ {
            ...styles.headerBase,
            ...Platform.select({
                ios: styles.headerIOS,
                android: styles.headerAndroid
            })
        } }>
            <TitleText style={ styles.title }>{ props.title }</TitleText>
        </View>
    );
};

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerIOS: {
        backgroundColor: 'white',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    headerAndroid: {
        backgroundColor: COLORS.primary
    },
    title: {
        color: Platform.OS === 'ios' ? COLORS.primary : 'white'
    }
});
