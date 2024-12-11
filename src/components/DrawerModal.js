import { StyleSheet, Text, View, Modal, Button, TouchableWithoutFeedback, TouchableOpacity, Alert, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { LogLevel, OneSignal } from 'react-native-onesignal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment-timezone';

const DrawerModal = ({ visible, onClose, pageActiveValue }) => {

    const navigation = useNavigation()
    const isFocused = useIsFocused();
    const [selectedTab, setSelectedTab] = useState(pageActiveValue);

    const monthPage = [
        { id: 1, pageName: "April2024", monthName: "April 2024" },
        { id: 2, pageName: "May2024", monthName: "May 2024" },
        { id: 3, pageName: "June2024", monthName: "June 2024" },
        { id: 4, pageName: "July2024", monthName: "July 2024" },
        { id: 5, pageName: "August2024", monthName: "August 2024" },
        { id: 6, pageName: "September2024", monthName: "September 2024" },
        { id: 7, pageName: "October2024", monthName: "October 2024" },
        { id: 8, pageName: "November2024", monthName: "November 2024" },
        { id: 9, pageName: "December2024", monthName: "December 2024" },
        { id: 10, pageName: "January2025", monthName: "January 2024" },
        { id: 11, pageName: "February2025", monthName: "February 2024" },
        { id: 12, pageName: "March2025", monthName: "March 2024" },
        { id: 13, pageName: "April2025", monthName: "April 2024" },
    ]

    const handleTabPress = (value, pageName) => {
        setSelectedTab(value);
        onClose();
        navigation.navigate(pageName);
    }

    const handleContinue = (value) => {
        const currentMonth = moment(new Date()).format("MMM YYYY");
        setSelectedTab(value);
        for (let i = 0; i < monthPage.length; i++) {
            if (monthPage[i].monthName === currentMonth) {
                navigation.navigate(monthPage[i].pageName);
                onClose();
                break;
            }
        }
    };

    return (
        <View>
            <Modal
                visible={visible}
                animationType="none"
                transparent={true}
                onRequestClose={onClose}
            >
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.variantModalContainer}>
                            <View style={{ width: '100%', alignItems: 'center' }}>
                                <Image
                                    source={require('../assets/Logo/panji.png')}
                                    style={styles.drawerLogo}
                                />
                            </View>
                            <View style={{ backgroundColor: '#ffd443', height: 0.5 }}></View>
                            <TouchableOpacity onPress={() => { handleContinue("events") }} style={styles.drawerCell}>
                                <Entypo name='home' size={30} color={selectedTab === "events" ? '#ffd443' : '#fff'} />
                                <Text style={{ color: selectedTab === "events" ? '#ffd443' : '#fff', fontSize: 15, fontWeight: '500', letterSpacing: 0.6, marginLeft: 15 }}>Events</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { handleTabPress("about", "MainAboutPage") }} style={styles.drawerCell}>
                                <Entypo name='info-with-circle' size={30} color={selectedTab === "about" ? '#ffd443' : '#fff'} />
                                <Text style={{ color: selectedTab === "about" ? '#ffd443' : '#fff', fontSize: 15, fontWeight: '500', letterSpacing: 0.6, marginLeft: 15 }}>About</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { handleTabPress("language", "MainLanguagePage") }} style={styles.drawerCell}>
                                <Ionicons name='language' size={30} color={selectedTab === "language" ? '#ffd443' : '#fff'} />
                                <Text style={{ color: selectedTab === "language" ? '#ffd443' : '#fff', fontSize: 15, fontWeight: '500', letterSpacing: 0.6, marginLeft: 15 }}>Language</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.drawerCell}>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.drawerCell}>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.drawerCell}>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.drawerCell}>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.drawerCell}>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.drawerCell}>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.drawerCell}>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.drawerCell}>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ alignItems: 'center', paddingBottom: 10 }}>
                                {/* <Text style={{ color: '#ffd443', fontSize: 13, fontWeight: '400', letterSpacing: 0.4 }}>version- 1.0.00</Text> */}
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    )
}

export default DrawerModal

const styles = StyleSheet.create({
    variantModalContainer: {
        width: '70%',
        height: '100%',
        left: 0,
        backgroundColor: '#bd1604',
        bottom: 0,
        position: 'absolute',
        alignSelf: 'center',
    },
    drawerCell: {
        width: '100%',
        height: 60,
        backgroundColor: '#bd1604',
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20
    },
    drawerLable: {
        color: '#ffd443',
        fontSize: 15,
        fontWeight: '500',
        letterSpacing: 0.6,
        marginLeft: 15
    },
    drawerLogo: {
        width: 130,
        height: 130,
        resizeMode: 'contain'
    }
})