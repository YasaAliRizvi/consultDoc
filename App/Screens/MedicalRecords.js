import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Header, FAB, Button, Icon} from 'react-native-elements';
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
//import Icon from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';
import { Image } from 'react-native';
import {BottomSheet, ListItem} from 'react-native-elements';
import ImageModal from 'react-native-image-modal';

function MedicalRecords({navigation}) {    
    const [data, setData] = React.useState({
        user: firebase.auth().currentUser,
        record: null,
        recordExists: false,
    });
    const [userRef, setRef] = useState(firebase.database().ref('/users/'+data.user.uid));
    const [isVisible, setIsVisible] = useState(false);
    const list = [
      { 
        title: 'Delete Record',
        onPress: () => deleteMedicalRecord(),
      },
      {
        title: 'Cancel',
        containerStyle: { backgroundColor: 'red' },
        titleStyle: { color: 'white' },
        onPress: () => setIsVisible(false),
      },
    ];
    userRef.once('value', function(snapshot){
        setData({
            ...data,
            record: snapshot.child('medical_record').val(),
            recordExists: snapshot.child('medical_record').exists()
        })
    });

    const uploadMedicalRecord = (uri) => {
        userRef.update({
            medical_record: uri
        })
    }

    const deleteMedicalRecord = () => {
        userRef.child('medical_record').remove();
        setIsVisible(false);
    }

    React.useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
    }, []);
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          quality: 1,
        });
    
        if (!result.cancelled) 
        {
        //   setImage(result.uri);
            setData({
                ...data,
                record: result.uri
            })
            console.log(result.uri);
            uploadMedicalRecord(result.uri);
        }
    };

    return (
        <View style={styles.container}>
            <Header style={styles.header}
                placement='left'
                leftComponent={
                    <Icon 
                        name="arrowleft" type="antdesign" color="#fff"
                        onPress={()=>navigation.goBack()} 
                    />}
                centerComponent={{ text: 'UPLOAD MEDICAL RECORDS', style: { color: '#fff' } }}
            />
            <View style={styles.content}>
                {
                    !data.recordExists ?
                    <Text style={styles.centerText}>Upload an image of your Medical Records</Text>
                    :
                    (
                        <View style={{
                            position:'absolute',
                            top: 5,
                            left: 10,
                            margin: 10}}
                        >
                        {/* <TouchableOpacity activeOpacity={.5} onLongPress={()=>setIsVisible(true)}>
                            <Image source={{ uri: data.record }} style={styles.image}/>
                        </TouchableOpacity> */}
                        <View>
                            <ImageModal
                                resizeMode="contain"
                                imageBackgroundColor="#000"
                                style={{
                                    width: 300,
                                    height: 300,
                                    borderRadius: 5
                                }}
                                source={{
                                    uri: data.record,
                                }}
                            />
                            <TouchableOpacity onPress={()=>setIsVisible(true)}>
                                <Icon name="cancel" size={35} color='red' />
                            </TouchableOpacity>
                        </View>
                        </View>
                    )
                }
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={pickImage}>
                        <Icon name="plus-a"  size={30} color="white" type="fontisto"/>
                    </TouchableOpacity>
                </View>
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
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 20,
    },
    button: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:60,
        height:60,
        backgroundColor:'#00f',
        borderRadius:50,
    },
    centerText: {
        fontSize: 15,
        fontWeight : 'bold',
        fontStyle: 'italic'
    }, 
    image: {
        width: 300,
        height: 300,
        resizeMode: 'center',
        // position: 'absolute',
        // top: 1,
        // left: 20,
        // margin: 10,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        // elevation: 7,
        }
});

export default MedicalRecords;