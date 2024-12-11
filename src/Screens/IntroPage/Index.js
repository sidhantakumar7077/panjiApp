import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ImageBackground, Dimensions, TouchableOpacity, LogBox, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment-timezone';

const { width: screenWidth } = Dimensions.get('window');
LogBox.ignoreLogs(['ViewPropTypes will be removed from React Native']);

const Index = (props) => {

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
        { id: 10, pageName: "January2025", monthName: "January 2025" },
        { id: 11, pageName: "February2025", monthName: "February 2025" },
        { id: 12, pageName: "March2025", monthName: "March 2025" },
        { id: 13, pageName: "April2025", monthName: "April 2025" },
    ]

    const navigation = useNavigation();
    const [activeSlide, setActiveSlide] = useState(0);
    const [selectedLanguage, setSelectedLanguage] = useState("English");
    // const [isFirstTime, setIsFirstTime] = useState(false);
    // const [isLoading, setIsLoading] = useState(true);

    const carouselEnglishItems = [
        {
            title: "The vision behind creating this app is to...",
            smallTitle1: "Help Non Resident Odias to get the information.",
            smallTitle2: "Create Awareness among people about various festivals and rituals.",
            smallTitle3: "People can get information about various rituals inside the temple and can plan their visit accordingly. This way we can reduce the crowd.",
            image: require('../../assets/Images/ratha.jpeg')
        }
    ];
    const carouselOdiaItems = [
        {
            title: "ଏହି ଆପ୍ ସୃଷ୍ଟି କରିବାର ଉଦ୍ଦେଶ୍ୟ ହେଉଛି ",
            smallTitle1: "ଓଡ଼ିଶା ବାହାରେ ରହୁଥିବା ଭକ୍ତମାନଙ୍କୁ ଶ୍ରୀମନ୍ଦିରର ରୀତିନୀତି ସମ୍ପର୍କରେ ଅବଗତ କରାଇବା ନିମନ୍ତେ |",
            smallTitle2: "ବିଭିନ୍ନ ପର୍ବ ଏବଂ ରୀତିନୀତି ବିଷୟରେ ସଠିକ ତଥ୍ୟ ଲୋକଙ୍କ ପାଖରେ ପହଞ୍ଚାଇବା ହେଉଛି ଆମର ଉଦ୍ଦେଶ୍ୟ |",
            smallTitle3: "ଏହା ଦ୍ଵାରା ଭକ୍ତମାନେ ମନ୍ଦିରରେ ହେଉଥିବା ବିଭିନ୍ନ ନୀତିକାନ୍ତିର ସମ୍ପୂର୍ଣ ବିବରଣୀ ପାଇପାରିବେ ଏବଂ ସେହି ଅନୁଯାୟୀ ସେମାନଙ୍କର ପରିଦର୍ଶନର ଆଗୁଆ ଯୋଜନା କରିପାରିବେ | ଏହି ଉପାୟରେ ଆମେ ଭିଡ଼କୁ ନିୟନ୍ତ୍ରଣ କରିପାରିବା |",
            image: require('../../assets/Images/ratha.jpeg')
        },
    ];

    useEffect(() => {
        checkFirstTimeIntroPage();

        const fetchLanguage = async () => {
            try {
                const language = await AsyncStorage.getItem('selectedLanguage');
                console.log("language", language);
                if (language) {
                    setSelectedLanguage(language);
                }
            } catch (error) {
                setSelectedLanguage("English");
                console.error('Error checking selected language:', error);
            }
        };
        fetchLanguage();
    }, []);

    const checkFirstTimeIntroPage = async () => {
        try {
            const isFirst = await AsyncStorage.getItem('isFirstTime_introPage');
            const currentMonth = moment(new Date()).format("MMM YYYY");

            if (isFirst === 'true') {
                for (let i = 0; i < monthPage.length; i++) {
                    if (monthPage[i].monthName === currentMonth) {
                        navigation.replace(monthPage[i].pageName);
                        break;
                    }
                }
            }
        } catch (error) {
            console.error('Error checking:', error);
        }
    };

    const handleContinue = async () => {
        try {
            await AsyncStorage.setItem('isFirstTime_introPage', 'true');
            const currentMonth = moment(new Date()).format("MMMM YYYY");
            console.log("currentMonth", new Date());
            for (let i = 0; i < monthPage.length; i++) {
                if (monthPage[i].monthName === currentMonth) {
                    navigation.replace(monthPage[i].pageName);
                    break;
                }
            }
        } catch (error) {
            console.error('Error checking:', error);
        }
    };

    const renderItem = ({ item, index }) => {
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground source={item.image} style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                    <LinearGradient colors={['transparent', '#FFBE00']} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
                    <View style={{ width: '85%', marginBottom: 70 }}>
                        <Text style={{ color: '#000', fontSize: 22, fontWeight: 'bold' }}>{item?.title?.split(' ').slice(0, 3).join(' ')}</Text>
                        <Text style={{ color: '#000', fontSize: 22, fontWeight: 'bold' }}>{item?.title?.split(' ').slice(3, 5).join(' ')} <Text style={{ color: '#B7070A' }}>{item?.title?.split(' ').slice(5, 9).join(' ')}</Text></Text>
                        <Text style={{ color: '#000', marginTop: 10, fontSize: 14, fontWeight: '600' }}>1. {item.smallTitle1}</Text>
                        <Text style={{ color: '#000', marginTop: 10, fontSize: 14, fontWeight: '600' }}>2. {item.smallTitle2}</Text>
                        <Text style={{ color: '#000', marginTop: 10, fontSize: 14, fontWeight: '600' }}>3. {item.smallTitle3}</Text>
                    </View>
                    {index === (selectedLanguage === "Odia" ? carouselOdiaItems : carouselEnglishItems).length - 1 && (
                        <TouchableOpacity onPress={handleContinue} style={styles.buttonContainer}>
                            <Image style={{ width: 40, height: 40 }} source={require('../../assets/Logo/nextBtn.png')} />
                        </TouchableOpacity>
                    )}
                </ImageBackground>
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <Carousel
                layout="default"
                data={selectedLanguage === "Odia" ? carouselOdiaItems : carouselEnglishItems}
                sliderWidth={screenWidth}
                itemWidth={screenWidth}
                renderItem={renderItem}
                onSnapToItem={(index) => setActiveSlide(index)}
            />
            <Pagination
                dotsLength={(selectedLanguage === "Odia" ? carouselOdiaItems : carouselEnglishItems).length}
                activeDotIndex={activeSlide}
                containerStyle={{ backgroundColor: 'transparent', paddingVertical: 8, position: 'absolute', bottom: 35, alignSelf: 'center' }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: -3,
                    backgroundColor: 'red'
                }}
                inactiveDotOpacity={1}
                inactiveDotScale={1}
                inactiveDotStyle={{
                    backgroundColor: 'white'
                }}
            />
        </View>
    );
};

export default Index;

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        right: 30,
        bottom: 25
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18
    }
});
