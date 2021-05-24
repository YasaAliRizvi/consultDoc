import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { Header, Icon} from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase';
import { Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

function ProfileScreen({navigation}) {
    const [data, setData] = React.useState({
        user: firebase.auth().currentUser,
        picture: null,
        picExists: false,
        first_name: '',
        last_name: '',
        email: '',
        age: '',
        address:'',
        contact:'',
        ageExists:false,
        addrExists:false,
        contactExists:false
    });
    const [userRef, setRef] = React.useState(firebase.database().ref('/users/'+data.user.uid));
    const [editable, toggleEdit] = React.useState(false);

    useEffect(()=>{
        userRef.once('value', function(snapshot){
            setData({
            ...data,
            picture: snapshot.child('profile_picture').val(),
            picExists: snapshot.child('profile_picture').exists(),
            first_name: snapshot.child('first_name').val(),
            last_name: snapshot.child('last_name').val(),
            email: snapshot.child('email').val(),
            age: snapshot.child('age').val(),
            address: snapshot.child('address').val(),
            contact: snapshot.child('contact').val(),
            ageExists: snapshot.child('age').exists(),
            addrExists: snapshot.child('address').exists(),
            contactExists: snapshot.child('contact').exists(),
        })
    });
})
    
    const uploadProfilePicture = (uri) => {
        userRef.update({
            profile_picture: uri
        })
    };

    const handleInputChange = (first, last, email, age, address, contact) => {
        console.log("update db");
        console.log(age);
        console.log(address);
        userRef.update({
            first_name: first,
            last_name: last,
            email: email,
            age: age,
            address: address,
            contact_no: contact
        })
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
            uploadProfilePicture(result.uri);
        }
    };

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
                centerComponent={{ text: 'PROFILE', style: { color: '#fff' } }}
            />

            <View style={styles.content}>
                <ScrollView>
                    <View style={{justifyContent:'center'}}>
                        {
                            data.picExists ?
                            (<Image source={{uri: data.picture}} style={styles.button}/>)
                            :
                            <TouchableOpacity style={styles.button} onPress={pickImage}>
                                <Icon name="camera-plus"  size={30} color="white" type="material-community"/>
                            </TouchableOpacity>
                        }
                    </View>

                    <View style={styles.action}>
                        <Text style={styles.text}>First Name</Text>
                        <TextInput 
                            placeholder="Your First Name"
                            style={styles.textInput}
                            value={data.first_name}
                            editable={editable}
                            onChangeText={(val)=> {
                                setData({
                                    ...data, 
                                    first_name: val
                                })
                            }}
                        />
                    </View>

                    <View style={styles.action}>
                        <Text style={styles.text}>Last Name</Text>
                        <TextInput 
                            placeholder="Your Last Name"
                            value={data.last_name}
                            editable={editable}
                            style={styles.textInput}
                            onChangeText={(val)=> {
                                setData({
                                    ...data, 
                                    last_name: val
                                })
                            }}
                        />
                    </View>

                    <View style={styles.action}>
                        <Text style={styles.text}>Email</Text>
                        <TextInput 
                            placeholder="Your Email Id"
                            value={data.email}
                            editable={editable}
                            style={styles.textInput}
                            onChangeText={(val)=> {
                                setData({
                                    ...data, 
                                    email: val
                                })
                            }}
                        />
                    </View>

                    <View style={styles.action}>
                        <Text style={styles.text}>Age</Text>
                        <TextInput 
                            placeholder="Your Age"
                            editable={editable}
                            style={styles.textInput}
                            keyboardType='numeric'
                            onChangeText={(val)=> {
                                console.log(val);
                                setData({
                                    ...data, 
                                    age: val
                                });
                                console.log(data.age);
                            }}
                        />
                    </View>

                    <View style={styles.action}>
                        <Text style={styles.text}>Address</Text>
                        <TextInput 
                            placeholder="Your Address"
                            editable={editable}
                            style={styles.textInput}
                            multiline
                            numberOfLines={4}
                            onChangeText={(val)=> {
                                setData({
                                    ...data, 
                                    address: val
                                })
                            }}
                        />
                    </View>

                    <View style={styles.action}>
                        <Text style={styles.text}>Contact Number</Text>
                        <TextInput 
                            placeholder="Your Contact Number"
                            editable={editable}
                            style={styles.textInput}
                            keyboardType='numeric'
                            onChangeText={(val)=> {
                                setData({
                                    ...data, 
                                    contact: val
                                });
                                console.log(data.contact)
                            }}
                        />
                    </View>
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.bottomButton} 
                        onPress={()=>{
                            toggleEdit(!editable);
                            handleInputChange(data.first_name, data.last_name, data.email, data.age, data.address, data.contact)
                        }}
                    >
                        {
                            !editable ?
                            <Icon name="edit"  size={30} color="white" type="material"/>
                            :
                            <Icon name="check"  size={30} color="white" type="material"/>
                        }
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    );
}

export default ProfileScreen;

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
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 20,
    },
    bottomButton: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:60,
        height:60,
        backgroundColor:'#00f',
        borderRadius:50,
    },
    button: {
        marginLeft: 140,
        marginTop: 20,
        marginBottom: 30,
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:90,
        height:90,
        backgroundColor:'#00f',
        borderRadius:50,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 50,
        color: '#05375a',
        paddingTop: 20,
        textAlign: 'right'
    },
    text: {
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#000',
        paddingBottom: 5, 
        alignItems: 'center',
    },
})