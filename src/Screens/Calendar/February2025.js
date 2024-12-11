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

const February2025 = (props) => {

  const eventsForOdiaMonth = [
    {
      id: 1,
      date: '01/02/2025',
      day: 'ଶନିବାର',
      name: 'ଶ୍ରୀ ଜୀଉ ଙ୍କ ପଦ୍ମ ବେଶଶ୍ରୀମନ୍ଦିରେ ଶ୍ରୀଜୀଉଙ୍କର ପଦ୍ମମୁଖ ବେଶ , ବରଦା ଚତୁର୍ଥୀ , ବରଦା ଗଣେଶ ପୂଜା , ଶରଣ ଶେଷ',
      Image: '',
      tithi: '(୧) ଫେବୃଆରୀ , ଶନିବାର (ମାଘ) ମକର ଦି୧୯ନ , ସାବାନ୍ ତା୨ରିଖ , ସାୟନ ମାଘ ଦି୧୨ନ',
      sunrise: 'ଘ୬|୨୫|୪୧',
      sunset: 'ଘ୫|୩୪|୫୫',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୧୦|୨୪ ରୁ ଘ୧|୩୬ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୨ ରୁ ଘ୧୦|୨୬ ମଧ୍ୟେ , ଘ୧୨|୨ ରୁ ଘ୧|୩୮ ମଧ୍ୟେ , ଘ୨|୨୬ ରୁ ଘ୪|୨ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ପ୍ରାତଃରୁ ଦିବା ଘ୭|୪୮ ମଧ୍ୟେ , ଘ୪|୧୦ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୩୫ ପର୍ଯ୍ୟନ୍ତ  | (ବାରବେଳା) ଦିବା ଘ୧|୨୫ ରୁ ୨|୪୯ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୭|୧୨ ମଧ୍ୟେ ,  ଘ୪|୪୧ ରୁ ନିଶାନ୍ତ ଘ୬|୨୫ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 2,
      date: '02/02/2025',
      day: 'ରବିବାର',
      name: 'ଶ୍ରୀମନ୍ଦିରେ ଓ ସର୍ବତ୍ର ବସନ୍ତ ପଞ୍ଚମୀ , ରଥକାଠ ଅନୁକୂଳ ଓ ପୂଜା , ଶ୍ରୀପଞ୍ଚମୀ(ସରସ୍ଵତୀ ପୂଜା)',
      Image: '',
      tithi: '(୨) ଫେବୃଆରୀ , ରବିବାର (ମାଘ) ମକର ଦି୨୦ନ , ସାବାନ୍ ତା୩ରିଖ , ସାୟନ ମାଘ ଦି୧୩ନ',
      sunrise: 'ଘ୬|୨୫|୨୨',
      sunset: 'ଘ୫|୩୫|୩୦',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୭|୧୧ ରୁ ଘ୧୦|୨୩ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୧୪ ରୁ ଘ୮|୫୦ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୧ ମଧ୍ୟେ , ଘ୧|୩୫ ରୁ ଘ୨|୨୩ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୨୬ ରୁ ରାତ୍ରି ଘ୭|୧୪ ମଧ୍ୟେ , ଘ୧୧|୨ ରୁ ଘ୩|୧୪ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୧୦|୩୬ ରୁ ଘ୧|୨୫ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୩୬ ରୁ ଘ୩|୧୧ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 3,
      date: '03/02/2025',
      day: 'ସୋମବାର',
      name: '',
      Image: '',
      tithi: '(୩) ଫେବୃଆରୀ , ସୋମବାର (ମାଘ) ମକର ଦି୨୧ନ , ସାବାନ୍ ତା୪ରିଖ , ସାୟନ ମାଘ ଦି୧୪ନ',
      sunrise: 'ଘ୬|୨୫|୩',
      sunset: 'ଘ୫|୩୬|୫',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୫୯ ମଧ୍ୟେ , ଘ୧୧|୧୧ ରୁ ଘ୧|୩୫ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୨୭ ରୁ ଘ୮|୫୧ ମଧ୍ୟେ , ଘ୧୧|୧୫ ରୁ ଘ୨|୨୭ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୫୭ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୩୬ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୪୭ ରୁ ଘ୯|୧୧ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୨|୫୦ ରୁ ୪|୧୫ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୨୫ ରୁ ଘ୧୨|୦ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 4,
      date: '04/02/2025',
      day: 'ମଙ୍ଗଳବାର',
      name: 'ଶ୍ରୀମନ୍ଦିରେ ମାଘ ସପ୍ତମୀ , ତିଳ ସପ୍ତମୀ , ରବିମହାଗ୍ରହ ଜୟନ୍ତୀ , କୋଣାର୍କ (ଚନ୍ଦ୍ରଭାଗା) ସ୍ନାନ',
      Image: '',
      tithi: '(୪) ଫେବୃଆରୀ , ମଙ୍ଗଳବାର (ମାଘ) ମକର ଦି୨୨ନ , ସାବାନ୍ ତା୫ରିଖ , ସାୟନ ମାଘ ଦି୧୫ନ',
      sunrise: 'ଘ୬|୨୪|୪୨',
      sunset: 'ଘ୫|୩୬|୩୮',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୮|୪୭ ରୁ ଘ୧୧|୧୧ ମଧ୍ୟେ , ଘ୧|୩୫ ରୁ ଘ୩|୧୧ ମଧ୍ୟେ , ଘ୩|୫୯ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୩୭ ପର୍ଯ୍ୟନ୍ତ , ସୂର୍ଯ୍ୟାସ୍ତରୁ ସନ୍ଧ୍ୟା ଘ୬|୨୯ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୫୨ ରୁ ଘ୧୨|୨୬ ମଧ୍ୟେ , ଘ୨|୪୦ ରୁ ଘ୪|୧୬ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୨୫ ରୁ ଘ୨|୫୦ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୭|୪୬ ରୁ ୯|୧୧ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୧୫ ରୁ ଘ୮|୫୦ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 5,
      date: '05/02/2025',
      day: 'ବୁଧବାର',
      name: 'ଭୀଷ୍ମ ତର୍ପଣ ଓ ଭୀଷ୍ମଷ୍ଟମୀ ଶ୍ରାଦ୍ଧ , ବୁଧାଷ୍ଟମୀ ସ୍ନାନ',
      Image: '',
      tithi: '(୫) ଫେବୃଆରୀ , ବୁଧବାର (ମାଘ) ମକର ଦି୨୩ନ , ସାବାନ୍ ତା୬ରିଖ , ସାୟନ ମାଘ ଦି୧୬ନ',
      sunrise: 'ଘ୬|୨୪|୧୯',
      sunset: 'ଘ୫|୩୭|୧୩',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୫୮ ମଧ୍ୟେ , ଘ୧୨|୪୬ ରୁ ଘ୨|୨୨ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୨୮ ରୁ ରାତ୍ରି ଘ୮|୫୨ ମଧ୍ୟେ , ଘ୧|୩୯ ରୁ ନିଶାନ୍ତ ଘ୫|୩୯ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୪|୪୫ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୩୭ ପର୍ଯ୍ୟନ୍ତ , ରାତ୍ରି ଘ୮|୫୨ ରୁ ୧୦|୨୮ ମଧ୍ୟେ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୯|୧୧ ରୁ ଘ୧୦|୩୭ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୨|୧ ରୁ ୧|୨୬ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୩|୩୦ ରୁ ଘ୩|୪୮ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 6,
      date: '06/02/2025',
      day: 'ଗୁରୁବାର',
      name: '',
      Image: '',
      tithi: '(୬) ଫେବୃଆରୀ , ଗୁରୁବାର (ମାଘ) ମକର ଦି୨୪ନ , ସାବାନ୍ ତା୭ରିଖ , ସାୟନ ମାଘ ଦି୧୭ନ',
      sunrise: 'ଘ୬|୨୩|୫୪',
      sunset: 'ଘ୫|୩୭|୪୬',
      gdTime: '(ଅମୃତ) ରାତ୍ରି ଘ୧୨|୫୩ ରୁ ଘ୩|୧୭ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୫୮ , ଘ୧୧|୧୦ ରୁ ଘ୧|୩୫ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୨|୦ ରୁ ଘ୧|୩୫ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 7,
      date: '07/02/2025',
      day: 'ଶୁକ୍ରବାର',
      name: '',
      Image: '',
      tithi: '(୭) ଫେବୃଆରୀ , ଶୁକ୍ରବାର (ମାଘ) ମକର ଦି୨୫ନ , ସାବାନ୍ ତା୮ରିଖ , ସାୟନ ମାଘ ଦି୧୮',
      sunrise: 'ଘ୬|୨୫|୪୧',
      sunset: 'ଘ୫|୩୪|୫୫',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୫୭ ମଧ୍ୟେ , ଘ୮|୪୫ ରୁ ଘ୧୧|୯ ମଧ୍ୟେ , ଘ୧|୩୩ ରୁ ଘ୩|୯ ମଧ୍ୟେ , ଘ୪|୪୧ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୩୯ ପର୍ଯ୍ୟନ୍ତ , ରାତ୍ରି ଘ୭|୧୭ ରୁ ଘ୮|୫୩ ମଧ୍ୟେ , ଘ୩|୧୭ ରୁ ଘ୪|୫ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୧୦|୨୯ ରୁ ଘ୧୧|୧୭ ମଧ୍ୟେ , ଘ୪|୪ ରୁ ନିଶାନ୍ତ ଘ୫|୩୯ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୯|୭ ରୁ ଘ୧୨|୦ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୫୧ ରୁ ଘ୧୨|୨୫ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 8,
      date: '08/02/2025',
      day: 'ଶନିବାର',
      name: 'ଶ୍ରୀମନ୍ଦିରେ ଓ ସର୍ବତ୍ର ସର୍ବସମ୍ମତ ଭୌମୀ (ବଡ) ଏକାଦଶୀ , ବ୍ୟାସ ସରୋବର ମେଳା',
      Image: '',
      tithi: '(୮) ଫେବୃଆରୀ , ଶନିବାର (ମାଘ) ମକର ଦି୨୬ନ , ସାବାନ୍ ତା୯ରିଖ , ସାୟନ ମାଘ ଦି୧୯ନ',
      sunrise: 'ଘ୬|୨୩|୨',
      sunset: 'ଘ୫|୩୮|୫୨',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୧୦|୨୧ ରୁ ଘ୧|୩୩ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୬ ରୁ ଘ୧୦|୩୦ ମଧ୍ୟେ , ଘ୧୨|୬ ରୁ ଘ୧|୪୨ ମଧ୍ୟେ , ଘ୨|୩୦ ରୁ ଘ୪|୬ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ପ୍ରାତଃରୁ ଦିବା ଘ୭|୪୬ ମଧ୍ୟେ , ଘ୪|୧୦ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୩୯ ପର୍ଯ୍ୟନ୍ତ  | (ବାରବେଳା) ଦିବା ଘ୧|୨୬  ରୁ ୨|୫୧ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୭|୧୪ ମଧ୍ୟେ , ଘ୪|୪୬ ରୁ ନିଶାନ୍ତ ଘ୬|୨୪ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 9,
      date: '09/02/2025',
      day: 'ରବିବାର',
      name: 'ସର୍ବସମ୍ମତ ବରାହ ଦ୍ଵାଦଶୀ',
      Image: '',
      tithi: '(୯) ଫେବୃଆରୀ , ରବିବାର (ମାଘ) ମକର ଦି୨୭ନ , ସାବାନ୍ ତା୧୦ରିଖ , ସାୟନ ମାଘ ଦି୨୦ନ',
      sunrise: 'ଘ୬|୨୨|୩୬',
      sunset: 'ଘ୫|୩୯|୨୪',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୭|୮ ରୁ ଘ୧୦|୨୦ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୧୮ ରୁ ଘ୮|୫୪ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୯ ମଧ୍ୟେ , ଘ୧|୩୨ ରୁ ଘ୨|୨୦ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୩୦ ରୁ ରାତ୍ରି ଘ୭|୧୮ ମଧ୍ୟେ , ଘ୧୨|୬ ରୁ ଘ୩|୧୮ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୪୪ ରୁ ଘ୯|୯ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୨|୫୨ ରୁ ୪|୧୭ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୨୬ ରୁ ଘ୧୨|୦  ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 10,
      date: '10/02/2025',
      day: 'ଶନିବାର',
      name: '',
      Image: '',
      tithi: '(୧୦) ଫେବୃଆରୀ , ଶନିବାର (ମାଘ) ମକର ଦି୨୮ନ , ସାବାନ୍ ତା୧୧ରିଖ , ସାୟନ ମାଘ ଦି୨୧ନ',
      sunrise: 'ଘ୬|୨୨|୮',
      sunset: 'ଘ୫|୩୯|୫୪',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୫୫ ମଧ୍ୟେ , ଘ୧୧|୭ ରୁ ଘ୧|୩୧ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା  ଘ୬|୩୦ ରୁ ରାତ୍ରି ଘ୮|୫୪ ମଧ୍ୟେ , ଘ୧୧|୧୮ ରୁ ଘ୨|୩୦ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୧୮ ରୁ ଘ୪|୫୪ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୪୪ ରୁ ଘ୯|୯ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧|୫୨ ରୁ ଘ୪|୧୭ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୨୬ ରୁ ଘ୧୨|୦ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 11,
      date: '11/02/2025',
      day: 'ରବିବାର',
      name: 'ମଙ୍ଗଳ ଚତୁର୍ଦ୍ଦଶୀ ସ୍ନାନ , ମାସାନ',
      Image: '',
      tithi: '(୧୧) ଫେବୃଆରୀ , ରବିବାର (ମାଘ) ମକର ଦି୨୯ନ , ସାବାନ୍ ତା୧୨ରିଖ , ସାୟନ ମାଘ ଦି୨୨ନ ',
      sunrise: 'ଘ୬|୨୧|୪୦',
      sunset: 'ଘ୫|୪୦|୨୪',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୮|୪୬ ରୁ ଘ୧୧|୮ ମଧ୍ୟେ , ଘ୧|୩୨ ରୁ ଘ୩|୮ ମଧ୍ୟେ , ଘ୩|୫୬ ରୁ ଘ୫|୩୨ ପର୍ଯ୍ୟନ୍ତ ,ସୂର୍ଯ୍ୟାସ୍ତରୁ ସନ୍ଧ୍ୟା ଘ୬|୩୧ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୫୪ ରୁ ଘ୧୧|୧୮ ମଧ୍ୟେ , ଘ୧|୪୨ ରୁ ଘ୩|୧୮ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୨୬ ରୁ ଘ୨|୫୨ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୭|୪୩ ରୁ ୯|୯ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୧୭ ରୁ ଘ୮|୫୨ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 12,
      date: '12/02/2025',
      day: 'ବୁଧବାର',
      name: 'କୁମ୍ଭ ସଂକ୍ରାନ୍ତି , ଶ୍ରୀମନ୍ଦିରରେ ଗଜୋଦ୍ଧାରଣ ବେଶ , ମାଘ ପୂର୍ଣ୍ଣିମା , ପୂର୍ଣ୍ଣିମା',
      Image: '',
      tithi: '(୧୨) ଫେବୃଆରୀ , ବୁଧବାର (ଫାଲ୍ଗୁନ) କୁମ୍ଭ ଦି୧ନ , ସାବାନ୍ ତା୧୩ରିଖ , ସାୟନ ମାଘ ଦି୨୩ନ',
      sunrise: 'ଘ୬|୨୧|୮',
      sunset: 'ଘ୫|୪୦|୫୬',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୫୭ ମଧ୍ୟେ , ଘ୧୨|୪୨ ରୁ ଘ୨|୧୮ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୩୧ ରୁ ରାତ୍ରି ଘ୮|୫୫ ମଧ୍ୟେ , ଘ୧|୪୨ ରୁ ନିଶାନ୍ତ ଘ୫|୪୨ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୪|୪୧ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୪୧ ପର୍ଯ୍ୟନ୍ତ , ରାତ୍ରି ଘ୮|୫୫ ରୁ ଘ୧୦|୩୧ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୯|୯ ରୁ ଘ୧୦|୩୪ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୨|୦ ରୁ ୧|୨୬ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୩|୯ ରୁ ଘ୪|୪୨ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 13,
      date: '13/02/2025',
      day: 'ଗୁରୁବାର',
      name: '',
      Image: '',
      tithi: '(୧୩) ଫେବୃଆରୀ , ଗୁରୁବାର (ଫାଲ୍ଗୁନ) କୁମ୍ଭ ଦି୨ନ , ସାବାନ୍ ତା୧୪ରିଖ , ସାୟନ ମାଘ ଦି୨୪ନ',
      sunrise: 'ଘ୬|୨୦|୩୬',
      sunset: 'ଘ୫|୪୧|୨୬',
      gdTime: '(ଅମୃତ) ରାତ୍ରି ଘ୧୨|୫୬ ରୁ ଘ୩|୨୦ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୫୫ ମଧ୍ୟେ , ଘ୧୦|୬ ରୁ ଘ୧୨|୩୦ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୨|୪୯ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୪୧ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୨|୦ ରୁ ଘ୧|୩୪ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 14,
      date: '14/02/2025',
      day: 'ଶୁକ୍ରବାର',
      name: '',
      Image: '',
      tithi: '(୧୪) ଫେବୃଆରୀ , ଶୁକ୍ରବାର (ଫାଲ୍ଗୁନ) କୁମ୍ଭ ଦି୩ନ , ସାବାନ୍ ତା୧୫ରିଖ , ସାୟନ ମାଘ ଦି୨୫ନ',
      sunrise: 'ଘ୬|୨୦|୩',
      sunset: 'ଘ୫|୪୧|୫୫',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୫୪ ମଧ୍ୟେ , ଘ୮|୪୧ ରୁ ଘ୧୧|୫ ମଧ୍ୟେ , ଘ୧|୨୯ ରୁ ଘ୩|୫ ମଧ୍ୟେ , ଘ୪|୪୦ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୪୨ ପର୍ଯ୍ୟନ୍ତ , ରାତ୍ରି ଘ୭|୨୦ ରୁ ଘ୮|୫୬ ମଧ୍ୟେ , ଘ୩|୧୦ ରୁ ଘ୩|୫୮ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୧୦|୩୨ ରୁ ଘ୧୧|୨୦ ମଧ୍ୟେ , ଘ୩|୫୮ ରୁ ନିଶାନ୍ତ ଘ୫|୪୪ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୯|୭ ରୁ ଘ୧୨|୦ ପର୍ଯ୍ୟନ୍ତ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୫୧ ରୁ ଘ୧୦|୨୫ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 15,
      date: '15/02/2025',
      day: 'ଶନିବାର',
      name: '',
      Image: '',
      tithi: '(୧୫) ଫେବୃଆରୀ , ଶନିବାର (ଫାଲ୍ଗୁନ) କୁମ୍ଭ ଦି୪ନ , ସାବାନ୍ ତା୧୬ରିଖ , ସାୟନ ମାଘ ଦି୨୬ନ',
      sunrise: 'ଘ୬|୧୯|୩୦',
      sunset: 'ଘ୫|୪୨|୨୪',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୧୦|୧୬ ରୁ ଘ୧|୨୮ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୯ ରୁ ଘ୧୦|୩୩ ମଧ୍ୟେ , ଘ୧୨|୯ ରୁ ଘ୧|୪୫ ମଧ୍ୟେ , ଘ୨|୩୩ ରୁ ଘ୪|୯ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ପ୍ରାତଃରୁ ଦିବା ଘ୭|୪୨ ମଧ୍ୟେ , ଘ୪|୧୬ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୪୩ ପର୍ଯ୍ୟନ୍ତ  | (ବାରବେଳା) ଦିବା ଘ୧|୨୬ ରୁ ୨|୫୨ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୭|୧୭ ମଧ୍ୟେ , ରାତ୍ରି ଘ୪|୪୪ ରୁ ନିଶାନ୍ତ ଘ୬|୧୯ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 16,
      date: '16/02/2025',
      day: 'ରବିବାର',
      name: '',
      Image: '',
      tithi: '(୧୬) ଫେବୃଆରୀ , ରବିବାର (ଫାଲ୍ଗୁନ) କୁମ୍ଭ ଦି୫ନ , ସାବାନ୍ ତା୧୭ରିଖ , ସାୟନ ମାଘ ଦି୨୭ନ',
      sunrise: 'ଘ୬|୧୮|୫୫',
      sunset: 'ଘ୫|୪୨|୫୩',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୭|୫୧ ରୁ ଘ୧୦|୧୬ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୨୧ ରୁ ଘ୮|୫୭ ମଧ୍ୟେ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୫ ମଧ୍ୟେ , ଘ୧|୨୮ ରୁ ଘ୨|୧୬ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୩୩ ରୁ ରାତ୍ରି ଘ୭|୨୧ ମଧ୍ୟେ , ଘ୧୨|୯ ରୁ ଘ୩|୨୧ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ପ୍ରାତଃରୁ ଦିବା ଘ୭|୫୨ ମଧ୍ୟେ , ଘ୪|୧୭ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୪୩ ପର୍ଯ୍ୟନ୍ତ  | (ବାରବେଳା) ଦିବା ଘ୧|୨୬ ରୁ ୨|୫୨ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୭|୧୮ ମଧ୍ୟେ , ରାତ୍ରି ଘ୪|୪୨ ରୁ ନିଶାନ୍ତ ଘ୬|୧୮ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 17,
      date: '17/02/2025',
      day: 'ସୋମବାର',
      name: 'ପ୍ରାଚୀନଦୀକୂଳ ଅନ୍ଧ କପିଳେଶ୍ଵରଙ୍କଠାରୁ ୭ ଦିନ ପ୍ରାଚୀ ପରିକ୍ରମା ଆରମ୍ଭ',
      Image: '',
      tithi: '(୧୭) ଫେବୃଆରୀ , ସୋମବାର (ଫାଲ୍ଗୁନ) କୁମ୍ଭ ଦି୬ନ , ସାବାନ୍ ତା୧୮ରିଖ , ସାୟନ ମାଘ ଦି୨୮ନ',
      sunrise: 'ଘ୬|୧୮|୨୦',
      sunset: 'ଘ୫|୪୩|୨୦',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୫୧ ମଧ୍ୟେ , ଘ୧୧|୩ ରୁ ଘ୧|୨୭ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୩୪ ରୁ ରାତ୍ରି ଘ୮|୫୮ ମଧ୍ୟେ , ଘ୧୧|୨୨ ରୁ ଘ୨|୩୪ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୨୦ ରୁ  ଘ୪|୫୬ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୪୦ ରୁ ଘ୯|୭ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୨|୫୩ ରୁ ୪|୧୯ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୨୬ ରୁ ଘ୧୧|୫୯ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 18,
      date: '18/02/2025',
      day: 'ମଙ୍ଗଳବାର',
      name: '',
      Image: '',
      tithi: '(୧୮) ଫେବୃଆରୀ , ମଙ୍ଗଳବାର (ଫାଲ୍ଗୁନ) କୁମ୍ଭ ଦି୭ନ , ସାବାନ୍ ତା୧୯ରିଖ , ସାୟନ ମାଘ ଦି୨୯ନ',
      sunrise: 'ଘ୬|୧୭|୪୪',
      sunset: 'ଘ୫|୪୩|୪୮',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୮|୩୮ ରୁ ଘ୧୧|୨ ମଧ୍ୟେ , ଘ୧|୨୬ ରୁ ଘ୩|୨ ମଧ୍ୟେ , ଘ୩|୫୦ ରୁ ଅପରାହ୍ନ ଘ୫|୨୬ ପର୍ଯ୍ୟନ୍ତ , ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୪୪ ରୁ ଘ୬|୩୩ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୫୮ ରୁ ୧୧|୨ ମଧ୍ୟେ , ଘ୧|୪୬ ରୁ ଘ୩|୨୨ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୨୬ ରୁ ଘ୨|୫୩ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୭|୩୯ ରୁ ୯|୬ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୧୯ ରୁ ଘ୮|୫୩ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 19,
      date: '19/02/2025',
      day: 'ବୁଧବାର',
      name: '',
      Image: '',
      tithi: '(୧୯) ଫେବୃଆରୀ , ବୁଧବାର (ଫାଲ୍ଗୁନ) କୁମ୍ଭ ଦି୮ନ , ସାବାନ୍ ତା୨୦ରିଖ , ସାୟନ ମାଘ ଦି୩୦ନ',
      sunrise: 'ଘ୬|୧୭|୭',
      sunset: 'ଘ୫|୪୪|୧୫',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୫୧ ମଧ୍ୟେ , ଘ୧୨|୩୮ ରୁ ଘ୨|୧୪ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୩୪ ରୁ ରାତ୍ରି ଘ୮|୫୮ ମଧ୍ୟେ , ଘ୧|୪୬ ରୁ ନିଶାନ୍ତ ଘ୫|୪୬ ମଧ୍ୟେ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୪|୩୭ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୪୪ ପର୍ଯ୍ୟନ୍ତ , ରାତ୍ରି ଘ୮|୫୮ ରୁ ୧୦|୩୪ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୯|୬ ରୁ ଘ୧୦|୩୨ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୫୯ ରୁ ୧|୨୬ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୩|୫ ରୁ ଘ୪|୩୮ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 20,
      date: '20/02/2025',
      day: 'ଗୁରୁବାର',
      name: '',
      Image: '',
      tithi: '(୨୦) ଫେବୃଆରୀ , ଗୁରୁବାର (ଫାଲ୍ଗୁନ) କୁମ୍ଭ ଦି୯ନ , ସାବାନ୍ ତା୨୧ରିଖ , ସାୟନ ଫାଲ୍ଗୁନ ଦି୧ନ',
      sunrise: 'ଘ୬|୧୬|୨୯',
      sunset: 'ଘ୫|୪୪|୪୧',
      gdTime: '(ଅମୃତ) ରାତ୍ରି ଘ୧୨|୫୫ ରୁ ଘ୩|୧୯ ମଧ୍ୟେ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୪୯ ମଧ୍ୟେ , ଘ୧୧|୧ ରୁ ଘ୧|୨୫ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୨|୫୧ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୪୫ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୫୯ ରୁ ଘ୧|୩୨ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 21,
      date: '21/02/2025',
      day: 'ଶୁକ୍ରବାର',
      name: '',
      Image: '',
      tithi: '(୨୧) ଫେବୃଆରୀ , ଶୁକ୍ରବାର (ଫାଲ୍ଗୁନ) କୁମ୍ଭ ଦି୧୦ନ , ସାବାନ୍ ତା୨୨ରିଖ , ସାୟନ ଫାଲ୍ଗୁନ ଦି୨ନ',
      sunrise: 'ଘ୬|୧୫|୫୦',
      sunset: 'ଘ୫|୪୫|୬',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୪୯ ମଧ୍ୟେ , ଘ୮|୩୬ ରୁ ଘ୧୧|୦ ମଧ୍ୟେ , ଘ୧|୨୪ ରୁ ଘ୩|୦ ମଧ୍ୟେ , ଘ୪|୩୪ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୪୫ ପର୍ଯ୍ୟନ୍ତ , ରାତ୍ରି ଘ୭|୨୩ ରୁ ଘ୮|୫୯ ମଧ୍ୟେ , ଘ୩|୨୩ ରୁ ଘ୪|୧୧ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୧୦|୩୫ ରୁ ଘ୧୧|୨୩ ମଧ୍ୟେ , ଘ୪|୧୧ ରୁ ନିଶାନ୍ତ ଘ୫|୪୬ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୫୦ ରୁ ଘ୧୧|୫୯ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୫୩ ରୁ ଘ୧୦|୨୬ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 22,
      date: '22/02/2025',
      day: 'ଶନିବାର',
      name: '',
      Image: '',
      tithi: '(୨୨) ଫେବୃଆରୀ , ଶନିବାର (ଫାଲ୍ଗୁନ) କୁମ୍ଭ ଦି୧୧ନ , ସାବାନ୍ ତା୨୩ରିଖ , ସାୟନ ଫାଲ୍ଗୁନ ଦି୩ନ',
      sunrise: 'ଘ୬|୧୫|୧୦',
      sunset: 'ଘ୫|୪୫|୩୨',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୧୦|୧୧ ରୁ ଘ୧|୨୩ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୧୧ ରୁ ଘ୧୦|୩୫ ମଧ୍ୟେ , ଘ୧୨|୧୧ ରୁ ଘ୧|୪୭ ମଧ୍ୟେ , ଘ୨|୩୫ ରୁ ଘ୪|୧୧ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: 'ତଃରୁ ଦିବା ଘ୭|୨୪ ମଧ୍ୟେ , ଘ୪|୧୧ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୪୬ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧|୧୫ ରୁ ୨|୪୪ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସନ୍ଧ୍ୟା ଘ୫|୪୬ ରୁ ଘ୭|୧୮ ମଧ୍ୟେ , ରାତ୍ରି ଘ୪|୩୪ ରୁ ନିଶାନ୍ତ ଘ୬|୧୫ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 23,
      date: '23/02/2025',
      day: 'ରବିବାର',
      name: 'ପ୍ରାଚୀ ପରିକ୍ରମା ଉଦଯାପନ',
      Image: '',
      tithi: '(୨୩) ଫେବୃଆରୀ , ରବିବାର (ଫାଲ୍ଗୁନ) କୁମ୍ଭ ଦି୧୨ନ , ସାବାନ୍ ତା୨୪ରିଖ , ସାୟନ ଫାଲ୍ଗୁନ ଦି୪ନ',
      sunrise: 'ଘ୬|୧୪|୩୦',
      sunset: 'ଘ୫|୪୫|୫୮',
      gdTime: '(ଅମୃତ) ପ୍ରାତଃ ଘ୬|୫୯ ରୁ ଦିବା ଘ୧୦|୧୧ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୨୪ ରୁ ଘ୯|୦ ମଧ୍ୟେ , | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୫୯ ମଧ୍ୟେ , ଘ୧|୨୩ ରୁ ଘ୨|୧୧ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୩୬ ରୁ ରାତ୍ରି ଘ୭|୨୪ ମଧ୍ୟେ , ଘ୧୨|୧୨ ରୁ ଘ୩|୨୪ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୧୦|୩୧ ରୁ ଘ୧|୨୬ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୩୧ ରୁ ଘ୩|୩ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 24,
      date: '24/02/2025',
      day: 'ସୋମବାର',
      name: 'ସର୍ବସମ୍ମତ (ପଙ୍କଉଦ୍ଧାର) ଏକାଦଶୀ',
      Image: '',
      tithi: '(୨୪) ଫେବୃଆରୀ , ସୋମବାର (ଫାଲ୍ଗୁନ) କୁମ୍ଭ ଦି୧୩ନ , ସାବାନ୍ ତା୨୫ରିଖ , ସାୟନ ଫାଲ୍ଗୁନ ଦି୫ନ',
      sunrise: 'ଘ୬|୧୩|୪୭',
      sunset: 'ଘ୫|୪୬|୨୧',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୪୬ ମଧ୍ୟେ , ଘ୧୦|୫୮ ରୁ ଦିବା ଘ୧|୨୨ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୩୬ ରୁ ରାତ୍ରି ଘ୯|୦ ମଧ୍ୟେ , ଘ୧୧|୨୪ ରୁ ଘ୨|୩୬ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୪୬ ରୁ ୫|୨୨ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୩୬ ରୁ ଘ୯|୩ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୨|୫୩ ରୁ ୪|୨୧ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୨୫ ରୁ ଘ୧୧|୫୮ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 25,
      date: '25/02/2025',
      day: 'ମଙ୍ଗଳବାର',
      name: '',
      Image: '',
      tithi: '(୨୫) ଫେବୃଆରୀ , ମଙ୍ଗଳବାର (ଫାଲ୍ଗୁନ) କୁମ୍ଭ ଦି୧୪ନ , ସାବାନ୍ ତା୨୬ରିଖ , ସାୟନ ଫାଲ୍ଗୁନ ଦି୬ନ',
      sunrise: 'ଘ୬|୧୩|୭',
      sunset: 'ଘ୫|୪୬|୪୭ ',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୮|୩୩ ରୁ ଦିବା ଘ୧୦|୫୭ ମଧ୍ୟେ , ଘ୧|୨୧ ରୁ ଘ୨|୫୭ ମଧ୍ୟେ , ଘ୩|୪୫ ରୁ ଘ୫|୨୧ ପର୍ଯ୍ୟନ୍ତ , ସୂର୍ଯ୍ୟାସ୍ତରୁ ସନ୍ଧ୍ୟା ଘ୬|୩୬ ମଧ୍ୟେ , ରାତ୍ରି ଘ୯|୧ ରୁ ଘ୧୧|୨୫ ମଧ୍ୟେ , ଘ୧|୪୯ ରୁ ଘ୩|୨୫ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୨୫ ରୁ ଘ୨|୫୩ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୭|୩୫  ରୁ ୯|୨ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୨୧ ରୁ ଘ୮|୫୩ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 26,
      date: '26/02/2025',
      day: 'ବୁଧବାର',
      name: 'ଶ୍ରୀମନ୍ଦିରେ ଓ ସ୍ମାର୍ତ୍ତସମ୍ମତ ମହାଶିବରାତ୍ରି',
      Image: '',
      tithi: '(୨୬) ଫେବୃଆରୀ , ବୁଧବାର (ଫାଲ୍ଗୁନ) କୁମ୍ଭ ଦି୧୫ନ , ସାବାନ୍ ତା୨୭ରିଖ , ସାୟନ ଫାଲ୍ଗୁନ ଦି୭ନ',
      sunrise: 'ଘ୬|୧୨|୨୫',
      sunset: 'ଘ୫|୪୭|୯',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୪୬ ମଧ୍ୟେ , ଘ୧୨|୩୩ ରୁ ଘ୨|୯ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୩୭ ରୁ ରାତ୍ରି ଘ୯|୧ ମଧ୍ୟେ , ଘ୧|୪୮ ରୁ ନିଶାନ୍ତ ଘ୫|୪୮ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୪|୩୨ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୪୭ ପର୍ଯ୍ୟନ୍ତ , ରାତ୍ରି ଘ୯|୧ ରୁ ଘ୧୦|୩୭ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୯|୨ ରୁ ଘ୧୦|୩୦ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୫୧ ରୁ ୧|୨୬ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୩|୨ ରୁ ଘ୪|୩୪ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 27,
      date: '27/02/2025',
      day: 'ଗୁରୁବାର',
      name: 'ବୈଷ୍ଣବସମ୍ମତ ମହାଶିବରାତ୍ରି',
      Image: '',
      tithi: '(୨୭) ଫେବୃଆରୀ , ଗୁରୁବାର (ଫାଲ୍ଗୁନ) କୁମ୍ଭ ଦି୧୬ନ , ସାବାନ୍ ତା୨୮ରିଖ , ସାୟନ ଫାଲ୍ଗୁନ ଦି୮ନ',
      sunrise: 'ଘ୬|୧୧|୪୧',
      sunset: 'ଘ୫|୪୭|୩୩',
      gdTime: '(ଅମୃତ) ରାତ୍ରି ଘ୧|୧ ରୁ ଘ୩|୨୫ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୪୫ ମଧ୍ୟେ , ଘ୧୦|୫୬ ରୁ ଘ୧|୨୦ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୨|୩୪ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୪୮ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୫୭ ରୁ ଘ୧|୨୯ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 28,
      date: '28/02/2025',
      day: 'ଶୁକ୍ରବାର',
      name: 'ତରାବୀ ଆରମ୍ଭ , ଅମାବାସ୍ୟା',
      Image: '',
      tithi: '(୨୮) ଫେବୃଆରୀ , ଶୁକ୍ରବାର (ଫାଲ୍ଗୁନ) କୁମ୍ଭ ଦି୧୭ନ , ସାବାନ୍ ତା୨୯ରିଖ , ସାୟନ ଫାଲ୍ଗୁନ ଦି୯ନ',
      sunrise: 'ଘ୬|୧୦|୫୭',
      sunset: 'ଘ୫|୪୭|୫୫',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୪୪ ମଧ୍ୟେ , ଘ୮|୩୧ ରୁ ଘ୧୦|୫୫ ମଧ୍ୟେ , ଘ୧|୧୯ ରୁ ଘ୨|୫୫ ମଧ୍ୟେ , ଘ୪|୩୧ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୪୮ ପର୍ଯ୍ୟନ୍ତ , ରାତ୍ରି ଘ୭|୨୬ ରୁ ଘ୯|୨ ମଧ୍ୟେ , ଘ୩|୨୬ ରୁ ଘ୪|୧୪ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୧୦|୩୮ ରୁ ଘ୧୧|୨୬ ମଧ୍ୟେ , ଘ୪|୫୩ ରୁ ନିଶାନ୍ତ ଘ୫|୪୯ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୯|୧ ରୁ ଘ୧୧|୧୭ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୫୩ ରୁ ଘ୧୦|୨୫ ପର୍ଯ୍ୟନ୍ତ |',
    },
  ]

  const eventsForEnglishMonth = [

  ]

  const CUSTOMOdia_DATE = [
    { id: 1, showDate: '୨୬', disable: 'yes', date: '26/01/2025', spclEvent: 'no' },
    { id: 2, showDate: '୨୭', disable: 'yes', date: '27/01/2025', spclEvent: 'no' },
    { id: 3, showDate: '୨୮', disable: 'yes', date: '28/01/2025', spclEvent: 'no' },
    { id: 4, showDate: '୨୯', disable: 'yes', date: '29/01/2025', spclEvent: 'no' },
    { id: 5, showDate: '୩୦', disable: 'yes', date: '30/01/2025', spclEvent: 'no' },
    { id: 6, showDate: '୩୧', disable: 'yes', date: '31/01/2025', spclEvent: 'no' },
    { id: 7, showDate: '୧', disable: 'no', date: '01/02/2025', spclEvent: 'yes' },
    { id: 8, showDate: '୨', disable: 'no', date: '02/02/2025', spclEvent: 'yes' },
    { id: 9, showDate: '୩', disable: 'no', date: '03/02/2025', spclEvent: 'no' },
    { id: 10, showDate: '୪', disable: 'no', date: '04/02/2025', spclEvent: 'yes' },
    { id: 11, showDate: '୫', disable: 'no', date: '05/02/2025', spclEvent: 'yes' },
    { id: 12, showDate: '୬', disable: 'no', date: '06/02/2025', spclEvent: 'no' },
    { id: 13, showDate: '୭', disable: 'no', date: '07/02/2025', spclEvent: 'no' },
    { id: 14, showDate: '୮', disable: 'no', date: '08/02/2025', spclEvent: 'yes' },
    { id: 15, showDate: '୯', disable: 'no', date: '09/02/2025', spclEvent: 'yes' },
    { id: 16, showDate: '୧୦', disable: 'no', date: '10/02/2025', spclEvent: 'no' },
    { id: 17, showDate: '୧୧', disable: 'no', date: '11/02/2025', spclEvent: 'yes' },
    { id: 18, showDate: '୧୨', disable: 'no', date: '12/02/2025', spclEvent: 'yes' },
    { id: 19, showDate: '୧୩', disable: 'no', date: '13/02/2025', spclEvent: 'no' },
    { id: 20, showDate: '୧୪', disable: 'no', date: '14/02/2025', spclEvent: 'no' },
    { id: 21, showDate: '୧୫', disable: 'no', date: '15/02/2025', spclEvent: 'no' },
    { id: 22, showDate: '୧୬', disable: 'no', date: '16/02/2025', spclEvent: 'no' },
    { id: 23, showDate: '୧୭', disable: 'no', date: '17/02/2025', spclEvent: 'yes' },
    { id: 24, showDate: '୧୮', disable: 'no', date: '18/02/2025', spclEvent: 'no' },
    { id: 25, showDate: '୧୯', disable: 'no', date: '19/02/2025', spclEvent: 'no' },
    { id: 26, showDate: '୨୦', disable: 'no', date: '20/02/2025', spclEvent: 'no' },
    { id: 27, showDate: '୨୧', disable: 'no', date: '21/02/2025', spclEvent: 'no' },
    { id: 28, showDate: '୨୨', disable: 'no', date: '22/02/2025', spclEvent: 'no' },
    { id: 29, showDate: '୨୩', disable: 'no', date: '23/02/2025', spclEvent: 'yes' },
    { id: 30, showDate: '୨୪', disable: 'no', date: '24/02/2025', spclEvent: 'yes' },
    { id: 31, showDate: '୨୫', disable: 'no', date: '25/02/2025', spclEvent: 'no' },
    { id: 32, showDate: '୨୬', disable: 'no', date: '26/02/2025', spclEvent: 'yes' },
    { id: 33, showDate: '୨୭', disable: 'no', date: '27/02/2025', spclEvent: 'yes' },
    { id: 34, showDate: '୨୮', disable: 'no', date: '28/02/2025', spclEvent: 'yes' },
    { id: 35, showDate: '୧', disable: 'yes', date: '01/03/2025', spclEvent: 'no' },
  ];

  const CUSTOMEnglish_DATE = [
    { id: 1, showDate: '26', disable: 'yes', date: '26/01/2025', spclEvent: 'no' },
    { id: 2, showDate: '27', disable: 'yes', date: '27/01/2025', spclEvent: 'no' },
    { id: 3, showDate: '28', disable: 'yes', date: '28/01/2025', spclEvent: 'no' },
    { id: 4, showDate: '29', disable: 'yes', date: '29/01/2025', spclEvent: 'no' },
    { id: 5, showDate: '30', disable: 'yes', date: '30/01/2025', spclEvent: 'no' },
    { id: 6, showDate: '31', disable: 'yes', date: '31/01/2025', spclEvent: 'no' },
    { id: 7, showDate: '1', disable: 'no', date: '01/02/2025', spclEvent: 'yes' },
    { id: 8, showDate: '2', disable: 'no', date: '02/02/2025', spclEvent: 'yes' },
    { id: 9, showDate: '3', disable: 'no', date: '03/02/2025', spclEvent: 'no' },
    { id: 10, showDate: '4', disable: 'no', date: '04/02/2025', spclEvent: 'yes' },
    { id: 11, showDate: '5', disable: 'no', date: '05/02/2025', spclEvent: 'yes' },
    { id: 12, showDate: '6', disable: 'no', date: '06/02/2025', spclEvent: 'no' },
    { id: 13, showDate: '7', disable: 'no', date: '07/02/2025', spclEvent: 'no' },
    { id: 14, showDate: '8', disable: 'no', date: '08/02/2025', spclEvent: 'yes' },
    { id: 15, showDate: '9', disable: 'no', date: '09/02/2025', spclEvent: 'yes' },
    { id: 16, showDate: '10', disable: 'no', date: '10/02/2025', spclEvent: 'no' },
    { id: 17, showDate: '11', disable: 'no', date: '11/02/2025', spclEvent: 'yes' },
    { id: 18, showDate: '12', disable: 'no', date: '12/02/2025', spclEvent: 'yes' },
    { id: 19, showDate: '13', disable: 'no', date: '13/02/2025', spclEvent: 'no' },
    { id: 20, showDate: '14', disable: 'no', date: '14/02/2025', spclEvent: 'no' },
    { id: 21, showDate: '15', disable: 'no', date: '15/02/2025', spclEvent: 'no' },
    { id: 22, showDate: '16', disable: 'no', date: '16/02/2025', spclEvent: 'no' },
    { id: 23, showDate: '17', disable: 'no', date: '17/02/2025', spclEvent: 'yes' },
    { id: 24, showDate: '18', disable: 'no', date: '18/02/2025', spclEvent: 'no' },
    { id: 25, showDate: '19', disable: 'no', date: '19/02/2025', spclEvent: 'no' },
    { id: 26, showDate: '20', disable: 'no', date: '20/02/2025', spclEvent: 'no' },
    { id: 27, showDate: '21', disable: 'no', date: '21/02/2025', spclEvent: 'no' },
    { id: 28, showDate: '22', disable: 'no', date: '22/02/2025', spclEvent: 'no' },
    { id: 29, showDate: '23', disable: 'no', date: '23/02/2025', spclEvent: 'yes' },
    { id: 30, showDate: '24', disable: 'no', date: '24/02/2025', spclEvent: 'yes' },
    { id: 31, showDate: '25', disable: 'no', date: '25/02/2025', spclEvent: 'no' },
    { id: 32, showDate: '26', disable: 'no', date: '26/02/2025', spclEvent: 'yes' },
    { id: 33, showDate: '27', disable: 'no', date: '27/02/2025', spclEvent: 'yes' },
    { id: 34, showDate: '28', disable: 'no', date: '28/02/2025', spclEvent: 'yes' },
    { id: 35, showDate: '1', disable: 'yes', date: '01/03/2025', spclEvent: 'no' },
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
              <TouchableOpacity onPress={() => navigation.navigate('January2025')}>
                <AntDesign name="caretleft" color={'#000'} size={25} />
              </TouchableOpacity>
              {selectedLanguage === "Odia" &&
                <Text style={{ color: '#000', fontSize: 17, fontWeight: '600' }}>ଫେବୃଆରୀ  ୨୦୨୫</Text>
              }
              {selectedLanguage === "English" &&
                <Text style={{ color: '#000', fontSize: 17, fontWeight: '600' }}>February  2025</Text>
              }
              <TouchableOpacity onPress={() => navigation.replace('March2025')}>
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

export default February2025

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