import { SafeAreaView, ScrollView, StyleSheet, Text, View, FlatList, TouchableOpacity, TouchableHighlight, ActivityIndicator, LogBox } from 'react-native'
import React, { useState, useEffect } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment-timezone';
import AnalogClock from 'react-native-clock-analog';
import DrawerModal from '../../components/DrawerModal';

LogBox.ignoreLogs(['Warning: Each child in a list should have a unique "key" prop.']);

const May2024 = (props) => {

  const eventsForOdiaMonth = [
    {
      id: 1,
      date: '01/05/2024',
      day: 'ବୁଧବାର',
      name: 'ଶ୍ରୀମନ୍ଦିରରେ ଶ୍ରୀରାମାଭିଷେକ',
      Image: require('../../assets/EventsImages/MayImages/Ramabhishek_1.05.24.png'),
      tithi: '(୧) ମଇ , ବୁଧବାର (ବୈଶାଖ) ମେଷ ଦି୧୮ନ , ସୱାଲ ତା୨୨ରିଖ , ସାୟନ ବୈଶାଖ ଦି୧୧ନ',
      sunrise: 'ଘ୫|୨୧|୨୮',
      sunset: 'ଘ୬|୬|୮',
      gdTime: '(ଅମୃତ) ପ୍ରାତଃରୁ ଦିବା ଘ୬|୫୫ ମଧ୍ୟେ , ଘ୧୧|୪୩ ରୁ ଘ୧|୧୯ ମଧ୍ୟେ , ରାତ୍ରି ଘ୬|୫୬ ରୁ ୯|୨୦ ମଧ୍ୟେ , ଘ୨|୯ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୨୧ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୪୩ ରୁ ଘ୫|୧୮ ମଧ୍ୟେ , ରାତ୍ରି ଘ୯|୨୦ ରୁ ଘ୧୦|୫୬ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୮ ରୁ ଘ୧୦|୯ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୪୬ ରୁ ଘ୧|୨୬ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୨୮ ରୁ ଘ୩|୫୦ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 2,
      date: '02/05/2024',
      day: 'ଗୁରୁବାର ',
      name: 'ବୃହସ୍ପତି କୃତ୍ତିକା ଚଳନ (ସଞ୍ଚାର)',
      Image: require('../../assets/Images/rathaImg.jpeg'),
      tithi: '(୨) ମଇ , ଗୁରୁବାର (ବୈଶାଖ) ମେଷ ଦି୧୯ନ , ସୱାଲ ତା୨୩ରିଖ , ସାୟନ ବୈଶାଖ ଦି୧୨ନ',
      sunrise: 'ଘ୫|୨୦|୫୨',
      sunset: 'ଘ୬|୬|୨୮',
      gdTime: '(ଅମୃତ) ରାତ୍ରି ଘ୧|୨୦ ରୁ ୩|୪୪ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ପ୍ରାତଃରୁ ଦିବା ଘ୬|୫୬ ମଧ୍ୟେ ,  ଘ୧୦|୬ ରୁ ଘ୧୨|୩୦ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୨|୪୯ ରୁ ଘ୬|୬ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୪୪ ରୁ ଘ୧|୧୧ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 3,
      date: '03/05/2024',
      day: 'ଶୁକ୍ରବାର',
      name: '',
      Image: require('../../assets/Images/PuriTemple.png'),
      tithi: '(୩) ମଇ , ଶୁକ୍ରବାର (ବୈଶାଖ) ମେଷ ଦି୨୦ନ , ସୱାଲ ତା୨୪ରିଖ , ସାୟନ ବୈଶାଖ ଦି୧୩ନ',
      sunrise: 'ଘ୫|୨୦|୧୭',
      sunset: 'ଘ୬|୬|୪୯',
      gdTime: '(ଅମୃତ) ପ୍ରାତଃରୁ ଘ୬|୫୫ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୧୦|୫୭ ରୁ ଘ୧୧|୪୫ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୮|୨୮ ରୁ ଘ୧୧|୪୪ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୫୭ ରୁ ଘ୧୦|୨୦ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 4,
      date: '04/05/2024',
      day: 'ଶନିବାର',
      name: 'ସର୍ବସମ୍ମତ ବରୁଥିନୀ ଏକାଦଶୀ , ଶରଣ ଶେଷ',
      Image: require('../../assets/Images/PuriBeach.png'),
      tithi: '(୪) ମଇ , ଶନିବାର (ବୈଶାଖ) ମେଷ ଦି୨୧ନ , ସୱାଲ ତା୨୫ରିଖ , ସାୟନ ବୈଶାଖ ଦି୧୪ନ',
      sunrise: 'ଘ୫|୧୯|୪୩',
      sunset: 'ଘ୬|୭|୧୧',
      gdTime: '(ଅମୃତ) ପ୍ରାତଃରୁ ଦିବା ଘ୯|୧୭ ରୁ ଘ୧୨|୨୯ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୩୦ ରୁ ଘ୧୦|୫୭  ମଧ୍ୟେ , ଘ୧୨|୩୩ ରୁ ଘ୨|୯ ମଧ୍ୟେ, ଘ୨|୫୭ ରୁ ଘ୪|୩୩ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ପ୍ରାତଃ ରୁ ଘ୬|୫୪ ମଧ୍ୟେ , ଘ ୪|୩୫ ରୁ ଘ୬|୭ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୧|୨୬ ରୁ ଘ୨|୫୬ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ଅସ୍ତରୁ ରାତ୍ରି ଘ୭|୩୨ ମଧ୍ୟେ , ଘ୩|୧୪ ରୁ ଘ୫|୧୯ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 5,
      date: '05/05/2024',
      day: 'ରବିବାର ',
      name: '',
      Image: require('../../assets/Images/3rathas.jpg'),
      tithi: '(୫) ମଇ , ରବିବାର (ବୈଶାଖ) ମେଷ ଦି୨୨ନ , ସୱାଲ ତା୨୬ରିଖ , ସାୟନ ବୈଶାଖ ଦି୧୫ନ',
      sunrise: 'ଘ୫|୧୯|୯',
      sunset: 'ଘ୬|୬|୩୩',
      gdTime: '(ଅମୃତ) ପ୍ରାତଃରୁ ଘ୬|୬ ରୁ ଘ୯|୧୮ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୪୫ ରୁ ୯|୨୧ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୬|୬ ମଧ୍ୟେ , ଦିବା ଘ୧୨|୨୯ ରୁ ୧|୧୭ ମଧ୍ୟେ , ରାତ୍ରି ଘ୬|୫୭ ରୁ ଘ୭|୪୫ ମଧ୍ୟେ , ଘ୧୨|୩୩ ରୁ ଘ୩|୪୫ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୭ ରୁ ଘ୧|୧୯ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୭ ରୁ ଘ୨|୨୮ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 6,
      date: '06/05/2024',
      day: 'ସୋମବାର ',
      name: '',
      Image: require('../../assets/Images/KhajaBhoga.png'),
      tithi: '(୬) ମଇ , ସୋମବାର (ବୈଶାଖ) ମେଷ ଦି୨୩ନ , ସୱାଲ ତା୨୭ରିଖ , ସାୟନ ବୈଶାଖ ଦି୧୬ନ',
      sunrise: 'ଘ୫|୧୮|୩୮',
      sunset: 'ଘ୬|୭|୫୪',
      gdTime: '(ଅମୃତ) ପ୍ରାତଃରୁ ଘ୬|୫୩ ମଧ୍ୟେ , ଦିବା ଘ୧୦|୪ ରୁ ଘ୧୨|୨୮ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୫୮ ରୁ ରାତ୍ରି ଘ୯|୨୨ ମଧ୍ୟେ , ଘ୧୧|୪୬ ରୁ ଘ୨|୫୮ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୨|୫୨ ରୁ ଘ୩|୨୮ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୬|୫୨ ରୁ ଘ୮|୨୬ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୨|୫୬ ରୁ ଘ୪|୩ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୧୯ ରୁ ଘ୧୧|୪୨ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 7,
      date: '07/05/2024',
      day: 'ମଙ୍ଗଳବାର ',
      name: ' ',
      Image: require('../../assets/Images/Konark.png'),
      tithi: '(୭) ମଇ , ମଙ୍ଗଳବାର (ବୈଶାଖ) ମେଷ ଦି୨୪ନ , ସୱାଲ ତା୨୮ରିଖ , ସାୟନ ବୈଶାଖ ଦି୧୭ନ',
      sunrise: 'ଘ୫|୧୮|୯',
      sunset: 'ଘ୬|୮|୧୩',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୭|୪୦ ରୁ ୧୦|୪ ମଧ୍ୟେ , ଘ୧୨|୨୮ ରୁ ଘ୨|୪ ମଧ୍ୟେ , ଘ ୨|୫୨  ରୁ ଘ୪|୨୮ ମଧ୍ୟେ , ଅସ୍ତରୁ ରାତ୍ରି ଘ୬|୫୭ ମଧ୍ୟେ , ଘ୯|୨୨ ରୁ ଘ୧୧|୪୬ ମଧ୍ୟେ , ୨|୧୦ ରୁ ୪|୩୪ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୨୩ ରୁ ଘ୪|୨ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୬|୪୯ ରୁ ଘ୮|୨୯ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୪୩ ରୁ ଘ୯|୫ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 8,
      date: '08/05/2024',
      day: 'ବୁଧବାର ',
      name: 'ଶ୍ରୀମନ୍ଦିରେ ଓ ସର୍ବତ୍ର ରୁକ୍ମଣୀ ଅମାବାସ୍ୟା',
      Image: require('../../assets/EventsImages/MayImages/RukmaniAmabasya_8.05.24.png'),
      tithi: '(୮) ମଇ , ବୁଧବାର (ବୈଶାଖ) ମେଷ ଦି୨୫ନ , ସୱାଲ ତା୨୯ରିଖ , ସାୟନ ବୈଶାଖ ଦି୧୮ନ',
      sunrise: 'ଘ୫|୧୭|୩୯',
      sunset: 'ଘ୬|୮|୩୫',
      gdTime: '(ଅମୃତ) ପ୍ରାତଃରୁ ଘ୬|୫୨ ମଧ୍ୟେ , ଘ୧୧|୩୯ ରୁ ଘ୧|୧୫ ମଧ୍ୟେ , ରାତ୍ରି ଘ୬|୫୯ ରୁ ୯|୨୩ ମଧ୍ୟେ , ଘ୨|୧୨ ରୁ ଘ୫|୧୭ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୪୦ ରୁ ଘ୫|୧୬ ମଧ୍ୟେ , ରାତ୍ରି ଘ୯|୨୩ ରୁ ଘ୧୦|୫୯ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୨୭ ରୁ ଘ୧୦|୭ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୧୧|୪୩ ରୁ ଘ୧|୨୧ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୨୭ ରୁ ଘ୩|୪୯ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 9,
      date: '09/05/2024',
      day: 'ଗୁରୁବାର',
      name: 'ଦ୍ୱିତୀୟା ଚନ୍ଦ୍ରଦର୍ଶନ',
      Image: require('../../assets/Images/PuriBeach.png'),
      tithi: '(୯) ମଇ , ଗୁରୁବାର (ବୈଶାଖ) ମେଷ ଦି୨୬ନ , ସୱାଲ ତା୩୦ରିଖ , ସାୟନ ବୈଶାଖ ଦି୧୯ନ',
      sunrise: 'ଘ୫|୧୭|୧୦',
      sunset: 'ଘ୬|୮|୫୮',
      gdTime: '(ଅମୃତ) ରାତ୍ରି ଘ୧|୨୦ ରୁ ୩|୪୪ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ପ୍ରାତଃରୁ ଘ୬|୫୬ ମଧ୍ୟେ ଘ୧୦|୮ ରୁ ଘ୧୨|୩୨ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୨|୫୬ ରୁ ଘ୬|୯ ମଧ୍ୟେ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୪୩ ରୁ ଘ୧|୫ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 10,
      date: '10/05/2024',
      day: 'ଶୁକ୍ରବାର ',
      name: 'ଅକ୍ଷୟ ତୃତୀୟା , ଚନ୍ଦନ ଯାତ୍ରାରମ୍ଭ , ରଥ ଅନୁକୂଳ',
      Image: require('../../assets/EventsImages/MayImages/AkshayaTritiya_10.05.24.png'),
      tithi: '(୧୦) ମଇ , ଶୁକ୍ରବାର (ବୈଶାଖ) ମେଷ ଦି୨୭ନ , ଜିଲକଜ ତା୧ରିଖ , ସାୟନ ବୈଶାଖ ଦି୨୦ନ',
      sunrise: 'ଘ୫|୧୬|୪୧',
      sunset: 'ଘ୬|୯|୨୧',
      gdTime: '(ଅମୃତ) ପ୍ରାତଃରୁ ଘ୬|୫୩ ମଧ୍ୟେ , ଘ୭|୪୦ ରୁ ଘ୧୦|୪ ମଧ୍ୟେ ,ଘ୧୨|୨୮ ରୁ ଘ ୨|୪ ମଧ୍ୟେ , ଘ୩|୪୦ ରୁ ଘ୫|୧୬ ମଧ୍ୟେ , ରାତ୍ରି ଘ୬|୪୩ ରୁ ଘ୯|୧୯ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୧୦|୫୫ ରୁ ଘ୧୧|୪୩ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୮|୨୬ ରୁ ଘ୧୧|୪୨ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୫୯ ରୁ ଘ୧୦|୨୧ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 11,
      date: '11/05/2024',
      day: 'ଶନିବାର',
      name: '',
      Image: require('../../assets/Images/rathaImg.jpeg'),
      tithi: '(୧୧) ମଇ , ଶନିବାର (ବୈଶାଖ) ମେଷ ଦି୨୮ନ , ଜିଲକଜ ତା୨ରିଖ , ସାୟନ ବୈଶାଖ ଦି୨୧ନ',
      sunrise: 'ଘ୫|୧୬|୧୩',
      sunset: 'ଘ୬|୯|୪୩',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୨|୫୦ ରୁ ୫|୧୪ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୦ ରୁ ୭|୪୮ ମଧ୍ୟେ , ଘ୧୧|୪୮ ରୁ ଘ୨|୧୨ ମଧ୍ୟେ , ଘ୩|୪୯ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୧୬ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର)ପ୍ରାତଃ ରୁ ଦିବା ଘ୬|୨ ମଧ୍ୟେ , ଘ୯|୧୪ ରୁ ଘ୧୧|୩୮ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ପ୍ରାତଃରୁ ଘ୬|୫୦ମଧ୍ୟେ , ଘ୪|୩୭ ରୁ ଘ୬|୧୦ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୧|୨୧ ରୁ ଘ୨|୫୯ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ଅସ୍ତରୁ ରାତ୍ରି ଘ୭|୩୬ ମଧ୍ୟେ , ଘ୩|୫୦ ରୁ ଘ୫|୧୬ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 12,
      date: '12/05/2024',
      day: 'ରବିବାର',
      name: 'ଶ୍ରୀମଦ ଆଦି ଶଙ୍କରାଚାର୍ଯ୍ୟ ଜୟନ୍ତୀ',
      Image: require('../../assets/Images/Mahaprasad.png'),
      tithi: '(୧୨) ମଇ , ରବିବାର (ବୈଶାଖ) ମେଷ ଦି୨୯ନ , ଜିଲକଜ ତା୩ରିଖ , ସାୟନ ବୈଶାଖ ଦି୨୨ନ',
      sunrise: 'ଘ୫|୧୫|୪୫',
      sunset: 'ଘ୬|୧୦|୭',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୬|୫୦ ରୁ ଘ୯|୧୪ ମଧ୍ୟେ , ଘ୧୧|୩୮ ରୁ ଘ୨|୨ ମଧ୍ୟେ , ଅସ୍ତରୁ ରାତ୍ରି ଘ୭|୪୭ ମଧ୍ୟେ , ଘ୧୦|୫୯ ରୁ ରାତ୍ରି ଘ୧|୨୩ ମଧ୍ୟେ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୩୮ ରୁ ଘ୪|୨୬ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୫ ରୁ ଘ୨|୨୧ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୮ ରୁ ଘ୨|୨୭ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 13,
      date: '13/05/2024',
      day: 'ସୋମବାର',
      name: 'ଶ୍ରୀରାମାନୁଜାଚାର୍ଯ୍ୟ ଜୟନ୍ତୀ , ମାସାନ୍ତ',
      Image: require('../../assets/Images/Konark.png'),
      tithi: '(୧୩) ମଇ , ସୋମବାର (ବୈଶାଖ) ମେଷ ଦି୩୦ନ , ଜିଲକଜ ତା୪ରିଖ , ସାୟନ ବୈଶାଖ ଦି୨୩ନ',
      sunrise: 'ଘ୫|୧୫|୧',
      sunset: 'ଘ୬|୧୦|୨୯',
      gdTime: '(ଅମୃତ) ପ୍ରାତଃରୁ ଘ୬|୫୧ ମଧ୍ୟେ , ଦିବା ଘ୧୦|୩ ରୁ ଘ୧୨|୨୭ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୫୮ ରୁ ୯|୨୨ ମଧ୍ୟେ , ଘ୧୧|୪୬ ଘ୨|୫୮ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୨|୫୧ ରୁ ଘ୪|୨୭ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୬|୪୯ ରୁ ଘ୮|୨୭ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୨|୫ ରୁ ଘ୪|୨୯ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୨୧ ରୁ ଘ୧୧|୪୩ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 14,
      date: '14/05/2024',
      day: 'ମଙ୍ଗଳବାର',
      name: 'ବୃଷ ସଂକ୍ରାନ୍ତି',
      Image: require('../../assets/Images/3rathas.jpg'),
      tithi: '(୧୪) ମଇ , ମଙ୍ଗଳବାର (ଜ୍ୟେଷ୍ଠ) ମେଷ ଦି୧ନ , ଜିଲକଜ ତା୫ରିଖ , ସାୟନ ବୈଶାଖ ଦି୨୪ନ',
      sunrise: 'ଘ୫|୧୪|୫୬',
      sunset: 'ଘ୬|୧୦|୫୨',
      gdTime: '(ଅମୃତ) ପ୍ରାତଃରୁ ଦିବା ଘ୭|୩୯ ମଧ୍ୟେ , ଘ୯|୧୫ ରୁ ଘ୧୧|୩୯ ମଧ୍ୟେ , ଘ୨|୫୧ ରୁ ଘ୩|୩୯ ମଧ୍ୟେ , ଅସ୍ତରୁ ରାତ୍ରି ଘ୬|୫୯ ମଧ୍ୟେ , ଘ୧୨|୫୩ ରୁ ଘ୨|୫୯ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୨|୩ ରୁ ଘ୨|୫୧ ମଧ୍ୟେ , ଘ୩|୩୯ ରୁ ଘ୪|୨୭ ମଧ୍ୟେ ,  ରାତ୍ରି ଘ୮|୩୫ ରୁ ଘ୧୦|୧୧ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୨୬ ରୁ ଘ୩|୦ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୬|୪୯ ରୁ ଘ୮|୨୭ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୩୮ ରୁ ଘ୯|୦ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 15,
      date: '15/05/2024',
      day: 'ବୁଧବାର',
      name: 'ଶ୍ରୀ ମନ୍ଦିରରେ ନୀଳାଦ୍ରୀ ମହୋଦୟାଷ୍ଟମୀ , ବୁଧାଷ୍ଟମୀ ସ୍ନାନ , କାଳ(୫୨)ସମ୍ବତ୍ସର ପ୍ରବେଶ',
      Image: require('../../assets/EventsImages/MayImages/NiladriMahodayasthami_15.05.24.png'),
      tithi: '(୧୫) ମଇ , ବୁଧବାର (ଜ୍ୟେଷ୍ଠ) ବୃଷ ଦି୨ନ , ଜିଲକଜ ତା୬ରିଖ , ସାୟନ ବୈଶାଖ ଦି୨୫ନ',
      sunrise: 'ଘ୫|୧୪|୩୪',
      sunset: 'ଘ୬|୧୧|୧୪',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୭|୩୭ ରୁ ଘ୧୦|୪୯ ମଧ୍ୟେ , ଘ୧|୧୩ ରୁ ଘ୪|୨୫ ମଧ୍ୟେ , ଅସ୍ତରୁ ରାତ୍ରି ଘ୧୦|୧୩ ମଧ୍ୟେ , ଘ୧୨|୩୭ ରୁ ଘ୨|୧୩ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୨୮ ରୁ ଘ୧୦|୮ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୪୩ ରୁ ଘ୧|୨୦ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୨୮ ରୁ ଘ୩|୫୧ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 16,
      date: '16/05/2024',
      day: 'ଗୁରୁବାର',
      name: 'ସୀତା ନବମୀ ବ୍ରତ',
      Image: require('../../assets/Images/Konark.png'),
      tithi: '(୧୬) ମଇ , ଗୁରୁବାର (ଜ୍ୟେଷ୍ଠ) ବୃଷ ଦି୩ନ , ଜିଲକଜ ତା୭ରିଖ , ସାୟନ ବୈଶାଖ ଦି୨୬ନ',
      sunrise: 'ଘ୫|୧୪|୧୩',
      sunset: 'ଘ୬|୧୧|୩୫',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୨|୪୯ ରୁ ଘ୫|୧୩ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୨ ରୁ ୯|୨୬ ମଧ୍ୟେ , ଘ୧୨|୩୮ ରୁ ଘ୩|୨ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର)ପ୍ରାତଃରୁ ଘ୬|୧ ମଧ୍ୟେ , ଘ୯|୧୩ ରୁ ଘ୧୦|୪୯ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୨|୫୯ ରୁ ଘ୬|୧୨ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୪୬ ରୁ ଘ୧|୭ ପର୍ଯ୍ୟନ୍ତ | ',
    },
    {
      id: 17,
      date: '17/05/2024',
      day: 'ଶୁକ୍ରବାର',
      name: '',
      Image: require('../../assets/Images/LaxmiPuja.png'),
      tithi: '(୧୭) ମଇ , ଶୁକ୍ରବାର (ଜ୍ୟେଷ୍ଠ) ବୃଷ ଦି୪ନ , ଜିଲକଜ ତା୮ରିଖ , ସାୟନ ବୈଶାଖ ଦି୨୭ନ',
      sunrise: 'ଘ୫|୧୩|୫୨',
      sunset: 'ଘ୬|୧୧|୫୮',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୧୧|୩୬ ରୁ ୨|୦ ମଧ୍ୟେ , ଅସ୍ତରୁ ରାତ୍ରି ଘ୮|୩୮ ମଧ୍ୟେ , ଘ୧|୨୬ ରୁ  ଘ୩|୫୦ ମଧ୍ୟେ , ଘ୪|୩୯ ରୁ ଘ୫|୧୪ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ପ୍ରାତଃ ଘ୬|୩୦ ରୁ ଘ୬|୪୯ ମଧ୍ୟେ ,  ଘ୯|୧୨ ରୁ ଘ୧୦|୦ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୮|୨୭ ରୁ ଘ୧୧|୪୪ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୯|୦ ରୁ ଘ୧୦|୨୨ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 18,
      date: '18/05/2024',
      day: 'ଶନିବାର',
      name: 'ମୁକ୍ତିମଣ୍ଡପ ଆନୁକୂଲ୍ୟରେ ସିଂହଦ୍ଵାରରେ ମହାବିଷ୍ଣୁ ଯଜ୍ଞ ଆରମ୍ଭ , ଯଶୋବନ୍ତ ଦାସଙ୍କ ଆବିର୍ଭାବ ଦିବସ',
      Image: require('../../assets/Images/KhajaBhoga.png'),
      tithi: '(୧୮) ମଇ , ଶନିବାର (ଜ୍ୟେଷ୍ଠ) ବୃଷ ଦି୧୫ନ , ଜିଲକଜ ତା୯ରିଖ , ସାୟନ ବୈଶାଖ ଦି୨୮ନ',
      sunrise: 'ଘ୫|୧୩|୩୩',
      sunset: 'ଘ୬|୧୨|୨୧',
      gdTime: '(ଅମୃତ) ଘ୨|୪୮ ରୁ ୫|୧୨ ରାତ୍ରି ଘ୭|୩ ରୁ ୭|୫୧ ମଧ୍ୟେ , ଘ୧୧|୫୧ ରୁ ଘ୨|୧୫ ମଧ୍ୟେ , ଘ୩|୫୧ ରୁ ଘ୫|୧୩ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର)ପ୍ରାତଃରୁ ଦିବା ଘ୬|୧ ମଧ୍ୟେ , ଘ୯|୧୨ ରୁ ଘ୧୧|୩୬ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା)ପ୍ରାତଃ ଘ୫|୧୪ ରୁ ଘ୬|୫୧ ମଧ୍ୟେ , ଦିବା ଘ୪|୩୬ ରୁ ଘ୬|୧୨ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧|୨୧ ରୁ ଘ୨|୫୯ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସନ୍ଧ୍ୟା ଘ୬|୧୨ ରୁ ଘ୭|୩୬ ମଧ୍ୟେ , ରାତ୍ରି ଘ୩|୫୦ ରୁ ଘ୫|୧୩ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 19,
      date: '19/05/2024',
      day: 'ରବିବାର',
      name: 'ଶ୍ରୀମନ୍ଦିରେ ଓ ସର୍ବସମ୍ମତ (ମୋହିନୀ) ଏକାଦଶୀ , ରବିନାରାୟଣ ବ୍ରତ',
      Image: require('../../assets/EventsImages/MayImages/MohiniEkadashi_19.05.24.png'),
      tithi: '(୧୯) ମଇ , ରବିବାର (ଜ୍ୟେଷ୍ଠ) ବୃଷ ଦି୬ନ , ଜିଲକଜ ତା୧୦ରିଖ , ସାୟନ ବୈଶାଖ ଦି୨୯ନ',
      sunrise: 'ଘ୫|୧୩|୧୩',
      sunset: 'ଘ୬|୧୨|୪୫',
      gdTime: '(ଅମୃତ) ପ୍ରାତଃରୁ ଦିବା ଘ୬|୪୮ ରୁ ୯|୧୨ ମଧ୍ୟେ , ଘ୧୧|୩୬ ରୁ ଘ୨|୦ ମଧ୍ୟେ ,ଅସ୍ତରୁ ରାତ୍ରି ଘ୭|୫୧ ମଧ୍ୟେ , ଘ୧୧|୩୦ ରୁ ଘ୧|୨୭ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୩୬ ରୁ ଘ୪|୨୪ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୫ ରୁ ଘ୧୧|୨୨ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୭ ରୁ ଘ୨|୨୭ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 20,
      date: '20/05/2024',
      day: 'ସୋମବାର',
      name: '',
      Image: require('../../assets/Images/LaxmiPuja.png'),
      tithi: '(୨୦) ମଇ , ସୋମବାର (ଜ୍ୟେଷ୍ଠ) ବୃଷ ଦି୭ନ , ଜିଲକଜ ତା୧୧ରିଖ , ସାୟନ ବୈଶାଖ ଦି୩୦ନ',
      sunrise: 'ଘ୫|୧୨|୫୪',
      sunset: 'ଘ୬|୧୩|୧୦',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୮|୨୪ ରୁ ୧୦|୦ ମଧ୍ୟେ , ରାତ୍ରି ଘ୯|୨୭ ରୁ ୧୨|୩୯ ମଧ୍ୟେ , ଘ୨|୧୫ ରୁ ଘ୩|୫୧ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୪|୪୦ ରୁ ଘ୫|୧୩ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ପ୍ରାତଃ ଘ୬|୨୫ ରୁ ଘ୮|୨୮ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୨|୫୯ ରୁ ଘ୪|୩୭ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୨୧ ରୁ ଘ୧୧|୪୩ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 21,
      date: '21/05/2024',
      day: 'ମଙ୍ଗଳବାର',
      name: '',
      Image: require('../../assets/Images/Mahaprasad.png'),
      tithi: '(୨୧) ମଇ , ମଙ୍ଗଳବାର (ଜ୍ୟେଷ୍ଠ) ବୃଷ ଦି୮ନ , ଜିଲକଜ ତା୧୨ରିଖ , ସାୟନ ବୈଶାଖ ଦି୩୧ନ',
      sunrise: 'ଘ୫|୧୨|୩୫',
      sunset: 'ଘ୬|୧୩|୩୫',
      gdTime: '(ଅମୃତ) ପ୍ରାତଃରୁ ଦିବା ଘ୭|୩୭ ମଧ୍ୟେ , ଘ୧୦|୪୮ ରୁ ଘ୧୧|୩୬ ମଧ୍ୟେ , ଅସ୍ତରୁ ରାତ୍ରି ଘ୭|୪ ମଧ୍ୟେ , ଘ୧୨|୪୦ ରୁ ଘ୩|୪ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୧୦|୦ ରୁ ଘ୧୦|୪୮ ମଧ୍ୟେ , ଘ୧୧|୩୬ ରୁ ଘ୧୨|୨୪ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୪୦ ରୁ ଘ୧୦|୧୬ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୨୩ ରୁ ଘ୩|୨ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୬|୪୮ ରୁ ଘ୮|୨୬ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୪୦ ରୁ ଘ୯|୨ ପର୍ଯ୍ୟନ୍ତ | ',
    },
    {
      id: 22,
      date: '22/05/2024',
      day: 'ବୁଧବାର',
      name: 'ଶ୍ରୀମନ୍ଦିରରେ ଓ ସର୍ବସମ୍ମତ ନୃସିଂହ ଚତୁର୍ଦ୍ଦଶୀ',
      Image: require('../../assets/EventsImages/MayImages/NursinghaJanma_22.05.24.png'),
      tithi: '(୨୨) ମଇ , ବୁଧବାର (ଜ୍ୟେଷ୍ଠ) ବୃଷ ଦି୯ନ , ସୱାଲ ତା୧୩ରିଖ , ସାୟନ ଜ୍ୟେଷ୍ଠ ଦି୧ନ',
      sunrise: 'ଘ୫|୧୨|୨୧',
      sunset: 'ଘ୬|୧୩|୫୭',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୭|୩୫ ରୁ ଘ୧୦|୪୭ ମଧ୍ୟେ , ଘ୧|୧୧ ରୁ ଘ୪|୨୩ ମଧ୍ୟେ , ଅସ୍ତରୁ ରାତ୍ରି ଘ୧୦|୧୫ ମଧ୍ୟେ , ଘ୧୨|୪୦ ରୁ ଘ୨|୧୬ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୨୮ ରୁ ଘ୧୦|୬ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୧୧|୪୪ ରୁ ଘ୧|୧୨ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୨୮ ରୁ ଘ୩|୫୦ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 23,
      date: '23/05/2024',
      day: 'ଗୁରୁବାର ',
      name: 'ଚନ୍ଦନ ଓ ବୁଦ୍ଧ ପୂର୍ଣ୍ଣିମା , ଗୁରୁପୂର୍ଣ୍ଣିମା ବ୍ରତ , ବୈଶାଖ ବ୍ରତ ସମାପନ , ମୁକ୍ତିମଣ୍ଡପ ମହାବିଷ୍ଣୁ ଯଜ୍ଞର ପୂର୍ଣ୍ଣାହୁତି',
      Image: require('../../assets/Images/Konark.png'),
      tithi: '(୨୩) ମଇ , ଗୁରୁବାର (ଜ୍ୟେଷ୍ଠ) ବୃଷ ଦି୧୦ନ , ଜିଲକଜ ତା୧୪ରିଖ , ସାୟନ ଜ୍ୟେଷ୍ଠ ଦି୨ନ',
      sunrise: 'ଘ୫|୧୨|୭',
      sunset: 'ଘ୬|୧୪|୧୯',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୨|୪୭ ରୁ ଘ୫|୧ , ରାତ୍ରି ଘ୭|୫ ରୁ ଘ୯|୨୯ ମଧ୍ୟେ , ଘ୧୨|୪୧ ରୁ ଘ୩|୫ ମଧ୍ୟେ , ଘ୪|୪୨ ରୁ ଘ୫|୧୨ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ପ୍ରାତଃରୁ ଘ୫|୪୯ ମଧ୍ୟେ , ଘ୯|୧୧ ରୁ ଘ୧୦|୪୭ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୩|୦ ରୁ ଘ୬|୧୪ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୪ ରୁ ଘ୧|୬ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 24,
      date: '24/05/2024',
      day: 'ଶୁକ୍ରବାର',
      name: 'ଦେବର୍ଷି ନାରଦ ଜୟନ୍',
      Image: require('../../assets/Images/rathaImg.jpeg'),
      tithi: '(୨୪) ମଇ , ଶୁକ୍ରବାର (ଜ୍ୟେଷ୍ଠ) ବୃଷ ଦି୧୧ନ , ଜିଲକଜ ତା୧୫ରିଖ , ସାୟନ ଜ୍ୟେଷ୍ଠ ଦି୩ନ',
      sunrise: 'ଘ୫|୧୧|୫୪',
      sunset: 'ଘ୬|୧୪|୪୨',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୧୧|୩୫ ରୁ ଘ୧|୫୯ ମଧ୍ୟେ , ଅସ୍ତରୁ ରାତ୍ରି ଘ୮|୪୧ ମଧ୍ୟେ , ଘ୧|୨୯ ରୁ ଘ୩|୫୩ ମଧ୍ୟେ , ଘ୪|୪୧ ରୁ ୫|୧୧ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ପ୍ରାତଃରୁ ଘ୫|୫୯ ମଧ୍ୟେ , ଘ୯|୧୧  ରୁ ଘ୯|୫୯ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୮|୨୮ ରୁ ଘ୧୧୧|୪୬ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୯|୦ ରୁ ଘ୧୦|୨୨ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 25,
      date: '25/05/2024',
      day: 'ଶନିବାର',
      name: '',
      Image: require('../../assets/Images/PuriBeach.png'),
      tithi: '(୨୫) ମଇ , ଶନିବାର (ଜ୍ୟେଷ୍ଠ) ବୃଷ ଦି୧୨ନ , ଜିଲକଜ ତା୧୬ରିଖ , ସାୟନ ଜ୍ୟେଷ୍ଠ ଦି୪ନ',
      sunrise: 'ଘ୫|୧୧|୪୧',
      sunset: 'ଘ୬|୧୫|୫',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୨|୪୭ ରୁ ୫|୧୧ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୩ ରୁ ୭|୫୧ ମଧ୍ୟେ , ଘ୧୧|୫୧ ରୁ ଘ୨|୧୫ ମଧ୍ୟେ , ଘ୩|୫୦ ରୁ ଘ୫|୧୧ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ପ୍ରାତଃରୁ ଘ୬|୦ ମଧ୍ୟେ , ଘ୯|୧୨ ରୁ ଘ୧୧|୩୬ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ପ୍ରାତଃ ଘ୫|୧୨ ରୁ ଘ୬|୫ ମଧ୍ୟେ , ଦିବା ଘ୪|୩୭ ରୁ ୬|୧୫ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧|୨୨ ରୁ ଘ୩|୦ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସନ୍ଧ୍ୟା ଘ୬|୧୫ ରୁ ଘ୭|୩୮ ମଧ୍ୟେ , ରାତ୍ରି ଘ୩|୪୯ ରୁ ଘ୫|୧୧ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 26,
      date: '26/05/2024',
      day: 'ରବିବାର',
      name: 'ଶ୍ରୀମନ୍ଦିରରେ ଶ୍ରୀରାମାଭିଷେକ',
      Image: require('../../assets/Images/PuriTemple.png'),
      tithi: '(୨୬) ମଇ , ରବିବାର (ଜ୍ୟେଷ୍ଠ) ବୃଷ ଦି୧୩ନ , ଜିଲକଜ ତା୧୭ରିଖ , ସାୟନ ଜ୍ୟେଷ୍ଠ ଦି୫ନ',
      sunrise: 'ଘ୫|୧୧|୨୮',
      sunset: 'ଘ୬|୧୫|୩୦',
      gdTime: '(ଅମୃତ) ପ୍ରାତଃରୁ ଦିବା ଘ୬|୪୭ ରୁ ଘ୯|୧୧ ମଧ୍ୟେ , ଘ୧୧|୩୫ ରୁ ଘ୧|୫୯ ମଧ୍ୟେ ,  ଅସ୍ତରୁ ରାତ୍ରି ଘ୭|୫୪ ମଧ୍ୟେ , ଘ୧୧|୬ ରୁ ଘ୧୨|୩୦ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୩୫ ରୁ ଘ୪|୨୩ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୬ ରୁ ଘ୧|୨୩ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୬ ରୁ ଘ୨|୨୮ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 27,
      date: '27/05/2024',
      day: 'ସୋମବାର',
      name: 'ଶରଣ ଆରମ୍ଭ',
      Image: require('../../assets/Images/3rathas.jpg'),
      tithi: '(୨୭) ମଇ , ସୋମବାର (ଜ୍ୟେଷ୍ଠ) ବୃଷ ଦି୧୪ନ , ଜିଲକଜ ତା୧୮ରିଖ , ସାୟନ ଜ୍ୟେଷ୍ଠ ଦି୬ନ',
      sunrise: 'ଘ୫|୧୧|୧୬',
      sunset: 'ଘ୬|୧୫|୫୪',
      gdTime: '(ଅମୃତ) ପ୍ରାତଃରୁ ଦିବା ଘ୮|୨୩ ରୁ ଘ୯|୫୯ ମଧ୍ୟେ , ରାତ୍ରି ଘ୯|୩୦ ରୁ ଘ୧୨|୪୨ ମଧ୍ୟେ , ଘ୨|୧୮ ରୁ ଘ୩|୩୫ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୪|୪୨ ରୁ ନିଶାନ୍ତ ଘ୫|୧୧ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ପ୍ରାତଃ ଘ୬|୪୯ ରୁ ଘ୮|୨୮ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୩|୧ ରୁ ଘ୪|୩୯ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୨୩ ରୁ ଘ୧୧|୪୪ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 28,
      date: '28/05/2024',
      day: 'ମଙ୍ଗଳବାର',
      name: '',
      Image: require('../../assets/Images/Mahaprasad.png'),
      tithi: '(୨୮) ମଇ , ମଙ୍ଗଳବାର (ଜ୍ୟେଷ୍ଠ) ବୃଷ ଦି୧୫ନ , ଜିଲକଜ ତା୧୯ରିଖ , ସାୟନ ଜ୍ୟେଷ୍ଠ ଦି୭ନ',
      sunrise: 'ଘ୫|୧୧|୪',
      sunset: 'ଘ୬|୧୬|୨୦',
      gdTime: '(ଅମୃତ) ପ୍ରାତଃରୁ ଦିବା ଘ୭|୩୫ ମଧ୍ୟେ , ଘ୯|୧୧ ରୁ ଘ୧୧|୩୫ ମଧ୍ୟେ , ଘ୨|୪୭ ରୁ ଘ୩|୩୫ ମଧ୍ୟେ , ଅସ୍ତରୁ ରାତ୍ରି ଘ୭|୫ ମଧ୍ୟେ , ଘ ୧୨|୧୨ ରୁ ଘ୨|୩୬ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୩୫ ରୁ ଘ୪|୨୩ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୪୨ ରୁ ଘ୧୦|୧୮ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୨୩ ରୁ ଘ୩|୨ ମଧ୍ୟେ | (ବାରବେଳା) ପ୍ରାତଃ ଘ୬|୪୯ ରୁ ଘ୮|୨୮ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୪୦ ରୁ ଘ୯|୧ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 29,
      date: '29/05/2024',
      day: 'ବୁଧବାର',
      name: 'ଶ୍ରୀକ୍ଷେତ୍ରେ ଭଉଁରୀ ଯାତ୍ର',
      Image: require('../../assets/EventsImages/MayImages/BhaunriJatra_29.05.24.png'),
      tithi: '(୨୯) ମଇ , ବୁଧବାର (ଜ୍ୟେଷ୍ଠ) ବୃଷ ଦି୧୬ନ , ଜିଲକଜ ତା୨୦ରିଖ , ସାୟନ ଜ୍ୟେଷ୍ଠ ଦି୮ନ',
      sunrise: 'ଘ୫|୧୦|୫୯',
      sunset: 'ଘ୬|୧୬|୪୧',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୭|୩୫ ରୁ ଘ୧୦|୪୭ ମଧ୍ୟେ , ଘ୧|୧୧ ରୁ ଘ୪|୨୩ ମଧ୍ୟେ , ଅସ୍ତରୁ  ରାତ୍ରି ଘ୧୦|୧୯ ମଧ୍ୟେ , ଘ୧୨|୪୩ ରୁ ଘ୨|୧୯ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୨୮ ରୁ ଘ୧୦|୬ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୪୫ ରୁ ଘ୧|୨୩ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୨୮ ରୁ ଘ୩|୪୯ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 30,
      date: '30/05/2024',
      day: 'ଗୁରୁବାର',
      name: 'ଉତ୍କଳେ ଭଉଁରୀ ଯାତ୍ରା , ଶ୍ରୀକ୍ଷେତ୍ର ହଳଦୀପାଣ',
      Image: require('../../assets/Images/Konark.png'),
      tithi: '(୩୦) ମଇ , ଗୁରୁବାର (ଜ୍ୟେଷ୍ଠ) ବୃଷ ଦି୧୭ନ , ଜିଲକଜ ତା୨୧ରିଖ , ସାୟନ ଜ୍ୟେଷ୍ଠ ଦି୯ନ',
      sunrise: 'ଘ୫|୧୦|୫୩',
      sunset: 'ଘ୬|୧୭|୩',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୨|୪୮ ରୁ ଘ୫|୧୧ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୭ ରୁ ଘ୯|୩୧ ମଧ୍ୟେ , ଘ୧୨|୪୩ ରୁ ଘ୩|୭ ମଧ୍ୟେ , ଘ୪|୪୨ ରୁ ନିଶାନ୍ତ ଘ୫|୧୧ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ପ୍ରାତଃରୁ ଘ୫|୫୯ ମଧ୍ୟେ , ଘ୯|୧୧ ରୁ ଘ୧୦|୪୭ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୩|୩ ରୁ ଘ୬|୧୭ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୪୭ ରୁ ଘ୧|୮ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 31,
      date: '31/05/2024',
      day: 'ଶୁକ୍ରବାର',
      name: 'ଶରଣ ଶେଷ',
      Image: require('../../assets/Images/Mahaprasad.png'),
      tithi: '(୩୧) ମଇ , ଶୁକ୍ରବାର (ଜ୍ୟେଷ୍ଠ) ବୃଷ ଦି୧୮ନ , ଜିଲକଜ ତା୨୨ରିଖ , ସାୟନ ଜ୍ୟେଷ୍ଠ ଦି୧୦ନ',
      sunrise: 'ଘ୫|୧୦|୪୮',
      sunset: 'ଘ୬|୧୭|୨୪',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୧୧|୩୫ ରୁ ଘ୧|୫୯ ମଧ୍ୟେ , ଅସ୍ତରୁ ରାତ୍ରି ଘ୮|୪୩ ମଧ୍ୟେ , ଘ୧|୩୨ ରୁ ଘ୩|୫୬ ମଧ୍ୟେ , ଘ୪|୪୫ ରୁ ଘ୫|୧୧ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ପ୍ରାତଃ ଘ୬|୫୭ ମଧ୍ୟେ , ଘ୯|୧୧ ରୁ ଘ୯|୫୯ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୮|୨୬ ରୁ ଘ୧୧|୪୫ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୯|୨ ରୁ ଘ୧୦|୨୩ ପର୍ଯ୍ୟନ୍ତ |',
    },
  ]

  const eventsForEnglishMonth = [
    {
      id: 1,
      date: '01/05/2024',
      day: 'Wednesday',
      name: 'Sri Ramabhishekh ceremony at the temple.',
      spclDesc: '',
      Image: require('../../assets/EventsImages/MayImages/Ramabhishek_1.05.24.png'),
      tithi: '(1) May, Wednesday (Baishakha), Aries 18th day, Swala date 22, evening Baishakha 11th day.',
      sunrise: '5:21:28 AM',
      sunset: '6:06:08 PM',
      gdTime: '(Amrita) from 6:55 AM to 11:43 AM, from 11:43 AM to 1:19 PM, night from 6:56 PM to 9:20 PM, and from 9:00 PM to 5:21 AM. (Maahendra) day from 3:43 AM to 5:18 AM, night from 9:20 PM to 10:56 PM.',
      bdTime: '(Kaala Vela) day from 8:08 AM to 10:09 AM, (Bara Vela) day from 11:46 AM to 1:26 PM, (Kaala Ratri) night from 2:28 AM to 3:50 AM.',
    },
    {
      id: 2,
      date: '02/05/2024',
      day: 'Thursday',
      name: "Jupiter's transit through the Krittika constellation.",
      spclDesc: '',
      Image: require('../../assets/Images/Konark.png'),
      tithi: '(2) May, Thursday (Baishakha), Aries 19th day, Swala date 23, evening Baishakha 12th day. ',
      sunrise: '5:20:52 AM',
      sunset: '6:06:28 PM',
      gdTime: '(Amrita) night from 1:20 AM to 3:44 AM. (Maahendra) from 6:56 AM to 12:30 PM.',
      bdTime: '(Kaala Vela) day from 2:49 PM to 6:06 PM. (Kaala Ratri) night from 11:44 PM to 1:11 AM.',
    },
    {
      id: 3,
      date: '03/05/2024',
      day: 'Friday',
      name: '',
      spclDesc: '',
      Image: require('../../assets/Images/rathaImg.jpeg'),
      tithi: '(3) May, Friday (Baishakha), Aries 20th day, Swala date 24, evening Baishakha 13th day.',
      sunrise: '5:20:17 AM',
      sunset: '6:06:49 PM',
      gdTime: '(Amrita) from 6:55 AM to 6:55 AM. (Maahendra) night from 10:57 PM to 11:45 PM.',
      bdTime: '(Kaala Vela) day from 8:28 AM to 11:44 AM. (Kaala Ratri) night from 8:57 PM to 10:20 PM.',
    },
    {
      id: 4,
      date: '04/05/2024',
      day: 'Saturday',
      name: 'Sarvasammata Baruthini Ekadashi, Sharana Shesha.',
      spclDesc: '',
      Image: require('../../assets/Images/PuriTemple.png'),
      tithi: '(4) May, Saturday (Baishakha), Aries 21st day, Swala date 25, evening Baishakha 14th day.',
      sunrise: '5:19:43 AM',
      sunset: '6:07:11 PM',
      gdTime: '(Amrita) day from 9:17 AM to 12:29 PM, night from 8:30 PM to 10:57 PM, and from 12:33 AM to 2:09 AM, and from 2:57 AM to 4:33 AM.',
      bdTime: '(Kaala Vela) morning from 5:54 AM to 6:35 AM, and from 4:35 PM to 6:07 PM. (Bara Vela) day from 1:26 PM to 2:56 PM. (Kaala Ratri) night from 7:32 PM to 10:19 PM, and from 3:14 AM to 5:19 AM.',
    },
    {
      id: 5,
      date: '05/05/2024',
      day: 'Sunday',
      name: '',
      spclDesc: '',
      Image: require('../../assets/Images/PuriBeach.png'),
      tithi: '(5) May, Sunday (Baishakha), Aries 22nd day, Swala date 26, evening Baishakha 15th day.',
      sunrise: '5:19:09 AM',
      sunset: '6:06:33 PM',
      gdTime: '(Amrita) day from 6:06 AM to 9:18 AM, night from 7:45 PM to 9:21 PM. (Maahendra) day from 6:06 AM to 6:29 AM, and from 12:29 PM to 1:17 PM, night from 6:57 PM to 7:45 PM, and from 12:33 AM to 3:45 AM.',
      bdTime: '(Kaala Vela) day from 10:07 AM to 1:19 PM, (Kaala Ratri) night from 1:07 AM to 2:28 AM.',
    },
    {
      id: 6,
      date: '06/05/2024',
      day: 'Monday',
      name: '',
      spclDesc: '',
      Image: require('../../assets/Images/Mahaprasad.png'),
      tithi: '(6) May, Monday (Baishakha), Aries 23rd day, Swala date 27, evening Baishakha 16th day.',
      sunrise: '5:18:38 AM',
      sunset: '6:07:54 PM',
      gdTime: '(Amrita) morning from 6:53 AM, day from 10:04 AM to 12:28 PM, evening from 6:58 PM to 9:22 PM, and from 11:46 PM to 2:58 AM. (Maahendra) day from 8:52 AM to 3:28 PM',
      bdTime: '(Kaala Vela) day from 6:52 AM to 8:26 AM, (Bara Vela) day from 2:56 PM to 4:03 PM. (Kaala Ratri) night from 10:19 PM to 11:42 PM.',
    },
    {
      id: 7,
      date: '07/05/2024',
      day: 'Tuesday',
      name: '',
      spclDesc: '',
      Image: require('../../assets/Images/LaxmiPuja.png'),
      tithi: '(7) May, Tuesday (Baisakha) Mesha 24, Wednesday Baisakha 17',
      sunrise: '5:18:9',
      sunset: '6:8:13',
      gdTime: '(Amrit) From 7:40 to 10:4 in the morning, from 12:28 to 2:4 in the afternoon, from 2:52 to 4:28 in the afternoon, and from 6:57 in the evening to 11:46 in the evening; From 2:10 to 4:34 at night.',
      bdTime: '(Kalabela) From 1:23 to 4:2 in the afternoon; (Barabela) From 6:49 to 8:29 in the evening; (Kalaratri) From 7:43 to 9:5 at night.',
    },
    {
      id: 8,
      date: '08/05/2024',
      day: 'Wednesday',
      name: "In the temple and everywhere, it's Rukmini Amavasya.",
      spclDesc: '',
      Image: require('../../assets/EventsImages/MayImages/RukmaniAmabasya_8.05.24.png'),
      tithi: '(8) May, Wednesday (Baisakha) Mesha 25, Thursday Baisakha 18',
      sunrise: '5:17:39',
      sunset: '6:8:35',
      gdTime: '(Amrit) From 6:52 in the morning to 7:15 in the morning, from 6:59 in the evening to 9:23 in the evening, and from 2:12 to 5:17 in the afternoon; (Mahendra) From 3:40 to 5:16 in the morning, and from 9:23 in the evening to 10:59 at night.',
      bdTime: '(Kalabela) From 8:27 to 10:7 in the morning; (Barabela) From 11:43 to 1:21 in the afternoon; (Kalaratri) From 2:27 to 3:49 at night.',
    },
    {
      id: 9,
      date: '09/05/2024',
      day: 'Thursday',
      name: 'Second lunar observation.',
      spclDesc: '',
      Image: require('../../assets/Images/Konark.png'),
      tithi: '(9) May, Thursday (Baisakha) Mesha 26, Friday Baisakha 19',
      sunrise: '5:17:10',
      sunset: '6:8:58',
      gdTime: '(Amrit) From 1:20 to 3:44 at night; (Mahendra) From 6:56 in the morning to 12:32 in the afternoon.',
      bdTime: '(Kalabela) From 2:56 to 6:9 in the morning; (Kalaratri) From 11:43 at night to 1:5 in the morning.',
    },
    {
      id: 10,
      date: '10/05/2024',
      day: 'Friday',
      name: 'Akshaya Tritiya, beginning of Chandan Yatra, favorable for chariot.',
      spclDesc: '',
      Image: require('../../assets/EventsImages/MayImages/AkshayaTritiya_10.05.24.png'),
      tithi: '(10) May, Friday (Baisakha) Mesha 27, Saturday Taurus 20',
      sunrise: '5:16:41',
      sunset: '6:9:21',
      gdTime: '(Amrit) From 6:53 in the morning to 10:4 in the morning; from 12:28 to 2:4 in the afternoon; from 3:40 to 5:16 in the evening; from 6:43 to 9:19 at night; (Mahendra) From 10:55 at night to 11:43 at night.',
      bdTime: '(Kalabela) From 8:26 to 11:42 in the morning; (Kalaratri) From 8:59 at night to 10:21 at night.',
    },
    {
      id: 11,
      date: '11/05/2024',
      day: 'Saturday',
      name: '',
      spclDesc: '',
      Image: require('../../assets/Images/KhajaBhoga.png'),
      tithi: '(11)May , Saturday (Baisakha), Mesha 28, Gemini 21 ',
      sunrise: '5:16:13',
      sunset: '6:9:43',
      gdTime: '(Amrit) From 6:50 to 5:14 in the morning; from 7:0 to 7:48 in the evening; from 11:48 to 12:12 at noon; from 3:49 to the end of the night; (Mahendra) From morning to day 6:2, from 9:14 to 11:38.',
      bdTime: '(Kalabela) From 6:50 in the morning to 6:10; (Barabela) From 7:21 to 6:59 in the morning; (Kalaratri) From 7:36 in the evening to the end of the night; from 3:50 to 5:16.',
    },
    {
      id: 12,
      date: '12/05/2024',
      day: 'Sunday',
      name: 'Shrimad Adi Shankaracharya Jayanti',
      spclDesc: '',
      Image: require('../../assets/Images/rathaImg.jpeg'),
      tithi: '(12) May, Sunday (Baisakha), Mesha 29, Gemini 22 ',
      sunrise: '5:15:45',
      sunset: '6:10:07',
      gdTime: '(Amrit) From 6:50 to 9:14 in the morning; from 11:38 to 12:02 at noon; from 7:47 to the end of the night; from 10:59 to 11:23 at night; (Mahendra) From morning to day 3:38, from 10:59 to 11:27.',
      bdTime: '(Barabela) From 10:05 to 10:21 in the morning; (Kalaratri) From 7:18 to 7:27 at night.',
    },
    {
      id: 13,
      date: '13/05/2024',
      day: 'Monday',
      name: 'Shri Ramanujacharya Jayanti, Maasanta',
      spclDesc: '',
      Image: require('../../assets/Images/PuriTemple.png'),
      tithi: '(13 ) May, Monday (Baisakha), Mesha 30, Gemini 23',
      sunrise: '5:15:01',
      sunset: '6:10:29',
      gdTime: '(Amrit) From 6:51 to 10:03 in the morning; from 10:27 to 12:27 at noon; from 6:58 to 9:22 in the evening; from 11:46 to 12:58 at night; (Mahendra) From 2:51 to 4:27 in the afternoon.',
      bdTime: '(Kaalabela) From 6:49 to 8:27 in the morning; (Barabela) From 2:05 to 4:29 in the afternoon; (Kalaratri) From 10:21 to 11:43 at night.',
    },
    {
      id: 14,
      date: '14/05/2024',
      day: 'Tuesday',
      name: 'Vrish Sankranti',
      spclDesc: '',
      Image: require('../../assets/Images/3rathas.jpg'),
      tithi: '( 14) May, Tuesday (Jyeshtha), Mesha 1, Jilakaj 5, evening of Baisakha 24',
      sunrise: '5:14:56',
      sunset: '6:10:52',
      gdTime: '(Amrita) From morning 7:39 to 11:39, from 9:15 to 11:39, from 2:51 to 3:39, from 6:59 to 12:53 at night, from 12:53 to 2:59, (Mahendra) From 2:3 to 2:51, from 3:39 to 4:27, from 8:35 to 10:11 at night.',
      bdTime: '(Kalabela) From 1:26 to 3:00, (Barabela) From 6:49 to 8:27 in the evening, (Kalaratri) From 7:38 to 9:00 at night.',
    },
    {
      id: 15,
      date: '15/05/2024',
      day: 'Wednesday',
      name: 'On the auspicious occasion of Niladri Mahodaya Ashtami, Budha Ashtami Snana, and the entry of the 52nd year.',
      spclDesc: '',
      Image: require('../../assets/EventsImages/MayImages/NiladriMahodayasthami_15.05.24.png'),
      tithi: '(15) May , Wednesday (Jyeshtha), Vrishadwitiya, Jilakaj 6, evening of Baisakha 25',
      sunrise: '5:14:34',
      sunset: '6:11:14',
      gdTime: '(Amrita) From morning 7:37 to 10:49, from 1:13 to 4:25, from 10:13 to 12:37 at night',
      bdTime: '(Kalabela) From 8:28 to 10:08 in the morning, (Barabela) From 11:43 to 1:20 in the afternoon, (Kalaratri) From 2:28 to 3:51 at night.',
    },
    {
      id: 16,
      date: '16/05/2024',
      day: 'Thursday',
      name: 'Sita Navami Vrat.',
      spclDesc: '',
      Image: require('../../assets/Images/PuriBeach.png'),
      tithi: '(16)May, Thursday (Jyeshtha), Vrishadwitiya, Jilakaj 7, evening of Baisakha 26.',
      sunrise: '5:14:13',
      sunset: '6:11:35',
      gdTime: '(Amrita) From 2:49 to 5:13 in the afternoon, from 7:02 to 9:26 at night, from 12:38 to 3:02 at midnight, (Mahendra) From morning 6:01 to 10:49.',
      bdTime: '(Kalabela) From 2:59 to 6:12 in the afternoon, (Kalaratri) From 11:46 to 1:07 at night',
    },
    {
      id: 17,
      date: '17/05/2024',
      day: 'Friday',
      name: '',
      spclDesc: '',
      Image: require('../../assets/Images/Mahaprasad.png'),
      tithi: '(17 ) May, Friday (Jyeshtha), Vrishadwitiya, Jilakaj 8, evening of Baisakha 27',
      sunrise: '5:13:52',
      sunset: '6:11:58',
      gdTime: '(Amrita) From 11:36 to 2:00 in the afternoon, from 8:38 to 9:26 at night, from 1:26 to 3:50 in the afternoon, from 4:39 to 5:14, (Mahendra) From morning 6:30 to 6:49, from 9:12 to 10:00 .',
      bdTime: '(Kalabela) From 8:27 to 11:44 in the afternoon, (Kalaratri) From 9:00 to 10:22 at night .',
    },
    {
      id: 18,
      date: '18/05/2024',
      day: 'Saturday',
      name: '',
      spclDesc: '',
      Image: require('../../assets/Images/LaxmiPuja.png'),
      tithi: '(18) May, Saturday (Jyeshtha), Vrishadwitiya, Jilakaj 15, evening of Baisakha 28 .',
      sunrise: '5:13:33',
      sunset: '6:12:21',
      gdTime: '(Amrita) From 2:48 to 5:12 at night, from 7:03 to 7:51 in the evening, from 11:51 to 2:15 at night, (Mahendra) From morning 6:01 to 11:36, from 9:12 to 11:36 .',
      bdTime: '(Kalabela) From morning 5:14 to 6:51, from 4:36 to 6:12 in the evening, (Barabela) From morning 1:21 to 2:59, (Kalaratri) Evening from 6:12 to 7:36, night from 3:50 to 5:13 .',
    },
    {
      id: 19,
      date: '19/05/2024',
      day: 'Sunday',
      name: 'At the Jagannath Temple and everywhere else, Mohini Ekadashi and the observance of Rabinarayan Vrata are being observed.',
      spclDesc: '',
      Image: require('../../assets/EventsImages/MayImages/MohiniEkadashi_19.05.24.png'),
      tithi: '(19) May , Sunday (Jyeshtha), Vrishaditiya, Jilakaj 10, evening of Baisakha 29',
      sunrise: '5:13:13',
      sunset: '6:12:45',
      gdTime: '(Amrita) From morning 6:48 to 9:12, from 11:36 to 12:00, from evening 7:51 to 11:27, (Mahendra) From morning 3:36 to 4:24 .',
      bdTime: '(Kalabela) From morning 10:05 to 11:22, (Kalaratri) Night from 1:07 to 2:27 .',
    },
    {
      id: 20,
      date: '20/05/2024',
      day: 'Monday',
      name: '',
      spclDesc: '',
      Image: require('../../assets/Images/LaxmiPuja.png'),
      tithi: '(20)On May, Monday (Jyeshtha), 11th of Jyeshtha, evening of the month of Baishak.',
      sunrise: '5:12:54 AM',
      sunset: '6:13:10 PM',
      gdTime: "(Amrit) - From 8:24 AM to 10:00 AM, and from 9:27 PM to 12:39 AM. From 2:15 PM to 3:51 PM. In Mahendra's role, from 4:40 PM to 5:13 PM.",
      bdTime: "(Kalabela) - From 6:25 AM to 8:28 AM. In Barabela, from 2:59 PM to 4:37 PM. In Kalaraatri, from 10:21 PM to 11:43 PM.",
    },
    {
      id: 21,
      date: '21/05/2024',
      day: 'Tuesday',
      name: '',
      spclDesc: '',
      Image: require('../../assets/Images/Konark.png'),
      tithi: '( 21) May, Tuesday (Jyeshtha), 12th of Jyeshtha, evening of the month of Baishak.',
      sunrise: '5:12:35 AM',
      sunset: '6:13:35 PM',
      gdTime: "(Amrit) - From 7:37 AM to 10:36 AM, and from 7:04 PM to 12:04 AM. From 12:40 PM to 3:04 PM. In Mahendra's role, from 10:00 AM to 10:48 AM, from 11:36 AM to 12:24 PM, and from 8:40 PM to 10:16 PM.",
      bdTime: "(Kalabela) - From 1:23 AM to 3:02 AM. In Barabela, from 6:48 AM to 8:26 AM. In Kalaraatri, from 7:40 PM to 9:02 PM.",
    },
    {
      id: 22,
      date: '22/05/2024',
      day: 'Wednesday',
      name: '',
      spclDesc: '',
      Image: require('../../assets/EventsImages/MayImages/NursinghaJanma_22.05.24.png'),
      tithi: '(22) May, Wednesday (Jyeshtha), 13th of Jyeshtha, evening of the month of Savala.',
      sunrise: '5:12:21 AM',
      sunset: '6:13:57 PM',
      gdTime: '(Amrit) - From 7:35 AM to 10:47 AM, from 11:11 AM to 4:23 PM. From 10:15 PM to 12:16 AM.',
      bdTime: '(Kalabela) - From 8:28 AM to 10:06 AM. In Barabela, from 11:44 AM to 1:12 PM. In Kalaraatri, from 2:28 AM to 3:50 AM.',
    },
    {
      id: 23,
      date: '23/05/2024',
      day: 'Thursday',
      name: "Chandan and Buddha Purnima, Guru Purnima Vrat, completion of Vaishakha Vrat, Muktimaṇḍapa Mahāviṣṇu Yajna's completion ceremony.",
      spclDesc: '',
      Image: require('../../assets/Images/KhajaBhoga.png'),
      tithi: '(23) May, Thursday (Jyeshtha), 14th of Jyeshtha, evening of the month of Savala. ',
      sunrise: '5:12:7 AM',
      sunset: '6:14:19 PM',
      gdTime: '(Amrit) - From 2:47 AM to 5:01 AM, from 7:05 AM to 9:29 AM, from 12:41 PM to 3:05 PM, from 4:42 PM to 5:12 PM. For Mahendra, from 5:49 AM to 10:47 AM.',
      bdTime: '(Kalabela) - From 3:00 AM to 6:14 AM. In Kalaraatri, from 11:04 PM to 12:06 AM.',
    },
    {
      id: 24,
      date: '24/05/2024',
      day: 'Friday',
      name: 'Devarshi Narada Jayanti.',
      spclDesc: '',
      Image: require('../../assets/Images/PuriTemple.png'),
      tithi: '(24) May , Friday (Jyeshtha), 15th of Jyeshtha, evening of the month of Savala.',
      sunrise: '5:11:54 AM',
      sunset: '6:14:42 PM',
      gdTime: '(Amrit) - From 11:35 AM to 11:59 AM, from 8:41 PM to 9:53 PM, from 10:41 PM to 11:11 PM. For Mahendra, from 5:59 AM to 5:59 PM.',
      bdTime: '(Kalabela) - From 8:28 AM to 11:46 AM. In Kalaraatri, from 9:00 PM to 10:22 PM.',
    },
    {
      id: 25,
      date: '25/05/2024',
      day: 'Saturday',
      name: '',
      spclDesc: '',
      Image: require('../../assets/Images/rathaImg.jpeg'),
      tithi: '(25 ) May, Saturday (Jyeshtha), 16th of Jyeshtha, evening of the month of Savala.',
      sunrise: '5:11:41 AM',
      sunset: '6:15:05 PM',
      gdTime: '(Amrit) - From 2:47 AM to 5:11 AM, from 7:03 PM to 7:51 PM, from 11:51 PM to 12:15 AM. For Mahendra, from 6:00 AM to 6:36 AM.',
      bdTime: '(Kalabela) - Morning from 5:12 AM to 6:05 AM, day from 4:37 PM to 6:15 PM. (Barabela) Day from 1:22 PM to 3:00 PM. In Kalaraatri, evening from 6:15 PM to 7:38 PM, night from 3:49 AM to 5:11 AM.',
    },
    {
      id: 26,
      date: '26/05/2024',
      day: 'Sunday',
      name: 'Shriram Abhishek in the temple',
      spclDesc: '',
      Image: require('../../assets/Images/3rathas.jpg'),
      tithi: '(26)  May, Sunday (Jyeshtha), 17th of Jyeshtha, evening of the month of Savala.',
      sunrise: '5:11:28 AM',
      sunset: '6:15:30 PM',
      gdTime: '(Amrit) - From 6:47 AM to 9:11 AM, from 11:35 AM to 11:59 AM, from 7:54 PM to 8:30 PM. For Mahendra, from 3:35 AM to 4:23 AM.',
      bdTime: '(Kalabela) - Morning and day from 10:06 AM to 11:23 AM. In Kalaraatri, night from 1:06 AM to 2:28 AM.',
    },
    {
      id: 27,
      date: '27/05/2024',
      day: 'Monday',
      name: 'Beginning of the Sharana',
      spclDesc: '',
      Image: require('../../assets/Images/PuriBeach.png'),
      tithi: '(May 27) Monday (Jyeshtha) Baisakh 14, in Puri.',
      sunrise: '5:11:16 AM',
      sunset: '6:15:54 PM',
      gdTime: '(Amrit) - From 8:23 AM to 9:59 AM, from 9:30 PM to 12:42 AM, and from 2:18 AM to 3:35 AM. (according to Mahendra) Night from 10:42 PM to 5:11 AM.',
      bdTime: '(Kalabela) - Morning from 6:49 AM to 8:28 AM, noon from 3:01 PM to 4:39 PM, and night from 10:23 PM to 11:44 PM.',
    },
    {
      id: 28,
      date: '28/05/2024',
      day: 'Tuesday',
      name: '',
      spclDesc: '',
      Image: require('../../assets/Images/Mahaprasad.png'),
      tithi: '(May 28) Tuesday (Jyeshtha) Baisakh 15, in Puri.',
      sunrise: '5:11:04 AM',
      sunset: '6:16:20 PM',
      gdTime: '(Amrit) - From 7:35 AM to 11:35 AM, from 9:11 PM to 11:35 PM, from 10:47 PM to 3:35 AM. (according to Mahendra) Night from 7:05 PM to 12:12 AM.',
      bdTime: '(Kalabela) -Morning from 1:23 AM to 3:02 AM, noon from 6:49 AM to 8:28 AM, and night from 7:40 PM to 9:01 PM.',
    },
    {
      id: 29,
      date: '29/05/2024',
      day: 'Wednesday',
      name: 'Bhaunri Yatra at Srikhetra',
      spclDesc: '',
      Image: require('../../assets/EventsImages/MayImages/BhaunriJatra_29.05.24.png'),
      tithi: '(29) May, Wednesday (Jyeshtha) Baisakh 16, in Puri.',
      sunrise: '5:10:59 AM',
      sunset: '6:16:41 PM',
      gdTime: '(Amrit) - From 7:35 AM to 10:47 AM, from 11:11 AM to 4:23 PM, and night from 7:19 PM to 12:19 AM.',
      bdTime: '(Kalabela) -Morning from 8:28 AM to 10:06 AM, noon from 11:45 AM to 1:23 PM, and night from 2:28 AM to 3:49 AM.',
    },
    {
      id: 30,
      date: '30/05/2024',
      day: 'Thursday',
      name: 'Bhaunri Yatra at Utkal, Sri Kshetra, and Haladipani.',
      spclDesc: '',
      Image: require('../../assets/Images/Konark.png'),
      tithi: 'May 30, Thursday (Jyeshtha), 17th of the month of Baisakh, 21st day of the week, evening of Jyeshtha, 9th day.',
      sunrise: '5:53 AM',
      sunset: '6:17 PM',
      gdTime: '(Amrit) - From 2:48 AM to 5:11 AM, from 7:07 PM to 9:31 PM, from 12:43 PM to 3:07 PM, and from 4:42 AM to 5:11 AM. (according to Mahendra, from 5:59 AM to 10:47 AM)',
      bdTime: '(Kalabela) - From 3:03 AM to 6:17 AM, from 11:45 AM to 1:23 PM, from 11:47 PM to 5:11 AM. (according to Mahendra, from 3:03 AM to 6:17 AM, from 11:47 PM to 1:08 AM)',
    },
    {
      id: 31,
      date: '31/05/2024',
      day: '',
      name: 'End of the Sharana.',
      spclDesc: '',
      Image: require('../../assets/Images/KhajaBhoga.png'),
      tithi: 'May 31, Friday (Jyeshtha), 18th of the month of Baisakh, 22nd day of the week, evening of Jyeshtha, 10th day.',
      sunrise: '5:48 AM',
      sunset: '6:24 PM ',
      gdTime: '(Amrit) - From 11:35 AM to 11:59 AM, from 8:43 PM to 8:56 PM, from 1:32 PM to 3:56 PM, and from 4:45 PM to 5:11 PM. (according to Mahendra, from 6:57 AM to 9:59 AM)',
      bdTime: '(Kalabela) - From 8:26 AM to 11:45 AM, from 9:02 PM to 10:23 PM, from 9:02 PM to 10:23 PM. (according to Mahendra, from 9:02 PM to 10:23 PM)',
    },
  ]

  const CUSTOMOdia_DATE = [
    { id: 1, showDate: '୨୮', disable: 'yes', date: '28/04/2024', spclEvent: 'no' },
    { id: 2, showDate: '୨୯', disable: 'yes', date: '29/04/2024', spclEvent: 'no' },
    { id: 3, showDate: '୩୦', disable: 'yes', date: '30/04/2024', spclEvent: 'no' },
    { id: 4, showDate: '୧', disable: 'no', date: '01/05/2024', spclEvent: 'yes' },
    { id: 5, showDate: '୨', disable: 'no', date: '02/05/2024', spclEvent: 'yes' },
    { id: 6, showDate: '୩', disable: 'no', date: '03/05/2024', spclEvent: 'no' },
    { id: 7, showDate: '୪', disable: 'no', date: '04/05/2024', spclEvent: 'yes' },
    { id: 8, showDate: '୫', disable: 'no', date: '05/05/2024', spclEvent: 'no' },
    { id: 9, showDate: '୬', disable: 'no', date: '06/05/2024', spclEvent: 'no' },
    { id: 10, showDate: '୭', disable: 'no', date: '07/05/2024', spclEvent: 'no' },
    { id: 11, showDate: '୮', disable: 'no', date: '08/05/2024', spclEvent: 'yes' },
    { id: 12, showDate: '୯', disable: 'no', date: '09/05/2024', spclEvent: 'yes' },
    { id: 13, showDate: '୧୦', disable: 'no', date: '10/05/2024', spclEvent: 'yes' },
    { id: 14, showDate: '୧୧', disable: 'no', date: '11/05/2024', spclEvent: 'no' },
    { id: 15, showDate: '୧୨', disable: 'no', date: '12/05/2024', spclEvent: 'yes' },
    { id: 16, showDate: '୧୩', disable: 'no', date: '13/05/2024', spclEvent: 'yes' },
    { id: 17, showDate: '୧୪', disable: 'no', date: '14/05/2024', spclEvent: 'yes' },
    { id: 18, showDate: '୧୫', disable: 'no', date: '15/05/2024', spclEvent: 'yes' },
    { id: 19, showDate: '୧୬', disable: 'no', date: '16/05/2024', spclEvent: 'yes' },
    { id: 20, showDate: '୧୭', disable: 'no', date: '17/05/2024', spclEvent: 'no' },
    { id: 21, showDate: '୧୮', disable: 'no', date: '18/05/2024', spclEvent: 'no' },
    { id: 22, showDate: '୧୯', disable: 'no', date: '19/05/2024', spclEvent: 'yes' },
    { id: 23, showDate: '୨୦', disable: 'no', date: '20/05/2024', spclEvent: 'no' },
    { id: 24, showDate: '୨୧', disable: 'no', date: '21/05/2024', spclEvent: 'no' },
    { id: 25, showDate: '୨୨', disable: 'no', date: '22/05/2024', spclEvent: 'no' },
    { id: 26, showDate: '୨୩', disable: 'no', date: '23/05/2024', spclEvent: 'yes' },
    { id: 27, showDate: '୨୪', disable: 'no', date: '24/05/2024', spclEvent: 'yes' },
    { id: 28, showDate: '୨୫', disable: 'no', date: '25/05/2024', spclEvent: 'no' },
    { id: 29, showDate: '୨୬', disable: 'no', date: '26/05/2024', spclEvent: 'yes' },
    { id: 30, showDate: '୨୭', disable: 'no', date: '27/05/2024', spclEvent: 'yes' },
    { id: 31, showDate: '୨୮', disable: 'no', date: '28/05/2024', spclEvent: 'no' },
    { id: 32, showDate: '୨୯', disable: 'no', date: '29/05/2024', spclEvent: 'yes' },
    { id: 33, showDate: '୩୦', disable: 'no', date: '30/05/2024', spclEvent: 'yes' },
    { id: 34, showDate: '୩୧', disable: 'no', date: '31/05/2024', spclEvent: 'yes' },
    { id: 35, showDate: '୧', disable: 'yes', date: '01/06/2024', spclEvent: 'no' },
  ];

  const CUSTOMEnglish_DATE = [
    { id: 1, showDate: '28', disable: 'yes', date: '28/04/2024', spclEvent: 'no' },
    { id: 2, showDate: '29', disable: 'yes', date: '29/04/2024', spclEvent: 'no' },
    { id: 3, showDate: '30', disable: 'yes', date: '30/04/2024', spclEvent: 'no' },
    { id: 4, showDate: '1', disable: 'no', date: '01/05/2024', spclEvent: 'yes' },
    { id: 5, showDate: '2', disable: 'no', date: '02/05/2024', spclEvent: 'yes' },
    { id: 6, showDate: '3', disable: 'no', date: '03/05/2024', spclEvent: 'no' },
    { id: 7, showDate: '4', disable: 'no', date: '04/05/2024', spclEvent: 'yes' },
    { id: 8, showDate: '5', disable: 'no', date: '05/05/2024', spclEvent: 'no' },
    { id: 9, showDate: '6', disable: 'no', date: '06/05/2024', spclEvent: 'no' },
    { id: 10, showDate: '7', disable: 'no', date: '07/05/2024', spclEvent: 'no' },
    { id: 11, showDate: '8', disable: 'no', date: '08/05/2024', spclEvent: 'yes' },
    { id: 12, showDate: '9', disable: 'no', date: '09/05/2024', spclEvent: 'yes' },
    { id: 13, showDate: '10', disable: 'no', date: '10/05/2024', spclEvent: 'yes' },
    { id: 14, showDate: '11', disable: 'no', date: '11/05/2024', spclEvent: 'no' },
    { id: 15, showDate: '12', disable: 'no', date: '12/05/2024', spclEvent: 'yes' },
    { id: 16, showDate: '13', disable: 'no', date: '13/05/2024', spclEvent: 'yes' },
    { id: 17, showDate: '14', disable: 'no', date: '14/05/2024', spclEvent: 'yes' },
    { id: 18, showDate: '15', disable: 'no', date: '15/05/2024', spclEvent: 'yes' },
    { id: 19, showDate: '16', disable: 'no', date: '16/05/2024', spclEvent: 'yes' },
    { id: 20, showDate: '17', disable: 'no', date: '17/05/2024', spclEvent: 'no' },
    { id: 21, showDate: '18', disable: 'no', date: '18/05/2024', spclEvent: 'no' },
    { id: 22, showDate: '19', disable: 'no', date: '19/05/2024', spclEvent: 'yes' },
    { id: 23, showDate: '20', disable: 'no', date: '20/05/2024', spclEvent: 'no' },
    { id: 24, showDate: '21', disable: 'no', date: '21/05/2024', spclEvent: 'no' },
    { id: 25, showDate: '22', disable: 'no', date: '22/05/2024', spclEvent: 'no' },
    { id: 26, showDate: '23', disable: 'no', date: '23/05/2024', spclEvent: 'yes' },
    { id: 27, showDate: '24', disable: 'no', date: '24/05/2024', spclEvent: 'yes' },
    { id: 28, showDate: '25', disable: 'no', date: '25/05/2024', spclEvent: 'no' },
    { id: 29, showDate: '26', disable: 'no', date: '26/05/2024', spclEvent: 'yes' },
    { id: 30, showDate: '27', disable: 'no', date: '27/05/2024', spclEvent: 'yes' },
    { id: 31, showDate: '28', disable: 'no', date: '28/05/2024', spclEvent: 'no' },
    { id: 32, showDate: '29', disable: 'no', date: '29/05/2024', spclEvent: 'yes' },
    { id: 33, showDate: '30', disable: 'no', date: '30/05/2024', spclEvent: 'yes' },
    { id: 34, showDate: '31', disable: 'no', date: '31/05/2024', spclEvent: 'yes' },
    { id: 35, showDate: '1', disable: 'yes', date: '01/06/2024', spclEvent: 'no' },
  ];

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [spinner, setSpinner] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const openModal = () => { setModalVisible(true) };
  const closeModal = () => { setModalVisible(false) };
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [mainData, setMainData] = useState(eventsForEnglishMonth);
  const [mainShowDate, setMainShowDate] = useState(CUSTOMEnglish_DATE);
  const [selectedTimeZone, setSelectedTimeZone] = useState('Asia/Kolkata');
  const [timeZones, setTimeZones] = useState([]);
  const [currentTime, setCurrentTime] = useState(moment().tz(selectedTimeZone).format('LTS'));

  const filteredData = mainData.filter(event =>
    moment(event.date, 'DD/MM/YYYY').isSameOrAfter(moment(), 'day') &&
    event.name.trim() !== ""
  );

  useEffect(() => {
    setTimeZones(moment.tz.names());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().tz(selectedTimeZone).format('LTS'));
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedTimeZone]);

  useEffect(() => {
    const fetchLanguage = async () => {
      try {
        setSpinner(true)
        const language = await AsyncStorage.getItem('selectedLanguage');
        console.log("language", language);
        if (language) {
          setSpinner(false)
          setSelectedLanguage(language);
          setMainData(language === "Odia" ? eventsForOdiaMonth : eventsForEnglishMonth);
          setMainShowDate(language === "Odia" ? CUSTOMOdia_DATE : CUSTOMEnglish_DATE);
        }
      } catch (error) {
        setSpinner(false)
        setSelectedLanguage("English");
        setMainShowDate(CUSTOMEnglish_DATE);
        console.error('Error checking selected language:', error);
      }
    };

    if (isFocused) {
      fetchLanguage();
    }
  }, [isFocused]);

  const convertToOdiaNumerals = (number) => {
    const odiaNumerals = ['୦', '୧', '୨', '୩', '୪', '୫', '୬', '୭', '୮', '୯'];
    return number.toString().split('').map(digit => odiaNumerals[parseInt(digit)]).join('');
  };

  const convertToOdiaMonth = (englishMonth) => {
    const odiaMonths = ['ଜାନୁଆରୀ', 'ଫେବ୍ରୁଆରୀ', 'ମାର୍ଚ୍ଚ', 'ଏପ୍ରିଲ', 'ମଇ', 'ଜୁନ', 'ଜୁଲାଇ', 'ଅଗଷ୍ଟ', 'ସେପ୍ଟେମ୍ବର', 'ଅକ୍ଟୋବର', 'ନଭେମ୍ବର', 'ଡିସେମ୍ବର'];
    return odiaMonths[englishMonth - 1];
  };

  const formatDateByLanguage = (date) => {
    // console.log("object", new Date() + "-" + date);
    let formatedDate = '';
    if (selectedLanguage === "Odia") {
      const [day, month, year] = date.split('/');
      const odiaDay = convertToOdiaNumerals(day);
      const odiaMonth = convertToOdiaMonth(parseInt(month));
      formatedDate = `${odiaDay} ${odiaMonth}`;
    } else {
      formatedDate = moment(date, 'DD/MM/YYYY').format('Do MMMM');
    }
    return formatedDate;
  }

  const onDateChange = (targetDate) => {
    const event = mainData.find(item => item.date === targetDate);
    setSelectedDate(event.date);
    if (event) {
      console.log("Event:", event);
      navigation.navigate('FullPage_details', event);
    } else {
      console.log("Event not found for date:", targetDate);
    }
  }

  const numToOdia = (num) => {
    const odiaNums = ["୦", "୧", "୨", "୩", "୪", "୫", "୬", "୭", "୮", "୯"];
    return num.toString().split('').map(n => odiaNums[n]).join('');
  }

  const upcomingevents = (eventDate) => {
    let upcomingLabel = "";
    const formartTodayDate = moment(new Date()).format("DD/MM/YYYY")
    const today_date = moment(formartTodayDate, "DD/MM/YYYY");
    const event_date = moment(eventDate, "DD/MM/YYYY");
    const diffDays = event_date.diff(today_date, 'days');
    if (diffDays === 0) {
      if (selectedLanguage === "Odia") {
        upcomingLabel = "ଆଜି";
      } else {
        upcomingLabel = "Today";
      }
    } else {
      if (selectedLanguage === "Odia") {
        upcomingLabel = numToOdia(diffDays) + " " + "ଦିନ ପରେ"
      } else {
        upcomingLabel = "After" + " " + diffDays.toString() + " " + "Day's"
      }
    }
    return upcomingLabel;
  }

  const todayDayInOdia = () => {
    const odiaDays = {
      'Monday': 'ସୋମବାର',
      'Tuesday': 'ମଙ୍ଗଳବାର',
      'Wednesday': 'ବୁଧବାର',
      'Thursday': 'ଗୁରୁବାର',
      'Friday': 'ଶୁକ୍ରବାର',
      'Saturday': 'ଶନିବାର',
      'Sunday': 'ରବିବାର'
    };

    let today_day = moment().format('dddd');
    let odia_day = odiaDays[today_day];

    return odia_day;
  }

  const todayDateInOdia = () => {
    const odiaNumerals = {
      '0': '୦',
      '1': '୧',
      '2': '୨',
      '3': '୩',
      '4': '୪',
      '5': '୫',
      '6': '୬',
      '7': '୭',
      '8': '୮',
      '9': '୯'
    };

    let today_date = moment().format("DD");
    let odia_date = "";

    for (let i = 0; i < today_date.length; i++) {
      odia_date += odiaNumerals[today_date[i]];
    }

    return odia_date;
  }

  const currentMonthYearInOdia = () => {
    const odiaMonths = ["ଜାନୁଆରୀ", "ଫେବୃଆରୀ", "ମାର୍ଚ୍ଚ", "ଅପ୍ରେଲ", "ମଇ", "ଜୁନ", "ଜୁଲାଇ", "ଅଗଷ୍ଟ", "ସେପ୍ଟେମ୍ବର", "ଅକ୍ଟୋବର", "ନଭେମ୍ବର", "ଡିସେମ୍ବର"];
    const odiaNumerals = { '0': '୦', '1': '୧', '2': '୨', '3': '୩', '4': '୪', '5': '୫', '6': '୬', '7': '୭', '8': '୮', '9': '୯' };

    // Get current month and year
    let currentMonth = moment().month(); // returns the month (0 to 11)
    let currentYear = moment().year(); // returns the year

    // Get Odia month
    let odiaMonth = odiaMonths[currentMonth];

    // Convert year to Odia numerals
    let odiaYear = currentYear.toString().split('').map(digit => odiaNumerals[digit]).join('');

    // Return Odia month and year
    return odiaMonth + " " + odiaYear;
  }

  const [tithi, setTithi] = useState("");
  const [todayEventData, setTodayEventData] = useState({});

  useEffect(() => {
    const storeTodayData = async () => {
      const formartTodayDate = moment(new Date()).format('DD/MM/YYYY');
      let today_data = await AsyncStorage.getItem('todayData');
      today_data = today_data ? JSON.parse(today_data) : null;
      // console.log("today_data-=-=-=-=111", today_data?.todayData?.tithi, today_data ? today_data.selectedLanguage : undefined);
      const today_date = today_data ? today_data.todayData.date : null;
      const language = (await AsyncStorage.getItem('selectedLanguage')) || "English";
      const eventsForMonth = language === "Odia" ? eventsForOdiaMonth : eventsForEnglishMonth;

      if (!today_data || formartTodayDate !== today_date || language !== today_data?.selectedLanguage) {
        const todayData = eventsForMonth.find(data => data.date === formartTodayDate);
        // console.log("selectedLanguag=-=-=-=-e", !today_data, formartTodayDate !== today_date, language !== today_data?.selectedLanguage);
        await AsyncStorage.setItem('todayData', JSON.stringify({ todayData: todayData, selectedLanguage: language }));
        setTodayEventData(todayData);
        let text = todayData.tithi;
        let words = text.split(" ");
        let tithi = words.slice(4).join(" ");
        setTithi(tithi);
      } else {
        setTodayEventData(today_data.todayData);
        let text = today_data?.todayData?.tithi;
        let words = text.split(" ");
        let tithi = words.slice(4).join(" ");
        setTithi(tithi);
      }
    }

    if (isFocused) {
      storeTodayData();
    }
  }, [isFocused])

  const goToTodayPage = () => {
    // console.log("formartTodayDate", todayEventData);
    navigation.navigate('FullPage_details', todayEventData);
  }

  return (
    <SafeAreaView style={styles.container}>
      <DrawerModal visible={isModalVisible} navigation={navigation} onClose={closeModal} pageActiveValue={"events"} />
      <View style={styles.headerPart}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600', marginBottom: 3, marginLeft: 10 }}>Events</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={openModal} style={{ marginRight: 8, marginLeft: 20 }}>
            <Octicons name="three-bars" color={'#fff'} size={25} />
          </TouchableOpacity>
        </View>
      </View>
      {spinner === true ?
        <View style={{ top: '30%' }}>
          <ActivityIndicator size="large" color="#B7070A" />
        </View>
        :
        <View style={{ flex: 1, backgroundColor: '#FFC500' }}>
          <View style={{ backgroundColor: '#fff', width: '100%', paddingBottom: 10 }}>
            <View style={{ alignItems: 'center', paddingVertical: 10, borderColor: '#FFC500', borderWidth: 0.6, flexDirection: 'row', justifyContent: 'space-around' }}>
              <TouchableOpacity onPress={() => navigation.navigate('April2024')}>
                <AntDesign name="caretleft" color={'#000'} size={25} />
              </TouchableOpacity>
              {selectedLanguage === "Odia" &&
                <Text style={{ color: '#000', fontSize: 17, fontWeight: '600' }}>ମଇ  ୨୦୨୪</Text>
              }
              {selectedLanguage === "English" &&
                <Text style={{ color: '#000', fontSize: 17, fontWeight: '600' }}>May  2024</Text>
              }
              <TouchableOpacity onPress={() => navigation.replace('June2024')}>
                <AntDesign name="caretright" color={'#000'} size={25} />
              </TouchableOpacity>
            </View>
            <View style={{ width: '100%', flexDirection: 'row' }}>
              <View style={styles.dateCell}>
                {selectedLanguage === "English" &&
                  <Text style={{ color: '#fff', fontWeight: '600' }}>SUN</Text>
                }
                {selectedLanguage === "Odia" &&
                  <Text style={{ color: '#fff', fontWeight: '600' }}>ରବି</Text>
                }
              </View>
              <View style={styles.dateCell}>
                {selectedLanguage === "English" &&
                  <Text style={{ color: '#fff', fontWeight: '600' }}>MON</Text>
                }
                {selectedLanguage === "Odia" &&
                  <Text style={{ color: '#fff', fontWeight: '600' }}>ସୋମ</Text>
                }
              </View>
              <View style={styles.dateCell}>
                {selectedLanguage === "English" &&
                  <Text style={{ color: '#fff', fontWeight: '600' }}>TUE</Text>
                }
                {selectedLanguage === "Odia" &&
                  <Text style={{ color: '#fff', fontWeight: '600' }}>ମଙ୍ଗଳ</Text>
                }
              </View>
              <View style={styles.dateCell}>
                {selectedLanguage === "English" &&
                  <Text style={{ color: '#fff', fontWeight: '600' }}>WED</Text>
                }
                {selectedLanguage === "Odia" &&
                  <Text style={{ color: '#fff', fontWeight: '600' }}>ବୁଧ</Text>
                }
              </View>
              <View style={styles.dateCell}>
                {selectedLanguage === "English" &&
                  <Text style={{ color: '#fff', fontWeight: '600' }}>THU</Text>
                }
                {selectedLanguage === "Odia" &&
                  <Text style={{ color: '#fff', fontWeight: '600' }}>ଗୁରୁ</Text>
                }
              </View>
              <View style={styles.dateCell}>
                {selectedLanguage === "English" &&
                  <Text style={{ color: '#fff', fontWeight: '600' }}>FRI</Text>
                }
                {selectedLanguage === "Odia" &&
                  <Text style={{ color: '#fff', fontWeight: '600' }}>ଶୁକ୍ର</Text>
                }
              </View>
              <View style={styles.dateCell}>
                {selectedLanguage === "English" &&
                  <Text style={{ color: '#fff', fontWeight: '600' }}>SAT</Text>
                }
                {selectedLanguage === "Odia" &&
                  <Text style={{ color: '#fff', fontWeight: '600' }}>ଶନି</Text>
                }
              </View>
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={mainShowDate}
              numColumns={7}
              scrollEnabled={false}
              keyExtractor={(key) => {
                return key.id
              }}
              renderItem={(date, index) => {
                return (
                  <View style={{ width: '14.25%', height: 47, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                      style={{ backgroundColor: selectedDate === date.item.date ? "#B7070A" : undefined, width: 35, height: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 100 }}
                      onPress={() => date.item.disable === 'no' ? onDateChange(date.item.date) : undefined}
                    >
                      {date.item.disable === 'no' ?
                        <Text style={{ color: selectedDate === date.item.date ? '#fff' : '#000', fontWeight: '400', fontSize: 16 }}>{date.item.showDate}</Text>
                        :
                        <Text style={{ color: '#cacccb', fontWeight: '400', fontSize: 16, }}>{date.item.showDate}</Text>
                      }
                      {date.item.spclEvent === 'yes' && <View style={{ backgroundColor: selectedDate === date.item.date ? '#fff' : '#B7070A', width: 5, height: 5, borderRadius: 50 }}></View>}
                    </TouchableOpacity>
                  </View>
                )
              }}
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#FFC500', flex: 1, marginBottom: 6 }}>
            <View style={{ backgroundColor: '#f0280a', width: '95%', height: 175, alignSelf: 'center', marginTop: 6, borderRadius: 10, padding: 10, flexDirection: 'column', justifyContent: 'space-evenly' }}>
              <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                {selectedLanguage === "English" && <Text style={{ color: '#fff', fontSize: 24, fontWeight: '600' }}>{moment().format('dddd')}</Text>}
                {selectedLanguage === "Odia" && <Text style={{ color: '#fff', fontSize: 24, fontWeight: '600' }}>{todayDayInOdia()}</Text>}
                <Text style={{ color: '#fff', fontSize: 23, fontWeight: 'bold' }}>{currentTime}</Text>
              </View>
              {selectedLanguage === "English" && <Text style={{ color: '#fff', fontSize: 40, fontWeight: '600' }}>{moment().format("DD")}</Text>}
              {selectedLanguage === "Odia" && <Text style={{ color: '#fff', fontSize: 40, fontWeight: '600' }}>{todayDateInOdia()}</Text>}
              {selectedLanguage === "English" && <Text style={{ color: '#fff', fontSize: 35, fontWeight: '600' }}>{moment().format("MMM YYYY")}</Text>}
              {selectedLanguage === "Odia" && <Text style={{ color: '#fff', fontSize: 35, fontWeight: '600' }}>{currentMonthYearInOdia()}</Text>}
              <Text style={{ color: '#fff', fontSize: 15, fontWeight: '500', marginTop: 5 }}>{tithi}</Text>
            </View>
            {filteredData.length > 0 &&
              <View style={{ width: '97%', height: 190, alignSelf: 'center', marginTop: 3 }}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={mainData.filter(event => moment(event.date, 'DD/MM/YYYY').isSameOrAfter(moment(), 'day'))}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={(event) => {
                    if (event.item.name.trim() !== "") {
                      return (
                        <TouchableOpacity onPress={() => onDateChange(event.item.date)} style={styles.eventItem}>
                          <View style={{ height: '15%', justifyContent: 'center' }}>
                            <Text style={styles.eventDate}>{formatDateByLanguage(event.item.date)}</Text>
                          </View>
                          <View style={{ height: '70%', justifyContent: 'center' }}>
                            <Text style={styles.eventName}>{event.item.name}</Text>
                          </View>
                          <View style={{ width: '100%', height: '15%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ backgroundColor: '#f0280a', paddingHorizontal: 8, borderRadius: 8, justifyContent: 'center' }}>
                              <Text style={{ fontSize: 14, color: '#fff', fontWeight: '400' }}>{upcomingevents(event.item.date)}</Text>
                            </View>
                            <Octicons name="arrow-right" marginRight={20} color={'#000'} size={24} />
                          </View>
                        </TouchableOpacity>
                      )
                    } else {
                      return null;
                    }
                  }}
                />
              </View>
            }
            {/* <View style={{ backgroundColor: '#f0280a', width: '95%', height: 200, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', borderRadius: 10, marginTop: 10 }}>
              <View style={{ width: '50%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.pickerWrapper}>
                  <Picker
                    style={{ backgroundColor: '#000', color: '#fff', width: 170, height: 170 }}
                    selectedValue={selectedTimeZone}
                    onValueChange={(itemValue) => setSelectedTimeZone(itemValue)}
                  >
                    {timeZones.map((zone, index) => (
                      <Picker.Item key={index} label={`${zone} - ${moment().tz(zone).format('LTS')}`} value={zone} color={'#fff'} />
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={{ width: '50%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <AnalogClock
                  style={{}}
                  colorClock="#2196F3"
                  colorNumber="#000000"
                  colorCenter="#00BCD4"
                  colorHour="#FF8F00"
                  colorMinutes="#FFC400"
                  autostart={true}
                  showSeconds
                />
              </View>
            </View> */}
          </ScrollView>
          <View style={{ padding: 0, height: 58, borderRadius: 0, backgroundColor: '#fff', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', margin: 0 }}>
              <View style={{ padding: 0, width: '33%' }}>
                <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" onPress={() => props.navigation.navigate('MainAboutPage')} style={{ backgroundColor: '#fff', padding: 10, flexDirection: 'column', alignItems: 'center' }}>
                  <View style={{ alignItems: 'center' }}>
                    <Entypo name="info-with-circle" color={'#000'} size={22} />
                    <Text style={{ color: '#000', fontSize: 12, fontWeight: '500', marginTop: 4, height: 17 }}>About</Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View style={{ padding: 0, width: '23%' }}>
                <View style={{ backgroundColor: '#fff', padding: 8, height: 90, flexDirection: 'column', alignItems: 'center', bottom: 25, borderRadius: 100 }}>
                  {selectedLanguage === "English" &&
                    <TouchableHighlight onPress={goToTodayPage} activeOpacity={0.6} underlayColor="#DDDDDD" style={{ backgroundColor: '#ffcb44', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 60 }}>
                      <Text style={{ color: '#000', fontSize: 16, fontWeight: '600' }}>Today</Text>
                    </TouchableHighlight>
                  }
                  {selectedLanguage === "Odia" &&
                    <TouchableHighlight onPress={goToTodayPage} activeOpacity={0.6} underlayColor="#DDDDDD" style={{ backgroundColor: '#ffcb44', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 60 }}>
                      <Text style={{ color: '#000', fontSize: 18, fontWeight: '600' }}>ଆଜି</Text>
                    </TouchableHighlight>
                  }
                </View>
              </View>
              <View style={{ padding: 0, width: '33%' }}>
                <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" onPress={() => props.navigation.navigate('MainLanguagePage')} style={{ backgroundColor: '#fff', padding: 10, flexDirection: 'column', alignItems: 'center' }}>
                  <View style={{ alignItems: 'center' }}>
                    <Ionicons name="language" color={'#000'} size={22} />
                    <Text style={{ color: '#000', fontSize: 12, fontWeight: '500', marginTop: 4, height: 17 }}>Language</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
      }
    </SafeAreaView>
  )
}

export default May2024

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  dateCell: {
    paddingVertical: 11,
    width: '14.25%',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: '#FFC500',
    backgroundColor: '#B7070A'
  },
  headerPart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#B7070A',
    paddingVertical: 13,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 13,
    elevation: 5,
  },
  eventItem: {
    width: 300,
    height: 180,
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 13,
    elevation: 5,
    marginVertical: 6
  },
  eventDate: {
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventName: {
    fontSize: 15,
    color: '#000',
    fontWeight: '400'
  },
  pickerWrapper: {
    borderRadius: 100,
    overflow: 'hidden',
  },
})