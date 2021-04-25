import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import MedicalIcon from '../Components/MedicalIcon';

function SymptomsScreen({navigation}) {

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
                centerComponent={{ text: 'CONSULT A DOCTOR', style: { color: '#fff' } }}
                rightComponent={{ icon: 'logout', color: '#fff' }}
            />
            <View style={styles.content}>
                <ScrollView>
                    <View style={styles.disease}>
                        <Text style={styles.heading}>Not Feeling Too Well?</Text>
                        <Text style={styles.subtext}>Treat common symptoms instantly via video consultation</Text>
                        <View style={styles.symptomList}>
                            <MedicalIcon name="stethoscope" text="General Consultation" />
                            <MedicalIcon name="tooth" text="Dental Problems"/>
                            <MedicalIcon name="eye" text="Eye Problems"/>
                            <MedicalIcon name="heartbeat" text="Cardiac Problems"/>
                            <MedicalIcon name="lungs" text="Respiratory Problems"/>
                            <MedicalIcon name="brain" text="Neurological Problems"/>
                            <MedicalIcon name="bone" text="Orthopaedic Problems"/>
                            <MedicalIcon name="virus" text="Viral Infections"/>
                            <MedicalIcon name="baby" text="Pediatric Problems"/>
                            <MedicalIcon name="allergies" text="Allergies"/>
                            <MedicalIcon name="syringe" text="Immunizations" />
                            <MedicalIcon name="tablets" text="Medicine Info" />
                        </View>
                    </View>
                </ScrollView>
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
    },
    disease: {
        flex: 1,
        padding: 20,
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
        width: '100%',
        paddingTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0b369c'
    }
});

export default SymptomsScreen;