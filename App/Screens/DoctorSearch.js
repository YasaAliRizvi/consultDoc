import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { ScrollView, TouchableNativeFeedback } from 'react-native-gesture-handler';
import { Avatar, Rating, Header, ListItem, Button, Divider, Icon } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';

function DoctorSearch({navigation}) {
    [checked, setChecked] = React.useState('first');
    [doctor, setDoctor] = React.useState('first');

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
                // rightComponent={{ icon: 'logout', color: '#fff' }}
            />

            <View style={styles.content}>
                <ScrollView>
                    <Text style={styles.heading}>Consultation for General Health Problems</Text>
                    <Divider/>
                    
                    <View style={styles.doctorListContainer}>
                    <Text style={styles.subheading}>CONSULT WITH TOP VERIFIED DOCTORS</Text>
                    <Text style={styles.subheading}>View Doctors in the consultation network</Text>
                    <ScrollView horizontal style={styles.doctorList}>
                        <TouchableNativeFeedback style={styles.doctor}>
                        <RadioButton
                            value='first'
                            status={doctor === 'first'?'checked':'unchecked'}
                            onPress={() => setDoctor('first')}
                            color = 'blue'
                        />
                        <Avatar 
                            rounded 
                            size="medium" 
                            title="RD" activeOpacity={1} overlayContainerStyle={{backgroundColor: "blue"}}
                        />
                        <View style={styles.doctorContent}>
                            <Text style={styles.doctorName}>Dr. Rajat Dikshit </Text>
                            <Text style={styles.doctorInfo}>
                                {`General Physician \n15 years experience`}
                            </Text>
                            <Rating imageSize={15} readonly startingValue={4} />
                        </View>
                        </TouchableNativeFeedback>

                        <TouchableNativeFeedback style={styles.doctor}>
                        <RadioButton
                            value='second'
                            status={doctor === 'second'?'checked':'unchecked'}
                            onPress={() => setDoctor('second')}
                            color = 'blue'
                        />
                        <Avatar 
                            rounded 
                            size="medium" 
                            title="SS" activeOpacity={1} overlayContainerStyle={{backgroundColor: "blue"}} 
                        />
                        <View style={styles.doctorContent}>
                            <Text style={styles.doctorName}>Dr. Suryakant Sharma</Text>
                            <Text style={styles.doctorInfo}>
                                {`Cardiologist \n14 years experience`}
                            </Text>
                            <Rating imageSize={15} readonly startingValue={4} />
                        </View>
                        </TouchableNativeFeedback>

                        <TouchableNativeFeedback style={styles.doctor}>
                        <RadioButton
                            value='third'
                            status={doctor === 'third'?'checked':'unchecked'}
                            onPress={() => setDoctor('third')}
                            color = 'blue'
                        />
                        <Avatar 
                            rounded 
                            size="medium" 
                            title="DD" activeOpacity={1} overlayContainerStyle={{backgroundColor: "blue"}} 
                        />
                        <View style={styles.doctorContent}>
                            <Text style={styles.doctorName}>Dr. Divakar Dalela </Text>
                            <Text style={styles.doctorInfo}>
                                {`Urologist \n20 years experience`}
                            </Text>
                            <Rating imageSize={15} readonly startingValue={5} />
                        </View>
                        </TouchableNativeFeedback>

                        <TouchableNativeFeedback style={styles.doctor}>
                        <RadioButton
                            value='fourth'
                            status={doctor === 'fourth'?'checked':'unchecked'}
                            onPress={() => setDoctor('fourth')}
                            color = 'blue'
                        />
                        <Avatar 
                            rounded 
                            size="medium" 
                            title="RS" activeOpacity={1} overlayContainerStyle={{backgroundColor: "blue"}} 
                        />
                        <View style={styles.doctorContent}>
                            <Text style={styles.doctorName}>Dr. Rajendra Saha</Text>
                            <Text style={styles.doctorInfo}>
                                {`Dermatologist \n21 years experience`}
                            </Text>
                            <Rating imageSize={15} readonly startingValue={5} />
                        </View>
                        </TouchableNativeFeedback>
                    </ScrollView>
                    </View>
                    <Divider/>

                    <View style={styles.priceList}>
                        <ListItem bottomDivider>
                            <View style={styles.listContent}>
                                <RadioButton
                                    value='first'
                                    status={checked === 'first'?'checked':'unchecked'}
                                    onPress={() => setChecked('first')}
                                    color = 'blue'
                                />
                                <ListItem.Content style={{marginLeft: 8, marginRight: 8}}>
                                    <View>
                                        <ListItem.Title>Single Online Consultation</ListItem.Title>
                                        <ListItem.Subtitle>
                                            Chat, audio, video consultation and free 7-day follow-up
                                        </ListItem.Subtitle>
                                    </View>
                                </ListItem.Content>
                                <Text style={styles.price}>
                                        {'\u20B9'} 249.00
                                </Text>
                            </View>
                        </ListItem>

                        <ListItem bottomDivider>
                        <View style={styles.listContent}>
                                {/* <ListItem.CheckBox 
                                    checkedIcon="dot-circle-o"
                                    uncheckedIcon="circle-o"
                                /> */}
                                <RadioButton
                                    value='second'
                                    status={checked === 'second'?'checked':'unchecked'}
                                    onPress={() => setChecked('second')}
                                    color = 'blue'
                                />
                                <ListItem.Content style={{marginLeft: 8, marginRight: 8}}>
                                    <View>
                                        <ListItem.Title>
                                            Covers 15 consultations across all specialities for 1 month
                                        </ListItem.Title>
                                        <ListItem.Subtitle>
                                            {`\u2022`} 24/7 access to doctors, till your health concerns are resolved 
                                            {`\n\u2022`} Online consultations for the entire family across all specialities
                                            {`\n\u2022`} Experience clinic-like consultations via video call
                                        </ListItem.Subtitle>
                                    </View>
                                </ListItem.Content>
                                <Text style={styles.price}>
                                        {'\u20B9'} 499.00
                                </Text>
                            </View>
                        </ListItem>

                        <ListItem bottomDivider>
                            <View style={styles.listContent}>
                                <RadioButton
                                    value='third'
                                    status={checked === 'third'?'checked':'unchecked'}
                                    onPress={() => setChecked('third')}
                                    color='blue'
                                />
                                <ListItem.Content style={{marginLeft: 8, marginRight: 8}}>
                                    <View>
                                        <ListItem.Title>
                                            Covers 15 consultations/month across all specialities for 6 months
                                        </ListItem.Title>
                                        <ListItem.Subtitle>
                                            {`\u2022`} 24/7 access to doctors, till your health concerns are resolved 
                                            {`\n\u2022`} Online consultations for the entire family across all specialities
                                            {`\n\u2022`} Experience clinic-like consultations via video call
                                        </ListItem.Subtitle>
                                    </View>
                                </ListItem.Content>
                                <Text style={styles.price}>
                                        {'\u20B9'} 1199.00
                                </Text>
                            </View>
                        </ListItem>
                     </View>
                     <Divider/>
                </ScrollView>
                <View style={styles.bottomBar}>
                    <Text style={{color: 'blue'}}>View Fee Breakup</Text>
                    <Button 
                        title="Continue"
                        onPress={()=> navigation.navigate('Slot')}
                    />
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
    }
});

export default DoctorSearch;