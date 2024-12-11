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

const October2024 = (props) => {

    const eventsForOdiaMonth = [
        {
            id: 1,
            date: '01/10/2024',
            day: 'ମଙ୍ଗଳବାର',
            name: '',
            Image: require('../../assets/Images/3rathas.jpg'),
            tithi: '(୧) ଅକ୍ଟୋବର , ମଙ୍ଗଳବାର (ଆଶ୍ଵିନ) କନ୍ୟା ଦି୧୬ନ , ରବିଅଲ୍ଅଓଲ୍ ତା୨୭ରିଖ , ସାୟନ ଆଶ୍ଵିନ ଦି୯ନ',
            sunrise: 'ଘ୫|୪୧|୧୬',
            sunset: 'ଘ୫|୩୧|୫୦',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୩୦ ମଧ୍ୟେ , ଘ୭|୧୮ ରୁ ଘ୧୧|୧୮ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୫୧ ରୁ ଘ୮|୩୯ ମଧ୍ୟେ , ଘ୯|୨୭ ରୁ ଘ୧୧|୫୧ ମଧ୍ୟେ , ଘ୧|୨୭ ରୁ ଘ୩|୩୩ ମଧ୍ୟେ , ଘ୪|୩୯ ରୁ ଘ୫|୨୭ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୩୨ ରୁ ରାତ୍ରି ଘ୭|୫୪ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୨ ରୁ ଘ୨|୩୦ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୭|୧୦ ରୁ ଘ୮|୩୭ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସନ୍ଧ୍ୟା ଘ୬|୫୯ ରୁ ଘ୮|୩୧ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 2,
            date: '02/10/2024',
            day: 'ବୁଧବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରେ ଓ ସର୍ବତ୍ର ମହାଳୟା ଅମାବାସ୍ୟା , ଫୁଲୋରି ଓଷା , ବଜ୍ରକାଳିକା ପୂଜା , ଶ୍ରୀମନ୍ଦିରରେ ଦୁର୍ଗାମାଧବଙ୍କ ବାହାର ବିଜେ',
            Image: require('../../assets/Images/rathaImg.jpeg'),
            tithi: '(୨) ଅକ୍ଟୋବର , ବୁଧବାର (ଆଶ୍ଵିନ) କନ୍ୟା ଦି୧୭ନ , ରବିଅଲ୍ଅଓଲ୍ ତା୨୮ରିଖ , ସାୟନ ଆଶ୍ଵିନ ଦି୧୦ନ',
            sunrise: 'ଘ୫|୪୧|୩୦',
            sunset: 'ଘ୫|୩୦|୫୬',
            gdTime: '(ଅମୃତ) ପ୍ରାତଃରୁ ଦିବା ଘ୬|୩୧ ମଧ୍ୟେ , ଘ୭|୧୯ ରୁ ଘ୮|୭ ମଧ୍ୟେ , ଘ୧୦|୩୧ ରୁ ଘ୧୨|୫୫ ମଧ୍ୟେ , ରାତ୍ରି ଘ୬|୧୪ ରୁ ଘ୭|୨ ମଧ୍ୟେ , ଘ୮|୩୮ ରୁ ଘ୩|୨ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୬|୩୧ ରୁ ଘ୭|୧୯ ମଧ୍ୟେ , ଘ୧|୪୩ ରୁ ଘ୪|୭ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୩୮ ରୁ ଘ୧୦|୭ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୩୫ ରୁ ଘ୧|୩ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୩୯ ରୁ ଘ୪|୧୫ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 3,
            date: '03/10/2024',
            day: 'ଗୁରୁବାର',
            name: 'ଶାରଦୀୟ ନବରାତ୍ର ପୂଜାରମ୍ଭ , ଶ୍ରୀବିରଜା ଦେବୀଙ୍କ ରଥଯାତ୍ରାରମ୍ଭ',
            Image: require('../../assets/Images/PuriTemple.png'),
            tithi: '(୩) ଅକ୍ଟୋବର , ଗୁରୁବାର (ଆଶ୍ଵିନ) କନ୍ୟା ଦି୧୮ନ , ରବିଅଲ୍ଅଓଲ୍ ତା୨୯ରିଖ , ସାୟନ ଆଶ୍ଵିନ ଦି୧୧ନ',
            sunrise: 'ଘ୫|୪୧|୪୪',
            sunset: 'ଘ୫|୩୦|୪',
            gdTime: '(ଅମୃତ) ପ୍ରାତଃରୁ ଦିବା ଘ୭|୧୯ ମଧ୍ୟେ , ଘ୧|୪୩ ରୁ ଘ୩|୧୯ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୧୩ ରୁ ରାତ୍ରି ଘ୮|୩୭ ମଧ୍ୟେ , ଘ୧୧|୪୯ ରୁ ଘ୨|୧୩ ମଧ୍ୟେ , ଘ୩|୫୦ ରୁ ନିଶାନ୍ତ ଘ୫|୪୨ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୨|୩୨ ରୁ ଘ୫|୩୦ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୩୪ ରୁ ଘ୧|୭ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 4,
            date: '04/10/2024',
            day: 'ଶୁକ୍ରବାର',
            name: 'ଦ୍ୱିତୀୟା ଚନ୍ଦ୍ର ଦର୍ଶନ',
            Image: require('../../assets/Images/PuriBeach.png'),
            tithi: '(୪) ଅକ୍ଟୋବର , ଶୁକ୍ରବାର (ଆଶ୍ଵିନ) କନ୍ୟା ଦି୧୯ନ , ରବିଅଲ୍ଅଓଲ୍ ତା୩୦ରିଖ , ସାୟନ ଆଶ୍ଵିନ ଦି୧୨ନ',
            sunrise: 'ଘ୫|୪୧|୫୯',
            sunset: 'ଘ୫|୨୯|୧୧',
            gdTime: '(ଅମୃତ) ପ୍ରାତଃରୁ ଦିବା ଘ୬|୩୧ ମଧ୍ୟେ , ଘ୭|୧୯ ରୁ ଘ୯|୪୩ ମଧ୍ୟେ , ଘ୧୨|୭ ରୁ ଘ୩|୧୯ ମଧ୍ୟେ , ଘ୪|୯ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୨୯ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୧୩ ରୁ ଘ୯|୨୫ ମଧ୍ୟେ , ଘ୧୧|୪୯ ରୁ ଘ୩|୧ ମଧ୍ୟେ , ଘ୩|୪୯ ରୁ ନିଶାନ୍ତ ଘ୫|୨୫ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୮|୩୭ ରୁ ଘ୧୧|୩୪ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧|୫ ରୁ ଘ୨|୩୩ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୩୦ ରୁ ଘ୧୦|୨ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 5,
            date: '05/10/2024',
            day: 'ଶନିବାର',
            name: '',
            Image: require('../../assets/Images/Mahaprasad.png'),
            tithi: '(୫) ଅକ୍ଟୋବର , ଶନିବାର (ଆଶ୍ଵିନ) କନ୍ୟା ଦି୨୦ନ , ରବିଅଲସସାନୀ ତା୧ରିଖ , ସାୟନ ଆଶ୍ଵିନ ଦି୧୩ନ',
            sunrise: 'ଘ୫|୪୨|୧୫',
            sunset: 'ଘ୫|୨୮|୧୯',
            gdTime: '(ଅମୃତ) ପ୍ରାତଃରୁ ଦିବା ଘ୬|୩୧ ମଧ୍ୟେ , ଘ୭|୧୯ ରୁ ଘ୯|୪୩ ମଧ୍ୟେ , ଘ୧୨|୭ ରୁ ଘ୩|୧୯ ମଧ୍ୟେ , ଘ୪|୮ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୨୮ ମଧ୍ୟେ , ରାତ୍ରି ଘ୧୨|୩୬ ରୁ ଘ୨|୧୨ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୨|୧୨ ରୁ ଘ୩|୦ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ପ୍ରାତଃ ଘ୫|୪୨ ରୁ ଘ୭|୧୦ ମଧ୍ୟେ , ଦିବା ଘ୩|୫୬ ରୁ ଘ୫|୨୮ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧|୧ ରୁ ଘ୨|୨୯ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୨୮ ରୁ ଘ୬|୫୯ ମଧ୍ୟେ , ରାତ୍ରି ଘ୪|୧୦ ରୁ ନିଶାନ୍ତ ଘ୫|୪୨ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 6,
            date: '06/10/2024',
            day: 'ରବିବାର',
            name: '',
            Image: require('../../assets/Images/LaxmiPuja.png'),
            tithi: '(୬) ଅକ୍ଟୋବର , ରବିବାର (ଆଶ୍ଵିନ) କନ୍ୟା ଦି୨୧ନ , ରବିଅଲସସାନୀ ତା୨ରିଖ , ସାୟନ ଆଶ୍ଵିନ ଦି୧୪ନ',
            sunrise: 'ଘ୫|୪୨|୨୮',
            sunset: 'ଘ୫|୨୭|୨୦',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୬|୩୨ ରୁ ଘ୮|୫୬ ମଧ୍ୟେ , ଘ୧୨|୮ ରୁ ଘ୩|୨୦ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୪୭ ରୁ ଘ୯|୨୩ ମଧ୍ୟେ , ଘ୧୧|୪୭ ରୁ ଘ୧|୨୩ ମଧ୍ୟେ , ଘ୨|୧୩ ରୁ ନିଶାନ୍ତ ଘ୫|୪୩ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୪|୮ ରୁ ଘ୪|୫୬ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୪୬ ରୁ ଘ୧|୦ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧|୫ ରୁ ଘ୨|୩୩ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୬ ରୁ ଘ୨|୩୮ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 7,
            date: '07/10/2024',
            day: 'ସୋମବାର ',
            name: 'ପଞ୍ଚମ୍ୟାଦି କଳ୍ପାରମ୍ଭ',
            Image: require('../../assets/Images/Konark.png'),
            tithi: '(୭) ଅକ୍ଟୋବର , ସୋମବାର (ଆଶ୍ଵିନ) କନ୍ୟା ଦି୨୨ନ , ରବିଅଲସସାନୀ ତା୩ରିଖ , ସାୟନ ଆଶ୍ଵିନ ଦି୧୫ନ',
            sunrise: 'ଘ୫|୪୨|୪୬',
            sunset: 'ଘ୫|୨୬|୩୬',
            gdTime: '(ଅମୃତ) ପ୍ରାତଃରୁ ଦିବା ଘ୭|୨୦ ମଧ୍ୟେ , ଘ୮|୫୬ ରୁ ଘ୧୧|୨୦ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୪୬ ରୁ ଘ୧୦|୫୮ ମଧ୍ୟେ , ଘ୨|୧୦ ରୁ ଘ୨|୫୮ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୧୧ ରୁ ଘ୮|୩୮ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୨|୨୮ ରୁ ଘ୩|୫୬ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୧ ରୁ ଘ୧୧|୩୩ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 8,
            date: '08/10/2024',
            day: 'ମଙ୍ଗଳବାର',
            name: '',
            Image: require('../../assets/Images/KhajaBhoga.png'),
            tithi: '(୮) ଅକ୍ଟୋବର , ମଙ୍ଗଳବାର (ଆଶ୍ଵିନ) କନ୍ୟା ଦି୨୩ନ , ରବିଅଲସସାନୀ ତା୪ରିଖ , ସାୟନ ଆଶ୍ଵିନ ଦି୧୬ନ',
            sunrise: 'ଘ୫|୪|୩୨',
            sunset: 'ଘ୫|୨୫|୪୬',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୩୨ ମଧ୍ୟେ , ଘ୭|୨୦ ରୁ ଘ୧୧|୨୦ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୪୫ ରୁ ଘ୮|୩୩ ମଧ୍ୟେ , ଘ୯|୨୧ ରୁ ଘ୧୧|୪୫ ମଧ୍ୟେ , ଘ୧|୨୧ ରୁ ଘ୨|୫୭ ପର୍ଯ୍ୟନ୍ତ , ଘ୪|୩୮ ରୁ ଘ୫|୨୬ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୭|୪୬ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୧୧ ରୁ ଘ୮|୩୮ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୨|୫୯ ରୁ ଘ୨|୨୬ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସନ୍ଧ୍ୟା ଘ୬|୫୫ ରୁ ଘ୮|୨୮ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 9,
            date: '09/10/2024',
            day: 'ବୁଧବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରେ ମହାସପ୍ତମୀ , ମୃଣ୍ମୟୀ ଦେବୀଙ୍କ ବିଲ୍ବାଧିବାସ , ପୀଠଦେବୀ , ଗୃହଦେବୀ ଓ ବିମଳା ପୀଠେ , ସପ୍ତମ୍ୟାଦି ତ୍ରିଦିନାତ୍ମକ ପୂଜାରମ୍ଭ ,ତପଃଷଷ୍ଠୀ',
            Image: require('../../assets/Images/3rathas.jpg'),
            tithi: '(୯) ଅକ୍ଟୋବର , ବୁଧବାର (ଆଶ୍ଵିନ) କନ୍ୟା ଦି୨୪ନ , ରବିଅଲସସାନୀ ତା୫ରିଖ , ସାୟନ ଆଶ୍ଵିନ ଦି୧୭ନ',
            sunrise: 'ଘ୫|୪୩|୧୭',
            sunset: 'ଘ୫|୨୪|୫୭',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୩୩ ମଧ୍ୟେ , ଘ୭|୨୧ ରୁ ଘ୮|୧୯ ମଧ୍ୟେ , ଦିବା ଘ୧୦|୩୩ ରୁ ଘ୧୨|୫୭ ମଧ୍ୟେ , ରାତ୍ରି ଘ୬|୯ ରୁ ଘ୬|୫୭ ମଧ୍ୟେ, ଘ୮|୩୩ ରୁ ଘ୧୨|୫୭ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୬|୩୩ ରୁ ଘ୭|୨୧ ମଧ୍ୟେ , ଘ୧|୪୫ ରୁ ଘ୪|୯ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୩୯ ରୁ ଘ୧୦|୬ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୩୩ ରୁ ଘ୧|୦ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୩୯ ରୁ ଘ୪|୧୨ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 10,
            date: '10/10/2024',
            day: 'ଗୁରୁବାର',
            name: 'ମୃଣ୍ମୟୀ ଦେବୀଙ୍କ ସପ୍ତମ୍ୟାଦି ତ୍ରିଦିନ ପୂଜାରମ୍ଭ , ଶ୍ରୀମନ୍ଦିରରେ ମହାଷ୍ଟମୀ , ଗୃହଦେବୀ ଓ ପୀଠ ଦେବ୍ୟା ମହାଷ୍ଟମୀ ପୂଜା , ହୋମ , ଦ୍ୱିଦିନ କଳ୍ପାରମ୍ଭ , ଭାଇ ଜୀଉନ୍ତିଆ',
            Image: require('../../assets/Images/rathaImg.jpeg'),
            tithi: '(୧୦) ଅକ୍ଟୋବର , ଗୁରୁବାର (ଆଶ୍ଵିନ) କନ୍ୟା ଦି୨୫ନ , ରବିଅଲସସାନୀ ତା୬ରିଖ , ସାୟନ ଆଶ୍ଵିନ ଦି୧୮ନ',
            sunrise: 'ଘ୫|୪୩|୩୪',
            sunset: 'ଘ୫|୨୪|୮',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୨୧ ମଧ୍ୟେ , ଘ୧|୪୫ ରୁ ଘ୩|୨୧ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୮ ରୁ ରାତ୍ରି ଘ୯|୨୦ ମଧ୍ୟେ , ଘ୧୧|୪୪ ରୁ ଘ୨|୫୬ ମଧ୍ୟେ , ଘ୩|୪୪ ରୁ ନିଶାନ୍ତ ଘ୫|୨୦ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୨|୨୯ ରୁ ଘ୫|୨୪ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୩୩ ରୁ ଘ୧|୬ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 11,
            date: '11/10/2024',
            day: 'ଶୁକ୍ରବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରେ ବିମାଳାଦେବ୍ୟା , ଗୃହଦେବୀ ଓ ପୀଠ ଦେବୀଙ୍କର ମହାନବମୀ ପୂଜା , ସନ୍ଧିପୂଜା , ଏକଦିନାତ୍ମକ ପୂଜା , ଫଲଥୁଆ , ଶରଣ ଆରମ୍ଭ',
            Image: require('../../assets/Images/PuriTemple.png'),
            tithi: '(୧୧) ଅକ୍ଟୋବର , ଶୁକ୍ରବାର (ଆଶ୍ଵିନ) କନ୍ୟା ଦି୨୬ନ , ରବିଅଲସସାନୀ ତା୭ରିଖ , ସାୟନ ଆଶ୍ଵିନ ଦି୧୯ନ',
            sunrise: 'ଘ୫|୪୩|୫୧',
            sunset: 'ଘ୫|୨୩|୧୯',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୩୩ ମଧ୍ୟେ , ଘ୭|୨୧ ରୁ ଘ୯|୪୫ ମଧ୍ୟେ , ଘ୧୨|୯ ରୁ ଘ୩|୨୧ ମଧ୍ୟେ , ଘ୪|୧୧ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୨୩ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୭ ରୁ ରାତ୍ରି ଘ୯|୧୯ ମଧ୍ୟେ | ଘ୧୧|୪୩ ରୁ ଘ୨|୫୫ ମଧ୍ୟେ , ଘ୩|୪୩ ରୁ ନିଶାନ୍ତ ଘ୫|୧୯ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୮|୩୯ ରୁ ଘ୧୧|୩୧ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୨୬ ରୁ ଘ୯|୫୯ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 12,
            date: '12/10/2024',
            day: 'ଶନିବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରେ ବିମଳା ଦେବ୍ୟା ବିଶ୍ରାମ ପୂଜା , ଗୃହଦେବୀ ଓ ପୀଠେ ଷୋଳ ଶାସନରେ ଦଶହରା ,ଅପରାଜିତା ଦଶମୀ , ବିଜୟା ଦଶମୀ , ଦଶହରା ଉତ୍ସବ , ସୋମନାଥ ବ୍ରତ ସମାପନ ,ଅପରାଜିତା ପୂଜା',
            Image: require('../../assets/Images/PuriBeach.png'),
            tithi: '(୧୨) ଅକ୍ଟୋବର , ଶନିବାର (ଆଶ୍ଵିନ) କନ୍ୟା ଦି୨୭ନ , ରବିଅଲସସାନୀ ତା୮ରିଖ , ସାୟନ ଆଶ୍ଵିନ ଦି୨୦ନ',
            sunrise: 'ଘ୫|୪୪|୯',
            sunset: 'ଘ୫|୨୨|୨୯',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୩୪ ମଧ୍ୟେ , ଘ୭|୨୨ ରୁ ଘ୯|୪୬ ମଧ୍ୟେ , ଘ୧୨|୫୦ ରୁ ଘ୩|୨୨ ମଧ୍ୟେ , ଘ୪|୧୧ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୨୨ ମଧ୍ୟେ , ରାତ୍ରି ଘ୧୨|୩୦ ରୁ ଘ୨|୬ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୨|୬ ରୁ ଘ୨|୫୪ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ପ୍ରାତଃ ଘ୫|୪୪ ରୁ ଘ୭|୧୨ ମଧ୍ୟେ , ଦିବା ଘ୩|୫୩ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୨୨ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୨|୫୯ ରୁ ଘ୨|୨୬ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୨୨ ରୁ ଘ୬|୫୩ ମଧ୍ୟେ , ରାତ୍ରି ଘ୪|୧୧ ରୁ ନିଶାନ୍ତ ଘ୫|୪୪ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 13,
            date: '13/10/2024',
            day: 'ରବିବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରେ ଆୟୁଧପୂଜା ଓ ଦଶହରା , କୁମାରୀ ପୂଜା , ବିଜୟା ମିଳନ , ଶିରିଡି ସାଇବାବାଙ୍କ ତିରୋଧାନ ଦିବସ',
            Image: require('../../assets/Images/Mahaprasad.png'),
            tithi: '(୧୩) ଅକ୍ଟୋବର , ରବିବାର (ଆଶ୍ଵିନ) କନ୍ୟା ଦି୨୮ନ , ରବିଅଲସସାନୀ ତା୯ରିଖ , ସାୟନ ଆଶ୍ଵିନ ଦି୨୧ନ',
            sunrise: 'ଘ୫|୪୪|୨୭',
            sunset: 'ଘ୫|୨୧|୪୧',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୬|୩୪ ରୁ ଘ୯|୮ ମଧ୍ୟେ , ଘ୧୨|୨୦ ରୁ ଘ୩|୩୨ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୪୨ ରୁ ଘ୯|୧୮ ମଧ୍ୟେ , ଘ୧୨|୪୨ ରୁ ଘ୧|୧୮ ମଧ୍ୟେ , ଘ୨|୬ ରୁ ନିଶାନ୍ତ ଘ୫|୧୮ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୪|୧୦ ରୁ ଘ୪|୫୮ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୫ ରୁ ଘ୧୨|୫୦ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୫ ରୁ ଘ୨|୩୯ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 14,
            date: '14/10/2024',
            day: 'ସୋମବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରେ  ବାଳଧୂପ ଓ ରାଧାଦାମୋଦର ବେଶ ଆରମ୍ଭ , ସର୍ବସମ୍ମତ ପାପଙ୍କୁଶା  (ତ୍ରି ଶା) ଏକାଦଶୀ ଭଷାଣ ଯାତ୍ରା , ପୁରୀରେ ଗୋଷାଣ ମିଳନ',
            Image: require('../../assets/Images/LaxmiPuja.png'),
            tithi: '(୧୪) ଅକ୍ଟୋବର , ସୋମବାର (ଆଶ୍ଵିନ) କନ୍ୟା ଦି୨୯ନ , ରବିଅଲସସାନୀ ତା୧୦ରିଖ , ସାୟନ ଆଶ୍ଵିନ ଦି୨୨ନ',
            sunrise: 'ଘ୫|୪୪|୪୬',
            sunset: 'ଘ୫|୨୦|୫୪',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୨୨ ମଧ୍ୟେ , ଘ୮|୫୮ ରୁ ଘ୧୧|୨୨ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୪୧ ରୁ ଘ୧୦|୫୩ ମଧ୍ୟେ , ଘ୨|୫ ରୁ ଘ୨|୫୩ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୨|୧୮ ରୁ ଘ୩|୬ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୧୩ ରୁ ଘ୮|୪୯ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୯|୫୨ ରୁ  ଘ୧୧|୨୮ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 15,
            date: '15/10/2024',
            day: 'ମଙ୍ଗଳବାର',
            name: 'ଶରଣ  ଶେଷ',
            Image: require('../../assets/Images/Konark.png'),
            tithi: '(୧୫) ଅକ୍ଟୋବର , ମଙ୍ଗଳବାର (ଆଶ୍ଵିନ) କନ୍ୟା ଦି୩୦ନ , ରବିଅଲସସାନୀ ତା୧୧ରିଖ , ସାୟନ ଆଶ୍ଵିନ ଦି୨୩ନ',
            sunrise: 'ଘ୫|୪୫|୫',
            sunset: 'ଘ୫|୨୦|୮',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୩୫ ମଧ୍ୟେ , ଘ୭|୨୩ ରୁ ଘ୧୧|୨୩ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୪୦ ରୁ ଘ୮|୨୮ ମଧ୍ୟେ , ଘ୯|୧୬ ରୁ ଘ୧୧|୪୦ , ଘ୧|୧୬ ରୁ ଘ୨|୫୨ ମଧ୍ୟେ , ଘ୪|୨୯ ରୁ ନିଶାନ୍ତ ଘ୫|୧୬ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୭|୪୧ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୧୨|୫୬ ରୁ ଘ୨|୨୨ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୭|୧୩ ରୁ ଘ୮|୩୯ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୬|୪୮ ରୁ ଘ୮|୨୭ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 16,
            date: '16/10/2024',
            day: 'ବୁଧବାର',
            name: 'କୁମାର ପୂର୍ଣ୍ଣିମା , କୁମାର ଉତ୍ସବ , ଗଜଲକ୍ଷ୍ମୀ ପୂଜା , ଜହ୍ନି ଓଷା ସମାପ୍ତି , କୋଜାଗର କୃତ୍ୟ , ମାସାନ୍ତ',
            Image: require('../../assets/Images/KhajaBhoga.png'),
            tithi: '(୧୬) ଅକ୍ଟୋବର , ବୁଧବାର (ଆଶ୍ଵିନ) କନ୍ୟା ଦି୩୧ନ , ରବିଅଲସସାନୀ ତା୧୨ରିଖ , ସାୟନ ଆଶ୍ଵିନ ଦି୨୪ନ',
            sunrise: 'ଘ୫|୪୫|୨୪',
            sunset: 'ଘ୫|୧୯|୨୨',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୩୪ ମଧ୍ୟେ , ଘ୭|୨୩ ରୁ ଘ୮|୧୧ ମଧ୍ୟେ , ଘ୧୦|୩୫ ରୁ ଘ୧୨|୫୯ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୩ ରୁ ଘ୬|୫୧ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୨୭ ରୁ ଘ୨|୫୧ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୬|୩୫ ରୁ ଘ୭|୨୩ ମଧ୍ୟେ , ଦିବା ଘ୧|୪୭ ରୁ ୪|୧୧ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୩୯ ରୁ ଘ୧୦|୫ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୩୦ ରୁ ଘ୨|୫୬ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୩୯ ରୁ ଘ୪|୧୩ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 17,
            date: '17/10/2024',
            day: 'ଗୁରୁବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରେ କୁମାର ପୂର୍ଣ୍ଣିମା , ଶ୍ରୀସୁଦର୍ଶନ ଦେବଙ୍କର ଆଶ୍ରମ ବିଜେ , ତୁଳା (ଗର୍ଭଣା) ସଂକ୍ରାନ୍ତି , ଗୁରୁପୂର୍ଣ୍ଣିମା ବ୍ରତ , କାର୍ତ୍ତିକ ବ୍ରତାରମ୍ଭ , କାର୍ତ୍ତିକେୟ ଜନ୍ମ',
            Image: require('../../assets/Images/3rathas.jpg'),
            tithi: '(୧୭) ଅକ୍ଟୋବର ,ଗୁରୁବାର (କାର୍ତ୍ତିକ) ତୁଳା ଦି୧ନ , ରବିଅଲସସାନୀ ତା୧୩ରିଖ , ସାୟନ ଆଶ୍ଵିନ ଦି୨୫ନ',
            sunrise: 'ଘ୫|୪୫|୪୪',
            sunset: 'ଘ୫|୧୮|୩୬',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୨୩ ମଧ୍ୟେ , ଘ୧|୪୭ ରୁ ଘ୩|୨୩ ମଧ୍ୟେ , ରାତ୍ରି ଘ୬|୩ ରୁ ଘ୯|୧୫ ମଧ୍ୟେ , ଘ୧୧|୩୯ ରୁ ଘ୨|୫୨ ପର୍ଯ୍ୟନ୍ତ , ଘ୩|୩୯ ରୁ ନିଶାନ୍ତ ଘ୫|୧୫ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୨|୨୬ ରୁ ଅସ୍ତ ଘ୫|୧୯ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୩୪ ରୁ ଘ୭|୭ ମଧ୍ୟେ , ରାତ୍ରି ଘ୧୧|୩୧ ରୁ ଘ୧|୫ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 18,
            date: '18/10/2024',
            day: 'ଶୁକ୍ରବାର',
            name: '',
            Image: require('../../assets/Images/rathaImg.jpeg'),
            tithi: '(୧୮) ଅକ୍ଟୋବର , ଶୁକ୍ରବାର (କାର୍ତ୍ତିକ) ତୁଳା ଦି୨ନ , ରବିଅଲସସାନୀ ତା୧୪ରିଖ , ସାୟନ ଆଶ୍ଵିନ ଦି୨୬ନ',
            sunrise: 'ଘ୫|୪୬|୪',
            sunset: 'ଘ୫|୧୭|୫୨',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୩୬ ମଧ୍ୟେ , ଘ୭|୨୪ ରୁ ଘ୯|୪୮ ମଧ୍ୟେ , ଘ୧୨|୧୨ ରୁ ଘ୩|୨୪ ମଧ୍ୟେ , ଘ୪|୧୪ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୧୮ ପର୍ଯ୍ୟନ୍ତ ,ସନ୍ଧ୍ୟା ଘ୬|୨ ରୁ ରାତ୍ରି ଘ୯|୧୪ ମଧ୍ୟେ , ଘ୧୧|୩୮ ରୁ ଘ୨|୫୦ ମଧ୍ୟେ , ଘ୩|୩୮ ରୁ ନିଶାନ୍ତ ଘ୫|୧୪ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୮|୩୯ ରୁ ଘ୧୧|୩୦ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୨୧ ରୁ ଘ୯|୫୬ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 19,
            date: '19/10/2024',
            day: 'ଶନିବାର',
            name: '',
            Image: require('../../assets/Images/PuriTemple.png'),
            tithi: '(୧୯) ଅକ୍ଟୋବର , ଶନିବାର (କାର୍ତ୍ତିକ) ତୁଳା ଦି୩ନ , ରବିଅଲସସାନୀ ତା୧୫ରିଖ , ସାୟନ ଆଶ୍ଵିନ ଦି୨୭ନ',
            sunrise: 'ଘ୫|୪୬|୨୫',
            sunset: 'ଘ୫|୧୭|୯',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୩୫ ମଧ୍ୟେ , ଘ୭|୨୪ ରୁ ଘ୯|୪୮ ମଧ୍ୟେ , ଘ୧୨|୧୨ ରୁ ଘ୩|୨୪ ମଧ୍ୟେ , ଘ୪|୧୩ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୧୭ ପର୍ଯ୍ୟନ୍ତ , ରାତ୍ରି ଘ୧୨|୨୫ ରୁ ଘ୨|୧୧ ମଧ୍ୟେ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୨|୧ ରୁ ଘ୨|୪୯ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ପ୍ରାତଃ ଘ୬|୩୫ ରୁ ଘ୭|୧୩ ମଧ୍ୟେ , ଘ୩|୮ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୧୭ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୧୨|୫୬ ରୁ ଘ୨|୨୧ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସୂର୍ଯ୍ୟାସ୍ତରୁ ଘ୬|୪୮ ମଧ୍ୟେ   ଘ୪|୧୨ ରୁ ନିଶାନ୍ତ ଘ୫|୪୭ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 20,
            date: '20/10/2024',
            day: 'ରବିବାର',
            name: '',
            Image: require('../../assets/Images/PuriBeach.png'),
            tithi: '(୨୦) ଅକ୍ଟୋବର , ରବିବାର (କାର୍ତ୍ତିକ) ତୁଳା ଦି୪ନ , ରବିଅଲସସାନୀ ତା୪ରିଖ , ସାୟନ ଆଶ୍ଵିନ ଦି୨୮ନ',
            sunrise: 'ଘ୫|୪୬|୪୬',
            sunset: 'ଘ୫|୧୬|୨୬',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୬|୩୭ ରୁ ଘ୯|୧ ମଧ୍ୟେ , ଘ୧୨|୧୩ ରୁ ଘ୩|୨୫ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୩୭ ରୁ ଘ୯|୧୩ ମଧ୍ୟେ , ଘ୧୧|୩୭ ରୁ ଘ୧|୧୩ ମଧ୍ୟେ , ଘ୨|୧ ରୁ ନିଶାନ୍ତ ଘ୫|୧୩ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୧୯ ରୁ ଘ୪|୨୭ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୫ ରୁ ଘ୧୨|୫୬ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୫ ରୁ ଘ୨|୪୦ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 21,
            date: '21/10/2024',
            day: 'ସୋମବାର',
            name: '',
            Image: require('../../assets/Images/Mahaprasad.png'),
            tithi: '(୨୧) ଅକ୍ଟୋବର , ସୋମବାର (କାର୍ତ୍ତିକ) ତୁଳା ଦି୫ନ , ରବିଅଲସସାନୀ ତା୧୭ରିଖ , ସାୟନ ଆଶ୍ଵିନ ଦି୨୯ନ',
            sunrise: 'ଘ୫|୪୭|୮',
            sunset: 'ଘ୫|୧୫|୪୪',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୨୫ ମଧ୍ୟେ , ଘ୯|୧ ରୁ ଘ୧୧|୨୫ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୩୬ ରୁ ଘ୧୦|୪୮ ମଧ୍ୟେ , ଘ୨|୦ ରୁ ଘ୨|୪୮ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୧୪ ରୁ ଘ୮|୪୦ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୨|୨୨ ରୁ ଘ୩|୬ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୯|୫୬ ରୁ ଘ୧୧|୩୧ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 22,
            date: '22/10/2024',
            day: 'ମଙ୍ଗଳବାର',
            name: '',
            Image: require('../../assets/Images/LaxmiPuja.png'),
            tithi: '(୨୨) ଅକ୍ଟୋବର , ମଙ୍ଗଳବାର (କାର୍ତ୍ତିକ) ତୁଳା ଦି୬ନ , ରବିଅଲସସାନୀ ତା୧୮ରିଖ , ସାୟନ ଆଶ୍ଵିନ ଦ୩୦ନ',
            sunrise: 'ଘ୫|୪୭|୩୦',
            sunset: 'ଘ୫|୧୫|୨',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୩୮ ମଧ୍ୟେ , ଘ୭|୨୬ ରୁ ଘ୧୧|୨୬ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୩୬ ରୁ ଘ୮|୨୪ ମଧ୍ୟେ , ଘ୯|୧୦ ରୁ ଘ୧୧|୩୬ ମଧ୍ୟେ , ଘ୧|୧୨ ରୁ ଘ୨|୪୮ ମଧ୍ୟେ , ଘ୪|୨୫ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୧୫ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୭|୩୭ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୧୨|୫୫ ରୁ ଘ୨|୨୦ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ପ୍ରାତଃ ଘ୭|୧୪ ରୁ ଘ୮|୪୦ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସନ୍ଧ୍ୟା ଘ୬|୪୭ ରୁ ଘ୮|୨୧ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 23,
            date: '23/10/2024',
            day: 'ବୁଧବାର',
            name: '',
            Image: require('../../assets/Images/Konark.png'),
            tithi: '(୨୩) ଅକ୍ଟୋବର , ବୁଧବାର (କାର୍ତ୍ତିକ) ତୁଳା ଦି୭ନ , ରବିଅଲସସାନୀ ତା୧୯ରିଖ , ସାୟନ କାର୍ତ୍ତିକ ଦି୧ନ',
            sunrise: 'ଘ୫|୪୭|୫୩',
            sunset: 'ଘ୫|୧୪|୨୧',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୩୮ ମଧ୍ୟେ , ଘ୭|୨୬ ରୁ ଘ୮|୧୪ ମଧ୍ୟେ , ଘ୧୦|୩୮ ରୁ ଘ୧|୨ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୫|୫୯ ରୁ ଘ୬|୪୭ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୨୩ ରୁ ୨|୪୭ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୬|୩୮ ରୁ ଘ୭|୨୬ ମଧ୍ୟେ ,ଘ୧|୫୦ ରୁ ଘ୪|୧୪ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୪୦ ରୁ ଘ୧୦|୫ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୩୦ ରୁ ଘ୧୨|୫୫ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୪୦ ରୁ ଘ୪|୧୫ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 24,
            date: '24/10/2024',
            day: 'ଗୁରୁବାର',
            name: 'ଅଷ୍ଟକା ଶ୍ରାଦ୍ଧ , ଜାତିସଂଘ ଦିବସ',
            Image: require('../../assets/Images/KhajaBhoga.png'),
            tithi: '(୨୪) ଅକ୍ଟୋବର , ଗୁରୁବାର (କାର୍ତ୍ତିକ) ତୁଳା ଦି୮ନ , ରବିଅଲସସାନୀ ତା୨୦ରିଖ , ସାୟନ କାର୍ତ୍ତିକ ଦି୨ନ',
            sunrise: 'ଘ୫|୪୮|୧୭',
            sunset: 'ଘ୫|୧୩|୪୧',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୨୫ ମଧ୍ୟେ , ଘ୧|୫୦ ରୁ ଘ୩|୨୬ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୫|୫୮ ରୁ ରାତ୍ରି ଘ୯|୧୦ ମଧ୍ୟେ , ଘ୧୧|୩୪ ରୁ ଘ୨|୪୬ ମଧ୍ୟେ , ଘ୩|୩୪ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୪୯ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୨|୨୧ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୧୪ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୩୦ ରୁ ଘ୧|୫ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 25,
            date: '25/10/2024',
            day: 'ଶୁକ୍ରବାର',
            name: 'ଅନ୍ଵଷ୍ଟକା ଶ୍ରାଦ୍ଧ',
            Image: require('../../assets/Images/3rathas.jpg'),
            tithi: '(୨୫) ଅକ୍ଟୋବର , ଶୁକ୍ରବାର (କାର୍ତ୍ତିକ) ତୁଳା ଦି୯ନ , ରବିଅଲସସାନୀ ତା୨୧ରିଖ , ସାୟନ କାର୍ତ୍ତିକ ଦି୩ନ',
            sunrise: 'ଘ୫|୪୮|୩୯',
            sunset: 'ଘ୫|୧୩|୩',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୩୯ ମଧ୍ୟେ , ଘ୭|୨୭ ରୁ ଘ୯|୫୧ ମଧ୍ୟେ , ଘ୧୨|୧୫ ରୁ ଘ୩|୨୭ ମଧ୍ୟେ , ଘ୪|୧୬ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୩୪ ପର୍ଯ୍ୟନ୍ତ , ସନ୍ଧ୍ୟା ଘ୫|୫୮ ରୁ ରାତ୍ରି ଘ୯|୧୦ ମଧ୍ୟେ , ଘ୧୧|୩୪ ରୁ ଘ୨|୪୬ ମଧ୍ୟେ , ରାତ୍ରିଶେଷ ଘ୫|୪୯ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୮|୪୦ ରୁ ଘ୧୧|୩୦ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୧୯ ରୁ ଘ୯|୫୪ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 26,
            date: '26/10/2024',
            day: 'ଶନିବାର',
            name: '',
            Image: require('../../assets/Images/rathaImg.jpeg'),
            tithi: '(୨୬) ଅକ୍ଟୋବର , ଶନିବାର (କାର୍ତ୍ତିକ) ତୁଳା ଦି୯ନ , ରବିଅଲସସାନୀ ତା୨୧ରିଖ , ସାୟନ କାର୍ତ୍ତିକ ଦି୪ନ',
            sunrise: 'ଘ୫|୪୯|୩',
            sunset: 'ଘ୫|୧୨|୨୫',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୩୮ ମଧ୍ୟେ , ଘ୭|୨୭ ରୁ ଘ୯|୫୧ ମଧ୍ୟେ , ଘ୧୨|୧୫ ରୁ ଘ୩|୨୭ ମଧ୍ୟେ , ଘ୪|୧୫ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୧୨ ପର୍ଯ୍ୟନ୍ତ , ରାତ୍ରି ଘ୧୨|୨୧ ରୁ ଘ୧|୫୭ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୧|୫୭ ରୁ ଘ୨|୪୫ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ପ୍ରାତଃ ଘ୭|୧୫ ମଧ୍ୟେ , ଘ୩|୪୫ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୧୨ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୨|୫୪ ରୁ ଘ୨|୧୯ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସୂର୍ଯ୍ୟାସ୍ତରୁ ସନ୍ଧ୍ୟା ଘ୬|୪୪ ମଧ୍ୟେ , ରାତ୍ରି ଘ୪|୧୪ ରୁ ନିଶାନ୍ତ ଘ୫|୪୯ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 27,
            date: '27/10/2024',
            day: 'ରବିବାର',
            name: '',
            Image: require('../../assets/Images/PuriTemple.png'),
            tithi: '(୨୭) ଅକ୍ଟୋବର , ରବିବାର (କାର୍ତ୍ତିକ) ତୁଳା ଦି୧୧ନ , ରବିଅଲସସାନୀ ତା୨୩ରିଖ , ସାୟନ କାର୍ତ୍ତିକ ଦି୫ନ',
            sunrise: 'ଘ୫|୪୯|୨୮',
            sunset: 'ଘ୫|୧୧|୪୮',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୬|୪୦ ରୁ ଘ୯|୪ ମଧ୍ୟେ , ଘ୧୨|୧୬ ରୁ ଘ୩|୨୮ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୩୩ ରୁ ଘ୯|୯ ମଧ୍ୟେ , ଘ୧୧|୩୩ ରୁ ଘ୧|୯ ମଧ୍ୟେ , ଘ୧|୫୭ ରୁ ନିଶାନ୍ତ ଘ୫|୯ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୪|୨୩ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୧୨ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୫ ରୁ ଘ୧୨|୫୪ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୬ ରୁ ଘ୨|୪୧ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 28,
            date: '28/10/2024',
            day: 'ସୋମବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ ଓ ସର୍ବସମ୍ମତ ରମା ଏକାଦଶୀ , ଗୋବତ୍ସା ଦ୍ଵାଦଶୀ , ନଣ୍ଡାବାବାଙ୍କ ଆବିର୍ଭାବ',
            Image: require('../../assets/Images/PuriBeach.png'),
            tithi: '(୨୮) ଅକ୍ଟୋବର , ସୋମବାର (କାର୍ତ୍ତିକ) ତୁଳା ଦି୧୨ନ , ରବିଅଲସସାନୀ ତା୨୪ରିଖ , ସାୟନ କାର୍ତ୍ତିକ  ଦି୬ନ',
            sunrise: 'ଘ୫|୪୯|୫୩',
            sunset: 'ଘ୫|୧୧|୧୩',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୨୮ ମଧ୍ୟେ , ଘ୯|୪ ରୁ ଘ୧୧|୨୮ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୩୨ ରୁ ଘ୧୦|୪୪ ମଧ୍ୟେ , ଘ୧|୫୬ ରୁ ଘ୨|୪୪ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୧୭ ରୁ ଘ୮|୪୧ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୨|୧୮ ରୁ ଘ୩|୩୩ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୯|୫୪ ରୁ ଘ୧୧|୩୦ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 29,
            date: '29/10/2024',
            day: 'ମଙ୍ଗଳବାର',
            name: 'ଯମ ଦୀପଦାନ',
            Image: require('../../assets/Images/Mahaprasad.png'),
            tithi: '(୨୯) ଅକ୍ଟୋବର , ମଙ୍ଗଳବାର (କାର୍ତ୍ତିକ) ତୁଳା ଦି୧୩ନ , ରବିଅଲସସାନୀ ତା୨୫ରିଖ , ସାୟନ କାର୍ତ୍ତିକ ଦି୭ନ',
            sunrise: 'ଘ୫|୫୦|୧୯',
            sunset: 'ଘ୫|୧୦|୩୭',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୪୦ ମଧ୍ୟେ , ଘ୭|୨୯ ରୁ ଘ୧୧|୨୯ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୩୨ ରୁ ଘ୮|୨୦ ମଧ୍ୟେ , ଘ୯|୮ ରୁ ଘ୧୧|୩୨ ମଧ୍ୟେ , ଘ୧|୮ ରୁ ଘ୨|୪୪ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୭|୩୩ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୧୨|୫୪ ରୁ ଘ୨|୮ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୭|୧୭ ରୁ ଘ୮|୪୧ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୬|୪୨ ରୁ ଘ୮|୧୮ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 30,
            date: '30/10/2024',
            day: 'ବୁଧବାର',
            name: 'ଧନ୍ଵନ୍ତରୀ ଜୟନ୍ତୀ (ଧନତେରଣ) , ନରକ ଚତୁରଦର୍ଶୀ',
            Image: require('../../assets/Images/LaxmiPuja.png'),
            tithi: '(୩୦) ଅକ୍ଟୋବର , ବୁଧବାର (କାର୍ତ୍ତିକ) ତୁଳା ଦି୧୪ନ , ରବିଅଲସସାନୀ ତା୨୬ରିଖ , ସାୟନ କାର୍ତ୍ତିକ ଦି୮ନ',
            sunrise: 'ଘ୫|୫୦|୪୬',
            sunset: 'ଘ୫|୧୦|୨',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୪୧ ମଧ୍ୟେ , ଘ୭|୨୯ ରୁ ଘ୮|୧୭ ମଧ୍ୟେ , ଘ୧୦|୪୧ ରୁ ଘ୧|୫ ମଧ୍ୟେ , ଘ୫|୫୫ ରୁ ରାତ୍ରି ଘ୬|୪୩ ମଧ୍ୟେ , ଘ୮|୧୯ ରୁ ଘ୨|୪୩ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୬|୪୩ ରୁ ଘ୭|୨୯ ମଧ୍ୟେ , ଘ୧|୫୩ ରୁ ଘ୪|୧୭ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୪୨ ରୁ ଘ୧୦|୭ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୩୦ ରୁ ଘ୧୨|୫୪ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୪୨ ରୁ ଘ୪|୧୮ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 31,
            date: '31/10/2024',
            day: '',
            name: 'ଶ୍ୟାମା (କାଳୀ) ପୂଜା , ଯମତର୍ପଣ',
            Image: require('../../assets/Images/Konark.png'),
            tithi: '(୩୧) ଅକ୍ଟୋବର , ଗୁରୁବାର (କାର୍ତ୍ତିକ) ତୁଳା ଦି୧୫ନ , ରବିଅଲସସାନୀ ତା୨୭ରିଖ , ସାୟନ କାର୍ତ୍ତିକ ଦି୯ନ',
            sunrise: 'ଘ୫|୫୧|୧୪',
            sunset: 'ଘ୫|୯|୨୮',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୨୯ ମଧ୍ୟେ , ଘ୧|୫୪ ରୁ ଘ୩|୩୦ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୫|୫୫ ରୁ ରାତ୍ରି ଘ୯|୭ ମଧ୍ୟେ , ଘ୧୧|୩୧ ରୁ ଘ୨|୪୩ ମଧ୍ୟେ , ଘ୩|୩୧ ରୁ ନିଶାନ୍ତ ଘ୫|୭ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୨|୨୦ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୯ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୩୦ ରୁ ଘ୧|୬ ପର୍ଯ୍ୟନ୍ତ |',
        },
    ]

    const eventsForEnglishMonth = [

    ]

    const CUSTOMOdia_DATE = [
        { id: 1, showDate: '୨୯', disable: 'yes', date: '29/09/2024', spclEvent: 'no' },
        { id: 2, showDate: '୩୦', disable: 'yes', date: '30/09/2024', spclEvent: 'no' },
        { id: 3, showDate: '୧', disable: 'no', date: '01/10/2024', spclEvent: 'no' },
        { id: 4, showDate: '୨', disable: 'no', date: '02/10/2024', spclEvent: 'yes' },
        { id: 5, showDate: '୩', disable: 'no', date: '03/10/2024', spclEvent: 'yes' },
        { id: 6, showDate: '୪', disable: 'no', date: '04/10/2024', spclEvent: 'yes' },
        { id: 7, showDate: '୫', disable: 'no', date: '05/10/2024', spclEvent: 'no' },
        { id: 8, showDate: '୬', disable: 'no', date: '06/10/2024', spclEvent: 'no' },
        { id: 9, showDate: '୭', disable: 'no', date: '07/10/2024', spclEvent: 'yes' },
        { id: 10, showDate: '୮', disable: 'no', date: '08/10/2024', spclEvent: 'no' },
        { id: 11, showDate: '୯', disable: 'no', date: '09/10/2024', spclEvent: 'yes' },
        { id: 12, showDate: '୧୦', disable: 'no', date: '10/10/2024', spclEvent: 'yes' },
        { id: 13, showDate: '୧୧', disable: 'no', date: '11/10/2024', spclEvent: 'yes' },
        { id: 14, showDate: '୧୨', disable: 'no', date: '12/10/2024', spclEvent: 'yes' },
        { id: 15, showDate: '୧୩', disable: 'no', date: '13/10/2024', spclEvent: 'yes' },
        { id: 16, showDate: '୧୪', disable: 'no', date: '14/10/2024', spclEvent: 'yes' },
        { id: 17, showDate: '୧୫', disable: 'no', date: '15/10/2024', spclEvent: 'yes' },
        { id: 18, showDate: '୧୬', disable: 'no', date: '16/10/2024', spclEvent: 'yes' },
        { id: 19, showDate: '୧୭', disable: 'no', date: '17/10/2024', spclEvent: 'yes' },
        { id: 20, showDate: '୧୮', disable: 'no', date: '18/10/2024', spclEvent: 'no' },
        { id: 21, showDate: '୧୯', disable: 'no', date: '19/10/2024', spclEvent: 'no' },
        { id: 22, showDate: '୨୦', disable: 'no', date: '20/10/2024', spclEvent: 'no' },
        { id: 23, showDate: '୨୧', disable: 'no', date: '21/10/2024', spclEvent: 'no' },
        { id: 24, showDate: '୨୨', disable: 'no', date: '22/10/2024', spclEvent: 'no' },
        { id: 25, showDate: '୨୩', disable: 'no', date: '23/10/2024', spclEvent: 'no' },
        { id: 26, showDate: '୨୪', disable: 'no', date: '24/10/2024', spclEvent: 'yes' },
        { id: 27, showDate: '୨୫', disable: 'no', date: '25/10/2024', spclEvent: 'yes' },
        { id: 28, showDate: '୨୬', disable: 'no', date: '26/10/2024', spclEvent: 'no' },
        { id: 29, showDate: '୨୭', disable: 'no', date: '27/10/2024', spclEvent: 'no' },
        { id: 30, showDate: '୨୮', disable: 'no', date: '28/10/2024', spclEvent: 'yes' },
        { id: 31, showDate: '୨୯', disable: 'no', date: '29/10/2024', spclEvent: 'yes' },
        { id: 32, showDate: '୩୦', disable: 'no', date: '30/10/2024', spclEvent: 'yes' },
        { id: 33, showDate: '୩୧', disable: 'no', date: '31/10/2024', spclEvent: 'yes' },
        { id: 34, showDate: '୧', disable: 'yes', date: '01/11/2024', spclEvent: 'no' },
        { id: 35, showDate: '୨', disable: 'yes', date: '02/11/2024', spclEvent: 'no' },
    ];

    const CUSTOMEnglish_DATE = [
        { id: 1, showDate: '29', disable: 'yes', date: '29/09/2024', spclEvent: 'no' },
        { id: 2, showDate: '30', disable: 'yes', date: '30/09/2024', spclEvent: 'no' },
        { id: 3, showDate: '1', disable: 'no', date: '01/10/2024', spclEvent: 'no' },
        { id: 4, showDate: '2', disable: 'no', date: '02/10/2024', spclEvent: 'yes' },
        { id: 5, showDate: '3', disable: 'no', date: '03/10/2024', spclEvent: 'yes' },
        { id: 6, showDate: '4', disable: 'no', date: '04/10/2024', spclEvent: 'yes' },
        { id: 7, showDate: '5', disable: 'no', date: '05/10/2024', spclEvent: 'no' },
        { id: 8, showDate: '6', disable: 'no', date: '06/10/2024', spclEvent: 'no' },
        { id: 9, showDate: '7', disable: 'no', date: '07/10/2024', spclEvent: 'yes' },
        { id: 10, showDate: '8', disable: 'no', date: '08/10/2024', spclEvent: 'no' },
        { id: 11, showDate: '9', disable: 'no', date: '09/10/2024', spclEvent: 'yes' },
        { id: 12, showDate: '10', disable: 'no', date: '10/10/2024', spclEvent: 'yes' },
        { id: 13, showDate: '11', disable: 'no', date: '11/10/2024', spclEvent: 'yes' },
        { id: 14, showDate: '12', disable: 'no', date: '12/10/2024', spclEvent: 'yes' },
        { id: 15, showDate: '13', disable: 'no', date: '13/10/2024', spclEvent: 'yes' },
        { id: 16, showDate: '14', disable: 'no', date: '14/10/2024', spclEvent: 'yes' },
        { id: 17, showDate: '15', disable: 'no', date: '15/10/2024', spclEvent: 'yes' },
        { id: 18, showDate: '16', disable: 'no', date: '16/10/2024', spclEvent: 'yes' },
        { id: 19, showDate: '17', disable: 'no', date: '17/10/2024', spclEvent: 'yes' },
        { id: 20, showDate: '18', disable: 'no', date: '18/10/2024', spclEvent: 'no' },
        { id: 21, showDate: '19', disable: 'no', date: '19/10/2024', spclEvent: 'no' },
        { id: 22, showDate: '20', disable: 'no', date: '20/10/2024', spclEvent: 'no' },
        { id: 23, showDate: '21', disable: 'no', date: '21/10/2024', spclEvent: 'no' },
        { id: 24, showDate: '22', disable: 'no', date: '22/10/2024', spclEvent: 'no' },
        { id: 25, showDate: '23', disable: 'no', date: '23/10/2024', spclEvent: 'no' },
        { id: 26, showDate: '24', disable: 'no', date: '24/10/2024', spclEvent: 'yes' },
        { id: 27, showDate: '25', disable: 'no', date: '25/10/2024', spclEvent: 'yes' },
        { id: 28, showDate: '26', disable: 'no', date: '26/10/2024', spclEvent: 'no' },
        { id: 29, showDate: '27', disable: 'no', date: '27/10/2024', spclEvent: 'no' },
        { id: 30, showDate: '28', disable: 'no', date: '28/10/2024', spclEvent: 'yes' },
        { id: 31, showDate: '29', disable: 'no', date: '29/10/2024', spclEvent: 'yes' },
        { id: 32, showDate: '30', disable: 'no', date: '30/10/2024', spclEvent: 'yes' },
        { id: 33, showDate: '31', disable: 'no', date: '31/10/2024', spclEvent: 'yes' },
        { id: 34, showDate: '1', disable: 'yes', date: '01/11/2024', spclEvent: 'no' },
        { id: 35, showDate: '2', disable: 'yes', date: '02/11/2024', spclEvent: 'no' },
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
                            <TouchableOpacity onPress={() => navigation.navigate('September2024')}>
                                <AntDesign name="caretleft" color={'#000'} size={25} />
                            </TouchableOpacity>
                            {selectedLanguage === "Odia" &&
                                <Text style={{ color: '#000', fontSize: 17, fontWeight: '600' }}>ଅକ୍ଟୋବର  ୨୦୨୪</Text>
                            }
                            {selectedLanguage === "English" &&
                                <Text style={{ color: '#000', fontSize: 17, fontWeight: '600' }}>October  2024</Text>
                            }
                            <TouchableOpacity onPress={() => navigation.replace('November2024')}>
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

export default October2024

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