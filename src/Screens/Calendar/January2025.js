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

const January2025 = (props) => {

  const eventsForOdiaMonth = [
    {
      id: 1,
      date: '01/01/2025',
      day: 'ବୁଧବାର',
      name: 'ଇଂରାଜୀ ନବବର୍ଷ ୨୦୨୫ ମସିହା ଆରମ୍ଭ , ଶରଣ ଆରମ୍ଭ , ଦ୍ୱିତୀୟା ଚନ୍ଦ୍ରଦର୍ଶନ',
      Image: '',
      tithi: '(୧) ଜାନୁଆରୀ , ବୁଧବାର (ପୌଷ) ଧନୁ ଦି୧୭ନ , ଜମାଦିଅସସାନୀ ତା୩୦ରିଖ , ସାୟନ ପୌଷ ଦି୧୧ନ',
      sunrise: 'ଘ୬|୨୫|୨୯',
      sunset: 'ଘ୫|୧୫|୧୭',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୪ ମଧ୍ୟେ , ଘ୮|୩ ରୁ ଘ୮|୫୧ ମଧ୍ୟେ , ଘ୧୧|୧୫ ରୁ ଘ୧|୩୯ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୭ ରୁ ରାତ୍ରି ଘ୬|୫୫ ମଧ୍ୟେ , ଘ୮|୩୧ ରୁ ଘ୨|୫୫ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୭|୧୪ ରୁ ୮|୩ ମଧ୍ୟେ , ଘ୨|୨୭ ରୁ ଘ୪|୧୧ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୯|୧୦ ରୁ ଘ୧୦|୩୨ ପର୍ଯ୍ୟନ୍ତ  | (ବାରବେଳା) ଦିବା ଘ୧୧|୫୩  ରୁ ୧|୧୫ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୩|୧୦ ରୁ ଘ୪|୪୯ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 2,
      date: '02/01/2025',
      day: 'ଗୁରୁବାର',
      name: '',
      Image: '',
      tithi: '(୨) ଜାନୁଆରୀ , ଗୁରୁବାର (ପୌଷ) ଧନୁ ଦି୧୮ନ , ରଜବ ତା୧ରିଖ , ସାୟନ ପୌଷ ଦି୧୨ନ',
      sunrise: 'ଘ୬|୨୫|୨୯',
      sunset: 'ଘ୫|୧୫|୩୫',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୮|୨ ମଧ୍ୟେ , ଘ୨|୨୭ ରୁ ଘ୪|୩ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୭|୬ ରୁ ରାତ୍ରି ଘ୯|୧୯ ମଧ୍ୟେ , ଘ୧୧|୪୩ ରୁ ଘ୨|୫୫ ମଧ୍ୟେ , ଘ୩|୪୩ ରୁ ନିଶାନ୍ତ ଘ୫|୧୯ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୨|୩୪ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୧୬ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୫୪ ରୁ ଘ୧|୩୨ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 3,
      date: '03/01/2025',
      day: 'ଶୁକ୍ରବାର',
      name: '',
      Image: '',
      tithi: '(୩) ଜାନୁଆରୀ , ଶୁକ୍ରବାର (ପୌଷ) ଧନୁ ଦି୧୯ନ , ରଜବ ତା୨ରିଖ , ସାୟନ ପୌଷ ଦି୧୩ନ',
      sunrise: 'ଘ୬|୨୫|୪୭',
      sunset: 'ଘ୫|୧୬|୧୩',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୪ ମଧ୍ୟେ , ଘ୮|୩ ରୁ ଘ୧୦|୨୭ ମଧ୍ୟେ , ଘ୧୨|୫୧ ରୁ ଘ୪|୩ ମଧ୍ୟେ , ଘ୪|୪୩ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୧୬ ପର୍ଯ୍ୟନ୍ତ , ସନ୍ଧ୍ୟା ଘ୬|୮ ରୁ ରାତ୍ରି ଘ୯|୨୦ ମଧ୍ୟେ , ଘ୧୧|୪୪ , ରୁ ଘ୨|୫୬ ମଧ୍ୟେ , ଘ୩|୪୪ ରୁ ନିଶାନ୍ତ ଘ୫|୨୦ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୯|୧୦ ରୁ ଘ୧|୫୪ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୩୭ ରୁ ଘ୧୦|୧୬ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 4,
      date: '04/01/2025',
      day: 'ଶନିବାର',
      name: '',
      Image: '',
      tithi: '(୪) ଜାନୁଆରୀ , ଶନିବାର (ପୌଷ) ଧନୁ ଦି୨୦ନ , ରଜବ ତା୩ରିଖ , ସାୟନ ପୌଷ ଦି୧୪ନ',
      sunrise: 'ଘ୬|୨୬|୬',
      sunset: 'ଘ୫|୧୬|୫୦',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୫ ମଧ୍ୟେ , ଘ୮|୪ ରୁ ଘ୧୦|୨୮ ମଧ୍ୟେ , ଘ୧୨|୫୨ ରୁ ଘ୪|୪ ମଧ୍ୟେ , ଘ୪|୪୯ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୧୭ ପର୍ଯ୍ୟନ୍ତ , ରାତ୍ରି ଘ୧୨|୩୩ ରୁ ଘ୨|୯ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୨|୯ ରୁ ୨|୫୭ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ପ୍ରାତଃରୁ  ଦିବା ଘ୭|୪୮ ମଧ୍ୟେ , ଘ୩|୫୭ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୧୭ ପର୍ଯ୍ୟନ୍ତ  | (ବାରବେଳା) ଦିବା ଘ୧|୧୬ ରୁ ୨|୩୮ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୭|୫୮ ମଧ୍ୟେ , ଘ୪|୪୭ ରୁ ରାତ୍ରିଶେଷ ଘ୬|୨୬ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 5,
      date: '05/01/2025',
      day: 'ରବିବାର',
      name: 'ବରଗଡରେ ଧନୁଯାତ୍ରା ଆରମ୍ଭ , ଶରଣ ଶେଷ',
      Image: '',
      tithi: '(୫) ଜାନୁଆରୀ , ରବିବାର (ପୌଷ) ଧନୁ ଦି୨୧ନ , ରଜବ ତା୪ରିଖ , ସାୟନ ପୌଷ ଦି୧୫ନ',
      sunrise: 'ଘ୬|୨୬|୨୪',
      sunset: 'ଘ୫|୧୭|୨୮',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୭|୧୬ ରୁ ଘ୯|୪୦ ମଧ୍ୟେ , ଘ୧୨|୫୨ ରୁ ଘ୪|୪୪ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୪୫ ରୁ ଘ୯|୨୧ ମଧ୍ୟେ , ଘ୧୧|୪୫ ରୁ ଘ୧|୨୧ ପର୍ଯ୍ୟନ୍ତ , ଘ୨|୯ ରୁ ନିଶାନ୍ତ ଘ୫|୨୧ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୪|୪୯ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ୫|୧୭ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୩୩ ରୁ ଘ୧|୧୬ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୩୩ ରୁ ଘ୩|୧୧ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 6,
      date: '06/01/2025',
      day: 'ସୋମବାର',
      name: '',
      Image: '',
      tithi: '(୬) ଜାନୁଆରୀ , ସୋମବାର (ପୌଷ) ଧନୁ ଦି୨୨ନ , ରଜବ ତା୫ରିଖ , ସାୟନ ପୌଷ ଦି୧୬ନ',
      sunrise: 'ଘ୬|୨୬|୪୦',
      sunset: 'ଘ୫|୧୮|୪',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୮|୪ ମଧ୍ୟେ , ଘ୯|୪୦ ରୁ ଘ୧୨|୪ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୪୬ ରୁ ଘ୧୦|୫୮ ମଧ୍ୟେ , ଘ୨|୧୦ ରୁ ଘ୨|୫୮ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୪୯ ରୁ ଘ୯|୧୧ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୨|୩୯ ରୁ ଘ୪|୧ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୧୭ ରୁ ଘ୧୧|୫୫ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 7,
      date: '07/01/2025',
      day: 'ମଙ୍ଗଳବାର',
      name: '',
      Image: '',
      tithi: '(୭) ଜାନୁଆରୀ , ମଙ୍ଗଳବାର (ପୌଷ) ଧନୁ ଦି୨୩ନ , ରଜବ ତା୬ରିଖ , ସାୟନ ପୌଷ ଦି୧୭ନ',
      sunrise: 'ଘ୬|୨୬|୫୩',
      sunset: 'ଘ୫|୧୮|୪୫',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୪ ମଧ୍ୟେ , ଘ୮|୨ ରୁ ଘ୧୦|୨ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୪୦ ରୁ ଘ୮|୨୮ ମଧ୍ୟେ , ରାତ୍ରି ଘ୯|୧୬ ରୁ ଘ୧୧|୪୦ ମଧ୍ୟେ , ଘ୧|୧୬ ରୁ ଘ୨|୫୨ ମଧ୍ୟେ , ଘ୪|୨୮ ରୁ ନିଶାନ୍ତ ଘ୫|୧୬ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୭|୩୯ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୧୭ ରୁ ଘ୨|୩୯ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୭|୫୦ ରୁ ୯|୧୧ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୧ ରୁ ଘ୮|୩୯ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 8,
      date: '08/01/2025',
      day: 'ବୁଧବାର',
      name: '',
      Image: '',
      tithi: '(୮) ଜାନୁଆରୀ , ବୁଧବାର (ପୌଷ) ଧନୁ ଦି୨୪ନ , ରଜବ ତା୭ରିଖ , ସାୟନ ପୌଷ ଦି୧୮ନ',
      sunrise: 'ଘ୬|୨୭|୪',
      sunset: 'ଘ୫|୧୯|୨୬',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୫ ମଧ୍ୟେ , ଘ୮|୪ ରୁ ଘ୮|୫୨ ମଧ୍ୟେ , ଘ୧୧|୧ ରୁ ଘ୧|୪୦ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୧୧ ରୁ ଘ୬|୫୯ ମଧ୍ୟେ , ଘ୮|୩୫ ରୁ ଘ୨|୫୯ ମଧ୍ୟେ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୭|୧୫ ରୁ ୮|୪ ମଧ୍ୟେ , ଘ୨|୨୮ ରୁ ଘ୪|୫୨ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୯|୧୩ ରୁ ଘ୧୦|୩୪ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୫୬  ରୁ ୧|୧୮ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୩|୧୨ ରୁ ଘ୪|୫୦ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 9,
      date: '09/01/2025',
      day: 'ଗୁରୁବାର',
      name: 'ଶ୍ରୀମନ୍ଦିରରେ ଓ ସର୍ବତ୍ର ଶାମ୍ବଦଶମୀ (ସୂର୍ଯ୍ୟପୂଜା) , ସୁଦଶାବ୍ରତ',
      Image: '',
      tithi: '(୯) ଜାନୁଆରୀ , ଗୁରୁବାର (ପୌଷ) ଧନୁ ଦି୨୫ନ , ରଜବ ତା୮ରିଖ , ସାୟନ ପୌଷ ଦି୧୯ନ',
      sunrise: 'ଘ୬|୨୭|୧୪',
      sunset: 'ଘ୫|୨୦|୬',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୮|୩ ମଧ୍ୟେ , ରାତ୍ରି ଘ୨|୨୮ ରୁ ଘ୪|୪ ପର୍ଯ୍ୟନ୍ତ , ସନ୍ଧ୍ୟା ଘ୬|୧୧ ରୁ ରାତ୍ରି ଘ୯|୨୩ ମଧ୍ୟେ , ରାତ୍ରି ଘ୧୧|୪୭ ରୁ ଘ୨|୫୯ ମଧ୍ୟେ , ଘ୩|୪୭ ରୁ ନିଶାନ୍ତ ଘ୫|୨୩ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୨|୩୭ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୨୦ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୫୬ ରୁ ଘ୧|୩୪ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 10,
      date: '10/01/2025',
      day: 'ଶୁକ୍ରବାର',
      name: 'ଶ୍ରୀମନ୍ଦିରରେ ଓ ସର୍ବସମ୍ମତ ପୁତ୍ରଦା ଏକାଦଶୀ',
      Image: '',
      tithi: '(୧୦) ଜାନୁଆରୀ , ଶୁକ୍ରବାର (ପୌଷ) ଧନୁ ଦି୨୬ନ , ରଜବ ତା୯ରିଖ , ସାୟନ ପୌଷ ଦି୨୦ନ',
      sunrise: 'ଘ୬|୨୭|୨୪',
      sunset: 'ଘ୫|୨୦|୪୬',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୫ ମଧ୍ୟେ , ଘ୮|୪ ରୁ ଘ୧୦|୨୮ ମଧ୍ୟେ , ଘ୧୨|୫ ରୁ ଘ୪|୪ ମଧ୍ୟେ , ଦିବା ଘ୪|୫୦ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୨୧ ପର୍ଯ୍ୟନ୍ତ , ସନ୍ଧ୍ୟା ଘ୫|୪୭ ରୁ ରାତ୍ରି ଘ୮|୫୦ ମଧ୍ୟେ , ଘ୧୧|୨୩ ରୁ ଘ୨|୩୫ ପର୍ଯ୍ୟନ୍ତ , ଘ୩|୨୩ ରୁ ଘ୪|୫୯ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୯|୧୨ ରୁ ଘ୧୧|୫୬ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୩୮ ରୁ ଘ୧୦|୨୦ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 11,
      date: '11/01/2025',
      day: 'ଶନିବାର',
      name: '',
      Image: '',
      tithi: '(୧୧) ଜାନୁଆରୀ , ଶନିବାର (ପୌଷ) ଧନୁ ଦି୨୭ନ , ରଜବ ତା୧୦ରିଖ , ସାୟନ ପୌଷ ଦି୨୧ନ',
      sunrise: 'ଘ୬|୨୭|୩୩',
      sunset: 'ଘ୫|୨୧|୨୫',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୭ ମଧ୍ୟେ , ଘ୮|୫ ରୁ ଘ୧୦|୨୯ ମଧ୍ୟେ , ଘ୧୨|୫୩ ରୁ ଘ୪|୫ ମଧ୍ୟେ , ଘ୪|୫୧ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୨୧ ପର୍ଯ୍ୟନ୍ତ , ରାତ୍ରି ଘ୧୨|୩୬ ରୁ ଘ୨|୧୨ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୨|୧୨ ରୁ ୩|୦ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ପ୍ରାତଃରୁ ଦିବା ଘ୭|୫୦ ମଧ୍ୟେ , ଘ୪|୧ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୨୧ ପର୍ଯ୍ୟନ୍ତ  | (ବାରବେଳା) ଦିବା ଘ୧|୧୭  ରୁ ୨|୩ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୮|୧ ମଧ୍ୟେ , ଘ୪|୫୧ ରୁ ରାତ୍ରିଶେଷ ଘ୬|୨୮ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 12,
      date: '12/01/2025',
      day: 'ରବିବାର',
      name: 'ଶ୍ରୀମନ୍ଦିରେ ଦୁଧମେଲାଣ , ଜାତୀୟ ଯୁବ ଦିବସ , ଅଲେଖ ମହାପ୍ରଭୁଙ୍କ ବିଶ୍ଵଶାନ୍ତି ଅଖଣ୍ଡ ବ୍ରହ୍ମଯଜ୍ଞ',
      Image: '',
      tithi: '(୧୨) ଜାନୁଆରୀ , ରବିବାର (ପୌଷ) ଧନୁ ଦି୨୮ନ , ରଜବ ତା୧୧ରିଖ , ସାୟନ ପୌଷ ଦି୨୨ନ',
      sunrise: 'ଘ୬|୨୭|୪୩',
      sunset: 'ଘ୫|୨୨|୩',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୭|୧୭ ରୁ ଘ୯|୪୦ ମଧ୍ୟେ , ଘ୧୨|୫୨ ରୁ ଘ୪|୪ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୪୭ ରୁ ଘ୮|୨୩ ମଧ୍ୟେ , ଘ୧୦|୪୭ ରୁ ଘ୧୨|୨୩ ମଧ୍ୟେ , ଘ୧|୧୧ ରୁ ଘ୪|୨୩ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୪|୫୧ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୨୨ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୧୦|୩୫ ରୁ ଘ୧|୧୯ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୫ ରୁ ଘ୩|୨ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 13,
      date: '13/01/2025',
      day: 'ସୋମବାର',
      name: 'ଶ୍ରୀଜିଉଙ୍କ ନବାଙ୍କ ବେଶ , ଶ୍ରୀମନ୍ଦିରରେ ଦେବାଭିଷେକ ପୂର୍ଣ୍ଣିମା , ପୌଷ ପୂର୍ଣ୍ଣିମା , ତୀର୍ଥରାଜ ମହୋଦଧି ଆରତୀ ଉତ୍ସବ , ମାସାନ୍ତ',
      Image: '',
      tithi: '(୧୩) ଜାନୁଆରୀ , ସୋମବାର (ପୌଷ) ଧନୁ ଦି୨୯ନ , ରଜବ ତା୧୨ରିଖ , ସାୟନ ପୌଷ ଦି୨୩ନ',
      sunrise: 'ଘ୬|୨୭|୫୧',
      sunset: 'ଘ୫|୨୨|୪୧',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୮|୪ ମଧ୍ୟେ , ଘ୧୧|୧୬ ରୁ ଘ୧|୪୦ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା  ଘ୬|୧୪ ରୁ ଘ୮|୩୮ ମଧ୍ୟେ , ଘ୧୧|୨ ରୁ ଘ୨|୧୪ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୪|୩ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୨୩ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୫୧ ରୁ ଘ୯|୧୪ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୨|୪୨ ରୁ ୪|୪ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୨୦ ରୁ ଘ୧୧|୫୭ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 14,
      date: '14/01/2025',
      day: 'ମଙ୍ଗଳବାର',
      name: 'ମକର ସଂକ୍ରାନ୍ତି , ପୋଙ୍ଗଲ , ମାଘ ବ୍ରତାରମ୍ଭ , ଉତ୍ତରାୟଣ',
      Image: '',
      tithi: '(୧୪) ଜାନୁଆରୀ , ମଙ୍ଗଳବାର (ମାଘ) ମକର ଦି୧ନ , ରଜବ ତା୧୩ରିଖ , ସାୟନ ପୌଷ ଦି୨୪ନ',
      sunrise: 'ଘ୬|୨୭|୫୪',
      sunset: 'ଘ୫|୨୩|୨୪',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୮|୫୨ ରୁ ଘ୧୧|୧୬ ମଧ୍ୟେ , ଘ୧|୪୦ ରୁ ଘ୩|୧୬ ମଧ୍ୟେ , ଘ୪|୨ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୨୩ ପର୍ଯ୍ୟନ୍ତ , ସୂର୍ଯ୍ୟାସ୍ତରୁ ସନ୍ଧ୍ୟା ଘ୬|୧୪ ପର୍ଯ୍ୟନ୍ତ , ରାତ୍ରି ଘ୮|୩୯ ରୁ ଘ୧୧|୩ ମଧ୍ୟେ , ଘ୧|୨୭ ରୁ ଘ୩|୩ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୨୦ ରୁ ଘ୨|୪୩ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୭|୪୭ ରୁ ୯|୧୨ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୫ ରୁ ଘ୮|୨ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 15,
      date: '15/01/2025',
      day: 'ବୁଧବାର',
      name: 'ପୁଷ୍ୟାଭିଷେକ , ରାଜାଭିଷେକ , ଶ୍ରୀଗଜପତି ମହାରାଜଙ୍କ ପୁଷ୍ୟାଭିଷେକ ଉତ୍ସବ',
      Image: '',
      tithi: '(୧୫) ଜାନୁଆରୀ , ବୁଧବାର (ମାଘ) ମକର ଦି୨ନ , ରଜବ ତା୧୪ରିଖ , ସାୟନ ପୌଷ ଦି୨୫ନ',
      sunrise: 'ଘ୬|୨୭|୫୬',
      sunset: 'ଘ୫|୨୪|୪',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୮|୪ ମଧ୍ୟେ , ଘ୧୨|୫୨ ରୁ ଘ୨|୨୮ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୧୬ ରୁ ରାତ୍ରି ଘ୮|୪୦ ମଧ୍ୟେ , ରାତ୍ରି ଘ୧|୨୮ ରୁ ନିଶାନ୍ତ ଘ୫|୨୮ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୪|୫୦ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୨୪ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୪୦ ରୁ ଘ୧୦|୧୬ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୯|୧୩ ରୁ ଘ୧୦|୩୭ ମଧ୍ୟେ  | (ବାରବେଳା) ଦିବା ଘ୧୧|୫୮  ରୁ ୧|୨୦ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୩|୧୩ ରୁ ଘ୪|୪୮ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 16,
      date: '16/01/2025',
      day: 'ଗୁରୁବାର',
      name: '',
      Image: '',
      tithi: '(୧୬) ଜାନୁଆରୀ , ଗୁରୁବାର (ମାଘ) ମକର ଦି୩ନ , ରଜବ ତା୧୫ରିଖ , ସାୟନ ପୌଷ ଦି୨୬ନ',
      sunrise: 'ଘ୬|୨୭|୫୭',
      sunset: 'ଘ୫|୨୪|୪୫',
      gdTime: '(ଅମୃତ) ରାତ୍ରି ଘ୧୨|୪୦ ଘ୩|୪ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୮|୪ ମଧ୍ୟେ ,ଘ୧୨|୧୬ ରୁ ୨|୪୦ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୨|୪୦ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୨୫ ମଧ୍ୟେ  | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୫୮ ରୁ ଘ୧|୩୫ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 17,
      date: '17/01/2025',
      day: 'ଶୁକ୍ରବାର',
      name: 'ସଙ୍କଟ ଚତୁର୍ଥୀ ବ୍ରତ',
      Image: '',
      tithi: '(୧୭) ଜାନୁଆରୀ , ଶୁକ୍ରବାର (ମାଘ) ମକର ଦି୪ନ , ରଜବ ତା୧୬ରିଖ , ସାୟନ ପୌଷ ଦି୨୭ନ',
      sunrise: 'ଘ୬|୨୮|୫',
      sunset: 'ଘ୫|୨୫|୧୭',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୮|୪ ମଧ୍ୟେ , ଘ୮|୫୨ ରୁ ଘ୧୧|୧୬ ମଧ୍ୟେ , ଘ୧|୪୦ ରୁ ଘ୩|୧୬ ମଧ୍ୟେ , ଘ୪|୫୧ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୨୫ ପର୍ଯ୍ୟନ୍ତ , ରାତ୍ରି ଘ୭|୫ ରୁ ଘ୮|୪୧ ମଧ୍ୟେ ,ଘ୩|୫ ରୁ ଘ୩|୫୩ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର)ରାତ୍ରି ଘ୧୦|୧୭ ରୁ ଘ୧୧|୫ ମଧ୍ୟେ , ଘ୩|୫୩ ରୁ ନିଶାନ୍ତ ଘ୫|୨୯ ମଧ୍ୟେ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୯|୧୨ ରୁ ଘ୧୨|୧ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୪୪  ରୁ ଘ୧୦|୨୧ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 18,
      date: '18/01/2025',
      day: 'ଶନିବାର',
      name: '',
      Image: '',
      tithi: '(୧୮) ଜାନୁଆରୀ , ଶନିବାର (ମାଘ) ମକର ଦି୫ନ , ରଜବ ତା୧୭ରିଖ , ସାୟନ ପୌଷ ଦି୨୮ନ',
      sunrise: 'ଘ୬|୨୭|୫୭',
      sunset: 'ଘ୫|୨୬|୫',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୧୦|୨୮ ରୁ ଘ୧|୪୦ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୫୪ ରୁ ଘ୧୦|୧୮ ମଧ୍ୟେ , ଘ୧୧|୫୪ ରୁ ଘ୧|୩୦ ମଧ୍ୟେ , ଘ୨|୮ ରୁ ଘ୩|୫୪ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ପ୍ରାତଃରୁ ଦିବା ଘ୭|୪୯ ମଧ୍ୟେ , ଘ୪|୪ ରୁ ଘ୫|୨୬ ପର୍ଯ୍ୟନ୍ତ  | (ବାରବେଳା) ଦିବା ଘ୧|୨୨ ରୁ ୨|୪୪ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୭|୬ ମଧ୍ୟେ , ଘ୪|୫୦ ରୁ ନିଶାନ୍ତ ଘ୬|୨୮ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 19,
      date: '19/01/2025',
      day: 'ରବିବାର',
      name: '',
      Image: '',
      tithi: '(୧୯) ଜାନୁଆରୀ , ରବିବାର (ମାଘ) ମକର ଦି୬ନ , ରଜବ ତା୧୮ରିଖ , ସାୟନ ପୌଷ ଦି୨୯ନ',
      sunrise: 'ଘ୬|୨୭|୫୬',
      sunset: 'ଘ୫|୨୬|୪୪',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୭|୧୭ ରୁ ଘ୧୦|୨୮ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୬ ରୁ ଘ୮|୪୨ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୬ ମଧ୍ୟେ , ଘ୧|୪୦ ରୁ ଘ୨|୨୮ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୧୮ ରୁ ରାତ୍ରି ଘ୭|୬ ମଧ୍ୟେ , ଘ୧୧|୫୪ ରୁ ଘ୩|୬ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୧୦|୩୬ ରୁ ଘ୧|୨୨ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୩୬ ରୁ ଘ୩|୩୩ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 20,
      date: '20/01/2025',
      day: 'ସୋମବାର',
      name: '',
      Image: '',
      tithi: '(୨୦) ଜାନୁଆରୀ , ସୋମବାର (ମାଘ) ମକର ଦି୭ନ , ରଜବ ତା୧୯ରିଖ , ସାୟନ ପୌଷ ଦି୩୦ନ',
      sunrise: 'ଘ୬|୨୭|୫୪',
      sunset: 'ଘ୫|୨୭|୨୨',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୮|୩ ମଧ୍ୟେ , ଘ୧୧|୧୫ ରୁ ଘ୧|୩୯ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୧୯ ରୁ ରାତ୍ରି ଘ୮|୪୩ ମଧ୍ୟେ , ଘ୧୧|୭ ରୁ ଘ୩|୧୯ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୪|୨ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୨୭ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୫୦ ରୁ ଘ୯|୧୩ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୨|୪୫ ରୁ ଘ୪|୮ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୨ ରୁ ଘ୧୨|୦ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 21,
      date: '21/01/2025',
      day: 'ମଙ୍ଗଳବାର',
      name: '',
      Image: '',
      tithi: '(୨୧) ଜାନୁଆରୀ , ମଙ୍ଗଳବାର (ମାଘ) ମକର ଦି୮ନ , ରଜବ ତା୨୦ରିଖ , ସାୟନ ମାଘ ଦି୧ନ',
      sunrise: 'ଘ୬|୨୭|୫୧',
      sunset: 'ଘ୫|୨୭|୫୯',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୮|୫୧ ରୁ ଘ୧୧|୧୫ ମଧ୍ୟେ , ଘ୧|୩୯ ରୁ ଘ୩|୧୫ ମଧ୍ୟେ , ଘ୪|୧ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୨୮ ପର୍ଯ୍ୟନ୍ତ , ସୂର୍ଯ୍ୟାସ୍ତରୁ ସନ୍ଧ୍ୟା ଘ୬|୧୯ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୪୮ ରୁ ଘ୧୧|୮ ମଧ୍ୟେ , ଘ୧|୩୨ ରୁ ଘ୩|୮ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୨୩ ରୁ ଘ୨|୪୪ ପର୍ଯ୍ୟନ୍ତ  | (ବାରବେଳା) ଦିବା ଘ୭|୫୦ ରୁ ୯|୧୩ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୯ ରୁ ଘ୮|୪୬ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 22,
      date: '22/01/2025',
      day: 'ବୁଧବାର',
      name: 'ଅଷ୍ଟକା ଶ୍ରାଦ୍ଧ',
      Image: '',
      tithi: '(୨୨) ଜାନୁଆରୀ , ବୁଧବାର (ମାଘ) ମକର ଦି୯ନ , ରଜବ ତା୨୧ରିଖ , ସାୟନ ମାଘ ଦି୨ନ',
      sunrise: 'ଘ୬|୨୭|୪୪',
      sunset: 'ଘ୫|୨୮|୪୦',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୮|୩ ମଧ୍ୟେ , ଘ୧୨|୫୧ ରୁ ଘ୨|୨୭ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା  ଘ୬|୨୦ ରୁ ରାତ୍ରି ଘ୮|୪୪ ମଧ୍ୟେ , ଘ୧|୩୨ ରୁ ନିଶାନ୍ତ ଘ୫|୩୨ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୪|୪୯ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୨୯ ପର୍ଯ୍ୟନ୍ତ , ରାତ୍ରି ଘ୮|୪୪ ରୁ ଘ୧୦|୨୦ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୯|୧୩ ରୁ ଘ୧୦|୩୬ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୫୮  ରୁ ୧|୨୪ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୩|୧୩ ରୁ ଘ୪|୪୯ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 23,
      date: '23/01/2025',
      day: 'ଗୁରୁବାର',
      name: 'ଅନ୍ଵଷ୍ଟକା ଶ୍ରାଦ୍ଧ',
      Image: '',
      tithi: '(୨୩) ଜାନୁଆରୀ , ଗୁରୁବାର (ମାଘ) ମକର ଦି୧୦ନ , ରଜବ ତା୨୨ରିଖ , ସାୟନ ମାଘ ଦି୩ନ',
      sunrise: 'ଘ୬|୨୭|୩୭',
      sunset: 'ଘ୫|୨୯|୨୧',
      gdTime: '(ଅମୃତ) ରାତ୍ରି ଘ୧୨|୪୫ ରୁ ଘ୩|୯ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୮|୩ ମଧ୍ୟେ , ଘ୧୧|୧୫ ରୁ ଘ୧|୩୯ ମଧ୍ୟେ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୨|୪୪ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୨୯ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୨|୧ ରୁ ଘ୧|୩୪ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 24,
      date: '24/01/2025',
      day: 'ଶୁକ୍ରବାର',
      name: 'ବୁଧଗ୍ରହ ଜୟନ୍ତୀ',
      Image: '',
      tithi: '(୨୪) ଜାନୁଆରୀ , ଶୁକ୍ରବାର (ମାଘ) ମକର ଦି୧୧ନ , ରଜବ ତା୨୩ରିଖ , ସାୟନ ମାଘ ଦି୪ନ',
      sunrise: 'ଘ୬|୨୭|୨୯',
      sunset: 'ଘ୫|୨୯|୫୯',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୮|୩ ମଧ୍ୟେ , ଘ୮|୫୧ ରୁ ଘ୧୧|୧୫ ମଧ୍ୟେ , ଘ୧|୩୯ ରୁ ଘ୩|୧୫ ମଧ୍ୟେ , ଘ୪|୫ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୩୦ ପର୍ଯ୍ୟନ୍ତ , ରାତ୍ରି ଘ୭|୯ ରୁ ଘ୮|୪୫ ମଧ୍ୟେ , ଘ୩|୯ ରୁ ଘ୩|୫୭ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୧୦|୨୧ ରୁ ୧୧|୯ ମଧ୍ୟେ , ଘ୩|୫୭ ରୁ ନିଶାନ୍ତ  ଘ୫|୩୩ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୯|୧୩ ରୁ ଘ୧୨|୨୦ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୪୭ ରୁ ଘ୪୧୦|୨୩ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 25,
      date: '25/01/2025',
      day: 'ଶନିବାର',
      name: 'ଶ୍ରୀମନ୍ଦିରରେ ଓ ସର୍ବସମ୍ମତ ଷଟତିଳା ଏକାଦଶୀ , ସାଧୁ ଅରକ୍ଷିତ ଦାସଙ୍କ ତିରୋଧାନ ଦିବସ',
      Image: '',
      tithi: '(୨୫) ଜାନୁଆରୀ , ଶନିବାର (ମାଘ) ମକର ଦି୧୨ନ , ରଜବ ତା୨୪ରିଖ , ସାୟନ ମାଘ ଦି୫ନ',
      sunrise: 'ଘ୬|୨୭|୨୧',
      sunset: 'ଘ୫|୩୦|୩୭',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୧୦|୨୬ ରୁ ଘ୧|୩୮ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୫୮ ରୁ ଘ୧୦|୨୨ ମଧ୍ୟେ , ଘ୧୧|୫୮ ରୁ ଘ୧|୩୪ ମଧ୍ୟେ , ଘ୨|୨୨ ରୁ ଘ୩|୫୮ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ପ୍ରାତଃରୁ ଦିବା ଘ୭|୪୯ ମଧ୍ୟେ , ଘ୪|୭ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୩୧  ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୧୨|୨୪ ରୁ ଘ୨|୪୭ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସୂର୍ଯ୍ୟାସ୍ତ ରାତ୍ରି ଘ୭|୧୦ ମଧ୍ୟେ , ଘ୪|୪୯ ରୁ ନିଶାନ୍ତ ଘ୬|୨୭ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 26,
      date: '26/01/2025',
      day: 'ରବିବାର',
      name: '୭୬ତମ ସାଧାରଣତନ୍ତ୍ର ଦିବସ',
      Image: '',
      tithi: '(୨୬) ଜାନୁଆରୀ , ରବିବାର (ମାଘ) ମକର ଦି୧୩ନ , ରଜବ ତା୨୫ରିଖ , ସାୟନ ମାଘ ଦି୬ନ',
      sunrise: 'ଘ୬|୨୭|୧୦',
      sunset: 'ଘ୫|୩୧|୧୪',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୭|୧୪ ରୁ ଘ୧୦|୨୬ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୧୧ ରୁ ଘ୮|୪୭ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୫ ମଧ୍ୟେ , ଘ୧|୩୮ ରୁ ୨|୨୬ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୨୩ ରୁ ରାତ୍ରି ଘ୭|୧୧ ମଧ୍ୟେ , ଘ୧୧|୫୯ ରୁ ଘ୩|୧୧ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୯|୩୬ ରୁ ଘ୧|୨୪ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୩୬ ରୁ ଘ୩|୧୨ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 27,
      date: '27/01/2025',
      day: 'ସୋମବାର',
      name: 'ରଟନ୍ତୀ କାଳିକା (ତାରା) ପୂଜା',
      Image: '',
      tithi: '(୨୭) ଜାନୁଆରୀ , ସୋମବାର (ମାଘ) ମକର ଦି୧୪ନ , ରଜବ ତା୨୬ରିଖ , ସାୟନ ମାଘ ଦି୭ନ',
      sunrise: 'ଘ୬|୨୬|୫୯',
      sunset: 'ଘ୫|୩୧|୫୧',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୮|୨ ମଧ୍ୟେ , ଘ୧୧|୧୪ ରୁ ଘ୧|୩୮ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା  ଘ୬|୨୩ ରୁ ରାତ୍ରି ଘ୮|୪୭ ମଧ୍ୟେ , ଘ୧୧|୧୧ ରୁ ଘ୨|୨୩ ମଧ୍ୟେ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୪|୧ ରୁ ଘ୫|୩୨ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୭|୪୮ ରୁ ଘ୯|୧୨ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୨|୪୮ ରୁ ଘ୪|୧୨ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୨୪ ରୁ ଘ୧୨|୦ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 28,
      date: '28/01/2025',
      day: 'ମଙ୍ଗଳବାର',
      name: 'ରଟନ୍ତୀ ଚତୁର୍ଦ୍ଦଶୀ ସ୍ନାନ , ଯମତର୍ପଣ , ଶରଣ ଆରମ୍ଭ',
      Image: '',
      tithi: '(୨୮) ଜାନୁଆରୀ , ମଙ୍ଗଳବାର (ମାଘ) ମକର ଦି୧୫ନ , ରଜବ ତା୨୭ରିଖ , ସାୟନ ମାଘ ଦି୮ନ',
      sunrise: 'ଘ୬|୨୬|୪୮',
      sunset: 'ଘ୫|୩୨|୨୮',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୮|୪୯ ରୁ ଘ୧୧|୧୩ ମଧ୍ୟେ , ଘ୧|୩୭ ରୁ ଘ୩|୧୩ ମଧ୍ୟେ , ଘ୪|୦ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୩୨ ପର୍ଯ୍ୟନ୍ତ , ସୂର୍ଯ୍ୟାସ୍ତରୁ ସନ୍ଧ୍ୟା ଘ୬|୨୩ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୪୮ ରୁ ଘ୧୧|୧୨ ମଧ୍ୟେ , ଘ୧|୩୬ ରୁ ଘ୩|୧୨ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୨୪ ରୁ ଘ୨|୪୮ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୭|୪୮ ରୁ ୯|୧୨ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୧୨ ରୁ ଘ୮|୪୮ ମଧ୍ୟେ |',
    },
    {
      id: 29,
      date: '29/01/2025',
      day: 'ବୁଧବାର',
      name: 'ତ୍ରିବେଣୀ ଅମାବାସ୍ୟା , ପ୍ରୟାଗରେ ତ୍ରିବେଣୀ ସ୍ନାନ ଯୋଗ , ଶ୍ରୀ ବିରଜା ଦେବୀଙ୍କ ଜନ୍ମୋତ୍ସବ',
      Image: '',
      tithi: '(୨୯) ଜାନୁଆରୀ , ବୁଧବାର (ମାଘ) ମକର ଦି୧୬ନ , ରଜବ ତା୨୮ରିଖ , ସାୟନ ମାଘ ଦି୯ନ',
      sunrise: 'ଘ୬|୨୬|୩୨',
      sunset: 'ଘ୫|୩୩|୬',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୮|୨ ମଧ୍ୟେ , ଘ୧୨|୪୯ ରୁ ଘ୨|୨୫ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୨୩ ରୁ ରାତ୍ରି ଘ୮|୪୭ ମଧ୍ୟେ , ଘ୧|୩୫ ରୁ ନିଶାନ୍ତ ଘ୫|୩୫ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୯|୧୨ ରୁ ଘ୧୦|୩୬ ମଧ୍ୟେ  | (ବାରବେଳା) ଦିବା ଘ୧୨|୦ ରୁ ୧|୨୪ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୩|୧୨ ରୁ ଘ୪|୪୮ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 30,
      date: '30/01/2025',
      day: 'ଗୁରୁବାର',
      name: 'ଦ୍ୱିତୀୟା ଚନ୍ଦ୍ରଦର୍ଶନ',
      Image: '',
      tithi: '(୩୦) ଜାନୁଆରୀ , ଗୁରୁବାର (ମାଘ) ମକର ଦି୧୭ନ , ରଜବ ତା୨୯ରିଖ , ସାୟନ ମାଘ ଦି୧୦ନ',
      sunrise: 'ଘ୬|୨୬|୧୬',
      sunset: 'ଘ୫|୩୩|୪୪',
      gdTime: '(ଅମୃତ) ରାତ୍ରି ଘ୧୨|୪୯ ରୁ ଘ୩|୧୩ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୮|୧ ମଧ୍ୟେ , ଘ୧୧|୩ ରୁ ଘ୧|୩୭ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୨|୪୫ ରୁ ଘ୫|୩୪ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୨|୦ ରୁ ଘ୧|୩୬ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 31,
      date: '31/01/2025',
      day: 'ଶୁକ୍ରବାର',
      name: '',
      Image: '',
      tithi: '(୩୧) ଜାନୁଆରୀ , ଶୁକ୍ରବାର (ମାଘ) ମକର ଦି୧୮ନ , ସାବାନ୍ ତା୧ରିଖ , ସାୟନ ମାଘ ଦି୧୧ନ',
      sunrise: 'ଘ୬|୨୫|୫୯',
      sunset: 'ଘ୫|୩୪|୧୯',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୮|୦ ମଧ୍ୟେ , ଘ୮|୪୮ ରୁ ଘ୧୧|୧୨ ମଧ୍ୟେ , ଘ୧|୩୬ ରୁ ଘ୩|୧୨ ମଧ୍ୟେ , ଘ୪|୪୬ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୩୪  ପର୍ଯ୍ୟନ୍ତ , ରାତ୍ରି ଘ୭|୧୩ ରୁ ଘ୮|୪୯ ମଧ୍ୟେ , ଘ୩|୧୩ ରୁ ଘ୪|୧ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୧୦|୨୫ ରୁ ୧୧|୧୩ ମଧ୍ୟେ , ଘ୪|୧ ରୁ ନିଶାନ୍ତ  ଘ୫|୩୭ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୯|୧୨ ରୁ ଘ୧୨|୦ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୪୯ ରୁ ଘ୧୦|୨୫ ପର୍ଯ୍ୟନ୍ତ | ',
    },
  ]

  const eventsForEnglishMonth = [

  ]

  const CUSTOMOdia_DATE = [
    { id: 1, showDate: '୨୯', disable: 'yes', date: '29/12/2024', spclEvent: 'no' },
    { id: 2, showDate: '୩୦', disable: 'yes', date: '30/12/2024', spclEvent: 'no' },
    { id: 3, showDate: '୩୧', disable: 'yes', date: '31/12/2024', spclEvent: 'no' },
    { id: 4, showDate: '୧', disable: 'no', date: '01/01/2025', spclEvent: 'yes' },
    { id: 5, showDate: '୨', disable: 'no', date: '02/01/2025', spclEvent: 'no' },
    { id: 6, showDate: '୩', disable: 'no', date: '03/01/2025', spclEvent: 'no' },
    { id: 7, showDate: '୪', disable: 'no', date: '04/01/2025', spclEvent: 'no' },
    { id: 8, showDate: '୫', disable: 'no', date: '05/01/2025', spclEvent: 'yes' },
    { id: 9, showDate: '୬', disable: 'no', date: '06/01/2025', spclEvent: 'no' },
    { id: 10, showDate: '୭', disable: 'no', date: '07/01/2025', spclEvent: 'no' },
    { id: 11, showDate: '୮', disable: 'no', date: '08/01/2025', spclEvent: 'no' },
    { id: 12, showDate: '୯', disable: 'no', date: '09/01/2025', spclEvent: 'yes' },
    { id: 13, showDate: '୧୦', disable: 'no', date: '10/01/2025', spclEvent: 'yes' },
    { id: 14, showDate: '୧୧', disable: 'no', date: '11/01/2025', spclEvent: 'no' },
    { id: 15, showDate: '୧୨', disable: 'no', date: '12/01/2025', spclEvent: 'yes' },
    { id: 16, showDate: '୧୩', disable: 'no', date: '13/01/2025', spclEvent: 'yes' },
    { id: 17, showDate: '୧୪', disable: 'no', date: '14/01/2025', spclEvent: 'yes' },
    { id: 18, showDate: '୧୫', disable: 'no', date: '15/01/2025', spclEvent: 'yes' },
    { id: 19, showDate: '୧୬', disable: 'no', date: '16/01/2025', spclEvent: 'no' },
    { id: 20, showDate: '୧୭', disable: 'no', date: '17/01/2025', spclEvent: 'yes' },
    { id: 21, showDate: '୧୮', disable: 'no', date: '18/01/2025', spclEvent: 'no' },
    { id: 22, showDate: '୧୯', disable: 'no', date: '19/01/2025', spclEvent: 'no' },
    { id: 23, showDate: '୨୦', disable: 'no', date: '20/01/2025', spclEvent: 'no' },
    { id: 24, showDate: '୨୧', disable: 'no', date: '21/01/2025', spclEvent: 'no' },
    { id: 25, showDate: '୨୨', disable: 'no', date: '22/01/2025', spclEvent: 'yes' },
    { id: 26, showDate: '୨୩', disable: 'no', date: '23/01/2025', spclEvent: 'yes' },
    { id: 27, showDate: '୨୪', disable: 'no', date: '24/01/2025', spclEvent: 'yes' },
    { id: 28, showDate: '୨୫', disable: 'no', date: '25/01/2025', spclEvent: 'yes' },
    { id: 29, showDate: '୨୬', disable: 'no', date: '26/01/2025', spclEvent: 'yes' },
    { id: 30, showDate: '୨୭', disable: 'no', date: '27/01/2025', spclEvent: 'yes' },
    { id: 31, showDate: '୨୮', disable: 'no', date: '28/01/2025', spclEvent: 'yes' },
    { id: 32, showDate: '୨୯', disable: 'no', date: '29/01/2025', spclEvent: 'yes' },
    { id: 33, showDate: '୩୦', disable: 'no', date: '30/01/2025', spclEvent: 'yes' },
    { id: 34, showDate: '୩୧', disable: 'no', date: '31/01/2025', spclEvent: 'no' },
    { id: 35, showDate: '୧', disable: 'yes', date: '01/02/2025', spclEvent: 'no' },
  ];

  const CUSTOMEnglish_DATE = [
    { id: 1, showDate: '29', disable: 'yes', date: '29/12/2024', spclEvent: 'no' },
    { id: 2, showDate: '30', disable: 'yes', date: '30/12/2024', spclEvent: 'no' },
    { id: 3, showDate: '31', disable: 'yes', date: '31/12/2024', spclEvent: 'no' },
    { id: 4, showDate: '1', disable: 'no', date: '01/01/2025', spclEvent: 'yes' },
    { id: 5, showDate: '2', disable: 'no', date: '02/01/2025', spclEvent: 'no' },
    { id: 6, showDate: '3', disable: 'no', date: '03/01/2025', spclEvent: 'no' },
    { id: 7, showDate: '4', disable: 'no', date: '04/01/2025', spclEvent: 'no' },
    { id: 8, showDate: '5', disable: 'no', date: '05/01/2025', spclEvent: 'yes' },
    { id: 9, showDate: '6', disable: 'no', date: '06/01/2025', spclEvent: 'no' },
    { id: 10, showDate: '7', disable: 'no', date: '07/01/2025', spclEvent: 'no' },
    { id: 11, showDate: '8', disable: 'no', date: '08/01/2025', spclEvent: 'no' },
    { id: 12, showDate: '9', disable: 'no', date: '09/01/2025', spclEvent: 'yes' },
    { id: 13, showDate: '10', disable: 'no', date: '10/01/2025', spclEvent: 'yes' },
    { id: 14, showDate: '11', disable: 'no', date: '11/01/2025', spclEvent: 'no' },
    { id: 15, showDate: '12', disable: 'no', date: '12/01/2025', spclEvent: 'yes' },
    { id: 16, showDate: '13', disable: 'no', date: '13/01/2025', spclEvent: 'yes' },
    { id: 17, showDate: '14', disable: 'no', date: '14/01/2025', spclEvent: 'yes' },
    { id: 18, showDate: '15', disable: 'no', date: '15/01/2025', spclEvent: 'yes' },
    { id: 19, showDate: '16', disable: 'no', date: '16/01/2025', spclEvent: 'no' },
    { id: 20, showDate: '17', disable: 'no', date: '17/01/2025', spclEvent: 'yes' },
    { id: 21, showDate: '18', disable: 'no', date: '18/01/2025', spclEvent: 'no' },
    { id: 22, showDate: '19', disable: 'no', date: '19/01/2025', spclEvent: 'no' },
    { id: 23, showDate: '20', disable: 'no', date: '20/01/2025', spclEvent: 'no' },
    { id: 24, showDate: '21', disable: 'no', date: '21/01/2025', spclEvent: 'no' },
    { id: 25, showDate: '22', disable: 'no', date: '22/01/2025', spclEvent: 'yes' },
    { id: 26, showDate: '23', disable: 'no', date: '23/01/2025', spclEvent: 'yes' },
    { id: 27, showDate: '24', disable: 'no', date: '24/01/2025', spclEvent: 'yes' },
    { id: 28, showDate: '25', disable: 'no', date: '25/01/2025', spclEvent: 'yes' },
    { id: 29, showDate: '26', disable: 'no', date: '26/01/2025', spclEvent: 'yes' },
    { id: 30, showDate: '27', disable: 'no', date: '27/01/2025', spclEvent: 'yes' },
    { id: 31, showDate: '28', disable: 'no', date: '28/01/2025', spclEvent: 'yes' },
    { id: 32, showDate: '29', disable: 'no', date: '29/01/2025', spclEvent: 'yes' },
    { id: 33, showDate: '30', disable: 'no', date: '30/01/2025', spclEvent: 'yes' },
    { id: 34, showDate: '31', disable: 'no', date: '31/01/2025', spclEvent: 'no' },
    { id: 35, showDate: '1', disable: 'yes', date: '01/02/2025', spclEvent: 'no' },
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
              <TouchableOpacity onPress={() => navigation.navigate('December2024')}>
                <AntDesign name="caretleft" color={'#000'} size={25} />
              </TouchableOpacity>
              {selectedLanguage === "Odia" &&
                <Text style={{ color: '#000', fontSize: 17, fontWeight: '600' }}>ଜାନୁଆରୀ  ୨୦୨୫</Text>
              }
              {selectedLanguage === "English" &&
                <Text style={{ color: '#000', fontSize: 17, fontWeight: '600' }}>January  2025</Text>
              }
              <TouchableOpacity onPress={() => navigation.replace('February2025')}>
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

export default January2025

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