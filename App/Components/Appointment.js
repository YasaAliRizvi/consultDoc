import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableNativeFeedback, TouchableOpacity} from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import call from 'react-native-phone-call';

function Appointment(props) {
    const args = {
        number: props.contact,
        prompt: true
    }
    
    return (
        <View style={styles.doctor} >
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly'}}
            >
                <View style={styles.doctorContent}>
                    <Text style={styles.doctorName}>Dr. {props.name}</Text>
                    <Text style={styles.doctorInfo}>
                        {`General Physician \n15 years experience`}
                    </Text>
                </View>
                <Text style={{
                    fontWeight:'bold', 
                    backgroundColor: '#00ff73',
                    padding: 10,
                    borderRadius: 10,
                    marginLeft: 50}}
                >
                    Time : {props.time}
                </Text>
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'}}
            >
                <Text style={{fontWeight:'bold'}}>Contact No.: {props.contact}</Text>
                <TouchableOpacity style={styles.button} onPress={()=>call(args).catch(console.error)}>
                    <Icon name="phone"  size={25} color="white" type="font-awesome"/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles=StyleSheet.create({
    doctor: {
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 5,
        padding: 15,
        
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
        fontSize: 18,
        fontWeight: 'bold',
        padding: 2
    },
    button: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:50,
        height:50,
        backgroundColor:'#00f',
        borderRadius:50,
    },
})

export default Appointment;