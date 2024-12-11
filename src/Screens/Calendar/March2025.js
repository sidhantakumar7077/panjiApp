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

const March2025 = (props) => {

  const eventsForOdiaMonth = [
    {
      id: 1,
      date: '01/03/2025',
      day: 'ଶନିବାର',
      name: 'ଶରଣ ଶେଷ , ଦ୍ୱିତୀୟା ଚନ୍ଦ୍ରଦର୍ଶନ',
      Image: '',
      tithi: '(୧) ମାର୍ଚ୍ଚ , ଶନିବାର (ଫାଲ୍ଗୁନ) କୁମ୍ଭ ଦି୧୮ନ , ସାବାନ୍ ତା୩୦ରିଖ , ସାୟନ ଫାଲ୍ଗୁନ ଦି୧୦ନ',
      sunrise: 'ଘ୬|୧୦|୧୩',
      sunset: 'ଘ୫|୪୮|୧୭',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୧୦|୬ ରୁ ଘ୧|୧୮ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୧୪ ରୁ ଘ୧୦|୩୮ ମଧ୍ୟେ , ଘ୧୨|୧୪ ରୁ ଘ୧|୫୦ ମଧ୍ୟେ , ଘ୨|୩୮ ରୁ ଘ୪|୧୪ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ପ୍ରାତଃରୁ ଦିବା ଘ୭|୩୪ ମଧ୍ୟେ , ଘ୪|୨୦ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୪୮ ପର୍ଯ୍ୟନ୍ତ  | (ବାରବେଳା) ଦିବା ଘ୧|୨୫ ରୁ ୨|୫୪ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୭|୨୧ ମଧ୍ୟେ ,  ଘ୪|୩୫ ରୁ ନିଶାନ୍ତ ଘ୬|୯ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 2,
      date: '02/03/2025',
      day: 'ରବିବାର',
      name: 'ରମଜାନ୍ ରୋଜା ଆରମ୍ଭ',
      Image: '',
      tithi: '(୨) ମାର୍ଚ୍ଚ , ରବିବାର (ଫାଲ୍ଗୁନ) କୁମ୍ଭ ଦି୧୯ନ , ରମଜାନ୍ ତା୧ରିଖ , ସାୟନ ଫାଲ୍ଗୁନ ଦି୧୧ନ',
      sunrise: 'ଘ୬|୯|୨୮   ',
      sunset: 'ଘ୫|୪୮|୩୮     ',
      gdTime: '(ଅମୃତ) ପ୍ରାତଃରୁ ଘ୬|୫୩ ରୁ ଘ୧୦|୫ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୨୬ ରୁ ଘ୯|୨ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୫୩ ମଧ୍ୟେ , ଘ୧|୧୭ ରୁ ଘ୨|୫ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୩୮ ରୁ ରାତ୍ରି ଘ୭|୨୬ ମଧ୍ୟେ , ଘ୧୧|୧୪ ରୁ ଘ୩|୨୬ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୨୮ ରୁ ଘ୧|୨୫ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୨୫ ରୁ ଘ୩|୦ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 3,
      date: '03/03/2025',
      day: 'ସୋମବାର',
      name: '',
      Image: '',
      tithi: '(୩) ମାର୍ଚ୍ଚ , ସୋମବାର (ଫାଲ୍ଗୁନ) କୁମ୍ଭ ଦି୨୦ନ , ରମଜାନ୍ ତା୨ରିଖ , ସାୟନ ଫାଲ୍ଗୁନ ଦି୧୨ନ',
      sunrise: 'ଘ୬|୮|୪୨',
      sunset: 'ଘ୫|୪୯|୦',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୪୨ ମଧ୍ୟେ , ଘ୧୦|୫୩ ରୁ ଘ୧|୧୭ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୩୯ ରୁ ରାତ୍ରି ଘ୯|୩ ମଧ୍ୟେ , ଘ୧୧|୨୭ ରୁ ଘ୨|୩୯ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୪ ରୁ ୫|୧୬ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୩୧ ରୁ ଘ୮|୫୯ ପର୍ଯ୍ୟନ୍ତ  | (ବାରବେଳା) ଦିବା ଘ୨|୫୪ ରୁ ୪|୨୨ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୨୫ ରୁ ଘ୧୧|୫୬ ପର୍ଯ୍ୟନ୍ତ',
    },
    {
      id: 4,
      date: '04/03/2025',
      day: 'ମଙ୍ଗଳବାର',
      name: ' ',
      Image: '',
      tithi: '(୪) ମାର୍ଚ୍ଚ , ମଙ୍ଗଳବାର (ଫାଲ୍ଗୁନ) କୁମ୍ଭ ଦି୨୧ନ , ରମଜାନ୍ ତା୩ରିଖ , ସାୟନ ଫାଲ୍ଗୁନ ଦି୧୩ନ',
      sunrise: 'ଘ୬|୭|୫୭',
      sunset: 'ଘ୫|୪୯|୨୧',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୮|୨୮ ରୁ ଘ୧୦|୫୨ ମଧ୍ୟେ , ଘ୧୧|୧୬ ରୁ ଘ୨|୫୨ ମଧ୍ୟେ , ଘ୩|୪ ରୁ ଘ୫|୧୬ ମଧ୍ୟେ , ସୂର୍ଯ୍ୟାସ୍ତରୁ ସନ୍ଧ୍ୟା ଘ୬|୩୮ ମଧ୍ୟେ , ରାତ୍ରି ଘ୯|୩ ରୁ ଘ୧୧|୨୭ ମଧ୍ୟେ , ଘ୧|୫୧ ରୁ ଘ୩|୨୭ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୨୫ ରୁ ଘ୨|୫୪ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୭|୩୧ ରୁ ଘ୮|୫୯ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୨୨ ରୁ ଘ୮|୫୩ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 5,
      date: '05/03/2025',
      day: 'ବୁଧବାର',
      name: 'ପଞ୍ଚାୟତିରାଜ ଦିବସ',
      Image: '',
      tithi: '(୫) ମାର୍ଚ୍ଚ , ବୁଧବାର (ଫାଲ୍ଗୁନ) କୁମ୍ଭ ଦି୨୨ନ , ରମଜାନ୍ ତା୪ରିଖ , ସାୟନ ଫାଲ୍ଗୁନ ଦି୧୪ନ',
      sunrise: 'ଘ୬|୭|୧୦',
      sunset: 'ଘ୫|୪୯|୪୨',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୪୩ ମଧ୍ୟେ , ଘ୧୨|୨୯ ରୁ ଘ୨|୫ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୩୮ ରୁ ରାତ୍ରି ଘ୯|୨ ମଧ୍ୟେ , ଘ୧|୫୦ ରୁ ନିଶାନ୍ତ ଘ୫|୩୧ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୪|୨୯ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୫୦ ପର୍ଯ୍ୟନ୍ତ , ରାତ୍ରି ଘ୯|୨ ରୁ ୧୦|୩୮ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୫୮ ରୁ ଘ୧୦|୨୭ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୫୬  ରୁ ୧|୨୫ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୫୮ ରୁ ଘ୪|୨୯ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 6,
      date: '06/03/2025',
      day: 'ଗୁରୁବାର',
      name: ' ',
      Image: '',
      tithi: '(୬) ମାର୍ଚ୍ଚ , ଗୁରୁବାର (ଫାଲ୍ଗୁନ) କୁମ୍ଭ ଦି୨୩ନ , ରମଜାନ୍ ତା୫ରିଖ , ସାୟନ ଫାଲ୍ଗୁନ ଦି୧୫ନ  ',
      sunrise: 'ଘ୬|୬|୨୨',
      sunset: 'ଘ୫|୫୦|୨',
      gdTime: '(ଅମୃତ) ରାତ୍ରି ଘ୧|୪ ରୁ ଘ୩|୨୮ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୩୯ ମଧ୍ୟେ , ଘ୧୦|୫ ରୁ ଘ୧|୧୪ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୨|୫୩ ରୁ ଘ୫|୫୦ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୫୫ ରୁ ଘ୧|୨୬ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 7,
      date: '07/03/2025',
      day: 'ଶୁକ୍ରବାର',
      name: ' ',
      Image: '',
      tithi: '(୭) ମାର୍ଚ୍ଚ , ଶୁକ୍ରବାର (ଫାଲ୍ଗୁନ) କୁମ୍ଭ ଦି୨୪ନ , ରମଜାନ୍ ତା୬ରିଖ , ସାୟନ ଫାଲ୍ଗୁନ ଦି୧୬ନ ',
      sunrise: 'ଘ୬|୫|୩୪',
      sunset: 'ଘ୫|୫୦|୨୨',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୩୮ ମଧ୍ୟେ , ଘ୮|୨୫ ରୁ ଘ୧୦|୪୯ ମଧ୍ୟେ , ଘ୧|୧୩ ରୁ ଘ୨|୪୯ ମଧ୍ୟେ , ଘ୪|୨୪ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୫୦ ପର୍ଯ୍ୟନ୍ତ , ସନ୍ଧ୍ୟା ଘ୬|୨୮ ରୁ ରାତ୍ରି ଘ୮|୪ ମଧ୍ୟେ , ଘ୨|୨୮ ରୁ ଘ୩|୧୬ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୯|୪୦ ରୁ ଘ୧୦|୨୮ ମଧ୍ୟେ , ଘ୩|୧୪ ରୁ ଘ୫|୫୦ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୮|୫୭ ରୁ ଘ୧୧|୫୨ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୫୩ ରୁ ଘ୧୦|୨୪ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 8,
      date: '08/03/2025',
      day: ' ଶନିବାର ',
      name: ' ',
      Image: '',
      tithi: '(୮) ମାର୍ଚ୍ଚ , ଶନିବାର (ଫାଲ୍ଗୁନ) କୁମ୍ଭ ଦି୨୫ନ , ରମଜାନ୍ ତା୭ରିଖ , ସାୟନ ଫାଲ୍ଗୁନ ଦି୧୭ନ  ',
      sunrise: 'ଘ୬|୪|୪୬  ',
      sunset: 'ଘ୫|୫୦|୪୨       ',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୧୦|୧ ରୁ ଘ୧|୧୩ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୧୬ ରୁ ଘ୧୦|୪୦ ମଧ୍ୟେ , ଘ୧୨|୧୬ ରୁ ଘ୧|୫୨ ମଧ୍ୟେ , ଘ୨|୪୦ ରୁ ଘ୪|୧୬ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: 'ପ୍ରାତଃରୁ ଦିବା ଘ୭|୨୦ ମଧ୍ୟେ , ଘ୪|୨୧ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୫୧ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୨|୩ ରୁ ୨|୫୧ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୭|୨୩ ମଧ୍ୟେ , ଘ୪|୨୯ ରୁ ନିଶାନ୍ତ ଘ୬|୪ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 9,
      date: '09/03/2025',
      day: 'ରବିବାର',
      name: 'ଶ୍ରୀମନ୍ଦିରେ ଓ ସର୍ବତ୍ର ଫଗୁଦଶମୀ , ଶ୍ରୀଜୀଉଙ୍କର ଚାଚେରୀ ବେଶ , ଦୋଳଯାତ୍ରାରମ୍ଭ',
      Image: '',
      tithi: '(୯) ମାର୍ଚ୍ଚ , ରବିବାର (ଫାଲ୍ଗୁନ) କୁମ୍ଭ ଦି୨୬ନ , ରମଜାନ୍ ତା୮ରିଖ , ସାୟନ ଫାଲ୍ଗୁନ ଦି୧୮ନ',
      sunrise: 'ଘ୬|୩|୫୩',
      sunset: 'ଘ୫|୫୧|୫',
      gdTime: '(ଅମୃତ) ପ୍ରାତଃ ଘ୬|୪୮ ରୁ ଦିବା ଘ୧୦|୦ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୨୯ ରୁ ଘ୯|୫ ମଧ୍ୟେ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ପ୍ରାତଃ ଘ୬|୪୯ ମଧ୍ୟେ , ଘ୧|୧୨ ରୁ ଘ୨|୦ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୪୧ ରୁ ରାତ୍ରି ଘ୭|୨୯ ମଧ୍ୟେ , ଘ୧୨|୧୭ ରୁ ଘ୩|୨୯ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୨୬ ରୁ ଘ୧|୨୪ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୨୫ ରୁ ଘ୨|୫୬ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 10,
      date: '10/03/2025',
      day: 'ସୋମବାର',
      name: 'ଶ୍ରୀମନ୍ଦିରେ ଓ ସର୍ବସମ୍ମତ ପାପନାଶୀନୀ (ଆମଦ୍ଦକୀ) ଏକାଦଶୀ , ପାପନାଶୀନୀ ସ୍ନାନ',
      Image: '',
      tithi: '(୧୦) ମାର୍ଚ୍ଚ , ସୋମବାର (ଫାଲ୍ଗୁନ) କୁମ୍ଭ ଦି୨୭ନ , ରମଜାନ୍ ତା୯ରିଖ , ସାୟନ ଫାଲ୍ଗୁନ ଦି୧୯ନ',
      sunrise: 'ଘ୬|୩|୮',
      sunset: 'ଘ୫|୫୧|୨୦',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୩୬ ମଧ୍ୟେ , ଘ୧୦|୪୭ ରୁ ଘ୧|୧୧ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୪୧ ରୁ ରାତ୍ରି ଘ୯|୫ ମଧ୍ୟେ , ଘ୧୧|୨୯ ରୁ ଘ୨|୪୧ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୩୫ ରୁ ଘ୫|୧୧ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୨୬ ରୁ ଘ୮|୫୯ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୨|୫୪ ରୁ ଘ୪|୨୩ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୨୪ ରୁ ଘ୧୧|୫୪ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 11,
      date: '11/03/2025',
      day: 'ମଙ୍ଗଳବାର',
      name: 'ସାମାନ୍ୟ ଗୋବିନ୍ଦ ଦ୍ଵାଦଶୀ ସ୍ନାନ',
      Image: '',
      tithi: '(୧୧) ମାର୍ଚ୍ଚ , ମଙ୍ଗଳବାର (ଫାଲ୍ଗୁନ) କୁମ୍ଭ ଦି୨୮ନ , ରମଜାନ୍ ତା୧୦ରିଖ , ସାୟନ ଫାଲ୍ଗୁନ ଦି୨୦ନ',
      sunrise: 'ଘ୬|୨|୧୮',
      sunset: 'ଘ୫|୫୧|୩୮',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୮|୨୨ ରୁ ଘ୧୦|୪୬ ମଧ୍ୟେ , ଘ୧|୧୦ ରୁ ଘ୨|୪୬ ମଧ୍ୟେ , ଘ୩|୩୪  ଅପରାହ୍ନ ଘ୫|୧୦ ପର୍ଯ୍ୟନ୍ତ , ସୂର୍ଯ୍ୟାସ୍ତରୁ ସନ୍ଧ୍ୟା ଘ୬|୪୧ ମଧ୍ୟେ , ରାତ୍ରି ଘ୧|୫୩ ରୁ ଘ୩|୨୯ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୨୪ ରୁ ଘ୨|୫୪ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୭|୨୫ ରୁ ଘ୮|୫୫ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୨୩ ରୁ ଘ୮|୫୩ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 12,
      date: '12/03/2025',
      day: 'ବୁଧବାର',
      name: ' ',
      Image: '',
      tithi: ' (୧୨) ମାର୍ଚ୍ଚ , ବୁଧବାର (ଫାଲ୍ଗୁନ) କୁମ୍ଭ ଦି୨୯ନ , ରମଜାନ୍ ତା୧୧ରିଖ , ସାୟନ ଫାଲ୍ଗୁନ ଦି୨୧ନ',
      sunrise: 'ଘ୬|୧|୨୮',
      sunset: 'ଘ୫|୫୧|୫୬',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୩୩ ମଧ୍ୟେ , ଘ୧୨|୨୧ ରୁ ଘ୧|୫୭ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୪୧ ରୁ ରାତ୍ରି ଘ୯|୫ ମଧ୍ୟେ , ଘ୧|୫୭ ରୁ ନିଶାନ୍ତ ଘ୫|୫୮ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୪|୨୧ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୫୨ ପର୍ଯ୍ୟନ୍ତ , ରାତ୍ରି ଘ୯|୫ ରୁ ଘ୧୦|୪୧ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୫୪ ରୁ ଘ୧୦|୨୪ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୫୪  ରୁ ୧|୨୪ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୫୪ ରୁ ଘ୪|୨୪ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 13,
      date: '13/03/2025',
      day: 'ଗୁରୁବାର ',
      name: 'ଶ୍ରୀମନ୍ଦିରେ ମେଣ୍ଢାପୋଡି , ସର୍ବତ୍ର , ଓଳକଣା ମେଳନ , ହୋଲିକା ଦହନ , ମାସାନ୍ତ',
      Image: '',
      tithi: '(୧୩) ମାର୍ଚ୍ଚ , ଗୁରୁବାର (ଫାଲ୍ଗୁନ) କୁମ୍ଭ ଦି୩୦ନ , ରମଜାନ୍ ତା୧୨ରିଖ , ସାୟନ ଫାଲ୍ଗୁନ ଦି୨୨ନ',
      sunrise: 'ଘ୬|୦|୩୮',
      sunset: 'ଘ୫|୫୨|୧୪',
      gdTime: '(ଅମୃତ) ରାତ୍ରି ଘ୧|୬ ରୁ ଘ୩|୩୦ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୩୭ ମଧ୍ୟେ , ଘ୧୦|୪୪ ରୁ ଘ୧|୮ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୨|୫୨ ରୁ ସୂର୍ଯ୍ୟସ୍ତ ଘ୫|୫୨ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୫୩ ରୁ ଘ୧|୨୩ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 14,
      date: '14/03/2025',
      day: 'ଶୁକ୍ରବାର',
      name: 'ମୀନ ସଂକ୍ରାନ୍ତି , ଶ୍ରୀମନ୍ଦିରେ ଓ ସର୍ବତ୍ର ଦୋଳ ପୂର୍ଣ୍ଣିମା , ଶ୍ରୀଜୀଉଙ୍କ ରାଜାଧିରାଜ ବେଶ',
      Image: '',
      tithi: '(୧୪) ମାର୍ଚ୍ଚ , ଶୁକ୍ରବାର (ଚୈତ୍ର) ମୀନ ଦି୧ନ , ରମଜାନ୍ ତା୧୩ରିଖ , ସାୟନ ଫାଲ୍ଗୁନ ଦି୨୩ନ',
      sunrise: 'ଘ୫|୫୯|୩୭',
      sunset: 'ଘ୫|୫୨|୩୧',
      gdTime: '– (ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୩୧ ମଧ୍ୟେ , ଘ୮|୧୯ ରୁ ଘ୧୦|୪୩ ମଧ୍ୟେ , ଘ୧|୭ ରୁ ଘ୨|୪୩ ମଧ୍ୟେ , ଘ୪|୧୯ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୫୩ ପର୍ଯ୍ୟନ୍ତ , ରାତ୍ରି ଘ୭|୩୦ ରୁ ଘ୯|୬ ମଧ୍ୟେ , ଘ୩|୩୦ ରୁ ଘ୪|୧୮ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୧୦|୪୧ ରୁ ଘ୧୧|୨୯ ମଧ୍ୟେ , ଘ୪|୧୮ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୫୯ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୫୩ ରୁ ଘ୧୧|୫୧ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୫୩ ରୁ ଘ୧୦|୨୩ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 15,
      date: '15/03/2025',
      day: 'ଶନିବାର',
      name: 'ଶ୍ରୀମନ୍ଦିରେ ଓ ସର୍ବତ୍ର  ରଙ୍ଗ ହୋଲି ଉତ୍ସବ',
      Image: '',
      tithi: '(୧୫) ମାର୍ଚ୍ଚ , ଶନିବାର (ଚୈତ୍ର) ମୀନ ଦି୨ନ , ରମଜାନ୍ ତା୧୪ରିଖ , ସାୟନ ଫାଲ୍ଗୁନ ଦି୨୪ନ',
      sunrise: 'ଘ୫|୫୮|୫୬',
      sunset: 'ଘ୫|୫୨|୪୮',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୯|୫୫ ରୁ ଘ୧|୭ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୧୮ ରୁ ଘ୧୦|୪୨ ମଧ୍ୟେ , ଘ୧୨|୧୮ ରୁ ଘ୧|୫୪ ମଧ୍ୟେ , ଘ୨|୪୨ ରୁ ଘ୪|୧୮ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ପ୍ରାତଃରୁ ଦିବା ଘ୭|୨୩ ମଧ୍ୟେ , ଘ୪|୨୩ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୫୩ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧|୨୩ ରୁ ୨|୫୪ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୭|୨୪ ମଧ୍ୟେ, ଘ୪|୨୫ ରୁ ନିଶାନ୍ତ ଘ୫|୫୮ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 16,
      date: '16/03/2025',
      day: 'ରବିବାର',
      name: 'ଶୁକ୍ର ବୃଦ୍ଧ ହେତୁ ଅଶୁଦ୍ଧକାଳ ଆରମ୍ଭ',
      Image: '',
      tithi: '(୧୬) ମାର୍ଚ୍ଚ , ରବିବାର (ଚୈତ୍ର) ମୀନ ଦି୩ନ , ରମଜାନ୍ ତା୧୫ରିଖ , ସାୟନ ଫାଲ୍ଗୁନ ଦି୨୫ନ',
      sunrise: 'ଘ୫|୫୮|୫',
      sunset: 'ଘ୫|୫୩|୫',
      gdTime: '(ଅମୃତ) ପ୍ରାତଃ ଘ୬|୪୩ ରୁ ଦିବା ଘ୯|୫୫ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୩୦ ରୁ ଘ୯|୬ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ପ୍ରାତଃ ଘ୬|୪୩ ମଧ୍ୟେ , ଘ୧|୬ ରୁ ଘ୧|୫୪ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୪୨ ରୁ ରାତ୍ରି ଘ୭|୩୦ ମଧ୍ୟେ , ଘ୧୨|୧୮ ରୁ ଘ୩|୩୦ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୨୨ ରୁ ଘ୧|୨୩ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୨୨ ରୁ ଘ୨|୫୧ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 17,
      date: '17/03/2025',
      day: 'ସୋମବାର',
      name: ' ',
      Image: '',
      tithi: '(୧୭) ମାର୍ଚ୍ଚ , ସୋମବାର (ଚୈତ୍ର) ମୀନ ଦି୪ନ , ରମଜାନ୍ ତା୧୬ରିଖ , ସାୟନ ଫାଲ୍ଗୁନ ଦି୨୬ନ',
      sunrise: 'ଘ୫|୫୭|୧୪',
      sunset: 'ଘ୫|୫୩|୨୨',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୮|୧୮ ମଧ୍ୟେ , ଘ୧୧|୨୯ ରୁ ଦିବା ଘ୧|୫୩ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୪୩ ରୁ ରାତ୍ରି ଘ୯|୭ ମଧ୍ୟେ , ଘ୧୧|୩୧ ରୁ ଘ୨|୪୩ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୪|୧୭ ରୁ ୫|୫ ମଧ୍ୟେ , ଘ୨|୨୭ ରୁ ଘ୪|୧୧ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୨୧ ରୁ ଘ୮|୫୩ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୨|୫୪ ରୁ ୪|୨୪ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୨୨ ରୁ ଘ୧୧|୫୨ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 18,
      date: '18/03/2025',
      day: 'ମଙ୍ଗଳବାର',
      name: 'ତାରାତାରିଣୀ ଯାତ୍ରାରମ୍ଭ',
      Image: '',
      tithi: '(୧୮) ମାର୍ଚ୍ଚ , ମଙ୍ଗଳବାର (ଚୈତ୍ର) ମୀନ ଦି୫ନ , ରମଜାନ୍ ତା୧୭ରିଖ , ସାୟନ ଫାଲ୍ଗୁନ ଦି୨୭ନ  ',
      sunrise: 'ଘ୫|୫୬|୨୩',
      sunset: 'ଘ୫|୫୩|୩୯',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୮|୧୬ ରୁ ଘ୧୦|୪୦ ମଧ୍ୟେ , ଘ୧|୪ ରୁ ଘ୨|୪୦ ମଧ୍ୟେ , ଘ୩|୨୮ ରୁ ଘ୫|୪ ମଧ୍ୟେ , ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୫୪ ରୁ ଘ୬|୪୨ ମଧ୍ୟେ , ରାତ୍ରି ଘ୯|୭ ରୁ ୧୧|୩୫ ମଧ୍ୟେ , ଘ୧|୫୫ ରୁ ଘ୩|୩୧ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୨୩ ରୁ ଘ୨|୫୪ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୭|୨୦ ରୁ ଘ୮|୫୧ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୨୪ ରୁ ଘ୮|୫୩ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 19,
      date: '19/03/2025',
      day: 'ବୁଧବାର',
      name: 'ପଞ୍ଚଦୋଳ',
      Image: '',
      tithi: ' (୧୯) ମାର୍ଚ୍ଚ , ବୁଧବାର (ଚୈତ୍ର) ମୀନ ଦି୬ନ , ରମଜାନ୍ ତା୧୮ରିଖ , ସାୟନ ଫାଲ୍ଗୁନ ଦି୨୮ନ',
      sunrise: 'ଘ୫|୫୫|୩୧',
      sunset: 'ଘ୫|୫୩|୫୫',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୨୭ ମଧ୍ୟେ , ଦିବା ଘ୧୨|୧୫ ରୁ ଘ୧|୧୫ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୪୩ ରୁ ରାତ୍ରି ଘ୯|୭ ମଧ୍ୟେ , ରାତ୍ରି ଘ୧|୫୫ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୫୫ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୪|୧୫ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୫୪ ପର୍ଯ୍ୟନ୍ତ , ରାତ୍ରି ଘ୯|୭ ରୁ ଘ୧୦|୪୩ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୫୦ ରୁ ଘ୧୦|୨୧ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୫୨  ରୁ ୧|୨୩ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୫୦ ରୁ ଘ୪|୧୯ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 20,
      date: '20/03/2025',
      day: 'ଗୁରୁବାର',
      name: 'ସ୍କନ୍ଧଷଷ୍ଠୀ ବ୍ରତ',
      Image: '',
      tithi: '(୨୦) ମାର୍ଚ୍ଚ , ଗୁରୁବାର (ଚୈତ୍ର) ମୀନ ଦି୭ନ , ରମଜାନ୍ ତା୧୯ରିଖ , ସାୟନ ଫାଲ୍ଗୁନ ଦି୨୯ନ',
      sunrise: 'ଘ୫|୫୪|୩୮',
      sunset: 'ଘ୫|୫୪|୧୨',
      gdTime: '(ଅମୃତ) ରାତ୍ରି ଘ୧|୮ ରୁ ଘ୩|୩୨ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୨୭ ମଧ୍ୟେ , ଘ୧୦|୩୮ ରୁ ଘ୧|୨ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୨|୫୨ ରୁ ସୂର୍ଯ୍ୟସ୍ତ ଘ୫|୫୪ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୫୧ ରୁ ଘ୧|୨୦ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 21,
      date: '21/03/2025',
      day: 'ଶୁକ୍ରବାର ',
      name: 'ସମ ଦିବସ (ସମଦିବାରାତ୍ରି)',
      Image: '',
      tithi: '(୨୧) ମାର୍ଚ୍ଚ , ଶୁକ୍ରବାର (ଚୈତ୍ର) ମୀନ ଦି୮ନ , ରମଜାନ୍ ତା୨୦ରିଖ , ସାୟନ ଫାଲ୍ଗୁନ ଦି୩୦ନ',
      sunrise: 'ଘ୫|୫୩|୪୭',
      sunset: 'ଘ୫|୫୪|୨୯ ',
      gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୨୬ ମଧ୍ୟେ , ଘ୮|୧୩ ରୁ ଘ୧୦|୩୭ ମଧ୍ୟେ , ଘ୧|୧  ରୁ ଘ୨|୩୭ ମଧ୍ୟେ , ଘ୪|୧୨ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୫୪ ପର୍ଯ୍ୟନ୍ତ , ରାତ୍ରି ଘ୭|୩୨ ରୁ ଘ୯|୮ ମଧ୍ୟେ , ଘ୩|୩୨ ରୁ ଘ୪|୨୦ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୪|୨୧ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୫୩ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୮|୪୯ ରୁ ଘ୧୧|୫୧ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୫୩ ରୁ ଘ୧୦|୨୨ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 22,
      date: '22/03/2025',
      day: 'ଶନିବାର',
      name: 'ରାଷ୍ଟ୍ରୀୟ ଶକାଦ୍ଦ ୧୯୪୭ ଆରମ୍ଭ , ମା ବିନିକେୟୀ ଠାକୁରାଣୀଙ୍କ ଯାତ୍ରା',
      Image: '',
      tithi: '(୨୨) ମାର୍ଚ୍ଚ , ଶନିବାର (ଚୈତ୍ର) ମୀନ ଦି୯ନ , ରମଜାନ୍ ତା୨୧ରିଖ , ସାୟନ ଚୈତ୍ର ଦି୧ନ',
      sunrise: ' ଘ୫|୫୨|୫୫',
      sunset: 'ଘ୫|୫୪|୪୫',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୯|୪୮ ରୁ ଘ୧|୦ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୨୦ ରୁ ଘ୧୦|୪ ମଧ୍ୟେ , ଘ୧୨|୨୦ ରୁ ଘ୧|୫୬ ମଧ୍ୟେ , ଘ୨|୪୪ ରୁ ଘ୪|୨୦ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ପ୍ରାତଃରୁ ଦିବା ଘ୭|୧୯ ମଧ୍ୟେ , ଘ୪|୨୪ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୫୫ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧|୨୨ ରୁ ୨|୫୩ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୭|୨୫ ମଧ୍ୟେ ,  ଘ୪|୧୮ ରୁ ନିଶାନ୍ତ ଘ୫|୫୨ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 23,
      date: '23/03/2025',
      day: 'ରବିବାର',
      name: ' ',
      Image: '',
      tithi: ' (୨୩) ମାର୍ଚ୍ଚ , ରବିବାର (ଚୈତ୍ର) ମୀନ ଦି୧୦ନ , ରମଜାନ୍ ତା୨୨ରିଖ , ସାୟନ ଚୈତ୍ର ଦି୨ନ',
      sunrise: 'ଘ୫|୫୨|୨',
      sunset: 'ଘ୫|୫୫|୦ ',
      gdTime: '(ଅମୃତ) ପ୍ରାତଃ ଘ୬|୩୬ ରୁ ଦିବା ଘ୯|୪୮ ମଧ୍ୟେ , ଦିବା ଘ୧|୦ ରୁ ଘ୧|୪୮ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୪୪ ରୁ ରାତ୍ରି ଘ୭|୩୨ ମଧ୍ୟେ , ଘ୧୨|୨୦ ରୁ ଘ୩|୩୨ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୧୯ ରୁ ଘ୧|୨୨ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୧୯ ରୁ ଘ୨|୪୭ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 24,
      date: '24/03/2025',
      day: 'ସୋମବାର',
      name: 'ଶରଣ ଆରମ୍ଭ',
      Image: '',
      tithi: '(୨୪) ମାର୍ଚ୍ଚ , ସୋମବାର (ଚୈତ୍ର) ମୀନ ଦି୧୧ନ , ରମଜାନ୍ ତା୨୩ରିଖ , ସାୟନ ଚୈତ୍ର ଦି୩ନ',
      sunrise: '- ଘ୫|୫୧|୧୦',
      sunset: 'ଘ୫|୫୫|୧୬',
      gdTime: '– (ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୨୪ ମଧ୍ୟେ , ଘ୧୦|୩୫ ରୁ ଘ୧୨|୫୯ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୪୫ ରୁ ରାତ୍ରି ଘ୯|୯ ମଧ୍ୟେ , ଘ୧୧|୩୩ ରୁ ଘ୨|୪୫ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୨୩ ରୁ ଘ୪|୫୯ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୧୫ ରୁ ଘ୮|୪୭ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୨|୫୩ ରୁ ଘ୪|୨୫ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୨୧ ରୁ ଘ୧୧|୪୯ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 25,
      date: '25/03/2025',
      day: 'ମଙ୍ଗଳବାର',
      name: 'ଶ୍ରୀମନ୍ଦିରେ ଓ ସ୍ମାର୍ତ୍ତସମ୍ମତ ପାପମୋଚନୀ ଏକାଦଶୀ',
      Image: '',
      tithi: '(୨୫) ମାର୍ଚ୍ଚ , ମଙ୍ଗଳବାର (ଚୈତ୍ର) ମୀନ ଦି୧୨ନ , ରମଜାନ୍ ତା୨୪ରିଖ , ସାୟନ ଚୈତ୍ର ଦି୪ନ',
      sunrise: 'ଘ୫|୫୦|୧୮',
      sunset: 'ଘ୫|୫୫|୩୨',
      gdTime: ' (ଅମୃତ) ଦିବା ଘ୮|୮ ରୁ ଘ୧୦|୩୨ ମଧ୍ୟେ , ଘ୧୨|୫୬ ରୁ ଘ୨|୩୨ ମଧ୍ୟେ , ଘ୩|୨୦ ରୁ ଘ୪|୫୬ ମଧ୍ୟେ , ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୫୬ ରୁ ସନ୍ଧ୍ୟା ଘ୬|୪୫ ମଧ୍ୟେ , ରାତ୍ରି ଘ୯|୯ ରୁ ଘ୧୧|୩୩ ମଧ୍ୟେ , ଘ୧|୫୭ ରୁ ଘ୩|୩୩ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୨୨ ରୁ ଘ୨|୫୩ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୭|୧୫ ରୁ ଘ୮|୪୭ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୨୫ ରୁ ଘ୮|୫୩ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 26,
      date: '26/03/2025',
      day: 'ବୁଧବାର ',
      name: 'ସର୍ବବୈଷ୍ଣବ ସମ୍ମତ ଏକାଦଶୀ (ଅରୁଣୋଦୟବିଦ୍ଧ ',
      Image: '',
      tithi: '(୨୬) ମାର୍ଚ୍ଚ , ବୁଧବାର (ଚୈତ୍ର) ମୀନ ଦି୧୩ନ , ରମଜାନ୍ ତା୨୫ରିଖ , ସାୟନ ଚୈତ୍ର ଦି୫ନ',
      sunrise: 'ଘ୫|୪୯|୧୬',
      sunset: 'ଘ୫|୫୫|୩୮',
      gdTime: '(ଅମୃତ) ପ୍ରାତଃରୁ ଦିବା ଘ୭|୨୨ ମଧ୍ୟେ , ଘ୧୨|୯ ରୁ ଘ୧|୪୫ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୪୫ ରୁ ରାତ୍ରି ଘ୯|୯ ମଧ୍ୟେ , ଘ୨|୦ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୪୯ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୪|୧୯ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୫୬ ମଧ୍ୟେ , ରାତ୍ରି ଘ୯|୯ ରୁ ଘ୧୦|୪୫ ମଧ୍ୟେ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୪୬ ରୁ ଘ୧୦|୧୮ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୫୦  ରୁ ୧|୨୨ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୪୬ ରୁ ଘ୪|୧୪ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 27,
      date: '27/03/2025',
      day: 'ଗୁରୁବାର',
      name: 'ବାରୁଣୀ ସ୍ନାନ , ସୋ -ବେ -କଦର',
      Image: '',
      tithi: '(୨୭) ମାର୍ଚ୍ଚ , ଗୁରୁବାର (ଚୈତ୍ର) ମୀନ ଦି୧୪ନ , ରମଜାନ୍ ତା୨୬ରିଖ , ସାୟନ ଚୈତ୍ର ଦି୬ନ',
      sunrise: 'ଘ୫|୪୮|୩୩',
      sunset: 'ଘ୫|୫୬|୩',
      gdTime: '(ଅମୃତ) ରାତ୍ରି ଘ୧|୯ ରୁ ଘ୩|୩୩ ମଧ୍ୟେ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୨୧ ମଧ୍ୟେ , ଘ୧୦|୩୨ ରୁ ଘ୧୨|୫୬ ମଧ୍ୟେ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୨|୫୩ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୫୬ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୪୯ ରୁ ଘ୧|୭ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 28,
      date: '28/03/2025',
      day: 'ଶୁକ୍ରବାର',
      name: 'ସୃହୀ ଚତୁର୍ଦ୍ଦଶୀ , ଶରଣ ଶେଷ',
      Image: '',
      tithi: '(୨୮) ମାର୍ଚ୍ଚ , ଶୁକ୍ରବାର (ଚୈତ୍ର) ମୀନ ଦି୧୫ନ , ରମଜାନ୍ ତା୨୭ରିଖ , ସାୟନ ଚୈତ୍ର ଦି୭ନ',
      sunrise: 'ଘ୫|୪୭|୪୧',
      sunset: 'ଘ୫|୫୬|୧୯',
      gdTime: '– (ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୨୦ ମଧ୍ୟେ , ଘ୮|୭ ରୁ ଘ୧୦|୩୧ ମଧ୍ୟେ , ଘ୧୨|୫୫ ରୁ ଘ୨|୩୧ ପର୍ଯ୍ୟନ୍ତ , ଘ୪|୨୧ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୫୬ ପର୍ଯ୍ୟନ୍ତ , ରାତ୍ରି ଘ୭|୩୪ ରୁ ଘ୯|୧୦ ମଧ୍ୟେ , ଘ୩|୩୪ ରୁ ଘ୪|୨୨ ମଧ୍ୟେ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୧୦|୪୬ ରୁ ଘ୧୧|୩୪ ମଧ୍ୟେ , ଘ୩|୫୮ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୪୯ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୮|୪୫ ରୁ ଘ୧୧|୪୯ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୫୩ ରୁ ଘ୧୦|୨୧ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 29,
      date: '29/03/2025',
      day: 'ଶନିବାର',
      name: 'ମଧୁ ଅମାବାସ୍ୟା , ବାସନ୍ତିକ ନବଦିନ ପୂଜାରମ୍ଭ , ପଞ୍ଚଗ୍ରହକୂଟ',
      Image: '',
      tithi: '(୨୯) ମାର୍ଚ୍ଚ , ଶନିବାର (ଚୈତ୍ର) ମୀନ ଦି୧୬ନ , ରମଜାନ୍ ତା୨୮ରିଖ , ସାୟନ ଚୈତ୍ର ଦି୮ନ',
      sunrise: 'ଘ୫|୪୬|୫୦',
      sunset: 'ଘ୫|୫୬|୩୪',
      gdTime: '(ଅମୃତ) ଦିବା ଘ୯|୪୨ ରୁ ଘ୧୨|୫୪ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୨୨ ରୁ ଘ୧୦|୪ ମଧ୍ୟେ , ଘ୧୨|୨୨ ରୁ ଘ୧|୫୮ ମଧ୍ୟେ , ଘ୨|୪୬ ରୁ ଘ୪|୨୨ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ପ୍ରାତଃରୁ ଦିବା ଘ୭|୧୪ ମଧ୍ୟେ , ଘ୪|୨୪ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୫୭ ମଧ୍ୟେ  | (ବାରବେଳା) ଦିବା ଘ୧|୨୨ ରୁ ୨|୫୩ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ସୂର୍ଯ୍ୟାସ୍ତରୁ ରାତ୍ରି ଘ୭|୨୫ ମଧ୍ୟେ ,  ଘ୪|୧୫ ରୁ ନିଶାନ୍ତ ଘ୫|୪୬ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 30,
      date: '30/03/2025',
      day: 'ରବିବାର',
      name: 'ଦ୍ୱିତୀୟା ଚନ୍ଦ୍ରଦର୍ଶନ , ହିନ୍ଦୁ ନବବର୍ଷାରମ୍ଭ , ରୋଜା ଶେଷ , ବିକ୍ରମ ସମ୍ବତ୍ ୨୦୮୨ ପ୍ରବେଶ',
      Image: '',
      tithi: '(୩୦) ମାର୍ଚ୍ଚ , ରବିବାର (ଚୈତ୍ର) ମୀନ ଦି୧୭ନ , ରମଜାନ୍ ତା୨୯ରିଖ , ସାୟନ ଚୈତ୍ର ଦି୯ନ',
      sunrise: 'ଘ୫|୪୫|୫୮',
      sunset: 'ଘ୫|୫୬|୫୦',
      gdTime: '(ଅମୃତ) ପ୍ରାତଃ ଘ୬|୩୧ ରୁ ଦିବା ଘ୯|୪୨ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୧୪ ରୁ ଘ୯|୧ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ପ୍ରାତଃ ଘ୬|୩୧ ମଧ୍ୟେ , ଦିବା ଘ୧୨|୫୪ ରୁ ଘ୧|୪ ମଧ୍ୟେ , ରାତ୍ରି ଘ୬|୪୬ ରୁ ଘ୭|୧୪ ମଧ୍ୟେ , ଘ୧୨|୨୬ ରୁ ଘ୩|୩୪ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୧୬ ରୁ ଘ୨|୨୧ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୧୬ ରୁ ଘ୨|୪୪ ପର୍ଯ୍ୟନ୍ତ |',
    },
    {
      id: 31,
      date: '31/03/2025',
      day: 'ସୋମବାର',
      name: 'ମତ୍ସ୍ୟାବତାର ଜୟନ୍ତୀ , ଶୁକ୍ରତରୁଣ ଶୁଦ୍ଧକାଳ ଆରମ୍ଭ , ଇଦୁଲ୍ ଫିତର୍',
      Image: '',
      tithi: '(୩୧) ମାର୍ଚ୍ଚ , ସୋମବାର (ଚୈତ୍ର) ମୀନ ଦି୧୮ନ , ସୱାଲ୍ ତା୧ରିଖ , ସାୟନ ଚୈତ୍ର ଦି୧୦ନ ',
      sunrise: 'ଘ୫|୪୫|୫   ',
      sunset: 'ଘ୫|୫୭|୫      ',
      gdTime: ' (ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୨୮ ମଧ୍ୟେ , ଘ୧୦|୩୯ ରୁ ଘ୧|୩ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୪୭ ରୁ ରାତ୍ରି ଘ୯|୧୧ ମଧ୍ୟେ , ଘ୧୧|୩୫ ରୁ ଘ୨|୪୭ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୨୭ ରୁ ଅପରାହ୍ନ ଘ୫|୩ ପର୍ଯ୍ୟନ୍ତ |',
      bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୧୧ ରୁ ଘ୮|୪୪ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୨|୫୩ ରୁ ଘ୪|୨୬ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୨୧ ରୁ ଘ୧୧|୪୮ ପର୍ଯ୍ୟନ୍ତ |',
    }
  ]

  const eventsForEnglishMonth = [

  ]

  const CUSTOMOdia_DATE = [
    { id: 1, showDate: '୨୩', disable: 'yes', date: '23/02/2025', spclEvent: 'no' },
    { id: 2, showDate: '୨୪', disable: 'yes', date: '24/02/2025', spclEvent: 'no' },
    { id: 3, showDate: '୨୫', disable: 'yes', date: '25/02/2025', spclEvent: 'no' },
    { id: 4, showDate: '୨୬', disable: 'yes', date: '26/02/2025', spclEvent: 'no' },
    { id: 5, showDate: '୨୭', disable: 'yes', date: '27/02/2025', spclEvent: 'no' },
    { id: 6, showDate: '୨୮', disable: 'yes', date: '28/02/2025', spclEvent: 'no' },
    { id: 7, showDate: '୧', disable: 'no', date: '01/03/2025', spclEvent: 'yes' },
    { id: 8, showDate: '୨', disable: 'no', date: '02/03/2025', spclEvent: 'yes' },
    { id: 9, showDate: '୩', disable: 'no', date: '03/03/2025', spclEvent: 'no' },
    { id: 10, showDate: '୪', disable: 'no', date: '04/03/2025', spclEvent: 'no' },
    { id: 11, showDate: '୫', disable: 'no', date: '05/03/2025', spclEvent: 'yes' },
    { id: 12, showDate: '୬', disable: 'no', date: '06/03/2025', spclEvent: 'no' },
    { id: 13, showDate: '୭', disable: 'no', date: '07/03/2025', spclEvent: 'no' },
    { id: 14, showDate: '୮', disable: 'no', date: '08/03/2025', spclEvent: 'no' },
    { id: 15, showDate: '୯', disable: 'no', date: '09/03/2025', spclEvent: 'yes' },
    { id: 16, showDate: '୧୦', disable: 'no', date: '10/03/2025', spclEvent: 'yes' },
    { id: 17, showDate: '୧୧', disable: 'no', date: '11/03/2025', spclEvent: 'yes' },
    { id: 18, showDate: '୧୨', disable: 'no', date: '12/03/2025', spclEvent: 'no' },
    { id: 19, showDate: '୧୩', disable: 'no', date: '13/03/2025', spclEvent: 'yes' },
    { id: 20, showDate: '୧୪', disable: 'no', date: '14/03/2025', spclEvent: 'yes' },
    { id: 21, showDate: '୧୫', disable: 'no', date: '15/03/2025', spclEvent: 'yes' },
    { id: 22, showDate: '୧୬', disable: 'no', date: '16/03/2025', spclEvent: 'yes' },
    { id: 23, showDate: '୧୭', disable: 'no', date: '17/03/2025', spclEvent: 'no' },
    { id: 24, showDate: '୧୮', disable: 'no', date: '18/03/2025', spclEvent: 'yes' },
    { id: 25, showDate: '୧୯', disable: 'no', date: '19/03/2025', spclEvent: 'yes' },
    { id: 26, showDate: '୨୦', disable: 'no', date: '20/03/2025', spclEvent: 'yes' },
    { id: 27, showDate: '୨୧', disable: 'no', date: '21/03/2025', spclEvent: 'yes' },
    { id: 28, showDate: '୨୨', disable: 'no', date: '22/03/2025', spclEvent: 'yes' },
    { id: 29, showDate: '୨୩', disable: 'no', date: '23/03/2025', spclEvent: 'no' },
    { id: 30, showDate: '୨୪', disable: 'no', date: '24/03/2025', spclEvent: 'yes' },
    { id: 31, showDate: '୨୫', disable: 'no', date: '25/03/2025', spclEvent: 'yes' },
    { id: 32, showDate: '୨୬', disable: 'no', date: '26/03/2025', spclEvent: 'yes' },
    { id: 33, showDate: '୨୭', disable: 'no', date: '27/03/2025', spclEvent: 'yes' },
    { id: 34, showDate: '୨୮', disable: 'no', date: '28/03/2025', spclEvent: 'yes' },
    { id: 35, showDate: '୨୯', disable: 'no', date: '29/03/2025', spclEvent: 'yes' },
    { id: 36, showDate: '୩୦', disable: 'no', date: '30/03/2025', spclEvent: 'yes' },
    { id: 37, showDate: '୩୧', disable: 'no', date: '31/03/2025', spclEvent: 'yes' },
    { id: 38, showDate: '୧', disable: 'yes', date: '01/03/2025', spclEvent: 'no' },
    { id: 39, showDate: '୨', disable: 'yes', date: '02/04/2025', spclEvent: 'no' },
    { id: 40, showDate: '୩', disable: 'yes', date: '03/04/2025', spclEvent: 'no' },
    { id: 41, showDate: '୪', disable: 'yes', date: '04/04/2025', spclEvent: 'no' },
    { id: 42, showDate: '୫', disable: 'yes', date: '05/04/2025', spclEvent: 'no' },
  ];

  const CUSTOMEnglish_DATE = [
    { id: 1, showDate: '23', disable: 'yes', date: '23/02/2025', spclEvent: 'no' },
    { id: 2, showDate: '24', disable: 'yes', date: '24/02/2025', spclEvent: 'no' },
    { id: 3, showDate: '25', disable: 'yes', date: '25/02/2025', spclEvent: 'no' },
    { id: 4, showDate: '26', disable: 'yes', date: '26/02/2025', spclEvent: 'no' },
    { id: 5, showDate: '27', disable: 'yes', date: '27/02/2025', spclEvent: 'no' },
    { id: 6, showDate: '28', disable: 'yes', date: '28/02/2025', spclEvent: 'no' },
    { id: 7, showDate: '1', disable: 'no', date: '01/03/2025', spclEvent: 'yes' },
    { id: 8, showDate: '2', disable: 'no', date: '02/03/2025', spclEvent: 'yes' },
    { id: 9, showDate: '3', disable: 'no', date: '03/03/2025', spclEvent: 'no' },
    { id: 10, showDate: '4', disable: 'no', date: '04/03/2025', spclEvent: 'no' },
    { id: 11, showDate: '5', disable: 'no', date: '05/03/2025', spclEvent: 'yes' },
    { id: 12, showDate: '6', disable: 'no', date: '06/03/2025', spclEvent: 'no' },
    { id: 13, showDate: '7', disable: 'no', date: '07/03/2025', spclEvent: 'no' },
    { id: 14, showDate: '8', disable: 'no', date: '08/03/2025', spclEvent: 'no' },
    { id: 15, showDate: '9', disable: 'no', date: '09/03/2025', spclEvent: 'yes' },
    { id: 16, showDate: '10', disable: 'no', date: '10/03/2025', spclEvent: 'yes' },
    { id: 17, showDate: '11', disable: 'no', date: '11/03/2025', spclEvent: 'yes' },
    { id: 18, showDate: '12', disable: 'no', date: '12/03/2025', spclEvent: 'no' },
    { id: 19, showDate: '13', disable: 'no', date: '13/03/2025', spclEvent: 'yes' },
    { id: 20, showDate: '14', disable: 'no', date: '14/03/2025', spclEvent: 'yes' },
    { id: 21, showDate: '15', disable: 'no', date: '15/03/2025', spclEvent: 'yes' },
    { id: 22, showDate: '16', disable: 'no', date: '16/03/2025', spclEvent: 'yes' },
    { id: 23, showDate: '17', disable: 'no', date: '17/03/2025', spclEvent: 'no' },
    { id: 24, showDate: '18', disable: 'no', date: '18/03/2025', spclEvent: 'yes' },
    { id: 25, showDate: '19', disable: 'no', date: '19/03/2025', spclEvent: 'yes' },
    { id: 26, showDate: '20', disable: 'no', date: '20/03/2025', spclEvent: 'yes' },
    { id: 27, showDate: '21', disable: 'no', date: '21/03/2025', spclEvent: 'yes' },
    { id: 28, showDate: '22', disable: 'no', date: '22/03/2025', spclEvent: 'yes' },
    { id: 29, showDate: '23', disable: 'no', date: '23/03/2025', spclEvent: 'no' },
    { id: 30, showDate: '24', disable: 'no', date: '24/03/2025', spclEvent: 'yes' },
    { id: 31, showDate: '25', disable: 'no', date: '25/03/2025', spclEvent: 'yes' },
    { id: 32, showDate: '26', disable: 'no', date: '26/03/2025', spclEvent: 'yes' },
    { id: 33, showDate: '27', disable: 'no', date: '27/03/2025', spclEvent: 'yes' },
    { id: 34, showDate: '28', disable: 'no', date: '28/03/2025', spclEvent: 'yes' },
    { id: 35, showDate: '29', disable: 'no', date: '29/03/2025', spclEvent: 'yes' },
    { id: 36, showDate: '30', disable: 'no', date: '30/03/2025', spclEvent: 'yes' },
    { id: 37, showDate: '31', disable: 'no', date: '31/03/2025', spclEvent: 'yes' },
    { id: 38, showDate: '1', disable: 'yes', date: '01/03/2025', spclEvent: 'no' },
    { id: 39, showDate: '2', disable: 'yes', date: '02/04/2025', spclEvent: 'no' },
    { id: 40, showDate: '3', disable: 'yes', date: '03/04/2025', spclEvent: 'no' },
    { id: 41, showDate: '4', disable: 'yes', date: '04/04/2025', spclEvent: 'no' },
    { id: 42, showDate: '5', disable: 'yes', date: '05/04/2025', spclEvent: 'no' },
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
              <TouchableOpacity onPress={() => navigation.navigate('February2025')}>
                <AntDesign name="caretleft" color={'#000'} size={25} />
              </TouchableOpacity>
              {selectedLanguage === "Odia" &&
                <Text style={{ color: '#000', fontSize: 17, fontWeight: '600' }}>ମାର୍ଚ୍ଚ  ୨୦୨୫</Text>
              }
              {selectedLanguage === "English" &&
                <Text style={{ color: '#000', fontSize: 17, fontWeight: '600' }}>March  2025</Text>
              }
              <TouchableOpacity onPress={() => navigation.replace('April2025')}>
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

export default March2025

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