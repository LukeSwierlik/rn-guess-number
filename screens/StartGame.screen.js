import React, { useState, useEffect } from 'react';
import { Alert, Button, Keyboard, StyleSheet, TouchableWithoutFeedback, View, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Card } from "../components/Card";
import { BodyText } from "../components/BodyText";
import { NumberWrapper } from "../components/NumberWrapper";
import { MainButton } from "../components/MainButton";
import { TitleText } from "../components/TitleText";
import { Input } from "../components/Input";
import { COLORS } from "../constants/colors";

export const StartGame = (props) => {
    const [ enteredValue, setEnteredValue ] = useState('');
    const [ confirmed, setConfirmed ] = useState(false);
    const [ selectedNumber, setSelectedNumber ] = useState(0);
    const [ buttonWidth, setButtonWidth ] = useState(Dimensions.get('window').width / 4);

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4);
        };

        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        }
    });

    const numberInputHandler = (inputText) => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);

        if (isNaN(chosenNumber) ||
            chosenNumber <= 0 ||
            chosenNumber > 99
        ) {
            Alert.alert(
                'Invalid number!',
                'Number has to be a number between 1 and 99.',
                [ {
                    text: 'Okay',
                    style: 'destructive',
                    onPress: resetInputHandler
                } ]
            );

            return;
        }

        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');

        Keyboard.dismiss();
    };

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = (
            <Card style={ styles.summaryContainer }>
                <BodyText>You selected</BodyText>

                <NumberWrapper>{ selectedNumber }</NumberWrapper>

                <MainButton
                    onPress={ () => props.onStartGame(selectedNumber) }
                >
                    Start Game
                </MainButton>
            </Card>
        )
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView
                behavior={'position'}
                keyboardVerticalOffset={30}
            >
                <TouchableWithoutFeedback
                    onPress={ () => {
                        Keyboard.dismiss();
                    } }
                >
                    <View style={ styles.screen }>
                        <TitleText style={ styles.title }>Start a New Game!</TitleText>

                        <Card style={ styles.inputContainer }>
                            <BodyText>Select a Number</BodyText>

                            <Input
                                style={ styles.input }
                                blurOnSubmit
                                autoCapitalize={ 'none' }
                                keyboardType={ 'number-pad' }
                                maxLength={ 2 }
                                onChangeText={ numberInputHandler }
                                value={ enteredValue }
                            />

                            <View style={ styles.buttonContainer }>
                                <View style={{ width: buttonWidth }}>
                                    <Button
                                        title={ 'Reset' }
                                        onPress={ resetInputHandler }
                                        color={ COLORS.secondary }
                                    />
                                </View>

                                <View style={{ width: buttonWidth }}>
                                    <Button
                                        title={ 'Confirm' }
                                        onPress={ confirmInputHandler }
                                        color={ COLORS.primary }
                                    />
                                </View>
                            </View>
                        </Card>

                        { confirmedOutput }
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold',
    },
    inputContainer: {
        width: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    input: {
        width: 50,
        textAlign: 'center',
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
});
