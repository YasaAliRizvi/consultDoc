import React from 'react';
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {RadioButton} from 'react-native-paper';
import firebase from 'firebase';

const SignUpScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        email: '',
        password: '',
        first_name:'',
        last_name:'',
        confirm_password: '',
        check_fnameInputChange: false,
        check_lnameInputChange: false,
        check_emailInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        isValidEmail: true,
        isValidPassword: true
    });

    const [isDoctor, setChecked] = React.useState(false);

    const firstNameInputChange = (val) => {
        if( val.trim().length >= 3 ) {
            setData({
                ...data,
                first_name: val,
                check_fnameInputChange: true
            });
        } else {
            setData({
                ...data,
                first_name: val,
                check_fnameInputChange: false
            });
        }
    }

    const lastNameInputChange = (val) => {
        if( val.trim().length >= 3 ) {
            setData({
                ...data,
                last_name: val,
                check_lnameInputChange: true
            });
        } else {
            setData({
                ...data,
                last_name: val,
                check_lnameInputChange: false
            });
        }
    }

    const handleValidEmail = (val) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(String(val).toLowerCase())) {
            setData({
                ...data,
                email: val,
                check_emailInputChange: true,
                isValidEmail: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_emailInputChange: false,
                isValidEmail: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    const handleValidPassword = () => {
        if(data.password == data.confirm_password)
        {
            setData({
                ...data,
                isValidPassword: true
            });
        }
        else
        {
            setData({
                ...data,
                isValidPassword: false
            });
        }
        console.log("valid password check :"+data.isValidPassword)
    }

    signUp = (first_name, last_name, email, password) =>{
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            console.log(userCredential)
            var user = userCredential.user;
            if(userCredential.additionalUserInfo.isNewUser)
            {
                firebase.database()
                .ref('/users/'+user.uid)
                .set({
                    email: user.email,
                    first_name: first_name,
                    last_name: last_name,
                    created_at: Date.now(),
                    isDoctor: isDoctor
                })
                if(isDoctor)
                {
                    firebase.database()
                    .ref('/doctors/'+user.uid)
                    .set({
                        email: user.email,
                        first_name: first_name,
                        last_name: last_name,
                        created_at: Date.now()
                    })
                }
            }
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
    }

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#0b369c' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>

            <Text style={styles.text_footer}>First Name</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your First Name"
                    style={styles.textInput}
                    onChangeText={(val) => firstNameInputChange(val)}
                />
                {data.check_fnameInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>

            <Text style={[styles.text_footer, {marginTop: 20}]}>Last Name</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Last Name"
                    style={styles.textInput}
                    onChangeText={(val) => lastNameInputChange(val)}
                />
                {data.check_lnameInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
                
            <Text style={[styles.text_footer, {marginTop: 20}]}>Email</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="envelope-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Email"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleValidEmail(val)}
                />
                {(data.isValidEmail && data.check_emailInputChange) ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidEmail ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>Enter a valid Email address</Text>
            </Animatable.View>
            }

            <Text style={[styles.text_footer, {marginTop: 20}]}>Password </Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>

            <Text style={[styles.text_footer, {marginTop: 20}]}>Confirm Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Confirm Your Password"
                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                    onEndEditing={()=>handleValidPassword()}
                />
                <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
                >
                    {data.confirm_secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>

            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>Password and Confirm Password do not match!</Text>
            </Animatable.View>
            }

            <Text style={[styles.text_footer, {marginTop: 20}]}>Are you a Doctor?</Text>
            <View style={styles.action}>
                <RadioButton
                    value={true}
                    status={isDoctor ?'checked':'unchecked'}
                    onPress={() => setChecked(true)}
                    color = 'blue'
                />
                <Text style={[styles.text_footer, {marginRight: 30}]}>Yes</Text>
                <RadioButton
                    value={false}
                    status={!isDoctor ?'checked':'unchecked'}
                    onPress={() => setChecked(false)}
                    color = 'blue'
                />
                <Text style={styles.text_footer}>No</Text>
            </View>

            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    By signing up you agree to our
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                <Text style={styles.color_textPrivate}>{" "}and</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
            </View>

            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {signUp(data.first_name, data.last_name, data.email, data.password)}}
                >
                <LinearGradient
                    colors = {['#6b8fe2', '#0b44cc']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {color:'#fff'}]}>
                        Sign Up
                    </Text>
                </LinearGradient>
                </TouchableOpacity>

                {/* <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[styles.signIn, {
                        borderColor: '#0b369c',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#0b369c'
                    }]}>Sign In</Text>
                </TouchableOpacity> */}

                <TouchableOpacity onPress={()=>navigation.navigate("SignInScreen")}>
                    <Text style={{color: '#0b369c', marginTop:20, fontWeight:'bold', fontSize:15}}>
                        Already have an account? Sign in here!
                    </Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#0b369c'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 8.5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5, 
        alignItems: 'center'
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
  });
