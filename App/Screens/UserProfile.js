import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import {Input, Button , CheckBox} from 'react-native-elements';

function UserProfile({navigation}) {
    const [check, setCheck] = useState(false);
    return (
        <View style={styles.loginContainer}>    
            <Input
                label='Name'
                placeholder='Enter your full name'
                inputContainerStyle={styles.inputStyle}
            />
            <Input 
                label="Date of Birth"
                placeholder="Password"
                inputContainerStyle={styles.inputStyle}
            />
            <Input 
                label="Date of Birth"
                placeholder="Date of Birth"
                inputContainerStyle={styles.inputStyle}
            />
            <Input 
                label="Address"
                placeholder="Address"
                inputContainerStyle={styles.inputStyle}
            />
            <Input 
                label="Contact Number"
                placeholder="Contact Number"
                inputContainerStyle={styles.inputStyle}
            />
            <CheckBox 
                title="I am a doctor"
                checked={check}
            />

            <Button buttonStyle={styles.button} title="Submit" />
        </View>
    );
}

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    inputStyle: {
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 2
    },

    button: {
      padding: 15,
      borderRadius: 20,
      borderColor: "blue",
      backgroundColor: "blue",
      height: 50,
      width: 300
    },

    text: {
      fontSize: 18,
      padding: 12,
      justifyContent: 'center'
    },
});
export default UserProfile;