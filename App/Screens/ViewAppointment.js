import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Header, Button, Icon } from 'react-native-elements';
import Appointment from '../Components/Appointment';
import DoctorAppointment from '../Components/DoctorAppointment';
import firebase from 'firebase';

function ViewAppointments({navigation}) {
    const [user, setUser] = useState(firebase.auth().currentUser);
    const [userRef, setRef] = useState(firebase.database().ref('/users/'+user.uid));
    const [appointRef, setAppoint] = useState(firebase.database().ref('/appointments/'));
    const [data, setData] = useState({
        appointExists:false,
        doctor:'',
        time:'',
        appointment:null,
    });
    const [isDoctor, checkDoctor] = useState(false);

    useEffect(()=>{
        appointRef.once('value').then(function(snapshot){
            if(snapshot.exists())
            {
                snapshot.forEach(function(childSnapshot){
                    data.appointment = childSnapshot.val(); 
                });
            }
            console.log(data.appointment);
            setData({
                ...data,
                appointExists: snapshot.exists(),
            })
        })
    })

    useEffect(()=>{
        userRef.once('value').then(function(snapshot){
            checkDoctor(snapshot.child('isDoctor').val())
        })
    })

    if(!isDoctor)
    {
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
                        />
            <View style={(!data.appointExists && styles.contentNil) || (data.appointExists && styles.content)}>
                {
                    !data.appointExists ?
                    <Text style={styles.centerText}>No Appointments Here!</Text>
                    :
                    <Appointment />
                }
            </View>
        </View>
    );
    }
    else
    {
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
                        />
            <View style={(!data.appointExists && styles.contentNil) || (data.appointExists && styles.content)}>
                {
                    !data.appointExists ?
                    <Text style={styles.centerText}>No Appointments Here!</Text>
                    :
                    <DoctorAppointment/>
                }
            </View>
        </View>
    );
    }
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
    contentNil: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c3e1e3'
    },
    content: {
        flex: 5,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
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

export default ViewAppointments;