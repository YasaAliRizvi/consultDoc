import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer';
import {
    Avatar, Caption, Drawer, Text, Title, Paragraph, TouchableRipple, Switch
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import OctIcon from 'react-native-vector-icons/Octicons';
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase';
import { setStatusBarStyle } from 'expo-status-bar';

function DrawerContent(props) {
    // const user = firebase.auth().currentUser;
    // const userRef = firebase.database().ref('/users/'+user.uid);
    const [userName, setName] = useState('');
    const [userEmail, setEmail] = useState('');
    const [picCheck, setCheck] = useState(false);
    const [pictureUrl, setUrl] = useState('');

    const [user, setUser] = useState(firebase.auth().currentUser);
    const [userRef, setRef] = useState(firebase.database().ref('/users/'+user.uid));
    const [isDoctor, checkDoctor] = useState(false);

    useEffect(()=>{
        userRef.once('value').then(function(snapshot){
            checkDoctor(snapshot.child('isDoctor').val())
        })
    })

    userRef.once('value').then(function(snapshot){
        setName(`${snapshot.child('first_name').val()} ${snapshot.child('last_name').val()}`);
        setCheck(snapshot.child('profile_picture').exists());
        setUrl(snapshot.child('profile_picture').val());
        setEmail(snapshot.child('email').val());
    });

    if(!isDoctor)
    {
        return (
            <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <TouchableRipple 
                        style={styles.userInfoSection}
                        >
                        <View style={{flexDirection:'row', marginTop: 15, alignItems:'center'}}>
                            {
                                (picCheck) ?
                                <Avatar.Image 
                                size={50}
                                source={{uri: pictureUrl}}
                                />
                                :
                            <Avatar.Icon
                            icon="account"
                            size = {50}
                            />
                            }
                            <View style={{marginLeft: 15, flexDirection: 'column'}}>
                                <Title style={styles.title}>{userName}</Title>
                                <Caption style={styles.caption}>{userEmail}</Caption>
                            </View>
                            {/* <View style={{marginLeft: 15}}>
                                <Icon 
                                name='chevron-right'
                                size={20}
                                color='#b8c9c1'
                                />
                            </View> */}
                        </View>
                        {/* <View style={styles.row}>
                            <View style={styles.section}>
                            <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                            <Caption style={styles.caption}>Following</Caption>
                            </View>
                            <View style={styles.section}>
                            <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                            <Caption style={styles.caption}>Followers</Caption>
                            </View>
                        </View> */}
                    </TouchableRipple>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon = {({color, size}) => (
                                <Icon 
                                name='home' color={color} size={size}
                                />
                                )} 
                                label = "Home"
                                onPress = {() => {props.navigation.navigate('Home')}}
                                />
                        <DrawerItem 
                            icon = {({color, size}) => (
                                <Icon 
                                name='user-md' color={color} size={size}
                                />
                                )} 
                                label = "My Doctors"
                                onPress = {() => {props.navigation.navigate('MyDoctors')}}
                                />
                        <DrawerItem 
                            icon = {({color, size}) => (
                                <Icon 
                                name='list-alt' color={color} size={size}
                                />
                                )} 
                                label = "Appointments"
                                onPress = {() => {props.navigation.navigate('View Appointments')}}
                                />
                        <DrawerItem 
                            icon = {({color, size}) => (
                                <Icon 
                                name='prescription' color={color} size={size}
                                />
                                )} 
                                label = "Medical Records"
                                onPress = {() => {props.navigation.navigate('Upload Medical Records')}}
                                />
                        <DrawerItem 
                            icon = {({color, size}) => (
                                <Icon 
                                name='credit-card' color={color} size={size}
                                />
                                )} 
                                label = "Payment Plans"
                                onPress = {() => {props.navigation.navigate('Home')}}
                                />
                    </Drawer.Section>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon = {({color, size}) => (
                                <Icon 
                                name='user' color={color} size={size}
                                />
                                )} 
                                label = "Profile"
                                onPress = {() => {props.navigation.navigate('Profile')}}
                                />
                        <DrawerItem 
                            icon = {({color, size}) => (
                                <FAIcon 
                                name='gear' color={color} size={size}
                                />
                                )} 
                                label = "Settings"
                                onPress = {() => {}}
                                />
                        <DrawerItem 
                            icon = {({color, size}) => (
                                <Icon 
                                name='question-circle' color={color} size={size}
                                />
                                )} 
                                label = "FAQs"
                                onPress = {() => {props.navigation.navigate('FAQs')}}
                                />
                        {/* <TouchableRipple onPress={()=> toggleTheme()}>
                            <View style={styles.preference}>
                            <Text>Dark Theme</Text>
                            <View pointerEvents="none">
                            <Switch value={isDarkTheme}/>
                            </View>
                            </View>
                        </TouchableRipple> */}
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon = {({color, size}) => (
                        <OctIcon 
                        name='sign-out' color={color} size={size}
                        />
                        )} 
                        label = "Sign Out"
                        onPress = {() => firebase.auth().signOut()}
                        />
            </Drawer.Section>
        </View>
    );
    }
    else
    {
        return (
            <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <TouchableRipple 
                        style={styles.userInfoSection}
                        >
                        <View style={{flexDirection:'row', marginTop: 15, alignItems:'center'}}>
                            {
                                (picCheck) ?
                                <Avatar.Image 
                                size={50}
                                source={{uri: pictureUrl}}
                                />
                                :
                            <Avatar.Icon
                            icon="account"
                            size = {50}
                            />
                            }
                            <View style={{marginLeft: 15, flexDirection: 'column'}}>
                                <Title style={styles.title}>{userName}</Title>
                                <Caption style={styles.caption}>{userEmail}</Caption>
                            </View>
                        </View>
                    </TouchableRipple>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon = {({color, size}) => (
                                <Icon 
                                name='home' color={color} size={size}
                                />
                                )} 
                                label = "Home"
                                onPress = {() => {props.navigation.navigate('Home')}}
                                />
                        <DrawerItem 
                            icon = {({color, size}) => (
                                <Icon 
                                name='list-alt' color={color} size={size}
                                />
                                )} 
                                label = "Appointments"
                                onPress = {() => {props.navigation.navigate('View Appointments')}}
                                />
                        <DrawerItem 
                            icon = {({color, size}) => (
                                <Icon 
                                name='prescription' color={color} size={size}
                                />
                                )} 
                                label = "Medical Records"
                                onPress = {() => {props.navigation.navigate('Upload Medical Records')}}
                                />
                    </Drawer.Section>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon = {({color, size}) => (
                                <Icon 
                                name='user' color={color} size={size}
                                />
                                )} 
                                label = "Profile"
                                onPress = {() => {props.navigation.navigate('Profile')}}
                                />
                        <DrawerItem 
                            icon = {({color, size}) => (
                                <FAIcon 
                                name='gear' color={color} size={size}
                                />
                                )} 
                                label = "Settings"
                                onPress = {() => {}}
                                />
                        <DrawerItem 
                            icon = {({color, size}) => (
                                <Icon 
                                name='question-circle' color={color} size={size}
                                />
                                )} 
                                label = "FAQs"
                                onPress = {() => {}}
                                />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon = {({color, size}) => (
                        <OctIcon 
                        name='sign-out' color={color} size={size}
                        />
                        )} 
                        label = "Sign Out"
                        onPress = {() => firebase.auth().signOut()}
                        />
            </Drawer.Section>
        </View>
    );
    }
}

export default DrawerContent;

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
        paddingBottom: 15
    },
    title: {
      fontSize: 20,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
    //   fontWeight: 'bold',
      lineHeight: 14,
    //   color: '#1d84f2'

    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
      borderTopColor: '#c9eedc', 
      borderTopWidth: 10
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
})