import React from 'react';
import { Image, ImageBackground, StyleSheet, View , Text} from 'react-native';

function WelcomeScreen({navigation}) {
    return (
        <ImageBackground 
            style= {styles.background}
            source={require('../assets/background.jpg')}>
            
            <Text style={styles.logoText}>Online Doctor Consultation Platform </Text>
            <View style={styles.loginButton}>
                <Text style={styles.text}>Login </Text>
            </View>
            <View style={styles.registerButton}>
                <Text style={styles.text}>Register </Text>
            </View>
        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    loginButton: {
        width: "100%",
        height: 70,
        backgroundColor: "#fc5c65",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 20,
    },
    logo: {
        width: 100,
        height: 100,
    },
    logoText: {
        position: 'absolute',
        top: 380,
        fontSize: 20,
    },
    text: {
        fontSize: 15,
    },
    registerButton: {
        width: "100%",
        height: 70,
        backgroundColor: "#4ecdc4",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 20,
    }
})
export default WelcomeScreen;