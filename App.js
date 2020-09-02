import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import OpenSansBold from './assets/fonts/OpenSans-Bold.ttf';
import OpenSans from './assets/fonts/OpenSans-Regular.ttf';
import { GameOver } from "./screens/GameOver";
import { GameScreen } from "./screens/GameScreen";
import { StartGame } from "./screens/StartGame.screen";
import { Header } from './components/Header'

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });
};

export default function App() {
    const [ userNumber, setUserNumber ] = useState();
    const [ guessRounds, setGuessRounds ] = useState(0);
    const [ dataLoaded, setDataLoaded ] = useState(false);

    if (!dataLoaded) {
        return (
            <AppLoading
                startAsync={ fetchFonts }
                onFinish={ () => setDataLoaded(true) }
                onError={ (err) => console.error('[AppLoading] err: ', err) }
            />
        );
    }

    const configureNewGameHandler = () => {
        setGuessRounds(0);
        setUserNumber(null);
    };

    const startGameHandler = selectedNumber => {
        setUserNumber(selectedNumber);
    };

    const gameOverHandler = numOfRounds => {
        setGuessRounds(numOfRounds);
    };

    let content = <StartGame onStartGame={ startGameHandler }/>;

    if (userNumber && guessRounds <= 0) {
        content = (
            <GameScreen userChoice={ userNumber } onGameOver={ gameOverHandler }/>
        );
    } else if (guessRounds > 0) {
        content = (
            <GameOver
                roundsNumber={ guessRounds }
                userNumber={ userNumber }
                onRestart={ configureNewGameHandler }
            />
        );
    }

    return (
        <View style={ styles.screen }>
            <Header title="Guess a Number"/>
            { content }
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});
