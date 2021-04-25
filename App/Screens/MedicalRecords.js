import React from 'react';
import { ImageBackground } from 'react-native';
import { View, StyleSheet, Text } from 'react-native';
import { Header, FAB, Button, Icon} from 'react-native-elements';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
//import Icon from 'react-native-vector-icons/FontAwesome5';

function MedicalRecords({navigation}) {
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
                rightComponent={{ icon: 'logout', color: '#fff' }}
            />
            <View style={styles.content}>
                {/* <ImageBackground source={require('../assets/rxlogo.jpg' )} style={styles.image}> */}
                    <Text style={styles.centerText}>Click the button to add your Medical Records</Text>
                    <View style={styles.button}>
                        <Button icon={
                            <Icon 
                                name="plus" 
                                type="font-awesome"  
                                size={35} color="white"
                            />
                            }
                            raised
                            size="large"
                        />
                    </View>
                {/* </ImageBackground> */}
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c3e1e3'
    },
    button: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 20,
        borderRadius: 50,
    },
    centerText: {
        fontSize: 15,
        fontWeight : 'bold',
        fontStyle: 'italic'
    }, 
    image: {
        flex: 1,
        width: 50,
        height: 100,
        resizeMode: "cover",
        justifyContent: "center"
    }
});

export default MedicalRecords;