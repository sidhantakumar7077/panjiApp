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

const September2024 = (props) => {

    const eventsForOdiaMonth = [
        {
            id: 1,
            date: '01/09/2024',
            day: 'ରବିବାର',
            name: '',
            Image: require('../../assets/Images/PuriTemple.png'),
            tithi: '(୧) ସେପ୍ଟେମ୍ବର , ରବିବାର (ଭାଦ୍ର) ସିଂହ ଦି୧୭ନ , ସଫର ତା୨୬ରିଖ , ସାୟନ ଭାଦ୍ର ଦି୧୦ନ',
            sunrise: 'ଘ୫|୩୪|୫୭',
            sunset: 'ଘ୫|୫୮|୪୧',
            gdTime: '(ଅମୃତ) ପ୍ରାତଃ ଘ୬|୨୪ ରୁ ଘ୯|୩୬ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୩୦ ରୁ ଘ୯|୩୬ ପର୍ଯ୍ୟନ୍ତ , (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୨୪ ମଧ୍ୟେ , ଘ୧୨|୪୮ ରୁ ଘ୧|୩୬ ମଧ୍ୟେ , ରାତ୍ରି ଘ୬|୪୨ ରୁ ଘ୭|୩୦ ମଧ୍ୟେ , ଘ୧୨|୨୮ ରୁ ଘ୩|୩୦ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୧୨ ରୁ ଘ୧|୧୮ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୧୩ ରୁ ଘ୨|୪୧ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 2,
            date: '02/09/2024',
            day: 'ସୋମବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରକୁ ଶ୍ରୀଜୀଉଙ୍କର ସପ୍ତପୁରୀ ତାଡବିଜେ , ଦର୍ଭସଂଗ୍ରହ , ଭାଦ୍ର ଅମାବାସ୍ୟା , ଗୃହୀଣାଂ ସପ୍ତପୁରୀ ଅମାବାସ୍ୟା , କେତୁଗ୍ରହ ଜୟନ୍ତୀ , ସୋମହତୀ ସ୍ନାନ',
            Image: require('../../assets/Images/PuriBeach.png'),
            tithi: '(୨) ସେପ୍ଟେମ୍ବର , ସୋମବାର (ଭାଦ୍ର) ସିଂହ ଦି୧୮ନ , ସଫର ତା୨୭ରିଖ , ସାୟନ ଭାଦ୍ର ଦି୧୧ନ',
            sunrise: 'ଘ୫|୩୫|୧୦',
            sunset: 'ଘ୫|୫୭|୫୦',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୨ ମଧ୍ୟେ , ଘ୧୦|୨୪ ରୁ ଘ୧୨|୪୮ ମଧ୍ୟେ , ରାତ୍ରି ଘ୬|୪୧ ରୁ ଘ୯|୫ ମଧ୍ୟେ , ଘ୧୧|୨୯ ରୁ ଘ୨|୪୧ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୧୨ ରୁ ଘ୪|୪୮ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ପ୍ରାତଃ ଘ୭|୮ ରୁ ଘ୮|୪୦ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୨|୪୯ ରୁ ଘ୪|୨୨ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୧୭ ରୁ ଘ୧୧|୪୫ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 3,
            date: '03/09/2024',
            day: 'ମଙ୍ଗଳବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରେ ସପ୍ତପୁରୀ ଅମାବାସ୍ୟା , ସପ୍ତପୁରୀ ଭୋଗ , ବସ୍ତ୍ରହରଣ ଲୀଳା , ଶ୍ରୀଜୀଉଙ୍କର ସାଗର ବିଜେ , ଅଗ   ଦାନାରମ୍ଭ , ଆଖିରଚାରସମ୍ବା',
            Image: require('../../assets/Images/Mahaprasad.png'),
            tithi: '(୩) ସେପ୍ଟେମ୍ବର , ମଙ୍ଗଳବାର (ଭାଦ୍ର) ସିଂହ ଦି୧୯ନ , ସଫର ତା୨୮ରିଖ , ସାୟନ ଭାଦ୍ର ଦି୧୨ନ',
            sunrise: 'ଘ୫|୩୫|୨୩',
            sunset: 'ଘ୫|୫୬|୫୯',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୮|୦ ରୁ ଘ୧୦|୨୪ ମଧ୍ୟେ , ଘ୧୨|୪୮ ରୁ ଘ୨|୨୪ ମଧ୍ୟେ , ଘ୩|୨୧ ରୁ ଘ୪|୪୮ ମଧ୍ୟେ , ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୬|୪୧ ମଧ୍ୟେ , ଘ୯|୪ ରୁ ଘ୧୨|୨୮ ମଧ୍ୟେ , ଘ୧|୫୨ ରୁ ଘ୩|୨୮ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୧୫ ରୁ ଘ୨|୪୭ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୭|୮ ରୁ ଘ୮|୩୯ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୧୮ ରୁ ଘ୮|୪୭ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 4,
            date: '04/09/2024',
            day: 'ବୁଧବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ ଶ୍ରୀଜୀଉଙ୍କର ଦାବାଗ୍ନିଲୀଳା , ଦ୍ୱିତୀୟା ଚନ୍ଦ୍ର ଦର୍ଶନ',
            Image: require('../../assets/Images/LaxmiPuja.png'),
            tithi: '(୪) ସେପ୍ଟେମ୍ବର , ବୁଧବାର (ଭାଦ୍ର) ସିଂହ ଦି୨୦ନ , ସଫର ତା୨୯ରିଖ , ସାୟନ ଭାଦ୍ର ଦି୧୩ନ',
            sunrise: 'ଘ୫|୩୫|୩୬',
            sunset: 'ଘ୫|୫୬|୮',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୨ ମଧ୍ୟେ , ଘ୧୨|୨ ରୁ ଘ୧|୩୬ ମଧ୍ୟେ , ରାତ୍ରି ଘ୬|୩୯ ରୁ ଘ୯|୩ ମଧ୍ୟେ , ଘ୧|୫୧ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୩୬ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୪|୦ ରୁ ଘ୫|୩୬ ମଧ୍ୟେ , ରାତ୍ରି ଘ୯|୩୩ ରୁ ଘ୧୦|୩୯ ପର୍ଯ୍ୟନ୍ତ  |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୪୦ ରୁ ଘ୧୦|୧୨ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୪୪ ରୁ ଘ୧|୧୬ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୪୦ ରୁ ଘ୪|୮ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 5,
            date: '05/09/2024',
            day: 'ଗୁରୁବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ ନିକୁଞ୍ଜଲୀଳା , ଗୁରୁଦିବସ',
            Image: require('../../assets/Images/Konark.png'),
            tithi: '(୫) ସେପ୍ଟେମ୍ବର , ଗୁରୁବାର (ଭାଦ୍ର) ସିଂହ ଦି୨୧ନ , ରବିଅଲ୍ଅଓଲ୍ ତା୧ରିଖ , ସାୟନ ଭାଦ୍ର ଦି୧୪ନ',
            sunrise: 'ଘ୫|୩୫|୪୮',
            sunset: 'ଘ୫|୫୫|୧୬',
            gdTime: '(ଅମୃତ) ରାତ୍ରି ଘ୧|୨ ରୁ ଘ୩|୨୬ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୩ ମଧ୍ୟେ , ଘ୧୦|୨୫ ରୁ ଘ୧୨|୪୯ ମଧ୍ୟେ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୨|୪୯ ରୁ ଘ୫|୫୫ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୪୨ ରୁ ଘ୧|୧୧ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 6,
            date: '06/09/2024',
            day: 'ଶୁକ୍ରବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରେ ଅନ୍ଧ ପ୍ରସ୍ତାବ , ବାଲି ତୃତୀୟା , ଗୌରୀ ବ୍ରତ , ହରିତାଳିକା ଚତୁର୍ଥୀ',
            Image: require('../../assets/Images/KhajaBhoga.png'),
            tithi: '(୬) ସେପ୍ଟେମ୍ବର , ଶୁକ୍ରବାର (ଭାଦ୍ର) ସିଂହ ଦି୨୨ନ , ରବିଅଲ୍ଅଓଲ୍ ତା୨ରିଖ , ସାୟନ ଭାଦ୍ର ଦି୧୫ନ ',
            sunrise: 'ଘ୫|୩୬|୧',
            sunset: 'ଘ୫|୫୪|୨୩',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୩ ମଧ୍ୟେ , ଘ୮|୧ ରୁ ଘ୧୦|୨୫ ମଧ୍ୟେ , ଘ୧୨|୪୯ ରୁ ଘ୨|୨୫ ମଧ୍ୟେ , ଘ୪|୧ ରୁ ଘ୫|୩୭ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୨୫ ରୁ ଘ୯|୧ ମଧ୍ୟେ , ଘ୩|୨୫ ରୁ ଘ୪|୧୩ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୧୦|୩୭ ରୁ ଘ୧୧|୨୫ ମଧ୍ୟେ , ଘ୪|୧୩ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୩୬ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୮|୩୯ ରୁ ଘ୧୧|୪୨ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୪୫ ରୁ ଘ୧୦|୧୩ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 7,
            date: '07/09/2024',
            day: 'ଶନିବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରେ ଓ ସର୍ବତ୍ର ଗଣେଶ ଚତୁର୍ଥୀ (ବିନାୟକ ବ୍ରତ)',
            Image: require('../../assets/Images/rathaImg.jpeg'),
            tithi: '(୭) ସେପ୍ଟେମ୍ବର , ଶନିବାର (ଭାଦ୍ର) ସିଂହ ଦି୨୩ନ , ରବିଅଲ୍ଅଓଲ୍ ତା୩ରିଖ , ସାୟନ ଭାଦ୍ର ଦି୧୬ନ',
            sunrise: 'ଘ୫|୩୬|୧୪',
            sunset: 'ଘ୫|୫୩|୩୦',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୯|୩୭ ରୁ ଘ୧୨|୪୯ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୧୩ ରୁ ଘ୧୦|୩୭ ମଧ୍ୟେ , ଘ୧୨|୧୩ ରୁ ଘ୧|୪୯ ମଧ୍ୟେ , ଘ୨|୩୨ ରୁ ଘ୪|୧୩ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ପ୍ରାତଃ ଘ୫|୩୬ ରୁ ଘ୭|୮ ମଧ୍ୟେ , ଦିବା ଘ୪|୨୨ ରୁ ଘ୫|୫୪ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧|୩୪ ରୁ ଘ୨|୪୨ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ଅସ୍ତ ଘ୫|୫୪ ରୁ ଘ୭|୧୮ ମଧ୍ୟେ , ରାତ୍ରି ଘ୪|୯ ରୁ ନିଶାନ୍ତ ଘ୫|୩୬ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 8,
            date: '08/09/2024',
            day: 'ରବିବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ ଶ୍ରୀଜିଉଙ୍କର ଋଷି ପଞ୍ଚମୀ , ଦାହଲୀଳା , ଋଷି ପଞ୍ଚମୀ ବ୍ରତ , ନୂଆଖାଇ ପର୍ବ (ନବାନ୍ନ ଉତ୍ସବ)',
            Image: require('../../assets/Images/3rathas.jpg'),
            tithi: '(୮) ସେପ୍ଟେମ୍ବର , ରବିବାର (ଭାଦ୍ର) ସିଂହ ଦି୨୪ନ , ରବିଅଲ୍ଅଓଲ୍ ତା୪ରିଖ , ସାୟନ ଭାଦ୍ର ଦି୧୭ନ',
            sunrise: 'ଘ୫|୩୬|୨୫',
            sunset: 'ଘ୫|୫୨|୩୭',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୬|୨୫ ରୁ ଘ୯|୩୭ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୨୪ ରୁ ଘ୯|୦ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୨୫ ମଧ୍ୟେ , ଘ୧୨|୪୯ ରୁ ଘ୧|୩୭ ମଧ୍ୟେ , ରାତ୍ରି ଘ୬|୩୬ ରୁ ଘ୭|୨୪ ମଧ୍ୟେ , ଘ୧୨|୧୨ ରୁ ଘ୩|୨୪ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୧୦ ରୁ ଘ୧|୧୨ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୧୦ ରୁ ଘ୨|୩୯ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 9,
            date: '09/09/2024',
            day: 'ସୋମବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ ବିମ୍ବାସୁର ବଧ ପ୍ରସ୍ତାବ, ଷଷ୍ଠୀ ଓଷା , ସୋମନାଥ ବ୍ରତାରମ୍ଭ',
            Image: require('../../assets/Images/PuriTemple.png'),
            tithi: '(୯) ସେପ୍ଟେମ୍ବର , ସୋମବାର (ଭାଦ୍ର) ସିଂହ ଦି୧୬ନ , ରବିଅଲ୍ଅଓଲ୍ ତା୫ରିଖ , ସାୟନ ଭାଦ୍ର ଦି୧୮ନ',
            sunrise: 'ଘ୫|୩୪|୪୭',
            sunset: 'ଘ୫|୫୯|୩୨',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୩ ମଧ୍ୟେ , ଘ୧୦|୨୫ ରୁ ଘ୧୨|୪୯ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୩୫ ରୁ ଘ୮|୫୯ ମଧ୍ୟେ , ଘ୧୨|୨୩ ରୁ ଘ୨|୩୫ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୧୩ ରୁ ଘ୪|୪୯ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୯ ରୁ ଘ୮|୪୦ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୨|୪୫ ରୁ ଘ୪|୧୬ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୧୪ ରୁ ଘ୧୧|୪୩ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 10,
            date: '10/09/2024',
            day: 'ମଙ୍ଗଳବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ କେକେଶି ବଧ ପ୍ରସ୍ତାବ , ଲଳିତା ସପ୍ତମୀ , କୁକ୍କୁଟୀ ବ୍ରତ',
            Image: require('../../assets/Images/PuriBeach.png'),
            tithi: '(୧୦) ସେପ୍ଟେମ୍ବର , ମଙ୍ଗଳବାର (ଭାଦ୍ର) ସିଂହ ଦି୨୬ନ , ରବିଅଲ୍ଅଓଲ୍ ତା୨୫ରିଖ , ସାୟନ ଭାଦ୍ର ଦି୧୯ନ',
            sunrise: 'ଘ୫|୩୬|୫୦',
            sunset: 'ଘ୫|୫୦|୫୦',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୮|୨ ରୁ ଘ୧୦|୨୬ ମଧ୍ୟେ , ଘ୧୨|୫୦ ରୁ ଘ୨|୨୬ ମଧ୍ୟେ , ଘ୩|୧୪ ରୁ ଘ୪|୫୦ ପର୍ଯ୍ୟନ୍ତ , ସୂର୍ଯ୍ୟାସ୍ତରୁ ସନ୍ଧ୍ୟା ଘ୬|୩୬ ମଧ୍ୟେ , ଘ୮|୫୮ ରୁ ଘ୧୧|୨୨ ମଧ୍ୟେ , ଘ୧|୪୬ ରୁ ଘ୩|୨୨ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୮ ରୁ ଘ୨|୩୮ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୭|୯ ରୁ ଘ୮|୩୯ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୮ ରୁ ଘ୮|୩୮ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 11,
            date: '11/09/2024',
            day: 'ବୁଧବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ ଓ ସର୍ବସମ୍ମତ ରାଧାଷ୍ଟମୀ ବ୍ରତ ଓ ଉପବାସ , ଦୁର୍ବାଷ୍ଟମୀ ,ଶ୍ରୀଦୁର୍ଗା ଦେବୀଙ୍କର ଶୟନତ୍ସବ , ଶ୍ରୀସୁଦର୍ଶନ ଦେବଙ୍କର ଆଶ୍ରମ ବିଜେ , ବୁଧାଷ୍ଟମୀ ସ୍ନାନ , ଅତିବଡି ଜଗନ୍ନାଥ ଦାସଙ୍କ ଜନ୍ମ ଉତ୍ସବ',
            Image: require('../../assets/Images/Mahaprasad.png'),
            tithi: '(୧୧) ସେପ୍ଟେମ୍ବର , ବୁଧବାର (ଭାଦ୍ର) ସିଂହ ଦି୨୭ନ , ରବିଅଲ୍ଅଓଲ୍ ତା୭ରିଖ , ସାୟନ ଭାଦ୍ର ଦି୨୦ନ',
            sunrise: 'ଘ୫|୩୭|୨',
            sunset: 'ଘ୫|୪୯|୫୬',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୩ ମଧ୍ୟେ , ଘ୧୨|୨ ରୁ ଘ୧|୩୬ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୪୦ ରୁ ଘ୯|୪ ମଧ୍ୟେ , ଘ୧|୫୧ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୩୭ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୪|୨ ରୁ ଘ୫|୫୦ ମଧ୍ୟେ , ରାତ୍ରି ଘ୯|୪ ରୁ ଘ୧୦|୪୦ ମଧ୍ୟେ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୪୦ ରୁ ଘ୧୦|୧୧ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୪୨ ରୁ ଘ୧|୧୩ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୪୦ ରୁ ଘ୪|୯ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 12,
            date: '12/09/2024',
            day: 'ଗୁରୁବାର',
            name: 'ତାଳନବମୀ',
            Image: require('../../assets/Images/LaxmiPuja.png'),
            tithi: '(୧୨) ସେପ୍ଟେମ୍ବର , ଗୁରୁବାର (ଭାଦ୍ର) ସିଂହ ଦି୨୮ନ , ରବିଅଲ୍ଅଓଲ୍ ତା୮ରିଖ , ସାୟନ ଭାଦ୍ର ଦି୨୧ନ',
            sunrise: 'ଘ୫|୩୭|୧୪',
            sunset: 'ଘ୫|୪୯|୨',
            gdTime: '(ଅମୃତ) ରାତ୍ରି ଘ୧|୩ ରୁ ଘ୩|୨୬ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୪ ମଧ୍ୟେ , ଘ୧୦|୨୬ ରୁ ଘ୧୨|୫୦ ମଧ୍ୟେ |',
            bdTime: '(ବାର ଓ କାଳବେଳା)ଦିବା ଘ୨|୪୩ ରୁ ଘ୫|୪୯ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୪୦ ରୁ ଘ୧|୧୦ ମଧ୍ୟେ |',
        },
        {
            id: 13,
            date: '13/09/2024',
            day: 'ଶୁକ୍ରବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ କୃଷ୍ଣଲୀଳା , କଂସବଧ ପ୍ରସ୍ତାବ , ଶ୍ରୀଜୀଉଙ୍କର ଲବଣଖିଆଠାରେ ମଥୁରାହାଟ ଜୁର , ଶରଣ ଆରମ୍ଭ',
            Image: require('../../assets/Images/Konark.png'),
            tithi: '(୧୩) ସେପ୍ଟେମ୍ବର , ଶୁକ୍ରବାର (ଭାଦ୍ର) ସିଂହ ଦି୨୯ନ , ରବିଅଲ୍ଅଓଲ୍ ତା୯ରିଖ , ସାୟନ ଭାଦ୍ର ଦି୨୨ନ',
            sunrise: 'ଘ୫|୩୭|୨୭',
            sunset: 'ଘ୫|୪୮|୭',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଘ୭|୧୪ ମଧ୍ୟେ , ଘ୮|୨ ରୁ ଘ୧୦|୨୬ ମଧ୍ୟେ , ଘ୧୨|୫୦ ରୁ ଘ୨|୨୬ ମଧ୍ୟେ , ଘ୪|୧୧ ରୁ ଘ୫|୪୭ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୨୨ ରୁ ଘ୮|୫୮ ମଧ୍ୟେ , ଘ୩|୨୨ ରୁ ଘ୪|୧୦ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୧୦|୩୪ ରୁ ଘ୧୧|୨୨ ମଧ୍ୟେ , ଘ୪|୧୦ ରୁ ରାତ୍ରିଶେଷ ଘ|୫|୩୮ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୮|୯ ରୁ ଘ୧୦|୪୦ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୪୧ ରୁ ଘ୧୦|୧୦ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 14,
            date: '14/09/2024',
            day: 'ଶନିବାର',
            name: 'ଶ୍ରୀମଦିରରେ ଓ ସ୍ମାର୍ତ୍ତସମ୍ମତ ଶ୍ରୀବିଷ୍ଣୁ ପାର୍ଶ୍ୱପରିବର୍ତ୍ତନ (ବଡ) ଏକାଦଶୀ',
            Image: require('../../assets/Images/KhajaBhoga.png'),
            tithi: '(୧୪) ସେପ୍ଟେମ୍ବର , ଶନିବାର (ଭାଦ୍ର) ସିଂହ ଦି୩୦ନ , ରବିଅଲ୍ଅଓଲ୍ ତା୧୦ରିଖ , ସାୟନ ଭାଦ୍ର ଦି୨୩ନ',
            sunrise: 'ଘ୫|୩୪|୪୭',
            sunset: 'ଘ୫|୫୯|୩୨',
            gdTime: '(ଅମୃତ) ଘ୭|୧୫ ରୁ ଘ୯|୩୯ ମଧ୍ୟେ , ଘ୧୨|୩ ରୁ ଘ୩|୧୫ ମଧ୍ୟେ , ଘ୪|୧୧ ରୁ ଘ୫|୪୭ ମଧ୍ୟେ , ରାତ୍ରି ଘ୧୨|୫୪ ରୁ ଘ୨|୩୦ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୨|୩୦ ରୁ ଘ୩|୧୮ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ପ୍ରାତଃ ଘ୫|୩୮ ରୁ ଘ୭|୯ ମଧ୍ୟେ , ଦିବା ଘ୪|୧୫ ରୁ ଘ୫|୪୭ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୦|୦ ରୁ ଘ୨|୪୨ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୪୭ ରୁ ଘ୭|୧୩ ମଧ୍ୟେ , ରାତ୍ରି ଘ୪|୯ ରୁ ନିଶାନ୍ତ ଘ୫|୩୮ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 15,
            date: '15/09/2024',
            day: 'ରବିବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ ଓ ସର୍ବସମ୍ମତ ବାମନ ଜନ୍ମ , ସୁନିଆଁ ୬୮ ଅଙ୍କ ସନ ୧୪୩୨ ସାଲ ଆରମ୍ଭ , ଗରୁଡ ପାର୍ଶ୍ୱପରିବର୍ତ୍ତନ , ବୈଷ୍ଣବସମ୍ମତ ଏକାଦଶୀ , ବିଜୟା ମହାଦ୍ଵାଦଶୀ, ଶକ୍ରୋତ୍ଥାପନ ଇନ୍ଦ୍ରଧ୍ଵଜ ପୂଜା, ପୂଜାପଣ୍ଡା ନିଯୋଗ ପକ୍ଷରୁ ସୁନିଆଁ ଭୋଗ, ମହତୀ ସ୍ନାନ, ମାସାନ୍ତ',
            Image: require('../../assets/Images/rathaImg.jpeg'),
            tithi: '(୧୫) ସେପ୍ଟେମ୍ବର , ରବିବାର(ଭାଦ୍ର)ସିଂହ ଦି୩୧ନ ,ରବିଅଲ୍ଅଓଲ୍ ତା୧୧ରିଖ , ସାୟନ ଭାଦ୍ର ଦି୨୪ନ',
            sunrise: 'ଘ୫|୩୭|୫୦',
            sunset: 'ଘ୫|୪୬|୧୮',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୬|୨୬ ରୁ ଘ୯|୩୮ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୨୨ ରୁ ଘ୮|୫୮ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ପ୍ରାତଃ ଘ୬|୨୬ ମଧ୍ୟେ , ଦିବା ଘ୧୨|୫୦ ରୁ ଘ୧|୩୮ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୩୪ ରୁ ରାତ୍ରି ଘ୭|୨୨ ମଧ୍ୟେ , ଘ୧୨|୧୦ ରୁ ଘ୩|୨୨ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୯ ରୁ ଘ୧|୧୯ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୯ ରୁ ଘ୨|୩୯ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 16,
            date: '16/09/2024',
            day: 'ସୋମବାର',
            name: 'ବିଶ୍ଵକର୍ମା ପୂଜା, କନ୍ୟା ସଂକ୍ରାନ୍ତି, ଶ୍ରୀମନ୍ଦିରେ ଶ୍ରୀଜଗନ୍ନାଥ ଦେବଙ୍କର ବଳିବାମନ ବେଶ , ଅଘୋର ଚତୁର୍ଦଶୀ, ଶ୍ରୀ ଶିବ ପାର୍ଶ୍ୱପରିବର୍ତ୍ତନୋତ୍ସବ, ଶ୍ରୀ ଦୁର୍ଗା ପାର୍ଶ୍ୱପରିବର୍ତ୍ତନ',
            Image: require('../../assets/Images/3rathas.jpg'),
            tithi: '(୧୬) ସେପ୍ଟମ୍ବର , ସୋମବାର (ଆଶ୍ଵିନ) କନ୍ୟା ଦି୧ନ ,ରବିଅଲ୍ଅଓଲ୍ ତା୧୨ରିଖ , ସାୟନ ଭାଦ୍ର ଦି୨୫ନ ',
            sunrise: 'ଘ୫|୩୮|୩',
            sunset: 'ଘ୫|୪୫|୨୩',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୫ ମଧ୍ୟେ , ଘ୮|୫୧ ରୁ ଘ୧୧|୧୫ ମଧ୍ୟେ , ରାତ୍ରି  ଘ୮|୪ ରୁ ଘ୧୧|୧୬ ମଧ୍ୟେ , ଘ୨|୨୮ ରୁ ଘ୩|୧୬ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୯ ରୁ ଘ୮|୦ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୨|୪୧ ରୁ ଘ୪|୧୧ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୧୦ ରୁ ଘ୧୧|୪୦ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 17,
            date: '17/09/2024',
            day: 'ମଙ୍ଗଳବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରେ ଓ ସର୍ବତ୍ର ଅନନ୍ତବ୍ରତ, ଇନ୍ଦ୍ରୋତ୍ସବ, ମଙ୍ଗଳ ଚତୁର୍ଦ୍ଦଶୀ ସ୍ନାନ',
            Image: require('../../assets/Images/PuriTemple.png'),
            tithi: '(୧୭) ସେପ୍ଟେମ୍ବର , ମଙ୍ଗଳବାର (ଆଶ୍ଵିନ) କନ୍ୟା ଦି୨ନ , ରବିଅଲ୍ଅଓଲ୍ ତା୧୩ରିଖ , ସାୟନ ଭାଦ୍ର ଦି୨୬ନ',
            sunrise: 'ଘ୫|୩୮|୧୫',
            sunset: 'ଘ୫|୪୪|୨୯',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୨୭ ମଧ୍ୟେ ,ଘ୭|୧୫ ରୁ ଘ୧୧|୧୫ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୪ ରୁ ଘ୮|୫୨ ମଧ୍ୟେ , ଘ୯|୪୦ ରୁ ଘ୧୨|୪ ମଧ୍ୟେ , ଘ୧|୪୦ ରୁ ଘ୩|୧୬ ମଧ୍ୟେ , ଘ୪|୫୨ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୩୮ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୮|୫ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୮ ରୁ ଘ୨|୩୮ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୭|୯ ରୁ ଘ୮|୩୯ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୧୦ ରୁ ଘ୮|୪୦ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 18,
            date: '18/09/2024',
            day: 'ବୁଧବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରେ ଇନ୍ଦ୍ରଗୋବିନ୍ଦ ବନ୍ଦାପନା, ଇନ୍ଦ୍ରହାତୀ ପ୍ରସ୍ତାବ, ଭାଗବତ ଜନ୍ମ, ଶରଣ ଶେଷ , ଜହ୍ନି ଓଷା ଆରମ୍ଭ, ଅପରପକ୍ଷ ପିତୃତର୍ପଣ ଓ ମହାଳୟା ଶ୍ରାଦ୍ଧ ଆରମ୍ଭ',
            Image: require('../../assets/Images/PuriBeach.png'),
            tithi: '(୧୮) ସେପ୍ଟେମ୍ବର , ବୁଧବାର (ଆଶ୍ଵିନ) କନ୍ୟା ଦି୩ନ , ରବିଅଲ୍ଅଓଲ୍ ତା୧୩ରିଖ , ସାୟନ ଭାଦ୍ର ଦି୨୭ନ',
            sunrise: 'ଘ୫|୩୮|୨୬',
            sunset: 'ଘ୫|୪୩|୩୪',
            gdTime: '(ଅମୃତ) ପ୍ରାତଃ ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୨୭ ମଧ୍ୟେ , ଘ୭|୧୫ ରୁ ଘ୮|୩ ମଧ୍ୟେ , ଘ୧୦|୨୭ ରୁ ଘ୧୨|୫୧ ମଧ୍ୟେ , ରାତ୍ରି ଘ୬|୨୭ ରୁ ଘ୭|୧୫ ମଧ୍ୟେ , ଘ୮|୫୧ ରୁ ଘ୩|୧୫ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୬|୨୭ ରୁ ଘ୭|୧୫ ମଧ୍ୟେ , ଘ୧|୩୯ ରୁ ଘ୪|୩ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୩୯ ରୁ ଘ୧୦|୯ ମଧ୍ୟେ  | (ବାରବେଳା) ଦିବା ଘ୧୧|୩୯ ରୁ ଘ୧|୯ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୩୯ ରୁ ଘ୪|୯ ମଧ୍ୟେ |',
        },
        {
            id: 19,
            date: '19/09/2024',
            day: 'ଗୁରୁବାର',
            name: '',
            Image: require('../../assets/Images/Mahaprasad.png'),
            tithi: '(୧୯) ସେପ୍ଟେମ୍ବର , ଗୁରୁବାର (ଆଶ୍ଵିନ) କନ୍ୟା ଦି୪ନ , ରବିଅଲ୍ଅଓଲ୍ ତା୧୫ରିଖ , ସାୟନ ଭାଦ୍ର ଦି୨୮ନ',
            sunrise: 'ଘ୫|୩୮|୩୯',
            sunset: 'ଘ୫|୪୨|୩୯',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୫ ମଧ୍ୟେ , ଘ୧|୩୯ ରୁ ଘ୩|୧୫ ମଧ୍ୟେ , ରାତ୍ରି ଘ୬|୨୬ ରୁ ଘ୯|୩୮ ମଧ୍ୟେ , ଘ୧୨|୨ ରୁ ଘ୩|୧୪ ମଧ୍ୟେ , ଘ୪|୨ ନିଶାନ୍ତ ଘ୫|୩୯ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୨|୪୯ ରୁ ଘ୫|୪୩ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୩୭ ରୁ ଘ୧|୮ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 20,
            date: '20/09/2024',
            day: 'ଶୁକ୍ରବାର',
            name: '',
            Image: require('../../assets/Images/LaxmiPuja.png'),
            tithi: '(୨୦) ସେପ୍ଟେମ୍ବର , ଶୁକ୍ରବାର (ଆଶ୍ଵିନ) କନ୍ୟା ଦି୫ନ , ରବିଅଲ୍ଅଓଲ୍ ତା୧୬ରିଖ , ସାୟନ ଭାଦ୍ର ଦି୨୯ନ',
            sunrise: 'ଘ୫|୩୮|୫୨',
            sunset: 'ଘ୫|୪୧|୪୪',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୨୮ ମଧ୍ୟେ , ଦିବା ଘ୭|୧୬ ରୁ ଘ୯|୪୦ ମଧ୍ୟେ, ଘ୧୨|୪ ରୁ ଘ୩|୧୬ ମଧ୍ୟେ , ଘ୪|୬ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୪୨ ପର୍ଯ୍ୟନ୍ତ , ରାତ୍ରି ଘ୬|୨୬ ରୁ ଘ୯|୩୮ ମଧ୍ୟେ , ଘ୧୨|୨ ରୁ ଘ୩|୧୪ ମଧ୍ୟେ , ଘ୪|୨ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୩୯ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୮|୩୮ ରୁ ଘ୧୨|୩୭ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୩୮ ରୁ ଘ୧୦|୮ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 21,
            date: '21/09/2024',
            day: 'ଶନିବାର',
            name: 'ଅଶ୍ଵପଞ୍ଚମୀ',
            Image: require('../../assets/Images/Konark.png'),
            tithi: '(୨୧) ସେପ୍ଟେମ୍ବର , ଶନିବାର (ଆଶ୍ଵିନ) କନ୍ୟା ଦି୬ନ , ରବିଅଲ୍ଅଓଲ୍ ତା୧୭ରିଖ , ସାୟନ ଭାଦ୍ର ଦି୩୦ନ',
            sunrise: 'ଘ୫|୩୯|୪',
            sunset: 'ଘ୫|୪୦|୫୦',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୨୮ ମଧ୍ୟେ , ଦିବା ଘ୭|୧୬ ରୁ ଘ୯|୪୦ ମଧ୍ୟେ , ଘ୧୨|୪ ରୁ ଘ୩|୧୬ ମଧ୍ୟେ , ଘ୪|୬ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୪୧ ପର୍ଯ୍ୟନ୍ତ , ରାତ୍ରି ଘ୧୨|୪୮ ରୁ ଘ୨|୨୪ ମଧ୍ୟେ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୨|୨୪ ରୁ ଘ୩|୧୨ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ପ୍ରାତଃରୁ ଦିବା ଘ୭|୯ ମଧ୍ୟେ , ଘ୪|୭ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୪୧ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧|୬ ରୁ ଘ୨|୩୬ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୭|୭ ମଧ୍ୟେ , ଘ୪|୯ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୩୯ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 22,
            date: '22/09/2024',
            day: 'ରବିବାର',
            name: 'ଗଜଷଷ୍ଠୀ',
            Image: require('../../assets/Images/KhajaBhoga.png'),
            tithi: '(୨୨) ସେପ୍ଟେମ୍ବର , ରବିବାର (ଆଶ୍ଵିନ) କନ୍ୟା ଦି୭ନ , ରବିଅଲ୍ଅଓଲ୍ ତା୧୮ରିଖ , ସାୟନ ଭାଦ୍ର ଦି୩୧ନ',
            sunrise: 'ଘ୫|୩୯|୧୭',
            sunset: 'ଘ୫|୩୯|୫୫',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୬|୨୮ ରୁ ଘ୮|୫୨ ମଧ୍ୟେ , ଘ୧୨|୪୦ ରୁ ଘ୩|୧୬ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୫୯ ରୁ ଘ୯|୩୫ ମଧ୍ୟେ , ଘ୧୧|୫୯ ରୁ ଘ୧|୩୫ ମଧ୍ୟେ , ଘ୨|୨୬ ରୁ ନିଶାନ୍ତ ଘ୫|୩୯ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୪|୪ ରୁ ଘ୪|୫୨ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୪ ରୁ ଘ୧|୬ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୮ ରୁ ଘ୨|୩୮ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 23,
            date: '23/09/2024',
            day: 'ସୋମବାର',
            name: 'ସମଦିବାରାତ୍ରି',
            Image: require('../../assets/Images/rathaImg.jpeg'),
            tithi: '(୨୩) ସେପ୍ଟେମ୍ବର , ସୋମବାର (ଆଶ୍ଵିନ) କନ୍ୟା ଦି୮ନ , ରବିଅଲ୍ଅଓଲ୍ ତା୧୯ରିଖ , ସାୟନ ଆଶ୍ଵିନ ଦି୧ନ',
            sunrise: 'ଘ୫|୩୯|୨୯',
            sunset: 'ଘ୫|୩୯|୧',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୬ ମଧ୍ୟେ , ଘ୮|୫୨ ରୁ ଘ୧୧|୧୬ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୫୮ ରୁ ଘ୧୧|୧୦ ମଧ୍ୟେ , ଘ୨|୨୨ ରୁ ଘ୩|୧୦ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୧୬ ରୁ ଘ୮|୩୯ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୨|୩୬ ରୁ ଘ୪|୬ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୭ ରୁ ଘ୧୧|୩୮ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 24,
            date: '24/09/2024',
            day: 'ମଙ୍ଗଳବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରେ ଓ ସର୍ବତ୍ର ମୂଳାଷ୍ଟମୀ, ଅଷ୍ଟକା ଶ୍ରାଦ୍ଧ , ଦେବ୍ୟୁତ୍ଥାପନ, ସହସ୍ର କୁମ୍ଭାଭିଷେକ, ଷୋଡଷ ଦିନ ପୂଜାରମ୍ଭ, ଦ୍ୱିତୀୟା ଓଷା , ପୁଅ ଜଉନ୍ତିଆ',
            Image: require('../../assets/Images/3rathas.jpg'),
            tithi: '(୨୪) ସେପ୍ଟେମ୍ବର , ମଙ୍ଗଳବାର (ଆଶ୍ଵିନ) କନ୍ୟା ଦି୯ନ , ରବିଅଲ୍ଅଓଲ୍ ତା୨୦ରିଖ , ସାୟନ ଆଶ୍ଵିନ ଦି୨ନ',
            sunrise: 'ଘ୫|୩୯|୫୫',
            sunset: 'ଘ୫|୩୭|୫୩',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୨୯ ମଧ୍ୟେ , ଘ୭|୧୭ ରୁ ଘ୧୧|୧୭ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୫୭ ରୁ ଘ୮|୪୫ ମଧ୍ୟେ , ଘ୯|୩୩ ରୁ ଘ୧୧|୫୭ ମଧ୍ୟେ , ଘ୧|୩୩ ରୁ ଘ୩|୯ ମଧ୍ୟେ , ଘ୪|୫୨ ରୁ ନିଶାନ୍ତ ଘ୫|୪୦ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୫ ରୁ ଘ୨|୩୪ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ପ୍ରାତଃ ଘ୭|୧୦ ରୁ ଘ୮|୩୯ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୫ ରୁ ଘ୮|୩୬ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 25,
            date: '25/09/2024',
            day: 'ବୁଧବାର',
            name: 'ଅନ୍ଵଷ୍ଟକା  ଶ୍ରାଦ୍ଧ',
            Image: require('../../assets/Images/PuriTemple.png'),
            tithi: '(୨୫) ସେପ୍ଟେମ୍ବର , ବୁଧବାର (ଆଶ୍ଵିନ) କନ୍ୟା ଦି୧୦ନ , ରବିଅଲ୍ଅଓଲ୍ ତା୨୧ରିଖ , ସାୟନ ଆଶ୍ଵିନ ଦି୩ନ',
            sunrise: 'ଘ୫|୪୦|୫',
            sunset: 'ଘ୫|୩୭|୧',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୨୯ ମଧ୍ୟେ , ଦିବା ଘ୭|୧୭ ରୁ ଘ୮|୫ ମଧ୍ୟେ , ଘ୧୦|୨୯ ରୁ ଘ୧୨|୫୩ ମଧ୍ୟେ , ରାତ୍ରି ଘ୬|୨୦ ରୁ ଘ୭|୮ ମଧ୍ୟେ , ଘ୮|୪୪ ରୁ ଘ୩|୮ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୧|୪୧ ରୁ ଘ୪|୫ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୩୯ ରୁ ଘ୧୦|୮ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୩୭ ରୁ ଘ୧|୬ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୩୯ ରୁ ଘ୪|୧୦ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 26,
            date: '26/09/2024',
            day: 'ଗୁରୁବାର',
            name: 'ମାତୃନବମୀ, ବିଶ୍ଵମୁକ ଦିବସ',
            Image: require('../../assets/Images/PuriBeach.png'),
            tithi: '(୨୬) ସେପ୍ଟେମ୍ବର , ଗୁରୁବାର (ଆଶ୍ଵିନ) କନ୍ୟା ଦି୧୧ନ , ରବିଅଲ୍ଅଓଲ୍ ତା୨୨ରିଖ , ସାୟନ ଆଶ୍ଵିନ  ଦି୪ନ',
            sunrise: 'ଘ୫|୪୦|୧୭',
            sunset: 'ଘ୫|୩୬|୯',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୭ ମଧ୍ୟେ , ଘ୧|୪୧ ରୁ ଘ୩|୧୭ ମଧ୍ୟେ , ରାତ୍ରି ଘ୬|୧୯ ରୁ ଘ୯|୩୧ ମଧ୍ୟେ , ଘ୧୧|୫୫ ରୁ ଘ୩|୭ ମଧ୍ୟେ , ଘ୪|୩ ରୁ ନିଶାନ୍ତ ଘ୫|୪୦ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୨|୩୫ ରୁ ଘ୫|୩୬ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୩୬ ରୁ ଘ୧|୭ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 27,
            date: '27/09/2024',
            day: 'ଶୁକ୍ରବାର',
            name: '',
            Image: require('../../assets/Images/Mahaprasad.png'),
            tithi: '(୨୭) ସେପ୍ଟେମ୍ବର , ଶୁକ୍ରବାର (ଆଶ୍ଵିନ) କନ୍ୟା ଦି୧୨ନ , ରବିଅଲ୍ଅଓଲ୍ ତା୨୩ରିଖ , ସାୟନ ଆଶ୍ଵିନ ଦି୫ନ',
            sunrise: 'ଘ୫|୪୦|୨୭',
            sunset: 'ଘ୫|୩୫|୧୭',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୨୯ ମଧ୍ୟେ , ଘ୭|୧୭ ରୁ ଘ୯|୪୧ ମଧ୍ୟେ , ଘ୧୨|୫ ରୁ ଘ୩|୧୭ ମଧ୍ୟେ , ଘ୪|୬ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୩୫ ପର୍ଯ୍ୟନ୍ତ , ରାତ୍ରି ଘ୬|୧୯ ରୁ ଘ୯|୩୧ ମଧ୍ୟେ , ଘ୧୧|୧୫ ରୁ ଘ୩|୭ ମଧ୍ୟେ , ଘ୩|୫୫ ରୁ ନିଶାନ୍ତ ଘ୫|୪୧ ମଧ୍ୟେ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୮|୩୮ ରୁ ଘ୧୧|୩୫ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୩୨ ରୁ ଘ୧୦|୪୦ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 28,
            date: '28/09/2024',
            day: 'ଶନିବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରେ ଓ ସର୍ବସମ୍ମତ ଇନ୍ଦିରା ଏକାଦଶୀ',
            Image: require('../../assets/Images/LaxmiPuja.png'),
            tithi: '(୨୮) ସେପ୍ଟେମ୍ବର , ଶନିବାର (ଆଶ୍ଵିନ) କନ୍ୟା ଦି୧୩ନ , ରବିଅଲ୍ଅଓଲ୍ ତା୨୪ରିଖ , ସାୟନ ଆଶ୍ଵିନ ଦି୭ନ',
            sunrise: 'ଘ୫|୪୦|୩୯',
            sunset: 'ଘ୫|୩୪|୨୫',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୩୦ ମଧ୍ୟେ , ଘ୭|୧୮ ରୁ ଘ୯|୪୨ ମଧ୍ୟେ , ଘ୧୨|୬ ରୁ ଘ୩|୧୮ ମଧ୍ୟେ , ଘ୪|୬ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୩୪ ପର୍ଯ୍ୟନ୍ତ , ରାତ୍ରି ଘ୧୨|୪୨ ରୁ ଘ୨|୧୮ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୨|୧୮ ରୁ ଘ୩|୬ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ପ୍ରାତଃ ଘ୫|୪୧ ରୁ ଘ୭|୧୦ ମଧ୍ୟେ , ଦିବା ଘ୪|୩ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୩୪ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧|୫ ରୁ ଘ୨|୩୩ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୩୪ ରୁ ଘ୭|୭ ମଧ୍ୟେ , ରାତ୍ରି ଘ୪|୯ ରୁ ନିଶାନ୍ତ ଘ୫|୪୧ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 29,
            date: '29/09/2024',
            day: 'ରବିବାର',
            name: '',
            Image: require('../../assets/Images/Konark.png'),
            tithi: '(୨୯) ସେପ୍ଟେମ୍ବର , ରବିବାର (ଆଶ୍ଵିନ) କନ୍ୟା ଦି୧୪ନ , ରବିଅଲ୍ଅଓଲ୍ ତା୨୫ରିଖ , ସାୟନ ଆଶ୍ଵିନ ଦି୭ନ',
            sunrise: 'ଘ୫|୪୦|୫୦',
            sunset: 'ଘ୫|୩୩|୩୪',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୬|୩୦ ରୁ ଘ୮|୫୪ ମଧ୍ୟେ , ଘ୧୨|୬ ରୁ ଘ୩|୧୮ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୫୩ ରୁ ଘ୯|୨୯ ମଧ୍ୟେ , ଘ୧୧|୫ ରୁ ଘ୧|୨୯ ମଧ୍ୟେ , ଘ୨|୪୦ ରୁ ନିଶାନ୍ତ ଘ୫|୪୧ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୪|୬ ରୁ ୪|୫୪ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୭ ରୁ ଘ୧|୩୬ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୭ ରୁ ଘ୨|୩୯ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 30,
            date: '30/09/2024',
            day: 'ସୋମବାର',
            name: '',
            Image: require('../../assets/Images/KhajaBhoga.png'),
            tithi: '(୩୦) ସେପ୍ଟେମ୍ବର , ସୋମବାର (ଆଶ୍ଵିନ) କନ୍ୟା ଦି୧୫ନ , ରବିଅଲ୍ଅଓଲ୍ ତା୨୬ରିଖ , ସାୟନ ଆଶ୍ଵିନ ଦି୮ନ',
            sunrise: 'ଘ୫|୪୧|୩',
            sunset: 'ଘ୫|୩୨|୪୩',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୮ ମଧ୍ୟେ , ଘ୮|୫୪ ରୁ ଘ୧୧|୧୮ ମଧ୍ୟେ , ରାତ୍ରି  ଘ୭|୫୨ ରୁ ଘ୧୧|୪ ମଧ୍ୟେ , ଘ୨|୧୬ ରୁ ଘ୩|୪ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୧୦ ରୁ ଘ୮|୩୮ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୨|୩୨ ରୁ ଘ୪|୦ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୪ ରୁ ଘ୧୧|୩୫ ପର୍ଯ୍ୟନ୍ତ |',
        },
    ]

    const eventsForEnglishMonth = [
        {
            id: 1,
            date: '01/09/2024',
            day: 'Sunday',
            name: '',
            spclDesc: '',
            Image: require('../../assets/Images/PuriTemple.png'),
            tithi: '(1) September, Sunday (Bhadra) 17th, evening Bhadra 10th. ',
            sunrise: '5:34:57 AM.',
            sunset: '5:58:41 PM.',
            gdTime: '(Amrit) - from 6:24 AM to 9:36 AM, and from 7:30 PM to 9:36 PM, from sunrise to 6:24 AM, from 12:48 PM to 1:36 PM, from 6:42 PM to 7:30 PM, from 12:28 AM to 3:30 AM. ',
            bdTime: ' (Bar and Kala Velas) - from 10:12 AM to 1:18 PM, from 1:13 AM to 2:41 AM. ',
        },
        {
            id: 2,
            date: '02/09/2024',
            day: 'Monday',
            name: 'Snana Yatra , Gajanan Besha & Anabasara Arambha',
            spclDesc: '',
            Image: require('../../assets/Images/PuriBeach.png'),
            tithi: '(2) September, Monday (Bhadra) 18th, evening Bhadra 11th. ',
            sunrise: '5:35:10 AM.',
            sunset: '5:57:50 PM.',
            gdTime: '(Amrit) - from sunrise to 7:12 AM, from 10:24 AM to 12:48 PM, from 6:41 PM to 9:05 PM, from 11:29 PM to 2:41 AM. From sunrise to 3:12 AM. ',
            bdTime: '(Kala Velas) - from 7:08 AM to 8:40 AM, from 2:49 PM to 4:22 PM. (Bar Velas) from 2:49 PM to 4:22 PM. (Kala Ratree) from 10:17 PM to 11:45 PM. ',
        },

        {
            id: 3,
            date: '03/09/2024',
            day: 'Tuesday',
            name: 'At the temple, Saptapuri Amavasya, Saptapuri Bhoga, the playful act of stealing clothes, the oceanic conquest of Lord Jaganatha, the commencement of Ag Daan, Akhiracharasamba  ',
            spclDesc: '',
            Image: require('../../assets/Images/Mahaprasad.png'),
            tithi: '(3) September, Tuesday (Bhadra) 19th,  evening Bhadra 12th. ',
            sunrise: ' 5:35:23 AM.',
            sunset: '5:56:59 PM.',
            gdTime: '(Amrit) - from 8:00 AM to 10:24 AM, from 12:48 PM to 2:24 PM, from 3:21 PM to 4:48 PM, from sunset to 6:41 PM, from 9:04 PM to 12:28 AM, from 1:52 AM to 3:28 AM. ',
            bdTime: ' (Kala Velas) - from 1:15 PM to 2:47 PM. (Bar Velas) from 7:08 AM to 8:39 AM. (Kala Ratree) from 7:18 PM to 8:47 PM. ',
        },

        {
            id: 4,
            date: '04/09/2024',
            day: 'Wednesday',
            name: 'In the temple,Dibagnileela, and the second appearance of the moon. ',
            spclDesc: '',
            Image: require('../../assets/Images/LaxmiPuja.png'),
            tithi: '(4) September, Wednesday (Bhadra) 20th, evening Bhadra 13th. ',
            sunrise: ' 5:35:36 AM.',
            sunset: '5:56:08 PM',
            gdTime: '(Amrit) - from sunrise to 7:12 AM, from 12:02 PM to 1:36 PM, from 6:39 PM to 9:03 PM, from 1:51 AM to the end of the night, from 4:00 AM to 5:36 AM. From sunrise to 4:36 AM. ',
            bdTime: '(Kala Velas) - from 8:40 AM to 10:12 AM. (Bar Velas) from 11:44 AM to 1:16 PM. (Kala Ratree) from 2:40 AM to 4:08 AM.',
        },

        {
            id: 5,
            date: '05/09/2024',
            day: 'Thursday',
            name: 'In the temple, Nikunjaleela.  and Teachers Day ',
            spclDesc: '',
            Image: require('../../assets/Images/Konark.png'),
            tithi: '(5) September, Thursday (Bhadra) 21st,  evening Bhadra 14th. ',
            sunrise: ' 5:35:48 AM.',
            sunset: '5:55:16 PM.',
            gdTime: ' (Amrit) - from 1:02 AM to 3:26 AM. From sunrise to 7:13 AM, from 10:25 AM to 12:49 PM.',
            bdTime: '(Bar and Kala Velas) - from 2:49 PM to 5:55 PM. (Kala Ratree) from 11:42 PM to 1:11 AM. ',
        },

        {
            id: 6,
            date: '06/09/2024',
            day: 'Friday',
            name: 'In the temple, Andhaprastab, Bali Tritiya, Gauri Vrat, and Haritalika Chaturthi. ',
            spclDesc: '',
            Image: require('../../assets/Images/KhajaBhoga.png'),
            tithi: '(6) September, Friday (Bhadra) 22nd, evening Bhadra 15th.',
            sunrise: ' 5:36:01 AM.',
            sunset: ' 5:54:23 PM.',
            gdTime: ' (Amrit) - from 7:13 AM to 10:25 AM, from 12:49 PM to 2:25 PM, from 4:01 PM to 5:37 PM, from 7:25 PM to 9:01 PM, from 10:25 PM to 11:13 PM.',
            bdTime: '(Bar and Kala Velas) - from 8:39 AM to 11:42 AM. (Kala Ratree) from 8:45 PM to 10:13 PM. ',
        },

        {
            id: 7,
            date: '07/09/2024',
            day: 'Saturday',
            name: "In the temple and everywhere, it's Ganesh Chaturthi (Vinayaka Brat).",
            spclDesc: '',
            Image: require('../../assets/Images/rathaImg.jpeg'),
            tithi: '(7) September, Saturday (Bhadra) 23rd,  evening Bhadra 16th. ',
            sunrise: ' 5:36:14 AM.',
            sunset: ' 5:53:30 PM.',
            gdTime: ' (Amrit) - from 9:37 AM to 12:49 PM, from 8:13 PM to 10:37 PM, from 12:13 AM to 1:49 AM.',
            bdTime: ' (Kala Velas) - Morning from 5:36 AM to 7:08 AM, daytime from 4:22 PM to 5:54 PM. (Barvelas) - daytime from 1:34 PM to 2:42 PM. (Kalaratri) - noon from 5:54 PM to 7:18 PM, night from 9:00 PM to midnight, from 4:36 AM to 5:36 AM. ',
        },

        {
            id: 8,
            date: '08/09/2024',
            day: 'Sunday',
            name: "In the temple, it's Rishi Panchami, Dahaliḷa, Rishi Panchami Brat, and Nua Khai Parva (Nabanna Utsav).",
            spclDesc: '',
            Image: require('../../assets/Images/3rathas.jpg'),
            tithi: '(8) September, Sunday (Bhadra) 24th, evening Bhadra 17th.',
            sunrise: ' 5:36:25 AM.',
            sunset: '5:52:37 PM.',
            gdTime: '(Amrit) - from 6:25 AM to 9:37 AM, from 7:24 PM to 9:00 PM. (Mahendra) - from sunrise to 6:25 AM, from 12:49 PM to 1:37 PM, from 6:36 PM to 7:24 PM, from 12:12 AM to 3:24 AM.',
            bdTime: 'daytime from 10:10 AM to 11:12 AM. (Kalaratri) - night from 10:00 PM to 2:39 AM. ',
        },

        {
            id: 9,
            date: '09/09/2024',
            day: 'Monday',
            name: "In the temple, it's the proposal of Bimbasur's Baddha, Shashti Osha, and the beginning of Somnath Brata.",
            spclDesc: '',
            Image: require('../../assets/Images/PuriTemple.png'),
            tithi: '(9) September, Monday (Bhadra) 16th,  evening Bhadra 18th. ',
            sunrise: '5:34:47 AM.',
            sunset: '5:59:32 PM.',
            gdTime: '(Amrit) - from 6:13 AM to 7:13 AM, from 10:25 AM to 12:49 PM, from 6:35 PM to 8:59 PM, from 11:23 PM to 2:35 AM. (Mahendra) - from 3:13 AM to 4:49 PM. ',
            bdTime: 'daytime from 7:09 AM to 8:40 AM. (Baravela) - daytime from 2:45 PM to 4:16 PM. (Kalaratri) - night from 10:14 PM to 11:43 PM.',
        },

        {
            id: 10,
            date: '10/09/2024',
            day: 'Tuesday',
            name: "In the temple, it's the proposal of Kekesi's Baddha, Lalita Saptami, and the commencement of Kukkuti Brata.",
            spclDesc: '',
            Image: require('../../assets/Images/PuriBeach.png'),
            tithi: '(10) September, Tuesday (Bhadra) 26th, evening Bhadra 19th.',
            sunrise: ' 5:36:50 AM.',
            sunset: '5:50:50 PM.',
            gdTime: '(Amrit) - from 8:02 AM to 10:26 AM, from 12:50 PM to 2:26 PM, from 3:14 PM to 4:50 PM, from sunset to 6:36 PM, from 8:58 PM to 11:22 PM, from 1:46 AM to 3:22 AM. ',
            bdTime: 'daytime from 7:08 AM to 8:38 AM. (Baravela) - daytime from 6:09 AM to 7:39 AM. (Kalaratri) - night from 7:08 PM to 8:38 PM. ',
        },

        {
            id: 11,
            date: '11/09/2024',
            day: 'Wednesday',
            name: "At the temple, there's the observance of Radhashtami fasting and worship, Durvashtami, the bedtime celebration of Goddess Durga, the ashram initiation of Shree Sudarshan Dev, Budhashtami bathing, and the grand birth celebration of Atibadi Jagannath Das.",
            spclDesc: '',
            Image: require('../../assets/Images/Mahaprasad.png'),
            tithi: '(11) September, Wednesday (Bhadra) 27th,  evening Bhadra 20th.',
            sunrise: '5:37:02 AM.',
            sunset: '5:49:56 PM.',
            gdTime: '(Amrit) - from 7:13 AM to 10:36 AM, from 6:40 PM to 9:04 PM, from 1:51 AM to 5:37 AM. ',
            bdTime: 'daytime from 8:40 AM to 10:11 AM. (Baravela) - daytime from 11:42 AM to 1:13 PM. (Kalaratri) - night from 2:40 AM to 4:09 AM. ',
        },

        {
            id: 12,
            date: '12/09/2024',
            day: 'Thursday',
            name: 'Tala Nabami ',
            spclDesc: '',
            Image: require('../../assets/Images/LaxmiPuja.png'),
            tithi: '(12) September, Thursday (Bhadra) 28th, Sunday (Bhadra) 21st ',
            sunrise: '5:37:14',
            sunset: ' 5:49:02',
            gdTime: '(Amrita) From 1:03 AM to 3:26 AM | (Mahendra) Sunrise from 5:14 AM to 7:26 AM, From 10:26 AM to 12:50 PM',
            bdTime: ' (Day and night) From 2:43 AM to 5:49 AM | (Night) From 11:40 PM to 1:10 AM ',
        },

        {
            id: 13,
            date: '13/09/2024',
            day: 'Friday',
            name: "In the temple, the enactment of Krishna Leela, the proposal for Kansa Badha, the celebration of Mathura Hata in Shrijeeu's Labanakhia, and the beginning of the Sharana.",
            spclDesc: '',
            Image: require('../../assets/Images/Konark.png'),
            tithi: '(13) September, Friday (Bhadra) 29th, Monday (Bhadra) 22nd ',
            sunrise: ' 5:37:27',
            sunset: '5:48:07',
            gdTime: '(Amrita) From 7:14 AM to 10:26 AM, from 12:02 PM to 2:26 PM, from 12:50 PM to 2:26 PM, from 4:11 PM to 5:47 PM, from 7:22 PM to 8:58 PM, from 10:22 PM to 12:34 AM | (Mahendra) From 10:34 PM to 11:22 PM, from 10:00 PM to 12:38 AM ',
            bdTime: ' (Day and night) From 8:09 AM to 10:40 AM | (Night) From 8:41 PM to 10:10 PM ',
        },

        {
            id: 14,
            date: '14/09/2024',
            day: 'Saturday',
            name: "In the Shrimandir and Smarta-accepted, Lord Vishnu's Parshva Parivartana (Major) Ekadashi:",
            spclDesc: '',
            Image: require('../../assets/Images/KhajaBhoga.png'),
            tithi: '(14) September, Saturday (Bhadra) 30th, Tuesday (Bhadra) 23rd ',
            sunrise: '5:34:47',
            sunset: '5:59:32',
            gdTime: '(Amrit) 7:15 AM to 9:39 AM, 12:3 AM to 3:15 AM, 4:11 AM to 5:47 AM, Night 12:54 AM to 2:30 AM. (Mahendra) Night from 2:30 am to 3:18 am',
            bdTime: '(Kalabela) morning between 5:38 am and 7:9 am, daytime between 4:15 am and 5:47 am. (Barbela) Diba between 10:00 and 2:42 (Midnight) Sunset between 5:47 PM and 7:13 PM, Night between 4:9 PM and Nishant 5:38 PM. ',
        },

        {
            id: 15,
            date: '15/09/2024',
            day: 'Sunday',
            name: 'In Srimandir and Sarvasammat Baman birth, Sunya 68 Anka year 1432, Garuda side change, Vaishnavassammat 11, Vijaya Mahadvadashi, Shakrotthapana Indradhvaja Puja, Sunya vog from Pujapanda Niyoga, Mahati Bath, Masanta ',
            spclDesc: '',
            Image: require('../../assets/Images/rathaImg.jpeg'),
            tithi: '(15) September, Sunday (Bhadr) Singh 31st, Sayan Bhadr 24th ',
            sunrise: '15:37:50AM',
            sunset: '5:46:18 PM',
            gdTime: '(Amrit) Day 6:26 to 9:38, Night 7:22 to 8:58. (Mahendra) Sunrise to 6:26 am, Day 12:50 to 1:38 pm, Evening 6:34 pm to 7:22 pm, 12:10 am to 3:22 pm. ',
            bdTime: ' (Bar and Kala Bela) between 10:09 and 19:00 (Midnight) Night from 1:9 to 2:39 ',
        },

        {
            id: 16,
            date: '16/09/2024',
            day: 'Monday',
            name: "Vishwakarma Puja, Kanya Sankranti, the divine attire of Lord Jagannath in the Shrimandir, Aghora Chaturdashi, the celebration of Lord Shiva's transformation, the transformation of Goddess Durga,",
            spclDesc: '',
            Image: require('../../assets/Images/3rathas.jpg'),
            tithi: '(16) September, Monday (Ashwin), Kanya Dibasa, September 12, Bhadraba 25 in the evening, ',
            sunrise: '5:38:3',
            sunset: '5:45:23',
            gdTime: ' From sunrise (Amrita) 7:15 to 8:51, from 8:04 to 11:16 at night, from 2:28 to 3:16, ',
            bdTime: '(Kalabela) 7:09 to 8:00 in the morning, (Barabela) 2:41 to 4:11 in the afternoon, (Kalaraatri) night from 10:10 to 11:40. ',
        },

        {
            id: 17,
            date: '17/09/2024',
            day: 'Tuesday',
            name: 'In the Shrimandir and everywhere, the eternal festival, Indrotsav, Mangala Chaturdashi Snana',
            spclDesc: '',
            Image: require('../../assets/Images/PuriTemple.png'),
            tithi: '(17) September, Tuesday (Ashwin), Kanya Dibasa, September 13, Bhadraba 26 in the evening',
            sunrise: '5:38:15',
            sunset: '5:44:29',
            gdTime: 'From sunrise (Amrita) 6:27 to 7:15, from 7:15 to 11:15 at night, from 8:04 to 8:52, from 9:40 to 12:04, from 1:40 to 3:16, from 4:52 to the end of the night. (Maahendra) Sunset at night 8:05.',
            bdTime: ' (Kalabela) day from 1:18 to 2:38, (Barabela) day from 7:09 to 8:39, (Kalaraatri) night from 7:10 to 8:40.',
        },

        {
            id: 18,
            date: '18/09/2024',
            day: 'Wednesday',
            name: 'In the Shrimandir, the offering to Lord Indragovinda, the proposal to Lord Indra, the birth of Lord Bhagavat, the end of Sharana, the commencement of Jhanni Osha, the offering to ancestors during Aparapaksha, and the beginning of Mahalaya Shradh',
            spclDesc: '',
            Image: require('../../assets/Images/PuriBeach.png'),
            tithi: '(18) September, Wednesday (Ashwin), Kanya Dibasa, September 13, Bhadraba 27 in the evening',
            sunrise: '5:38:26',
            sunset: '5:43:34',
            gdTime: '(Amrita) From sunrise 6:27 to 7:15, from 7:15 to 8:03, from 10:27 to 12:51, from 6:27 to 7:15 at night, from 8:51 to 3:15. (Maahendra) Day from 6:27 to 7:15, from 1:39 to 4:03. ',
            bdTime: ' (Kalabela) day from 8:39 to 10:09, (Barabela) day from 11:39 to 1:09, (Kalaraatri) night from 2:39 to 4:09.',
        },
        {
            id: 19,
            date: '19/09/2024',
            day: 'Thursday',
            name: '',
            spclDesc: '',
            Image: require('../../assets/Images/Mahaprasad.png'),
            tithi: '(19) September, Thursday (Ashwin), Kanya Dibasa, September 15, Bhadraba 28 in the evening',
            sunrise: '5:38:39',
            sunset: '5:42:39',
            gdTime: '(Amrita) From sunrise 7:15 to 8:39, from 6:26 to 9:38 at night, from 12:02 to 3:14, from 4:02 to 5:39, from midnight 4:02 to 5:39. ',
            bdTime: '(Kalabela) day from 2:49 to 5:43, (Kalaraatri) night from 11:37 to 1:08. ',
        },
        {
            id: 20,
            date: '20/09/2024',
            day: 'Friday',
            name: '',
            spclDesc: '',
            Image: require('../../assets/Images/LaxmiPuja.png'),
            tithi: '(20) September, Friday (Ashwin), Kanya Dibasa,  Sayan Bhadra 29th ',
            sunrise: '5:38:52',
            sunset: '5:41:44',
            gdTime: '(Amrita) From sunrise 6:28 to 7:16, from 7:16 to 9:40, from 12:04 to 3:16, from 4:06 to sunset, from 6:26 to 5:42 at night, from 12:02 to 3:14, from 4:02 to midnight, from midnight 4:02 to 5:39.',
            bdTime: '(Bara and Kalabela) Day from 8:38 to 12:37, (Kalaraatri) Night from 8:38 to 10:08. ',
        },
        {
            id: 21,
            date: '21/09/2024',
            day: 'Saturday',
            name: 'Aswapanchami ',
            spclDesc: '',
            Image: require('../../assets/Images/Konark.png'),
            tithi: '(21) September, Saturday (Ashwin) Kanya 6,  Sayan Bhadra 30th ',
            sunrise: '5:39:4',
            sunset: '15:40:50',
            gdTime: '(Amrit) Sunrise to 6:28 AM, Daylight 7:16 AM to 9:40 AM, 12:4 AM to 3:16 AM, 4:6 AM to Sunset 5:41 AM, Night 12:48 AM to 2:24 AM | (Mahendra) Night from 2:24 to 3:12',
            bdTime: ' (Kalabela) from dawn to dusk between 7:00 a.m. and sunset between 5:41 a.m. and 4:70 a.m. (Barbela) Diba between 1:6 and 2:36 (Night) from sunset to 7:00 p.m., from 4:90 a.m. to 5:39 p.m. ',
        },
        {
            id: 22,
            date: '22/09/2024',
            day: 'Sunday',
            name: 'Gajaasthami ',
            spclDesc: '',
            Image: require('../../assets/Images/KhajaBhoga.png'),
            tithi: '(22) September, Sunday (Ashwin), Kanya Dibasa, September 18, Bhadraba 31 in the evening',
            sunrise: ' 5:39:17',
            sunset: ' 5:39:55',
            gdTime: '(Amrita) From 6:28 to 8:52 in the morning, from 12:40 to 3:16 in the afternoon, from 7:59 to 9:35 in the evening, from 11:59 to 1:35 at night, from 2:26 to midnight, from 4:41 to 4:52 (Mahendra) from 4:00 to 4:52 in the afternoon',
            bdTime: '(Barabela) From 10:04 to 11:06 in the morning, (Kalabela) From 1:08 to 2:38 in the afternoon, (Kalaraatri) From 1:08 to 2:38 at night. ',
        },
        {
            id: 23,
            date: '23/09/2024',
            day: 'Monday ',
            name: 'Samadibaratri ',
            spclDesc: '',
            Image: require('../../assets/Images/rathaImg.jpeg'),
            tithi: '(23) September, Monday (Ashwin), Kanya Dibasa, Ashwina 1 in the evening',
            sunrise: '5:39:29',
            sunset: '5:39:01',
            gdTime: '(Amrita) From 7:16 to 8:52 in the morning, from 8:52 to 11:16 in the morning, from 7:58 to 11:10 in the evening, from 10:22 to 11:10 at night',
            bdTime: ' (Kalabela) From 7:16 to 8:39 in the morning, (Barabela) From 2:36 to 4:06 in the afternoon, (Kalaraatri) From 10:07 to 11:38 at night.',
        },
        {
            id: 24,
            date: '24/09/2024',
            day: 'Tuesday',
            name: 'In Srimandi and everywhere Moolastami, Ashtaka Shraddha, Devyutthapan, Thousand Kukhabhishek, Sixteenth Day Pujarambha, Second Osha, Pua Jountiya ',
            spclDesc: '',
            Image: require('../../assets/Images/3rathas.jpg'),
            tithi: '(24) September, Tuesday (Ashwin), Kanya Dibasa, Ashwina 2 in the evening',
            sunrise: '5:39:55',
            sunset: '5:37:53',
            gdTime: '(Amrita) From 6:29 to 11:17 in the morning, from 7:17 to 11:17 in the evening, from 7:57 to 8:45 in the night, from 9:33 to 11:57 in the night, from 1:33 to 3:09 at midnight, from 4:52 to 5:40 in the early morning',
            bdTime: ' (Kalabela) From 1:05 to 2:34 in the morning, (Barabela) From 7:10 to 8:39 in the morning, (Kalaraatri) From 7:05 to 8:36 at night. ',
        },
        {
            id: 25,
            date: '25/09/2024',
            day: 'Wednesday',
            name: 'Anvastaka Shraddha ',
            spclDesc: '',
            Image: require('../../assets/Images/PuriTemple.png'),
            tithi: '(25) September, Wednesday (Ashwin) Kanya 10th,  Sayan Ashwin 3rd ',
            sunrise: '5:40:50',
            sunset: ' 5:37:01',
            gdTime: '(Amrita) From 6:29 to 7:17 in the morning, from 7:17 to 8:05 in the morning, from 10:29 to 12:53 in the morning, from 6:20 to 7:08 in the evening, from 8:44 to 9:38 at night, (Mahendra) From 1:41 to 4:05 in the early morning',
            bdTime: '(Kalabela) From 8:39 to 10:08 in the morning, (Barabela) From 11:37 to 1:06 in the afternoon, (Kalaraatri) From 2:39 to 4:10 at night. ',
        },
        {
            id: 26,
            date: '26/09/2024',
            day: 'Thursday',
            name: 'Matru Navami, Vishwamukha Divasa ',
            spclDesc: '',
            Image: require('../../assets/Images/PuriBeach.png'),
            tithi: '26th September, Thursday (Ashwina), Kanya 11th, evening of Ashwina 4th. ',
            sunrise: '5:40:17 AM',
            sunset: ' 5:36:9 PM',
            gdTime: '(Amrita) from sunrise: from 7:17 AM to 1:41 PM, from 6:19 PM to 9:31 PM, from 11:55 PM to 3:07 AM (next day).',
            bdTime: '(Bara and Kalabela) from 2:35 PM to 5:36 PM, (Kalaratri) from 11:36 PM to 1:07 AM (next day). ',
        },
        {
            id: 27,
            date: '27/09/2024',
            day: 'Friday ',
            name: '',
            spclDesc: '',
            Image: require('../../assets/Images/Mahaprasad.png'),
            tithi: '27th September, Friday (Ashwina), Kanya 12th day , evening of Ashwina 5th. ',
            sunrise: '5:40:27 AM',
            sunset: '5:35:17 PM',
            gdTime: '(Amrita) from sunrise: from 6:29 AM to 9:41 AM, from 12:05 PM to 3:17 PM, from 4:06 PM to sunset, from 6:19 PM to 9:31 PM, from 11:15 PM to 3:41 AM (next day). ',
            bdTime: ' (Bara and Kalabela) from 8:38 AM to 11:35 AM, (Kalaratri) from 8:32 PM to 10:40 PM. ',
        },
        {
            id: 28,
            date: '28/09/2024',
            day: 'Saturday',
            name: 'Shrimandira and Sarvasammat Ekadashi ',
            spclDesc: '',
            Image: require('../../assets/Images/LaxmiPuja.png'),
            tithi: '28th September, Saturday Kanya(Ashwina), 13th day of the waxing phase of the moon, evening of Ashwina 7th. ',
            sunrise: '5:40:39 AM',
            sunset: '5:34:25 PM',
            gdTime: '(Amrita) from sunrise: from 6:30 AM to 9:42 AM, from 12:06 PM to 3:18 PM, from 4:06 PM to sunset, from 6:18 PM to 9:34 PM, from 12:42 AM to 3:06 AM (next day). (Mahendra) From 12:18 AM to 3:06 AM (next day).',
            bdTime: '(Kalabela) morning from 5:41 AM to 7:10 AM, from 4:03 PM to sunset, (Barabela) from 1:05 PM to 2:33 PM, (Kalaratri) sunset from 5:34 PM to 7:07 PM, night from 4:09 PM to 5:41 AM (next day). ',
        },
        {
            id: 29,
            date: '29/09/2024',
            day: 'Sunday',
            name: '',
            spclDesc: '',
            Image: require('../../assets/Images/Konark.png'),
            tithi: '(29) September, Sunday (Ashwin) Kanya 14th, Sayan Ashwin 7th ',
            sunrise: '15:40:50',
            sunset: '15:33:34',
            gdTime: '(Amrit) Day 6:30 to 8:54, 12:6 to 3:18, Night 7:53 to 9:29, 11:5 to 1:29, 2:40 to 5:00 Up to 41 (Mahendra) Diba from 4.6 to 4.54',
            bdTime: ' (twelfth and midnight hours) between 10:7 and 1:36. (Midnight) Night from 1:7 to 2:39 ',
        },
        {
            id: 30,
            date: '30/09/2024',
            day: 'Monday',
            name: 'Snana Yatra , Gajanan Besha & Anabasara Arambha',
            spclDesc: '',
            Image: require('../../assets/Images/KhajaBhoga.png'),
            tithi: '(30) September, Monday (Ashwin) Kanya 15th, Sayan Ashwin 8th ',
            sunrise: '5:41 a.m',
            sunset: '12:32 p.m',
            gdTime: '(Amrit) Sunrise to Day 7:18 AM, 8:54 AM to 11:18 AM, Night 7:52 AM to 11:4 AM, 2:16 AM to 3:4 AM. ',
            bdTime: '(Kaalbela) between 7:10 and 8:38 (Barbela) Diba between 2:32 PM and 4:00 PM (Night) from 10:04 to 11:35 ',
        },
    ]

    const CUSTOMOdia_DATE = [
        { id: 1, showDate: '୧', disable: 'no', date: '01/09/2024', spclEvent: 'no' },
        { id: 2, showDate: '୨', disable: 'no', date: '02/09/2024', spclEvent: 'yes' },
        { id: 3, showDate: '୩', disable: 'no', date: '03/09/2024', spclEvent: 'yes' },
        { id: 4, showDate: '୪', disable: 'no', date: '04/09/2024', spclEvent: 'yes' },
        { id: 5, showDate: '୫', disable: 'no', date: '05/09/2024', spclEvent: 'yes' },
        { id: 6, showDate: '୬', disable: 'no', date: '06/09/2024', spclEvent: 'yes' },
        { id: 7, showDate: '୭', disable: 'no', date: '07/09/2024', spclEvent: 'yes' },
        { id: 8, showDate: '୮', disable: 'no', date: '08/09/2024', spclEvent: 'yes' },
        { id: 9, showDate: '୯', disable: 'no', date: '09/09/2024', spclEvent: 'yes' },
        { id: 10, showDate: '୧୦', disable: 'no', date: '10/09/2024', spclEvent: 'yes' },
        { id: 11, showDate: '୧୧', disable: 'no', date: '11/09/2024', spclEvent: 'yes' },
        { id: 12, showDate: '୧୨', disable: 'no', date: '12/09/2024', spclEvent: 'yes' },
        { id: 13, showDate: '୧୩', disable: 'no', date: '13/09/2024', spclEvent: 'yes' },
        { id: 14, showDate: '୧୪', disable: 'no', date: '14/09/2024', spclEvent: 'yes' },
        { id: 15, showDate: '୧୫', disable: 'no', date: '15/09/2024', spclEvent: 'yes' },
        { id: 16, showDate: '୧୬', disable: 'no', date: '16/09/2024', spclEvent: 'yes' },
        { id: 17, showDate: '୧୭', disable: 'no', date: '17/09/2024', spclEvent: 'yes' },
        { id: 18, showDate: '୧୮', disable: 'no', date: '18/09/2024', spclEvent: 'yes' },
        { id: 19, showDate: '୧୯', disable: 'no', date: '19/09/2024', spclEvent: 'no' },
        { id: 20, showDate: '୨୦', disable: 'no', date: '20/09/2024', spclEvent: 'no' },
        { id: 21, showDate: '୨୧', disable: 'no', date: '21/09/2024', spclEvent: 'yes' },
        { id: 22, showDate: '୨୨', disable: 'no', date: '22/09/2024', spclEvent: 'yes' },
        { id: 23, showDate: '୨୩', disable: 'no', date: '23/09/2024', spclEvent: 'yes' },
        { id: 24, showDate: '୨୪', disable: 'no', date: '24/09/2024', spclEvent: 'yes' },
        { id: 25, showDate: '୨୫', disable: 'no', date: '25/09/2024', spclEvent: 'yes' },
        { id: 26, showDate: '୨୬', disable: 'no', date: '26/09/2024', spclEvent: 'yes' },
        { id: 27, showDate: '୨୭', disable: 'no', date: '27/09/2024', spclEvent: 'no' },
        { id: 28, showDate: '୨୮', disable: 'no', date: '28/09/2024', spclEvent: 'yes' },
        { id: 29, showDate: '୨୯', disable: 'no', date: '29/09/2024', spclEvent: 'no' },
        { id: 30, showDate: '୩୦', disable: 'no', date: '30/09/2024', spclEvent: 'no' },
        { id: 31, showDate: '୧', disable: 'yes', date: '01/10/2024', spclEvent: 'no' },
        { id: 32, showDate: '୨', disable: 'yes', date: '02/10/2024', spclEvent: 'no' },
        { id: 33, showDate: '୩', disable: 'yes', date: '03/10/2024', spclEvent: 'no' },
        { id: 34, showDate: '୪', disable: 'yes', date: '04/10/2024', spclEvent: 'no' },
        { id: 35, showDate: '୫', disable: 'yes', date: '05/10/2024', spclEvent: 'no' },
    ];

    const CUSTOMEnglish_DATE = [
        { id: 1, showDate: '1', disable: 'no', date: '01/09/2024', spclEvent: 'no' },
        { id: 2, showDate: '2', disable: 'no', date: '02/09/2024', spclEvent: 'yes' },
        { id: 3, showDate: '3', disable: 'no', date: '03/09/2024', spclEvent: 'yes' },
        { id: 4, showDate: '4', disable: 'no', date: '04/09/2024', spclEvent: 'yes' },
        { id: 5, showDate: '5', disable: 'no', date: '05/09/2024', spclEvent: 'yes' },
        { id: 6, showDate: '6', disable: 'no', date: '06/09/2024', spclEvent: 'yes' },
        { id: 7, showDate: '7', disable: 'no', date: '07/09/2024', spclEvent: 'yes' },
        { id: 8, showDate: '8', disable: 'no', date: '08/09/2024', spclEvent: 'yes' },
        { id: 9, showDate: '9', disable: 'no', date: '09/09/2024', spclEvent: 'yes' },
        { id: 10, showDate: '10', disable: 'no', date: '10/09/2024', spclEvent: 'yes' },
        { id: 11, showDate: '11', disable: 'no', date: '11/09/2024', spclEvent: 'yes' },
        { id: 12, showDate: '12', disable: 'no', date: '12/09/2024', spclEvent: 'yes' },
        { id: 13, showDate: '13', disable: 'no', date: '13/09/2024', spclEvent: 'yes' },
        { id: 14, showDate: '14', disable: 'no', date: '14/09/2024', spclEvent: 'yes' },
        { id: 15, showDate: '15', disable: 'no', date: '15/09/2024', spclEvent: 'yes' },
        { id: 16, showDate: '16', disable: 'no', date: '16/09/2024', spclEvent: 'yes' },
        { id: 17, showDate: '17', disable: 'no', date: '17/09/2024', spclEvent: 'yes' },
        { id: 18, showDate: '18', disable: 'no', date: '18/09/2024', spclEvent: 'yes' },
        { id: 19, showDate: '19', disable: 'no', date: '19/09/2024', spclEvent: 'no' },
        { id: 20, showDate: '20', disable: 'no', date: '20/09/2024', spclEvent: 'no' },
        { id: 21, showDate: '21', disable: 'no', date: '21/09/2024', spclEvent: 'yes' },
        { id: 22, showDate: '22', disable: 'no', date: '22/09/2024', spclEvent: 'yes' },
        { id: 23, showDate: '23', disable: 'no', date: '23/09/2024', spclEvent: 'yes' },
        { id: 24, showDate: '24', disable: 'no', date: '24/09/2024', spclEvent: 'yes' },
        { id: 25, showDate: '25', disable: 'no', date: '25/09/2024', spclEvent: 'yes' },
        { id: 26, showDate: '26', disable: 'no', date: '26/09/2024', spclEvent: 'yes' },
        { id: 27, showDate: '27', disable: 'no', date: '27/09/2024', spclEvent: 'no' },
        { id: 28, showDate: '28', disable: 'no', date: '28/09/2024', spclEvent: 'yes' },
        { id: 29, showDate: '29', disable: 'no', date: '29/09/2024', spclEvent: 'no' },
        { id: 30, showDate: '30', disable: 'no', date: '30/09/2024', spclEvent: 'no' },
        { id: 31, showDate: '1', disable: 'yes', date: '31/10/2024', spclEvent: 'no' },
        { id: 32, showDate: '2', disable: 'yes', date: '28/10/2024', spclEvent: 'no' },
        { id: 33, showDate: '3', disable: 'yes', date: '29/10/2024', spclEvent: 'no' },
        { id: 34, showDate: '4', disable: 'yes', date: '30/10/2024', spclEvent: 'no' },
        { id: 35, showDate: '5', disable: 'yes', date: '31/10/2024', spclEvent: 'no' },
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
                            <TouchableOpacity onPress={() => navigation.navigate('August2024')}>
                                <AntDesign name="caretleft" color={'#000'} size={25} />
                            </TouchableOpacity>
                            {selectedLanguage === "Odia" &&
                                <Text style={{ color: '#000', fontSize: 17, fontWeight: '600' }}>ସେପ୍ଟେମ୍ବର  ୨୦୨୪</Text>
                            }
                            {selectedLanguage === "English" &&
                                <Text style={{ color: '#000', fontSize: 17, fontWeight: '600' }}>September  2024</Text>
                            }
                            <TouchableOpacity onPress={() => navigation.replace('October2024')}>
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

export default September2024

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