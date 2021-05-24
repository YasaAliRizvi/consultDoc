import * as React from 'react';
import {useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './App/Screens/HomeScreen';
import DoctorSearch from './App/Screens/DoctorSearch';
import SymptomsScreen from './App/Screens/SymptomsScreen';
import MedicalRecords from './App/Screens/MedicalRecords';
import ViewAppointment from './App/Screens/ViewAppointment';
import ProfileScreen from './App/Screens/ProfileScreen';
import RootStackScreen from './App/Screens/RootStackScreen';
import DrawerContent from './App/Navigation/DrawerContent';
import SlotScreen from './App/Screens/SlotScreen';
import MyDoctors from './App/Screens/MyDoctors';
import FAQScreen from './App/Screens/FAQScreen';

import firebase from 'firebase';
import { firebaseConfig } from './config';
if(!firebase.apps.length)
{
  firebase.initializeApp(firebaseConfig);
}

const Drawer = createDrawerNavigator();

function App() {

  [loginState, setLoginState] = useState(false);
  [loading, setLoading] = useState(true);

  useEffect(() => {
    checkIfLoggedIn();
  });

  checkIfLoggedIn = () =>{
    firebase.auth().onAuthStateChanged(
      function(user)
      {
        if(user)
        {
          setLoginState(true);
        }
        else
        {
          setLoginState(false);
        }
        setLoading(false);
      });
  }

  return (
    <PaperProvider>
        <NavigationContainer>
         {console.log(loginState)}
         {(loginState) ?
          <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props}/>} >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Summary" component={DoctorSearch} />
            <Drawer.Screen name="Consult A Doctor" component={SymptomsScreen} />
            <Drawer.Screen name="Upload Medical Records" component={MedicalRecords} />
            <Drawer.Screen name="View Appointments" component={ViewAppointment} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="Slot" component={SlotScreen} />
            <Drawer.Screen name="MyDoctors" component={MyDoctors} />
            <Drawer.Screen name="FAQs" component={FAQScreen} />       
          </Drawer.Navigator>
         :
         <RootStackScreen/>
        }
        </NavigationContainer>
    </PaperProvider>
    );
  }
  
  export default App;