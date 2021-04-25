import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
// import {cardiology} from '@iconify/icons-medical-icon/cardiology';
// import {dental} from '@iconify/icons-medical-icon/dental';
// import {earNoseThroat} from '@iconify/icons-medical-icon/ear-nose-throat';
// import {kidney} from '@iconify/icons-medical-icon/kidney';
// import {laborDelivery} from '@iconify/icons-medical-icon/labor-delivery';
// import {mriPet} from '@iconify/icons-medical-icon/mri-pet';
// import {oncology} from '@iconify/icons-medical-icon/oncology';
// import {opthalmology} from '@iconify/icons-medical-icon/ophthalmology';
// import {pathology} from '@iconify/icons-medical-icon/pathology';
// import {pediatrics} from '@iconify/icons-medical-icon/pediatrics';
// import {radiology} from '@iconify/icons-medical-icon/radiology';
// import {respiratory} from '@iconify/icons-medical-icon/respiratory';
// import {surgery} from '@iconify/icons-medical-icon/surgery';
// import {womensHealth} from '@iconify/icons-medical-icon/womens-health';

function MedicalIcon(props) {
    const navigation = useNavigation();
    return (
        <TouchableNativeFeedback onPress={()=>navigation.navigate("Summary")}>
            <View style={styles.iconStyle}>
                <Icon name={props.name} color='black' size={30}/>
                <Text style={styles.text}>{props.text}</Text>
            </View>
        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({
    iconStyle: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
        margin: 5,
        backgroundColor: 'white',
        width: 150,
        height: 90,
    },
    text: {
        paddingTop: 5,
        textAlign: 'center',
        textAlignVertical: "center",
        minWidth: 40
    }

});

export default MedicalIcon;