import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Index = () => {

  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('');
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

  useEffect(() => {
    checkIfLanguageSelected();
  }, []);

  const checkIfLanguageSelected = async () => {
    try {
      const language = await AsyncStorage.getItem('selectedLanguage');
      if (language) {
        navigation.replace('IntroPage');
      }
    } catch (error) {
      console.error('Error checking selected language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  const handleContinue = async () => {
    if (selectedLanguage) {
      try {
        await AsyncStorage.setItem('selectedLanguage', selectedLanguage);
        navigation.replace('IntroPage');
      } catch (error) {
        console.error('Error saving selected language:', error);
      }
    } else {
      console.log('Please select a language before continuing.');
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <View style={styles.container}>
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
        <TouchableOpacity
          style={[styles.continueButton, !selectedLanguage && styles.disabledButton]}
          onPress={handleContinue}
          disabled={!selectedLanguage}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFBE00',
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
    marginBottom: 20,
    alignItems: 'center',
  },
  languageButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    marginBottom: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    flexBasis: 'auto',
    minWidth: 180,
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
});
