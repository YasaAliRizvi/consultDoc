import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { ScrollView, TouchableNativeFeedback } from 'react-native-gesture-handler';
import { Avatar, Rating, Header, ListItem, Button, Divider, Icon } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';

function FAQScreen({navigation}) {

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
                centerComponent={{ text: 'FAQs', style: { color: '#fff' } }}
                // rightComponent={{ icon: 'logout', color: '#fff' }}
            />

            <View style={styles.content}>
                    <Text style={styles.heading}>Frequently Asked Questions</Text>
                    <Divider/>

                <ScrollView>
                    <View style={styles.priceList}>
                        <ListItem bottomDivider>
                            <View style={styles.listContent}>
                                <ListItem.Content style={{marginLeft: 8, marginRight: 8}}>
                                    <View>
                                        <ListItem.Title style={styles.ques}>How do I edit my profile?</ListItem.Title>
                                        <ListItem.Subtitle style={styles.ans}>
                                        {`\u2022    `}Go to the 'Profile' Page and click on the pencil icon in the bottom right corner
                                        {`\n\u2022  `}Edit the fields in the profile page
                                        {`\n\u2022  `}Click on the 'check' icon once you're done.
                                        {`\n\u2022  `}The profile is updated
                                        </ListItem.Subtitle>
                                    </View>
                                </ListItem.Content>
                            </View>
                        </ListItem>

                        <ListItem bottomDivider>
                            <View style={styles.listContent}>
                                <ListItem.Content style={{marginLeft: 8, marginRight: 8}}>
                                    <View>
                                        <ListItem.Title style={styles.ques}>How do I view my appointments?</ListItem.Title>
                                        <ListItem.Subtitle style={styles.ans}>
                                        {`\u2022    `}Go to the 'View Appointments' Page
                                        {`\n\u2022  `}If no appointments have been booked, it will display this message
                                        {`\n\u2022  `}Otherwise, you can see the appointments booked so far
                                        </ListItem.Subtitle>
                                    </View>
                                </ListItem.Content>
                            </View>
                        </ListItem>

                        <ListItem bottomDivider>
                            <View style={styles.listContent}>
                                <ListItem.Content style={{marginLeft: 8, marginRight: 8}}>
                                    <View>
                                        <ListItem.Title style={styles.ques}>How do I view my doctors?</ListItem.Title>
                                        <ListItem.Subtitle style={styles.ans}>
                                        {`\u2022    `}Go to the 'My Doctors' Page
                                        {`\n\u2022  `}If no appointments have been booked, it will display this message
                                        {`\n\u2022  `}Otherwise, you can see the doctors you have consulted so far
                                        </ListItem.Subtitle>
                                    </View>
                                </ListItem.Content>
                            </View>
                        </ListItem>

                        <ListItem bottomDivider>
                            <View style={styles.listContent}>
                                <ListItem.Content style={{marginLeft: 8, marginRight: 8}}>
                                    <View>
                                        <ListItem.Title style={styles.ques}>How do I upload my medical records?</ListItem.Title>
                                        <ListItem.Subtitle style={styles.ans}>
                                        {`\u2022    `}Go to the 'Upload Medical Records' Page
                                        {`\n\u2022  `}If no records have been uploaded, it will display this message
                                        {`\n\u2022  `}Otherwise, you can see the medical records uploaded on the screen
                                        </ListItem.Subtitle>
                                    </View>
                                </ListItem.Content>
                            </View>
                        </ListItem>

                        <ListItem bottomDivider>
                            <View style={styles.listContent}>
                                <ListItem.Content style={{marginLeft: 8, marginRight: 8}}>
                                    <View>
                                        <ListItem.Title style={styles.ques}>How do I book an appointment?</ListItem.Title>
                                        <ListItem.Subtitle style={styles.ans}>
                                        {`\u2022    `}Click on the 'Book an Appointment' card on the Home Screen
                                        {`\n\u2022  `}Select your symptoms from the Symptoms Screen
                                        {`\n\u2022  `}Select your doctor on the Summary screen.
                                        {`\n\u2022  `}Select your payment plan and click on the Continue button,
                                        {`\n\u2022  `}Select the favourable time slot and click on the 'Book Appointment' button. 
                                        </ListItem.Subtitle>
                                    </View>
                                </ListItem.Content>
                            </View>
                        </ListItem>

                        <ListItem bottomDivider>
                            <View style={styles.listContent}>
                                <ListItem.Content style={{marginLeft: 8, marginRight: 8}}>
                                    <View>
                                        <ListItem.Title style={styles.ques}>How do I sign out from the app?</ListItem.Title>
                                        <ListItem.Subtitle style={styles.ans}>
                                        {`\u2022    `}Click on the 'Sign Out' button in the navigation drawer
                                        {`\n\u2022  `}You will be signed out from the app
                                        </ListItem.Subtitle>
                                    </View>
                                </ListItem.Content>
                            </View>
                        </ListItem>
                     </View>
                     <Divider/>
                </ScrollView>
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
    subheading: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingLeft: 5,
        color: 'white',
    },
    doctorListContainer:{
        backgroundColor: '#0b369c',
        padding: 15,
        borderRadius: 15,
        margin: 10
    },
    doctorList:{
        marginTop: 10
    },
    doctor: {
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 5,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
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
        fontSize: 16,
        fontWeight: 'bold',
        padding: 2
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
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 5
    },
    ques: {
        fontWeight: 'bold'
    },
    ans:{
        fontSize: 15
    }
});

export default FAQScreen;