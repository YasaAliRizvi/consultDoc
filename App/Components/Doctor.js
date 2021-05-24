import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {Avatar, Rating} from 'react-native-elements';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

function Doctor(props) {
    return (
        <TouchableNativeFeedback style={styles.doctor}>
            <Avatar 
                rounded 
                size="medium" 
                title="RD" activeOpacity={1} overlayContainerStyle={{backgroundColor: "blue"}}
            />
            <View style={styles.doctorContent}>
                <Text style={styles.doctorName}>{`Dr. Rajat Dikshit`}</Text>
                <Text style={styles.doctorInfo}>
                    {`General Physician \n15 years experience`}
                </Text>
            </View>
            <Rating imageSize={15} readonly startingValue={4} style={{marginLeft:50}}/>
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
        justifyContent: 'flex-start'
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

export default Doctor;