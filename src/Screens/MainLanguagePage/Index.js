import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Octicons from 'react-native-vector-icons/Octicons';
import DrawerModal from '../../components/DrawerModal';
import moment from 'moment-timezone';

const Index = () => {

    const languages = [
        'Odia ଓଡ଼ିଆ',
        'English',
        // 'Hindi हिन्दी',
        // 'मराठी Marathi',
        // 'ગુજરાતી Gujarati',
        // 'தமிழ் Tamil',
        // 'ਪੰਜਾਬੀ Punjabi',
        // 'తెలుగు Telugu',
        // 'বাংলা Bangla',
        // 'ಕನ್ನಡ Kannada',
        // 'മലയാളം Malayalam'
    ];

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

    const [selectedLanguage, setSelectedLanguage] = useState('');

    const handleLanguageSelect = async (language) => {
        setSelectedLanguage(language);
        await AsyncStorage.setItem('selectedLanguage', language);
        const currentMonth = moment(new Date()).format("MMM YYYY");
        for (let i = 0; i < monthPage.length; i++) {
            if (monthPage[i].monthName === currentMonth) {
                navigation.replace(monthPage[i].pageName);
                break;
            }
        }
    };

    useEffect(() => {
        const fetchLanguage = async () => {
            try {
                const language = await AsyncStorage.getItem('selectedLanguage');
                if (language) {
                    setSelectedLanguage(language);
                }
            } catch (error) {
                console.error('Error checking selected language:', error);
            }
        };

        fetchLanguage();
    }, []);

    const navigation = useNavigation();
    // const openDrawer = () => { navigation.openDrawer() };
    const [isModalVisible, setModalVisible] = useState(false);
    const openModal = () => { setModalVisible(true) };
    const closeModal = () => { setModalVisible(false) };

    return (
        <View style={styles.container}>
            <DrawerModal visible={isModalVisible} navigation={navigation} onClose={closeModal} pageActiveValue={"language"} />
            <View style={styles.headerPart}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600', marginBottom: 3, marginLeft: 10 }}>Language</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={openModal} style={{ marginRight: 8, marginLeft: 20 }}>
                        <Octicons name="three-bars" color={'#fff'} size={25} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/Images/rathaImg.jpeg')} style={styles.iamge} />
            </View>
            <View style={{ backgroundColor: '#FFBE00', flex: 1, padding: 20 }}>
                <View style={{ width: '90%', alignSelf: 'center', marginBottom: 30 }}>
                    <Text style={{ color: '#000', fontSize: 22, fontWeight: '500', letterSpacing: 0.5 }}>Please Select Your</Text>
                    <Text style={{ color: '#000', fontSize: 22, fontWeight: '500', letterSpacing: 0.5, marginBottom: 5 }}>Preferred <Text style={{ color: '#B7070A' }}>Language</Text></Text>
                    <Text style={{ color: '#000000', fontSize: 14, fontWeight: '400' }}>Please select a language as per your reference to easily navigate through the application.</Text>
                </View>
                <View style={styles.languageContainer}>
                    {languages.map((language, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.languageButton,
                                selectedLanguage === language.split(' ')[0] && styles.selectedLanguageButton,
                            ]}
                            onPress={() => handleLanguageSelect(language.split(' ')[0])}
                            activeOpacity={0.8}
                        >
                            <Text style={[
                                styles.languageButtonText,
                                selectedLanguage === language.split(' ')[0] && styles.selectedLanguageButtonText,
                            ]}>{language.split(' ')[1] ? language.split(' ')[1] : language.split(' ')[0]}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    )
}

export default Index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#FFBE00',
    },
    headerPart: {
        width: '100%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#B7070A',
        paddingVertical: 13,
        paddingHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 13,
        elevation: 5
    },
    imageContainer: {
        backgroundColor: '#FFBE00',
        height: 300,
        width: '100%'
    },
    iamge: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    languageContainer: {
        flexDirection: 'column',
        // flexWrap: 'wrap',
        justifyContent: 'center',
        // marginBottom: 20,
        alignItems: 'center',
    },
    languageButton: {
        paddingVertical: 13,
        // paddingHorizontal: 30,
        marginHorizontal: 5,
        marginBottom: 15,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        flexBasis: 'auto',
        minWidth: 170,
    },
    selectedLanguageButton: {
        backgroundColor: '#B7070A',
    },
    languageButtonText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
    },
    selectedLanguageButtonText: {
        color: '#fff',
    },
    continueButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#B7070A',
    },
    continueButtonText: {
        fontSize: 17,
        fontWeight: '600',
        textAlign: 'center',
        color: '#fff',
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
})
