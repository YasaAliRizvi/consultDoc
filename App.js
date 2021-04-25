import * as React from 'react';
import { View, Text } from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './App/Screens/LoginScreen';
import UserProfile from './App/Screens/UserProfile';
import HomeScreen from './App/Screens/HomeScreen';
import DoctorSearch from './App/Screens/DoctorSearch';
import SymptomsScreen from './App/Screens/SymptomsScreen';
import MedicalRecords from './App/Screens/MedicalRecords';
import ViewAppointment from './App/Screens/ViewAppointment';

import DrawerContent from './App/Screens/DrawerContent';

const Drawer = createDrawerNavigator();

function App() {
  return (
    <PaperProvider>
       <NavigationContainer>
         <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props}/>}>
           <Drawer.Screen name="Home" component={HomeScreen} />
           <Drawer.Screen name="Login" component={LoginScreen} />
           <Drawer.Screen name="Profile" component={UserProfile} />
           <Drawer.Screen name="Summary" component={DoctorSearch} />
           <Drawer.Screen name="Consult A Doctor" component={SymptomsScreen} />
           <Drawer.Screen name="Upload Medical Records" component={MedicalRecords} />
           <Drawer.Screen name="View Appointments" component={ViewAppointment} />
         </Drawer.Navigator>
       </NavigationContainer>
    </PaperProvider>
    );
  }
  
  export default App;