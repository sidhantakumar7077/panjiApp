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

const December2024 = (props) => {

    const eventsForOdiaMonth = [
        {
            id: 1,
            date: '01/12/2024',
            day: 'ରବିବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ ମଧ୍ୟ ଦୀପାବଲ୍ୟୁତ୍ସବ , ମହୋଧମବାସ୍ୟା , ମହାଭାରତ ଯୁଦ୍ଧାରମ୍ଭ ଦିବସ , ସୂର୍ଯ୍ୟ ମହତୀ ସ୍ନାନ',
            Image: require('../../assets/Images/PuriTemple.png'),
            tithi: '(୧) ଡିସେମ୍ବର , ରବିବାର (ମାର୍ଗଶିର) ବିଛା ଦି୧୬ନ , ଜମାଦିଅଲ୍ଅଓଲ୍ ତା୨୮ରିଖ , ସାୟନ ମାର୍ଗଶିର ଦି୧୦ନ',
            sunrise: 'ଘ୬|୮|୪୬',
            sunset: 'ଘ୫|୨|୨୮',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୭|୦ ରୁ ଘ୯|୨୪ ମଧ୍ୟେ , ଘ୧୨|୩୬ ରୁ ଘ୩|୪୮ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୨୭ ରୁ ଘ୯|୩ ମଧ୍ୟେ , ଘ୧୧|୨୭ ରୁ ଘ୧|୩ ମଧ୍ୟେ , ଘ୧|୫୧ ରୁ ନିଶାନ୍ତ ଘ୫|୩ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୪|୩୫ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୨ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୧୦|୧୬ ରୁ ଘ୧|୦ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୧୬ ରୁ ଘ୨|୫୯ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 2,
            date: '02/12/2024',
            day: 'ସୋମବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ ଶେଷ ଦୀପାବଲ୍ୟୁତ୍ସବ , ଦ୍ୱିତୀୟା ଚନ୍ଦ୍ର ଦର୍ଶନ',
            Image: require('../../assets/Images/PuriBeach.png'),
            tithi: '(୨) ଡିସେମ୍ବର , ସୋମବାର (ମାର୍ଗଶିର) ବିଛା ଦି୧୭ନ , ଜମାଦିଅଲ୍ଅଓଲ୍ ତା୨୯ରିଖ , ସାୟନ ମାର୍ଗଶିର ଦି୧୧ନ',
            sunrise: 'ଘ୬|୯|୨୦',
            sunset: 'ଘ୫|୨|୩୪',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୪୮ ମଧ୍ୟେ , ଘ୯|୨୫ ରୁ ଘ୧୧|୪୯ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୨୮ ରୁ ଘ୧୦|୪୦ ମଧ୍ୟେ , ଘ୧|୫୨ ରୁ ଘ୨|୪୦ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ପ୍ରାତଃ ଘ୭|୩୩ ରୁ ଘ୯|୪୪ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୨|୨୦ ରୁ ଘ୩|୪୨ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୯|୫୯ ରୁ ଘ୧୧|୩୮ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 3,
            date: '03/12/2024',
            day: 'ମଙ୍ଗଳବାର',
            name: 'ରମ୍ଭା ତୃତୀୟା',
            Image: require('../../assets/Images/Mahaprasad.png'),
            tithi: '(୩) ଡିସେମ୍ବର , ମଙ୍ଗଳବାର (ମାର୍ଗଶିର) ବିଛା ଦି୧୮ନ , ଜମାଦିଅସସାନୀ ତା୧ରିଖ , ସାୟନ ମାର୍ଗଶିର ଦି୧୨ନ',
            sunrise: 'ଘ୬|୯|୫୯',
            sunset: 'ଘ୫|୨|୪୫',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧ ମଧ୍ୟେ , ଘ୭|୫୦ ରୁ ଘ୧୧|୫୦ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୨୮ ରୁ ଘ୮|୧୬ ମଧ୍ୟେ , ଘ୯|୪ ରୁ ଘ୧|୨୮ ମଧ୍ୟେ , ଘ୧|୪ ରୁ ଘ୨|୪୦ ମଧ୍ୟେ , ଘ୪|୧୬ ରୁ ନିଶାନ୍ତ ଘ୫|୪ ମଧ୍ୟେ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୭|୨୮ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୦ ରୁ ଘ୨|୨୨ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୭|୩୪ ରୁ ଘ୮|୫୫ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୬|୪୨ ରୁ ଘ୮|୨୧ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 4,
            date: '04/12/2024',
            day: 'ବୁଧବାର',
            name: 'ଶରଣ ଆରମ୍ଭ',
            Image: require('../../assets/Images/LaxmiPuja.png'),
            tithi: '(୪) ଡିସେମ୍ବର , ବୁଧବାର (ମାର୍ଗଶିର) ବିଛା ଦି୧୯ନ , ଜମାଦିଅସସାନୀ ତା୨ରିଖ , ସାୟନ ମାର୍ଗଶିର ଦି୧୩ନ',
            sunrise: 'ଘ୬|୧୦|୩୮',
            sunset: 'ଘ୫|୨|୫୬',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧ ମଧ୍ୟେ , ଘ୭|୫୦ ରୁ ଘ୮|୩୮ ମଧ୍ୟେ , ଘ୧୧|୨ ରୁ ଘ୧|୨୬ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୫|୫୩ ରୁ ରାତ୍ରି ଘ୬|୪୧ ମଧ୍ୟେ , ଘ୮|୧୭ ରୁ ଘ୨|୪୧ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୭|୧ ରୁ ଘ୭|୫୦ ମଧ୍ୟେ , ଘ୨|୧୪ ରୁ ଘ୪|୩୮ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୫୬ ରୁ ଘ୧୦|୧୭ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୩୮ ରୁ ଘ୧|୭ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୫୬ ରୁ ଘ୪|୩୫ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 5,
            date: '05/12/2024',
            day: 'ଗୁରୁବାର',
            name: '',
            Image: require('../../assets/Images/Konark.png'),
            tithi: '(୫) ଡିସେମ୍ବର , ଗୁରୁବାର (ମାର୍ଗଶିର) ବିଛା ଦି୨୦ନ , ଜମାଦିଅସସାନୀ ତା୩ରିଖ , ସାୟନ ମାର୍ଗଶିର ଦି୧୪ନ',
            sunrise: 'ଘ୬|୧୧|୧୭',
            sunset: 'ଘ୫|୩|୭',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୫୦ ମଧ୍ୟେ , ଦିବା ଘ୨|୧୫ ରୁ ଘ୩|୫୧ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୫|୫୩ ରୁ ରାତ୍ରି ଘ୯|୫ ମଧ୍ୟେ , ଘ୧୧|୨୯ ରୁ  ଘ୨|୪୧ ମଧ୍ୟେ , ଘ୩|୨୯ ରୁ ନିଶାନ୍ତ ଘ୫|୫ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୨|୨୧ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୩ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୪୦ ରୁ ଘ୧|୧୯ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 6,
            date: '06/12/2024',
            day: 'ଶୁକ୍ରବାର',
            name: 'କୁରାଳ ପଞ୍ଚମୀ (ଚକ୍ରଧାରୀ ପୂଜା)',
            Image: require('../../assets/Images/KhajaBhoga.png'),
            tithi: '(୬) ଡିସେମ୍ବର , ଶୁକ୍ରବାର (ମାର୍ଗଶିର) ବିଛା ଦି୨୧ନ , ଜମାଦିଅସସାନୀ ତା୪ରିଖ , ସାୟନ ମାର୍ଗଶିର ଦି୧୫ନ',
            sunrise: 'ଘ୬|୧୧|୫୬',
            sunset: 'ଘ୫|୩|୧୮',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୨ ମଧ୍ୟେ , ଘ୭|୫୧ ରୁ ଘ୧୦|୧୫ ମଧ୍ୟେ , ଘ୧୨|୩୯ ରୁ ଘ୩|୫୧ ମଧ୍ୟେ , ଘ୪|୩୮ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୩ ପର୍ଯ୍ୟନ୍ତ , ସନ୍ଧ୍ୟା ଘ୫|୫୩ ରୁ ରାତ୍ରି ଘ୯|୫ ମଧ୍ୟେ, ଘ୧୧|୨୯ ରୁ ଘ୨|୪୧ ମଧ୍ୟେ , ଘ୩|୨୯ ରୁ ନିଶାନ୍ତ ଘ୫|୫ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୫୮ ରୁ ଘ୧୧|୪୦ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୨୨ ରୁ ଘ୧୦|୧ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 7,
            date: '07/12/2024',
            day: 'ଶନିବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ ଓଢଣ ଷଷ୍ଠୀ , ପ୍ରାବରଣୋତ୍ସବ , ଶୀତବସ୍ତ୍ର (ଘୋଡ) ଲାଗି',
            Image: require('../../assets/Images/rathaImg.jpeg'),
            tithi: '(୭) ଡିସେମ୍ବର , ଶନିବାର (ମାର୍ଗଶିର) ବିଛା ଦି୨୨ନ , ଜମାଦିଅସସାନୀ ତା୫ରିଖ , ସାୟନ ମାର୍ଗଶିର ଦି୧୬ନ',
            sunrise: 'ଘ୬|୧୨|୩୬',
            sunset: 'ଘ୫|୩|୩୦',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୩ ମଧ୍ୟେ , ଘ୧୨|୪୦ ରୁ ଘ୩|୫୨ ମଧ୍ୟେ , ଘ୪|୪୦ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୪ ପର୍ଯ୍ୟନ୍ତ , ରାତ୍ର ଘ୧୨|୧୭ ରୁ ଘ୧|୫୩ ମଧ୍ୟେ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୧|୫୩ ରୁ ଘ୨|୪୧ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ପ୍ରାତଃ ଘ୬|୧୩ ରୁ ଘ୭|୩୫ ମଧ୍ୟେ , ଦିବା ଘ୩|୪୪ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୪ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧|୧ ରୁ ଘ୨|୨୨ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସନ୍ଧ୍ୟା ଘ୫|୪ ରୁ ଘ୬|୪୪ ମଧ୍ୟେ , ରାତ୍ରି ଘ୪|୩୬ ରୁ ନିଶାନ୍ତ ଘ୬|୧୩ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 8,
            date: '08/12/2024',
            day: 'ରବିବାର',
            name: 'ଅକ୍ଷୟ ସ୍ନାନ',
            Image: require('../../assets/Images/3rathas.jpg'),
            tithi: '(୮) ଡିସେମ୍ବର , ରବିବାର (ମାର୍ଗଶିର) ବିଛା ଦି୨୩ନ , ଜମାଦିଅସସାନୀ ତା୬ରିଖ , ସାୟନ ମାର୍ଗଶିର ଦି୧୭ନ',
            sunrise: 'ଘ୬|୧୩|୧୧',
            sunset: 'ଘ୫|୩|୪୭',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୭|୪ ରୁ ଘ୯|୨୮ ମଧ୍ୟେ , ଘ୧୨|୪୧ ରୁ ଘ୩|୫୩ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୩୦ ରୁ ଘ୯|୧୬ ମଧ୍ୟେ , ଘ୧୧|୩୦ ରୁ ଘ୧|୬ ମଧ୍ୟେ , ଘ୧|୫୫ ରୁ ନିଶାନ୍ତ ଘ୫|୬ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୪|୪୧ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୪ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୧୦|୨୦ ରୁ ଘ୧|୩ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୨୧ ରୁ ଘ୩|୦ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 9,
            date: '09/12/2024',
            day: 'ସୋମବାର',
            name: 'ଶରଣ ଶେଷ',
            Image: require('../../assets/Images/PuriTemple.png'),
            tithi: '(୯) ଡିସେମ୍ବର , ସୋମବାର (ମାର୍ଗଶିର) ବିଛା ଦି୨୪ନ , ଜମାଦିଅସସାନୀ ତା୭ରିଖ , ସାୟନ ମାର୍ଗଶିର ଦି୧୮ନ',
            sunrise: 'ଘ୬|୧୩|୪୫',
            sunset: 'ଘ୫|୪|୫',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୫୨ ମଧ୍ୟେ , ଘ୯|୨୯ ରୁ ଘ୧୧|୫୩ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୩୦ ରୁ ଘ୧୦|୪୧ ମଧ୍ୟେ , ଘ୧|୫୪ ରୁ ଘ୨|୪୨ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୩୯ ରୁ ଘ୯|୦ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୨|୨୪ ରୁ ଘ୩|୪୫ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୩ ରୁ ଘ୧୧|୪୨ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 10,
            date: '10/12/2024',
            day: 'ମଙ୍ଗଳବାର',
            name: '',
            Image: require('../../assets/Images/PuriBeach.png'),
            tithi: '(୧୦) ଡିସେମ୍ବର , ମଙ୍ଗଳବାର (ମାର୍ଗଶିର) ବିଛା ଦି୨୫ନ , ଜମାଦିଅଲ୍ଅଓଲ୍ ତା୮ରିଖ , ସାୟନ ମାର୍ଗଶିର ଦି୧୯ନ',
            sunrise: 'ଘ୬|୧୪|୨୮',
            sunset: 'ଘ୫|୪|୨୩',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୫ ମଧ୍ୟେ , ଘ୭|୫୪ ରୁ ଘ୧୧|୫୪ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୩୧ ରୁ ଘ୮|୧୯ ମଧ୍ୟେ , ଘ୯|୭ ରୁ ଘ୧୧|୩୧ ମଧ୍ୟେ , ଘ୧|୭ ରୁ ଘ୨|୪୩ ମଧ୍ୟେ , ଘ୪|୧୯ ରୁ ନିଶାନ୍ତ ଘ୫|୭ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୭|୩୦ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୪ ରୁ ଘ୨|୨୫ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୭|୩୯ ରୁ ଘ୯|୦ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୬|୪୬ ରୁ ଘ୮|୨୫ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 11,
            date: '11/12/2024',
            day: 'ବୁଧବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ ଓ ରାମାନୁଜ ଭିନ୍ନ ସର୍ବସମ୍ମତ ଗୋମତୀ ଏକାଦଶୀ',
            Image: require('../../assets/Images/Mahaprasad.png'),
            tithi: '(୧୧) ଡିସେମ୍ବର , ବୁଧବାର (ମାର୍ଗଶିର) ବିଛା ଦି୨୬ନ , ଜମାଦିଅସସାନୀ ତା୯ରିଖ , ସାୟନ ମାର୍ଗଶିର ଦି୨୦ନ',
            sunrise: 'ଘ୬|୧୪|୫୭',
            sunset: 'ଘ୫|୪|୪୧',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୫ ମଧ୍ୟେ , ଘ୭|୫୪ ରୁ ଘ୮|୪୨ ମଧ୍ୟେ , ଘ୧୧|୬ ରୁ ଘ୧|୩ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୫|୫୫ ରୁ ରାତ୍ରି ଘ୬|୪୩ ମଧ୍ୟେ , ଘ୮|୧୯ ରୁ ଘ୨|୪୩ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୭|୫ ରୁ ଘ୭|୫୪ ମଧ୍ୟେ , ଘ୨|୧୮ ରୁ ଘ୪|୪୨ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୯|୧ ରୁ ଘ୧୦|୨୨ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୪୩ ରୁ ଘ୧|୪ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୩|୧ ରୁ ଘ୪|୪୦ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 12,
            date: '12/12/2024',
            day: 'ଗୁରୁବାର',
            name: 'ରାମାନୁଜ ବୈଷ୍ଣବ ଏକାଦଶୀ , ବ୍ୟଞ୍ଜନ ଦ୍ବାଦଶୀ',
            Image: require('../../assets/Images/LaxmiPuja.png'),
            tithi: '(୧୨) ଡିସେମ୍ବର , ଗୁରୁବାର (ମାର୍ଗଶିର) ବିଛା ଦି୨୭ନ , ଜମାଦିଅସସାନୀ ତା୧୦ରିଖ , ସାୟନ ମାର୍ଗଶିର ଦି୨୧ନ',
            sunrise: 'ଘ୬|୧୫|୩୪',
            sunset: 'ଘ୫|୫|୦',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୫୪ ମଧ୍ୟେ , ଘ୨|୧୯ ରୁ ଘ୩|୫୫ ମଧ୍ୟେ , ସୂର୍ଯ୍ୟାସ୍ତରୁ ସନ୍ଧ୍ୟା ଘ୬|୪୨ ମଧ୍ୟେ , ରାତ୍ରି ଘ୧|୭ ରୁ ଘ୨|୪୩ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୨|୨୨ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୫ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୪୪ ରୁ ଘ୧|୨୩ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 13,
            date: '13/12/2024',
            day: 'ଶୁକ୍ରବାର',
            name: 'ଗୀତା ଜୟନ୍ତୀ , ଅନଙ୍ଗ ତ୍ରୋୟଦଶୀ , ପାଷାଣ ଚତୁରଦର୍ଶୀ',
            Image: require('../../assets/Images/Konark.png'),
            tithi: '(୧୩) ଡିସେମ୍ବର , ଶୁକ୍ରବାର (ମାର୍ଗଶିର) ବିଛା ଦି୨୮ନ , ଜମାଦିଅସସାନୀ ତା୧୧ରିଖ , ସାୟନ ମାର୍ଗଶିର ଦି୨୨ନ',
            sunrise: 'ଘ୬|୧୬|୧୧',
            sunset: 'ଘ୫|୫|୧୯',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୭ ମଧ୍ୟେ , ଘ୭|୫୬ ରୁ ଘ୧୦|୨୦ ମଧ୍ୟେ , ଘ୧୨|୪୪ ରୁ ଘ୩|୫୬ ମଧ୍ୟେ , ଘ୪|୪୩ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୫ ପର୍ଯ୍ୟନ୍ତ , ସନ୍ଧ୍ୟା ଘ୫|୫୬ ରୁ ରାତ୍ରି ଘ୯|୮ ମଧ୍ୟେ , ଘ୧୧|୩୨ ରୁ ଘ୨|୪୪ ମଧ୍ୟେ , ଘ୩|୩୭ ରୁ ନିଶାନ୍ତ ଘ୫|୮ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୯|୨୦ ରୁ ଘ୧୧|୪୪ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୨୬ ରୁ ଘ୧୦|୫ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 14,
            date: '14/12/2024',
            day: 'ଶନିବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ ପଣ୍ଡୁ ନୃସିଂହ ବିଜେ , ପଣ୍ଡୁ ଓଷା',
            Image: require('../../assets/Images/KhajaBhoga.png'),
            tithi: '(୧୪) ଡିସେମ୍ବର , ଶନିବାର (ମାର୍ଗଶିର) ବିଛା ଦି୨୯ନ , ଜମାଦିଅସସାନୀ ତା୧୨ରିଖ , ସାୟନ ମାର୍ଗଶିର ଦି୨୩ନ',
            sunrise: 'ଘ୬|୧୬|୪୮',
            sunset: 'ଘ୫|୫|୨୮',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୭ ମଧ୍ୟେ , ଘ୭|୫୬ ରୁ ଘ୧୦|୨୦ ମଧ୍ୟେ , ଘ୧୨|୪୪ ରୁ ଘ୩|୫୬ ମଧ୍ୟେ , ଘ୪|୪୨ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୫ ପର୍ଯ୍ୟନ୍ତ , ରାତ୍ରି ଘ୧୨|୨୦ ରୁ ଘ୧|୫୬ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୧|୫୬ ରୁ ଘ୨|୪୪ ମଧ୍ୟେ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ପ୍ରାତଃରୁ ଦିବା ଘ୭|୪୧ ମଧ୍ୟେ , ଘ୩|୪୫ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୫ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୯|୫ ରୁ ଘ୨|୨୭ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୬|୪୬ ମଧ୍ୟେ, ଘ୪|୪୦ ରୁ ନିଶାନ୍ତ ଘ୬|୧୭ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 15,
            date: '15/12/2024',
            day: 'ରବିବାର',
            name: 'ଦତ୍ତାତ୍ରେୟ ଜୟନ୍ତୀ , ମାର୍ଗଶିର ପୂର୍ଣ୍ଣିମା , ମହାମାର୍ଗଶିର ସ୍ନାନ , ମାସାନ୍ତ',
            Image: require('../../assets/Images/rathaImg.jpeg'),
            tithi: '(୧୫) ଡିସେମ୍ବର , ରବିବାର (ମାର୍ଗଶିର) ବିଛା ଦି୩୦ନ , ଜମାଦିଅସସାନୀ ତା୧୩ରିଖ , ସାୟନ ମାର୍ଗଶିର ଦି୨୪ନ',
            sunrise: 'ଘ୬|୧୭|୨୧',
            sunset: 'ଘ୫|୬|୩',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୭|୫ ରୁ ଘ୯|୨୯ ମଧ୍ୟେ , ଘ୧୨|୪୫ ରୁ ଘ୩|୫୭ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୩୩ ରୁ ଘ୯|୯ ମଧ୍ୟେ , ଘ୧୧|୩୩ ରୁ ଘ୧|୯ ମଧ୍ୟେ , ଘ୧|୫୭ ରୁ ନିଶାନ୍ତ ଘ୫|୯ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୪|୩୩ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୬ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୧୦|୨୪ ରୁ ଘ୧|୬ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୨୪ ରୁ ଘ୩|୩ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 16,
            date: '16/12/2024',
            day: 'ସୋମବାର',
            name: 'ଧନୁ ସଂକ୍ରାନ୍ତି , ଶ୍ରୀମନ୍ଦିରରେ ପହିଲି ଭୋଗ ଆରମ୍ଭ , ଶ୍ରୀ ଲକ୍ଷ୍ମୀନାରାୟଣ ପୂଜା',
            Image: require('../../assets/Images/3rathas.jpg'),
            tithi: '(୧୬) ଡିସେମ୍ବର , ସୋମବାର (ପୌଷ) ଧନୁ ଦି୧ନ , ଜମାଦିଅସସାନୀ ତା୧୪ରିଖ , ସାୟନ ମାର୍ଗଶିର ଦି୨୫ନ',
            sunrise: 'ଘ୬|୧୭|୫୫',
            sunset: 'ଘ୫|୬|୨୭',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୫୪ ମଧ୍ୟେ , ଘ୯|୩୩ ରୁ ଘ୧୧|୫୭ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୩୩ ରୁ ଘ୧୦|୪୫ ମଧ୍ୟେ , ଘ୧|୫୭ ରୁ ଘ୨|୪୫ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୪୨ ରୁ ଘ୯|୩ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୨|୨୭ ରୁ ଘ୨|୪୯ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୭ ରୁ ଘ୧୧|୪୬ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 17,
            date: '17/12/2024',
            day: 'ମଙ୍ଗଳବାର',
            name: 'ଦାଣ୍ଡ ପହଁରା , ବାଟ ଓଷ',
            Image: require('../../assets/Images/PuriTemple.png'),
            tithi: '(୧୭) ଡିସେମ୍ବର , ମଙ୍ଗଳବାର (ପୌଷ) ଧନୁ ଦି୨ନ , ଜମାଦିଅସସାନୀ ତା୧୫ରିଖ , ସାୟନ ମାର୍ଗଶିର ଦି୨୬ନ',
            sunrise: 'ଘ୬|୧୮|୨୫',
            sunset: 'ଘ୫|୬|୫୫',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୮ ମଧ୍ୟେ , ଘ୭|୫୮ ରୁ ଘ୧୧|୫୮ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୩୪ ରୁ ଘ୮|୨୨ ମଧ୍ୟେ , ଘ୯|୧୦ ରୁ ଘ୧୧|୩୪ ମଧ୍ୟେ , ଘ୧|୧୦ ରୁ ଘ୨|୪୬ ମଧ୍ୟେ , ଘ୪|୨୨ ରୁ ନିଶାନ୍ତ ଘ୫|୧୦ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୭|୩୩ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୫ ରୁ ଘ୨|୨୮ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୭|୩୪ ରୁ ଘ୯|୪ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୬|୪୯ ରୁ ଘ୮|୨୮ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 18,
            date: '18/12/2024',
            day: 'ବୁଧବାର',
            name: '',
            Image: require('../../assets/Images/PuriBeach.png'),
            tithi: '(୧୮) ଡିସେମ୍ବର , ବୁଧବାର (ପୌଷ) ଧନୁ ଦି୩ନ , ଜମାଦିଅସସାନୀ ତା୧୬ରିଖ , ସାୟନ ମାର୍ଗଶିର ଦି୨୭ନ',
            sunrise: 'ଘ୬|୧୮|୫୬',
            sunset: 'ଘ୫|୭|୨୨',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୯ ମଧ୍ୟେ , ଘ୭|୫୮ ରୁ ଘ୮|୪୬ ମଧ୍ୟେ , ଘ୧୧|୧୦ ରୁ ଘ୧|୩୪ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୫|୫୮ ରୁ ରାତ୍ରି ଘ୬|୪୬ ମଧ୍ୟେ , ଘ୮|୨୨ ରୁ ଘ୨|୪୬ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୭|୯ ରୁ ଘ୭|୫୮ ମଧ୍ୟେ , ଘ୨|୨୨ ରୁ ଘ୪|୪୬ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୯|୪ ରୁ ଘ୧୦|୨୫ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୪୬ ରୁ ଘ୧|୭ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୩|୫ ରୁ ଘ୪|୪୪ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 19,
            date: '19/12/2024',
            day: 'ଗୁରୁବାର',
            name: '',
            Image: require('../../assets/Images/Mahaprasad.png'),
            tithi: '(୧୯) ଡିସେମ୍ବର , ଗୁରୁବାର (ପୌଷ) ଧନୁ ଦି୪ନ , ଜମାଦିଅସସାନୀ ତା୧୭ରିଖ , ସାୟନ ମାର୍ଗଶିର ଦି୨୮ନ',
            sunrise: 'ଘ୬|୧୯|୪୬',
            sunset: 'ଘ୫|୮|୧୦',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୫୭ ମଧ୍ୟେ , ଘ୨|୨୨ ରୁ ଘ୩|୫୮ ପର୍ଯ୍ୟନ୍ତ , ସନ୍ଧ୍ୟା ଘ୫|୫୯ ରୁ ରାତ୍ରି ଘ୯|୧୧ ମଧ୍ୟେ , ଘ୧୧|୩୫ ରୁ ଘ୨|୫୭ ମଧ୍ୟେ , ଘ୩|୩୫ ରୁ ନିଶାନ୍ତ ଘ୫|୧୧ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୨|୨୮ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୮ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୪୭ ରୁ ଘ୧|୨୬ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 20,
            date: '20/12/2024',
            day: 'ଶୁକ୍ରବାର',
            name: '',
            Image: require('../../assets/Images/LaxmiPuja.png'),
            tithi: '(୨୦) ଡିସେମ୍ବର , ଶୁକ୍ରବାର (ପୌଷ) ଧନୁ ଦି୫ନ , ଜମାଦିଅସସାନୀ ତା୧୮ରିଖ , ସାୟନ ମାର୍ଗଶିର ଦି୨୯ନ',
            sunrise: 'ଘ୬|୧୯|୫୮',
            sunset: 'ଘ୫|୮|୧୮',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୦ ମଧ୍ୟେ , ଘ୭|୫୯ ରୁ ଘ୧୦|୧୧ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୫|୫୯ ରୁ ରାତ୍ରି ଘ୯|୧୧ ମଧ୍ୟେ , ଘ୧୧|୩୫ ରୁ ଘ୨|୪୭ ମଧ୍ୟେ , ଘ୩|୩୫ ରୁ ନିଶାନ୍ତ ଘ୫|୧୧ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୬|୪୩ ରୁ ଘ୭|୨୯ ମଧ୍ୟେ , ଘ୧|୫୩ ରୁ ଘ୪|୧୭ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୯|୫ ରୁ ଘ୧୧|୪୭ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୩୦ ରୁ ଘ୧୦|୯ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 21,
            date: '21/12/2024',
            day: 'ଶନିବାର',
            name: '',
            Image: require('../../assets/Images/Konark.png'),
            tithi: '(୨୧) ଡିସେମ୍ବର , ଶନିବାର (ପୌଷ) ଧନୁ ଦି୬ନ , ଜମାଦିଅସସାନୀ ତା୧୯ରିଖ , ସାୟନ ମାର୍ଗଶିର ଦି୩୦ନ',
            sunrise: 'ଘ୬|୨୦|୩୦',
            sunset: 'ଘ୫|୮|୪୬',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୦ ମଧ୍ୟେ , ଘ୭|୫୯ ରୁ ଘ୧୦|୨୩ ମଧ୍ୟେ , ଘ୧୨|୪୭ ରୁ ଘ୩|୫୯ ମଧ୍ୟେ , ଘ୪|୪୬ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୯ ପର୍ଯ୍ୟନ୍ତ , ରାତ୍ରି ଘ୧୨|୨୪ ରୁ ଘ୨|୦ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୨|୦ ରୁ ଘ୨|୪୮ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ପ୍ରାତଃରୁ ଘ୭|୪୩ ମଧ୍ୟେ , ଘ୩|୫୦ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୯ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୧|୯ ରୁ ଘ୨|୩୦ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୬|୪୮ ରୁ ଘ୪|୪୪ ରୁ ରାତ୍ରିଶେଷ ଘ୬|୨୧ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 22,
            date: '22/12/2024',
            day: 'ରବିବାର',
            name: '',
            Image: require('../../assets/Images/KhajaBhoga.png'),
            tithi: '(୨୨) ଡିସେମ୍ବର , ରବିବାର (ପୌଷ) ଧନୁ ଦି୭ନ , ଜମାଦିଅସସାନୀ ତା୨୦ରିଖ , ସାୟନ ପୌଷ ଦି୧ନ',
            sunrise: 'ଘ୬|୨୧|୧',
            sunset: 'ଘ୫|୯|୧୫',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୭|୧୨ ରୁ ଘ୯|୩୬ ମଧ୍ୟେ , ଘ୧୨|୪୮ ରୁ ଘ୪|୦ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୩୬ ରୁ ଘ୯|୧୨ ମଧ୍ୟେ , ଘ୧୦|୩୬ ରୁ ଘ୧|୧୨ ମଧ୍ୟେ , ଘ୨|୦ ରୁ ନିଶାନ୍ତ ଘ୫|୧୨ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୪|୪୭ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୯ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୧୦|୨୭ ରୁ ଘ୧|୧୦  ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୨୭ ରୁ ଘ୩|୬ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 23,
            date: '23/12/2024',
            day: 'ସୋମବାର',
            name: 'ଅଷ୍ଟକା ଶ୍ରାଦ୍ଧ',
            Image: require('../../assets/Images/rathaImg.jpeg'),
            tithi: '(୨୩) ଡିସେମ୍ବର , ସୋମବାର (ପୌଷ) ଧନୁ ଦି୮ନ , ଜମାଦିଅସସାନୀ ତା୨୧ରିଖ , ସାୟନ ପୌଷ ଦି୨ନ',
            sunrise: 'ଘ୬|୨୧|୩୩',
            sunset: 'ଘ୫|୯|୪୩',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୮|୦ ମଧ୍ୟେ , ଘ୯|୩୬ ରୁ ଘ୧୨|୦ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୩୬ ରୁ ଘ୧୦|୪୯ ମଧ୍ୟେ , ଘ୨|୧ ରୁ ଘ୨|୪୯ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୪୫ ରୁ ଘ୯|୭ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୨|୩୧ ରୁ ଘ୩|୫ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୧୦ ରୁ ଘ୧୧|୪୯ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 24,
            date: '24/12/2024',
            day: 'ମଙ୍ଗଳବାର',
            name: 'ଅନ୍ଵଷ୍ଟକା ଶ୍ରାଦ୍ଧ',
            Image: require('../../assets/Images/3rathas.jpg'),
            tithi: '(୨୪) ଡିସେମ୍ବର , ମଙ୍ଗଳବାର (ପୌଷ) ଧନୁ ଦି୯ନ , ଜମାଦିଅସସାନୀ ତା୨୨ରିଖ , ସାୟନ ପୌଷ ଦି୩ନ',
            sunrise: 'ଘ୬|୨୧|୫୯',
            sunset: 'ଘ୫|୧୦|୧୭',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୨ ମଧ୍ୟେ , ଘ୮|୧ ରୁ ଘ୧୨|୧ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୩୮ ରୁ ଘ୮|୨୬ ମଧ୍ୟେ , ଘ୯|୧୪ ରୁ ଘ୧୧|୩୮ ମଧ୍ୟେ , ଘ୧|୧୪ ରୁ ଘ୨|୫୦ ମଧ୍ୟେ , ଘ୪|୨୬ ରୁ ନିଶାନ୍ତ ଘ୫|୧୪ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୭|୩୬ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୧୧|୧୧ ରୁ ଘ୨|୩୨ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୭|୪୬ ରୁ ଘ୯|୭ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୬|୫୩ ରୁ ଘ୮|୩୨ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 25,
            date: '25/12/2024',
            day: 'ବୁଧବାର',
            name: 'ବଡଦିନ ଉତ୍ସବ',
            Image: require('../../assets/Images/PuriTemple.png'),
            tithi: '(୨୫) ଡିସେମ୍ବର , ବୁଧବାର (ପୌଷ) ଧନୁ ଦି୧୦ନ , ଜମାଦିଅସସାନୀ ତା୨୩ରିଖ , ସାୟନ ପୌଷ ଦି୪ନ',
            sunrise: 'ଘ୬|୨୨|୨୫',
            sunset: 'ଘ୫|୧୦|୫୧',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୨ ମଧ୍ୟେ , ଘ୮|୧ ରୁ ଘ୮|୪୯ ମଧ୍ୟେ , ଘ୧୧|୧୩ ରୁ ଘ୧|୩୭ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୨ ରୁ ଘ୬|୫୦ ମଧ୍ୟେ , ଘ୮|୨୬ ରୁ ଘ୨|୫୦ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୭|୧୨ ରୁ ଘ୮|୧ ମଧ୍ୟେ , ଘ୨|୨୫ ରୁ ଘ୪|୪୯ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୯|୭ ରୁ ଘ୧୦|୨୮ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୫୦ ରୁ ଘ୧|୧୧ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୩|୮ ରୁ ଘ୪|୨୭ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 26,
            date: '26/12/2024',
            day: 'ଗୁରୁବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ ଓ ସର୍ବତ୍ର ସର୍ବସମ୍ମତ ସଫଳା ଏକାଦଶୀ',
            Image: require('../../assets/Images/PuriBeach.png'),
            tithi: '(୨୬) ଡିସେମ୍ବର , ଗୁରୁବାର (ପୌଷ) ଧନୁ ଦି୧୧ନ , ଜମାଦିଅସସାନୀ ତା୨୪ରିଖ , ସାୟନ ପୌଷ ଦି୫ନ',
            sunrise: 'ଘ୬|୨୨|୫୧',
            sunset: 'ଘ୫|୧୧|୨୫',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୮|୧ ମଧ୍ୟେ , ଘ୨|୨୬ ରୁ ଘ୪|୨ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୩ ରୁ ରାତ୍ରି ଘ୯|୧୫ ମଧ୍ୟେ , ଘ୧୧|୩୯ ରୁ ଘ୨|୫୧ ମଧ୍ୟେ , ଘ୩|୩୯ ରୁ ନିଶାନ୍ତ ଘ୫|୧୫ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୨|୪୧ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୧୧ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୫୧ ରୁ ଘ୨|୧୯ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 27,
            date: '27/12/2024',
            day: 'ଶୁକ୍ରବାର',
            name: '',
            Image: require('../../assets/Images/Mahaprasad.png'),
            tithi: '(୨୭) ଡିସେମ୍ବର , ଶୁକ୍ରବାର (ପୌଷ) ଧନୁ ଦି୧୨ନ , ଜମାଦିଅସସାନୀ ତା୨୫ରିଖ , ସାୟନ ପୌଷ ଦି୬ନ',
            sunrise: 'ଘ୬|୨୩|୧୬',
            sunset: 'ଘ୫|୧୧|୫୯',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୩ ମଧ୍ୟେ , ଘ୮|୨ ରୁ ଘ୧୦|୨୬ ମଧ୍ୟେ , ଘ୧୨|୫୦ ରୁ ଘ୪|୨ ମଧ୍ୟେ , ଘ୪|୪୭ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୧୨ ପର୍ଯ୍ୟନ୍ତ , ସନ୍ଧ୍ୟା ଘ୬|୩ ରୁ ରାତ୍ରି ଘ୯|୧୫ ମଧ୍ୟେ , ଘ୧୧|୩୯ ରୁ ଘ୨|୫୧ ମଧ୍ୟେ , ଘ୩|୩୯ ରୁ ନିଶାନ୍ତ ଘ୫|୧୫ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୯|୮ ରୁ ଘ୧୧|୫୧ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୩୩ ରୁ ଘ୧୦|୧୨ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 28,
            date: '28/12/2024',
            day: 'ଶନିବାର',
            name: '',
            Image: require('../../assets/Images/LaxmiPuja.png'),
            tithi: '(୨୮) ଡିସେମ୍ବର , ଶନିବାର (ପୌଷ) ଧନୁ ଦି୧୩ନ , ଜମାଦିଅସସାନୀ ତା୨୬ରିଖ , ସାୟନ ପୌଷ ଦି୭ନ',
            sunrise: 'ଘ୬|୨୩|୪୨',
            sunset: 'ଘ୫|୧୨|୩୪',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୩ ମଧ୍ୟେ , ଘ୮|୨ ରୁ ଘ୧୦|୨୬ ମଧ୍ୟେ , ଘ୧୨|୫୦ ରୁ ଘ୪|୨ ମଧ୍ୟେ , ଘ୪|୪୯ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୧୩ ପର୍ଯ୍ୟନ୍ତ , ରାତ୍ରି ଘ୧୨|୨୮ ରୁ ଘ୨|୪ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୨|୪ ରୁ ଘ୨|୫୨ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ପ୍ରାତଃରୁ ଦିବା ଘ୭|୪୫ ମଧ୍ୟେ , ଘ୩|୫୩ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ୫|୧୩ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୧୧|୩ ରୁ ଘ୨|୩୪ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୬|୪୪ ମଧ୍ୟେ , ଘ୪|୪୭ ରୁ ରାତ୍ରିଶେଷ ଘ୬|୨୪ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 29,
            date: '29/12/2024',
            day: 'ରବିବାର',
            name: '',
            Image: require('../../assets/Images/Konark.png'),
            tithi: '(୨୯) ଡିସେମ୍ବର , ରବିବାର (ପୌଷ) ଧନୁ ଦି୧୪ନ , ଜମାଦିଅସସାନୀ ତା୨୭ରିଖ , ସାୟନ ପୌଷ ଦି୮ନ',
            sunrise: 'ଘ୬|୨୪|୮',
            sunset: 'ଘ୫|୧୩|୮',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୭|୧୪ ରୁ ଘ୯|୩୮ ମଧ୍ୟେ , ଘ୧୨|୫୦ ରୁ ଘ୪|୨ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୪୦ ରୁ ଘ୯|୧୬ ମଧ୍ୟେ , ଘ୧୧|୪୦ ରୁ ଘ୧|୧୬ ମଧ୍ୟେ , ଘ୨|୪ ରୁ ନିଶାନ୍ତ ଘ୫|୧୬ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୪|୪୭ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୧୩ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୧୦|୩୦ ରୁ ଘ୧|୧୩ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୩୧ ରୁ ଘ୩|୯ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 30,
            date: '30/12/2024',
            day: 'ସୋମବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ ଓ ସର୍ବତ୍ର ବକୁଳ ଅମାବାସ୍ୟା , ଶ୍ରୀଜୀଉଙ୍କର ବକୁଳ ଲାଗି , ଶ୍ରୀଯଜ୍ଞ ବରାହ ଜନ୍ମ , ସୋମହତୀ ଓ ଗୋସହସ୍ରୀ ଗଙ୍ଗାସ୍ନାନ',
            Image: require('../../assets/Images/KhajaBhoga.png'),
            tithi: '(୩୦) ଡିସେମ୍ବର , ସୋମବାର (ପୌଷ) ଧନୁ ଦି୧୫ନ , ଜମାଦିଅସସାନୀ ତା୨୮ରିଖ , ସାୟନ ପୌଷ ଦି୯ନ',
            sunrise: 'ଘ୬|୨୪|୩୩',
            sunset: 'ଘ୫|୧୩|୩୧',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୮|୨ ମଧ୍ୟେ , ଘ୯|୩୯ ରୁ ଘ୧୨|୩ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୪୧ ରୁ ଘ୧୦|୫୩ ମଧ୍ୟେ , ଘ୨|୫ ରୁ ଘ୨|୫୩ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୪୮ ରୁ ଘ୯|୯ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୨|୫୩ ରୁ ଘ୩|୫୬ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୧୪ ରୁ ଘ୧୧|୫୨ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 31,
            date: '31/12/2024',
            day: 'ମଙ୍ଗଳବାର',
            name: '',
            Image: require('../../assets/Images/PuriTemple.png'),
            tithi: '(୩୧) ଡିସେମ୍ବର , ମଙ୍ଗଳବାର (ପୌଷ) ଧନୁ ଦି୧୬ନ , ଜମାଦିଅସସାନୀ ତା୨୯ରିଖ , ସାୟନ ପୌଷ ଦି୧୦ନ',
            sunrise: 'ଘ୬|୨୪|୫୨',
            sunset: 'ଘ୫|୧୪|୨୦',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୪ ମଧ୍ୟେ , ଘ୮|୩ ରୁ ଘ୧୨|୩ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୪୨ ରୁ ଘ୮|୨୦ ମଧ୍ୟେ , ଘ୯|୮ ରୁ ଘ୧୧|୩୨ ମଧ୍ୟେ , ଘ୧|୮ ରୁ ଘ୨|୪୪ ମଧ୍ୟେ , ଘ୪|୨୦ ରୁ ନିଶାନ୍ତ ଘ୫|୧୭ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୭|୪୧ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୧୪ ରୁ ଘ୨|୩୬ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୭|୪୮ ରୁ ଘ୯|୧୦ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୬|୫୭ ରୁ ଘ୮|୩୬ ପର୍ଯ୍ୟନ୍ତ |',
        },
    ]

    const eventsForEnglishMonth = [

    ]

    const CUSTOMOdia_DATE = [
        { id: 1, showDate: '୧', disable: 'no', date: '01/12/2024', spclEvent: 'yes' },
        { id: 2, showDate: '୨', disable: 'no', date: '02/12/2024', spclEvent: 'yes' },
        { id: 3, showDate: '୩', disable: 'no', date: '03/12/2024', spclEvent: 'yes' },
        { id: 4, showDate: '୪', disable: 'no', date: '04/12/2024', spclEvent: 'yes' },
        { id: 5, showDate: '୫', disable: 'no', date: '05/12/2024', spclEvent: 'no' },
        { id: 6, showDate: '୬', disable: 'no', date: '06/12/2024', spclEvent: 'yes' },
        { id: 7, showDate: '୭', disable: 'no', date: '07/12/2024', spclEvent: 'yes' },
        { id: 8, showDate: '୮', disable: 'no', date: '08/12/2024', spclEvent: 'yes' },
        { id: 9, showDate: '୯', disable: 'no', date: '09/12/2024', spclEvent: 'yes' },
        { id: 10, showDate: '୧୦', disable: 'no', date: '10/12/2024', spclEvent: 'no' },
        { id: 11, showDate: '୧୧', disable: 'no', date: '11/12/2024', spclEvent: 'yes' },
        { id: 12, showDate: '୧୨', disable: 'no', date: '12/12/2024', spclEvent: 'yes' },
        { id: 13, showDate: '୧୩', disable: 'no', date: '13/12/2024', spclEvent: 'yes' },
        { id: 14, showDate: '୧୪', disable: 'no', date: '14/12/2024', spclEvent: 'yes' },
        { id: 15, showDate: '୧୫', disable: 'no', date: '15/12/2024', spclEvent: 'yes' },
        { id: 16, showDate: '୧୬', disable: 'no', date: '16/12/2024', spclEvent: 'yes' },
        { id: 17, showDate: '୧୭', disable: 'no', date: '17/12/2024', spclEvent: 'yes' },
        { id: 18, showDate: '୧୮', disable: 'no', date: '18/12/2024', spclEvent: 'no' },
        { id: 19, showDate: '୧୯', disable: 'no', date: '19/12/2024', spclEvent: 'no' },
        { id: 20, showDate: '୨୦', disable: 'no', date: '20/12/2024', spclEvent: 'no' },
        { id: 21, showDate: '୨୧', disable: 'no', date: '21/12/2024', spclEvent: 'no' },
        { id: 22, showDate: '୨୨', disable: 'no', date: '22/12/2024', spclEvent: 'no' },
        { id: 23, showDate: '୨୩', disable: 'no', date: '23/12/2024', spclEvent: 'yes' },
        { id: 24, showDate: '୨୪', disable: 'no', date: '24/12/2024', spclEvent: 'yes' },
        { id: 25, showDate: '୨୫', disable: 'no', date: '25/12/2024', spclEvent: 'yes' },
        { id: 26, showDate: '୨୬', disable: 'no', date: '26/12/2024', spclEvent: 'yes' },
        { id: 27, showDate: '୨୭', disable: 'no', date: '27/12/2024', spclEvent: 'no' },
        { id: 28, showDate: '୨୮', disable: 'no', date: '28/12/2024', spclEvent: 'no' },
        { id: 29, showDate: '୨୯', disable: 'no', date: '29/12/2024', spclEvent: 'no' },
        { id: 30, showDate: '୩୦', disable: 'no', date: '30/12/2024', spclEvent: 'yes' },
        { id: 31, showDate: '୩୧', disable: 'no', date: '31/12/2024', spclEvent: 'no' },
        { id: 32, showDate: '୧', disable: 'yes', date: '01/01/2025', spclEvent: 'no' },
        { id: 33, showDate: '୨', disable: 'yes', date: '02/01/2025', spclEvent: 'no' },
        { id: 34, showDate: '୩', disable: 'yes', date: '03/01/2025', spclEvent: 'no' },
        { id: 35, showDate: '୪', disable: 'yes', date: '04/01/2025', spclEvent: 'no' },
    ];

    const CUSTOMEnglish_DATE = [
        { id: 1, showDate: '1', disable: 'no', date: '01/12/2024', spclEvent: 'yes' },
        { id: 2, showDate: '2', disable: 'no', date: '02/12/2024', spclEvent: 'yes' },
        { id: 3, showDate: '3', disable: 'no', date: '03/12/2024', spclEvent: 'yes' },
        { id: 4, showDate: '4', disable: 'no', date: '04/12/2024', spclEvent: 'yes' },
        { id: 5, showDate: '5', disable: 'no', date: '05/12/2024', spclEvent: 'no' },
        { id: 6, showDate: '6', disable: 'no', date: '06/12/2024', spclEvent: 'yes' },
        { id: 7, showDate: '7', disable: 'no', date: '07/12/2024', spclEvent: 'yes' },
        { id: 8, showDate: '8', disable: 'no', date: '08/12/2024', spclEvent: 'yes' },
        { id: 9, showDate: '9', disable: 'no', date: '09/12/2024', spclEvent: 'yes' },
        { id: 10, showDate: '10', disable: 'no', date: '10/12/2024', spclEvent: 'no' },
        { id: 11, showDate: '11', disable: 'no', date: '11/12/2024', spclEvent: 'yes' },
        { id: 12, showDate: '12', disable: 'no', date: '12/12/2024', spclEvent: 'yes' },
        { id: 13, showDate: '13', disable: 'no', date: '13/12/2024', spclEvent: 'yes' },
        { id: 14, showDate: '14', disable: 'no', date: '14/12/2024', spclEvent: 'yes' },
        { id: 15, showDate: '15', disable: 'no', date: '15/12/2024', spclEvent: 'yes' },
        { id: 16, showDate: '16', disable: 'no', date: '16/12/2024', spclEvent: 'yes' },
        { id: 17, showDate: '17', disable: 'no', date: '17/12/2024', spclEvent: 'yes' },
        { id: 18, showDate: '18', disable: 'no', date: '18/12/2024', spclEvent: 'no' },
        { id: 19, showDate: '19', disable: 'no', date: '19/12/2024', spclEvent: 'no' },
        { id: 20, showDate: '20', disable: 'no', date: '20/12/2024', spclEvent: 'no' },
        { id: 21, showDate: '21', disable: 'no', date: '21/12/2024', spclEvent: 'no' },
        { id: 22, showDate: '22', disable: 'no', date: '22/12/2024', spclEvent: 'no' },
        { id: 23, showDate: '23', disable: 'no', date: '23/12/2024', spclEvent: 'yes' },
        { id: 24, showDate: '24', disable: 'no', date: '24/12/2024', spclEvent: 'yes' },
        { id: 25, showDate: '25', disable: 'no', date: '25/12/2024', spclEvent: 'yes' },
        { id: 26, showDate: '26', disable: 'no', date: '26/12/2024', spclEvent: 'yes' },
        { id: 27, showDate: '27', disable: 'no', date: '27/12/2024', spclEvent: 'no' },
        { id: 28, showDate: '28', disable: 'no', date: '28/12/2024', spclEvent: 'no' },
        { id: 29, showDate: '29', disable: 'no', date: '29/12/2024', spclEvent: 'no' },
        { id: 30, showDate: '30', disable: 'no', date: '30/12/2024', spclEvent: 'yes' },
        { id: 31, showDate: '31', disable: 'no', date: '31/12/2024', spclEvent: 'no' },
        { id: 32, showDate: '1', disable: 'yes', date: '01/01/2025', spclEvent: 'no' },
        { id: 33, showDate: '2', disable: 'yes', date: '02/01/2025', spclEvent: 'no' },
        { id: 34, showDate: '3', disable: 'yes', date: '03/01/2025', spclEvent: 'no' },
        { id: 35, showDate: '4', disable: 'yes', date: '04/01/2025', spclEvent: 'no' },
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
                            <TouchableOpacity onPress={() => navigation.navigate('November2024')}>
                                <AntDesign name="caretleft" color={'#000'} size={25} />
                            </TouchableOpacity>
                            {selectedLanguage === "Odia" &&
                                <Text style={{ color: '#000', fontSize: 17, fontWeight: '600' }}>ଡିସେମ୍ବର  ୨୦୨୪</Text>
                            }
                            {selectedLanguage === "English" &&
                                <Text style={{ color: '#000', fontSize: 17, fontWeight: '600' }}>December  2024</Text>
                            }
                            <TouchableOpacity onPress={() => navigation.replace('January2025')}>
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

export default December2024

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