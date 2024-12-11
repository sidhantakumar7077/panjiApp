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

const July2024 = (props) => {

  const eventsForOdiaMonth = [
    {
      id: 1,
      date: '01/07/2024',
      day: 'ସୋମବାର',
      name: 'ଶ୍ରୀମନ୍ଦିରରେ ଶ୍ରୀଜୀଉଙ୍କର ଚକାବିଜେ , ଅନବସର ଦଶମୀ , ଦଶମୂଳଲାଗି',
      Image: require('../../assets/Images/PuriTemple.png'),
      tithi: '(୧) ଜୁଲାଇ ,ସୋମବାର(ଆଷାଢ) ମିଥୁନ ଦି୧୭ନ , ଜିଲହେଜ ତା୨୪ରିଖ , ସାୟନ ଆଷାଢ ଦି୧୦ନ',
      sunrise: 'ଘ୫|୧୪|୫୫',
      sunset: 'ଘ୬|୨୫|୩୧',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୮|୨୮ ରୁ ଘ୧୦|୪ ମଧ୍ୟେ , ରାତ୍ରି ଘ୯|୧୮ ରୁ ଘ୧୨|୫୦ ମଧ୍ୟେ , ଘ୨|୨୬ ରୁ ଘ୪|୨ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର)ରାତ୍ରି ଘ୪|୫୦ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୧୫ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା)ପ୍ରାତଃ ଘ୬|୫୮ ରୁ ଘ୮|୩୬ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୩|୯ ରୁ ଘ୪|୪୭ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୩୧ ରୁ ଘ୧୧|୫୧ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 2,
      date: '02/07/2024',
      day: 'ମଙ୍ଗଳବାର',
      name: 'ଶ୍ରୀମନ୍ଦିରରେ (ସର୍ବସମ୍ମତ) ଖାଳିଲାଗି ଏକାଦଶୀ , ଅନବସର ଏକାଦଶୀ',
      Image: require('../../assets/Images/PuriBeach.png'),
      tithi: '(୨) ଜୁଲାଇ , ମଙ୍ଗଳବାର (ଆଷାଢ) ମିଥୁନ ଦି୧୮ନ , ଜିଲହେଜ ତା୨୫ରିଖ , ସାୟନ ଆଷାଢ ଦି୧୧ନ',
      sunrise: 'ଘ୫|୧୫|୧୫',
      sunset: 'ଘ୬|୨୫|୩୫',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୪୦ ମଧ୍ୟେ , ଦିବା ଘ୧୦|୫୩ ରୁ ଘ୧୧|୪୧ ମଧ୍ୟେ , ସୂର୍ଯ୍ୟାସ୍ତ ଘ୬|୨୬ ରୁ ରାତ୍ରି ଘ୭|୧୬ ମଧ୍ୟେ , ରାତ୍ରି ଘ୧୨|୫୦ ରୁ ଘ୩|୧୪ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୧୦|୫ ରୁ ଘ୧୦|୫୩ ମଧ୍ୟେ , ଘ୧୧|୪୧ ରୁ ଘ୧୨|୨୯ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୫୦ ରୁ ଘ୧୦|୨୬ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୩୦ ରୁ ଘ୩|୯ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୬|୫୬ ରୁ ଘ୮|୩୫ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୪୭ ରୁ ଘ୯|୯ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 3,
      date: '03/07/2024',
      day: 'ବୁଧବାର',
      name: 'ଅଣସର ଦ୍ଵାଦଶୀ, ଶ୍ରୀମନ୍ଦିରରେ ଶ୍ରୀଜୀଉଙ୍କର ରାଜପ୍ରାସାଦ ବିଜେ',
      Image: require('../../assets/Images/Mahaprasad.png'),
      tithi: '(୩) ଜୁଲାଇ , ବୁଧବାର (ଆଷାଢ) ମିଥୁନ ଦି୧୯ନ , ଜିଲହେଜ ତା୨୬ରିଖ , ସାୟନ ଆଷାଢ ଦି୧୨ନ',
      sunrise: 'ଘ୫|୧୫|୩୫',
      sunset: 'ଘ୬|୨୫|୩୭',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୭|୪୧ ରୁ ଘ୧୦|୫୩ ମଧ୍ୟେ , ଘ୧|୧୭ ରୁ ଘ୪|୨୯ ମଧ୍ୟେ , ସୂର୍ଯ୍ୟାସ୍ତ ଘ୬|୨୬ ରୁ ରାତ୍ରି ଘ୧୦|୨୪ ମଧ୍ୟେ , ଘ୧୨|୫୦ ରୁ ଘ୨|୨୬ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୩୪ ରୁ ଘ୧୦|୧ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୧୧|୫୨ ରୁ ଘ୧|୩୦ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୩୫ ରୁ ଘ୩|୫୬ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 4,
      date: '04/07/2024',
      day: 'ଗୁରୁବାର',
      name: 'ଶ୍ରୀଜୀଉଙ୍କର ଅଣସର ତ୍ରୋୟଦଶୀ , ଘଣାଲାଗି , ଅଣସର ଚତୁର୍ଦ୍ଦଶୀ',
      Image: require('../../assets/Images/LaxmiPuja.png'),
      tithi: '(୪) ଜୁଲାଇ , ଗୁରୁବାର (ଆଷାଢ) ମିଥୁନ ଦି୨୦ନ , ଜିଲହେଜ ତା୨୭ରିଖ , ସାୟନ ଆଷାଢ ଦି୧୩ନ',
      sunrise: 'ଘ୫|୧୫|୫୫',
      sunset: 'ଘ୬|୨୫|୪୧',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୨|୫୪ ରୁ ଘ୫|୧୮ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୧୪ ରୁ ଘ୯|୩୮ ମଧ୍ୟେ , ଘ୧୨|୫୦ ରୁ ଘ୩|୧୪ ମଧ୍ୟେ , ଘ୪|୫୦ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୧୬ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୬ ମଧ୍ୟେ , ଘ୯|୧୮ ରୁ ଘ୧୦|୫୪ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: ' (ବାର ଓ କାଳବେଳା) ଦିବା ଘ୩|୧୨ ରୁ ଘ୬|୨୬ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୫୨ ରୁ ଘ୧|୧୩  ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 5,
      date: '05/07/2024',
      day: 'ଶୁକ୍ରବାର',
      name: 'ଆଷାଢ ଅମାବାସ',
      Image: require('../../assets/Images/Konark.png'),
      tithi: '(୫) ଜୁଲାଇ , ଶୁକ୍ରବାର (ଆଷାଢ) ମିଥୁନ ଦି୨୧ନ , ଜିଲହେଜ ତା୨୮ରିଖ , ସାୟନ ଆଷାଢ ଦି୧୪ନ',
      sunrise: 'ଘ୫|୧୬|୧୪',
      sunset: 'ଘ୬|୨୫|୪୨',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୧୧|୪୨ ରୁ ଘ୨|୬ ମଧ୍ୟେ , ସୂର୍ଯ୍ୟାସ୍ତ ଘ୬|୨୫ ରୁ ରାତ୍ରି ଘ୮|୫୦ ମଧ୍ୟେ , ଘ୧|୩୮ ରୁ ଘ୪|୨ ମଧ୍ୟେ , ଘ୪|୫୦ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୧୭ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୬|୬ ରୁ ଘ୬|୫୪ ମଧ୍ୟେ , ଘ୯|୧୮ ରୁ ଘ୧୦|୬ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା)ପ୍ରାତଃରୁ ଦିବା ଘ୮|୩୫ ରୁ ଘ୧୧|୫୧ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୯|୮ ରୁ ଘ୧୦|୩୨ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 6,
      date: '06/07/2024',
      day: 'ଶନିବାର',
      name: '',
      Image: require('../../assets/Images/KhajaBhoga.png'),
      tithi: '(6) ଜୁଲାଇ , ଶନିବାର (ଆଷାଢ) ମିଥୁନ ଦି୨୨ନ , ଜିଲହେଜ ତା୨୯ରିଖ , ସାୟନ ଆଷାଢ ଦି୧୫ନ',
      sunrise: 'ଘ୫|୧୬|୩୨',
      sunset: 'ଘ୬|୨୫|୪୪',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୨|୫୪ ରୁ ଘ୫|୧୮ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୧୪ ରୁ ଘ୮|୨ ମଧ୍ୟେ , ଘ୧୨|୨ ରୁ ଘ୨|୨୬ ମଧ୍ୟେ , ଘ୪|୨ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୧୭ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୬ ମଧ୍ୟେ , ଘ୯|୧୮ ରୁ ଘ୧୧|୪୨ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା)ପ୍ରାତଃରୁ ଦିବା ଘ୬|୫୬ ମଧ୍ୟେ , ଘ୪|୪୭ ରୁ ଘ୬|୨୬ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧|୩୦ ରୁ ଘ୩|୯ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସନ୍ଧ୍ୟା ଘ୬|୨୬ ରୁ ଘ୭|୪୭ ମଧ୍ୟେ , ରାତ୍ରି ଘ୩|୫୬ ରୁ ନିଶାନ୍ତ ଘ୫|୧୭ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 7,
      date: '11/07/2024',
      day: 'ରବିବାର',
      name: 'ଶ୍ରୀଜୀଉଙ୍କ ନେତ୍ରୋତ୍ସବ , ଶ୍ରୀଗୁଣ୍ଡିଚା (ରଥ) ଯାତ୍ରା ମହୋତ୍ସବ , ଦ୍ଵିତୀୟା ଚନ୍ଦ୍ରଦର୍ଶନ',
      Image: require('../../assets/Images/rathaImg.jpeg'),
      tithi: '(୭) ଜୁଲାଇ , ରବିବାର (ଆଷାଢ) ମିଥୁନ ଦି୨୩ନ , ଜିଲହେଜ ତା୩୦ରିଖ , ସାୟନ ଆଷାଢ ଦି୧୬ନ',
      sunrise: 'ଘ୫|୧୬|୫୫',
      sunset: 'ଘ୬|୨୫|୪୧',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୬|୫୫ ରୁ ଘ୯|୧୯ ମଧ୍ୟେ , ଘ୧୧|୪୩ ରୁ ଘ୨|୭ ମଧ୍ୟେ , ସୂର୍ଯ୍ୟାସ୍ତରୁ  ରାତ୍ରି ଘ୮|୨ ମଧ୍ୟେ , ଘ୧୧|୧୪ ରୁ ଘ୧|୩୮ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୪୩ ରୁ ଘ୪|୩୧ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୧୦|୧୩ ରୁ ଘ୧|୩୧ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୧|୩୧ ରୁ ଘ୩|୧୧ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୧୪ ରୁ ଘ୨|୩୬  ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 8,
      date: '08/07/2024',
      day: 'ସୋମବାର',
      name: 'ହିଜିରୀ ୧୪୪୬ ସାଲ ଆରମ୍ଭ',
      Image: require('../../assets/Images/3rathas.jpg'),
      tithi: '(୮) ଜୁଲାଇ , ସୋମବାର (ଆଷାଢ) ମିଥୁନ ଦି୨୪ନ , ମହରମ ତା୧ରିଖ , ସାୟନ ଆଷାଢ ଦି୧୭ନ',
      sunrise: 'ଘ୫|୧୭|୧୮',
      sunset: 'ଘ୬|୨୫|୩୮',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୮|୩୧ ରୁ ଘ୧୦|୦୭ ମଧ୍ୟେ , ରାତ୍ରି ଘ୯|୩୭ ରୁ ଘ୧୨|୪୯ ମଧ୍ୟେ , ଘ୨|୨୫ ରୁ ଘ୪|୧ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୪|୪୮ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୧୮ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୫୭ ରୁ ଘ୮|୩୬ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୩|୯ ରୁ ଘ୪|୪୭ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୩୧ ରୁ ଘ୧୧|୫୪ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 9,
      date: '09/07/2024',
      day: 'ମଙ୍ଗଳବାର',
      name: 'ବିପତ୍ତାରିଣୀ ବ୍ରତ',
      Image: require('../../assets/Images/PuriTemple.png'),
      tithi: '(୯) ଜୁଲାଇ , ମଙ୍ଗଳବାର (ଆଷାଢ) ମିଥୁନ ଦି୨୫ନ , ମହରମ ତା୨ରିଖ , ସାୟନ ଆଷାଢ ଦି୧୮ନ',
      sunrise: 'ଘ୫|୧୭|୪୦',
      sunset: 'ଘ୬|୨୫|୩୬ ',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୪୩ ମଧ୍ୟେ , ଘ୯|୧୯ ରୁ ଘ୧୧|୪୩ ମଧ୍ୟେ , ଘ୧|୫୫ ରୁ ଘ୨|୪୩ ମଧ୍ୟେ , ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୭|୧୩ ମଧ୍ୟେ , ଘ୧୧|୪୯ ରୁ ଘ୨|୧୩ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୧|୭ ରୁ ଘ୧|୫୫ ମଧ୍ୟେ , ଘ୨|୪୩ ରୁ ଘ୩|୩୧ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୪୯ ରୁ ଘ୯|୨୫ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୩୦ ରୁ ଘ୩|୯ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୬|୫୬ ରୁ ଘ୮|୩୫ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୪୭ ରୁ ଘ୯|୯ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 10,
      date: '10/07/2024',
      day: 'ବୁଧବାର',
      name: 'ମାଘ ପଞ୍ଚମୀ ସ୍ନାନ',
      Image: require('../../assets/Images/PuriBeach.png'),
      tithi: '(୧୦) ଜୁଲାଇ , ବୁଧବାର (ଆଷାଢ) ମିଥୁନ ଦି୨୬ନ , ମହରମ ତା୩ରିଖ , ସାୟନ ଆଷାଢ ଦି୧୯ନ',
      sunrise: 'ଘ୫|୧୮|୨',
      sunset: 'ଘ୬|୨୫|୩୨',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୭|୪୪ ରୁ ଘ୧୦|୫୬ ମଧ୍ୟେ , ଘ୧|୨୦ ରୁ ଘ୪|୩୨ ମଧ୍ୟେ , ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୧୦|୨୫ ମଧ୍ୟେ , ଘ୧୨|୪୯ ରୁ ଘ୨|୨୫ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୩୮ ରୁ ଘ୧୦|୧୫ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୧୧|୫୮ ରୁ ଘ୧|୩୦ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୩୮ ରୁ ଘ୪|୧ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 11,
      date: '11/07/2024',
      day: 'ଗୁରୁବାର',
      name: 'ହେରା ପଞ୍ଚମୀ , ଗୁରୁ ପଞ୍ଚମୀ ବ୍ରତ , ଶୁକ୍ଳ ତରୁଣ , ଶୁଦ୍ଧକାଳ ଆରମ୍ଭ',
      Image: require('../../assets/Images/Mahaprasad.png'),
      tithi: '(୧୧) ଜୁଲାଇ , ଗୁରୁବାର (ଆଷାଢ) ମିଥୁନ ଦି୨୭ନ , ମହରମ ତା୪ରିଖ , ସାୟନ ଆଷାଢ ଦି୨୦ନ',
      sunrise: 'ଘ୫|୧୮|୨୩',
      sunset: 'ଘ୬|୨୫|୨୭',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୨|୫୨ ରୁ ଘ୫|୧୬ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୧୫ ରୁ ଘ୯|୩୯ ମଧ୍ୟେ , ଘ୧୨|୫୨ ରୁ ଘ୩|୧୬ ମଧ୍ୟେ , ଘ୪|୫୨ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୧୯ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୩|୯ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୬|୨୫ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୫୩ ରୁ ଘ୧|୧୫ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 12,
      date: '12/07/2024',
      day: 'ଶୁକ୍ରବାର',
      name: '',
      Image: require('../../assets/Images/LaxmiPuja.png'),
      tithi: '(୧୨) ଜୁଲାଇ , ଶୁକ୍ରବାର (ଆଷାଢ) ମିଥୁନ ଦି୨୮ନ , ମହରମ ତା୫ରିଖ , ସାୟନ ଆଷାଢ ଦି୨୧ନ',
      sunrise: 'ଘ୫|୧୮|୪୪',
      sunset: ' ଘ୬|୨୫|୨୨',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୫୭ ମଧ୍ୟେ , ଘ୭|୪୫ ରୁ ଘ୧୦|୯ ମଧ୍ୟେ , ଘ୧୨|୩୩ ରୁ ଘ୨|୧୯ ମଧ୍ୟେ , ଘ୩|୫୫ ରୁ ଘ୫|୩୧ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୦ ରୁ ଘ୯|୩୬ ମଧ୍ୟେ , ଘ୩|୪୦ ରୁ ଘ୪|୨୮ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର)ରାତ୍ରି ଘ୧୧|୧୨ ରୁ ଘ୧୨|୦ ମଧ୍ୟେ , ଘ୪|୨୭ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୧୯ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୮|୩୭ ରୁ ଘ୧୧|୫୩ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୧|୩୧ ରୁ ଘ୩|୧୧ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୯|୯ ରୁ ଘ୧୦|୩୧ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 13,
      date: '13/07/2024',
      day: 'ଶନିବାର',
      name: '',
      Image: require('../../assets/Images/rathaImg.jpeg'),
      tithi: '(୧୩) ଜୁଲାଇ , ଶନିବାର (ଆଷାଢ) ମିଥୁନ ଦି୨୯ନ , ମହରମ ତା୬ରିଖ , ସାୟନ ଆଷାଢ ଦି୨୨ନ',
      sunrise: 'ଘ୫|୧୯|୪',
      sunset: 'ଘ୬|୨୫|୧୬',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୯|୨୧ ରୁ ଘ୧୨|୩୩ ପର୍ଯ୍ୟନ୍ତ , ରାତ୍ରି ଘ୮|୪୮ ରୁ ଘ୧୧|୧୨ ମଧ୍ୟେ , ଘ୧୨|୪୮ ରୁ ଘ୨|୨୪ ମଧ୍ୟେ , ଘ୩|୧୨ ରୁ ଘ୪|୪୮ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା)ପ୍ରାତଃରୁ ଘ୫|୧୯ ରୁ ଘ୬|୫୮ ମଧ୍ୟେ , ଦିବା ଘ୪|୪୯ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୬|୨୫ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୧|୩୦ ରୁ ଘ୩|୧୦ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ସନ୍ଧ୍ୟା ଘ୬|୨୫ ରୁ ଘ୭|୪୬ ମଧ୍ୟେ , ରାତ୍ରି ଘ୩|୫୩ ରୁ ନିଶାନ୍ତ ଘ୫|୧୯ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 14,
      date: '14/07/2024',
      day: 'ରବିବାର',
      name: 'ଶ୍ରୀଜୀଉଙ୍କର (ସନ୍ଧ୍ୟା) ଦର୍ଶନ , ପର୍ଶୁରାମାଷ୍ଟମୀ , ଇନ୍ଦ୍ରଦ୍ୟୁମ୍ନ ମହୋତ୍ସବ',
      Image: require('../../assets/Images/3rathas.jpg'),
      tithi: '(୧୪) ଜୁଲାଇ , ରବିବାର (ଆଷାଢ) ମିଥୁନ ଦି୩୦ନ , ମହରମ ତା୭ରିଖ , ସାୟନ ଆଷାଢ ଦି୨୩ନ',
      sunrise: 'ଘ୫|୧୯|୨୬',
      sunset: 'ଘ୬|୨୫|୮',
      gdTime: '(ଅମୃତ)ପ୍ରାତଃ ଘ୬|୫୬ ରୁ ଘ୯|୨୦ ମଧ୍ୟେ , ଦିବା ଘ୧୧|୪୪ ରୁ ଘ୨|୮ ମଧ୍ୟେ , ସୂର୍ଯ୍ୟାସ୍ତ ଘ୬|୨୫ ରୁ ରାତ୍ରି ଘ୮|୧ ମଧ୍ୟେ , ଘ୧୧|୧୩ ରୁ ଘ୧|୩୭ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୪|୩୨ ରୁ ଅପରାହ୍ନ ଘ୫|୨୦ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୧୪ ରୁ ଘ୧|୨୮ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୧୬ ରୁ ଘ୨|୩୯ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 15,
      date: '15/07/2024',
      day: 'ସୋମବାର',
      name: 'ଶ୍ରୀଜଗନ୍ନାଥ ମହାପ୍ରଭୁଙ୍କର ବାହୁଡା ରଥଯାତ୍ରା , ମାସାନ',
      Image: require('../../assets/Images/PuriTemple.png'),
      tithi: '(୧୫) ଜୁଲାଇ , ସୋମବାର (ଆଷାଢ) ମିଥୁନ ଦି୩୧ନ , ମହରମ ତା୮ରିଖ , ସାୟନ ଆଷାଢ ଦି୨୪ନ',
      sunrise: 'ଘ୫|୧୯|୪୯',
      sunset: 'ଘ୬|୨୪|୫୯',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୮|୩୨ ରୁ ଘ୧୦|୮ ମଧ୍ୟେ , ରାତ୍ରି ଘ୯|୩୭ ରୁ ଘ୧୨|୪୯ ମଧ୍ୟେ , ରାତ୍ରି ଘ୨|୨୫ ରୁ ଘ୪|୧ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୪|୪୯ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୨୦ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୦ ରୁ ଘ୮|୩୮ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୩|୮ ରୁ ଘ୪|୪୬ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୩୧ ରୁ ଘ୧୧|୫୩ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 16,
      date: '16/07/2024',
      day: 'ମଙ୍ଗଳବାର',
      name: 'ଦକ୍ଷିଣାୟନ କର୍କଟ ସଂକ୍ରାନ୍ତି , ଶ୍ରୀମନ୍ଦିରରେ ଦକ୍ଷିଣାୟନ ବନ୍ଦାପନା , ଅଶୁଦ୍ଧ କାଳ ଆରମ୍ଭ',
      Image: require('../../assets/Images/PuriBeach.png'),
      tithi: '(୧୬) ଜୁଲାଇ , ମଙ୍ଗଳବାର (ଶ୍ରାବଣ) କର୍କଟ ଦି୧ନ , ମହରମ ତା୯ରିଖ , ସାୟନ ଆଷାଢ ଦି୨୫ନ',
      sunrise: 'ଘ୫|୨୦|୧୧',
      sunset: 'ଘ୬|୨୪|୪୯',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୭|୪୪ ରୁ ଘ୧୦|୮ ମଧ୍ୟେ , ଘ୧୨|୩୨ ରୁ ଘ୨|୮ ମଧ୍ୟେ , ଘ୨|୫୬ ରୁ ଘ୪|୩୨ ମଧ୍ୟେ , ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୭|୧୩ ମଧ୍ୟେ , ଘ୯|୩୭ ରୁ ଘ୧୨|୧ ପର୍ଯ୍ୟନ୍ତ , ଘ୨|୨୫ ରୁ ଘ୪|୧ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୩୦ ରୁ ଘ୩|୮ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୭|୦ ରୁ ଘ୮|୩୮ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୪୬ ରୁ ଘ୯|୮ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 17,
      date: '17/07/2024',
      day: 'ବୁଧବାର',
      name: 'ଶ୍ରୀମନ୍ଦିରରେ ଓ ସର୍ବସମ୍ମତ ପଦ୍ମା ଏକାଦଶୀ , ହରିଶୟନ (ବଡ) ଏକାଦଶୀ , ଚତୁର୍ମାସ ବ୍ରତ ଆରମ୍ଭ , ରଥ ଉପରେ ଶ୍ରୀଜୀଉଙ୍କର ସୁନାବେଶ , ମହରମ ପର୍ବ',
      Image: require('../../assets/Images/Mahaprasad.png'),
      tithi: '(୧୭) ଜୁଲାଇ , ବୁଧବାର (ଶ୍ରାବଣ) କର୍କଟ ଦି୨ନ , ମହରମ ତା୧୦ରିଖ , ସାୟନ ଆଷାଢ ଦି୨୬ନ',
      sunrise: 'ଘ୫|୨୦|୩୫',
      sunset: 'ଘ୬|୨୪|୩୭ ',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୫୯ ମଧ୍ୟେ , ଘ୧୧|୪୭ ରୁ ଘ୧|୨୩ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୧୧ ରୁ ଘ୯|୩୫ ମଧ୍ୟେ , ଘ୧|୨୩ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୨୧ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୪୭ ରୁ ଘ୫|୨୨ ମଧ୍ୟେ , ରାତ୍ରି ଘ୯|୩୫ ରୁ ଘ୧୦|୧୧ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୩୮ ରୁ ଘ୧୦|୧୫ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୫୩ ରୁ ଘ୧|୩୦ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୩୮ ରୁ ଘ୪|୧ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 18,
      date: '18/07/2024',
      day: 'ଗୁରୁବାର',
      name: 'ରଥ ଉପରେ ଶ୍ରୀଜୀଉଙ୍କର ଅଧରପଣା , ଶ୍ରୀ ଗରୁଡଶୟନ ଉତ୍ସବ',
      Image: require('../../assets/Images/LaxmiPuja.png'),
      tithi: '(୧୮) ଜୁଲାଇ , ଗୁରୁବାର (ଶ୍ରାବଣ) କର୍କଟ ଦି୩ନ , ମହରମ ତା୧୧ରିଖ , ସାୟନ ଆଷାଢ ଦି୨୭ନ',
      sunrise: 'ଘ୫|୨୦|୫୯',
      sunset: 'ଘ୬|୨୪|୨୩',
      gdTime: '(ଅମୃତ) ରାତ୍ରି ଘ୧|୩୫ ରୁ ଘ୩|୫୯ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୫୮ ମଧ୍ୟେ , ଘ୯|୫୧ ରୁ ଘ୧୨|୧୫ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୩|୮ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୬|୨୪ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୫୩ ରୁ ଘ୧|୧୬ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 19,
      date: '19/07/2024',
      day: 'ଶୁକ୍ରବାର',
      name: 'ଶ୍ରୀଜୀଉଙ୍କର ନୀଳାଦ୍ରି ବିଜେ ଉତ୍ସବ , ଶ୍ରୀଶିବଶୟନ ଉତ୍ସବ',
      Image: require('../../assets/Images/Konark.png'),
      tithi: '(୧୯) ଜୁଲାଇ , ଶୁକ୍ରବାର (ଶ୍ରାବଣ) କର୍କଟ ଦି୪ନ , ମହରମ ତା୧୨ରିଖ , ସାୟନ ଆଷାଢ ଦି୨୮ନ',
      sunrise: 'ଘ୫|୨୧|୨୨',
      sunset: 'ଘ୬|୨୪|୧୦',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୫୮ ମଧ୍ୟେ , ଘ୭|୪୭ ରୁ ଘ୧୦|୧୧ ମଧ୍ୟେ , ଘ୧୨|୩୫ ରୁ ଘ୨|୧୧ ମଧ୍ୟେ , ଘ୩|୪୭ ରୁ ଘ୫|୨୪ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୫୯ ରୁ ଘ୯|୩୫ ମଧ୍ୟେ , ଘ୩|୫୯ ରୁ ଘ୪|୩୭ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୧୧|୧୧ ରୁ ଘ୧୧|୫୯ ମଧ୍ୟେ , ଘ୪|୩୭ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୨୨ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୩୮ ରୁ ଘ୧୧|୫୩ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧|୩୧ ରୁ ଘ୩|୧୧ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୯|୮ ରୁ ଘ୧୦|୩୦ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 20,
      date: '20/07/2024',
      day: 'ଶନିବାର',
      name: '',
      Image: require('../../assets/Images/KhajaBhoga.png'),
      tithi: '(୨୦) ଜୁଲାଇ , ଶନିବାର (ଶ୍ରାବଣ) କର୍କଟ ଦି୫ନ , ମହରମ ତା୧୩ରିଖ , ସାୟନ ଆଷାଢ ଦି୨୯ନ',
      sunrise: 'ଘ୫|୨୧|୪୪',
      sunset: 'ଘ୬|୨୩|୫୬',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୯|୨୪ ରୁ ଘ୧୨|୩୬ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୪୬ ରୁ ଘ୧୧|୧୦ ମଧ୍ୟେ , ଘ୧୨|୪୬ ରୁ ଘ୨|୨୨ ମଧ୍ୟେ , ଘ୩|୧୦ ରୁ ଘ୪|୪୬ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା)ପ୍ରାତଃରୁ ଦିବା ଘ୭|୧ ମଧ୍ୟେ , ଘ୪|୪୬ ରୁ ଘ୬|୨୪ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୧|୩୧ ରୁ ଘ୩|୮ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ଅସ୍ତରୁ ରାତ୍ରି ଘ୭|୪୫ ମଧ୍ୟେ ,ଘ୪|୧ ରୁ ଘ୫|୨୨ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 21,
      date: '21/07/2024',
      day: 'ରବିବାର',
      name: 'ବ୍ୟାସ (ଗୁରୁ) ପୂର୍ଣ୍ଣିମା , ଗୁରୁପୂଜା , ଆଷାଢ ପୂର୍ଣ୍ଣିମା , ଗୋବର୍ଦ୍ଧନ ପୀଠେ ଗୁରୁପୂଜା , ଶରଣ ଆରମ୍ଭ',
      Image: require('../../assets/Images/KhajaBhoga.png'),
      tithi: '(୨୧) ଜୁଲାଇ , ରବିବାର (ଶ୍ରାବଣ) କର୍କଟ ଦି୬ନ , ମହରମ ତା୧୪ରିଖ , ସାୟନ ଆଷାଢ ଦି୩୦ନ',
      sunrise: 'ଘ୫|୨୨|୬',
      sunset: 'ଘ୬|୨୩|୪୦',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୬|୧୨ ରୁ ଘ୯|୨୪ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୫୮ ରୁ ଘ୯|୩୪ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୧୨ ମଧ୍ୟେ , ଘ୧୨|୩୬ ରୁ ଘ୧|୨୪ ,ରାତ୍ରି ଘ୭|୧୦ ରୁ ଘ୭|୫୮ ମଧ୍ୟେ , ଘ୧୨|୪୬ ରୁ ଘ୩|୫୮ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୧୬ ରୁ ଘ୧|୩୦ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୧୬ ରୁ ଘ୨|୩୯ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 22,
      date: '22/07/2024',
      day: 'ସୋମବାର',
      name: '',
      Image: require('../../assets/Images/rathaImg.jpeg'),
      tithi: '(୨୨) ଜୁଲାଇ , ସୋମବାର (ଶ୍ରାବଣ) କର୍କଟ ଦି୭ନ , ମହରମ ତା୧୫ରିଖ , ସାୟନ ଆଷାଢ ଦି୩୧ନ',
      sunrise: 'ଘ୫|୨୨|୨୮',
      sunset: 'ଘ୬|୨୩|୨୪',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୦ ମଧ୍ୟେ , ଘ୧୦|୧୩ ରୁ ଘ୧୨|୩୭ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୧୦ ରୁ ଘ୯|୩୪ ମଧ୍ୟେ , ଘ୧୧|୫୮ ରୁ ଘ୩|୧୦ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୧ ରୁ ଘ୪|୩୭ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୦ ରୁ ଘ୮|୩୭ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୩|୭ ରୁ ଘ୪|୪୪ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୩୦ ରୁ ଘ୧୧|୫୩ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 23,
      date: '23/07/2024',
      day: 'ମଙ୍ଗଳବାର',
      name: '',
      Image: require('../../assets/Images/3rathas.jpg'),
      tithi: '(୨୩) ଜୁଲାଇ , ମଙ୍ଗଳବାର (ଶ୍ରାବଣ) କର୍କଟ ଦି୮ନ , ମହରମ ତା୧୬ରିଖ , ସାୟନ ଶ୍ରାବଣ ଦି୧ନ',
      sunrise: 'ଘ୫|୨୨|୫୦',
      sunset: 'ଘ୬|୨୩|୮',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୭|୫୯ ରୁ ଘ୧୦|୨୩ ମଧ୍ୟେ , ଘ୧୨|୪୭ ରୁ ଘ୨|୨୩ ମଧ୍ୟେ , ଘ୩|୧୧ ରୁ ଘ୪|୪୭ ମଧ୍ୟେ , ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୭|୯ ମଧ୍ୟେ , ଘ୯|୩୩ ରୁ ଘ୧୧|୫୭ ମଧ୍ୟେ , ଘ୨|୨୧ ରୁ ଘ୩|୫୭ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୩୦ ରୁ ଘ୩|୭ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୭|୨ ରୁ ଘ୮|୩୯ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୪୪ ରୁ ନିଶାନ୍ତ ଘ୯|୭ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 24,
      date: '24/07/2024',
      day: 'ବୁଧବାର',
      name: '',
      Image: require('../../assets/Images/PuriTemple.png'),
      tithi: '(୨୪) ଜୁଲାଇ , ବୁଧବାର (ଶ୍ରାବଣ) କର୍କଟ ଦି୯ନ , ମହରମ ତା୧୭ରିଖ , ସାୟନ ଶ୍ରାବଣ ଦି୨ନ',
      sunrise: 'ଘ୫|୨୩|୧୩',
      sunset: 'ଘ୬|୨୨|୪୯',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୦ ମଧ୍ୟେ , ଘ୧୧|୪୯ ରୁ ଘ୧|୨୫ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୯ ରୁ ଘ୯|୩୩ ମଧ୍ୟେ , ଘ୨|୨୧ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୨୪ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୪୯ ରୁ ଅପରାହ୍ନ ଘ୫|୨୫ ମଧ୍ୟେ , ରାତ୍ରି ଘ୯|୩୩ ରୁ ଘ୧୧|୯ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୪୨ ରୁ ଘ୧୦|୧୬ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୧୧|୫୩ ରୁ ଘ୧|୩୦ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୩୯ ରୁ ଘ୪|୩ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 25,
      date: '25/07/2024',
      day: 'ଗୁରୁବାର',
      name: 'ମନସା ପଞ୍ଚମୀ (ନାଗପୂଜା) , ଶରଣ ଶେଷ',
      Image: require('../../assets/Images/PuriBeach.png'),
      tithi: '(୨୫) ଜୁଲାଇ , ଗୁରୁବାର (ଶ୍ରାବଣ) କର୍କଟ ଦି୧୦ନ , ମହରମ ତା୧୮ରିଖ , ସାୟନ ଶ୍ରାବଣ ଦି୩ନ',
      sunrise: 'ଘ୫|୨୩|୩୭',
      sunset: 'ଘ୬|୨୨|୨୯',
      gdTime: '(ଅମୃତ) ରାତ୍ରି ଘ୧|୩୨ ରୁ ଘ୩|୫୬ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧ ମଧ୍ୟେ , ଘ୧୦|୧୩ ରୁ ଘ୧୨|୩୭ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୩|୬ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୬|୨୨ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୫୪ ରୁ ଘ୧|୧୫ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 26,
      date: '26/07/2024',
      day: 'ଶୁକ୍ରବାର',
      name: '',
      Image: require('../../assets/Images/Mahaprasad.png'),
      tithi: '(୨୬) ଜୁଲାଇ , ଶୁକ୍ରବାର (ଶ୍ରାବଣ) କର୍କଟ ଦି୧୧ନ , ମହରମ ତା୧୯ରିଖ , ସାୟନ ଶ୍ରାବଣ ଦି୪ନ',
      sunrise: 'ଘ୫|୨୩|୫୯',
      sunset: 'ଘ୬|୨୨|୭',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୨ ମଧ୍ୟେ , ଘ୭|୫୦ ରୁ ଘ୧୦|୧୪ ମଧ୍ୟେ , ଘ୧୨|୩୮ ରୁ ଘ୨|୧୪ ମଧ୍ୟେ , ଘ୩|୫୦ ରୁ ଘ୫|୨୬ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୫୬ ରୁ ଘ୯|୩୨ ମଧ୍ୟେ , ଘ୩|୫୬ ରୁ ଘ୪|୪୪ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୧୧|୮ ରୁ ଘ୧୧|୫୬ ମଧ୍ୟେ , ଘ୪|୪୩ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୨୪ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୮|୩୯ ରୁ ଘ୧୧|୫୪ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୯|୬ ରୁ ଘ୧୦|୩୦ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 27,
      date: '27/07/2024',
      day: 'ଶନିବାର',
      name: '',
      Image: require('../../assets/Images/LaxmiPuja.png'),
      tithi: '(୨୭) ଜୁଲାଇ , ଶନିବାର (ଶ୍ରାବଣ) କର୍କଟ ଦି୧୨ନ , ମହରମ ତା୨୦ରିଖ , ସାୟନ ଶ୍ରାବଣ ଦି୫ନ',
      sunrise: 'ଘ୫|୨୪|୨୧',
      sunset: 'ଘ୬|୨୧|୪୫',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୯|୨୬ ରୁ ଘ୧୨|୩୮ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୪୪ ରୁ ଘ୧୧|୮ ମଧ୍ୟେ , ଘ୧୨|୪୪ ରୁ ଘ୨|୨୦ ମଧ୍ୟେ , ଘ୩|୮ ରୁ ଘ୪|୪୪ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା)ପ୍ରାତଃରୁ ଦିବା ଘ୫|୨୪ ରୁ ଘ୭|୨ ମଧ୍ୟେ , ଦିବା ଘ୪|୪୪ ଘ୬|୨୨ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧|୩୦ ରୁ ଘ୩|୭ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସୂର୍ଯ୍ୟାସ୍ତ ଘ୬|୨୨ ରୁ ଘ୭|୪୪ ମଧ୍ୟେ , ରାତ୍ରି ଘ୪|୨ରୁ ଘ୫|୨୫ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 28,
      date: '28/07/2024',
      day: 'ରବିବାର',
      name: '',
      Image: require('../../assets/Images/Konark.png'),
      tithi: '(୨୮) ଜୁଲାଇ , ରବିବାର (ଶ୍ରାବଣ) କର୍କଟ ଦି୧୩ନ , ମହରମ ତା୨୧ରିଖ , ସାୟନ ଶ୍ରାବଣ ଦି୬ନ',
      sunrise: 'ଘ୫|୨୪|୪୩',
      sunset: 'ଘ୬|୨୧|୨୩',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୭|୩ ରୁ ଘ୧୦|୧୫ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୫୫ ରୁ ଘ୯|୩୧ ମଧ୍ୟେ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୧୫ ମଧ୍ୟେ , ଘ୧|୨୭ ରୁ ଘ୨|୧୫ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୭ ରୁ ଘ୭|୫୫ ମଧ୍ୟେ , ଘ୧୨|୪୩ ରୁ ଘ୩|୧୫ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୧୫ ରୁ ଘ୧|୨୯ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୧୯ ରୁ ଘ୨|୪୭ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 29,
      date: '29/07/2024',
      day: 'ସୋମବାର',
      name: '',
      Image: require('../../assets/Images/KhajaBhoga.png'),
      tithi: '(୨୯) ଜୁଲାଇ , ସୋମବାର (ଶ୍ରାବଣ) କର୍କଟ ଦି୧୪ନ , ମହରମ ତା୨୨ରିଖ , ସାୟନ ଶ୍ରାବଣ ଦି୭ନ',
      sunrise: 'ଘ୫|୨୫|୪',
      sunset: 'ଘ୬|୨୧|୦',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୩ ମଧ୍ୟେ , ଘ୧୦|୧୫ ରୁ ଘ୧୨|୩୯ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୮ ରୁ ଘ୯|୩୨ ମଧ୍ୟେ , ଘ୧୧|୫୬ ରୁ ଘ୩|୮ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୩ ରୁ ଘ୪|୩୯ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୩୮ ରୁ ଘ୮|୪୦ | (ବାରବେଳା) ଦିବା ଘ୩|୫ ରୁ ଘ୪|୪୧ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୩୦ ରୁ ଘ୧୧|୫୩ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 30,
      date: '30/07/2024',
      day: 'ମଙ୍ଗଳବାର',
      name: '',
      Image: require('../../assets/Images/rathaImg.jpeg'),
      tithi: '(୩୦) ଜୁଲାଇ , ମଙ୍ଗଳବାର (ଶ୍ରାବଣ) କର୍କଟ ଦି୧୫ନ , ମହରମ ତା୨୩ରିଖ , ସାୟନ ଶ୍ରାବଣ ଦି୮ନ',
      sunrise: 'ଘ୫|୨୫|୨୪',
      sunset: 'ଘ୬|୨୦|୩୬',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୭|୫୧ ରୁ ଘ୧୦|୧୫ ମଧ୍ୟେ , ଘ୧୨|୩୯ ରୁ ଘ୨|୧୫ ମଧ୍ୟେ , ଘ୩|୩ ରୁ ଘ୪|୩୯ ମଧ୍ୟେ , ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୭|୭ ମଧ୍ୟେ , ଘ୯|୩୦ ରୁ ଘ୧୧|୫୪ ମଧ୍ୟେ , ଘ୨|୧୮ ରୁ ଘ୩|୫୪ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୧୨|୨୪ ରୁ ଘ୩|୫ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୭|୩ ରୁ ଘ୮|୪୦ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୪୧ ରୁ ଘ୯|୫ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 31,
      date: '31/07/2024',
      day: 'ବୁଧବାର',
      name: 'ଶ୍ରୀମନ୍ଦିରରେ ଓ ସର୍ବସମ୍ମତ କାମଦା (ଚକ୍ରବୁଲା) ଏକାଦଶୀ',
      Image: require('../../assets/Images/3rathas.jpg'),
      tithi: '(୩୧) ଜୁଲାଇ , ବୁଧବାର (ଶ୍ରାବଣ) କର୍କଟ ଦି୧୬ନ , ମହରମ ତା୨୪ରିଖ , ସାୟନ ଶ୍ରାବଣ ଦି୯ନ',
      sunrise: 'ଘ୫|୨୫|୪୭',
      sunset: 'ଘ୬|୨୦|୯',
      gdTime: ' (ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୪ ମଧ୍ୟେ , ଘ୧୧|୫୨ ରୁ ଘ୧|୨୮ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୬ ରୁ ଘ୯|୩୦ ମଧ୍ୟେ , ଘ୨|୧୭ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୨୬ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୩୨ରୁ ଘ୫|୮ ମଧ୍ୟେ , ରାତ୍ରି ଘ୯|୩୦ ରୁ ଘ୧୧|୬ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୪୦ ରୁ ଘ୧୦|୧୬ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୫୩ ରୁ ଘ୧|୨୯ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୪୦ ରୁ ଘ୪|୪ ପର୍ଯ୍ୟନ୍ତ |',
    },
  ]

  const eventsForEnglishMonth = [
    {
      id: 1,
      date: '01/07/2024',
      day: 'Monday',
      name: "At the Jagannath Temple, it's the Snana Purnima, followed by Anavasara, marking the 10th day of the lunar month.",
      spclDesc: '',
      Image: require('../../assets/Images/PuriTemple.png'),
      tithi: 'On July 1st, Monday (Ashadha), Gemini, 17th day of the lunar month, 24th in the Gregorian calendar. ',
      sunrise: '6:25:31 AM',
      sunset: '5:14:55 PM.',
      gdTime: '(Amrita) - From 8:28 AM to 10:04 AM, from 9:18 PM to 12:50 AM, from 2:26 PM to 4:02 PM. (Mahendra) From 4:50 PM to 5:15 PM. ',
      bdTime: '(Bara and Kalabela) - From 6:58 AM to 8:36 AM, from 3:09 PM to 4:47 PM, from 10:31 PM to 11:51 PM. ',
    },
    {
      id: 2,
      date: '02/07/2024',
      day: 'Tuesday',
      name: "At the Jagannath Temple, on the Ekadashi following the Snana Purnima, it's the Devasnana Purnima, followed by the Anavasara Ekadashi.",
      spclDesc: '',
      Image: require('../../assets/Images/PuriBeach.png'),
      tithi: 'July 2nd, Tuesday (Ashadha), Tithi 18, Evening Ashadha 11th day.  ',
      sunrise: '5:15 AM',
      sunset: ' 6:35 PM.',
      gdTime: '(Amrit) - from sunrise to 7:40 AM, from 10:53 to 11:41 AM, from sunset to 6:26 PM, from 7:16 to 12:50 AM (next day), (Mahendra) - from 10:05 to 10:53 AM, from 11:41 AM to 12:29 PM, from 8:50 to 10:26 PM.  ',
      bdTime: ' (Kalbela) - from 1:30 to 3:09 PM, (Barbela) - from 6:56 to 8:35 PM, (Kalratri) - from 7:47 to 9:09 PM. ',
    },
    {
      id: 3,
      date: '03/07/2024',
      day: 'Wednesday',
      name: "Ansar Davadashi, Srijiu's royal palace in the temple",
      spclDesc: '',
      Image: require('../../assets/Images/Mahaprasad.png'),
      tithi: '(3) July, Wednesday (Asad) Gemini Day, Sayan Asad Day 112 ',
      sunrise: '05:15:35',
      sunset: ' 6:25:37 ',
      gdTime: ' (Amrit)  Daylight 7:41 to 10:53, 1:17 to 4:29, Sunset 6:26 to 10:24, 12:50 to 2:26. ',
      bdTime: '(Kalbela) - from 8:34 am to 10:10 am (Barbela) Diba from 11:52 to 1:30 (Midnight) Night from 2:35 AM to 3:56 AM',
    },
    {
      id: 4,
      date: '04/07/2024',
      day: 'Thursday',
      name: "Srijiu's Ansar Troyadashi, Ghanalagi, Ansar Chaturdashi",
      spclDesc: '',
      Image: require('../../assets/Images/LaxmiPuja.png'),
      tithi: '(4) July, Thursday (Ashadha), Gemini 20, till June 27, evening Ashadha 13 ',
      sunrise: ' 5:15:55',
      sunset: '6:25:41',
      gdTime: 'From 5:54 AM to 5:18 PM, from 7:14 PM to 9:38 PM, from 12:50 PM to 3:14 PM, from 4:50 PM to 5:16 AM next day. (Mahendra) From Sunrise to 6:06 AM, from 9:18 PM to 10:54 PM.',
      bdTime: ' From 3:12 AM to 6:26 PM (Barbela and Kaalbela). (Kalaraatri) From 11:52 PM to 1:13 AM next day.',
    },
    {
      id: 5,
      date: '05/07/2024',
      day: 'Friday',
      name: 'Ashadha Amavasya ',
      spclDesc: '',
      Image: require('../../assets/Images/Konark.png'),
      tithi: '(5) July, Friday (Ashadha), Gemini 21, till June 28, evening Ashadha 14 ',
      sunrise: '5:16:14',
      sunset: '6:25:42',
      gdTime: 'From 11:42 AM to 12:06 PM, from 6:25 PM to 8:50 PM, from 1:38 PM to 4:02 PM, from 4:50 PM to 5:17 AM next day. (Mahendra) From Sunrise to 6:54 AM, from 9:18 PM to 10:06 PM. ',
      bdTime: 'From 8:35 AM to 11:51 AM (Bar and Kaalbela). (Kalaraatri) From 9:08 PM to 10:32 PM. ',
    },
    {
      id: 6,
      date: '06/07/2024',
      day: 'Saturday',
      name: 'Snana Yatra , Gajanan Besha & Anabasara Arambha',
      spclDesc: '',
      Image: require('../../assets/Images/KhajaBhoga.png'),
      tithi: '(6) July, Saturday (Ashadha), Gemini 22, till 29, evening Ashadha 15 ',
      sunrise: '5:16:32',
      sunset: ' 6:25:44',
      gdTime: 'From 5:54 AM to 5:18 PM, from 7:14 PM to 8:02 PM, from 12:02 PM to 12:26 PM, from 4:02 PM to 5:17 AM next day. (Mahendra) From Sunrise to 6:06 AM, from 9:18 PM to 11:42 PM.',
      bdTime: ' From 6:56 AM to 6:26 PM (Kaalbela), from 4:47 PM to 6:26 PM (Barbela). (Kalaraatri) Evening 6:26 PM to 7:47 PM, from 3:56 AM to 5:17 AM.',
    },
    {
      id: 7,
      date: '07/07/2024',
      day: 'Sunday',
      name: "Shrijiu's Netrotsava, Shri Gundicha (Rath) Yatra Mahotsav, Dwitiya Chandradarshan",
      spclDesc: '',
      Image: require('../../assets/Images/rathaImg.jpeg'),
      tithi: '(7) July, Sunday (Ashadha), Gemini 23, till June 30, evening Ashadha 16 ',
      sunrise: ' 5:16:55',
      sunset: ' 6:25:41',
      gdTime: 'From 6:55 AM to 9:19 AM, from 11:43 AM to 12:07 PM, from 6:25 PM to 8:02 PM, from sunset to 8:38 PM. (Mahendra) From 3:43 AM to 4:31 AM. ',
      bdTime: 'From 10:13 AM to 11:31 AM (Kaalbela), from 1:31 PM to 3:11 PM (Barbela). (Kalaraatri) Night 1:14 AM to 2:36 AM. ',
    },
    {
      id: 8,
      date: '08/07/2024',
      day: 'Monday',
      name: 'Snana Yatra , Gajanan Besha & Anabasara Arambha',
      spclDesc: '',
      Image: require('../../assets/Images/3rathas.jpg'),
      tithi: '(8) July, Monday (Ashadha), Gemini 24, until June 17, evening Ashadha. ',
      sunrise: '5:17:18',
      sunset: '6:25:38',
      gdTime: 'From 8:31 AM to 10:07 AM, from 9:37 PM to 12:49 AM next day, from 2:25 PM to 4:01 PM. (Mahendra) From 4:48 PM to 5:18 AM next day.',
      bdTime: 'From 7:57 AM to 10:36 AM (Kaalbela). (Barbela) From 3:09 PM to 4:47 PM. (Kaalratri) Night from 10:31 PM to 11:54 PM. ',
    },
    {
      id: 9,
      date: '09/07/2024',
      day: 'Tuesday',
      name: 'The Vipatāriṇī Vrata ',
      spclDesc: '',
      Image: require('../../assets/Images/PuriTemple.png'),
      tithi: '(9) July, Tuesday (Ashadha), Gemini 25, until the evening of Ashadha 18. ',
      sunrise: ' 5:17:40',
      sunset: '6:25:36',
      gdTime: 'From 7:43 AM to 11:43 AM, from 7:19 PM to 9:43 PM, from 1:55 PM to 2:43 PM, and from 7:13 PM to 8:13 PM. (Mahendra) From 1:07 PM to 1:55 PM, from 2:43 PM to 3:31 PM, and from 8:49 PM to 9:25 PM.',
      bdTime: 'From 1:30 AM to 3:09 AM (Kaalbela). From 6:56 AM to 8:35 AM (Barbela). From 7:47 PM to 9:09 PM (Kaalratri). ',
    },
    {
      id: 10,
      date: '10/07/2024',
      day: 'Wednesday',
      name: 'Magha Panchami Snana ',
      spclDesc: '',
      Image: require('../../assets/Images/PuriBeach.png'),
      tithi: '(10) July, Wednesday (Ashadha), Gemini 26, until the evening of Ashadha 19. ',
      sunrise: '5:18:02',
      sunset: '6:25:32',
      gdTime: 'From 7:44 AM to 10:56 AM, from 8:20 PM to 4:32 PM, from 10:25 PM to 12:25 AM. (Mahendra) From 7:25 PM to 7:49 PM, from 11:49 PM to 12:25 AM. ',
      bdTime: 'From 8:38 AM to 10:15 AM (Kaalbela). From 11:58 AM to 1:30 PM (Barbela). From 2:38 AM to 4:01 AM (Kaalratri). ',
    },
    {
      id: 11,
      date: '11/07/2024',
      day: 'Thursday',
      name: 'Hera Panchami, Guru Panchami Brata, Shukla Taruni, Shuddha Kala Begins ',
      spclDesc: '',
      Image: require('../../assets/Images/LaxmiPuja.png'),
      tithi: '(11) July, Thursday (Ashadha), Gemini 27, until the evening of Ashadha 20. ',
      sunrise: '5:18:23',
      sunset: '6:25:27',
      gdTime: 'From 2:52 PM to 5:16 PM, from 7:15 PM to 9:39 PM, from 12:52 AM to 3:16 AM, from 4:52 AM to sunrise (Mahendra) From 3:9 AM to sunrise, from 11:53 PM to 1:15 AM. ',
      bdTime: 'From 3:9 AM to sunrise and from sunrise to 6:25 PM (Barbela and Kaalbela). From 11:53 PM to 1:15 AM (Kaalratri). ',
    },
    {
      id: 12,
      date: '12/07/2024',
      day: ' Friday',
      name: 'Snana Yatra , Gajanan Besha & Anabasara Arambha',
      spclDesc: '',
      Image: require('../../assets/Images/Mahaprasad.png'),
      tithi: 'July 12th, Friday, Ashadha Month, Gemini 28, until the evening of Ashadha 21. ',
      sunrise: ' 5:18:44',
      sunset: '6:25:22',
      gdTime: 'From 6:57 AM to 10:09 AM, from 12:33 PM to 2:19 PM, from 3:55 PM to 5:31 PM, from 8:00 PM to 9:36 PM, from 3:40 AM to 4:28 AM (Mahendra) from 11:12 PM to 12:00 AM, from 4:27 AM to sunrise. ',
      bdTime: ' From 8:37 AM to 11:53 AM (Bar and Kaalbela), from 1:31 PM to 3:11 PM (Barbela), from 9:09 PM to 10:31 PM (Kaalratri).',
    },
    {
      id: 13,
      date: '13/07/2024',
      day: 'Saturday',
      name: '',
      spclDesc: '',
      Image: require('../../assets/Images/Konark.png'),
      tithi: '(13) July, Saturday (Ashadha) Gemini 29, Maharam sixth, evening Ashadha 22. ',
      sunrise: '5:19:04 AM',
      sunset: '6:25:16 PM',
      gdTime: '(Amrit) from 9:21:33 AM to 12:48:12 PM, evening 8:48:24 PM to 2:12:48 AM, afternoon 3:12:48 PM to 4:48:12 PM.',
      bdTime: '(Kalabela) from morning 5:19:58 to 6:58:25, daytime 4:49:00 to 6:25:00 PM, Barabela from morning 1:30:00 to 3:10:00 PM, nighttime 6:25:00 to 7:46:00 PM, night 3:53:00 to dawn 5:19:00 AM. ',
    },
    {
      id: 14,
      date: '14/07/2024',
      day: 'Sunday',
      name: "The sighting of Shrijeeu's (evening) Darshan, Parshuramastami, Indradyumna Festival.",
      spclDesc: '',
      Image: require('../../assets/Images/KhajaBhoga.png'),
      tithi: '(14) July, Sunday (Ashadha) Mithuna 30, Evening Ashadha 23 ',
      sunrise: '5:19:26 AM',
      sunset: ' 6:25:08 PM',
      gdTime: '(Amrit) Morning 6:56 to 9:20, Day 11:44 to 2:08, Sunset to Night 6:25 to 8:01, Night 11:13 to 1:37 (Mahaendra) Day 4:32 to Afternoon 5:20 ',
      bdTime: ' (Day and Night) Day 10:14 to 11:28, Night 1:16 to 2:39',
    },
    {
      id: 15,
      date: '15/07/2024',
      day: 'Monday',
      name: 'The grand bahuda jatra of Lord Jagannath, Rath Yatra, Masanta ',
      spclDesc: '',
      Image: require('../../assets/Images/Konark.png'),
      tithi: '(15) July, Monday (Ashadha) Mithuna 31, Evening Ashadha 24',
      sunrise: '5:19:49 AM',
      sunset: '6:24:59 PM',
      gdTime: '(Amrit) Morning 8:32 to 10:08, Night 9:37 to 12:49, Night 2:25 to 4:01 (Mahaendra) Night 4:49 to Night end 5:20 ',
      bdTime: '(Day and Night) Day 7:00 to 8:38, Day 3:08 to 4:46, Night 10:31 to 11:53 ',
    },
    {
      id: 16,
      date: '16/07/2024',
      day: 'Tuesday ',
      name: 'Southward migration, Cancer solstice, beginning of impure time (Asudhha Kala) in Shrimandir ',
      spclDesc: '',
      Image: require('../../assets/Images/rathaImg.jpeg'),
      tithi: '(16) July, Tuesday (Shravana) Cancer 1, Evening Ashadha 25 ',
      sunrise: '5:20:11 AM',
      sunset: '6:24:49 PM',
      gdTime: '(Amrit) Day 7:44 to 10:08, 12:32 to 2:08, 2:56 to 4:32, from sunset to night 7:13 to 12:01, 2:25 to 4:01 ',
      bdTime: '(Day and Night) Day 1:30 to 3:08, Day 7:00 to 8:38, Night 7:46 to 9:08 ',
    },
    {
      id: 17,
      date: '17/07/2024',
      day: 'Wednesday',
      name: "In the Jagannath temple and universally accepted Padma Ekadashi, Harishayani (Bada) Ekadashi, beginning of Chaturmasa fast, Sri Jagannath's golden attire atop the chariot, Maharam festival",
      spclDesc: '',
      Image: require('../../assets/Images/3rathas.jpg'),
      tithi: '(17) July, Wednesday (Shravana) Cancer 2, Evening Ashadha 26 ',
      sunrise: '5:20:35 AM',
      sunset: '6:24:37 PM',
      gdTime: '(Amrit) From sunrise to 6:59 AM, 11:47 to 12:23 PM, 7:11 to 9:35 PM, 11:23 PM to midnight 5:21, (Mahendra) Day 3:47 to 5:22 PM, Night 9:35 to 10:11 PM ',
      bdTime: '(Day and Night) Day 8:38 to 10:15 AM, Day 11:53 AM to 1:30 PM, Night 2:38 to 4:01 AM ',
    },
    {
      id: 18,
      date: '18/07/2024',
      day: 'Thursday',
      name: 'On the chariot Adharpana of Lord Jagannath, the festival of Shri Garudasthan ',
      spclDesc: '',
      Image: require('../../assets/Images/PuriTemple.png'),
      tithi: '(18) July, Thursday (Shravana) Cancer 3, Evening Ashadha 27 ',
      sunrise: '5:20:59 AM',
      sunset: '6:24:23 PM',
      gdTime: '(Amrit) Night 1:35 to 3:59 AM, (Mahendra) From sunrise to 6:58 AM, 9:51 to 12:15 PM ',
      bdTime: '(Day and Night) Day 3:08 to Sunrise, Night 11:53 PM to 1:16 AM ',
    },
    {
      id: 19,
      date: '19/07/2024',
      day: 'Friday ',
      name: "ShriJiu's Niladri Bije Festival, Shri Shivasayan Utsav",
      spclDesc: '',
      Image: require('../../assets/Images/PuriBeach.png'),
      tithi: '(19) July, Friday (Shravana) Cancer 4, Evening Ashadha 28 ',
      sunrise: '5:21:22 AM',
      sunset: ' 6:24:10 PM',
      gdTime: '(Amrit) Morning 6:58 to 10:11 AM, 12:35 to 2:11 PM, 3:47 to 5:24 PM, Night 7:59 to 9:35 PM, 11:11 PM to 12:37 AM, (Mahendra) Night 11:11 PM to 11:59 PM, 4:37 to 5:22 AM ',
      bdTime: '(Day and Night) Day 8:38 to 11:53 PM, Night 1:31 to 3:11 AM, 9:08 to 10:30 AM ',
    },
    {
      id: 20,
      date: '20/07/2024',
      day: 'Saturday',
      name: '',
      spclDesc: '',
      Image: require('../../assets/Images/Mahaprasad.png'),
      tithi: '(20) July, Saturday (Shravana) Cancer 5, Evening Ashadha 29 ',
      sunrise: ' 5:21:44 AM',
      sunset: ' 6:23:56 PM',
      gdTime: '(Amrit) From 9:24 AM to 12:36 PM, in the evening from 8:46 to 11:10 PM, from 12:46 to 2:22 AM, and from 3:10 to 4:46 AM.',
      bdTime: '7:10am, 4:46am to 6:24am. (Barbela) Diba 1:31 to 3:8 (Midnight) from midnight to 7:45 a.m. to 4:1 a.m. to 5:22 p.m. ',
    },
    {
      id: 21,
      date: '21/07/2024',
      day: 'Sunday',
      name: 'Vyasa (Guru) Purnima, Guru Puja, Ashadha Purnima, Guru Puja on Govardhan, Beginning of Sharan. ',
      spclDesc: '',
      Image: require('../../assets/Images/LaxmiPuja.png'),
      tithi: '(21) July, Sunday (Shravan) Date 6, Evening 30th Ashad ',
      sunrise: '5:22:6',
      sunset: '6:23:40',
      gdTime: '(Amrit) From 6:12 to 9:24 in the morning, from 7:58 to 9:34 in the evening, Suryodaya from 6:12 in the morning, from 12:36 to 1:24, from 7:10 to 7:58 in the evening, from 12:46 to 3:58 in the night. ',
      bdTime: '(Day and Night) From 10:16 to 11:30, from 1:16 to 2:39 at night. ',
    },
    {
      id: 22,
      date: '22/07/2024',
      day: 'Monday ',
      name: '',
      spclDesc: '',
      Image: require('../../assets/Images/Konark.png'),
      tithi: 'July 22, Monday (Shravan), Karkat Day, Evening 31st Ashad. ',
      sunrise: '5:22:28',
      sunset: '6:23:24',
      gdTime: '(Amrit) From 7:00 to 10:13 in the morning, from 12:37 to 12:37 in the afternoon, from 7:10 to 9:34 in the evening, from 11:58 to 3:10 at night. (Mahendra) From 3:01 to 4:37 in the afternoon. ',
      bdTime: '(Day and Night) From 7:00 to 8:37, from 3:00 to 4:44 in the afternoon, from 10:30 to 11:53 at night. ',
    },
    {
      id: 23,
      date: '23/07/2024',
      day: 'Tuesday',
      name: 'Snana Yatra , Gajanan Besha & Anabasara Arambha',
      spclDesc: '',
      Image: require('../../assets/Images/KhajaBhoga.png'),
      tithi: 'July 23, Tuesday (Shravan), Karkat Day, Evening Shravan 1st. ',
      sunrise: '5:22:50',
      sunset: '6:23:08',
      gdTime: '(Amrit) From 7:59 to 10:23 in the morning, from 12:47 to 12:23 in the afternoon, from 11:11 to 4:47 in the evening, from sunset to 7:09 at night, from 9:33 to 11:57 at night. ',
      bdTime: '(Day and Night) From 1:30 to 3:07 in the afternoon, from 7:02 to 8:39 in the afternoon, from 7:44 in the night to midnight 9:07. ',
    },
    {
      id: 24,
      date: '24/07/2024',
      day: 'Wednesday',
      name: '',
      spclDesc: '',
      Image: require('../../assets/Images/rathaImg.jpeg'),
      tithi: 'July 24, Wednesday (Shravan), Karkat Day, Evening Shravan 2nd. ',
      sunrise: '5:23:13',
      sunset: '6:22:49',
      gdTime: '(Amrit) From 7:00 to 1:25 in the morning, from 7:33 to 9:33 in the night, from 9:21 to the end of the night, until 5:24. ',
      bdTime: '(Day and Night) From 8:42 to 10:16 in the morning, from 11:53 to 1:30 in the afternoon, from 2:39 to 4:3 in the night.',
    },
    {
      id: 25,
      date: '25/07/2024',
      day: 'Thursday',
      name: 'Manasa Panchami (Naga Puja), Sharan ends. ',
      spclDesc: '',
      Image: require('../../assets/Images/3rathas.jpg'),
      tithi: 'July 25, Thursday (Shravan), Karkat Day, Evening Shravan 3rd. ',
      sunrise: '5:23:37',
      sunset: ' 6:22:29',
      gdTime: '(Amrit) From 1:32 to 3:56 in the night, from 7:01 to 1:13 in the morning. ',
      bdTime: ' (Day and Night) From 3:36 to sunrise, from sunset to 6:22. From 11:54 in the night to 1:15 in the morning. ',
    },
    {
      id: 26,
      date: '26/07/2024',
      day: 'Friday',
      name: 'Snana Yatra , Gajanan Besha & Anabasara Arambha',
      spclDesc: '',
      Image: require('../../assets/Images/PuriTemple.png'),
      tithi: 'July 26, Friday (Shravan), Karkat Day, Evening Shravan 4th. ',
      sunrise: '5:23:59',
      sunset: ' 6:22:07',
      gdTime: '(Amrit) From 7:02 to 10:14 in the morning, from 12:38 to 2:14 in the afternoon, from 3:50 to 5:26 in the evening, from 7:56 to 9:32 at night. ',
      bdTime: ' (Day and Night) From 8:39 to 11:54 in the morning. From 9:06 to 10:30 at night. ',
    },
    {
      id: 27,
      date: '27/07/2024',
      day: 'Saturday',
      name: '',
      spclDesc: '',
      Image: require('../../assets/Images/PuriBeach.png'),
      tithi: 'July 27, Saturday (Shravan), Karkat Day, Evening Shravan 5th. ',
      sunrise: '5:24:21',
      sunset: '6:21:45',
      gdTime: ' (Amrit) Day 9:26 to 12:38, Night 8:44 to 11:8, 12:44 to 22, 3:8 to 4:44. ',
      bdTime: '(Kalabela) Morning light between 5:24 and 7:2, light between 4:44 and 6:22. (Barbela) Diba between 1:30 and 3:7 (Night) Sunset from 6:22 to 7:44, night from 4:2 to 5:25. ',
    },
    {
      id: 28,
      date: '28/07/2024',
      day: 'Sunday',
      name: '',
      spclDesc: '',
      Image: require('../../assets/Images/Mahaprasad.png'),
      tithi: '(28) July, Sunday (Shravan), Crab 13th,  evening Shravan 6th. ',
      sunrise: '5:24:43 AM',
      sunset: '6:21:23 PM',
      gdTime: '(Amrita) - From 7:3 AM to 10:15 AM, and from 7:55 PM to 9:31 PM. (Mahendra) - From sunrise to 6:15 AM, from 7:27 AM to 8:15 AM, from 7:7 PM to 7:55 PM, lasting until 3:15 PM. ',
      bdTime: '(Bara and Kaala) - From 10:15 AM to 11:29 AM. (Kaalaraatri) - From 1:19 AM to 2:47 AM. ',
    },
    {
      id: 29,
      date: '29/07/2024',
      day: 'Monday',
      name: '',
      spclDesc: '',
      Image: require('../../assets/Images/LaxmiPuja.png'),
      tithi: '(29) July, Monday (Shravan), Crab 14th, evening Shravan 7th. ',
      sunrise: '5:25:4 AM',
      sunset: '6:21:0 PM',
      gdTime: '(Amrita) - From 7:3 AM to 12:39 PM, and from 7:8 PM to 9:32 PM, lasting until 3:8 PM. (Mahendra) - From 3:3 AM to 3:39 PM. ',
      bdTime: ' (Kaala) - From 7:38 AM to 8:40 AM, and from 3:5 PM to 4:41 PM. (Kaalaraatri) - From 10:30 PM to 11:53 PM.',
    },
    {
      id: 30,
      date: '30/07/2024',
      day: 'Tuesday ',
      name: '',
      spclDesc: '',
      Image: require('../../assets/Images/Konark.png'),
      tithi: '(30) July, Tuesday (Shravan), Crab 15th, evening Shravan 8th. ',
      sunrise: '5:25:24 AM',
      sunset: ' 6:20:36 PM',
      gdTime: '(Amrita) - From 7:51 AM to 10:15 AM, from 12:39 PM to 2:15 PM, and from 3:3 PM to 4:39 PM. Sunset to night - from 7:7 PM to 7:30 PM, from 9:30 PM to 11:54 PM, lasting until 3:54 AM. ',
      bdTime: '(Kaala) - From 12:24 PM to 3:5 PM. (Baara) - From 7:3 AM to 8:40 PM. (Kaalaraatri) - Night from 7:41 PM to 9:5 PM.',
    },
    {
      id: 31,
      date: '31/07/2024',
      day: 'Wednesday',
      name: '',
      spclDesc: '',
      Image: require('../../assets/Images/KhajaBhoga.png'),
      tithi: '(31) July, Wednesday (Shravan), Crab 16th, evening Shravan 9th',
      sunrise: '5:25:47 AM',
      sunset: '6:20:9 PM',
      gdTime: ' (Amrita) - From 7:4 AM to 11:52 AM, from 7:6 PM to 9:30 PM. (Mahendra) - From 3:32 AM to 5:8 AM, night from 9:30 PM to 11:6 PM. ',
      bdTime: '(Kaala) - From 8:40 AM to 10:16 AM. (Baarabela) - From 11:53 AM to 1:29 PM. (Kaalaraatri) - Night from 2:40 AM to 4:4 AM. ',
    },
  ]

  const CUSTOMOdia_DATE = [
    { id: 1, showDate: '୩୦', disable: 'yes', date: '30/06/2024', spclEvent: 'no' },
    { id: 2, showDate: '୧', disable: 'no', date: '01/07/2024', spclEvent: 'yes' },
    { id: 3, showDate: '୨', disable: 'no', date: '02/07/2024', spclEvent: 'yes' },
    { id: 4, showDate: '୩', disable: 'no', date: '03/07/2024', spclEvent: 'yes' },
    { id: 5, showDate: '୪', disable: 'no', date: '04/07/2024', spclEvent: 'yes' },
    { id: 6, showDate: '୫', disable: 'no', date: '05/07/2024', spclEvent: 'yes' },
    { id: 7, showDate: '୬', disable: 'no', date: '06/07/2024', spclEvent: 'yes' },
    { id: 8, showDate: '୭', disable: 'no', date: '07/07/2024', spclEvent: 'yes' },
    { id: 9, showDate: '୮', disable: 'no', date: '08/07/2024', spclEvent: 'yes' },
    { id: 10, showDate: '୯', disable: 'no', date: '09/07/2024', spclEvent: 'yes' },
    { id: 11, showDate: '୧୦', disable: 'no', date: '10/07/2024', spclEvent: 'yes' },
    { id: 12, showDate: '୧୧', disable: 'no', date: '11/07/2024', spclEvent: 'yes' },
    { id: 13, showDate: '୧୨', disable: 'no', date: '12/07/2024', spclEvent: 'yes' },
    { id: 14, showDate: '୧୩', disable: 'no', date: '13/07/2024', spclEvent: 'no' },
    { id: 15, showDate: '୧୪', disable: 'no', date: '14/07/2024', spclEvent: 'yes' },
    { id: 16, showDate: '୧୫', disable: 'no', date: '15/07/2024', spclEvent: 'yes' },
    { id: 17, showDate: '୧୬', disable: 'no', date: '16/07/2024', spclEvent: 'yes' },
    { id: 18, showDate: '୧୭', disable: 'no', date: '17/07/2024', spclEvent: 'yes' },
    { id: 19, showDate: '୧୮', disable: 'no', date: '18/07/2024', spclEvent: 'yes' },
    { id: 20, showDate: '୧୯', disable: 'no', date: '19/07/2024', spclEvent: 'yes' },
    { id: 21, showDate: '୨୦', disable: 'no', date: '20/07/2024', spclEvent: 'no' },
    { id: 22, showDate: '୨୧', disable: 'no', date: '21/07/2024', spclEvent: 'yes' },
    { id: 23, showDate: '୨୨', disable: 'no', date: '22/07/2024', spclEvent: 'no' },
    { id: 24, showDate: '୨୩', disable: 'no', date: '23/07/2024', spclEvent: 'yes' },
    { id: 25, showDate: '୨୪', disable: 'no', date: '24/07/2024', spclEvent: 'no' },
    { id: 26, showDate: '୨୫', disable: 'no', date: '25/07/2024', spclEvent: 'yes' },
    { id: 27, showDate: '୨୬', disable: 'no', date: '26/07/2024', spclEvent: 'yes' },
    { id: 28, showDate: '୨୭', disable: 'no', date: '27/07/2024', spclEvent: 'no' },
    { id: 29, showDate: '୨୮', disable: 'no', date: '28/07/2024', spclEvent: 'no' },
    { id: 30, showDate: '୨୯', disable: 'no', date: '29/07/2024', spclEvent: 'no' },
    { id: 31, showDate: '୩୦', disable: 'no', date: '30/07/2024', spclEvent: 'no' },
    { id: 32, showDate: '୩୧', disable: 'no', date: '31/07/2024', spclEvent: 'no' },
    { id: 33, showDate: '୨', disable: 'yes', date: '02/08/2024', spclEvent: 'no' },
    { id: 34, showDate: '୩', disable: 'yes', date: '03/08/2024', spclEvent: 'no' },
    { id: 35, showDate: '୪', disable: 'yes', date: '04/08/2024', spclEvent: 'no' },
  ];

  const CUSTOMEnglish_DATE = [
    { id: 1, showDate: '30', disable: 'yes', date: '30/06/2024', spclEvent: 'no' },
    { id: 2, showDate: '1', disable: 'no', date: '01/07/2024', spclEvent: 'yes' },
    { id: 3, showDate: '2', disable: 'no', date: '02/07/2024', spclEvent: 'yes' },
    { id: 4, showDate: '3', disable: 'no', date: '03/07/2024', spclEvent: 'yes' },
    { id: 5, showDate: '4', disable: 'no', date: '04/07/2024', spclEvent: 'yes' },
    { id: 6, showDate: '5', disable: 'no', date: '07/07/2024', spclEvent: 'yes' },
    { id: 7, showDate: '6', disable: 'no', date: '06/07/2024', spclEvent: 'yes' },
    { id: 8, showDate: '7', disable: 'no', date: '07/07/2024', spclEvent: 'yes' },
    { id: 9, showDate: '8', disable: 'no', date: '08/07/2024', spclEvent: 'yes' },
    { id: 10, showDate: '9', disable: 'no', date: '09/07/2024', spclEvent: 'yes' },
    { id: 11, showDate: '10', disable: 'no', date: '10/07/2024', spclEvent: 'yes' },
    { id: 12, showDate: '11', disable: 'no', date: '11/07/2024', spclEvent: 'yes' },
    { id: 13, showDate: '12', disable: 'no', date: '12/07/2024', spclEvent: 'yes' },
    { id: 14, showDate: '13', disable: 'no', date: '13/07/2024', spclEvent: 'no' },
    { id: 15, showDate: '14', disable: 'no', date: '14/07/2024', spclEvent: 'yes' },
    { id: 16, showDate: '15', disable: 'no', date: '15/07/2024', spclEvent: 'yes' },
    { id: 17, showDate: '16', disable: 'no', date: '16/07/2024', spclEvent: 'yes' },
    { id: 18, showDate: '17', disable: 'no', date: '17/07/2024', spclEvent: 'yes' },
    { id: 19, showDate: '18', disable: 'no', date: '18/07/2024', spclEvent: 'yes' },
    { id: 20, showDate: '19', disable: 'no', date: '19/07/2024', spclEvent: 'yes' },
    { id: 21, showDate: '20', disable: 'no', date: '20/07/2024', spclEvent: 'no' },
    { id: 22, showDate: '21', disable: 'no', date: '21/07/2024', spclEvent: 'yes' },
    { id: 23, showDate: '22', disable: 'no', date: '22/07/2024', spclEvent: 'no' },
    { id: 24, showDate: '23', disable: 'no', date: '23/07/2024', spclEvent: 'yes' },
    { id: 25, showDate: '24', disable: 'no', date: '24/07/2024', spclEvent: 'no' },
    { id: 26, showDate: '25', disable: 'no', date: '25/07/2024', spclEvent: 'yes' },
    { id: 27, showDate: '26', disable: 'no', date: '26/07/2024', spclEvent: 'yes' },
    { id: 28, showDate: '27', disable: 'no', date: '27/07/2024', spclEvent: 'no' },
    { id: 29, showDate: '28', disable: 'no', date: '28/07/2024', spclEvent: 'no' },
    { id: 30, showDate: '29', disable: 'no', date: '29/07/2024', spclEvent: 'no' },
    { id: 31, showDate: '30', disable: 'no', date: '30/07/2024', spclEvent: 'no' },
    { id: 32, showDate: '31', disable: 'no', date: '31/07/2024', spclEvent: 'no' },
    { id: 33, showDate: '1', disable: 'yes', date: '01/08/2024', spclEvent: 'no' },
    { id: 34, showDate: '2', disable: 'yes', date: '02/08/2024', spclEvent: 'no' },
    { id: 35, showDate: '3', disable: 'yes', date: '03/08/2024', spclEvent: 'no' },
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
              <TouchableOpacity onPress={() => navigation.navigate('June2024')}>
                <AntDesign name="caretleft" color={'#000'} size={25} />
              </TouchableOpacity>
              {selectedLanguage === "Odia" &&
                <Text style={{ color: '#000', fontSize: 17, fontWeight: '600' }}>ଜୁଲାଇ  ୨୦୨୪</Text>
              }
              {selectedLanguage === "English" &&
                <Text style={{ color: '#000', fontSize: 17, fontWeight: '600' }}>July  2024</Text>
              }
              <TouchableOpacity onPress={() => navigation.replace('August2024')}>
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

export default July2024

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