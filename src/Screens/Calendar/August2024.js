import { SafeAreaView, ScrollView, StyleSheet, Text, View, FlatList, TouchableOpacity, TouchableHighlight, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment-timezone';
import DrawerModal from '../../components/DrawerModal';

const August2024 = (props) => {

    const eventsForOdiaMonth = [
        {
            id: 1,
            date: '01/08/2024',
            day: 'ଗୁରୁବାର',
            name: '',
            Image: require('../../assets/Images/PuriTemple.png'),
            tithi: '(୧) ଅଗଷ୍ଟ , ଗୁରୁବାର (ଶ୍ରାବଣ) କର୍କଟ ଦି୧୭ନ , ମହରମ ତା୨୫ରିଖ , ସାୟନ ଶ୍ରାବଣ ଦି୧୦ନ',
            sunrise: 'ଘ୫|୨୬|୯',
            sunset: 'ଘ୬|୧୯|୪୧',
            gdTime: '(ଅମୃତ) ରାତ୍ରି ଘ୧|୨୯ ରୁ ଘ୩|୫୩ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୩ ମଧ୍ୟେ , ଘ୧୦|୧୬ ରୁ ଘ୧୨|୪୦ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୩|୭ ରୁ ଘ୬|୨୦ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୫୨ ରୁ ଘ୧|୧୬ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 2,
            date: '02/08/2024',
            day: 'ଶୁକ୍ରବାର',
            name: '',
            Image: require('../../assets/Images/PuriBeach.png'),
            tithi: '(୨) ଅଗଷ୍ଟ , ଶୁକ୍ରବାର (ଶ୍ରାବଣ) କର୍କଟ ଦି୧୮ନ , ମହରମ ତା୨୬ରିଖ , ସାୟନ ଶ୍ରାବଣ ଦି୧୧ନ',
            sunrise: 'ଘ୫|୨୬|୨୯',
            sunset: 'ଘ୬|୧୯|୧୩',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୩ ମଧ୍ୟେ , ଘ୭|୫୨ ରୁ ଘ୧୦|୧୬ ମଧ୍ୟେ , ଘ୧୨|୪୦ ରୁ ଘ୨|୧୬ ମଧ୍ୟେ , ଘ୩|୫୨ ରୁ ଘ୫|୨୮ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୫୩ ରୁ ଘ୯|୨୯ ମଧ୍ୟେ , ଘ୩|୫୩ ରୁ ଘ୪|୪୧ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୧୧|୫ ରୁ ଘ୧୧|୫୩ ମଧ୍ୟେ , ଘ୪|୩୯ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୨୬ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୮|୪୦ ରୁ ଘ୧୧|୫୨ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୯|୩ ରୁ ଘ୧୦|୨୮ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 3,
            date: '03/08/2024',
            day: 'ଶନିବାର',
            name: 'ପୁତ୍ରଦା ଏକାଦଶୀ ',
            Image: require('../../assets/Images/Mahaprasad.png'),
            tithi: '(୩) ଅଗଷ୍ଟ , ଶନିବାର (ଶ୍ରାବଣ) କର୍କଟ ଦି୧୯ନ , ମହରମ ତା୨୭ରିଖ , ସାୟନ ଶ୍ରାବଣ ଦି୧୨ନ',
            sunrise: 'ଘ୫|୨୬|୨୬',
            sunset: 'ଘ୬|୧୯|୮',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୯|୨୮ ରୁ ଘ୧୨|୪୦ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୪୦ ରୁ ଘ୧୧|୪ ମଧ୍ୟେ , ଘ୧୨|୪୦ ରୁ ଘ୨|୧୬ ପର୍ଯ୍ୟନ୍ତ , ଘ୩|୪ ରୁ ଘ୪|୪୦ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ପ୍ରାତଃ ଘ୫|୨୬ ରୁ ଘ୭|୨ ମଧ୍ୟେ , ଦିବା ଘ୪|୪୧ ରୁ ଘ୬|୧୯ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧|୨୮ ରୁ ଘ୩|୪ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସୂର୍ଯ୍ୟାସ୍ତ ଘ୬|୧୯ ରୁ ଘ୭|୪୩ ମଧ୍ୟେ , ରାତ୍ରି ଘ୪|୨ ରୁ ନିଶାନ୍ତ ଘ୫|୨୭ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 4,
            date: '04/08/2024',
            day: 'ରବିବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ ଓ ଗୃହିଣା ଚିତାଉ ଅମାବାସ୍ୟା, ଶ୍ରୀଜୀଉଙ୍କର ସୁବର୍ଣ୍ଣ ଚିତାଲାଗି (ଚିତାଉ ଭୋଗ) ଚିତ୍ରକ ପର୍ବ , ସୂର୍ଯ୍ୟମହାତୀ ସ୍ନାନ , ପ୍ରୟାଗ ରାଜରେ ବ୍ୟତିପାତ ସ୍ନାନ',
            Image: require('../../assets/Images/LaxmiPuja.png'),
            tithi: '(୪) ଅଗଷ୍ଟ , ରବିବାର (ଶ୍ରାବଣ) କର୍କଟ ଦି୨୦ନ , ମହରମ ତା୨୮ରିଖ , ସାୟନ ଶ୍ରାବଣ ଦି୧୩ନ',
            sunrise: 'ଘ୫|୨୭|୧୦',
            sunset: 'ଘ୬|୧୮|୧୪',
            gdTime: '(ଅମୃତ) ପ୍ରାତଃ ଘ୬|୧୬ ରୁ ୯|୨୮ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୫୧ ରୁ ଘ୯|୨୭ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ପ୍ରାତଃ ଘ୬|୧୬ ମଧ୍ୟେ , ଘ୧୨|୪୧ ରୁ ଘ୧|୨୯ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୩ ରୁ ଘ୭|୫୧ ମଧ୍ୟେ , ଘ୧୨|୩୯ ରୁ ୩|୫୧ ମଧ୍ୟେ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୧୫ ରୁ ଘ୧|୨୮ ମଧ୍ୟେ  | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୧୬ ରୁ ଘ୨|୪୪ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 5,
            date: '05/08/2024',
            day: 'ସୋମବାର',
            name: '',
            Image: require('../../assets/Images/Konark.png'),
            tithi: '(୫) ଅଗଷ୍ଟ , ସୋମବାର (ଶ୍ରାବଣ) କର୍କଟ ଦି୨୧ନ , ମହରମ ତା୨୯ରିଖ , ସାୟନ ଶ୍ରାବଣ ଦି୧୪ନ',
            sunrise: 'ଘ୫|୨୭|୩୧',
            sunset: 'ଘ୬|୧୭|୪୩',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୫ ମଧ୍ୟେ , ଘ୧୦|୧୭ ରୁ ଘ୧୨|୪୧ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୩ ରୁ ଘ୯|୨୭ ମଧ୍ୟେ , ଘ୧୧|୫୧ ରୁ ଘ୩|୩ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୫ ରୁ ଘ୪|୪୧ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୫ ରୁ ଘ୮|୪୦ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୩|୪ ରୁ ଘ୪|୪୦ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୨୮ ରୁ ଘ୧୧|୫୨ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 6,
            date: '06/08/2024',
            day: 'ମଙ୍ଗଳବାର',
            name: 'ଦ୍ୱିତୀୟା ଚନ୍ଦ୍ରଦର୍ଶନ',
            Image: require('../../assets/Images/KhajaBhoga.png'),
            tithi: '(୬) ଅଗଷ୍ଟ , ମଙ୍ଗଳବାର (ଶ୍ରାବଣ) କର୍କଟ ଦି୨୨ନ , ମହରମ ତା୩୦ରିଖ , ସାୟନ ଶ୍ରାବଣ ଦି୧୫ନ ',
            sunrise: 'ଘ୫|୨୭|୫୦',
            sunset: 'ଘ୬|୧୬|୧୨',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୭|୫୩ ରୁ ଘ୧୦|୧୭ ମଧ୍ୟେ , ଘ୧୨|୪୧ ରୁ ଘ୨|୧୭ ମଧ୍ୟେ , ଘ୩|୫ ରୁ ଘ୪|୪୧ ମଧ୍ୟେ , ସୂର୍ଯ୍ୟାସ୍ତଢ଼ୟ ରାତ୍ରି ଘ୭|୨ ମଧ୍ୟେ , ଘ୯|୨୬ ରୁ ଘ୧୧|୫୦ ମଧ୍ୟେ , ଘ୨|୧୪ ରୁ ଘ୩|୫୦ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୨୭ ରୁ ଘ୩|୨ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୭|୭ ରୁ ଘ୮|୪୦ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୩୮ ରୁ ଘ୯|୨ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 7,
            date: '07/08/2024',
            day: 'ବୁଧବାର',
            name: '',
            Image: require('../../assets/Images/Mahaprasad.png'),
            tithi: '(୭) ଅଗଷ୍ଟ , ବୁଧବାର (ଶ୍ରାବଣ) କର୍କଟ ଦି୨୩ନ , ସଫର ତା୧ରିଖ , ସାୟନ ଶ୍ରାବଣ ଦି୧୬ନ',
            sunrise: 'ଘ୫|୨୮|୧୦',
            sunset: 'ଘ୬|୧୬|୩୮',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୬ ମଧ୍ୟେ , ଘ୧୧|୫୪ ରୁ ଘ୧|୩୦ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୧ ରୁ ଘ୯|୨୫ ମଧ୍ୟେ , ଘ୨|୧୩ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୨୯ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୫୪ ରୁ ଘ୫|୩୦ ମଧ୍ୟେ , ରାତ୍ରି ଘ୯|୨୫ ରୁ ଘ୧୧|୧ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୪୧ ରୁ ଘ୧୦|୧୬ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୪୧ ରୁ ଘ୧|୨୭ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୪୧ ରୁ ଘ୪|୫ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 8,
            date: '08/08/2024',
            day: 'ଗୁରୁବାର',
            name: '',
            Image: require('../../assets/Images/3rathas.jpg'),
            tithi: '(୮) ଅଗଷ୍ଟ , ଗୁରୁବାର (ଶ୍ରାବଣ) କର୍କଟ ଦି୨୪ନ , ସଫର ତା୨ରିଖ , ସାୟନ ଶ୍ରାବଣ ଦି୧୭ନ',
            sunrise: 'ଘ୫|୨୮|୩୦',
            sunset: 'ଘ୬|୧୬|୪ ',
            gdTime: '(ଅମୃତ) ରାତ୍ରି ଘ୧|୨୫ ରୁ ଘ୩|୪୯ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୬ ମଧ୍ୟେ ଘ୧୦|୧୮ ରୁ , ଘ୧୨|୪୨ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: ' (ବାର ଓ କାଳବେଳା) ଦିବା ଘ୩|୪ ରୁ ଘ୬|୧୬ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୫୨ ରୁ ଘ୧|୧୬ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 9,
            date: '09/08/2024',
            day: 'ଶୁକ୍ରବାର',
            name: 'ଜାଗ୍ରତ୍ ଗୌରୀ (ଜଗୁଳାଈ) ପଞ୍ଚମୀ',
            Image: require('../../assets/Images/rathaImg.jpeg'),
            tithi: '(୯) ଅଗଷ୍ଟ , ଶୁକ୍ରବାର (ଶ୍ରାବଣ) କର୍କଟ ଦି୨୫ନ , ସଫର ତା୩ରିଖ , ସାୟନ ଶ୍ରାବଣ ଦି୧୮ନ',
            sunrise: 'ଘ୫|୨୮|୪୯',
            sunset: 'ଘ୬|୧୫|୨୯',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୬ ମଧ୍ୟେ , ଘ୭|୫୪ ରୁ ଘ୧୦|୧୮ ମଧ୍ୟେ , ଘ୧୨|୪୨ ରୁ ଘ୨|୧୮ ମଧ୍ୟେ , ଘ୩|୫୪ ରୁ ଘ୫|୩୦ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୪୮ ରୁ ଘ୯|୨୪ ମଧ୍ୟେ , ଘ୩|୪୮ ରୁ ଘ୪|୩୬ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୧୧|୦ ରୁ ଘ୧୧|୪୮ ମଧ୍ୟେ , ଘ୪|୩୬ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୨୯ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୮|୪୦ ରୁ ଘ୧୧|୫୧ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୫୩ ରୁ ଘ୧୦|୨୧  ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 10,
            date: '10/08/2024',
            day: 'ଶନିବାର',
            name: '',
            Image: require('../../assets/Images/PuriTemple.png'),
            tithi: '(୧୦) ଅଗଷ୍ଟ , ଶନିବାର (ଶ୍ରାବଣ) କର୍କଟ ଦି୨୬ନ , ସଫର ତା୪ରିଖ , ସାୟନ ଶ୍ରାବଣ ଦି୧୯ନ',
            sunrise: 'ଘ୫|୨୯|୯',
            sunset: 'ଘ୬|୧୪|୫୩',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୯|୩୧ ରୁ ଘ୧୨|୪୩ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୩୫ ରୁ ଘ୧୦|୫୯ ମଧ୍ୟେ , ଘ୧୨|୩୫ ରୁ ଘ୨|୧୧ , ଘ୨|୫୯ ରୁ ଘ୪|୩୫ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୪୦ ରୁ ଘ୧୦|୧୬ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧|୨୬ ରୁ ଘ୨|୫୦ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସୂର୍ଯ୍ୟାସ୍ତରୁ ଘ୬|୨୯ ମଧ୍ୟେ , ରାତ୍ରି ଘ୪|୫ ରୁ ନିଶାନ୍ତ ଘ୫|୨୯ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 11,
            date: '11/08/2024',
            day: 'ରବିବାର',
            name: 'ଗୋସ୍ଵାମୀ ତୁଳସୀ ଦାସ ଜୟନ୍',
            Image: require('../../assets/Images/PuriBeach.png'),
            tithi: '(୧୧) ଅଗଷ୍ଟ , ରବିବାର (ଶ୍ରାବଣ) କର୍କଟ ଦି୨୭ନ , ସଫର ତା୫ରିଖ , ସାୟନ ଶ୍ରାବଣ ଦି୨୦ନ',
            sunrise: 'ଘ୫|୨୯|୨୭',
            sunset: 'ଘ୬|୧୪|୧୭',
            gdTime: '(ଅମୃତ) ପ୍ରାତଃ ଘ୬|୧୯ ରୁ ଘ୯|୩୧ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୪୭ ରୁ ଘ୯|୨୩ ମଧ୍ୟେ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ପ୍ରାତଃ ଘ୬|୧୮ ମଧ୍ୟେ , ଘ୧୨|୪୩ ରୁ ଘ୧|୩୧ ମଧ୍ୟେ , ରାତ୍ରି ଘ୬|୫୯ ରୁ ଘ୭|୪୭ ମଧ୍ୟେ , ଘ୧୨|୩୫ ରୁ ଘ୩|୪୭ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୧୨ ରୁ ଘ୧|୨୫ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୧୬ ରୁ ଘ୨|୪୧ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 12,
            date: '12/08/2024',
            day: 'ସୋମବାର',
            name: '',
            Image: require('../../assets/Images/Mahaprasad.png'),
            tithi: '(୧୨) ଅଗଷ୍ଟ , ସୋମବାର (ଶ୍ରାବଣ) କର୍କଟ ଦି୨୮ନ , ସଫର ତା୬ରିଖ , ସାୟନ ଶ୍ରାବଣ ଦି୨୧ନ',
            sunrise: 'ଘ୫|୨୯|୪୫',
            sunset: 'ଘ୬|୧୩|୪୧',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୭ ମଧ୍ୟେ , ଘ୧୦|୧୯ ରୁ ଘ୧୨|୪୩ ମଧ୍ୟେ , ରାତ୍ରି ଘ୬|୫୮ ରୁ ଘ୯|୨୨ ମଧ୍ୟେ , ଘ୧୧|୪୬ ରୁ ଘ୨|୫୮ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୭ ରୁ ଘ୪|୪୩ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୬ ରୁ ଘ୮|୪୧ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୨|୪୮ ରୁ ଘ୪|୨୧ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୨୬ ରୁ ଘ୧୧|୫୧ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 13,
            date: '13/08/2024',
            day: 'ମଙ୍ଗଳବାର',
            name: 'ଶ୍ରୀକ୍ଷେତ୍ରେ ଝୁଲଣଯାତ୍ରା ଅଧିବାସ',
            Image: require('../../assets/Images/LaxmiPuja.png'),
            tithi: '(୧୩) ଅଗଷ୍ଟ , ମଙ୍ଗଳବାର (ଶ୍ରାବଣ) କର୍କଟ ଦି୨୯ନ , ସଫର ତା୭ରିଖ , ସାୟନ ଶ୍ରାବଣ ଦି୨୨ନ',
            sunrise: 'ଘ୫|୩୦|୨',
            sunset: 'ଘ୬|୧୩|୪',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୭|୫୫ ରୁ ଘ୧୦|୧୯ ମଧ୍ୟେ , ଘ୧୨|୪୩ ରୁ ଘ୨|୧୯ ମଧ୍ୟେ , ଘ୩|୭ ରୁ ଘ୪|୪୩ ମଧ୍ୟେ , ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୭|୫୮ ମଧ୍ୟେ , ଘ୮|୨୧ ରୁ ଘ୧୦|୪୫ ମଧ୍ୟେ , ଘ୧|୯ ରୁ ଘ୨|୪୫ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୨୪ ରୁ ଘ୨|୫୯ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୭|୬ ରୁ ଘ୮|୪୧ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୩୩ ରୁ ଘ୮|୫୯ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 14,
            date: '14/08/2024',
            day: 'ବୁଧବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ ବାଡିନୃସିଂହ ବିଜେ , ଶ୍ରୀମନ୍ଦିରେ ଶ୍ରୀକ୍ଷେତ୍ରେ ଝୁଲଣ ଯାତ୍ରା ଆରମ୍ଭ',
            Image: require('../../assets/Images/Konark.png'),
            tithi: '(୧୪) ଅଗଷ୍ଟ , ବୁଧବାର (ଶ୍ରାବଣ) କର୍କଟ ଦି୩୦ନ , ସଫର ତା୮ରିଖ , ସାୟନ ଶ୍ରାବଣ ଦି୨୩ନ',
            sunrise: 'ଘ୫|୩୦|୩୦',
            sunset: 'ଘ୬|୧୨|୩୪',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୮ ମଧ୍ୟେ , ଘ୧୧|୫୬ ରୁ ଘ୧|୩୨ ମଧ୍ୟେ , ରାତ୍ରି ଘ୬|୫୭ ରୁ ଘ୯|୨୧ ମଧ୍ୟେ , ଘ୧|୯ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୩୧ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୫୬ ରୁ ଘ୫|୩୨ ମଧ୍ୟେ , ରାତ୍ରି ଘ୯|୨୧ ରୁ ଘ୧୦|୫୭ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୪୦ ରୁ ଘ୧୦|୧୫ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୫୦ ରୁ ଘ୧|୧୪ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୧୫ ରୁ ଘ୨|୩୭ ପର୍ଯ୍ୟନ୍ତ |'
        },
        {
            id: 15,
            date: '15/08/2024',
            day: 'ଗୁରୁବାର',
            name: 'ସର୍ବତ୍ର ଝୁଲଣଯାତ୍ରା, ସୁଦଶା ବ୍ରତ , ମାସାନ୍ତ',
            Image: require('../../assets/Images/KhajaBhoga.png'),
            tithi: '(୧୫) ଅଗଷ୍ଟ , ଗୁରୁବାର (ଶ୍ରାବଣ) କର୍କଟ ଦି୩୧ନ , ସଫର ତା୯ରିଖ , ସାୟନ ଶ୍ରାବଣ ଦି୨୪ନ',
            sunrise: 'ଘ୫|୩୦|୩୭',
            sunset: 'ଘ୬|୧୧|୪୫',
            gdTime: '(ଅମୃତ) ରାତ୍ରି ଘ୧|୨୦ ରୁ ଘ୩|୪୪ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୮ ମଧ୍ୟେ , ଦିବା ଘ୧୦|୨୦ ରୁ ଘ୧୨|୪୪ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୨|୫୯ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୬|୧୨ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୪୯ ରୁ ଘ୨|୧୫ ପର୍ଯ୍ୟନ୍ତ |'
        },
        {
            id: 16,
            date: '16/08/2024',
            day: 'ଶୁକ୍ରବାର',
            name: 'ସିଂହ ସଂକ୍ରାନ୍ତି , ଶ୍ରୀମନ୍ଦିରେ ଓ ସର୍ବସମ୍ମତ ପୁତ୍ରଦା ଏକାଦଶୀ, ଶ୍ରୀଜିଉଙ୍କ ପବିତ୍ରାଧିବାସ',
            Image: require('../../assets/Images/rathaImg.jpeg'),
            tithi: '(୧୬) ଅଗଷ୍ଟ , ଶୁକ୍ରବାର (ଭାଦ୍ର) ସିଂହ ଦି୧ନ , ସଫର ତା୧୦ରିଖ , ସାୟନ ଶ୍ରାବଣ ଦି୨୫ନ',
            sunrise: 'ଘ୫|୩୦|୫୫',
            sunset: 'ଘ୬|୧୧|୫',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୮ ମଧ୍ୟେ , ଘ୭|୫୬ ରୁ ଘ୧୦|୨୦ ମଧ୍ୟେ , ଘ୧୨|୪୪ ରୁ ଘ୨|୨୦ ମଧ୍ୟେ , ଘ୩|୫୬ ରୁ ଘ୫|୩୨ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୪୩ ରୁ ଘ୯|୧୯ ମଧ୍ୟେ , ଘ୩|୪୩ ରୁ ଘ୪|୩୧ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୧୦|୫୫ ରୁ ଘ୧୧|୪୩ ମଧ୍ୟେ , ଘ୪|୩୧ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୩୧ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୮|୩୯ ରୁ ଘ୧୧|୪୯ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୫୭ ରୁ ଘ୧|୨୩ ପର୍ଯ୍ୟନ୍ତ |'
        },
        {
            id: 17,
            date: '17/08/2024',
            day: 'ଶନିବାର',
            name: 'ବିଷ୍ଣୁ ପବିତ୍ରାରୋପଣ ଉତ୍ସବ , ଆଖେଟକ ପର୍ବ , ଶରଣ ଆରମ୍ଭ',
            Image: require('../../assets/Images/3rathas.jpg'),
            tithi: '(୧୭) ଅଗଷ୍ଟ , ଶନିବାର (ଭାଦ୍ର) ସିଂହ ଦି୨ନ , ସଫର ତା୧୧ରିଖ , ସାୟନ ଶ୍ରାବଣ ଦି୨୬ନ',
            sunrise: 'ଘ୫|୩୧|୧୩',
            sunset: 'ଘ୬|୧୦|୨୩',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୯|୩୨ ରୁ ଘ୧୨|୪୪ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୩୦ ରୁ ଘ୧୦|୫୪ ମଧ୍ୟେ ,  ଘ୧୨|୩୦ ରୁ ଘ୨|୬ ମଧ୍ୟେ , ଘ୨|୫୪ ରୁ ଘ୪|୩୦ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ପ୍ରାତଃରୁ ଦିବା ଘ୭|୭ ମଧ୍ୟେ , ଘ୪|୩୪ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୬|୧୦ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧|୨୨ ରୁ ଘ୨|୫୭ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୭|୩୦ ମଧ୍ୟେ , ଘ୪|୬ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୩୨ ପର୍ଯ୍ୟନ୍ତ |'
        },
        {
            id: 18,
            date: '18/08/2024',
            day: 'ରବିବାର',
            name: 'ଶ୍ରୀଶିବ ପବିତ୍ରାରୋପଣ ଉତ୍ସବ',
            Image: require('../../assets/Images/PuriTemple.png'),
            tithi: '(୧୮) ଅଗଷ୍ଟ , ରବିବାର (ଭାଦ୍ର) ସିଂହ ଦି୩ନ , ସଫର ତା୧୨ରିଖ , ସାୟନ ଶ୍ରାବଣ ଦି୨୭ନ',
            sunrise: 'ଘ୫|୩୧|୩୦',
            sunset: 'ଘ୬|୯|୪୦',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୬|୨୧ ରୁ ଘ୯|୩୩ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୪୨ ରୁ ଘ୯|୧୮ ମଧ୍ୟେ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୨୧ ମଧ୍ୟେ , ଘ୧୨|୪୫ ରୁ ଘ୧|୩୩ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୫୪ ରୁ ଘ୭|୪୨ ମଧ୍ୟେ , ଘ୧୨|୩୦ ରୁ ଘ୩|୪୨ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୧୧ ରୁ ଘ୧|୨୨ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୧୫ ରୁ ଘ୨|୪୧ ପର୍ଯ୍ୟନ୍ତ |'
        },
        {
            id: 19,
            date: '19/08/2024',
            day: 'ସୋମବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ ବଳଭଦ୍ର ଜନ୍ମ ଓ ରାଖୀଲାଗି, ଶ୍ରୀ ବଳଦେବ ଜନ୍ମ, ଗହ୍ମାପର୍ବ, ଉପାକର୍ମ, ସଂସ୍କୃତ ଦିବସ, ପୂର୍ଣ୍ଣିମା',
            Image: require('../../assets/Images/PuriBeach.png'),
            tithi: '(୧୯) ଅଗଷ୍ଟ , ସୋମବାର (ଭାଦ୍ର) ସିଂହ ଦି୪ନ , ସଫର ତା୧୩ରିଖ , ସାୟନ ଶ୍ରାବଣ ଦି୨୮ନ',
            sunrise: 'ଘ୫|୩୧|୪୭',
            sunset: 'ଘ୬|୮|୫୭',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୯ ମଧ୍ୟେ , ଘ୧୦|୨୧ ରୁ ଘ୧୨|୪୫ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୫୩ ରୁ ଘ୯|୧୭ ମଧ୍ୟେ , ଘ୧୧|୪୧ ରୁ ଘ୨|୫୩ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୯ ରୁ ଘ୪|୪୪ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୮ ରୁ ଘ୮|୨୪ ପର୍ଯ୍ୟନ୍ତ  | (ବାରବେଳା) ଦିବା ଘ୨|୪୬ ରୁ ଘ୪|୨୯ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୨୨ ରୁ ଘ୧୧|୪୩ ପର୍ଯ୍ୟନ୍ତ |'
        },
        {
            id: 20,
            date: '20/08/2024',
            day: 'ମଙ୍ଗଳବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରେ ଓ ଶ୍ରୀକ୍ଷେତ୍ରେ ଝୁଲଣଯାତ୍ରା ଶେଷ',
            Image: require('../../assets/Images/Mahaprasad.png'),
            tithi: '(୨୦) ଅଗଷ୍ଟ , ମଙ୍ଗଳବାର (ଭାଦ୍ର) ସିଂହ ଦି୫ନ , ସଫର ତା୧୪ରିଖ , ସାୟନ ଶ୍ରାବଣ ଦି୨୯ନ',
            sunrise: 'ଘ୫|୩୨|୩',
            sunset: 'ଘ୬|୮|୧୩',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୭|୫୭ ରୁ ଘ୧୦|୨୧ ମଧ୍ୟେ , ଘ୧୨|୪୫ ରୁ ଘ୨|୨୧ ମଧ୍ୟେ , ଘ୩|୯  ରୁ ଘ୪|୪୫ ମଧ୍ୟେ , ସୂର୍ଯ୍ୟାସ୍ତ ଘ୬|୮ ରୁ ରାତ୍ରି ଘ୬|୫୩ ମଧ୍ୟେ , ଘ୯|୧୬ ରୁ ଘ୧୧|୪୦ ମଧ୍ୟେ , ଘ୨|୪ ରୁ ଘ୩|୪୦ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୨୧ ରୁ ଘ୨|୫୫ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୭|୯ ରୁ ଘ୮|୩୮ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୨୯ ରୁ ଘ୮|୫୫ ପର୍ଯ୍ୟନ୍ତ |'
        },
        {
            id: 21,
            date: '21/08/2024',
            day: 'ବୁଧବାର',
            name: 'ବୁଧିବାମନ (ବୁଧେଇ) ଓଷା ଆରମ୍ଭ , ଶରଣ ଶେଷ',
            Image: require('../../assets/Images/LaxmiPuja.png'),
            tithi: '(୨୧) ଅଗଷ୍ଟ , ବୁଧବାର (ଭାଦ୍ର) ସିଂହ ଦି୬ନ , ସଫର ତା୧୫ରିଖ , ସାୟନ ଶ୍ରାବଣ ଦି୩୦ନ',
            sunrise: 'ଘ୫|୩୨|୨୯',
            sunset: 'ଘ୬|୭|୩୯',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୯ ମଧ୍ୟେ , ଘ୧୧|୫୭ ରୁ ଘ୧|୩୩ ମଧ୍ୟେ , ରାତ୍ରି ଘ୬|୫୧ ରୁ ଘ୯|୧୫ ମଧ୍ୟେ , ଘ୨|୩ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୩୩ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୫୭ ରୁ ଘ୫|୩୩ ମଧ୍ୟେ , ରାତ୍ରି ଘ୯|୧୫ ରୁ ଘ୧୦|୫୧ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୩୯ ରୁ ଘ୧୦|୧୧ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୧୧|୪୭ ରୁ ଘ୧|୨୧ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୪୦ ରୁ ଘ୪|୯ ପର୍ଯ୍ୟନ୍ତ |'
        },
        {
            id: 22,
            date: '22/08/2024',
            day: 'ଗୁରୁବାର',
            name: 'ଅଙ୍ଗଭେଟ ତୃତୀୟା, ଗୌରୀ ଚତୁର୍ଥୀ',
            Image: require('../../assets/Images/Konark.png'),
            tithi: '(୨୨) ଅଗଷ୍ଟ , ଗୁରୁବାର (ଭାଦ୍ର) ସିଂହ ଦି୭ନ , ସଫର ତା୧୬ରିଖ , ସାୟନ ଶ୍ରାବଣ ଦି୩୧ନ',
            sunrise: 'ଘ୫|୩୨|୩୪',
            sunset: 'ଘ୬|୬|୩୪',
            gdTime: '(ଅମୃତ) ରାତ୍ରି ଘ୧|୧୪ ରୁ ଘ୩|୩୮ ମଧ୍ୟେ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୨ ମଧ୍ୟେ , ଘ୧୦|୧୪ ରୁ ଘ୧୨|୩୮ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୨|୪୭ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୬|୭ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୪୭ ରୁ ଘ୧|୧୪ ପର୍ଯ୍ୟନ୍ତ |'
        },
        {
            id: 23,
            date: '23/08/2024',
            day: 'ଶୁକ୍ରବାର',
            name: 'ଗୃହୀଣା ରକ୍ଷା ପଞ୍ଚମୀ',
            Image: require('../../assets/Images/KhajaBhoga.png'),
            tithi: '(୨୩) ଅଗଷ୍ଟ , ଶୁକ୍ରବାର (ଭାଦ୍ର) ସିଂହ ଦି୮ନ , ସଫର ତା୧୭ରିଖ , ସାୟନ ଭାଦ୍ର ଦି୧ନ',
            sunrise: 'ଘ୫|୩୨|୪୯',
            sunset: 'ଘ୬|୫|୫୯',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୦ ମଧ୍ୟେ , ଘ୭|୫୮ ରୁ ଘ୧୦|୨୨ ମଧ୍ୟେ , ଘ୧୨|୪୬ ରୁ ଘ୨|୨୨ ମଧ୍ୟେ , ଘ୩|୫୮ ରୁ ଘ୫|୩୪ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୩୮ ରୁ ଘ୯|୧୪ ମଧ୍ୟେ , ଘ୩|୩୮ ରୁ ଘ୪|୨୬ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୧୦|୫୦ ରୁ ଘ୧୧|୩୮ ମଧ୍ୟେ , ରାତ୍ରି ଘ୪|୨୬ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୩୩ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୮|୪୦ ରୁ ଘ୧୧|୪୭ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୫୫ ରୁ ଘ୧୦|୨୨ ପର୍ଯ୍ୟନ୍ତ |'
        },
        {
            id: 24,
            date: '24/08/2024',
            day: 'ଶନିବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ ରେଖାପଞ୍ଚମୀ, ଶ୍ରୀ ଜୀଉଙ୍କର ରାହୁରେଖାଲାଗି',
            Image: require('../../assets/Images/rathaImg.jpeg'),
            tithi: '(୨୪) ଅଗଷ୍ଟ , ଶନିବାର (ଭାଦ୍ର) ସିଂହ ଦି୯ନ , ସଫର ତା୧୮ରିଖ , ସାୟନ ଭାଦ୍ର ଦି୨ନ',
            sunrise: 'ଘ୫|୩୩|୬',
            sunset: 'ଘ୬|୫|୧୪',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୯|୩୪ ରୁ ଘ୧୨|୪୬ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୨୫ ରୁ ଘ୧୦|୪୯ ମଧ୍ୟେ , ଘ୧୨|୨୫ ରୁ ଘ୨|୧ ମଧ୍ୟେ , ଘ୨|୪୯ ରୁ ଘ୪|୨୫ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ପ୍ରାତଃ ଘ୫|୩୩ ରୁ ଘ୭|୭ ମଧ୍ୟେ , ଦିବା ଘ୪|୨୯ ରୁ ଘ୬|୫ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୧|୨୧ ରୁ ଘ୨|୫୫ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ସୂର୍ଯ୍ୟାସ୍ତ ଘ୬|୫ ରୁ ଘ୭|୨୯ ମଧ୍ୟେ , ରାତ୍ରି ଘ୪|୮ ରୁ ଘ୫|୩୩ ପର୍ଯ୍ୟନ୍ତ |'
        },
        {
            id: 25,
            date: '25/08/2024',
            day: 'ରବିବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ ଶ୍ରୀହରି ଜନ୍ମାଧିବାସ, ଗର୍ଭୋଦକ ବନ୍ଦାପନା, ଯେଉଡ ଭୋଗ, ଖୁଦୁରିକୁଣୀ ଓଷା ଆରମ୍ଭ',
            Image: require('../../assets/Images/3rathas.jpg'),
            tithi: '(୨୫) ଅଗଷ୍ଟ , ରବିବାର (ଭାଦ୍ର) ସିଂହ ଦି୧୦ନ , ସଫର ତା୧୯ରିଖ , ସାୟନ ଭାଦ୍ର ଦି୩ନ',
            sunrise: 'ଘ୫|୩୩|୨୦',
            sunset: 'ଘ୬|୪|୨୬',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୬|୨୨ ମଧ୍ୟେ , ଘ୧୨|୪୬ ରୁ ଘ୧|୩୪ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୩୬ ରୁ ଘ୯|୧୨ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୨୨ ମଧ୍ୟେ , ଘ୧୨|୪୬ ରୁ ଘ୧|୩୪ ମଧ୍ୟେ ,  ରାତ୍ରି ଘ୬|୪୮ ରୁ ଘ୭|୨୬ ମଧ୍ୟେ , ଘ୧୨|୨୪ ରୁ ଘ୩|୩୬ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୯ ରୁ ଘ୧|୧୯ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୧୪ ରୁ ଘ୨|୪୧ ପର୍ଯ୍ୟନ୍ତ |'
        },
        {
            id: 26,
            date: '26/08/2024',
            day: 'ସୋମବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ ରାମାନୁଜ ଭିନ୍ନ ସର୍ବସମ୍ମତ ଶ୍ରୀକୃଷ୍ଣ ଜନ୍ମାଷ୍ଟମୀ, ଶନିମହାଗ୍ରହ ଜୟନ୍ତୀ, ବିଶ୍ଵ ହିନ୍ଦୁ ପରିଷଦ ପ୍ରତିଷ୍ଠା ଦିବସ',
            Image: require('../../assets/Images/PuriTemple.png'),
            tithi: '(୨୬) ଅଗଷ୍ଟ , ସୋମବାର (ଭାଦ୍ର) ସିଂହ ଦି୧୧ନ , ସଫର ତା୨୦ରିଖ , ସାୟନ ଭାଦ୍ର ଦି୪ନ',
            sunrise: 'ଘ୫|୩୩|୩୪',
            sunset: 'ଘ୬|୩|୩୮',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୧ ମଧ୍ୟେ , ଘ୧୦|୨୩ ରୁ ଘ୧୨|୪ ମଧ୍ୟେ , ରାତ୍ରି ଘ୬|୪୭ ରୁ ଘ୯|୧୧ ମଧ୍ୟେ , ଘ୧୧|୩୫ ରୁ ଘ୨|୪୭ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୧୧ ରୁ ଘ୪|୪୭ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୮ ରୁ ଘ୮|୪୧ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୨|୫୪ ରୁ ଘ୪|୨୭ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୨୦ ରୁ ଘ୧୧|୪୭ ପର୍ଯ୍ୟନ୍ତ |'
        },
        {
            id: 27,
            date: '27/08/2024',
            day: 'ମଙ୍ଗଳବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ ନନ୍ଦୋତ୍ସବ , ରାମାନୁଜ ବୈଷ୍ଣବ ସମ୍ମତ ଶ୍ରୀହରିଜନ୍ମ',
            Image: require('../../assets/Images/PuriBeach.png'),
            tithi: '(୨୭) ଅଗଷ୍ଟ , ମଙ୍ଗଳବାର (ଭାଦ୍ର) ସିଂହ ଦି୧୨ନ , ସଫର ତା୨୧ରିଖ , ସାୟନ ଭାଦ୍ର ଦି୫ନ',
            sunrise: 'ଘ୫|୩୩|୪୯',
            sunset: 'ଘ୬|୨|୪୯',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୭|୫୯ ରୁ ଘ୧୦|୨୩ ମଧ୍ୟେ , ଘ୧୨|୪୭ ରୁ ଘ୨|୨୩ ମଧ୍ୟେ , ଘ୩|୧୧ ରୁ ଘ୪|୪୭ ମଧ୍ୟେ , ସୂର୍ଯ୍ୟାସ୍ତ ଘ୬|୩ ରୁ ରାତ୍ରି ଘ୬|୫୦ ମଧ୍ୟେ , ଘ୯|୧୦ ରୁ  ଘ୧୧|୩୪ ମଧ୍ୟେ , ଘ୧|୫୮ ରୁ ଘ୩|୩୪ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୧୮ ରୁ ଘ୨|୫୧ ମଧ୍ୟେ | (ବାରବେଳା) ପ୍ରାତଃ ଘ୭|୮ ରୁ ଘ୮|୪୧ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୨୬ ରୁ ଘ୮|୫୩ ପର୍ଯ୍ୟନ୍ତ |'
        },
        {
            id: 28,
            date: '28/08/2024',
            day: 'ବୁଧବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ ଶ୍ରୀଜୀଉଙ୍କର ବଣଭୋଜୀ ବେଶ, କୋଳିବିକା ଓ ବକାସୁର ଏବଂ ଅର୍ଘାସୁର ବଧ ପ୍ରସ୍ତାବ, ରାମାନୁଜ ବୈଷ୍ଣବ ସମ୍ମତ ନନ୍ଦୋତ୍ସବ',
            Image: require('../../assets/Images/Mahaprasad.png'),
            tithi: '(୨୮) ଅଗଷ୍ଟ , ବୁଧବାର (ଭାଦ୍ର) ସିଂହ ଦି୧୩ନ , ସଫର ତା୨୨ରିଖ , ସାୟନ ଭାଦ୍ର ଦି୬ନ',
            sunrise: 'ଘ୫|୩୪|୪୩',
            sunset: 'ଘ୬|୨|୧',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୧ ମଧ୍ୟେ , ଘ୧୧|୫୯ ରୁ ଘ୧|୩୫ ମଧ୍ୟେ , ରାତ୍ରି ଘ୬|୪୫ ରୁ ଘ୯|୯ ମଧ୍ୟେ , ଘ୧|୫୬ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୩୪ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୫୮ ରୁ ଘ୫|୩୪ ମଧ୍ୟେ , ରାତ୍ରି ଘ୯|୧୧ ରୁ ଘ୧୦|୪୭ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୪୦ ରୁ ଘ୧୦|୧୨ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୧୧|୪୫ ରୁ ଘ୧|୧୮ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୪୦ ରୁ ଘ୪|୮ ମଧ୍ୟେ |'
        },
        {
            id: 29,
            date: '29/08/2024',
            day: 'ଗୁରୁବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ ଓ ସ୍ମାର୍ତ୍ତସମ୍ମତ କାଳୀୟଦଳନ (ଅଜା) ଏକାଦଶୀ , ଶ୍ରୀମନ୍ଦିରେ କାଳୀୟଦଳନ ବେଶ ଓ ଧେନୁକାସୁର ବଧ ପ୍ରସ୍ତାବ , ଜାତୀୟ କ୍ରିଡା ଦିବସ',
            Image: require('../../assets/Images/LaxmiPuja.png'),
            tithi: '(୨୯) ଅଗଷ୍ଟ , ଗୁରୁବାର (ଭାଦ୍ର) ସିଂହ ଦି୧୪ନ , ସଫର ତା୨୩ରିଖ , ସାୟନ ଭାଦ୍ର ଦି୭ନ',
            sunrise: 'ଘ୫|୩୪|୧୬',
            sunset: 'ଘ୬|୧|୧୨',
            gdTime: '(ଅମୃତ) ରାତ୍ରି ଘ୧|୯ ରୁ ଘ୩|୩୩ ପର୍ଯ୍ୟନ୍ତ  | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୧ ମଧ୍ୟେ , ଘ୯|୩୫ ରୁ ଘ୧୧|୫୯ ପର୍ଯ୍ୟନ୍ତ',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୨|୫୨ ରୁ ଘ୬|୧ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୪୬ ରୁ ଘ୧|୧୪ ପର୍ଯ୍ୟନ୍ତ |'
        },
        {
            id: 30,
            date: '30/08/2024',
            day: 'ଶୁକ୍ରବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ ଶ୍ରୀଜୀଉଙ୍କର ପ୍ରଳାମ୍ବସୁର ବଧ ବେଶ ,ସର୍ବବୈଷ୍ଣବ ସମ୍ମତ ପକ୍ଷବର୍ଦ୍ଧିନୀ (ମହାଦ୍ଵାଦଶୀ) ଓ ଏକାଦଶୀ ଉପବାସ',
            Image: require('../../assets/Images/Konark.png'),
            tithi: '(୩୦) ଅଗଷ୍ଟ , ଶୁକ୍ରବାର (ଭାଦ୍ର) ସିଂହ ଦି୧୫ନ , ସଫର ତା୨୪ରିଖ , ସାୟନ ଭାଦ୍ର ଦି୮ନ',
            sunrise: 'ଘ୫|୩୪|୩୦',
            sunset: 'ଘ୬|୦|୨',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୧ ମଧ୍ୟେ , ଘ୭|୫୯ ରୁ ଘ୧୦|୨୩ ମଧ୍ୟେ , ଘ୧୨|୪୭ ରୁ ଘ୨|୨୩ ମଧ୍ୟେ , ଘ୩|୫୯ ରୁ ଘ୫|୩୫ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୩୨ ରୁ ଘ୯|୮ ମଧ୍ୟେ , ଘ୩|୩୨ ରୁ ରାତ୍ରି ଘ୪|୨୦ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୮|୪୦ ରୁ ଘ୧୧|୪୫ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୩୯ ରୁ ଘ୧|୧୭ ପର୍ଯ୍ୟନ୍ତ |'
        },
        {
            id: 31,
            date: '31/08/2024',
            day: 'ଶନିବାର',
            name: 'ଶ୍ରୀଜଗନ୍ନାଥ ମହାପ୍ରଭୁଙ୍କର  କୃଷ୍ଣ ବଳରାମ ବେଶ , ଅନ୍ନପ୍ରଥା , ଦ୍ଵାପର ଯୁଗାଦି ଶ୍ରାଦ୍ଧ',
            Image: require('../../assets/Images/KhajaBhoga.png'),
            tithi: '(୩୧) ଅଗଷ୍ଟ , ଶନିବାର (ଭାଦ୍ର) ସିଂହ ଦି୧୬ନ , ସଫର ତା୨୫ରିଖ , ସାୟନ ଭାଦ୍ର ଦି୯ନ',
            sunrise: 'ଘ୫|୩୪|୪୭',
            sunset: 'ଘ୫|୫୯|୩୨',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୯|୩୫ ରୁ ଘ୧୨|୪୭ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୧୯ ରୁ ଘ୧୦|୪୩ ମଧ୍ୟେ , ଘ୧୨|୧୯ ରୁ ଘ୧|୫୫ ମଧ୍ୟେ , ଘ୨|୪୩ ରୁ ଘ୪|୧୯ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ପ୍ରାତଃ ଘ୫|୩୫ ରୁ ଘ୭|୦ ମଧ୍ୟେ , ଦିବା ଘ୪|୨୬ ରୁ ଘ୬|୦ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧|୧୮ ରୁ ଘ୨|୫୧ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ଅସ୍ତ ଘ୬|୦ ରୁ ଘ୭|୨୫ ମଧ୍ୟେ , ରାତ୍ରି ଘ୪|୭ ରୁ ଘ୫|୩୫ ପର୍ଯ୍ୟନ୍ତ |'
        },
    ]

    const eventsForEnglishMonth = [
        {
            id: 1,
            date: '01/08/2024',
            day: 'Thursday',
            name: '',
            spclDesc: '',
            Image: require('../../assets/Images/PuriTemple.png'),
            tithi: '(1) August, Thursday (Shravan), Crab 17th, evening Shravan 10th. ',
            sunrise: ' 5:26:9 AM',
            sunset: '6:19:41 PM',
            gdTime: ' (Amrita) - Night from 1:29 AM to 3:53 AM. (Mahendra) - From 7:3 AM to 12:40 PM. ',
            bdTime: ' (Kaala) - From 3:7 PM to 6:20 PM. (Kaalaraatri) - Night from 11:52 PM to 1:16 AM. ',
        },
        {
            id: 2,
            date: '02/08/2024',
            day: 'Friday',
            name: 'Snana Yatra , Gajanan Besha & Anabasara Arambha',
            spclDesc: '',
            Image: require('../../assets/Images/PuriBeach.png'),
            tithi: '(2) August, Friday (Shravan), Crab 18th, evening Shravan 11th. ',
            sunrise: '5:26:29 AM',
            sunset: '6:19:13 PM',
            gdTime: '(Amrit) Sunrise to Day 7:3, 7:52 to 10:16, 12:40 to 2:16, 3:52 to 5:28, Night: 7:53 to 9:29, 3 From 53 to 4:41 (Mahendra) Night from 11:5 to 11:53, from 4:39 to 5:26. ',
            bdTime: '(Kaala) from 8:40 am to 11:52 am. (Night) from 9.3 to 10.28 ',
        },
        {
            id: 3,
            date: '03/08/2024',
            day: 'Saturday',
            name: '',
            spclDesc: '',
            Image: require('../../assets/Images/Mahaprasad.png'),
            tithi: '(3) August, Saturday (Shravan), the 19th of Cancer, evening on the 12th of Shravan. ',
            sunrise: '5:26:26',
            sunset: '6:19:8',
            gdTime: ' (Amrita) from 9:28 to 12:40 in the morning, from 8:40 to 11:04 at night, from 12:40 to 2:16, and from 3:04 to 4:40. ',
            bdTime: '(Kalabela) from 5:26 to 7:02 in the morning, from 4:41 to 6:19 in the afternoon, (Barabela) from 1:28 to 3:04 in the afternoon, (Kalaratri) from 6:19 to 7:43 in the evening, from 4:02 to midnight, up to 5:27. ',
        },

        {
            id: 4,
            date: '04/08/2024',
            day: 'Sunday',
            name: "Chitau Amavasya at Srimandir, , Srijiu's Golden Chitalagi (Chitau Voga) Painter's Festival, Suryamahati Baths, Bathing at Prayag Raj.",
            spclDesc: '',
            Image: require('../../assets/Images/LaxmiPuja.png'),
            tithi: '(4)  August, Sunday (Shravan), the 20th of Cancer, evening on the 13th of Shravan. ',
            sunrise: '5:27:10',
            sunset: '6:18:14',
            gdTime: '(Amrita) from 6:16 to 9:28 in the morning, from 7:51 to 9:27 at night, (Mahendra) from sunrise to 6:16 in the morning, from 12:41 to 1:29, from 7:03 to 7:51, from 12:39 to 3:51. ',
            bdTime: '(Bara and Kalabela) from 10:15 to 11:28 in the morning, (Kalaratri) from 1:16 to 2:44 at night. ',
        },

        {
            id: 5,
            date: '05/08/2024',
            day: 'Monday',
            name: '',
            spclDesc: '',
            Image: require('../../assets/Images/Konark.png'),
            tithi: '(5) On August, Monday (Shravan), the 21st of Cancer,  evening on the 14th of Shravan. ',
            sunrise: '5:27:31',
            sunset: '6:17:43',
            gdTime: ' (Amrita) from sunrise to 7:05 in the morning, from 10:17 to 12:41, from 7:03 to 9:27 at night, from 11:51 to 3:03, (Mahendra) from 3:54 to 4:41 in the morning. ',
            bdTime: ' (Kalabela) from 7:05 to 8:40 in the morning, (Barabela) from 11:41 to 12:40 in the afternoon, (Kalaratri) from 10:28 to 11:52 at night.',
        },

        {
            id: 6,
            date: '06/08/2024',
            day: 'Tuesday',
            name: '',
            spclDesc: '',
            Image: require('../../assets/Images/KhajaBhoga.png'),
            tithi: '(6) August, Tuesday (Shravan), the 22nd of Cancer,  evening on the 15th of Shravan. ',
            sunrise: '5:27:50',
            sunset: '6:16:12',
            gdTime: ' (Amrita) from sunrise to 7:53 in the morning, from 10:17 to 12:17, from 7:05 to 9:41 at night, from 7:02 to the end of the night, (Mahendra) from 3:54 to 5:50 in the morning, from 9:26 to 11:50 at night.',
            bdTime: '(Kalabela) from 7:27 to 9:02 in the morning, (Barabela) from 7:07 to 8:40 in the evening, (Kalaratri) from 7:38 to 9:02 at night. ',
        },

        {
            id: 7,
            date: '07/08/2024',
            day: 'Wednesday',
            name: '',
            spclDesc: '',
            Image: require('../../assets/Images/LaxmiPuja.png'),
            tithi: '(7) August, Wednesday (Shravan), the 23rd of Cancer, evening on the 16th of Shravan. ',
            sunrise: '5:28:10',
            sunset: '6:16:38',
            gdTime: ' (Amrita) from sunrise to 7:06 in the morning, from 11:54 to 1:30 in the afternoon, from 7:01 to 9:25 at night, from 7:13 to the end of the night, (Mahendra) from 3:54 to 5:30 in the morning, from 9:25 to 11:01 at night.',
            bdTime: ' (Kalabela) from 8:41 to 10:16 in the morning, (Barabela) from 11:41 to 1:27 in the afternoon, (Kalaratri) from 2:41 to 4:05 at night.',
        },

        {
            id: 8,
            date: '08/08/2024',
            day: 'Thursday',
            name: '',
            spclDesc: '',
            Image: require('../../assets/Images/rathaImg.jpeg'),
            tithi: '(8) On August, Thursday (Shravan), the 24th of Cancer, evening on the 17th of Shravan. ',
            sunrise: ' 5:28:30',
            sunset: ' 6:16:04',
            gdTime: ' (Amrita) from 1:25 to 3:49 at night, (Mahendra) from sunrise to 7:06 in the morning, from 10:18 to 12:42 in the morning.',
            bdTime: '(Bar and Kalabela) from 3:04 to 6:16 in the morning, (Kalaratri) from 11:52 at night to 1:16 in the morning. ',
        },

        {
            id: 9,
            date: '09/08/2024',
            day: ' Friday',
            name: 'Jagrat Gauri (Jagulai) Panchami',
            spclDesc: '',
            Image: require('../../assets/Images/3rathas.jpg'),
            tithi: '(9) August, Friday (Shravan), the 25th of Cancer, evening on the 18th of Shravan. ',
            sunrise: '5:28:49',
            sunset: ' 6:15:29',
            gdTime: ' (Amrita) from 7:06 to 10:18 in the morning, from 10:54 to 12:42 in the morning, from 3:54 to 5:30 in the evening, from 7:48 to 9:24 at night, from 3:48 to 4:36 in the afternoon, (Mahendra) from 11:00 to 11:48 at night, from 4:36 to midnight. ',
            bdTime: '(Bar and Kalabela) from 8:40 to 11:51 in the morning, (Kalaratri) from 8:53 at night to 10:21 in the night. ',
        },

        {
            id: 10,
            date: '10/08/2024',
            day: 'Saturday',
            name: '',
            spclDesc: '',
            Image: require('../../assets/Images/rathaImg.jpeg'),
            tithi: 'August 10, Saturday (Shravan), Cancer 26, morning 4:53, evening 2:53. ',
            sunrise: '5:29:9',
            sunset: '6:14:53',
            gdTime: ' (Amrit) Day 9:31 to 12:43, Night 8:35 to 10:59, 12:35 to 2:11, 2:59 to 4:35. ',
            bdTime: '(Kaalbela) between 8:40 and 10:16 (Barbela) Diba between 1:26 to 2:50 (Midnight) from sunset to 6:29 p.m., night from 4:5 p.m. to 5:29 p.m. Goswami Tulsidas Jayanti ',
        },

        {
            id: 11,
            date: '11/08/2024',
            day: 'Sunday',
            name: '',
            spclDesc: '',
            Image: require('../../assets/Images/3rathas.jpg'),
            tithi: 'August 11, Sunday (Shravan), Cancer 27, morning 5, evening 5.',
            sunrise: '5:29:27',
            sunset: '6:14:17',
            gdTime: '(Amrit) Morning 6:19 am to 9:31 am, Night 7:47 am to 9:23 am. (Mahendra) Sunrise to 6:18 AM, 12:43 AM to 1:31 AM, Night 6:59 AM to 7:47 AM, 12:35 AM to 3:47 AM. ',
            bdTime: ' (Bar and Kala Bela) between 10:12 and 1:25. (Night) from 1:16 am to 2:41 am ',
        },

        {
            id: 12,
            date: '12/08/2024',
            day: 'Monday',
            name: '',
            spclDesc: '',
            Image: require('../../assets/Images/PuriTemple.png'),
            tithi: 'August 12, Monday (Shravan), Cancer 28, morning 6, evening 6. ',
            sunrise: '5:29:45',
            sunset: '6:13:41',
            gdTime: '(Amrita) - From sunrise 7:07 AM, From 10:19 AM to 12:43 PM, from sunset 6:58 PM to 9:22 PM, From 11:46 PM to 2:58 AM. (Mandatory) From sunrise 7:06 AM to 4:43 PM',
            bdTime: '(Kalabela) - Day: 6:06 AM to 8:41 AM, Evening: 2:48 PM to 4:21 PM, Night: 10:26 PM to 11:51 PM. ',
        },

        {
            id: 13,
            date: '13/08/2024',
            day: 'Tuesday',
            name: 'Jhulana Jatra in Shrimandiara',
            spclDesc: '',
            Image: require('../../assets/Images/PuriBeach.png'),
            tithi: '(13) August, Tuesday (Shravan) Kartika 29, evening Shravan Kartika 22. ',
            sunrise: '5:30:2',
            sunset: '6:13:4',
            gdTime: 'From 7:55 to 10:19, from 12:43 to 14:19, from 15:07 to 16:43, from 17:58 to 20:21, from 21:19 to 22:45. ',
            bdTime: ' From 1:24 to 2:59 during the day, from 7:06 to 8:41 during the day, from 19:33 to 20:59 at night.',
        },
        {
            id: 14,
            date: '14/08/2024',
            day: 'Wednesday',
            name: 'The start of Badinursingha Bije.  Beginning of Jhulana Jatra at the Shrimandir. ',
            spclDesc: '',
            Image: require('../../assets/Images/Mahaprasad.png'),
            tithi: '(14th) August, Wednesday (Shravan) Cancer 30th,  Sayan Shravan 23rd ',
            sunrise: '5.30am',
            sunset: '6:12:34 p.m',
            gdTime: ' (Amrit) Sunrise to 7:00am, 11:56am to 1:32am, Night 6:57am to 9:21am, 1:9am to 5:31pm. (Mahendra) Day from 03:56 to 05:32, Night from 09:21 to 10:57. ',
            bdTime: '(Kalbela) is between 8:40 AM and 10:15 AM (Barbela) Diba from 11:50 to 1:14 (Midnight) Night from 1:15 am to 2:37 am ',
        },
        {
            id: 15,
            date: '15/08/2024',
            day: 'Thursday',
            name: 'All over the place Jhulana Jatra Masanta and Sudusa Brata.',
            spclDesc: '',
            Image: require('../../assets/Images/LaxmiPuja.png'),
            tithi: '(15) August, Thursday (Shravan) Cancer Day 31, Travel Date, Sayan Shravana Day 24 ',
            sunrise: '15:30:37am',
            sunset: '6:11:45 p.m',
            gdTime: ' (Amrit) Night from 1:20 to 3:44 (Mahendra) From sunrise to 7:80am, from 10:20am to 12:44am',
            bdTime: ' (twelve hours) from dawn 2:59 am to sunset 6:12 am. (Midnight) Night from 11:49 to 2:15',
        },
        {
            id: 16,
            date: '16/08/2024',
            day: 'Friday',
            name: 'Singha Sankranti, also known as Ekadashi, is considered auspicious in the Shrimandir, marking the holy residence of Lord Jagannath. ',
            spclDesc: '',
            Image: require('../../assets/Images/Konark.png'),
            tithi: '(16) August, Friday (Bhadra), Singha Ekadashi, Saphala Tithi (10th day of the bright fortnight of Bhadra), afternoon Shravana 25th. ',
            sunrise: ' 05:30:55 AM',
            sunset: '06:11:05 PM',
            gdTime: 'From (Amrit) sunrise at 07:08 AM to 07:56 AM, from 07:56 AM to 10:20 AM, from 12:44 PM to 02:20 PM, from 03:56 PM to 05:32 PM, night from 07:43 PM to 09:19 PM, and from 03:43 AM to 04:31 AM. (Mahendra) Night from 10:55 PM to 11:43 PM, and from 04:31 AM to 05:31 AM. ',
            bdTime: 'From (Day and Dusk) 08:39 AM to 11:49 AM, and (Night) from 08:57 PM to 01:23 AM. ',
        },
        {
            id: 17,
            date: '17/08/2024',
            day: 'Saturday',
            name: 'Vishnu Pavitropana Utsav, Akshay Tritiya, and the beginning of Sharana. ',
            spclDesc: '',
            Image: require('../../assets/Images/KhajaBhoga.png'),
            tithi: '(17) August, Saturday (Bhadra), Singha Dwitiya, Saphala Tithi (11th day of the bright fortnight of Bhadra), afternoon Shravana 26th. ',
            sunrise: ' 05:31:13 AM',
            sunset: '06:10:23 PM',
            gdTime: 'From (Amrit) sunrise at 09:32 AM to 12:44 PM, from 08:30 PM to 10:54 PM, from 12:30 PM to 02:06 PM, from 02:54 PM to 04:30 PM. ',
            bdTime: '(Dusk) from 05:07 AM to 06:34 AM, from 04:34 PM to 06:10 PM, (Barvela) from 05:22 AM to 06:57 AM, (Night) from sunset to 07:30 PM, from 04:06 AM to 05:32 AM. ',
        },
        {
            id: 18,
            date: '18/08/2024',
            day: 'Sunday',
            name: 'Shiva Pavitropana Utsav. ',
            spclDesc: '',
            Image: require('../../assets/Images/rathaImg.jpeg'),
            tithi: '(18) August, Sunday (Bhadra), Singha Tritiya, Saphala Tithi (12th day of the bright fortnight of Bhadra), afternoon Shravana 27th. ',
            sunrise: ' 05:31:30 AM',
            sunset: ' 06:09:40 PM',
            gdTime: 'From (Amrit) sunrise at 06:21 AM to 09:33 AM, night from 07:42 PM to 09:18 PM. (Mahendra) From sunrise at 06:21 AM to 07:45 AM, from 12:45 PM to 01:33 PM, evening from 06:54 PM to 07:42 PM, from 12:30 PM to 03:42 PM. ',
            bdTime: '(Day and Dusk) from 10:11 AM to 1:22 pM, (Night) from 01:15 AM to 02:41 AM. ',
        },
        {
            id: 19,
            date: '19/08/2024',
            day: 'Monday',
            name: 'In the Shrimandir, the festivals of Balabhadra Janma, Rakhi Laga, Shri Baladeva Janma, Gahma Parva, Upakarma, Sanskrit Diwas, and Purnima. ',
            spclDesc: '',
            Image: require('../../assets/Images/3rathas.jpg'),
            tithi: '(19) August, Monday (Bhadra), Singha Chaturthi, afternoon Shravana 28th. ',
            sunrise: '05:31:47 AM',
            sunset: '06:08:57 PM',
            gdTime: 'From (Amrit) sunrise at 07:09 AM to 10:21 AM, from 06:53 PM to 09:17 PM. (Mahendra) Daytime from sunrise at 07:09 AM to 08:33 AM, from 06:53 PM to 07:53 PM, evening from 06:53 PM to 09:17 PM, from 03:09 PM to 04:44 PM.',
            bdTime: '(Day and Dusk) from 07:08 AM to 08:24 AM, (Barvela) from 06:46 AM to 07:29 AM, (Night) from 10:22 PM to 11:43 PM. ',
        },
        {
            id: 20,
            date: '20/08/2024',
            day: 'Tuesday',
            name: ' The conclusion of Jhulan Yatra at Shrimandir and Shreekshetra. ',
            spclDesc: '',
            Image: require('../../assets/Images/PuriTemple.png'),
            tithi: '(20) August, Tuesday (Bhadra), Singha Panchami, afternoon Shravana 29th. ',
            sunrise: ' 05:32:03 AM',
            sunset: ' 06:08:13 PM',
            gdTime: ' From (Amrit) sunrise at 07:57 AM to 10:21 AM, from 12:45 PM to 02:21 PM, from 03:09 PM to 04:45 PM, sunset at 06:08 PM to night 06:53 PM, from 09:16 PM to 11:40 PM, from 02:04 AM to 03:40 AM.',
            bdTime: '(Day and Dusk) from 06:21 AM to 07:55 AM, (Barvela) from 06:46 AM to 08:38 AM, (Night) from 07:29 PM to 08:55 PM. ',
        },
        {
            id: 21,
            date: '21/08/2024',
            day: 'Wednesday',
            name: 'The beginning of Budhibaman (Budhei) and Osha observance, and the conclusion of Sharana. ',
            spclDesc: '',
            Image: require('../../assets/Images/PuriBeach.png'),
            tithi: '(21) August, Wednesday (Bhadra), Singha Sasthi, afternoon Shravana 30th. ',
            sunrise: '05:32:29 AM',
            sunset: ' 06:07:39 PM',
            gdTime: 'From (Amrit) sunrise at 07:09 AM to 08:57 AM, from 11:57 AM to 01:33 PM, evening from 06:51 PM to 09:15 PM, from 02:03 AM to 05:33 AM, daytime from 03:57 AM to 05:33 AM, from 03:57 AM to 05:33 AM, night 05:33 AM to 05:33 AM. ',
            bdTime: ' (Day and Dusk) from 07:39 AM to 10:11 AM, (Barvela) from 07:47 AM to 09:21 AM, (Night) from 02:40 PM to 04:09 PM.',
        },
        {
            id: 22,
            date: '22/08/2024',
            day: 'Thursday',
            name: 'The third day of Angabheta and Gauri Chaturthi. ',
            spclDesc: '',
            Image: require('../../assets/Images/PuriTemple.png'),
            tithi: '(22) August, Thursday (Bhadra), Singha Saptami, afternoon Shravana 31st. ',
            sunrise: ' 05:32:34 AM',
            sunset: '06:06:34 PM',
            gdTime: 'From (Amrit) night from 01:14 AM to 03:38 AM, (Mahendra) sunrise from 07:12 AM to 08:38 AM. ',
            bdTime: '(Day and Dusk) from 10:47 AM to sunrise, (Night) from 11:47 PM to 01:14 AM. ',
        },
        {
            id: 23,
            date: '23/08/2024',
            day: 'Friday',
            name: 'The fifth day of Gruhini Raksha Panchami. ',
            spclDesc: '',
            Image: require('../../assets/Images/PuriBeach.png'),
            tithi: '(23) August, Friday (Bhadra), Singha Ashtami, evening Bhadra 1st. ',
            sunrise: ' 05:32:49 AM',
            sunset: '06:05:59 PM',
            gdTime: 'From (Amrit) morning from 07:10 AM to 10:22 AM, from 12:46 PM to 02:22 PM, from 03:58 PM to 05:34 PM, evening from 07:38 PM to 09:14 PM, from 03:50 AM to 04:26 AM. ',
            bdTime: '(Day and Dusk) from 08:40 AM to 11:47 AM, (Night) from 08:55 PM to 10:22 PM. ',
        },
        {
            id: 24,
            date: '24/08/2024',
            day: 'Saturday',
            name: 'The Rekha Panchami at Shrimandir and the Rekha at Sri G on Rahu. ',
            spclDesc: '',
            Image: require('../../assets/Images/Mahaprasad.png'),
            tithi: '(24) August, Saturday (Bhadra), Singha Navami,  evening Bhadra 2nd. ',
            sunrise: ' 05:33:06 AM',
            sunset: '06:05:14 PM',
            gdTime: '(Amrit) Day 9:34 to 12:46, Night 8:25 to 10:49, 12:25 to 2:1, 2:49 to 4:25 ',
            bdTime: '(Kalabela) morning between 5:33 am and 7:7 am, daylight between 4:29 am and 6:5 am. (Barbela) Diba 1:21 to 2:55 (Night) Sunset from 6:50 to 7:29, Night from 4:8 to 5:33. ',
        },
        {
            id: 25,
            date: '25/08/2024',
            day: 'Sunday',
            name: "At Shrimandir, the celebration of Lord Hari's birth, Garbhadak Vandapana, Yajna offerings, Khudurikuni initiation, and the beginning of Osha.",
            spclDesc: '',
            Image: require('../../assets/Images/LaxmiPuja.png'),
            tithi: '(25) August, Sunday (Bhadra), Singha Dashami,  evening Bhadra 3rd.',
            sunrise: '05:33:20 AM',
            sunset: '06:04:26 PM',
            gdTime: '(Amrit) Day 6:22 AM, 12:46 AM to 1:34 AM, Night 7:36 AM to 9:12 AM. (Mahendra) Sunrise to Day 6:22 PM, 12:46 AM to 1:34 AM, Night 6:48 AM to 7:26 AM, 12:24 AM to 3:36 AM. ',
            bdTime: ' (bar and clock hours) from 10:09 to 19:00 (Night) from 1:14 am to 2:41 am ',
        },
        {
            id: 26,
            date: '26/08/2024',
            day: 'Monday',
            name: "At Shrimandir, the celebration of Sri Ramanuja's Birth Anniversary, Shani Mahagraha Jayanti, and the Establishment Day of the World Hindu Council.",
            spclDesc: '',
            Image: require('../../assets/Images/Konark.png'),
            tithi: '(26) August, Monday (Bhadra), Singha Ekadashi, evening Bhadra 4th. ',
            sunrise: ' 05:33:34 AM',
            sunset: ' 06:03:38 PM',
            gdTime: '(Amrit) Sunrise to 7:11 AM, 10:23 AM to 12:4 AM, Night 6:47 AM to 9:11 AM, 11:35 AM to 2:47 AM. (Mahendra) Diba from 03:11 to 04:47 ',
            bdTime: '(Kaalbela) between 7:80am and 8:41am (Barbela) Diba from 2:54 am to 4:27 pm (Night) from 10:20 to 11:47',
        },
        {
            id: 27,
            date: '27/08/2024',
            day: 'Tuesday',
            name: 'The celebration of Nandotsav and the birth of Sri Hari, as recognized by the followers of Ramanuja Vaishnavism, will be observed at the Jagannath Temple. ',
            spclDesc: '',
            Image: require('../../assets/Images/KhajaBhoga.png'),
            tithi: '27th August, Tuesday (Bhadra), during the lunar month of Singha',
            sunrise: '5:33:49 AM',
            sunset: '6:02:49 PM',
            gdTime: '(Amrit) Daylight 7:59 to 10:23, 12:47 to 2:23, 3:11 to 4:47, Sunset 6:3 to 6:50, 9:10 to 11 In 34, from 1:58 to 3:34',
            bdTime: '(Kaalbela) between 1:18 am and 2:51 am (Barbela) from 7:00 AM to 8:41 AM (Night) from 07:26 to 08:53',
        },
        {
            id: 28,
            date: '28/08/2024',
            day: 'Wednesday',
            name: 'At the Jagannath Temple, there will be special attire for Lord Jagannath, resembling the attire worn during the kolibika, and killing of Bakasura, and Arisura, as part of the celebration of Nandotsav recognized by Ramanuja Vaishnavism. ',
            spclDesc: '',
            Image: require('../../assets/Images/LaxmiPuja.png'),
            tithi: '28th August, Wednesday (Bhadra), during the lunar month of Singha. ',
            sunrise: '5:34:43 AM',
            sunset: ' 6:02:01 PM',
            gdTime: '(Amrit) Sunrise to 7:11 AM, 11:59 AM to 1:35 AM, Night 6:45 AM to 9:09 AM, 1:56 PM to 3:45 PM. (Mahendra) Day from 03:58 to 05:34, Night from 09:11 to 10:47. ',
            bdTime: '(Kaalbela) Day from 8:40 to 10:12 (Barbela) Diba between 11:45 to 1:18 (Night) between 2:40 am and 4:8 am ',
        },
        {
            id: 29,
            date: '29/08/2024',
            day: 'Thursday',
            name: 'At the Jagannath Temple, there will be the observance of Kaliyadalana (Ajaa Ekadashi), along with special attire for the occasion and the enactment of the killing of Dhenukasura, as part of the celebration of National Sports Day. ',
            spclDesc: '',
            Image: require('../../assets/Images/rathaImg.jpeg'),
            tithi: '(29) August, Thursday (Vadra) Singh Divaran,  Sayan Vadra 7 ',
            sunrise: '5:34:16 AM',
            sunset: '6:01:12 PM',
            gdTime: '(Amrit) night from 1:9 to 3:33 (Mahendra) From sunrise to 7:11 a.m. to 9:35 a.m. to 11:59 a.m. ',
            bdTime: ' (twelfth and night hours) Diba from 2:52 pm to 6:1 pm (Night) from 11:46 to 1:14 ',
        },
        {
            id: 30,
            date: '30/08/2024',
            day: 'Friday',
            name: 'At the Jagannath Temple, there will be special attire for Lord Jagannath representing the killing of Pralambasura, observed by all Vaishnavs, along with the observance of Pakshavardhini (Mahadwadashi) and Ekadashi fasting.',
            spclDesc: '',
            Image: require('../../assets/Images/3rathas.jpg'),
            tithi: '30th August, Friday (Bhadra), during the lunar month of Singha. ',
            sunrise: ' 5:34:30 AM',
            sunset: '6:00:02 PM',
            gdTime: 'Daytime (Amrita) - From sunrise at 5:11 AM to 7:59 AM, from 7:59 AM to 10:23 AM, from 12:47 PM to 2:23 PM, from 3:59 PM to 5:35 PM, and from 7:32 PM to 9:08 PM, and from 3:32 AM to 4:20 AM the next day.(Mahendra) - From 8:40 AM to 11:45 AM.',
            bdTime: 'Nighttime (Kalaraatri) - From 8:39 PM to 1:17 AM. ',
        },
        {
            id: 31,
            date: '31/08/2024',
            day: 'Saturday',
            name: 'At the Jagannath Temple, there will be the depiction of Krishna-Balarama attire, along with Annapratha (first grains feeding ceremony), and the observance of the beginning of Dwapara Yuga (Dwadashi Shradh). a',
            spclDesc: '',
            Image: require('../../assets/Images/PuriTemple.png'),
            tithi: '31st of August, Saturday, during the lunar month of Bhadra, and the sunset occurs on the 25th. ',
            sunrise: ' 5:34:47 AM',
            sunset: '5:59:32 PM',
            gdTime: ' From 9:35 AM to 12:47 PM, from 8:19 PM to 10:43 PM, from 12:19 PM to 1:55 PM, and from 2:43 PM to 4:19 PM, and from 12:43 AM to 1:55 AM the next day. ',
            bdTime: "Morning (Kalabela) - From 5:35 AM to 7:00 AM, from 4:26 AM to 6:00 AM.', Daytime (Barabela) - From 1:18 PM to 2:51 PM. Nighttime (Kalaratri) - From 6:00 PM to 7:25 PM, and from 4:07 AM to 5:35 AM the next day.",
        },
    ]

    const CUSTOMOdia_DATE = [
        { id: 1, showDate: '୨୮', disable: 'yes', date: '28/07/2024', spclEvent: 'no' },
        { id: 2, showDate: '୨୯', disable: 'yes', date: '29/07/2024', spclEvent: 'no' },
        { id: 3, showDate: '୩୦', disable: 'yes', date: '30/07/2024', spclEvent: 'no' },
        { id: 4, showDate: '୩୧', disable: 'yes', date: '31/07/2024', spclEvent: 'no' },
        { id: 5, showDate: '୧', disable: 'no', date: '01/08/2024', spclEvent: 'no' },
        { id: 6, showDate: '୨', disable: 'no', date: '02/08/2024', spclEvent: 'yes' },
        { id: 7, showDate: '୩', disable: 'no', date: '03/08/2024', spclEvent: 'no' },
        { id: 8, showDate: '୪', disable: 'no', date: '04/08/2024', spclEvent: 'yes' },
        { id: 9, showDate: '୫', disable: 'no', date: '05/08/2024', spclEvent: 'no' },
        { id: 10, showDate: '୬', disable: 'no', date: '06/08/2024', spclEvent: 'no' },
        { id: 11, showDate: '୭', disable: 'no', date: '07/08/2024', spclEvent: 'no' },
        { id: 12, showDate: '୮', disable: 'no', date: '08/08/2024', spclEvent: 'no' },
        { id: 13, showDate: '୯', disable: 'no', date: '09/08/2024', spclEvent: 'yes' },
        { id: 14, showDate: '୧୦', disable: 'no', date: '10/08/2024', spclEvent: 'no' },
        { id: 15, showDate: '୧୧', disable: 'no', date: '11/08/2024', spclEvent: 'no' },
        { id: 16, showDate: '୧୨', disable: 'no', date: '12/08/2024', spclEvent: 'no' },
        { id: 17, showDate: '୧୩', disable: 'no', date: '13/08/2024', spclEvent: 'yes' },
        { id: 18, showDate: '୧୪', disable: 'no', date: '14/08/2024', spclEvent: 'yes' },
        { id: 19, showDate: '୧୫', disable: 'no', date: '15/08/2024', spclEvent: 'yes' },
        { id: 20, showDate: '୧୬', disable: 'no', date: '16/08/2024', spclEvent: 'yes' },
        { id: 21, showDate: '୧୭', disable: 'no', date: '17/08/2024', spclEvent: 'yes' },
        { id: 22, showDate: '୧୮', disable: 'no', date: '18/08/2024', spclEvent: 'yes' },
        { id: 23, showDate: '୧୯', disable: 'no', date: '19/08/2024', spclEvent: 'yes' },
        { id: 24, showDate: '୨୦', disable: 'no', date: '20/08/2024', spclEvent: 'yes' },
        { id: 25, showDate: '୨୧', disable: 'no', date: '21/08/2024', spclEvent: 'yes' },
        { id: 26, showDate: '୨୨', disable: 'no', date: '22/08/2024', spclEvent: 'yes' },
        { id: 27, showDate: '୨୩', disable: 'no', date: '23/08/2024', spclEvent: 'yes' },
        { id: 28, showDate: '୨୪', disable: 'no', date: '24/08/2024', spclEvent: 'yes' },
        { id: 29, showDate: '୨୫', disable: 'no', date: '25/08/2024', spclEvent: 'yes' },
        { id: 30, showDate: '୨୬', disable: 'no', date: '26/08/2024', spclEvent: 'yes' },
        { id: 31, showDate: '୨୭', disable: 'no', date: '27/08/2024', spclEvent: 'yes' },
        { id: 32, showDate: '୨୮', disable: 'no', date: '28/08/2024', spclEvent: 'yes' },
        { id: 33, showDate: '୨୯', disable: 'no', date: '29/08/2024', spclEvent: 'yes' },
        { id: 34, showDate: '୩୦', disable: 'no', date: '30/08/2024', spclEvent: 'yes' },
        { id: 35, showDate: '୩୧', disable: 'no', date: '31/08/2024', spclEvent: 'yes' },
    ];

    const CUSTOMEnglish_DATE = [
        { id: 1, showDate: '28', disable: 'yes', date: '28/07/2024', spclEvent: 'no' },
        { id: 2, showDate: '29', disable: 'yes', date: '29/07/2024', spclEvent: 'no' },
        { id: 3, showDate: '30', disable: 'yes', date: '30/07/2024', spclEvent: 'no' },
        { id: 4, showDate: '31', disable: 'yes', date: '31/07/2024', spclEvent: 'no' },
        { id: 5, showDate: '1', disable: 'no', date: '01/08/2024', spclEvent: 'no' },
        { id: 6, showDate: '2', disable: 'no', date: '02/08/2024', spclEvent: 'yes' },
        { id: 7, showDate: '3', disable: 'no', date: '03/08/2024', spclEvent: 'no' },
        { id: 8, showDate: '4', disable: 'no', date: '04/08/2024', spclEvent: 'yes' },
        { id: 9, showDate: '5', disable: 'no', date: '05/08/2024', spclEvent: 'no' },
        { id: 10, showDate: '6', disable: 'no', date: '06/08/2024', spclEvent: 'no' },
        { id: 11, showDate: '7', disable: 'no', date: '07/08/2024', spclEvent: 'no' },
        { id: 12, showDate: '8', disable: 'no', date: '08/08/2024', spclEvent: 'no' },
        { id: 13, showDate: '9', disable: 'no', date: '09/08/2024', spclEvent: 'yes' },
        { id: 14, showDate: '10', disable: 'no', date: '10/08/2024', spclEvent: 'no' },
        { id: 15, showDate: '11', disable: 'no', date: '11/08/2024', spclEvent: 'no' },
        { id: 16, showDate: '12', disable: 'no', date: '12/08/2024', spclEvent: 'no' },
        { id: 17, showDate: '13', disable: 'no', date: '13/08/2024', spclEvent: 'yes' },
        { id: 18, showDate: '14', disable: 'no', date: '14/08/2024', spclEvent: 'yes' },
        { id: 19, showDate: '15', disable: 'no', date: '15/08/2024', spclEvent: 'yes' },
        { id: 20, showDate: '16', disable: 'no', date: '16/08/2024', spclEvent: 'yes' },
        { id: 21, showDate: '17', disable: 'no', date: '17/08/2024', spclEvent: 'yes' },
        { id: 22, showDate: '18', disable: 'no', date: '18/08/2024', spclEvent: 'yes' },
        { id: 23, showDate: '19', disable: 'no', date: '19/08/2024', spclEvent: 'yes' },
        { id: 24, showDate: '20', disable: 'no', date: '20/08/2024', spclEvent: 'yes' },
        { id: 25, showDate: '21', disable: 'no', date: '21/08/2024', spclEvent: 'yes' },
        { id: 26, showDate: '22', disable: 'no', date: '22/08/2024', spclEvent: 'yes' },
        { id: 27, showDate: '23', disable: 'no', date: '23/08/2024', spclEvent: 'yes' },
        { id: 28, showDate: '24', disable: 'no', date: '24/08/2024', spclEvent: 'yes' },
        { id: 29, showDate: '25', disable: 'no', date: '25/08/2024', spclEvent: 'yes' },
        { id: 30, showDate: '26', disable: 'no', date: '26/08/2024', spclEvent: 'yes' },
        { id: 31, showDate: '27', disable: 'no', date: '27/08/2024', spclEvent: 'yes' },
        { id: 32, showDate: '28', disable: 'no', date: '28/08/2024', spclEvent: 'yes' },
        { id: 33, showDate: '29', disable: 'no', date: '29/08/2024', spclEvent: 'yes' },
        { id: 34, showDate: '30', disable: 'no', date: '30/08/2024', spclEvent: 'yes' },
        { id: 35, showDate: '31', disable: 'no', date: '31/08/2024', spclEvent: 'yes' },
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
            console.log("today_data-=-=-=-=111", today_data?.todayData?.tithi, today_data ? today_data.selectedLanguage : undefined);
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
                            <TouchableOpacity onPress={() => navigation.navigate('July2024')}>
                                <AntDesign name="caretleft" color={'#000'} size={25} />
                            </TouchableOpacity>
                            {selectedLanguage === "Odia" &&
                                <Text style={{ color: '#000', fontSize: 17, fontWeight: '600' }}>ଅଗଷ୍ଟ  ୨୦୨୪</Text>
                            }
                            {selectedLanguage === "English" &&
                                <Text style={{ color: '#000', fontSize: 17, fontWeight: '600' }}>August  2024</Text>
                            }
                            <TouchableOpacity onPress={() => navigation.replace('September2024')}>
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
                                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>{currentTime}</Text>
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

export default August2024

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