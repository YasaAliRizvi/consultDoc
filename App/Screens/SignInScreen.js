import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import firebase from 'firebase';

WebBrowser.maybeCompleteAuthSession();

import { Snackbar, useTheme } from 'react-native-paper';
// import * as Google from 'expo-google-app-auth';
// import { AuthContext } from '../Components/context';
// import Users from '../model/users';

const SignInScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidEmail: true,
        isValidPassword: true,
    });

    const [visible, setVisible] = React.useState(false);
    const onDismissSnackBar = () => setVisible(false);

    const { colors } = useTheme();

    // const { signIn } = React.useContext(AuthContext);

    const textInputChange = (val) => {
        if( val.trim().length >= 4 ) 
        {
            setData({
                ...data,
                email: val,
                check_textInputChange: true,
                isValidEmail: true
            });
        } 
        else 
        {
            setData({
                ...data,
                email: val,
                check_textInputChange: false,
                isValidEmail: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidEmail = (val) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(String(val).toLowerCase())) {
            setData({
                ...data,
                isValidEmail: true
            });
        } else {
            setData({
                ...data,
                isValidEmail: false
            });
        }
    }

    // const loginHandle = (userName, password) => {

    //     const foundUser = Users.filter( item => {
    //         return userName == item.username && password == item.password;
    //     } );

    //     if ( data.username.length == 0 || data.password.length == 0 ) {
    //         Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
    //             {text: 'Okay'}
    //         ]);
    //         return;
    //     }

    //     if ( foundUser.length == 0 ) {
    //         Alert.alert('Invalid User!', 'Username or password is incorrect.', [
    //             {text: 'Okay'}
    //         ]);
    //         return;
    //     }
    //     signIn(foundUser);
    // }


    // signInWithGoogleAsync = async() => 
    // {
    //     try 
    //     {
    //         const result = await Google.logInAsync({
    //             behavior: 'web',
    //             androidClientId: '862636546828-eb4cu6vq9t9eoucuoic1f77tq6n93403.apps.googleusercontent.com',
    //             //   iosClientId: YOUR_CLIENT_ID_HERE,
    //             scopes: ['profile', 'email'],
    //         });

    //         if (result.type === 'success')
    //         {
    //             return result.accessToken;
    //         } 
    //         else 
    //         {
    //             return { cancelled: true };
    //         }
    //     } 
    //     catch (e) {
    //         return { error: true };
    //     }
    // }

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
        {
            clientId: '862636546828-d9714aiks62ci2bl65a7t1j495v73hlg.apps.googleusercontent.com',
        },);
      
    React.useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
        
            const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
            firebase.auth().signInWithCredential(credential).then((result) => {
                console.log('user signed in');
                console.log(result);
                if(result.additionalUserInfo.isNewUser)
                {
                    firebase.database()
                    .ref('/users/'+result.user.uid)
                    .set({
                        email: result.user.email,
                        profile_picture: result.additionalUserInfo.profile.picture,
                        locale: result.additionalUserInfo.profile.locale,
                        first_name: result.additionalUserInfo.profile.given_name,
                        last_name: result.additionalUserInfo.profile.family_name,
                        created_at: Date.now(),
                        isDoctor: false
                    })
                }
                else
                {
                    firebase.database()
                    .ref('/users/'+result.user.uid)
                    .update({
                        last_logged_in: Date.now()
                    })
                }
            })
            .catch((error) => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
            });
        }
    }, [response]);

    signInWithEmail = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log(userCredential);
            firebase.database()
            .ref('/users/'+user.uid)
            .update({
                last_logged_in: Date.now()
            })
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') 
            {
                alert('Wrong password.');
            } 
            else 
            {
                alert(errorMessage);
            }
        });
    }
      
    resetPassword = () => {
        // var actionCodeSettings = {
        //     url: 'https://consultdoc.page.link/?email=' + data.email,
        //     // iOS: {
        //     //   bundleId: 'com.example.ios'
        //     // },
        //     // android: {
        //     //   packageName: 'com.example.android',
        //     //   installApp: true,
        //     //   minimumVersion: '12'
        //     // },
        //     handleCodeInApp: false,
        //     // When multiple custom dynamic link domains are defined, specify which
        //     // one to use.
        //     dynamicLinkDomain: "consultdoc.page.link"
        //   };
          firebase.auth().sendPasswordResetEmail(data.email)
            .then(function() {
                setVisible(true);
            })
            .catch(function(error) {
              // Error occurred. Inspect error.code.
              console.log(error);
              alert(error.message);
            });
    }

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#0b369c' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Welcome!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>Email Id</Text>

            <View style={styles.action}>
                <FontAwesome 
                    name="envelope-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Email Id"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    onEndEditing={(e)=>handleValidEmail(e.nativeEvent.text)}
                />
                {data.check_textInputChange ? 
                <Animatable.View animation="fadeIn">
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
            

            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
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
            { data.isValidPassword ? null : 
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                </Animatable.View>
            }

            <TouchableOpacity onPress={() => resetPassword()}>
                <Text style={{color: '#0b369c', marginTop:15}}>Forgot password?</Text>
            </TouchableOpacity>

            <Snackbar 
                visible={visible}
                onDismiss={onDismissSnackBar}
                duration={1500}
            >
                Reset Password Email Sent!
            </Snackbar>

            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {signInWithEmail(data.email, data.password)}}
                >
                    <LinearGradient
                        // colors={['#08d4c4', '#01ab9d']}
                        colors = {['#6b8fe2', '#0b44cc']}
                        style={styles.signIn}
                    >
                        <Text style={[styles.textSign, {
                            color:'#fff'
                        }]}>Sign In</Text>
                    </LinearGradient>
                </TouchableOpacity>

                {/* <TouchableOpacity
                    onPress={() => navigation.navigate('SignUpScreen')}
                    style={[styles.signIn, {
                        borderColor: '#0b369c',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#0b369c'
                    }]}>Sign Up</Text>
                </TouchableOpacity> */}

                {/* <TouchableOpacity>
                    <Text style={{color: '#0b369c', marginTop:15, padding:10, fontSize:15, fontWeight:'bold'}}>
                        Forgot password?
                    </Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                    disabled = {!request}
                    onPress={() => promptAsync()}
                    style={[styles.signIn, {
                        alignItems: 'flex-start',
                        borderColor: '#0b369c',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <View style={{flexDirection: 'row', alignItems:'center', paddingLeft: 20}}>
                        <FontAwesome 
                            name="google"
                            color="#0b369c"
                            size={20}
                        />
                        <Text style={[styles.textSign, {
                            color: '#0b369c',
                            paddingLeft: 55
                        }]}>Sign In with Google</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>navigation.navigate("SignUpScreen")}>
                    <Text style={{color: '#0b369c', marginTop:20, fontWeight:'bold', fontSize:15}}>
                        Don't have an account? Sign Up!
                    </Text>
                </TouchableOpacity>

            </View>
        </Animatable.View>
      </View>
    );
};

export default SignInScreen;

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
        flex: 3,
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
        alignItems: 'center',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
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
    }
  });
