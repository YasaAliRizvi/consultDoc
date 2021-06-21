import React, { useEffect, useState } from 'react';
import {Text, Image, StyleSheet, View} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import { ScrollView, TouchableNativeFeedback } from 'react-native-gesture-handler';
import {Card, Title, Paragraph} from 'react-native-paper';
import MedicalIcon from '../Components/MedicalIcon';
import firebase from 'firebase';

function HomeScreen({navigation}) {
    const [user, setUser] = useState(firebase.auth().currentUser);
    const [userRef, setRef] = useState(firebase.database().ref('/users/'+user.uid));
    const [isDoctor, checkDoctor] = useState(false);

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
                leftComponent={<Icon name="menu" color="#fff" onPress={()=> navigation.openDrawer()} />}
                centerComponent={{ text: 'HOME', style: { color: '#fff' } }}
                // rightComponent={{ icon: 'logout', color: '#fff' }}
                />
            <View style={styles.content}>
                <ScrollView>
                    <ScrollView horizontal style={styles.offer}>
                        <Image 
                            style={styles.image}
                            source={require('../assets/offer-1.png')}
                            />
                        <Image 
                            style={styles.image}
                            source={require('../assets/offer-2.png')}
                            />
                    </ScrollView>
                    <TouchableNativeFeedback onPress={()=>navigation.navigate('Consult A Doctor')}>
                        <Card style={styles.card}>
                            <Card.Cover source={require('../assets/doctor.jpeg')} />
                            <Card.Content>
                              <Title>Book an Appointment</Title>
                              <Paragraph>Make an appointment with a Doctor</Paragraph>
                            </Card.Content>
                        </Card>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={()=>navigation.navigate('Upload Medical Records')} >
                        <Card style={styles.card}>
                            <Card.Cover source={require('../assets/medrec.jpg')} />
                            <Card.Content>
                                <Title>Upload Medical Records</Title>
                                <Paragraph>Upload your medical prescriptions and past medical history</Paragraph>
                            </Card.Content>
                        </Card>
                    </TouchableNativeFeedback>
                    <View style={styles.disease}>
                        <Text style={styles.heading}>Not Feeling Too Well?</Text>
                        <Text style={styles.subtext}>Treat common symptoms instantly via video consultation</Text>
                        <View style={styles.symptomList}>
                            <MedicalIcon name="stethoscope" text="General Health Problems" link="Summary"/>
                            <MedicalIcon name="tooth" text="Dental Problems" link="Summary"/>
                            <MedicalIcon name="eye" text="Eye Problems" link="Summary"/>
                            <MedicalIcon name="heartbeat" text="Cardiac Problems" link="Summary"/>
                            <MedicalIcon name="lungs" text="Respiratory Problems" link="Summary"/>
                            <MedicalIcon name="brain" text="Neurological Problems" link="Summary"/>
                            <MedicalIcon name="bone" text="Orthopaedic Problems" link="Summary"/>
                            <MedicalIcon name="virus" text="Viral Infections" link="Summary"/>
                            <MedicalIcon name="baby" text="Pediatric Problems" link="Summary"/>
                            <MedicalIcon name="allergies" text="Allergies" link="Summary"/>
                            <MedicalIcon name="syringe" text="Immunizations" link="Summary"/>
                            <MedicalIcon name="tablets" text="Medicine Info" link="Summary"/>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
    }
    else
    {
        return(
            <View style={styles.container}>
            <Header style={styles.header}
                placement='left'
                leftComponent={<Icon name="menu" color="#fff" onPress={()=> navigation.openDrawer()} />}
                centerComponent={{ text: 'HOME', style: { color: '#fff' } }}
                // rightComponent={{ icon: 'logout', color: '#fff' }}
                />
            <View style={styles.content}>
                <ScrollView>
                    <ScrollView horizontal style={styles.offer}>
                        <Image 
                            style={styles.image}
                            source={require('../assets/offer-1.png')}
                            />
                        <Image 
                            style={styles.image}
                            source={require('../assets/offer-2.png')}
                            />
                    </ScrollView>
                    <TouchableNativeFeedback onPress={()=>navigation.navigate('View Appointments')}>
                        <Card style={styles.card}>
                            <Card.Cover source={require('../assets/doctor.jpeg')} />
                            <Card.Content>
                              <Title>View Appointment</Title>
                              <Paragraph>View your scheduled appointments</Paragraph>
                            </Card.Content>
                        </Card>
                    </TouchableNativeFeedback>
                </ScrollView>
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    offer: {
        backgroundColor: '#0b369c'
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
    },
    card: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        height: 280
    },
    image: {
        borderRadius: 5,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
        flex: 1,
        resizeMode: 'contain'
    },
    disease: {
        flex: 1,
        padding: 20,
        marginTop: 10,
        backgroundColor: '#0b369c'

    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    subtext: {
        fontSize: 15,
        color: 'white'
    },
    symptomList: {
        paddingTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    }
  });

export default HomeScreen;