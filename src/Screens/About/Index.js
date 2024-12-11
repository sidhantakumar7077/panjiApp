import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Index = () => {
    const navigation = useNavigation()
    const [isFirstTime, setIsFirstTime] = useState(true);

    useEffect(() => {
        AsyncStorage.getItem('isFirstTime').then(value => {
            if (value !== null && value === 'true') {
                setIsFirstTime(false);
                navigation.replace('Select_language');
            } else {
                setTimeout(() => {
                    setIsFirstTime(false);
                    navigation.replace('Select_language');
                    AsyncStorage.setItem('isFirstTime', 'true');
                }, 5000);
            }
        }).catch(error => console.error('AsyncStorage error: ', error));
    }, []);

    if (!isFirstTime) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <View style={{ width: '49%' }}>
                    <Image
                        source={require('../../assets/Images/panda.jpeg')}
                        style={styles.image}
                    />
                    <Text style={{ color: '#B7070A', fontSize: 14, fontWeight: '500', textAlign: 'center', marginTop: 5 }}>ଶ୍ରୀ ଜଗନ୍ନାଥ ପୂଜାପଣ୍ଡା ସାମନ୍ତ (ସଭାପତି, ପୂଜାପଣ୍ଡା ନିଯୋଗ ଶ୍ରୀମନ୍ଦିର ପୁରୀ)</Text>
                </View>

                <View style={{ width: '49%' }}>
                    <Image
                        source={require('../../assets/Images/panda2.jpg')}
                        style={styles.image}
                    />
                    <Text style={{ color: '#B7070A', fontSize: 14, fontWeight: '500', textAlign: 'center', marginTop: 5 }}>ଶ୍ରୀ ମାଧବଚନ୍ଦ୍ର ପୂଜାପଣ୍ଡା ସାମନ୍ତ (ସମ୍ପାଦକ, ପୂଜାପଣ୍ଡା ନିଯୋଗ ଶ୍ରୀମନ୍ଦିର ପୁରୀ)</Text>
                </View>
            </View>
            <ImageBackground style={{ width: '95%', height: 470, alignSelf: 'center', marginTop: 0, alignItems: 'center', justifyContent: 'center' }} source={require('../../assets/Images/background.png')}>
                <View style={{ width: 190, height: 300, justifyContent: 'center' }}>
                    <Text style={styles.text}>
                        ଏହି ପଞ୍ଜିକାର ବ୍ୟବସ୍ଥା ଅନୁଯାୟୀ ଓ ଆମ୍ଭ ଦ୍ଵାରା ପ୍ରଦତ୍ତ “୨୦୨୪-୨୦୨୫ ବର୍ଷର ଶ୍ରୀମନ୍ଦିରରେ ପର୍ବପର୍ବାଣି ଓ ଯାନିଯାତ୍ରା” ର ସୂଚୀ ଅନୁଯାୟୀ ଶ୍ରୀମନ୍ଦିରରେ ସମସ୍ତ ପର୍ବପର୍ବାଣି  ଓ ନୀତିମାନ ଅନୁଷ୍ଠିତ ହେବ ।
                        ଯଦି ପଞ୍ଜିକାରେ କୌଣସି ମୁଦ୍ରଣ ଜନିତ ତ୍ରୁଟି ରହିଥାଏ ସେଥିପାଇଁ ପୂଜାପଣ୍ଡା ନିଯୋଗ ଦାୟୀ ରହିବେ ନାହିଁ ।
                    </Text>
                </View>
            </ImageBackground>
        </View>
    )
}

export default Index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFBE00',
        paddingHorizontal: 15,
        paddingTop: 30,
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    image: {
        height: 200,
        width: '100%',
        borderRadius: 100,
        resizeMode: 'cover',
        borderWidth: 10,
        borderColor: '#B7070A',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    textContainer: {
        backgroundColor: '#f5db87',
        padding: 20,
        borderRadius: 20,
        top: 40
    },
    text: {
        color: '#B7070A',
        fontSize: 16,
        lineHeight: 24,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
})
