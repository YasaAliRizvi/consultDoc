import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Header, Button, Icon } from 'react-native-elements';
import firebase from 'firebase';
import Doctor from '../Components/Doctor';

function MyDoctors({navigation}) {
    const [appointRef, setAppoint] = useState(firebase.database().ref('/appointments/'));
    const [appointExists, setExists] = useState(false);
    useEffect(()=>{
        appointRef.once('value').then(function(snapshot){
            setExists(snapshot.exists())
        })
    })
    console.log(appointExists);
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
                centerComponent={{ text: 'MY DOCTORS', style: { color: '#fff' } }}
            />
            <View style={(!appointExists && styles.contentNil) || (appointExists && styles.content)}>
                {
                    !appointExists ?
                    <Text style={styles.centerText}>No favourite doctors yet!</Text>
                    :
                    <Doctor />
                }
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
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#c3e1e3'
    },
    contentNil: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c3e1e3'
    },
    centerText: {
        fontSize: 15,
        fontWeight : 'bold',
        fontStyle: 'italic'
    }, 
})
export default MyDoctors;