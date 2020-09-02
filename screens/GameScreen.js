import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { BodyText } from "../components/BodyText";
import { Card } from "../components/Card";
import { MainButton } from "../components/MainButton";
import { NumberWrapper } from "../components/NumberWrapper";
import DEFAULT_STYLES from "../constants/defaultStyles";
import { generateRandomBetween } from "../utils/utils";

const renderListItem = (listLength, itemData) => (
    <View style={ styles.listItem }>
        <BodyText>
            #{ listLength - itemData.index }
        </BodyText>

        <BodyText>{ itemData.item }</BodyText>
    </View>
);

export const GameScreen = ({ userChoice, onGameOver }) => {
    const initialGuess = generateRandomBetween(1, 100, userChoice);
    const [ currentGuess, setCurrentGuess ] = useState(initialGuess);
    const [ pastGuesses, setPastGuesses ] = useState([ initialGuess.toString() ]);
    const [ availableDeviceWidth, setAvailableDeviceWidth ] = useState(Dimensions.get('window').width);
    const [ availableDeviceHeight, setAvailableDeviceHeight ] = useState(Dimensions.get('window').height);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
        }

        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        }
    });

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [ currentGuess, userChoice, onGameOver ]);

    const nextGuessHandler = (direction) => {
        if (
            ( direction === 'lower' && currentGuess < userChoice ) ||
            ( direction === 'greater' && currentGuess > userChoice )
        ) {
            Alert.alert(
                'Don\'t lie!',
                'You know that this is wrong...',
                [ {
                    text: 'Sorry!',
                    style: 'cancel'
                } ]
            )

            return;
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);

        setCurrentGuess(nextNumber);
        setPastGuesses(curPastGuesses => [
            nextNumber.toString(),
            ...curPastGuesses
        ]);
    }

    let listContainerStyle = styles.listContainer;

    if (availableDeviceWidth < 350) {
        listContainerStyle = styles.listContainerBig;
    }

    if (availableDeviceHeight < 500) {
        return (
            <View style={ styles.screen }>
                <Text style={ DEFAULT_STYLES.title }>Opponent's Guess</Text>

                <View style={ styles.controls }>
                    <MainButton onPress={ nextGuessHandler.bind(this, 'lower') }>
                        <Ionicons name="md-remove" size={ 24 } color="white"/>
                    </MainButton>

                    <NumberWrapper>{ currentGuess }</NumberWrapper>

                    <MainButton onPress={ nextGuessHandler.bind(this, 'greater') }>
                        <Ionicons name="md-add" size={ 24 } color="white"/>
                    </MainButton>
                </View>

                <View style={ listContainerStyle }>
                    <FlatList
                        keyExtractor={ item => item }
                        data={ pastGuesses }
                        renderItem={ renderListItem.bind(this, pastGuesses.length) }
                        contentContainerStyle={ styles.list }
                    />
                </View>
            </View>
        );
    }

    return (
        <View style={ styles.screen }>
            <Text style={ DEFAULT_STYLES.title }>Opponent's Guess</Text>

            <NumberWrapper>{ currentGuess }</NumberWrapper>

            <Card style={ styles.buttonContainer }>
                <MainButton onPress={ () => nextGuessHandler('lower') }>
                    <Ionicons name={ 'md-remove' } size={ 24 } color={ 'white' }/>
                </MainButton>

                <MainButton onPress={ () => nextGuessHandler('greater') }>
                    <Ionicons name={ 'md-add' } size={ 24 } color={ 'white' }/>
                </MainButton>
            </Card>

            <View style={ styles.listContainer }>
                <FlatList
                    keyExtractor={ item => item }
                    data={ pastGuesses }
                    renderItem={ renderListItem.bind(this, pastGuesses.length) }
                    contentContainerStyle={ styles.list }
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 400,
        maxWidth: '90%',
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%'
    },
    listContainerBig: {
        flex: 1,
        width: '80%'
    },
    listContainer: {
        flex: 1,
        width: '60%',
    },
    list: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    }
});
