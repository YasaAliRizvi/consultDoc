import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import {Input, Button , Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

function LoginScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Header
                    leftComponent={{icon: 'menu', color: '#000'}}
                    centerComponent={{ text: 'LOGIN', style: { color: '#000' } }}
                    rightComponent={{ icon: 'home', color: '#000' }}
            />
            <View style={styles.loginContainer}> 
                <Input
                    label='Username'
                    placeholder='Username/E-Mail Id'
                    inputContainerStyle={styles.inputStyle}
                    leftIcon={{type:'font-awesome', name:'user'}}
                />
                <Input 
                    label="Password"
                    placeholder="Password"
                    inputContainerStyle={styles.inputStyle}
                    leftIcon={{type: 'font-awesome', name:'lock'}}
                    secureTextEntry={true}
                />
                <Button buttonStyle={styles.button} title="Login" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems : 'center',
        justifyContent: 'center'
    },

    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },

    inputStyle: {
        borderRadius: 10,
        width: 300,
        height: 50
    },

    button: {
      padding: 10,
      borderRadius: 20,
      backgroundColor: "blue",
      width: 200,
      height: 40,
      padding: 15
    },

    text: {
      fontSize: 18,
      padding: 12,
      justifyContent: 'center'
    },
});
export default LoginScreen;