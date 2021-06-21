import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Header, Button, Icon } from 'react-native-elements';
import Appointment from '../Components/Appointment';
import DoctorAppointment from '../Components/DoctorAppointment';
import firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {BottomSheet, ListItem} from 'react-native-elements';

function ViewAppointments({navigation}) {
    const [user, setUser] = useState(firebase.auth().currentUser);
    const [userRef, setRef] = useState(firebase.database().ref('/users/'+user.uid));
    const [appointRef, setAppoint] = useState(firebase.database().ref('/appointments/'));
    const [data, setData] = useState({
        appointExists:false,
        // appointments: [],
        appointKey:''
    });
    const [isDoctor, checkDoctor] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const list = [
        { 
          title: 'Delete Appointment',
          onPress: () => deleteAppointment(),
        },
        {
          title: 'Cancel',
          containerStyle: { backgroundColor: 'red' },
          titleStyle: { color: 'white' },
          onPress: () => setIsVisible(false),
        },
      ];

    const deleteAppointment = () => {
        appointRef.limitToFirst(1).once('value').then(function(snapshot){
            snapshot.forEach(function(childSnapshot){
                setData({
                    ...data,
                    appointKey: childSnapshot.key
                })
            })
        })
        console.log(data.appointKey);
        var key = data.appointKey;
        appointRef.child(key).remove();
    }

    useEffect(()=>{
        appointRef.limitToFirst(1).once('value').then(function(snapshot){
            setData({
                ...data,
                appointExists: snapshot.exists(),
            });
        })
    })
    
    useEffect(()=>{
        userRef.once('value').then(function(snapshot){
            checkDoctor(snapshot.child('isDoctor').val())
        })
    })
    
    appointRef.once('value').then(function(snapshot){
        if(snapshot.exists())
        {
            // snapshot.forEach(function(childSnapshot){
            //     if(snapshot.numChildren() !== data.appointments.length)
            //         data.appointments.push(childSnapshot.val());
            // });
        }
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
                        (
                            <TouchableOpacity activeOpacity={.5} onLongPress={()=>setIsVisible(true)}>
                                <Appointment name='Rajat Dikshit' time='3:00 pm - 6:00 pm' contact='6388661058' />
                            </TouchableOpacity>
                        )
                    }
                </View>
                <BottomSheet
                  isVisible={isVisible}
                  containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
                >
                    {list.map((l, i) => (
                        <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
                        <ListItem.Content>
                          <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                        </ListItem.Content>
                      </ListItem>
                    ))}
                </BottomSheet>
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