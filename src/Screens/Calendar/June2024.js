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

const June2024 = (props) => {

  const eventsForOdiaMonth = [
    {
      id: 1,
      date: '01/06/2024',
      day: 'ଶନିବାର',
      name: '',
      Image: require('../../assets/Images/PuriTemple.png'),
      tithi: '(୧) ଜୁନ , ଶନିବାର (ଜ୍ୟେଷ୍ଠ) ବୃଷ ଦି୧୯ନ , ଜିଲକଜ ତା୨୩ରିଖ , ସାୟନ ଜ୍ୟେଷ୍ଠ ଦି୧୧ନ',
      sunrise: 'ଘ୫|୧୦|୪୩',
      sunset: 'ଘ୬|୧୭|୪୭',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୨|୪୭ ରୁ ଘ୫|୧୧ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୮ ରୁ ଘ୭|୫୬ ମଧ୍ୟେ , ଘ୧୧|୫୯ ରୁ ଘ୨|୨୦ ମଧ୍ୟେ , ଘ୩|୫୬ ରୁ ଘ୫|୧୧ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ପ୍ରାତଃରୁ ଘ୫|୫୯ ମଧ୍ୟେ , ଘ୯|୧୧ ରୁ ଘ୧୧|୩୫ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା)ପ୍ରାତଃ ଘ୫|୫୧ ରୁ ଘ୬|୪୯ ମଧ୍ୟେ , ଦିବା ଘ୪|୪୧ ରୁ ଘ୬|୧୮ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧|୨୪ ରୁ ଘ୩|୨ ମଧ୍ୟେ  | (କାଳରାତ୍ରି) ଅସ୍ତ ଘ୬|୧୮ ରୁ ୭|୪୧ ମଧ୍ୟେ , ରାତ୍ରି ଘ୩|୪୯ ରୁ ନିଶାନ୍ତ ଘ୫|୧୧ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 2,
      date: '02/06/2024',
      day: 'ରବିବାର',
      name: 'ଶ୍ରୀମନ୍ଦିରେ ଓ  ସ୍ମାର୍ତ୍ତସମ୍ମତ ଜଳକ୍ରୀଡା ଏକାଦଶୀ , ଶ୍ରୀମନ୍ଦିରେ ଭିତର ଚନ୍ଦନ ଓ ଜଳକ୍ରୀଡା',
      Image: require('../../assets/Images/PuriBeach.png'),
      tithi: '(୨) ଜୁନ , ରବିବାର (ଜ୍ୟେଷ୍ଠ) ବୃଷ ଦି୨୦ନ , ଜିଲକଜ ତା୨୪ରିଖ , ସାୟନ ଜ୍ୟେଷ୍ଠ ଦି୧୨ନ',
      sunrise: 'ଘ୫|୧୦|୩୮',
      sunset: 'ଘ୬|୧୮|୧୦',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୬|୪୭ ରୁ ଘ୯|୧୧ ମଧ୍ୟେ , ଘ୧୧|୩୫ ରୁ ଘ୧|୫୯ ମଧ୍ୟେ , ଅସ୍ତରୁ ରାତ୍ରି ଘ୭|୫୫ ମଧ୍ୟେ , ଘ୧୧|୮ ରୁ ଘ୧|୩୨ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୩୫ ରୁ ଘ୪|୨୩ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୯ ରୁ ଘ୧|୨୬ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୭ ରୁ ଘ୨|୨୮ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 3,
      date: '03/06/2024',
      day: 'ସୋମବାର',
      name: 'ସର୍ବବୈଷ୍ଣବ ସମ୍ମତ ଏକାଦଶୀ',
      Image: require('../../assets/Images/Mahaprasad.png'),
      tithi: '(୩) ଜୁନ , ସୋମବାର (ଜ୍ୟେଷ୍ଠ) ବୃଷ ଦି୨୧ନ , ଜିଲକଜ ତା୨୫ରିଖ , ସାୟନ ଜ୍ୟେଷ୍ଠ ଦି୧୩ନ',
      sunrise: 'ଘ୫|୧୦|୩୩',
      sunset: 'ଘ୬|୧୮|୩୩',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୮|୨୩ ରୁ ଘ୯|୫୯ ମଧ୍ୟେ , ରାତ୍ରି ଘ୯|୩୩ ରୁ ଘ୧୨|୪୫ ମଧ୍ୟେ , ଘ୨|୧୧ ରୁ ଘ୩|୫୭ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୪|୪୪ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୧୦ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା)ପ୍ରାତଃ ଘ୬|୫୦ ରୁ ଘ୮|୨୯ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ ୩|୩୩ ରୁ ୩|୪୨ ମଧ୍ୟେ (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୨୪ ରୁ ଘ୧୧|୪୬ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 4,
      date: '04/06/2024',
      day: 'ମଙ୍ଗଳବାର',
      name: 'ଉତ୍କଳେ ଭଉଁରୀ ଯାତ୍ରା , ଶ୍ରୀକ୍ଷେତ୍ର ହଳଦୀପାଣି',
      Image: require('../../assets/Images/LaxmiPuja.png'),
      tithi: '(୪) ଜୁନ , ମଙ୍ଗଳବାର (ଜ୍ୟେଷ୍ଠ) ବୃଷ ଦି୨୨ନ , ଜିଲକଜ ତା୨୬ରିଖ , ସାୟନ ଜ୍ୟେଷ୍ଠ ଦି୧୪ନ',
      sunrise: 'ଘ୫|୧୦|୨୯',
      sunset: 'ଘ୬|୧୮|୫୭',
      gdTime: '(ଅମୃତ) ପ୍ରାତଃରୁ ଦିବା ଘ୭|୩୪ ମଧ୍ୟେ , ଘ୯|୧୧ ରୁ ଘ୧|୩୫ ମଧ୍ୟେ , ଘ୨|୪୭ ରୁ ଘ୩|୩୫ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୮ମଧ୍ୟେ , ଘ୧୨|୪୫ ରୁ ଘ୩|୯ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୧|୫୯ ରୁ ଘ୨|୪୭ ମଧ୍ୟେ , ଘ୩|୩୫ ରୁ ଘ ୪|୨୩ ମଧ୍ୟେ , ରାତ୍ରି ୮|୪୫ ରୁ ଘ୧୦|୨୧ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୨୫ ରୁ ଘ୩|୩ ମଧ୍ୟେ | (ବାରବେଳା) ପ୍ରାତଃ ଘ୬|୫୦ ରୁ ଘ୮|୨୮ ମଧ୍ୟେ (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୪୨ ରୁ ଘ୯|୩ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 5,
      date: '05/06/2024',
      day: 'ବୁଧବାର',
      name: '',
      Image: require('../../assets/Images/Konark.png'),
      tithi: '(୫) ଜୁନ , ବୁଧବାର (ଜ୍ୟେଷ୍ଠ) ବୃଷ ଦି୨୩ନ , ଜିଲକଜ ତା୨୭ରିଖ , ସାୟନ ଜ୍ୟେଷ୍ଠ ଦି୧୫ନ',
      sunrise: 'ଘ୫|୧୦|୨୯',
      sunset: 'ଘ୬|୧୮|୫୭',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୭|୩୫ ରୁ ଘ୧୦|୪୭ ମଧ୍ୟେ , ଘ୧|୧୧ ରୁ ୪|୨୩ ମଧ୍ୟେ , ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୧୦|୨୦ ମଧ୍ୟେ , ଘ୧୨|୪୫ ରୁ ଘ୨|୨୧ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୨୮ ରୁ ଘ୧୦|୭ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୪୬ ରୁ ଘ୧|୨୫ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୨୮ ରୁ ଘ୩|୫୦ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 6,
      date: '06/06/2024',
      day: 'ଗୁରୁବାର',
      name: 'ଶ୍ରୀମନ୍ଦିରେ ଓ ସର୍ବତ୍ର ସାବିତ୍ରୀ ଅମାବାସ୍ୟା , ଜଳକ୍ରୀଡା , ବଟସାବିତ୍ରୀ ପୂଜା (ସାବିତ୍ରୀ ବ୍ରତ)',
      Image: require('../../assets/Images/KhajaBhoga.png'),
      tithi: '(୬) ଜୁନ , ଗୁରୁବାର (ଜ୍ୟେଷ୍ଠ) ବୃଷ ଦି୨୪ନ , ଜିଲକଜ ତା୨୮ରିଖ , ସାୟନ ଜ୍ୟେଷ୍ଠ ଦି୧୬ନ',
      sunrise: 'ଘ୫|୧୦|୩୧',
      sunset: 'ଘ୬|୧୯|୩୭',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୨|୪୭ ରୁ ଘ୫|୧୧ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୧୦ ରୁ ଘ୯|୩୪ ମଧ୍ୟେ , ଘ୧୨|୪୬ ରୁ ଘ୩|୧୦ ମଧ୍ୟେ , ଘ୪|୪୬ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୧୧ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର)ସୂର୍ଯ୍ୟୋଦୟରୁ ଘ୫|୫୯ ମଧ୍ୟେ , ଘ୯|୧୧ ରୁ ଘ୧୦|୪୭ ମଧ୍ୟେ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୩|୪ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୬|୨୦ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୪୬ ରୁ ଘ୧|୭ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 7,
      date: '07/06/2024',
      day: 'ଶୁକ୍ରବାର',
      name: 'ଦ୍ୱିତୀୟା ଚନ୍ଦ୍ରଦର୍ଶନ',
      Image: require('../../assets/Images/rathaImg.jpeg'),
      tithi: '(୭) ଜୁନ , ଶୁକ୍ରବାର (ଜ୍ୟେଷ୍ଠ) ବୃଷ ଦି୨୫ନ , ଜିଲକଜ ତା୨୯ରିଖ , ସାୟନ ଜ୍ୟେଷ୍ଠ ଦି୧୭ନ',
      sunrise: 'ଘ୫|୧୦|୩୩',
      sunset: 'ଘ୬|୧୯|୫୭',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୧୧|୩୧ ରୁ ଘ୧|୧୯ ମଧ୍ୟେ , ଅସ୍ତରୁ ରାତ୍ରି ଘ୮|୪୫ ମଧ୍ୟେ ଘ୧|୩୬ ରୁ ଘ୩|୫୮ ମଧ୍ୟେ , ଘ୪|୪୬ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୧୧ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ପ୍ରାତଃରୁ ଘ୫|୫୯ ମଧ୍ୟେ , ଘ୬|୩୭ ମଧ୍ୟେ , ଘ୯|୧ ରୁ ଘ୯|୫୯ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୮|୨୯ ରୁ ଘ୧୧|୪୮ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୯|୪ ରୁ ଘ୧୦|୨୫ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 8,
      date: '08/06/2024',
      day: 'ଶନିବାର',
      name: 'ରମ୍ଭା ତୃତୀୟା ବ୍ରତ',
      Image: require('../../assets/Images/3rathas.jpg'),
      tithi: '(୮) ଜୁନ , ଶନିବାର (ଜ୍ୟେଷ୍ଠ) ବୃଷ ଦି୨୬ନ , ଜିଲହେଜ ତା୧ରିଖ , ସାୟନ ଜ୍ୟେଷ୍ଠ ଦି୧୮ନ',
      sunrise: 'ଘ୫|୧୦|୩୫',
      sunset: 'ଘ୬|୨୦|୧୭',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୨|୪୭ ରୁ ଘ୫|୧୧ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୧୦ ରୁ ଘ୭|୫୮ ମଧ୍ୟେ , ଘ୧୧|୫୮ ରୁ ଘ୨|୨୨ ମଧ୍ୟେ , ଘ୩|୫୮ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୧୧ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ପ୍ରାତଃରୁ ଘ୫|୫୯ ମଧ୍ୟେ , ଘ୯|୧୧ ରୁ ଘ୧୧|୩୫ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ପ୍ରାତଃ ଘ୫|୧୧ ରୁ ଘ୬|୫୧ ମଧ୍ୟେ , ଦିବା ଘ୪|୪୨ ରୁ ଅସ୍ତ ଘ୬|୨୦ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୧|୨୫ ରୁ ଘ୩|୪ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସନ୍ଧ୍ୟା ଘ୬|୨୦ ରୁ ଘ୭|୪୦ ମଧ୍ୟେ , ରାତ୍ରି ଘ୩|୧୨ ରୁ ୫|୧୧ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 9,
      date: '09/06/2024',
      day: 'ରବିବାର',
      name: 'ଉମାଚତୁର୍ଥୀ, ତାଟନିମନ୍ତ୍ରଣ',
      Image: require('../../assets/Images/PuriTemple.png'),
      tithi: '(୯) ଜୁନ , ରବିବାର (ଜ୍ୟେଷ୍ଠ) ବୃଷ ଦି୨୭ନ , ଜିଲହେଜ ତା୨ରିଖ , ସାୟନ ଜ୍ୟେଷ୍ଠ ଦି୧୯ନ',
      sunrise: 'ଘ୫|୧୦|୩୬',
      sunset: 'ଘ୬|୨୦|୩୮',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୬|୪୭ ରୁ ଘ୯|୧୧ ମଧ୍ୟେ , ଘ୧୧|୩୫ ରୁ ଘ୧|୧୯ ମଧ୍ୟେ , ଅସ୍ତରୁ ରାତ୍ରି ଘ୭|୫୮ ମଧ୍ୟେ , ଘ୧୧|୧୦ ରୁ ଘ୧|୩୪ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୩୫ ରୁ ଘ୪|୨୩ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୭ ରୁ ଘ୧|୨୬ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୮ ରୁ ଘ୨|୨୯ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 10,
      date: '10/06/2024',
      day: 'ସୋମବାର',
      name: 'ଶିବ–ବିବାହତ୍ସବ',
      Image: require('../../assets/Images/PuriBeach.png'),
      tithi: '(୧୦) ଜୁନ , ସୋମବାର (ଜ୍ୟେଷ୍ଠ) ବୃଷ ଦି୨୮ନ , ଜିଲହେଜ ତା୩ରିଖ , ସାୟନ ଜ୍ୟେଷ୍ଠ ଦି୨୦ନ',
      sunrise: 'ଘ୫|୧୦|୩୮',
      sunset: 'ଘ୬|୨୦|୫୮',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୮|୩୨ ରୁ ଘ୯|୫୯ ମଧ୍ୟେ , ରାତ୍ରି ଘ୯|୩୫ ରୁ ଘ୧୨|୪୭ ମଧ୍ୟେ , ଘ୨|୨୩ ରୁ ଘ୩|୫୯ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୪|୪୭ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୧୧ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ପ୍ରାତଃ ଘ୬|୫୦ ରୁ ଘ୮|୨୯ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୩|୫ ରୁ ଘ୪|୪୪ ମଧ୍ୟେ (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୨୬ ରୁ ଘ୧୧|୪୭ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 11,
      date: '11/06/2024',
      day: 'ମଙ୍ଗଳବାର',
      name: 'ଶ୍ରୀମନ୍ଦିରେ ଶିବବିବାହ , ରାଜପ୍ରତିଷ୍ଠିତ ଶାସନମାନଙ୍କରେ ଏବଂ ଅନ୍ୟତ୍ର ଶୀତଳଷଷ୍ଠୀ , ଆରଣ୍ୟକଷଷ୍ଠୀ ବ୍ରତ',
      Image: require('../../assets/Images/Mahaprasad.png'),
      tithi: '(୧୧) ଜୁନ , ମଙ୍ଗଳବାର (ଜ୍ୟେଷ୍ଠ) ବୃଷ ଦି୨୯ନ , ଜିଲହେଜ ତା୪ରିଖ , ସାୟନ ଜ୍ୟେଷ୍ଠ ଦି୨୧ନ',
      sunrise: 'ଘ୫|୧୦|୪୦',
      sunset: 'ଘ୬|୨୧|୨୦',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୩୫ ମଧ୍ୟେ , ଘ୯|୧୧ ରୁ ଘ୧୧|୩୫ ମଧ୍ୟେ , ଘ୨|୪୭ ରୁ ଘ୩|୪୫ ପର୍ଯ୍ୟନ୍ତ , ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୭|୧୦ ମଧ୍ୟେ , ଘ୧୨|୪୭ ରୁ ଘ୩|୧୧ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୧|୫୯ ରୁ ଘ୨|୪୭ ମଧ୍ୟେ , ଘ୩|୩୫ ରୁ ଘ୪|୨୩ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୪୭ ରୁ ୧୦|୨୩ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୨୯ ରୁ ଘ୩|୮ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ପ୍ରାତଃ ଘ୬|୫୨ ରୁ ୮|୩୧ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୪୪ ରୁ ଘ୯|୫  ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 12,
      date: '12/06/2024',
      day: 'ବୁଧବାର',
      name: 'ଶ୍ରୀମନ୍ଦିରେ ଶୀତଳଷଷ୍ଠୀ ଉତ୍ସବ',
      Image: require('../../assets/Images/LaxmiPuja.png'),
      tithi: '(୧୨) ଜୁନ , ବୁଧବାର (ଜ୍ୟେଷ୍ଠ) ବୃଷ ଦି୩୦ନ , ଜିଲହେଜ ତା୫ରିଖ , ସାୟନ ଜ୍ୟେଷ୍ଠ ଦି୨୨ନ',
      sunrise: 'ଘ୫|୧୦|୪୬',
      sunset: 'ଘ୬|୨୧|୩୮',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୭|୩୬ ରୁ ଘ୧୦|୪୮ ମଧ୍ୟେ , ଘ୧|୧୨ ରୁ ଘ୪|୨୪ ପର୍ଯ୍ୟନ୍ତ, ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୧୦|୨୩ ମଧ୍ୟେ ,  ଘ୧୨|୪୭ ରୁ ୨|୨୩ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୨୯ ରୁ ଘ୧୦|୮ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୧୧|୪୭ ରୁ ଘ୧|୨୬ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୩୦ ରୁ ଘ୩|୫୧ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 13,
      date: '13/06/2024',
      day: 'ଗୁରୁବାର',
      name: '',
      Image: require('../../assets/Images/Konark.png'),
      tithi: '(୧୩) ଜୁନ , ଗୁରୁବାର (ଜ୍ୟେଷ୍ଠ) ବୃଷ ଦି୩୧ନ , ଜିଲହେଜ ତା୬ରିଖ , ସାୟନ ଜ୍ୟେଷ୍ଠ ଦି୨୩ନ',
      sunrise: 'ଘ୫|୧୦|୫୮',
      sunset: 'ଘ୬|୨୨|୦',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୨|୪୪ ରୁ ଘ୫|୮ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୧୧ ରୁ ଘ୯|୩୫ ମଧ୍ୟେ , ଘ୧୨|୪୭ ରୁ ଘ୩|୧୧ ମଧ୍ୟେ , ଘ୪|୪୭ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୧୧ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ପ୍ରାତଃ ଘ୫|୫୯ ମଧ୍ୟେ , ଘ୯|୧୧ ରୁ ଘ୧୦|୪୭ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୩|୭ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୬|୨୨ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୪୯ ରୁ ଘ୧|୧୧ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 14,
      date: '14/06/2024',
      day: 'ଶୁକ୍ରବାର',
      name: 'ମାସାନ୍ତ , ପ୍ରଥମ ରଜ',
      Image: require('../../assets/Images/KhajaBhoga.png'),
      tithi: '(୧୪) ଜୁନ , ଶୁକ୍ରବାର (ଜ୍ୟେଷ୍ଠ) ବୃଷ ଦି୩୨ନ , ଜିଲହେଜ ତା୭ରିଖ , ସାୟନ ଜ୍ୟେଷ୍ଠ ଦି୨୪ନ',
      sunrise: 'ଘ୫|୧୧|୦',
      sunset: 'ଘ୬|୨୨|୧୪',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୧୧|୩୬ ରୁ ଘ୨|୦ ମଧ୍ୟେ , ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୮|୪୬ ମଧ୍ୟେ , ରାତ୍ରି ଘ୧|୧୩ ରୁ ଘ୩|୭ ମଧ୍ୟେ , ଘ୪|୨୫ ରାତ୍ରିଶେଷ ଘ୫|୧୧ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ପ୍ରାତଃରୁ ଘ୬|୦ ରୁ ଘ୬|୪୮ ମଧ୍ୟେ , ଘ୯|୧୨ ରୁ ୧୦|୦ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୮|୩୦ ରୁ ଘ୧୧|୫୧ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୯|୬ ରୁ ଘ୧୦|୨୭ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 15,
      date: '15/06/2024',
      day: 'ଶନିବାର',
      name: 'ଶ୍ରୀମନ୍ଦିରେ ଓ ସର୍ବତ୍ର ମିଥୁନ (ରଜ) ସଂକ୍ରାନ୍ତି',
      Image: require('../../assets/Images/rathaImg.jpeg'),
      tithi: '(୧୫) ଜୁନ , ଶନିବାର (ଆଷାଢ) ମିଥୁନ ଦି୧ନ , ଜିଲହେଜ ତା୮ରିଖ , ସାୟନ ଜ୍ୟେଷ୍ଠ ଦି୨୫ନ',
      sunrise: 'ଘ୫|୧୧|୬',
      sunset: 'ଘ୬|୨୨|୩୨',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୨|୪୮ ରୁ ଘ୫|୧୨ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୧୨ ରୁ ଘ୮|୦ ମଧ୍ୟେ , ଘ୧୨|୦ ରୁ ଘ୨|୨୪ ମଧ୍ୟେ , ରାତ୍ରି ଘ୪|୦ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୧୧ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୦ ମଧ୍ୟେ , ଘ୯|୧୨ ରୁ ଘ୧୧|୩୬ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା)ପ୍ରାତଃ ଘ୫|୧୧ ରୁ ଘ୬|୫୪ ମଧ୍ୟେ , ଦିବା ଘ୪|୧୯ ରୁ ୬|୨୩ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୧|୨୭ ରୁ ଘ୩|୬ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ସୂର୍ଯ୍ୟାସ୍ତ ଘ୬|୨୩ ରୁ ଘ୭|୪୪ ମଧ୍ୟେ , ରାତ୍ରି ଘ୩|୫୦ ରୁ ନିଶାନ୍ତ ଘ୫|୧୧ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 16,
      date: '16/06/2024',
      day: 'ରବିବାର',
      name: 'ଶ୍ରୀମନ୍ଦିରେ ଶ୍ରୀଜୀଉଙ୍କ ରାଜେନ୍ଦ୍ରଭିଷେକ , ଗଙ୍ଗା ଦଶହରା , ଗଙ୍ଗାସ୍ନାନ , ଭୂମିଦାହ , ତୃତୀୟା (ଶେଷ) ରଜ',
      Image: require('../../assets/Images/3rathas.jpg'),
      tithi: '(୧୬) ଜୁନ , ରବିବାର (ଆଷାଢ) ମିଥୁନ ଦି୨ନ , ଜିଲହେଜ ତା୯ରିଖ , ସାୟନ ଜ୍ୟେଷ୍ଠ ଦି୨୬ନ',
      sunrise: 'ଘ୫|୧୧|୧୩',
      sunset: 'ଘ୬|୨୨|୪୩',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୬|୪୮ ରୁ ଘ୯|୧୨ ମଧ୍ୟେ , ଘ୧୨|୩୬ ରୁ ଘ୨|୦ ମଧ୍ୟେ , ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୮|୦ ମଧ୍ୟେ , ଘ୧୧|୧୨ ରୁ ଘ୧|୩୬ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୩୬ ରୁ ଘ୪|୨୪ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୧୨ ରୁ ଘ୧୨|୩୦ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୧୧ ରୁ ଘ୨|୩୨ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 17,
      date: '17/06/2024',
      day: 'ସୋମବାର',
      name: 'ବସୁମତୀ ସ୍ନାନ , ଷୋହଳ ଶାସନରେ ଋକ୍ମିଣୀ ବିବାହ',
      Image: require('../../assets/Images/PuriTemple.png'),
      tithi: '(୧୭) ଜୁନ , ସୋମବାର (ଆଷାଢ) ମିଥୁନ ଦି୩ନ , ଜିଲହେଜ ତା୧୦ରିଖ , ସାୟନ ଜ୍ୟେଷ୍ଠ ଦି୨୭ନ',
      sunrise: 'ଘ୫|୧୧|୨୮',
      sunset: 'ଘ୬|୨୩|୦',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୮|୨୪ ରୁ ଘ୧୦|୦ ମଧ୍ୟେ , ରାତ୍ରି ଘ୯|୩୬ ରୁ ଘ୧୨|୪୮ ମଧ୍ୟେ , ଘ୨|୨୪ ରୁ ଘ୪|୦ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୪|୪୮ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୧୨ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା)ପ୍ରାତଃ ଘ୬|୫୨ ରୁ ଘ୮|୩୪ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୩|୬ ରୁ ଘ୪|୪୫ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୨୮ ରୁ ଘ୧୧|୪୯ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 18,
      date: '18/06/2024',
      day: 'ମଙ୍ଗଳବାର',
      name: 'ଶ୍ରୀମନ୍ଦିରେ ଓ ସର୍ବସମ୍ମତ ନିର୍ଜଳା ଏକାଦଶୀ , ଶ୍ରୀମନ୍ଦିରେ ଋକ୍ମିଣୀ ହରଣ ଏକାଦଶୀ ଓ ବିବାହତ୍ସବ , ଜଳକ୍ରୀଡା , ଷୋହଳ ଶାସକମାନଙ୍କରେ ଚମ୍ପକ ଦ୍ଵାଦଶୀ',
      Image: require('../../assets/Images/PuriBeach.png'),
      tithi: '(୧୮) ଜୁନ , ମଙ୍ଗଳବାର (ଆଷାଢ) ମିଥୁନ ଦି୪ନ , ଜିଲହେଜ ତା୧୧ରିଖ , ସାୟନ ଜ୍ୟେଷ୍ଠ ଦି୨୮ନ',
      sunrise: 'ଘ୫|୧୧|୪୦',
      sunset: 'ଘ୬|୨୩|୧୬',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୩୭ ମଧ୍ୟେ , ଘ୯|୧୩ ରୁ ଘ୧୧|୩୭ ମଧ୍ୟେ , ଘ୨|୪୯ ରୁ ଘ୩|୩୭ ମଧ୍ୟେ , ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୭|୧୨ ମଧ୍ୟେ , ଘ୧୨|୪୮ ରୁ ଘ୩|୧୨ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୨|୧ ରୁ ଘ୨|୪୯ ମଧ୍ୟେ , ଘ୩|୫୨ ରୁ ଘ୪|୨୫ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୪୮ ରୁ ଘ ୧୦|୨୪ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାରବେଳା)ପ୍ରାତଃ ଘ୬|୫୨ ରୁ ଘ୮|୩୧ ପର୍ଯ୍ୟନ୍ତ | (କାଳବେଳା) ଦିବା ଘ୧|୨୯ ରୁ ଘ୩|୮ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୪୬ ରୁ ଘ୯|୭ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 19,
      date: '19/06/2024',
      day: 'ବୁଧବାର',
      name: 'ଶ୍ରୀମନ୍ଦିରେ ଚମ୍ପକ ଦ୍ଵାଦଶୀ',
      Image: require('../../assets/Images/Mahaprasad.png'),
      tithi: '(୧୯) ଜୁନ , ବୁଧବାର (ଆଷାଢ) ମିଥୁନ ଦି୫ନ , ଜିଲହେଜ ତା୧୩ରିଖ , ସାୟନ ଜ୍ୟେଷ୍ଠ ଦି୨୯ନ',
      sunrise: 'ଘ୫|୧୧|୫୧',
      sunset: 'ଘ୬|୨୩|୩୧',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୭|୩୭ ରୁ ଘ୧୦|୪୯ ମଧ୍ୟେ , ଘ୧|୧୩ ରୁ ଘ୪|୨୫ ମଧ୍ୟେ , ସୂର୍ଯ୍ୟାସ୍ତରୀ ରାତ୍ରି ଘ୧୦|୨୫ ମଧ୍ୟେ , ଘ୧୨|୪୯ ରୁ ଘ୨|୨୫ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୩୧ ରୁ ଘ୧୦|୧୦ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ ୧୧|୪୯ ରୁ ଘ୧|୨୮ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୩୧ ରୁ ଘ୩|୫୨ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 20,
      date: '20/06/2024',
      day: 'ଗୁରୁବାର',
      name: 'ଶ୍ରୀମନ୍ଦିରରେ ଦଇତାପତି ସେବା ପ୍ରବେଶ',
      Image: require('../../assets/Images/LaxmiPuja.png'),
      tithi: '(୨୦) ଜୁନ , ଗୁରୁବାର (ଆଷାଢ) ମିଥୁନ ଦି୬ନ , ଜିଲହେଜ ତା୧୩ରିଖ , ସାୟନ ଜ୍ୟେଷ୍ଠ ଦି୩୦ନ',
      sunrise: 'ଘ୫|୧୨|୨',
      sunset: 'ଘ୬|୨୩|୪୬',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୨|୫୧ ରୁ ଘ୫|୧୪ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୧୩ ରୁ ଘ୯|୩୩୭ ମଧ୍ୟେ , ଘ୧୨|୪୯ ରୁ ଘ୩|୧୩ ମଧ୍ୟେ , ଘ୪|୪୭ ରୁ ଘ୫|୧୨ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୧ ମଧ୍ୟେ , ଘ୯|୧୩ ରୁ ଘ୧୦|୪୯ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୩|୭ ରୁ ଘ୬|୨୪ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୪୯ ରୁ ଘ୧|୧୦ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 21,
      date: '21/06/2024',
      day: 'ଶୁକ୍ରବାର',
      name: 'ଶ୍ରୀମନ୍ଦିରରେ ଶ୍ରୀଜୀଉଙ୍କର ଚତୁର୍ଥୀ ହୋମ , ସେନାପଟା ଲାଗି',
      Image: require('../../assets/Images/Konark.png'),
      tithi: '(୨୧) ଜୁନ, ଶୁକ୍ରବାର (ଆଷାଢ) ମିଥୁନ ଦି୭ନ, ଜିଲହେଜ ତା୭ରିଖ, ସାୟନ ଜ୍ୟେଷ୍ଠ ଦି୩୧ନ',
      sunrise: 'ଘ୫|୧୨|୧୩',
      sunset: 'ଘ୬|୨୪|୧',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୮|୪୯ ମଧ୍ୟେ , ଘ୧|୩୭ ରୁ ଘ୪|୧ ମଧ୍ୟେ , ଘ୪|୪୮ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୧୨ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ପ୍ରାତଃରୁ ଘ୬|୦ ରୁ ଘ୬|୪୮ ମଧ୍ୟେ , ଘ୯|୧୩ ରୁ ଘ୧୦|୧ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୮|୩୫ ରୁ ଘ୧୧|୫୩ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୯|୭ ରୁ ଘ୧୦|୨୮ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 22,
      date: '22/06/2024',
      day: 'ଶନିବାର',
      name: 'ଶ୍ରୀଜଗନ୍ନାଥ ମହାପ୍ରଭୁଙ୍କର ଜୟନ୍ତୀ , ଦେବସ୍ନାନ ପୂର୍ଣ୍ଣିମା , ଶ୍ରୀଜୀଉଙ୍କର ସ୍ନାନଯାତ୍ରା ଓ ସ୍ନାନମଣ୍ଡପେ ଗଜାନନ ବେଶ , ଅଣସର ଆରମ୍ଭ , ଭକ୍ତ କବୀର ଜୟନ୍ତୀ',
      Image: require('../../assets/Images/KhajaBhoga.png'),
      tithi: '(୨୨) ଜୁନ , ଶନିବାର (ଆଷାଢ) ମିଥୁନ ଦି୮ନ , ଜିଲହେଜ ତା୧୫ରିଖ , ସାୟନ ଆଷାଢ ଦି୧ନ',
      sunrise: 'ଘ୫|୧୨|୨୪',
      sunset: 'ଘ୬|୨୪|୧୬',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୨|୫୦ ରୁ ଘ୫|୧୪ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୧୩ ରୁ ଘ୮|୧ ମଧ୍ୟେ , ଘ୧୨|୧ ରୁ ଘ୨|୨୫ ମଧ୍ୟେ , ଘ୪|୧ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୧୩ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୧ ମଧ୍ୟେ , ଘ୯|୧୪ ରୁ ଘ୧୧|୩୮ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା)ପ୍ରାତଃରୁ ଘ୬|୫୬ ମଧ୍ୟେ , ଦିବା ଘ୪|୪୫ ରୁ ଘ୬|୨୪ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧|୩୦ ରୁ ଘ୩|୭ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସନ୍ଧ୍ୟା ଘ୬|୨୪ ରୁ ଘ୭|୪୫ ମଧ୍ୟେ ,  ରାତ୍ରି ଘ୩|୫୩ ରୁ ଘ୫|୧୩ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 23,
      date: '23/06/2024',
      day: 'ରବିବାର',
      name: 'ଶରଣ ଆରମ୍ଭ , ୧୩ ଦିନିଆ ପକ୍ଷ ଆରମ୍ଭ , ଅଲାରନାଥଙ୍କ ଦର୍ଶନ ଆରମ୍ଭ',
      Image: require('../../assets/Images/rathaImg.jpeg'),
      tithi: '(୨୩) ଜୁନ , ରବିବାର (ଆଷାଢ) ମିଥୁନ ଦି୯ନ , ଜିଲହେଜ ତା୧୫ରିଖ , ସାୟନ ଆଷାଢ ଦି୨ନ',
      sunrise: 'ଘ୫|୧୨|୪୧',
      sunset: 'ଘ୬|୨୪|୨୫',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୬|୫୦ ରୁ ଘ୯|୧୪ ମଧ୍ୟେ , ରାତ୍ରି ଘ୧୧|୩୮ ରୁ ଘ୨|୨  ମଧ୍ୟେ , ସୂର୍ଯ୍ୟାସ୍ତ ଘ୬|୨୪ ରୁ ରାତ୍ରି ଘ୮|୦ ମଧ୍ୟେ , ଘ୧୧|୧୩ ରୁ ଘ୧|୩୭ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୩୮ରୁ ଘ୪|୨୬ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୧୩ ରୁ ଘ୧|୩୦ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୧୪ ରୁ ଘ୨|୩୫ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 24,
      date: '24/06/2024',
      day: 'ସୋମବାର',
      name: '',
      Image: require('../../assets/Images/3rathas.jpg'),
      tithi: '(୨୪) ଜୁନ , ସୋମବାର (ଆଷାଢ) ମିଥୁନ ଦି୧୦ନ , ଜିଲହେଜ ତା୧୭ରିଖ , ସାୟନ ଆଷାଢ ଦି୩ନ',
      sunrise: 'ଘ୫|୧୨|୫୭',
      sunset: 'ଘ୬|୨୪|୩୫',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୮|୨୬ ରୁ ଘ୧୦|୨ ମଧ୍ୟେ , ରାତ୍ରି ଘ୯|୩୭ ରୁ ଘ୧୨|୪୯ ମଧ୍ୟେ , ଘ୨|୨୫ ରୁ ଘ୪|୧ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର)ରାତ୍ରି ଘ୪|୪୮ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୧୩ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା)ପ୍ରାତଃ ଘ୬|୫୩ ରୁ ଘ୮|୩୨ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୩|୮ ରୁ ଘ୪|୪୭ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୨୯ ରୁ ଘ୧୧|୧୨ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 25,
      date: '25/06/2024',
      day: 'ମଙ୍ଗଳବାର',
      name: '',
      Image: require('../../assets/Images/PuriTemple.png'),
      tithi: '(୨୫) ଜୁନ , ମଙ୍ଗଳବାର (ଆଷାଢ) ମିଥୁନ ଦି୧୧ନ , ଜିଲହେଜ ତା୧୮ରିଖ , ସାୟନ ଆଷାଢ ଦି୪ନ',
      sunrise: 'ଘ୫|୧୩|୧୩',
      sunset: 'ଘ୬|୨୪|୪୫',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୭|୩୯ ରୁ ଘ୧୦|୫୧ ମଧ୍ୟେ , ଘ୧|୧୫ ରୁ ଘ୪|୨୭ ମଧ୍ୟେ ,ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୧୦|୨୬ ମଧ୍ୟେ , ଘ୧୨|୫୦ ରୁ ଘ୨|୨୬ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାରବେଳା)ପ୍ରାତଃ ଘ୬|୫୩ ରୁ ଘ୮|୩୨ ମଧ୍ୟେ | (କାଳବେଳା) ଦିବା ଘ୧|୨୯ ରୁ ଘ୩|୮ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୪୭ ରୁ ଘ୯|୮ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 26,
      date: '26/06/2024',
      day: 'ବୁଧବାର',
      name: 'ଶ୍ରୀମନ୍ଦିରରେ ଶ୍ରୀଜୀଉଙ୍କ ଅନବସର ପଞ୍ଚମୀ , ଫୁଲୁରୀ ଲାଗି',
      Image: require('../../assets/Images/PuriBeach.png'),
      tithi: '(୨୬) ଜୁନ , ବୁଧବାର (ଆଷାଢ) ମିଥୁନ ଦି୧୨ନ , ଜିଲହେଜ ତା୧୨ରିଖ , ସାୟନ ଆଷାଢ ଦି୫ନ',
      sunrise: 'ଘ୫|୧୩|୨୯',
      sunset: 'ଘ୬|୨୪|୫୫',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୭|୩୯ ରୁ ଘ୧୦|୫୧ ମଧ୍ୟେ , ଘ୧|୧୫ ରୁ ଘ୪|୨୭ ମଧ୍ୟେ , ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୧୦|୨୬ ମଧ୍ୟେ , ଘ୧୨|୫୦ ରୁ ଘ୨|୨୬ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୩୩ ରୁ ଘ୧୦|୧୧ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୫୦ ରୁ ଘ୧|୨୯ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୩୩ ରୁ ଘ୩|୫୪ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 27,
      date: '27/06/2024',
      day: 'ଗୁରୁବାର',
      name: '',
      Image: require('../../assets/Images/LaxmiPuja.png'),
      tithi: '(୨୭) ଜୁନ , ଗୁରୁବାର (ଆଷାଢ) ମିଥୁନ ଦି୧୩ନ , ଜିଲହେଜ ତା୨୦ରିଖ , ସାୟନ ଜ୍ୟେଷ୍ଠ ଦି୬ନ',
      sunrise: 'ଘ୫|୧୩|୪୪',
      sunset: 'ଘ୬|୨୫|୪',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୨|୫୧ ରୁ ଘ୫|୧୫ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୧୩ ରୁ ଘ୯|୩୭ ମଧ୍ୟେ , ଘ୧୨|୪୯ ରୁ ଘ୩|୧୩ ମଧ୍ୟେ , ଘ୪|୪୮ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୧୪ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୩ ମଧ୍ୟେ , ଘ୯|୧୫ ରୁ ଘ୧୦|୫୧ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୩|୮ ରୁ ଘ୬|୨୫ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୫୧ ରୁ ଘ୧|୧୨ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 28,
      date: '28/06/2024',
      day: 'ଶୁକ୍ରବାର',
      name: 'ଶରଣ ଶେଷ',
      Image: require('../../assets/Images/Mahaprasad.png'),
      tithi: '(୨୮) ଜୁନ , ଶୁକ୍ରବାର (ଆଷାଢ) ମିଥୁନ ଦି୧୪ନ , ଜିଲହେଜ ତା୨୧ରିଖ , ସାୟନ ଆଷାଢ ଦି୭ନ',
      sunrise: 'ଘ୫|୧୪|୧',
      sunset: 'ଘ୬|୨୫|୧୩',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୧୧|୩୯ ରୁ ଘ୨|୩ ମଧ୍ୟେ , ସୂର୍ଯ୍ୟାସ୍ତ ଘ୬|୨୫ ରୁ ରାତ୍ରି ଘ୮|୪୯ ମଧ୍ୟେ , ଘ୧|୩୮ ରୁ ଘ୪|୨ ମଧ୍ୟେ , ଘ୪|୪୯ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୧୪ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ପ୍ରାତଃରୁ ଘ୬|୩ ରୁ ଘ୬|୫୧ ମଧ୍ୟେ , ଘ୯|୧୫ ରୁ ଘ୧୦|୩ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୮|୩୫ ରୁ ଘ୧୧|୫୨ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୯|୯ ରୁ ଘ୧୦|୩୦ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 29,
      date: '29/06/2024',
      day: 'ଶନିବାର',
      name: '',
      Image: require('../../assets/Images/Konark.png'),
      tithi: '(୨୯) ଜୁନ , ଶନିବାର (ଆଷାଢ) ମିଥୁନ ଦି୧୫ନ , ଜିଲହେଜ ତା୨୨ରିଖ , ସାୟନ ଆଷାଢ ଦି୮ନ',
      sunrise: 'ଘ୫|୧୪|୧୫',
      sunset: 'ଘ୬|୨୫|୨୩',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୨|୫୨ ରୁ ଘ୫|୧୬ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୧୪ ରୁ ଘ୮|୨ ମଧ୍ୟେ , ଘ୧୨|୨ ରୁ ଘ୨|୨୬ ମଧ୍ୟେ , ଘ୪|୨ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୧୫ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୧୩ ମଧ୍ୟେ , ଘ୯|୧୬ ରୁ ଘ୧୧|୪୦ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା)ପ୍ରାତଃରୁ ଦିବା ଘ୬|୫୬ ମଧ୍ୟେ , ଘ୪|୪୬ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୬|୨୫ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୧|୩୧ ରୁ ଘ୩|୧୧ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ଅସ୍ତରୁ ରାତ୍ରି ଘ୭|୪୬ ମଧ୍ୟେ ,ଘ୩|୫୬ ରୁ ନିଶାନ୍ତ ଘ୫|୧୫ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 30,
      date: '30/06/2024',
      day: 'ରବିବାର',
      name: '',
      Image: require('../../assets/Images/KhajaBhoga.png'),
      tithi: '(୩୦) ଜୁନ , ରବିବାର (ଆଷାଢ) ମିଥୁନ ଦି୧୬ନ , ଜିଲହେଜ ତା୨୩ରିଖ , ସାୟନ ଆଷାଢ ଦି୯ନ',
      sunrise: 'ଘ୫|୧୪|୩୫',
      sunset: 'ଘ୬|୨୫|୨୭',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୬|୫୨ ରୁ ଘ୯|୧୬ ମଧ୍ୟେ , ଘ୧୧|୪ ରୁ ଘ୨|୪ ମଧ୍ୟେ , ସୂର୍ଯ୍ୟାସ୍ତ ଘ୬|୨୫ ରୁ ରାତ୍ରି ଘ୮|୧ ମଧ୍ୟେ , ଘ୧୧|୧୪ ରୁ ଘ୧|୩୮ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୪୦ ରୁ ଘ୪|୨ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୨୪ ରୁ ଘ୧|୩୦ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୧୪ ରୁ ଘ୨|୩୬ ପର୍ଯ୍ୟନ୍ତ |',
    },
  ]

  const eventsForEnglishMonth = [
    {
      id: 1,
      date: '01/06/2024',
      day: 'Saturday',
      name: '',
      spclDesc: '',
      Image: require('../../assets/Images/rathaImg.jpeg'),
      tithi: 'On June 1, Saturday (Jyeshtha), solar date 23, evening Jyeshtha day 11. ',
      sunrise: '5:10:43 AM',
      sunset: '6:17:47 PM',
      gdTime: '(Amrita) from 2:47 AM to 5:11 AM, from 7:08 PM to 7:56 PM, from 11:59 PM to 12:20 AM, and from 3:56 AM to 5:11 AM; (Mahendra) from 5:59 AM to 11:35 AM.',
      bdTime: '(Kaalabela) from 5:51 AM to 6:49 AM, and from 4:41 PM to 6:18 PM; (Barabela) from 1:24 PM to 3:02 PM; (Kalaratri) from 6:18 PM to 7:41 PM, and from 3:49 AM to dawn until 5:11 in English.',
    },
    {
      id: 2,
      date: '02/06/2024',
      day: 'Sunday',
      name: "There's a ritual of Smartha approved water sports in Shrimandir on the day of Ekadashi.",
      spclDesc: '',
      Image: require('../../assets/Images/KhajaBhoga.png'),
      tithi: 'On June 2, Sunday (Jyeshtha), solar date 24, evening Jyeshtha day 12.',
      sunrise: '5:10:38 AM',
      sunset: '6:18:10 PM',
      gdTime: '(Amrita) from 6:47 AM to 9:11 AM, from 11:35 AM to 11:59 AM, from 7:55 PM to 8:32 PM; (Mahendra) from 3:35 AM to 4:23 AM.',
      bdTime: '(Kaalabela) from 10:09 AM to 11:26 AM; (Kalaratri) from 1:07 AM to 2:28 AM.',
    },
    {
      id: 3,
      date: '03/06/2024',
      day: 'Monday',
      name: 'Sarvavaishnava Sammat Ekadashi.',
      spclDesc: '',
      Image: require('../../assets/Images/PuriTemple.png'),
      tithi: 'On June 3, Monday (Jyeshtha), solar date 25, evening Jyeshtha day 13.',
      sunrise: '5:10:33 AM',
      sunset: '6:18:33 PM',
      gdTime: '  (Amrita) from 8:23 AM to 9:59 AM, from 9:33 PM to 12:45 AM; (Mahendra) from 4:44 PM to 5:10 AM. ',
      bdTime: '  (Kaalabela) from 6:50 AM to 8:29 AM; (Barabela) from 3:33 PM to 3:42 PM; (Kalaratri) from 10:24 PM to 11:46 PM.',
    },
    {
      id: 4,
      date: '04/06/2024',
      day: 'Tuesday',
      name: 'Utkale Bhaunri Yatra, Shreekshetra Haladipani.',
      spclDesc: '',
      Image: require('../../assets/Images/PuriBeach.png'),
      tithi: 'On June 4, Tuesday (Jyeshtha), solar date 26, evening Jyeshtha day 14.',
      sunrise: '5:10:29 AM',
      sunset: '6:18:57 PM',
      gdTime: '(Amrita) from 7:34 AM to 9:35 AM, from 11:45 AM to 3:45 PM, from 7:08 PM to 9:09 PM; (Mahendra) from 1:59 AM to 2:47 AM, from 3:35 AM to 4:23 AM, from 8:45 PM to 10:21 PM.',
      bdTime: '(Kaalabela) from 1:25 AM to 3:03 AM; (Barabela) from 6:50 AM to 8:28 AM; (Kalaratri) from 7:42 PM to 9:03 PM.',
    },
    {
      id: 5,
      date: '05/06/2024',
      day: 'Wednesday',
      name: '',
      spclDesc: '',
      Image: require('../../assets/Images/Mahaprasad.png'),
      tithi: 'On June 5, Wednesday (Jyeshtha), solar date 27, evening Jyeshtha day 15.',
      sunrise: ' 5:10:29 AM',
      sunset: '6:18:57 PM',
      gdTime: ' (Amrita) from 7:35 AM to 10:47 AM, from 11:00 AM to 4:23 PM, from sunset to 10:20 PM.',
      bdTime: '(Kaalabela) from 8:28 AM to 10:07 AM; (Barabela) from 11:46 AM to 1:25 PM; (Kalaratri) from 8:28 PM to 3:50 AM.',
    },
    {
      id: 6,
      date: '06/06/2024',
      day: 'Thursday',
      name: 'Rajendrabhisheka',
      spclDesc: '',
      Image: require('../../assets/Images/LaxmiPuja.png'),
      tithi: 'On June 6, Thursday (Jyeshtha), solar date 28, evening Jyeshtha day 16.',
      sunrise: '5:10:31 AM',
      sunset: ' 6:19:37 PM',
      gdTime: '(Amrita) from 2:47 AM to 5:11 AM, from 7:10 AM to 9:34 PM, from 12:46 PM to 3:10 PM, from 4:46 PM to the end of the night.',
      bdTime: '(Kaalabela) from 3:04 AM to sunrise; (Barabela) from 3:04 PM to 6:20 PM; (Kalaratri) from 11:46 PM to 1:07 AM. ',
    },
    {
      id: 7,
      date: '07/06/2024',
      day: 'Friday',
      name: 'Rukmaniharana Ekadashi , Bibaha Mohatsaba & Jalakrida',
      spclDesc: '',
      Image: require('../../assets/Images/Konark.png'),
      tithi: 'On June 7, Friday (Jyeshtha), solar date 29, evening Jyeshtha day 17.',
      sunrise: '5:10:33 AM',
      sunset: '6:19:57 PM',
      gdTime: ' (Amrita) from 11:31 AM to 1:19 PM, from 8:45 PM to 9:58 PM, from 10:36 PM to the end of the night.',
      bdTime: '(Kaalabela) from 8:29 AM to 11:48 AM; (Barabela) from 8:29 PM to 11:48 PM; (Kalaratri) from 9:04 PM to 10:25 PM.',
    },
    {
      id: 8,
      date: '08/06/2024',
      day: 'Saturday',
      name: '',
      spclDesc: '',
      Image: require('../../assets/Images/KhajaBhoga.png'),
      tithi: 'On June 8, Saturday (Jyeshtha), solar date 35, evening Jyeshtha day 18.',
      sunrise: '5:10:35 AM',
      sunset: '6:20:17 PM',
      gdTime: '(Amrita) from 2:47 AM to 5:11 AM, from 7:10 PM to 7:58 PM, from 11:58 PM to 2:22 AM, and from 3:58 AM to the end of the night. (Mahendra) From early morning to 5:59 AM, from 9:11 AM to 11:35 AM.',
      bdTime: '(Kaalabela) from 5:11 AM to 6:51 AM; (Barabela) from 4:42 PM to 6:20 PM; (Kalaratri) from 6:20 PM to 7:40 PM; from 3:12 AM to 5:11 AM.',
    },
    {
      id: 9,
      date: '09/06/2024',
      day: 'Sunday',
      name: 'Daitapati Prabesha',
      spclDesc: '',
      Image: require('../../assets/Images/rathaImg.jpeg'),
      tithi: 'On June 9, Sunday (Jyeshtha), solar date 36, evening Jyeshtha day 19.',
      sunrise: '5:10:36 AM',
      sunset: ' 6:20:38 PM',
      gdTime: ' (Amrita) from 6:47 AM to 9:11 AM, from 11:35 AM to 11:19 PM, and from 7:58 PM to 10:34 PM. (Mahendra) From 3:35 AM to 4:23 PM.',
      bdTime: ' (Kaalabela) from 6:07 AM to 7:26 AM; (Kalaratri) from 1:08 AM to 2:29 AM. ',
    },
    {
      id: 10,
      date: '10/06/2024',
      day: 'Monday',
      name: 'Shiv Vivahutsav (The Wedding Ceremony of Lord Shiva)',
      spclDesc: '',
      Image: require('../../assets/Images/3rathas.jpg'),
      tithi: '(10) June, Monday (Jyeshtha) Breezy 28th, Evening 20th Jyeshtha',
      sunrise: ' 5:10:38',
      sunset: ' 6:20:58',
      gdTime: '(Amrit) - Daytime from 8:32 to 9:59, at Night from 9:35 to 12:47, from 8:23 to 9:59, (Mohan) at night from 4:47 to 5:11',
      bdTime: '(Kalvela) - From 6:50 to 8:29 in the morning, from 3:05 to 4:44 in the afternoon, at night from 10:26 to 11:47 ',
    },
    {
      id: 11,
      date: '11/06/2024',
      day: 'Tuesday',
      name: "In the Lord's temple, the marriage of Shiva, with the royal dignity, and elsewhere the observance of Sheetala Shashti, Aranya Shashti fast.",
      spclDesc: '',
      Image: require('../../assets/Images/PuriTemple.png'),
      tithi: '(11) June, Tuesday (Jyeshtha), Breezy 29th, Evening 21st Jyeshtha',
      sunrise: '5:10:40',
      sunset: '6:21:20',
      gdTime: '(Amrit) - From sunrise to 7:35 AM, from 9:11 AM to 11:35 AM, from 2:47 PM to 3:45 PM, from sunset to 7:10 PM, from 12:47 AM to 3:11 AM, (Mohan) from 1:59 AM to 2:47 AM, from 3:35 AM to 4:23 AM, from 8:47 PM to 10:23 PM ',
      bdTime: '(Kalvela) - From 6:29 AM to 8:38 AM, from 6:52 AM to 8:31 AM, from 7:44 PM to 9:05 PM ',
    },
    {
      id: 12,
      date: '12/06/2024',
      day: 'Thursday',
      name: 'Shitala Shashti festival at the Shrimandir ',
      spclDesc: '',
      Image: require('../../assets/Images/PuriBeach.png'),
      tithi: '(12) June, Wednesday (Jyeshtha), Breezy 30th,  Evening 22nd Jyeshtha ',
      sunrise: '5:10:46',
      sunset: '6:21:38',
      gdTime: '(Amrit) - From sunrise to 7:36 AM, from 9:12 AM to 10:48 AM, from 1:12 PM to 4:24 PM, from sunset to 10:23 PM, (Mohan) from 10:47 PM to 2:23 AM.',
      bdTime: ' (Kalvela) - From 8:29 AM to 10:08 AM, from 11:47 AM to 1:26 PM, from 2:30 AM to 3:51 AM.',
    },
    {
      id: 13,
      date: '13/06/2024',
      day: 'Thursday',
      name: '',
      spclDesc: '',
      Image: require('../../assets/Images/Mahaprasad.png'),
      tithi: 'June 13th, Thursday (Jyeshtha), Breezy 31st, Evening 23rd Jyeshtha',
      sunrise: '5:10:58',
      sunset: '6:22:00',
      gdTime: '(Amrit) - From 2:44 PM to 5:08 PM, from 7:11 PM to 9:35 PM, from 12:47 PM to 3:11 AM, from 4:47 PM to sunrise, (Mohan) from sunrise to 5:59 AM, from 9:11 AM to 10:47 AM ',
      bdTime: '(Bara and Kalvela) - From 3:07 AM to sunset, from sunset to 6:22 PM, (Kalaraatri) from 11:49 PM to 1:11 AM ',
    },
    {
      id: 14,
      date: '14/06/2024',
      day: 'Friday',
      name: 'Masantha, Pahili Raja.',
      spclDesc: '',
      Image: require('../../assets/Images/Konark.png'),
      tithi: 'June 14, Friday (Jyeshtha), Bhrusha day 32, evening Jyeshtha day 24.',
      sunrise: '5:11:00.',
      sunset: '6:22:14',
      gdTime: 'From Amrita daytime 11:36 AM to 2:00 PM, from sunset to 8:46 PM, from night 1:13 AM to 3:07 AM, remaining night until 5:11 AM.',
      bdTime: 'From 8:30 AM to 11:51 AM (Daytime), from 9:06 PM to 10:27 PM (Night).',
    },
    {
      id: 15,
      date: '15/06/2024',
      day: 'Thursday',
      name: 'In the Jagannath Temple and everywhere else, the onset of Mithuna (estrus) is observed. ',
      spclDesc: '',
      Image: require('../../assets/Images/LaxmiPuja.png'),
      tithi: 'On June 15, Saturday (Ashadha), Mithuna day 1, Jilhej date 8, evening Jyeshtha day 25. ',
      sunrise: '5:11:6.',
      sunset: '6:22:32',
      gdTime: 'From Amrita daytime 2:48 PM to 5:12 PM, from sunset 7:12 PM to 8:00 PM, from midnight 12:00 AM to 2:24 AM, remaining night until 4:00 AM. From Mahendra, from sunrise to daytime 6:00 AM, from 9:12 PM to 11:36 PM',
      bdTime: 'From 5:11 AM to 6:54 AM (Morning), from 4:19 PM to 6:23 PM (Daytime), from 1:27 PM to 3:06 PM (Afternoon), from 6:23 PM to 7:44 PM (Evening), from 3:50 AM to midnight 5:11 AM (Night). ',
    },
    {
      id: 16,
      date: '16/06/2024',
      day: 'Sunday',
      name: 'In the Jagannath Temple, the coronation of Lord ShriJiu, Ganga Dashahara, Ganga Snana, Bhumi Daha, and the third (last) day of estrus are observed.',
      spclDesc: '',
      Image: require('../../assets/Images/KhajaBhoga.png'),
      tithi: 'On June 16, Sunday (Ashadha), Mithuna day 2, evening Jyeshtha day 26.',
      sunrise: '5:11:13.',
      sunset: '6:22:43.',
      gdTime: 'From Amrita daytime 6:48 AM to 9:12 AM, from 12:36 PM to 2:00 PM, from sunset to 8:00 PM, from night 8:00 PM to 9:36 PM, from 11:12 PM to midnight 12:24 AM. From Mahendra, from sunrise to 3:36 AM, from 4:24 PM to 6:24 PM.',
      bdTime: 'From 10:12 AM to 12:30 PM (Morning), from 9:11 PM to 10:32 PM (Night).',
    },
    {
      id: 17,
      date: '17/06/2024',
      day: 'Monday',
      name: 'Basumati Snana , the marriage of Rukmini is celebrated.',
      spclDesc: '',
      Image: require('../../assets/Images/rathaImg.jpeg'),
      tithi: 'On June 17, Monday (Ashadha), Mithuna day 3, evening Jyeshtha day 27.',
      sunrise: '5:11:28.',
      sunset: '6:23:0.',
      gdTime: 'From Amrita daytime 8:24 AM to 10:00 AM, from 9:36 PM to 12:48 AM. From Mahendra, from 4:48 PM to 12:00 AM.',
      bdTime: 'From 6:52 AM to 8:34 AM (Morning), from 3:06 PM to 4:45 PM (Afternoon), from 10:28 PM to 11:49 PM (Night).',
    },
    {
      id: 18,
      date: '18/06/2024',
      day: 'Tuesday',
      name: 'At the Jagannath Temple and universally observed Nirjala Ekadashi, the abduction of Rukmini and the Champak Dwadashi festival are celebrated.',
      spclDesc: '',
      Image: require('../../assets/Images/3rathas.jpg'),
      tithi: 'On June 18, Tuesday (Ashadha), Mithuna day 4, evening Jyeshtha day 28.',
      sunrise: '5:11:40.',
      sunset: '6:23:16',
      gdTime: 'From Amrita, from sunrise 7:37 AM to 11:37 AM, from 9:13 PM to 11:37 PM. From 2:49 PM to 3:37 PM. From Mahendra, from 5:01 AM to 6:49 AM, from 3:52 PM to 4:25 PM, from sunset 8:48 PM to 10:24 PM.',
      bdTime: ' From 6:52 AM to 8:31 AM (Morning), from 5:29 PM to 8:08 PM (Afternoon), from 7:46 PM to 9:07 PM (Night).',
    },
    {
      id: 19,
      date: '19/06/2024',
      day: 'Wednesday',
      name: 'On the Champak Dwadashi at the Jagannath Temple: ',
      spclDesc: '',
      Image: require('../../assets/Images/PuriTemple.png'),
      tithi: 'On June 19, Wednesday (Ashadha), Mithuna day 5, evening Jyeshtha day 29.',
      sunrise: '5:11:51',
      sunset: '6:23:31.',
      gdTime: 'From Amrita, from 7:37 AM to 10:49 AM, from 1:13 PM to 4:25 PM. From sunset, from 7:25 PM to 10:25 PM. From Mahendra, from 10:25 PM to 12:49 AM, from 2:49 AM to 4:25 AM, from 10:25 AM to 12:49 PM.',
      bdTime: ' From 8:31 AM to 10:10 AM (Morning), from 11:49 AM to 12:28 PM (Afternoon), from 2:31 PM to 3:52 PM (Evening). From 2:31 AM to 3:52 AM (Night).',
    },
    {
      id: 20,
      date: '20/06/2024',
      day: 'Thursday',
      name: 'On the entry of Deitapati Seva at the Jagannath Temple:',
      spclDesc: '',
      Image: require('../../assets/Images/PuriBeach.png'),
      tithi: 'On June 20, Thursday (Ashadha), Mithuna day 6, evening Jyeshtha day 30.',
      sunrise: '5:12:02.',
      sunset: ' 6:23:46.',
      gdTime: 'From Amrita, from 8:51 AM to 5:14 PM, from 7:13 PM to 9:37 PM, from 12:49 AM to 3:13 AM, from 4:47 AM to 5:12 AM. From Mahendra, from 6:01 AM to 10:49 AM.',
      bdTime: 'From 9:07 AM to 12:24 PM (Morning), from 7:49 PM to 9:12 PM (Evening). From 3:07 PM to 6:24 PM (Afternoon). From 11:49 PM to 1:10 AM (Night).',
    },
    {
      id: 21,
      date: '21/06/2024',
      day: 'Friday',
      name: 'The fourth-day ritual for Lord Jagannath is taking place in the temple, with Senpati Lagi',
      spclDesc: '',
      Image: require('../../assets/Images/Mahaprasad.png'),
      tithi: 'On June 21, Friday (Ashadha), Mithuna day 7, evening Jyeshtha day 31.',
      sunrise: '5:12:13.',
      sunset: '6:24:01.',
      gdTime: 'From Amrita, from 8:49 PM to 5:37 AM, from 1:37 PM to 5:01 PM, from 4:48 AM to 5:12 AM. From Mahendra, from 6:00 AM to 6:48 AM, from 9:13 PM to 10:01 PM.',
      bdTime: 'From 8:35 AM to 11:53 AM (Morning), from 8:35 PM to 10:28 PM (Evening). From 6:00 PM to 6:48 PM (Evening). From 9:07 PM to 10:28 PM (Night).',
    },
    {
      id: 22,
      date: '22/06/2024',
      day: 'Saturday',
      name: "The auspicious occasion of Lord Jagannath's birthday, Deva Snana Purnima, the procession of Lord Jagannath's bathing ritual, Snanamandapa Gajanana besa. ",
      Image: require('../../assets/Images/LaxmiPuja.png'),
      tithi: 'June 22, Saturday, Aashadha, Gemini, 15th day of the bright fortnight ',
      sunrise: '5:12:24 AM',
      sunset: '6:24:16 PM',
      gdTime: ' (Amrita) - From 2:50:14 PM to 5:14:1 PM, From 7:13:1 PM to 8:1:25 PM, From 12:1:25 AM to 2:25:12 AM, From 4:1:1 AM to 5:12:13 AM. (According to Maheendra) ',
      bdTime: ' (Kalabela) - From 6:56:56 AM to 6:24:45 AM, From 4:45:45 PM to 6:24:45 PM, From 1:30:30 PM to 3:7:7 PM, From 6:24:45 PM to 7:45:13 PM. (According to Maheendra) ',
    },
    {
      id: 23,
      date: '23/06/2024',
      day: 'Sunday',
      name: 'The commencement of Sharana, the start of the thirteen-day fortnight, and the beginning of the visit to Alarnath.',
      spclDesc: '',
      Image: require('../../assets/Images/Konark.png'),
      tithi: 'June 23, Sunday, Aashadha, Gemini, 15th day of the bright fortnight',
      sunrise: ' 5:12:41 AM',
      sunset: '6:24:25 PM',
      gdTime: ' (Amrita) - From 6:50:14 AM to 9:14:1 AM, From 11:38:2 PM to 12:24:0 AM, From 6:24:0 AM to 8:0:0 AM, From 11:13:0 AM to 1:37:0 PM. (According to Maheendra)',
      bdTime: ' (Kalabela) - From 10:13:0 AM to 11:30:0 AM, From 1:14:0 AM to 2:35:0 AM. (According to Maheendra)',
    },
    {
      id: 24,
      date: '24/06/2024',
      day: 'Monday',
      name: '',
      spclDesc: '',
      Image: require('../../assets/Images/KhajaBhoga.png'),
      tithi: 'June 24, Monday, Aashadha, Gemini, 17th day of the bright fortnight ',
      sunrise: '5:12:57 AM',
      sunset: ' 6:24:35 PM',
      gdTime: ' (Amrita) - From 8:26:2 AM to 10:2:0 AM, From 9:37:0 PM to 12:49:0 AM, From 2:25:0 PM to 4:1:0 PM. (According to Maheendra) ',
      bdTime: '(Kalabela) - From 6:53:0 AM to 8:32:0 AM, From 3:8:0 PM to 4:47:0 PM, From 10:29:0 PM to 11:12:0 PM. (According to Maheendra) ',
    },
    {
      id: 25,
      date: '25/06/2024',
      day: 'Tuesday',
      name: 'Snana Yatra , Gajanan Besha & Anabasara Arambha',
      spclDesc: '',
      Image: require('../../assets/Images/3rathas.jpg'),
      tithi: 'June 25, Tuesday, Aashadha, Gemini, 18th day of the bright fortnight',
      sunrise: '5:13:13 AM',
      sunset: ' 6:24:45 PM',
      gdTime: '(Amrita) - From 7:39:0 AM to 10:51:0 AM, From 1:15:0 PM to 4:27:0 PM, From sunset to 8:26:0 PM. ',
      bdTime: '(Kalabela) - From 6:53:0 AM to 8:32:0 AM, From 3:8:0 PM to 4:47:0 PM, From 10:29:0 PM to 11:12:0 PM. (According to Maheendra) ',
    },
    {
      id: 26,
      date: '26/06/2024',
      day: 'Wednesday',
      name: 'Anabasara Panchami at the Shrimandira, Puri, Odisha: ',
      spclDesc: '',
      Image: require('../../assets/Images/rathaImg.jpeg'),
      tithi: 'June 26, Wednesday, Aashadha, Gemini, 12th day of the bright fortnight ',
      sunrise: ' 5:13:29 AM',
      sunset: ' 6:24:55 PM',
      gdTime: ' (Amrita) - From 7:39:0 AM to 10:51:0 AM, From 1:15:0 PM to 4:27:0 PM, From sunset to 8:26:0 PM. ',
      bdTime: '(Kalabela) - From 8:33:0 AM to 10:11:0 AM, From 11:50:0 AM to 1:29:0 PM, From 2:33:0 PM to 3:54:0 PM. ',
    },
    {
      id: 27,
      date: '27/06/2024',
      day: 'Thursday',
      name: 'Snana Yatra , Gajanan Besha & Anabasara Arambha',
      spclDesc: '',
      Image: require('../../assets/Images/PuriTemple.png'),
      tithi: 'On June 27, Thursday, Aashadha, Gemini, 13th day of the bright fortnight:',
      sunrise: ' 5:13:44 AM',
      sunset: '6:25:04 PM',
      gdTime: ' (Amrita) - From 2:51:0 AM to 5:15:0 AM, From 7:13:0 PM to 9:37:0 PM, From 12:49:0 PM to 3:13:0 PM, From 4:48:0 PM to the end of night. ',
      bdTime: ' (Kalabela) - From 3:8:0 AM to 6:25:0 AM, From 11:51:0 PM to 1:12:0 AM. ',
    },
    {
      id: 28,
      date: '28/06/2024',
      day: 'Friday',
      name: 'End of Sharan',
      spclDesc: '',
      Image: require('../../assets/Images/PuriBeach.png'),
      tithi: 'On June 28, Friday, Aashadha, Gemini, 14th day of the bright fortnight: ',
      sunrise: ' 5:14:01 AM',
      sunset: '6:25:13 PM',
      gdTime: '(Amrita) - From 11:39:00 AM to 12:03:00 PM, From 6:25:00 PM to 8:49:00 PM, From 1:38:00 PM to 4:02:00 PM, From 4:49:00 PM to the end of night. ',
      bdTime: '(Kalabela) - From 8:35:00 AM to 11:52:00 AM, From 9:09:00 PM to 10:30:00 PM. ',
    },
    {
      id: 29,
      date: '29/06/2024',
      day: 'Saturday',
      name: '',
      spclDesc: '',
      Image: require('../../assets/Images/Mahaprasad.png'),
      tithi: 'On June 29, Saturday, Aashadha, Gemini, 15th day, the morning: ',
      sunrise: ' 5:14:15 AM',
      sunset: '6:25:23 PM',
      gdTime: '(Amrita) Day 2:52 to 5:16 PM, Night: 7:14 AM to 8:2 AM, 12:2 AM to 2:26 AM, 4:2 AM to 5:15 PM. (Mahendra) From sunrise to 6:13, 9:16 to 11:40. ',
      bdTime: '(Kalabela) : from dawn to dusk at 6:56 a.m., from 4:46 a.m. to sunset at 6:25 p.m. (Barbela) Diba 1:31 to 3:11 (Midnight) from midnight to 7:46 p.m., from 3:56 p.m. to 5:15 p.m. ',
    },
    {
      id: 30,
      date: '30/06/2024',
      day: 'Sunday',
      name: '',
      spclDesc: '',
      Image: require('../../assets/Images/LaxmiPuja.png'),
      tithi: '30 June, Sunday (Asadha) Gemini the 16th, Zilhez Ta23rikh, Saion Asad the 9th ',
      sunrise: '05:14:35 a.m hrs',
      sunset: '6:25:27 p.m',
      gdTime: ' (Amrita) Daylight 6:52 to 9:16, 11:4 to 2:4, Sunset 6:25 to 8:1, Night 11:14 to 1:38. (Mahendra) Daylight from 3:40 to 4:20 p.m ',
      bdTime: ' (Kalabela) : (twelfth hour) Diba from 10:24 to 1:30 (Night) from 1:14 am to 2:36 am ',
    },
  ]

  const CUSTOMOdia_DATE = [
    { id: 1, showDate: '୨୬', disable: 'yes', date: '26/05/2024', spclEvent: 'no' },
    { id: 2, showDate: '୨୭', disable: 'yes', date: '27/05/2024', spclEvent: 'no' },
    { id: 3, showDate: '୨୮', disable: 'yes', date: '28/05/2024', spclEvent: 'no' },
    { id: 4, showDate: '୨୯', disable: 'yes', date: '29/05/2024', spclEvent: 'no' },
    { id: 5, showDate: '୩୦', disable: 'yes', date: '30/05/2024', spclEvent: 'no' },
    { id: 6, showDate: '୩୧', disable: 'yes', date: '31/05/2024', spclEvent: 'no' },
    { id: 7, showDate: '୧', disable: 'no', date: '01/06/2024', spclEvent: 'no' },
    { id: 8, showDate: '୨', disable: 'no', date: '02/06/2024', spclEvent: 'yes' },
    { id: 9, showDate: '୩', disable: 'no', date: '03/06/2024', spclEvent: 'yes' },
    { id: 10, showDate: '୪', disable: 'no', date: '04/06/2024', spclEvent: 'yes' },
    { id: 11, showDate: '୫', disable: 'no', date: '05/06/2024', spclEvent: 'no' },
    { id: 12, showDate: '୬', disable: 'no', date: '06/06/2024', spclEvent: 'yes' },
    { id: 13, showDate: '୭', disable: 'no', date: '07/06/2024', spclEvent: 'yes' },
    { id: 14, showDate: '୮', disable: 'no', date: '08/06/2024', spclEvent: 'no' },
    { id: 15, showDate: '୯', disable: 'no', date: '09/06/2024', spclEvent: 'yes' },
    { id: 16, showDate: '୧୦', disable: 'no', date: '10/06/2024', spclEvent: 'yes' },
    { id: 17, showDate: '୧୧', disable: 'no', date: '11/06/2024', spclEvent: 'yes' },
    { id: 18, showDate: '୧୨', disable: 'no', date: '12/06/2024', spclEvent: 'yes' },
    { id: 19, showDate: '୧୩', disable: 'no', date: '13/06/2024', spclEvent: 'no' },
    { id: 20, showDate: '୧୪', disable: 'no', date: '14/06/2024', spclEvent: 'yes' },
    { id: 21, showDate: '୧୫', disable: 'no', date: '15/06/2024', spclEvent: 'yes' },
    { id: 22, showDate: '୧୬', disable: 'no', date: '16/06/2024', spclEvent: 'yes' },
    { id: 23, showDate: '୧୭', disable: 'no', date: '17/06/2024', spclEvent: 'yes' },
    { id: 24, showDate: '୧୮', disable: 'no', date: '18/06/2024', spclEvent: 'yes' },
    { id: 25, showDate: '୧୯', disable: 'no', date: '19/06/2024', spclEvent: 'yes' },
    { id: 26, showDate: '୨୦', disable: 'no', date: '20/06/2024', spclEvent: 'yes' },
    { id: 27, showDate: '୨୧', disable: 'no', date: '21/06/2024', spclEvent: 'yes' },
    { id: 28, showDate: '୨୨', disable: 'no', date: '22/06/2024', spclEvent: 'yes' },
    { id: 29, showDate: '୨୩', disable: 'no', date: '23/06/2024', spclEvent: 'yes' },
    { id: 30, showDate: '୨୪', disable: 'no', date: '24/06/2024', spclEvent: 'no' },
    { id: 31, showDate: '୨୫', disable: 'no', date: '25/06/2024', spclEvent: 'yes' },
    { id: 32, showDate: '୨୬', disable: 'no', date: '26/06/2024', spclEvent: 'yes' },
    { id: 33, showDate: '୨୭', disable: 'no', date: '27/06/2024', spclEvent: 'yes' },
    { id: 34, showDate: '୨୮', disable: 'no', date: '28/06/2024', spclEvent: 'yes' },
    { id: 35, showDate: '୨୯', disable: 'no', date: '29/06/2024', spclEvent: 'no' },
    { id: 36, showDate: '୩୦', disable: 'no', date: '30/06/2024', spclEvent: 'no' },
    { id: 37, showDate: '୧', disable: 'yes', date: '01/07/2024', spclEvent: 'no' },
    { id: 38, showDate: '୨', disable: 'yes', date: '02/07/2024', spclEvent: 'no' },
    { id: 39, showDate: '୩', disable: 'yes', date: '03/07/2024', spclEvent: 'no' },
    { id: 40, showDate: '୪', disable: 'yes', date: '04/07/2024', spclEvent: 'no' },
    { id: 41, showDate: '୫', disable: 'yes', date: '05/07/2024', spclEvent: 'no' },
    { id: 42, showDate: '୬', disable: 'yes', date: '06/07/2024', spclEvent: 'no' },
  ];

  const CUSTOMEnglish_DATE = [
    { id: 1, showDate: '26', disable: 'yes', date: '26/05/2024', spclEvent: 'no' },
    { id: 2, showDate: '27', disable: 'yes', date: '27/05/2024', spclEvent: 'no' },
    { id: 3, showDate: '28', disable: 'yes', date: '28/05/2024', spclEvent: 'no' },
    { id: 4, showDate: '29', disable: 'yes', date: '29/05/2024', spclEvent: 'no' },
    { id: 5, showDate: '30', disable: 'yes', date: '30/05/2024', spclEvent: 'no' },
    { id: 6, showDate: '31', disable: 'yes', date: '31/05/2024', spclEvent: 'no' },
    { id: 7, showDate: '1', disable: 'no', date: '01/06/2024', spclEvent: 'no' },
    { id: 8, showDate: '2', disable: 'no', date: '02/06/2024', spclEvent: 'yes' },
    { id: 9, showDate: '3', disable: 'no', date: '03/06/2024', spclEvent: 'yes' },
    { id: 10, showDate: '4', disable: 'no', date: '04/06/2024', spclEvent: 'yes' },
    { id: 11, showDate: '5', disable: 'no', date: '05/06/2024', spclEvent: 'no' },
    { id: 12, showDate: '6', disable: 'no', date: '06/06/2024', spclEvent: 'yes' },
    { id: 13, showDate: '7', disable: 'no', date: '07/06/2024', spclEvent: 'yes' },
    { id: 14, showDate: '8', disable: 'no', date: '08/06/2024', spclEvent: 'no' },
    { id: 15, showDate: '9', disable: 'no', date: '09/06/2024', spclEvent: 'yes' },
    { id: 16, showDate: '10', disable: 'no', date: '10/06/2024', spclEvent: 'yes' },
    { id: 17, showDate: '11', disable: 'no', date: '11/06/2024', spclEvent: 'yes' },
    { id: 18, showDate: '12', disable: 'no', date: '12/06/2024', spclEvent: 'yes' },
    { id: 19, showDate: '13', disable: 'no', date: '13/06/2024', spclEvent: 'yes' },
    { id: 20, showDate: '14', disable: 'no', date: '14/06/2024', spclEvent: 'yes' },
    { id: 21, showDate: '15', disable: 'no', date: '15/06/2024', spclEvent: 'yes' },
    { id: 22, showDate: '16', disable: 'no', date: '16/06/2024', spclEvent: 'yes' },
    { id: 23, showDate: '17', disable: 'no', date: '17/06/2024', spclEvent: 'yes' },
    { id: 24, showDate: '18', disable: 'no', date: '18/06/2024', spclEvent: 'yes' },
    { id: 25, showDate: '19', disable: 'no', date: '19/06/2024', spclEvent: 'yes' },
    { id: 26, showDate: '20', disable: 'no', date: '20/06/2024', spclEvent: 'yes' },
    { id: 27, showDate: '21', disable: 'no', date: '21/06/2024', spclEvent: 'yes' },
    { id: 28, showDate: '22', disable: 'no', date: '22/06/2024', spclEvent: 'yes' },
    { id: 29, showDate: '23', disable: 'no', date: '23/06/2024', spclEvent: 'yes' },
    { id: 30, showDate: '24', disable: 'no', date: '24/06/2024', spclEvent: 'no' },
    { id: 31, showDate: '25', disable: 'no', date: '25/06/2024', spclEvent: 'yes' },
    { id: 32, showDate: '26', disable: 'no', date: '26/06/2024', spclEvent: 'yes' },
    { id: 33, showDate: '27', disable: 'no', date: '27/06/2024', spclEvent: 'yes' },
    { id: 34, showDate: '28', disable: 'no', date: '28/06/2024', spclEvent: 'yes' },
    { id: 35, showDate: '29', disable: 'no', date: '29/06/2024', spclEvent: 'no' },
    { id: 36, showDate: '30', disable: 'no', date: '30/06/2024', spclEvent: 'no' },
    { id: 37, showDate: '1', disable: 'yes', date: '01/07/2024', spclEvent: 'no' },
    { id: 38, showDate: '2', disable: 'yes', date: '02/07/2024', spclEvent: 'no' },
    { id: 39, showDate: '3', disable: 'yes', date: '03/07/2024', spclEvent: 'no' },
    { id: 40, showDate: '4', disable: 'yes', date: '04/07/2024', spclEvent: 'no' },
    { id: 41, showDate: '5', disable: 'yes', date: '05/07/2024', spclEvent: 'no' },
    { id: 42, showDate: '6', disable: 'yes', date: '06/07/2024', spclEvent: 'no' },
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
              <TouchableOpacity onPress={() => navigation.navigate('May2024')}>
                <AntDesign name="caretleft" color={'#000'} size={25} />
              </TouchableOpacity>
              {selectedLanguage === "Odia" &&
                <Text style={{ color: '#000', fontSize: 17, fontWeight: '600' }}>ଜୁନ  ୨୦୨୪</Text>
              }
              {selectedLanguage === "English" &&
                <Text style={{ color: '#000', fontSize: 17, fontWeight: '600' }}>June  2024</Text>
              }
              <TouchableOpacity onPress={() => navigation.replace('July2024')}>
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

export default June2024

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