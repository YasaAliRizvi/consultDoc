import React from 'react';
import { ImageBackground } from 'react-native';
import { View, StyleSheet, Text } from 'react-native';
import { Header, Button, Icon } from 'react-native-elements';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

function MedicalRecords({navigation}) {
    return (
        <View style={styles.container}>
            <Header style={styles.header}
                placement='left'
                leftComponent={
                    <Icon 
                        name="arrowleft" 
                        type="antdesign" color="#fff"
                        onPress={()=> navigation.goBack()} 
                    />}
                centerComponent={{ text: 'VIEW APPOINTMENTS', style: { color: '#fff' } }}
                rightComponent={{ icon: 'logout', color: '#fff' }}
            />
            <View style={styles.content}>
                    <Text style={styles.centerText}>No Appointments Here!</Text>
                    <View style={styles.button}>
                        <Button title="Book an Appointment" onPress={()=>navigation.navigate("Consult A Doctor")}/>
                    </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        position: 'absolute',
        margin: 0,
        left: 0,
        top: 0,
        alignItems: 'center'
    },
    content: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c3e1e3'
    },
    button: {
        margin: 20,
        borderRadius: 40
    },
    centerText: {
        fontSize: 15,
        fontWeight : 'bold',
        fontStyle: 'italic'
    }, 
    image: {
        flex: 1,
        width: 50,
        height: 100,
        resizeMode: "cover",
        justifyContent: "center"
    }
});

export default MedicalRecords;