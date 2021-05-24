import firebase from 'firebase';
import React, { useState } from 'react';
import { View, StyleSheet, Text, Modal, Pressable} from 'react-native';
import { Header, ListItem, Button, Icon } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import { firebaseConfig } from '../../config';

function SlotScreen({navigation}) {
    const [user, setUser] = useState(firebase.auth().currentUser);
    const [userRef, setRef] = useState(firebase.database().ref('/users/'+user.uid));
    const [appointRef, setAppoint] = useState(firebase.database().ref('/appointments/'));
    const [modalVisible, setModalVisible] = useState(false);
    const [checked, setChecked] = useState('first');
    const [time, setTime] = useState('9:00 am - 12:00 pm');
    const bookAppointment = (time) => {
        appointRef.push().set({
            doctor:'Rajat Dikshit',
            userId: user.uid,
            time: time,
        })
    }
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
                centerComponent={{ text: 'SUMMARY', style: { color: '#fff' } }}
            />
            
            <View style={styles.content}>
                <Text style={styles.heading}>Select Time Slot for Consultation</Text>
                <View style={styles.priceList}>
                    <ListItem bottomDivider>
                        <View style={styles.listContent}>
                            <RadioButton
                                value='first'
                                status={checked === 'first'?'checked':'unchecked'}
                                onPress={() => {setChecked('first'); setTime('9:00 am - 12:00 pm')}}
                                color = 'blue'
                            />
                            <ListItem.Content style={{marginLeft: 8, marginRight: 8}}>
                                <View>
                                    <ListItem.Title>9:00 am - 12:00 pm</ListItem.Title>
                                </View>
                            </ListItem.Content>
                        </View>
                    </ListItem>
                    <ListItem bottomDivider>
                    <View style={styles.listContent}>
                            <RadioButton
                                value='second'
                                status={checked === 'second'?'checked':'unchecked'}
                                onPress={() => {setChecked('second'); setTime('12:00 pm - 3:00 pm')}}
                                color = 'blue'
                            />
                            <ListItem.Content style={{marginLeft: 8, marginRight: 8}}>
                                <View>
                                    <ListItem.Title>12:00 pm - 3:00 pm</ListItem.Title>
                                </View>
                            </ListItem.Content>
                        </View>
                    </ListItem>
                    <ListItem bottomDivider>
                        <View style={styles.listContent}>
                            <RadioButton
                                value='third'
                                status={checked === 'third'?'checked':'unchecked'}
                                onPress={() => {setChecked('third'); setTime('3:00 pm - 6:00 pm')}}
                                color='blue'
                            />
                            <ListItem.Content style={{marginLeft: 8, marginRight: 8}}>
                                <View>
                                    <ListItem.Title>3:00 pm - 6:00 pm</ListItem.Title>
                                </View>
                            </ListItem.Content>
                        </View>
                    </ListItem>
                </View>
                <View style={styles.bottomBar}>
                    <Button 
                        title="Book Appointment"
                        onPress={() => {setModalVisible(true); bookAppointment(time)}}
                    />
                </View>
                <View style={styles.centeredView}>
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={modalVisible}
                      onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                          <Icon 
                            name="check-circle" 
                            type="font-awesome-5" 
                            color="#0f0" 
                            size={50}
                            style={{marginBottom:10}}
                        />
                          <Text style={styles.modalText}>Appointment Confirmed!</Text>
                          <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {setModalVisible(!modalVisible); navigation.navigate('Home')}}
                          >
                            <Text style={styles.textStyle}>OK</Text>
                          </Pressable>
                        </View>
                      </View>
                    </Modal>
                    {/* <Pressable
                      style={[styles.button, styles.buttonOpen]}
                      onPress={() => setModalVisible(true)}
                    >
                      <Text style={styles.textStyle}>Show Modal</Text>
                    </Pressable> */}
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
        left: 0,
        top: 0,
    },
    content: {
        flex: 5,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "white",
        padding: 10,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20
    },
    priceList: {
        margin: 5,
        paddingBottom: 60,
        borderRadius: 10,
    },
    listContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: "center"
      }
});

export default SlotScreen;

