import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import firebase from 'firebase';

function Appointment(props) {
    return (
        <TouchableNativeFeedback style={styles.doctor}>
            <View style={styles.doctorContent}>
                <Text style={styles.doctorName}>Yasa Ali Rizvi</Text>
            </View>
            <Text style={{fontWeight:'bold', marginLeft: 50}}>Time : 9:00 am - 12:00 pm</Text>
        </TouchableNativeFeedback>
    );
}

const styles=StyleSheet.create({
    doctor: {
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 5,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    doctorContent:{
        flexDirection: 'column',
        marginLeft : 10,
    },
    doctorInfo: {
        fontSize: 13,
        fontStyle: 'italic'
    },
    doctorName: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 2
    },
})

export default Appointment;