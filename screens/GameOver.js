import React from 'react';
import { Image, StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import success from '../assets/success.png';
import { BodyText } from "../components/BodyText";
import { MainButton } from "../components/MainButton";
import { TitleText } from "../components/TitleText";
import { COLORS } from "../constants/colors";

export const GameOver = (props) => {
    return (
        <ScrollView>
            <View style={ styles.screen }>
                <TitleText>The Game is Over</TitleText>

                <View style={ styles.imageContainer }>
                    <Image
                        source={ success }
                        style={ styles.image }
                        resizeMode={ 'cover' }
                    />
                </View>

                <View style={ styles.resultContainer }>
                    <BodyText style={ styles.resultText }>
                        Your phone needed { ' ' }

                        <Text style={ styles.highlight }>{ props.roundsNumber }</Text>

                        { ' ' } rounds to guess the number { ' ' }

                        <Text style={ styles.highlight }>{ props.userNumber }</Text>
                    </BodyText>
                </View>

                <MainButton onPress={ props.onRestart }>New Game</MainButton>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: (Dimensions.get('window').width * 0.7) / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30
    },
    image: {
        width: '100%',
        height: '100%',
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height / 60
    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20,
    },
    highlight: {
        color: COLORS.primary,
        fontFamily: 'open-sans-bold'
    }
});
