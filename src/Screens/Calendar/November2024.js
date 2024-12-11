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

const November2024 = (props) => {

    const eventsForOdiaMonth = [
        {
            id: 1,
            date: '01/11/2024',
            day: 'ଶୁକ୍ରବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ ଦୀପାବଳୀ ଅମାବାସ୍ୟା , ଦୀପାବଲ୍ୟୁତ୍ସବ , ପୟାଶ୍ରାଦ୍ଧ , ଗୃହେ ଓ ମନ୍ଦିରରେ ଦୀପଦାନ , ଗୋବର୍ଦ୍ଧନ ଉତ୍ସବ',
            Image: require('../../assets/Images/3rathas.jpg'),
            tithi: '(୧) ନଭେମ୍ବର , ଶୁକ୍ରବାର (କାର୍ତ୍ତିକ) ତୁଳା ଦି୧୬ନ , ରବିଅଲସସାନୀ ତା୨୮ରିଖ , ସାୟନ କାର୍ତ୍ତିକ ଦି୧୦ନ',
            sunrise: 'ଘ୫|୫୧|୪୧',
            sunset: 'ଘ୫|୮|୫୭',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୪୨ ମଧ୍ୟେ , ଘ୭|୩୦ ରୁ ଘ୯|୫୪ ମଧ୍ୟେ , ଘ୧୨|୧୮ ରୁ ଘ୩|୩୦ ମଧ୍ୟେ , ଘ୪|୧୯ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୯ ପର୍ଯ୍ୟନ୍ତ , ସନ୍ଧ୍ୟା ଘ୫|୫୫ ରୁ ରାତ୍ରି ଘ୯|୭ ମଧ୍ୟେ , ଘ୧୧|୩୧ ରୁ ୨|୪୩ ମଧ୍ୟେ , ଘ୩|୩୧ ରୁ ନିଶାନ୍ତ ଘ୫|୭ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୪୨ ରୁ ଘ୧୧|୩୦ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୧୮ ରୁ ଘ୯|୫୪ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 2,
            date: '02/11/2024',
            day: 'ଶନିବାର',
            name: 'ଦ୍ୟୁତପ୍ରତିପଦ , ବଳୀରଜୋତ୍ସବ , ଅନ୍ନକୂଟ',
            Image: require('../../assets/Images/rathaImg.jpeg'),
            tithi: '(୨) ନଭେମ୍ବର , ଶନିବାର (କାର୍ତ୍ତିକ) ତୁଳା ଦି୧୭ନ , ରବିଅଲସସାନୀ ତା୨୯ରିଖ , ସାୟନ କାର୍ତ୍ତିକ ଦି୧୧ନ',
            sunrise: 'ଘ୫|୫୨|୭',
            sunset: 'ଘ୫|୮|୨୭',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୪୨ ମଧ୍ୟେ , ଘ୭|୩୧ ରୁ ଘ୯|୫୫ ମଧ୍ୟେ , ଘ୧୨|୧୯ ରୁ ଘ୩|୩୧ ମଧ୍ୟେ , ଘ୪|୧୯ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୮ ପର୍ଯ୍ୟନ୍ତ , ରାତ୍ରି ଘ୧୨|୧୮ ରୁ ଘ୧|୫୪ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୧|୫୪ ରୁ ଘ୨|୪୨ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ପ୍ରାତଃରୁ ଦିବା ଘ୭|୧୯ ମଧ୍ୟେ , ଘ୩|୧୨ ରୁ ଅସ୍ତ ଘ୫|୮ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୧୨|୫୫ ରୁ ଘ୨|୧୬ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୬|୪୧ ମଧ୍ୟେ , ଘ୪|୧୭ ରୁ ନିଶାନ୍ତ ଘ୫|୫୩ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 3,
            date: '03/11/2024',
            day: 'ରବିବାର',
            name: 'ଯମ ଦ୍ୱିତୀୟା , ଭାତୃଦ୍ୱିତୀୟା , ଯମେଶ୍ଵରଙ୍କ ଯାତ୍ରା , ଦ୍ୱିତୀୟା ଚନ୍ଦ୍ର ଦର୍ଶନ',
            Image: require('../../assets/Images/PuriTemple.png'),
            tithi: '(୩) ନଭେମ୍ବର , ରବିବାର (କାର୍ତ୍ତିକ) ତୁଳା ଦି୧୮ନ , ରବିଅଲସସାନୀ ତା୩୦ରିଖ , ସାୟନ କାର୍ତ୍ତିକ ଦି୧୨ନ',
            sunrise: 'ଘ୫|୫୨|୩୫',
            sunset: 'ଘ୫|୭|୫୭',
            gdTime: '(ଅମୃତ) ପ୍ରାତଃ ଦିବା ଘ୬|୪୩ ରୁ ଘ୯|୭ ମଧ୍ୟେ , ଘ୧୨|୧୯ ରୁ ଘ୩|୩୧ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୩୦ ରୁ ୯|୬ ମଧ୍ୟେ , ଘ୧୧|୩୦ ରୁ ଘ୧|୬ ମଧ୍ୟେ , ଘ୧|୫୪ ରୁ ନିଶାନ୍ତ ଘ୫|୬ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୪|୨୦ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୮ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୬ ରୁ ଘ୧୨|୫୪ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୭ ରୁ ଘ୨|୪୩ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 4,
            date: '04/11/2024',
            day: 'ସୋମବାର',
            name: '',
            Image: require('../../assets/Images/PuriBeach.png'),
            tithi: '(୪) ନଭେମ୍ବର , ସୋମବାର (କାର୍ତ୍ତିକ) ତୁଳା ଦି୧୯ନ , ଜମାଦିଅଲ୍ଅଓଲ୍  ତା୧ରିଖ , ସାୟନ କାର୍ତ୍ତିକ ଦି୧୩ନ',
            sunrise: 'ଘ୫|୫୩|୪',
            sunset: 'ଘ୫|୭|୨୮',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୩୧ ମଧ୍ୟେ , ଘ୯|୮ ରୁ ଘ୧୧|୩୨ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୨୯ ରୁ ଘ୧୦|୪୧ ମଧ୍ୟେ , ଘ୧|୫୩ ରୁ ଘ୨|୪୧ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୧୯ ରୁ ଘ୮|୪୩ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୨|୧୭ ରୁ ଘ୩|୪୧ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୯|୫୪ ରୁ ଘ୧୧|୩୦ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 5,
            date: '05/11/2024',
            day: 'ମଙ୍ଗଳବାର',
            name: 'ନାଗଚତୁର୍ଥୀ ବ୍ରତ , ମଙ୍ଗଳ ଚତୁର୍ଥୀ ସ୍ନାନ',
            Image: require('../../assets/Images/Mahaprasad.png'),
            tithi: '(୫) ନଭେମ୍ବର , ମଙ୍ଗଳବାର (କାର୍ତ୍ତିକ) ତୁଳା ଦି୨୦ନ , ଜମାଦିଅଲ୍ଅଓଲ୍ ତା୨ରିଖ , ସାୟନ କାର୍ତ୍ତିକ ଦି୧୪ନ',
            sunrise: 'ଘ୫|୫୩|୩୪',
            sunset: 'ଘ୫|୭|୦',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୪୪ ମଧ୍ୟେ , ଘ୭|୩୨ ରୁ ଘ୧୧|୩୨ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୨୯ ରୁ ଘ୮|୧୭ ମଧ୍ୟେ , ଘ୯|୫ ରୁ ଘ୧୧|୨୯ ମଧ୍ୟେ , ଘ୧|୫ ରୁ ଘ୨|୪୧ ମଧ୍ୟେ , ଘ୪|୧୮ ରୁ ନିଶାନ୍ତ ଘ୫|୬ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୭|୨୯ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୧୨|୫୪ ରୁ ଘ୨|୧୭ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୭|୨୦ ରୁ ଘ୮|୪୪ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୬|୪୦ ରୁ ଘ୮|୧୭ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 6,
            date: '06/11/2024',
            day: 'ବୁଧବାର',
            name: '',
            Image: require('../../assets/Images/LaxmiPuja.png'),
            tithi: '(୬) ନଭେମ୍ବର , ବୁଧବାର (କାର୍ତ୍ତିକ) ତୁଳା ଦି୨୧ନ , ଜମାଦିଅଲ୍ଅଓଲ୍ ତା୩ରିଖ , ସାୟନ କାର୍ତ୍ତିକ ଦି୧୫ନ',
            sunrise: 'ଘ୫|୫୪|୫',
            sunset: 'ଘ୫|୬|୩୩',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୪୪ ମଧ୍ୟେ , ଘ୭|୩୩ ରୁ ଘ୮|୨୧ ମଧ୍ୟେ , ଘ୧୦|୪୫ ରୁ ଘ୧୨|୯ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୫|୫୩ ରୁ ଘ୬|୪୧ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୧୭ ରୁ ଘ୨|୪୧ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୬|୪୫ ରୁ ଘ୭|୩୩ ମଧ୍ୟେ , ଘ୧|୫୭ ରୁ ଘ୪|୨୧ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୪୪ ରୁ ଘ୧୦|୭ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୩୦ ରୁ ଘ୧୨|୫୪ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୪୪ ରୁ ଘ୪|୨୧ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 7,
            date: '07/11/2024',
            day: 'ଗୁରୁବାର',
            name: 'ଶରଣ ଆରମ',
            Image: require('../../assets/Images/Konark.png'),
            tithi: '(୭) ନଭେମ୍ବର , ଗୁରୁବାର (କାର୍ତ୍ତିକ) ତୁଳା ଦି୨୨ନ , ଜମାଦିଅଲ୍ଅଓଲ୍ ତା୪ରିଖ , ସାୟନ କାର୍ତ୍ତିକ ଦି୧୬ନ',
            sunrise: 'ଘ୫|୫୪|୩୮',
            sunset: 'ଘ୫|୬|୮',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୩୩ ମଧ୍ୟେ , ଘ୧|୩୫ ରୁ ଘ୩|୩୩ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୫|୫୨ ରୁ ରାତ୍ରି ଘ୯|୪ ମଧ୍ୟେ , ଘ୧୧|୨୮ ରୁ ଘ୨|୪୦ ମଧ୍ୟେ , ଘ୩|୨୮ ରୁ ନିଶାନ୍ତ ଘ୫|୪ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୨|୧୮ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୬ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୩୧ ରୁ ଘ୧|୮ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 8,
            date: '08/11/2024',
            day: 'ଶୁକ୍ରବାର',
            name: 'ଦୁର୍ଗାଦେବୀଙ୍କର ଅନୁକଳ୍ପ ସପ୍ତମୀ ପୂଜା , ମୁକ୍ତିମଣ୍ଡପର ଷୋହଳ ଶାସନ ଅମୃତ ମଣୋହି ଭୋଗ',
            Image: require('../../assets/Images/KhajaBhoga.png'),
            tithi: '(୮) ନଭେମ୍ବର , ଶୁକ୍ରବାର (କାର୍ତ୍ତିକ) ତୁଳା ଦି୨୩ନ , ଜମାଦିଅଲ୍ଅଓଲ୍ ତା୫ରିଖ , ସାୟନ କାର୍ତ୍ତିକ ଦି୧୭ନ',
            sunrise: 'ଘ୫|୫୫|୭',
            sunset: 'ଘ୫|୫|୪୫',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ପ୍ରାତଃ ଘ୬|୪୫ ମଧ୍ୟେ , ଘ୭|୨୯ ରୁ ଘ୮|୧୭ ମଧ୍ୟେ , ଦିବା ଘ୭|୩୪ ରୁ ଘ୯|୫୮ ମଧ୍ୟେ , ଘ୧୨|୨୨ ରୁ ଘ୩|୩୪ ମଧ୍ୟେ , ଘ୪|୨୩ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୬ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୪୫ ରୁ ଘ୧୧|୩୧ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୧୮ ରୁ ଘ୯|୫୪ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 9,
            date: '09/11/2024',
            day: 'ଶନିବାର',
            name: 'ଦୁର୍ଗାଦେବୀଙ୍କର ଅନୁକଳ୍ପ ଅଷ୍ଟମୀ ପୂଜା , ଗୋଷ୍ଠାଷ୍ଟମୀ , ଗୋବର୍ଦ୍ଧନ ପୀଠେ ଗୋମହୋତ୍ସବ , ଭାଗବତ ସପ୍ତାହ ଆରମ୍ଭ',
            Image: require('../../assets/Images/3rathas.jpg'),
            tithi: '(୯) ନଭେମ୍ବର , ଶନିବାର (କାର୍ତ୍ତିକ) ତୁଳା ଦି୨୪ନ , ଜମାଦିଅଲ୍ଅଓଲ୍ ତା୬ରିଖ , ସାୟନ କାର୍ତ୍ତିକ ଦି୧୮ନ',
            sunrise: 'ଘ୫|୫୫|୩୯',
            sunset: 'ଘ୫|୫|୨୩',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୪୭ ମଧ୍ୟେ , ଘ୭|୩୫ ରୁ ଘ୯|୫୯ ମଧ୍ୟେ , ଘ୧୨|୨୩ ରୁ ଘ୩|୩୫ ମଧ୍ୟେ , ଘ୪|୨୩ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୫ ମଧ୍ୟେ , ରାତ୍ରି ଘ୧୨|୧୬ ରୁ ଘ୧|୫୨ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୧|୫୨ ରୁ ଘ୨|୪୦ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ପ୍ରାତଃରୁ ଦିବା ଘ୭|୨୨ ମଧ୍ୟେ , ଘ୩|୪୨ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୫ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୨|୫୪ ରୁ ଘ୨|୧୭ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୬|୪୦ ମଧ୍ୟେ , ଘ୪|୧୯ ରୁ ନିଶାନ୍ତ ଘ୫|୫୬ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 10,
            date: '10/11/2024',
            day: 'ରବିବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ ଓ ସର୍ବତ୍ର ଅଁଳା ନବମୀ , ଶ୍ରୀଦୁର୍ଗାଦେବୀଙ୍କର ଅନୁକଳ୍ପ ନବମୀ ପୂଜା , ଜଗମୋହନ ଭୋଗ , ଧାତ୍ରୀପୂଜା , ଜଗଦ୍ଧାତ୍ରୀ ପାଦଦର୍ଶନ ଉତ୍ସବ',
            Image: require('../../assets/Images/rathaImg.jpeg'),
            tithi: '(୧୦) ନଭେମ୍ବର  , ରବିବାର (କାର୍ତ୍ତିକ) ତୁଳା ଦି୨୫ନ , ଜମାଦିଅଲ୍ଅଓଲ୍ ତା୭ରିଖ , ସାୟନ କାର୍ତ୍ତିକ ଦି୧୯ନ ',
            sunrise: 'ଘ୫|୫୬|୧୦',
            sunset: 'ଘ୫|୫|୨',
            gdTime: '(ଅମୃତ) ପ୍ରାତଃ ଦିବା ଘ୬|୪୬ ଦିବା ଘ୯|୧୦ ପର୍ଯ୍ୟନ୍ତ , ଘ୧୨|୨୩ ରୁ  ଘ୩|୩୫ ମଧ୍ୟେ ରାତ୍ରି ଘ୭|୨୮ ରୁ ଘ୯|୪ ମଧ୍ୟେ , ଘ୧୧|୨୮ ରୁ ଘ୧|୫ ମଧ୍ୟେ , ଘ୧|୫୨ ରୁ ନିଶାନ୍ତ ଘ୫|୪ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୪|୨୩ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୫ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୧୦|୮ ରୁ ଘ୧୨|୫୮ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୯ ରୁ ଘ୨|୪୬ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 11,
            date: '11/11/2024',
            day: 'ସୋମବାର',
            name: 'ଶ୍ରୀଜଗନ୍ନାଥଙ୍କ ରାଧାଦାମୋଦର ବେଶ ସମାପ୍ତି , ଶରଣ ଶେଷ',
            Image: require('../../assets/Images/PuriTemple.png'),
            tithi: '(୧୧) ନଭେମ୍ବର , ସୋମବାର (କାର୍ତ୍ତିକ) ତୁଳା ଦି୨୬ନ , ଜମାଦିଅଲ୍ଅଓଲ୍ ତା୮ରିଖ , ସାୟନ କାର୍ତ୍ତିକ ଦି୨୦ନ',
            sunrise: 'ଘ୫|୫୬|୪୨',
            sunset: 'ଘ୫|୪|୪୨',
            gdTime: '(ଅମୃତ) ପ୍ରାତଃରୁ ଦିବା ଘ୭|୩୫ ମଧ୍ୟେ , ଘ୯|୧୨ ରୁ ଦିବା ଘ୧୧|୩୬ ମଧ୍ୟେ , ରାତ୍ରି  ଘ୭|୨୭ ରୁ ଘ୧୦|୩୯ ମଧ୍ୟେ , ଘ୧|୫୧ ରୁ ଘ୨|୩୯ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୨୩ ରୁ ଘ୮|୪୬ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୨|୧୧ ରୁ ଘ୩|୪୦ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୯|୫୪ ରୁ ଘ୧୧|୩୨ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 12,
            date: '12/11/2024',
            day: 'ମଙ୍ଗଳବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରେ ଶ୍ରୀହରି ଉତ୍ଥାପନ , ଶରଦ୍ରାସାରମ୍ଭ , ସର୍ବସମ୍ମତ ଦେବୋଉତ୍ଥାପନ (ବଡ) ଏକାଦଶୀ ଉପବାସ , ଶ୍ରୀଜୀଙ୍କର ଲକ୍ଷ୍ମୀନାରାୟଣ ବେଶ , ପଞ୍ଚକ ବ୍ରତ ଆରମ୍ଭ',
            Image: require('../../assets/Images/PuriBeach.png'),
            tithi: '(୧୨)  ନଭେମ୍ବର , ମଙ୍ଗଳବାର (କାର୍ତ୍ତିକ) ତୁଳା ଦି୨୭ନ , ଜମାଦିଅଲ୍ଅଓଲ୍ ତା୯ରିଖ , ସାୟନ କାର୍ତ୍ତିକ ଦି୨୧ନ',
            sunrise: 'ଘ୫|୫୭|୧୫',
            sunset: 'ଘ୫|୪|୨୧',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୪୭ ମଧ୍ୟେ , ଦିବା ଘ୭|୩୬ ରୁ ଘ୧୧|୩ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୨୭ ରୁ ଘ୮|୧୫ ମଧ୍ୟେ , ଘ୯|୩ ରୁ ଘ୧୧|୨୭ ମଧ୍ୟେ , ଘ୧|୩ ରୁ ଘ୨|୩୯ ମଧ୍ୟେ , ଘ୪|୧୫ ରୁ ନିଶାନ୍ତ ଘ୫|୩ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୭|୨୭ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୧୨|୫୪ ରୁ ଘ୨|୧୭ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୭|୨୪ ରୁ ଘ୮|୪୩ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୬|୪୦ ରୁ ଘ୮|୧୭ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 13,
            date: '13/11/2024',
            day: 'ବୁଧବାର',
            name: 'ଶ୍ରୀଜୀଉଙ୍କର ବାଙ୍କଚୂଡା ବେଶ , ଗରୁଡ ଉତ୍ଥାପନ , ତୁଳସୀ ବିବାହ',
            Image: require('../../assets/Images/Mahaprasad.png'),
            tithi: '(୧୩) ନଭେମ୍ବର , ବୁଧବାର (କାର୍ତ୍ତିକ) ତୁଳା ଦି୨୮ନ , ଜମାଦିଅଲ୍ଅଓଲ୍ ତା୧୦ରିଖ , ସାୟନ କାର୍ତ୍ତିକ ଦି୨୨ନ',
            sunrise: 'ଘ୫|୫୦|୪୬',
            sunset: 'ଘ୫|୧୦|୨',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୪୮ ମଧ୍ୟେ , ଘ୭|୩୭ ରୁ ଘ୮|୨୫ ମଧ୍ୟେ , ଘ୧୦|୪୯ ରୁ ଘ୧|୧୩ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୫|୫୧ ରୁ ଘ୬|୩୯ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୧୫ ରୁ ଘ୨|୩୯ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ପ୍ରାତଃ ଘ୬|୪୯ ରୁ ଘ୭|୩୭ ମଧ୍ୟେ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୪୬ ରୁ ଘ୧୦|୯ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୩୨ ରୁ ଘ୧୨|୫୪ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୪୨ ରୁ ଘ୪|୨୪ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 14,
            date: '14/11/2024',
            day: 'ଗୁରୁବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ ଶ୍ରୀଜୀଉଙ୍କର ଡାଳିକିଆ ବା ତ୍ରିବିକ୍ରମ ବେଶ , ଶିବେଉତ୍ଥାପନ , ବଡଓଷା , ବୈକୁଣ୍ଠ ଚତୁରଦର୍ଶୀ',
            Image: require('../../assets/Images/LaxmiPuja.png'),
            tithi: '(୧୪) ନଭେମ୍ବର , ଗୁରୁବାର (କାର୍ତ୍ତିକ) ତୁଳା ଦି୨୯ନ , ଜମାଦିଅଲ୍ଅଓଲ୍ ତା୧୧ରିଖ , ସାୟନ କାର୍ତ୍ତିକ ଦି୨୩ନ',
            sunrise: 'ଘ୫|୫୮|୨୬',
            sunset: 'ଘ୫|୩|୪୬',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୩୭ ମଧ୍ୟେ , ଘ୨|୨ ରୁ ଘ୩|୩୮ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୫|୫୧ ରୁ ରାତ୍ରି ଘ୯|୩ ମଧ୍ୟେ , ଘ୧୧|୨୭ ରୁ ଘ୨|୩୯ ମଧ୍ୟେ , ଘ୩|୨୭ ରୁ ନିଶାନ୍ତ ଘ୫|୩ ମଧ୍ୟେ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୬|୪୩ ରୁ ଘ୭|୨୯ ମଧ୍ୟେ , ଘ୧|୫୩ ରୁ ଘ୪|୧୭ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୨|୧୭ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୪ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୩୨ ରୁ ଘ୧|୯ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 15,
            date: '15/11/2024',
            day: 'ଶୁକ୍ରବାର',
            name: 'ରାସପୂର୍ଣ୍ଣିମା , ବୋଇତ ବନ୍ଦାଣ , ବାଲିଯାତ୍ରା , ଶ୍ରୀଜଗନ୍ନାଥଙ୍କର ରାଜାଧିରାଜ ବେଶ , ଭାଗବତ ଜନ୍ମ , କେଦାର ବ୍ରତ , ରାହୁଗ୍ରହ ଜୟନ୍ତୀ , କାର୍ତ୍ତିକ ବ୍ରତ ସମାପ୍ତି , ମାସାନ୍ତ',
            Image: require('../../assets/Images/Konark.png'),
            tithi: '(୧୫) ନଭେମ୍ବର , ଶୁକ୍ରବାର (କାର୍ତ୍ତିକ) ତୁଳା ଦି୩୦ନ , ଜମାଦିଅଲ୍ଅଓଲ୍ ତା୧୨ରିଖ , ସାୟନ କାର୍ତ୍ତିକ ଦି୨୪ନ',
            sunrise: 'ଘ୫|୫୮|୫୯',
            sunset: 'ଘ୫|୩|୩୧',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୪୯ ମଧ୍ୟେ , ଘ୭|୩୮ ରୁ ଘ୧୦|୨ ମଧ୍ୟେ , ଘ୧୨|୨୬ ରୁ ଘ୩|୩୮ ମଧ୍ୟେ , ଘ୪|୨୭ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୪ ପର୍ଯ୍ୟନ୍ତ , ସନ୍ଧ୍ୟା ଘ୫|୫୧ ରୁ ରାତ୍ରି ଘ୯|୩ ମଧ୍ୟେ , ଘ୧୧|୨୭ ରୁ ଘ୨|୩୯ ମଧ୍ୟେ , ଘ୩|୨୭ ନିଶାନ୍ତ ଘ୫|୩ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୪୮ ରୁ ଘ୧୧|୩୨ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୧୭ ରୁ ଘ୯|୫୫ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 16,
            date: '16/11/2024',
            day: 'ଶନିବାର',
            name: 'ବିଛା ସଂକ୍ରାନ୍ତି , କାର୍ତ୍ତିକେୟ ବ୍ରତ ଓ ପୂଜା , ଛାଡଖାଇ',
            Image: require('../../assets/Images/KhajaBhoga.png'),
            tithi: '(୧୬) ନଭେମ୍ବର , ଶନିବାର (ମାର୍ଗଶିର) ବିଛା ଦି୧ନ , ଜମାଦିଅଲ୍ଅଓଲ୍ ତା୧୩ରିଖ , ସାୟନ କାର୍ତ୍ତିକ ଦି୨୫ନ',
            sunrise: 'ଘ୫|୫୯|୩୩',
            sunset: 'ଘ୫|୩|୧୭',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୪୮ ମଧ୍ୟେ , ଘ୭|୩୯ ରୁ ଘ୧୦|୩ ମଧ୍ୟେ , ଘ୧୨|୨୭ ରୁ ଘ୩|୩୯ ମଧ୍ୟେ , ଘ୪|୨୭ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୩ ପର୍ଯ୍ୟନ୍ତ , ରାତ୍ରି ଘ୧୨|୧୫ ରୁ ଘ୧|୫୧ ମଧ୍ୟେ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୧|୫୧ ରୁ ଘ୨|୩୯ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ପ୍ରାତଃ ଘ୬|୦ ରୁ ଘ୭|୨୪ ମଧ୍ୟେ , ଦିବା ଘ୩|୪୦ ରୁ ଘ୫|୩ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୨|୫୫ ରୁ ଘ୨|୧୭ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୩ ରୁ ଘ୬|୪୦ ମଧ୍ୟେ ରାତ୍ରି ଘ୪|୨୪ ରୁ ରାତ୍ରିଶେଷ ଘ୬|୦ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 17,
            date: '17/11/2024',
            day: 'ରବିବାର',
            name: '',
            Image: require('../../assets/Images/3rathas.jpg'),
            tithi: '(୧୭) ନଭେମ୍ବର , ରବିବାର (ମାର୍ଗଶିର) ବିଛା ଦି୨ନ , ଜମାଦିଅଲ୍ଅଓଲ୍ ତା୧୪ରିଖ , ସାୟନ କାର୍ତ୍ତିକ ଦି୨୬ନ',
            sunrise: 'ଘ୬|୦|୬',
            sunset: 'ଘ୫|୩|୬',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୬|୫୧ ରୁ ଘ୯|୧୫ ମଧ୍ୟେ , ଘ୧୨|୨୭ ରୁ ଘ୩|୩୯ ମଧ୍ୟେ , ରାତ୍ରି  ଘ୭|୨୭ ରୁ ଘ୯|୩ ମଧ୍ୟେ , ଘ୧୨|୨୭ ରୁ ଘ୧|୩ ମଧ୍ୟେ , ଘ୧|୫୧ ରୁ ନିଶାନ୍ତ ଘ୫|୩ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୪|୨୭ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୩ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୧୧ ରୁ ଘ୧୨|୫୫ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୧୧ ରୁ ଘ୨|୪୯ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 18,
            date: '18/11/2024',
            day: 'ସୋମବାର',
            name: '',
            Image: require('../../assets/Images/rathaImg.jpeg'),
            tithi: '(୧୮) ନଭେମ୍ବର , ସୋମବାର (ମାର୍ଗଶିର) ବିଛା ଦି୩ନ , ଜମାଦିଅଲ୍ଅଓଲ୍ ତା୧୫ରିଖ , ସାୟନ କାର୍ତ୍ତିକ ଦି୨୭ନ',
            sunrise: 'ଘ୬|୦|୪୧',
            sunset: 'ଘ୫|୨|୫୫',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୩୯ ମଧ୍ୟେ , ଘ୯|୧୬ ରୁ ଘ୧୧|୪ ମଧ୍ୟେ , ରାତ୍ରି  ଘ୭|୨୬ ରୁ ଘ୧୦|୩୮ ମଧ୍ୟେ , ଘ୧|୫୦ ରୁ ଘ୨|୩୮ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୨୫ ରୁ ଘ୮|୪୮ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୨|୧୮ ରୁ ଘ୩|୪୦ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୯|୫୫ ରୁ ଘ୧୧|୩୩ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 19,
            date: '19/11/2024',
            day: 'ମଙ୍ଗଳବାର',
            name: 'ସୀତା ବିବାହ',
            Image: require('../../assets/Images/PuriTemple.png'),
            tithi: '(୧୯) ନଭେମ୍ବର , ମଙ୍ଗଳବାର (ମାର୍ଗଶିର) ବିଛା ଦି୪ନ , ଜମାଦିଅଲ୍ଅଓଲ୍ ତା୧୬ରିଖ , ସାୟନ କାର୍ତ୍ତିକ ଦି୨୮ନ',
            sunrise: 'ଘ୬|୧|୧୬',
            sunset: 'ଘ୫|୨|୪୬',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୫୨ ମଧ୍ୟେ , ଘ୭|୪୧ ରୁ ଘ୧୧|୪୧ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୨୭ ରୁ ଘ୮|୧୫ ମଧ୍ୟେ , ଘ୯|୩ ରୁ ଘ୧୧|୨୭ ମଧ୍ୟେ , ଘ୧|୩ ରୁ ଘ୨|୩୯ ମଧ୍ୟେ , ଘ୪|୧୫ ରୁ ନିଶାନ୍ତ ଘ୫|୩ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଅସ୍ତରୁ ରାତ୍ରି ଘ୭|୨୭ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୧୨|୫୬ ରୁ ଘ୨|୧୮ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୭|୨୬ ରୁ ଘ୮|୪୮ ମଧ୍ୟେ | (କାଳରାତ୍ରି)ସନ୍ଧ୍ୟା ଘ୬|୪୦ ରୁ ଘ୮|୧୮ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 20,
            date: '20/11/2024',
            day: 'ବୁଧବାର',
            name: 'ଶ୍ରୀକ୍ଷେତ୍ରେ ପରିକ୍ରମା , ସିଦ୍ଧ ମହାବୀରଙ୍କ ନାଗାବେଶ',
            Image: require('../../assets/Images/PuriBeach.png'),
            tithi: '(୨୦) ନଭେମ୍ବର , ବୁଧବାର (ମାର୍ଗଶିର) ବିଛା ଦି୫ନ , ଜମାଦିଅଲ୍ଅଓଲ୍ ତା୧୭ରିଖ , ସାୟନ କାର୍ତ୍ତିକ ଦି୨୯ନ',
            sunrise: 'ଘ୬|୧|୫୪',
            sunset: 'ଘ୫|୨|୩୮',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୫୨ ମଧ୍ୟେ , ଘ୭|୪୧ ରୁ ଘ୮|୨୯ ମଧ୍ୟେ , ଘ୧୦|୫୩ ରୁ ଘ୧|୧୭ ମଧ୍ୟେ , ଅପରାହ୍ନ ଘ୪|୫୧ ରୁ ରାତ୍ରି ଘ୬|୩୯ ମଧ୍ୟେ , ଘ୮|୧୫ ରୁ ଘ୨|୩୯ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ପ୍ରାତଃ ଘ୬|୫୨ ରୁ ଘ୭|୪୧ ମଧ୍ୟେ , ଘ୨|୫ ରୁ ଘ୪|୨୯ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୪୯ ରୁ ଘ୧୦|୧୧ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୩୩ ରୁ ଘ୧୨|୫୫ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୪୯ ରୁ ଘ୪|୨୭ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 21,
            date: '21/11/2024',
            day: 'ଗୁରୁବାର',
            name: 'ମାର୍ଗଶିର ପ୍ରଥମ ଗୁରୁବାର',
            Image: require('../../assets/Images/Mahaprasad.png'),
            tithi: '(୨୧) ନଭେମ୍ବର , ଗୁରୁବାର (ମାର୍ଗଶିର) ବିଛା ଦି୬ନ , ଜମାଦିଅଲ୍ଅଓଲ୍ ତା୧୮ରିଖ , ସାୟନ କାର୍ତ୍ତିକ ଦି୩୦ନ',
            sunrise: 'ଘ୬|୨|୩୦',
            sunset: 'ଘ୫|୨|୩୦',
            gdTime: '(ଅମୃତ) ପ୍ରାତଃରୁ ଦିବା ଘ୭|୪୨ ମଧ୍ୟେ , ଘ୨|୬ ରୁ ଘ୩|୪୨ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୫|୫୧ ରୁ ରାତ୍ରି ଘ୯|୧୩ ମଧ୍ୟେ , ଘ୧୧|୨୭ ରୁ ଘ୨|୩୯ ମଧ୍ୟେ , ଘ୩|୨୭ ରୁ ନିଶାନ୍ତ ଘ୫|୩ ମଧ୍ୟେ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୨|୧୮ ରୁ ଘ୫|୩ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୩୫ ରୁ ଘ୧|୧୩ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 22,
            date: '22/11/2024',
            day: 'ଶୁକ୍ରବାର',
            name: '',
            Image: require('../../assets/Images/LaxmiPuja.png'),
            tithi: '(୨୨) ନଭେମ୍ବର , ଶୁକ୍ରବାର (ମାର୍ଗଶିର) ବିଛା ଦି୭ନ , ଜମାଦିଅଲ୍ଅଓଲ୍ ତା୧୯ରିଖ , ସାୟନ ମାର୍ଗଶିର ଦି୧ନ',
            sunrise: 'ଘ୬|୩|୮',
            sunset: 'ଘ୫|୨|୨୨',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୫୪ ମଧ୍ୟେ , ଘ୭|୪୩ ରୁ ଘ୧୦|୭ ମଧ୍ୟେ , ଘ୧୨|୩୧ ରୁ ଘ୩|୪୩ ମଧ୍ୟେ , ଘ୪|୩୧ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୨ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୫|୫୧ ରୁ ରାତ୍ରି ଘ୯|୩ ମଧ୍ୟେ , ଘ୧୧|୨୭ ରୁ ଘ୨|୩୯ ମଧ୍ୟେ , ଘ୩|୨୭ ରୁ ନିଶାନ୍ତ ଘ୫|୩ ମଧ୍ୟେ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୮|୪୮ ରୁ ଘ୧୧|୩୨ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୩୫ ରୁ ଘ୧|୧୩ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 23,
            date: '23/11/2024',
            day: 'ଶନିବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରେ ଓ ସର୍ବତ୍ର ପ୍ରଥମାଷ୍ଟମୀ , ଅଷ୍ଟକା ଶ୍ରାଦ୍ଧ',
            Image: require('../../assets/Images/Konark.png'),
            tithi: '(୨୩) ନଭେମ୍ବର , ଶନିବାର (ମାର୍ଗଶିର) ବିଛା ଦି୮ନ , ଜମାଦିଅଲ୍ଅଓଲ୍ ତା୨୦ରିଖ , ସାୟନ ମାର୍ଗଶିର ଦି୨ନ',
            sunrise: 'ଘ୬|୩|୪୭',
            sunset: 'ଘ୫|୨|୧୫',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୫୪ ମଧ୍ୟେ , ଘ୭|୪୩ ରୁ ଘ୧୦|୭ ମଧ୍ୟେ , ଘ୧୨|୩୧ ରୁ ଘ୩|୪୩ ମଧ୍ୟେ , ଘ୪|୩୧ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୨ ପର୍ଯ୍ୟନ୍ତ , ରାତ୍ରି ଘ୧୧|୫୧ ରୁ ଘ୧୨|୧୫ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର)ରାତ୍ରି ଘ୧୧|୫୧ ରୁ ଘ୨|୩୯ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ପ୍ରାତଃ ଘ୬|୪ ରୁ ଘ୭|୨୮ ମଧ୍ୟେ , ଦିବା ଘ୩|୪୦ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୨ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୨|୫୬ ରୁ ଘ୨|୧୮ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସନ୍ଧ୍ୟା ଘ୫|୨ ରୁ ଘ୬|୪୦ ମଧ୍ୟେ , ରାତ୍ରି ଘ୪|୨୮ ରୁ ରାତ୍ରିଶେଷ ଘ୬|୪ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 24,
            date: '24/11/2024',
            day: 'ରବିବାର',
            name: 'କାଞ୍ଜିଅଁଳା ଓଷା , ଅନ୍ଵଷ୍ଟକା ଶ୍ରାଦ୍ଧ , କାର୍ତ୍ତିକେଶ୍ଵର ମିଳନ',
            Image: require('../../assets/Images/KhajaBhoga.png'),
            tithi: '(୨୪) ନଭେମ୍ବର , ରବିବାର (ମାର୍ଗଶିର) ବିଛା ଦି୯ନ , ଜମାଦିଅଲ୍ଅଓଲ୍ ତା୨୧ରିଖ , ସାୟନ ମାର୍ଗଶିର ଦି୩ନ',
            sunrise: 'ଘ୬|୪|୨୨',
            sunset: 'ଘ୫|୨|୧୪',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୬|୫୬ ରୁ ଘ୯|୨୦ ମଧ୍ୟେ , ଘ୧୨|୩୨ ରୁ ଘ୩|୪୪ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୨୭ ରୁ ଘ୯|୩ ମଧ୍ୟେ , ଘ୧୧|୨୭ ରୁ ଘ୧|୩ ମଧ୍ୟେ , ଘ୧|୫୧ ରୁ ନିଶାନ୍ତ ଘ୫|୩ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୪|୩୨ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୨ ମଧ୍ୟେ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୧୦|୧୩ ରୁ ଘ୧୨|୨୭ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୧୩ ରୁ ଘ୨|୧୨ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 25,
            date: '25/11/2024',
            day: 'ସୋମବାର',
            name: '',
            Image: require('../../assets/Images/3rathas.jpg'),
            tithi: '(୨୫) ନଭେମ୍ବର , ସୋମବାର (ମାର୍ଗଶିର) ବିଛା ଦି୧୦ନ , ଜମାଦିଅଲ୍ଅଓଲ୍ ତା୨୨ରିଖ , ସାୟନ ମାର୍ଗଶିର ଦି୪ନ',
            sunrise: 'ଘ୬|୪|୫୮',
            sunset: 'ଘ୫|୨|୧୪',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୪୪ ମଧ୍ୟେ , ଘ୯|୨୧ ରୁ ଘ୧୧|୪୫ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୨୭ ରୁ ଘ୧୦|୩୯ ମଧ୍ୟେ , ଘ୧|୫୧ ରୁ ଘ୨|୩୯ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୬|୪୩ ରୁ ଘ୭|୨୯ ମଧ୍ୟେ , ଘ୧|୫୩ ରୁ ଘ୪|୧୭ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୨୯ ରୁ ଘ୮|୫୧ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୨|୨୯ ରୁ ଘ୩|୪୦ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ୯|୫୭ ରୁ ଘ୧୧|୩୫ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 26,
            date: '26/11/2024',
            day: 'ମଙ୍ଗଳବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରେ ଓ ରାମାନୁଜ ଭିନ୍ନ ସର୍ବସମ୍ମତ ଉତ୍ପନ୍ନା ଏକାଦଶୀ',
            Image: require('../../assets/Images/rathaImg.jpeg'),
            tithi: '(୨୬) ନଭେମ୍ବର , ମଙ୍ଗଳବାର (ମାର୍ଗଶିର) ବିଛା ଦି୧୧ନ , ଜମାଦିଅଲ୍ଅଓଲ୍ ତା୨୩ରିଖ , ସାୟନ ମାର୍ଗଶିର ଦି୫ନ',
            sunrise: 'ଘ୬|୫|୩୫',
            sunset: 'ଘ୫|୨|୧୩',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୫୬ ମଧ୍ୟେ , ଘ୭|୪୫ ରୁ ଘ୧୧|୪୫ ମଧ୍ୟେ , ରାତ୍ରି  ଘ୭|୨୭ ରୁ ଘ୮|୧୫ ମଧ୍ୟେ , ଘ୯|୩ ରୁ ୧୧|୨୭ ମଧ୍ୟେ , ଘ୪|୧୫ ରୁ ନିଶାନ୍ତ ଘ୫|୩ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୭|୨୭ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୧୨|୫୮ ରୁ ଘ୨|୧୯ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୭|୩ ରୁ ଘ୮|୩ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୬|୪୧ ରୁ ଘ୮|୨ ପର୍ଯ୍ୟନ୍ତ | ',
        },
        {
            id: 27,
            date: '27/11/2024',
            day: 'ବୁଧବାର',
            name: 'ରାମାନୁଜ ବୈଷ୍ଣବ ସମ୍ମତ ଏକାଦଶ',
            Image: require('../../assets/Images/PuriTemple.png'),
            tithi: '(୨୭) ନଭେମ୍ବର , ବୁଧବାର (ମାର୍ଗଶିର) ବିଛା ଦି୧୨ନ , ଜମାଦିଅଲ୍ଅଓଲ୍ ତା୨୪ରିଖ , ସାୟନ ମାର୍ଗଶିର ଦି୬ନ',
            sunrise: 'ଘ୬|୬|୧୨',
            sunset: 'ଘ୫|୨|୧୪',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୫୭ ମଧ୍ୟେ , ଘ୭|୪୬ ରୁ ଘ୮|୩୪ ମଧ୍ୟେ , ଘ୧୦|୫୮ ରୁ ଘ୧୧|୨୨ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୫|୫୧ ରୁ ଘ୬|୩୯ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୧୫ ରୁ ଘ୨|୩୯ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ପ୍ରାତଃ ଘ୬|୫୭ ରୁ ଦିବା ଘ୭|୪୬ ମଧ୍ୟେ , ଘ୨|୧୦ ରୁ ଘ୪|୩୪ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୫୩ ରୁ ଘ୧୦|୧୫ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୩୭ ରୁ ଘ୧୨|୫୮ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୫୪ ରୁ ଘ୪|୩୨ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 28,
            date: '28/11/2024',
            day: 'ଗୁରୁବାର',
            name: 'ମାଣବସା ଗୁରୁବାର ଓଷା ଆରମ୍ଭ',
            Image: require('../../assets/Images/PuriBeach.png'),
            tithi: '(୨୮) ନଭେମ୍ବର , ଗୁରୁବାର (ମାର୍ଗଶିର) ବିଛା ଦି୧୩ନ , ଜମାଦିଅଲ୍ଅଓଲ୍ ତା୨୫ରିଖ , ସାୟନ ମାର୍ଗଶିର ଦି୭ନ',
            sunrise: 'ଘ୬|୬|୫୧',
            sunset: 'ଘ୫|୨|୧୫',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୪୫ ମଧ୍ୟେ , ଘ୨|୧୦ ରୁ ଘ୩|୪୬ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୫|୫୧ ରୁ ରାତ୍ରି ଘ୯|୩ ମଧ୍ୟେ , ଘ୧୧|୨୭ ରୁ ଘ୨|୩୯ ମଧ୍ୟେ , ଘ୩|୨୭ ରୁ ନିଶାନ୍ତ ଘ୫|୩ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୨|୧୯ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୨ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୩୬ ରୁ ଘ୧|୬ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 29,
            date: '29/11/2024',
            day: 'ଶୁକ୍ରବାର',
            name: '',
            Image: require('../../assets/Images/Mahaprasad.png'),
            tithi: '(୨୯) ନଭେମ୍ବର , ଶୁକ୍ରବାର (ମାର୍ଗଶିର) ବିଛା ଦି୧୪ନ , ଜମାଦିଅଲ୍ଅଓଲ୍ ତା୨୬ରିଖ , ସାୟନ ମାର୍ଗଶିର ଦି୮ନ',
            sunrise: 'ଘ୬|୭|୩୧',
            sunset: 'ଘ୫|୨|୧୭',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୫୮ ମଧ୍ୟେ , ଘ୭|୪୭ ରୁ ଘ୧୦|୧୧ ମଧ୍ୟେ , ଘ୧୨|୩୫ ରୁ ଘ୩|୪୭ ମଧ୍ୟେ , ଘ୪|୩୪ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୨ ପର୍ଯ୍ୟନ୍ତ , ସନ୍ଧ୍ୟା ଘ୫|୫୧ ରୁ ରାତ୍ରି ଘ୯|୩ ମଧ୍ୟେ , ଘ୧୧|୨୭ ରୁ ଘ୨|୩୯ ମଧ୍ୟେ , ଘ୩|୨୭ ରୁ ନିଶାନ୍ତ ଘ୫|୩ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୫୪ ରୁ ଘ୧୧|୩୭ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୨୦ ରୁ ଘ୯|୫୯ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 30,
            date: '30/11/2024',
            day: 'ଶନିବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରେ ଦେବ ଦୀପାବଲ୍ୟୁତ୍ସବ ଆରମ୍ଭ',
            Image: require('../../assets/Images/LaxmiPuja.png'),
            tithi: '(୩୦) ନଭେମ୍ବର , ଶନିବାର (ମାର୍ଗଶିର) ବିଛା ଦି୧୫ନ , ଜମାଦିଅଲ୍ଅଓଲ୍ ତା୨୭ରିଖ , ସାୟନ ମାର୍ଗଶିର ଦି୯ନ',
            sunrise: 'ଘ୬|୮|୧୧',
            sunset: 'ଘ୫|୨|୧୯',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୫୯ ମଧ୍ୟେ , ଘ୭|୪୮ ରୁ ଘ୧୦|୧୨ ମଧ୍ୟେ , ଘ୧୨|୩୬ ରୁ ଘ୩|୪୮ ମଧ୍ୟେ , ଘ୪|୩୫ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୨ ପର୍ଯ୍ୟନ୍ତ , ରାତ୍ରି ଘ୧୨|୬ ରୁ ଘ୧|୫୨ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୧|୫୨ ରୁ ଘ୨|୪୦ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ପ୍ରାତଃ ଘ୬|୧୦ ରୁ ଘ୭|୩୨ ମଧ୍ୟେ , ଦିବା ଘ୩|୪୦ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୨ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୨|୫୯ ରୁ ଘ୨|୨୧ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୨ ରୁ ଘ୬|୪୧ ମଧ୍ୟେ , ରାତ୍ରି ଘ୪|୩୨ ରୁ ନିଶାନ୍ତ ଘ୬|୯ ପର୍ଯ୍ୟନ୍ତ |',
        },
    ]

    const eventsForEnglishMonth = [

    ]

    const CUSTOMOdia_DATE = [
        { id: 1, showDate: '୨୭', disable: 'yes', date: '27/10/2024', spclEvent: 'no' },
        { id: 2, showDate: '୨୮', disable: 'yes', date: '28/10/2024', spclEvent: 'no' },
        { id: 3, showDate: '୨୯', disable: 'yes', date: '29/10/2024', spclEvent: 'no' },
        { id: 4, showDate: '୩୦', disable: 'yes', date: '30/10/2024', spclEvent: 'no' },
        { id: 5, showDate: '୩୧', disable: 'yes', date: '31/10/2024', spclEvent: 'no' },
        { id: 6, showDate: '୧', disable: 'no', date: '01/11/2024', spclEvent: 'yes' },
        { id: 7, showDate: '୨', disable: 'no', date: '02/11/2024', spclEvent: 'yes' },
        { id: 8, showDate: '୩', disable: 'no', date: '03/11/2024', spclEvent: 'yes' },
        { id: 9, showDate: '୪', disable: 'no', date: '04/11/2024', spclEvent: 'no' },
        { id: 11, showDate: '୫', disable: 'no', date: '05/11/2024', spclEvent: 'yes' },
        { id: 11, showDate: '୬', disable: 'no', date: '06/11/2024', spclEvent: 'no' },
        { id: 12, showDate: '୭', disable: 'no', date: '07/11/2024', spclEvent: 'yes' },
        { id: 13, showDate: '୮', disable: 'no', date: '08/11/2024', spclEvent: 'yes' },
        { id: 14, showDate: '୯', disable: 'no', date: '09/11/2024', spclEvent: 'yes' },
        { id: 15, showDate: '୧୦', disable: 'no', date: '10/11/2024', spclEvent: 'yes' },
        { id: 16, showDate: '୧୧', disable: 'no', date: '11/11/2024', spclEvent: 'yes' },
        { id: 17, showDate: '୧୨', disable: 'no', date: '12/11/2024', spclEvent: 'yes' },
        { id: 18, showDate: '୧୩', disable: 'no', date: '13/11/2024', spclEvent: 'yes' },
        { id: 19, showDate: '୧୪', disable: 'no', date: '14/11/2024', spclEvent: 'yes' },
        { id: 20, showDate: '୧୫', disable: 'no', date: '15/11/2024', spclEvent: 'yes' },
        { id: 21, showDate: '୧୬', disable: 'no', date: '16/11/2024', spclEvent: 'yes' },
        { id: 22, showDate: '୧୭', disable: 'no', date: '17/11/2024', spclEvent: 'no' },
        { id: 23, showDate: '୧୮', disable: 'no', date: '18/11/2024', spclEvent: 'no' },
        { id: 24, showDate: '୧୯', disable: 'no', date: '19/11/2024', spclEvent: 'yes' },
        { id: 25, showDate: '୨୦', disable: 'no', date: '20/11/2024', spclEvent: 'yes' },
        { id: 26, showDate: '୨୧', disable: 'no', date: '21/11/2024', spclEvent: 'yes' },
        { id: 27, showDate: '୨୨', disable: 'no', date: '22/11/2024', spclEvent: 'no' },
        { id: 28, showDate: '୨୩', disable: 'no', date: '23/11/2024', spclEvent: 'yes' },
        { id: 29, showDate: '୨୪', disable: 'no', date: '24/11/2024', spclEvent: 'yes' },
        { id: 30, showDate: '୨୫', disable: 'no', date: '25/11/2024', spclEvent: 'no' },
        { id: 31, showDate: '୨୬', disable: 'no', date: '26/11/2024', spclEvent: 'yes' },
        { id: 32, showDate: '୨୭', disable: 'no', date: '27/11/2024', spclEvent: 'yes' },
        { id: 33, showDate: '୨୮', disable: 'no', date: '28/11/2024', spclEvent: 'yes' },
        { id: 34, showDate: '୨୯', disable: 'no', date: '29/11/2024', spclEvent: 'no' },
        { id: 35, showDate: '୩୦', disable: 'no', date: '30/11/2024', spclEvent: 'yes' },
    ];

    const CUSTOMEnglish_DATE = [
        { id: 1, showDate: '27', disable: 'yes', date: '27/10/2024', spclEvent: 'no' },
        { id: 2, showDate: '28', disable: 'yes', date: '28/10/2024', spclEvent: 'no' },
        { id: 3, showDate: '29', disable: 'yes', date: '29/10/2024', spclEvent: 'no' },
        { id: 4, showDate: '30', disable: 'yes', date: '30/10/2024', spclEvent: 'no' },
        { id: 5, showDate: '31', disable: 'yes', date: '31/10/2024', spclEvent: 'no' },
        { id: 6, showDate: '1', disable: 'no', date: '01/11/2024', spclEvent: 'yes' },
        { id: 7, showDate: '2', disable: 'no', date: '02/11/2024', spclEvent: 'yes' },
        { id: 8, showDate: '3', disable: 'no', date: '03/11/2024', spclEvent: 'yes' },
        { id: 9, showDate: '4', disable: 'no', date: '04/11/2024', spclEvent: 'no' },
        { id: 10, showDate: '5', disable: 'no', date: '05/11/2024', spclEvent: 'yes' },
        { id: 11, showDate: '6', disable: 'no', date: '06/11/2024', spclEvent: 'no' },
        { id: 12, showDate: '7', disable: 'no', date: '07/11/2024', spclEvent: 'yes' },
        { id: 13, showDate: '8', disable: 'no', date: '08/11/2024', spclEvent: 'yes' },
        { id: 14, showDate: '9', disable: 'no', date: '09/11/2024', spclEvent: 'yes' },
        { id: 15, showDate: '10', disable: 'no', date: '10/11/2024', spclEvent: 'yes' },
        { id: 16, showDate: '11', disable: 'no', date: '11/11/2024', spclEvent: 'yes' },
        { id: 17, showDate: '12', disable: 'no', date: '12/11/2024', spclEvent: 'yes' },
        { id: 18, showDate: '13', disable: 'no', date: '13/11/2024', spclEvent: 'yes' },
        { id: 19, showDate: '14', disable: 'no', date: '14/11/2024', spclEvent: 'yes' },
        { id: 20, showDate: '15', disable: 'no', date: '15/11/2024', spclEvent: 'yes' },
        { id: 21, showDate: '16', disable: 'no', date: '16/11/2024', spclEvent: 'yes' },
        { id: 22, showDate: '17', disable: 'no', date: '17/11/2024', spclEvent: 'no' },
        { id: 23, showDate: '18', disable: 'no', date: '18/11/2024', spclEvent: 'no' },
        { id: 24, showDate: '19', disable: 'no', date: '19/11/2024', spclEvent: 'yes' },
        { id: 25, showDate: '20', disable: 'no', date: '20/11/2024', spclEvent: 'yes' },
        { id: 26, showDate: '21', disable: 'no', date: '21/11/2024', spclEvent: 'yes' },
        { id: 27, showDate: '22', disable: 'no', date: '22/11/2024', spclEvent: 'no' },
        { id: 28, showDate: '23', disable: 'no', date: '23/11/2024', spclEvent: 'yes' },
        { id: 29, showDate: '24', disable: 'no', date: '24/11/2024', spclEvent: 'yes' },
        { id: 30, showDate: '25', disable: 'no', date: '25/11/2024', spclEvent: 'no' },
        { id: 31, showDate: '26', disable: 'no', date: '26/11/2024', spclEvent: 'yes' },
        { id: 32, showDate: '27', disable: 'no', date: '27/11/2024', spclEvent: 'yes' },
        { id: 33, showDate: '28', disable: 'no', date: '28/11/2024', spclEvent: 'yes' },
        { id: 34, showDate: '29', disable: 'no', date: '29/11/2024', spclEvent: 'no' },
        { id: 35, showDate: '30', disable: 'no', date: '30/11/2024', spclEvent: 'yes' },
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
                            <TouchableOpacity onPress={() => navigation.navigate('October2024')}>
                                <AntDesign name="caretleft" color={'#000'} size={25} />
                            </TouchableOpacity>
                            {selectedLanguage === "Odia" &&
                                <Text style={{ color: '#000', fontSize: 17, fontWeight: '600' }}>ନଭେମ୍ବର  ୨୦୨୪</Text>
                            }
                            {selectedLanguage === "English" &&
                                <Text style={{ color: '#000', fontSize: 17, fontWeight: '600' }}>November  2024</Text>
                            }
                            <TouchableOpacity onPress={() => navigation.replace('December2024')}>
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

export default November2024

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