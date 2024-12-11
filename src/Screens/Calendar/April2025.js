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

const April2025 = (props) => {

    const eventsForOdiaMonth = [
        {
            id: 1,
            date: '01/04/2025',
            day: 'ମଙ୍ଗଳବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରେ ବାଡିନୃସିଂହ ବିଜେ , ଉତ୍କଳ ଦିବସ',
            Image: '',
            tithi: '(୧) ଅପ୍ରେଲ , ମଙ୍ଗଳବାର (ଚୈତ୍ର) ମୀନ ଦି୧୯ନ , ସୱାଲ୍ ତା୨ରିଖ , ସାୟନ ଚୈତ୍ର ଦି୧୧ନ',
            sunrise: 'ଘ୫|୪୪|୧୪',
            sunset: 'ଘ୫|୫୭|୨୦',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୮|୪ ରୁ ଘ୧୦|୨୮ ମଧ୍ୟେ , ଘ୧୨|୫୨ ରୁ ଘ୨|୨୮ ମଧ୍ୟେ , ଘ୩|୧୬ ରୁ ଘ୪|୫୨ ମଧ୍ୟେ , ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୫୭ ରୁ ସନ୍ଧ୍ୟା ଘ୬|୪୬ ମଧ୍ୟେ , ରାତ୍ରି ଘ୯|୧୧ ରୁ ଘ୧୧|୩୫ ମଧ୍ୟେ , ଘ୧|୫୯ ରୁ ଘ୩|୩୫ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୨୧ ରୁ ଘ୨|୫୩ ମଧ୍ୟେ | (ବାରବେଳା) ପ୍ରାତଃ ଘ୭|୧୧ ରୁ ଘ୮|୪୩ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୨୬ ରୁ ଘ୮|୫୩ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 2,
            date: '02/04/2025',
            day: 'ବୁଧବାର',
            name: ' ',
            Image: '',
            tithi: ' (୨) ଅପ୍ରେଲ , ବୁଧବାର (ଚୈତ୍ର) ମୀନ ଦି୨୦ନ , ସୱାଲ୍ ତା୩ରିଖ , ସାୟନ ଚୈତ୍ର ଦି୧୨ନ',
            sunrise: 'ଘ୫|୪୩|୨୨',
            sunset: 'ଘ୫|୫୭|୩୬',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୭ ମଧ୍ୟେ , ଘ୧୨|୩ ରୁ ଘ୧|୩୬ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୪୭ ରୁ ରାତ୍ରି ଘ୯|୧୧ ମଧ୍ୟେ , ଘ୧|୫୯ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୪୩ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୪|୩ ରୁ ଅପରାହ୍ନ ଘ୫|୪୦ ମଧ୍ୟେ , ରାତ୍ରି ଘ୯|୧୯ ରୁ ଘ୧୦|୪୭ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୪୨ ରୁ ଘ୧୦|୧୫ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୪୮  ରୁ ୧|୨୧ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୪୨ ରୁ ଘ୪|୯ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 3,
            date: '03/04/2025',
            day: 'ଗୁରୁବାର',
            name: 'ବାସନ୍ତିକ ମୃଣ୍ମୟୀଦେବୀଙ୍କ ବିଲ୍ଵବରଣ , ପୀଠେ ସପ୍ତମୀ ପୂଜା , ପଞ୍ଚଗ୍ରହକୂଟ ଆରମ୍ଭ',
            Image: '',
            tithi: '(୩) ଅପ୍ରେଲ , ଗୁରୁବାର (ଚୈତ୍ର) ମୀନ ଦି୨୧ନ , ସୱାଲ୍ ତା୪ରିଖ , ସାୟନ ଚୈତ୍ର ଦି୧୩ନ',
            sunrise: 'ଘ୫|୪୨|୩୨',
            sunset: 'ଘ୫|୫୭|୫୨',
            gdTime: '(ଅମୃତ) ରାତ୍ରି ଘ୧|୧୧ ରୁ ଘ୩|୩୫ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୫ ମଧ୍ୟେ , ଘ୧୦|୨୬ ରୁ ଘ୧୨|୫୦ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୨|୫୨ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୫୮ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୪୭ ରୁ ଘ୧|୧୪ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 4,
            date: '04/04/2025',
            day: 'ଶୁକ୍ରବାର',
            name: 'ଗୃହଦେବୀ  ଓ ବାସନ୍ତିକ ମୃଣ୍ମୟୀଦେବୀଙ୍କ ସପ୍ତମ୍ୟାଦି ପୂଜାରମ୍ଭ , ପୀଠେ ମହାଷ୍ଟମୀ ପୂଜା',
            Image: '',
            tithi: '(୪) ଅପ୍ରେଲ , ଶୁକ୍ରବାର (ଚୈତ୍ର) ମୀନ ଦି୨୨ନ , ସୱାଲ୍ ତା୫ରିଖ , ସାୟନ ଚୈତ୍ର ଦି୧୪ନ',
            sunrise: 'ଘ୫|୪୧|୪୦',
            sunset: 'ଘ୫|୫୮|୮',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୪ ମଧ୍ୟେ , ଘ୮|୧ ରୁ ଘ୧୦|୨୫ ମଧ୍ୟେ , ଘ୧୨|୪୯ ରୁ ଘ୨|୨୫ ମଧ୍ୟେ , ଘ୪|୨୨ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୫୮ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୩୬ ରୁ ଘ୯|୧୨ ମଧ୍ୟେ , ଘ୩|୩୬ ରୁ ଘ୪|୨୪ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୧୦|୪୮ ରୁ ଘ୧୧|୩୬ ମଧ୍ୟେ , ଘ୪|୨୬ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୪୧ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୮|୪୧ ରୁ ଘ୧୧|୪୭ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୫୩ ରୁ ଘ୧୦|୨୦ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 5,
            date: '05/04/2025',
            day: 'ଶନିବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରେ ଗର୍ଭୋଦକ ବନ୍ଦାପନା ଓ ଯେଉଡ ଭୋଗ , ବାସନ୍ତିକ ମୃଣ୍ମୟୀ ଦେବୀଙ୍କ ମହାଷ୍ଟମୀ ପୂଜା , ପୀଠେ ନବମୀ ପୂଜା , ସନ୍ଧିପୂଜା , ଅଶୋକାଷ୍ଟମୀ , ଶ୍ରୀଲିଙ୍ଗରାଜ ଦେବଙ୍କ ରୁକୁଣା ରଥଯାତ୍ରା',
            Image: '',
            tithi: '(୫) ଅପ୍ରେଲ , ଶନିବାର (ଚୈତ୍ର) ମୀନ ଦି୨୩ନ , ସୱାଲ୍ ତା୬ରିଖ , ସାୟନ ଚୈତ୍ର ଦି୧୫ନ',
            sunrise: 'ଘ୫|୪୦|୪୯',
            sunset: 'ଘ୫|୫୮|୨୩',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୯|୩୭ ରୁ ଘ୧୨|୪୯ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୨୪ ରୁ ଘ୧୦|୪୮ ମଧ୍ୟେ , ଘ୧୨|୨୪ ରୁ ଘ୨|୦ ମଧ୍ୟେ , ଘ୨|୪୮ ରୁ ଘ୪|୨୪ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ପ୍ରାତଃରୁ ଦିବା ଘ୭|୯ ମଧ୍ୟେ , ଘ୪|୨୫ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୫|୫୮ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧|୨୦ ରୁ ୨|୫୩ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ଅସ୍ତରୁ ରାତ୍ରି ଘ୭|୨୫ ମଧ୍ୟେ , ରାତ୍ରି  ଘ୪|୯ ରୁ ଘ୫|୪୦ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 6,
            date: '06/04/2025',
            day: 'ରବିବାର',
            name: 'ପୀଠ ଦେବୀଙ୍କ ବିଶ୍ରାମ ପୂଜା , ମୃଣ୍ମୟୀ ଦେବୀଙ୍କ ବାସନ୍ତିକ ନବମୀ ପୂଜା , ଶ୍ରୀମନ୍ଦିରରେ ଓ ସର୍ବତ୍ର ଶ୍ରୀରାମ ନବମୀ , ରାମଚରିତମାନସ ଜୟନ୍ତୀ',
            Image: '',
            tithi: '(୬) ଅପ୍ରେଲ , ରବିବାର (ଚୈତ୍ର) ମୀନ ଦି୨୪ନ , ସୱାଲ୍ ତା୭ରିଖ , ସାୟନ ଚୈତ୍ର ଦି୧୬ନ',
            sunrise: 'ଘ୫|୩୯|୫୯',
            sunset: 'ଘ୫|୫୮|୩୯',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୬|୨୫ ରୁ ଘ୯|୩୭ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୩୬ ରୁ ଘ୯|୧୨ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ସୂର୍ଯ୍ୟୋଦୟରୁ ଘ୬|୨୫ ମଧ୍ୟେ , ଦିବା ଘ୧୨|୪୮ ରୁ ଘ୧|୩୬ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୪୮ ରୁ ରାତ୍ରି ଘ୭|୩୬ ମଧ୍ୟେ , ରାତ୍ରି ଘ୧୨|୨୪ ରୁ ଘ୩|୩୬ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୮ ରୁ ଘ୧|୨୧ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୨୦ ରୁ ଘ୨|୫୭ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 7,
            date: '07/04/2025',
            day: 'ସୋମବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ ଯଜ୍ଞରକ୍ଷା , ପୀଠେ ମୃଣ୍ମୟୀ ଦେବୀଙ୍କ ବାସନ୍ତିକ ଦଶହରା',
            Image: '',
            tithi: ' (୭) ଅପ୍ରେଲ , ସୋମବାର (ଚୈତ୍ର) ମୀନ ଦି୨୫ନ , ସୱାଲ୍ ତା୮ରିଖ , ସାୟନ ଚୈତ୍ର ଦି୧୭ନ',
            sunrise: 'ଘ୫|୩୯|୭',
            sunset: 'ଘ୫|୫୮|୫୭',
            gdTime: '(ଅମୃତ) ସୂର୍ଯ୍ୟୋଦୟରୁ ଦିବା ଘ୭|୧୨ ମଧ୍ୟେ , ଘ୧୦|୨୩ ରୁ ଘ୧୨|୪୭ ମଧ୍ୟେ , ରାତ୍ରି ଘ୬|୪୮ ରୁ ଘ୯|୧୨ ମଧ୍ୟେ , ଘ୧୧|୩୬ ରୁ ଘ୨|୪୮ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୧୧ ରୁ ୪|୪୭ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୧୫ ରୁ ଘ୮|୪୭ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୨|୫୩  ରୁ ୪|୨୫ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୨୧ ରୁ ଘ୧୧|୪୯ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 8,
            date: '08/04/2025',
            day: 'ମଙ୍ଗଳବାର',
            name: 'ଶ୍ରମନ୍ଦିରେ ସର୍ବସମ୍ମତ କାମଦା ଏକାଦଶୀ , ଅନନ୍ତ ମହିମା ମେଳା , ଶ୍ରୀମନ୍ଦିରରେ ସୀତା ବିବାହ , ତାରାତାରିଣୀ ଯାତ୍ରା ଶେଷ',
            Image: '',
            tithi: '(୮) ଅପ୍ରେଲ , ମଙ୍ଗଳବାର (ଚୈତ୍ର) ମୀନ ଦି୨୬ନ , ସୱାଲ୍ ତା୯ରିଖ , ସାୟନ ଚୈତ୍ର ଦି୧୮ନ ',
            sunrise: 'ଘ୫|୩୮|୨୯',
            sunset: 'ଘ୫|୫୯|୧୯',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୭|୫୮ ରୁ ଘ୧୦|୧୨ ମଧ୍ୟେ , ଘ୧୨|୪୬ ରୁ ଘ୨|୨୨ ମଧ୍ୟେ , ଦିବା ଘ୩|୧୦ ରୁ ଘ୪|୪୬ ପର୍ଯ୍ୟନ୍ତ , ସୂର୍ଯ୍ୟାସ୍ତରୁ ସନ୍ଧ୍ୟା ଘ୬|୪୮ ମଧ୍ୟେ , ରାତ୍ରି ଘ୯|୧୩ ରୁ ଘ୧୧|୩୭ ମଧ୍ୟେ , ଘ୨|୧ ରୁ ଘ୩|୩୭ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୨୨ ରୁ ଘ୨|୫୩ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୭|୧୫ ରୁ ଘ୮|୪୭ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୨୫ ରୁ ଘ୮|୫୩ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 9,
            date: '09/04/2025',
            day: 'ବୁଧବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ ଶ୍ରୀରାମ ବନବାସ , କନ୍ଦର୍ପ ଅଧିବାସୀ , ସର୍ବ ବୈଷ୍ଣବ ସମ୍ମତ ପକ୍ଷବର୍ଦ୍ଧନୀ ମହାଦ୍ୱାଦଶୀ ଏକାଦଶୀ ଉପବାସ',
            Image: '',
            tithi: '(୯) ଅପ୍ରେଲ , ବୁଧବାର (ଚୈତ୍ର) ମୀନ ଦି୨୭ନ , ସୱାଲ୍ ତା୧୦ରିଖ , ସାୟନ ଚୈତ୍ର ଦି୧୯ନ',
            sunrise: ' ଘ୫|୩୭|୩୦',
            sunset: 'ଘ୫|୫୯|୨୬',
            gdTime: ' (ଅମୃତ) ପ୍ରାତଃରୁ ଘ୭|୧୧ ପର୍ଯ୍ୟନ୍ତ , ଘ୧୧|୫୭ ରୁ ଘ୧|୩୩ ମଧ୍ୟେ , ରାତ୍ରି ଘ୬|୫୦ ରୁ ଘ୯|୧୪ ମଧ୍ୟେ , ଘ୨|୫ ରୁ ନିଶାନ୍ତ ଘ୫|୩୭ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୫୬ ରୁ ୫|୮ ମଧ୍ୟେ , ରାତ୍ରି ଘ୯|୧୩ ରୁ ଘ୧୦|୪୯ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୭|୩୧ ରୁ ଘ୧୦|୭ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୪୬ ରୁ ୧|୨୧ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୩୬ ରୁ ଘ୪|୩୩ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 10,
            date: '10/04/2025',
            day: 'ଗୁରୁବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ ଦୟଣାଚୋରୀ , ଅନଙ୍ଗ ତ୍ରୟୋଦଶୀ',
            Image: '',
            tithi: '(୧୦) ଅପ୍ରେଲ , ଗୁରୁବାର (ଚୈତ୍ର) ମୀନ ଦି୨୮ନ , ସୱାଲ୍ ତା୧୧ରିଖ , ସାୟନ ଚୈତ୍ର ଦି୨୦ନ',
            sunrise: 'ଘ୫|୩୬|୪୦',
            sunset: 'ଘ୫|୫୯|୪୨',
            gdTime: '(ଅମୃତ) ରାତ୍ରି ଘ୧|୧୪ ରୁ ଘ୩|୩୮ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ପ୍ରାତଃରୁ ଦିବା ଘ୭|୧୨ ପର୍ଯ୍ୟନ୍ତ , ଘ୧୦|୨୨ ରୁ ଘ୧୨|୪୬ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: ' (ବାର ଓ କାଳବେଳା) ଦିବା ଘ୨|୫୬ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୬|୦ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୪୬ ରୁ ଘ୧|୯ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 11,
            date: '11/04/2025',
            day: ' ଶୁକ୍ରବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରେ ଦୟଣା ବେଢା , ଶ୍ରୀବିଷ୍ଣୁ ଦମନକ ଯାତ୍ରା , ଶିବ ଦମନକ ଯାତ୍ରା , ମାୟାମୃଗ ପ୍ରସ୍ତାବ , ସୀତାଚୋରୀ , ହିଙ୍ଗୁଳା ଯାତ୍ରା',
            Image: '',
            tithi: ' (୧୧) ଅପ୍ରେଲ , ଶୁକ୍ରବାର (ଚୈତ୍ର) ମୀନ ଦି୨୯ନ , ସୱାଲ୍ ତା୧୨ରିଖ , ସାୟନ ଚୈତ୍ର ଦି୨୧ନ',
            sunrise: ' ଘ୫|୩୫|୫୧',
            sunset: 'ଘ୫|୫୯|୫୯',
            gdTime: '(ଅମୃତ) ପ୍ରାତଃରୁ ଦିବା ଘ୭|୧୦ ମଧ୍ୟେ , ଘ୭|୫୫ ରୁ ଘ୧୦|୧୯ ମଧ୍ୟେ , ଘ୧୨|୪୩ ରୁ ଘ୨|୧୯ ମଧ୍ୟେ , ଘ୩|୫୫ ରୁ ଘ୫|୩୧ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୩୮ ରୁ ଘ୯|୧୪ ମଧ୍ୟେ ,ଘ୩|୩୮ ରୁ ଘ୪|୨୬ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୧୦|୫୦ ରୁ ଘ୧୧|୩୮ ମଧ୍ୟେ , ଘ୪|୨୯ ରୁ ନିଶାନ୍ତ ଘ୫|୩୫ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୮|୨୯ ରୁ ଘ୧୧|୪୩ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୫୫ ରୁ ଘ୧୦|୧ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 12,
            date: '12/04/2025',
            day: 'ଶନିବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ ଲଙ୍କାପୋଡି ପ୍ରସ୍ତାବ , ଚୈତ୍ର ପୂର୍ଣ୍ଣିମା , ଚୈତ୍ର ପର୍ବ , ନାବପୂଜା , ସଙ୍କଟ ତାରିଣୀ ବ୍ରତ',
            Image: '',
            tithi: '(୧୨) ଅପ୍ରେଲ , ଶନିବାର (ଚୈତ୍ର) ମୀନ ଦି୩୦ନ , ସୱାଲ୍ ତା୧୩ରିଖ , ସାୟନ ଚୈତ୍ର ଦି୨୨ନ',
            sunrise: 'ଘ୫|୩୫|୩',
            sunset: 'ଘ୬|୦|୧୫',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୯|୩୨ ରୁ ଘ୧୨|୪୪ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୨୬ ରୁ ଘ୧୦|୫୦ ମଧ୍ୟେ , ଘ୧୨|୨୬ ରୁ ଘ୧|୫୮ ମଧ୍ୟେ , ଘ୨|୪୬ ରୁ ଘ୪|୨୨ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ପ୍ରାତଃରୁ ଦିବା ଘ୬|୫୩ ମଧ୍ୟେ , ଘ୪|୩୧ ରୁ ସୂର୍ଯ୍ୟାସ୍ତ ଘ୬|୦ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧|୨୩ ରୁ ୨|୫୯ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ଅସ୍ତରୁ ରାତ୍ରି ଘ୭|୩୫ ମଧ୍ୟେ , ରାତ୍ରି   ଘ୪|୩ ରୁ ନିଶାନ୍ତ ଘ୫|୩୪ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 13,
            date: '13/04/2025',
            day: 'ରବିବାର',
            name: 'ବର୍ଷାନ୍ତ , ବୈଶାଖ ବ୍ରତାରମ୍ଭ , ମାସାନ୍ତ , ପୂର୍ଣ୍ଣିମା',
            Image: '',
            tithi: '(୧୩) ଅପ୍ରେଲ , ରବିବାର (ଚୈତ୍ର) ମୀନ ଦି୩୧ନ , ସୱାଲ୍ ତା୧୪ରିଖ , ସାୟନ ଚୈତ୍ର ଦି୨୩ନ',
            sunrise: 'ଘ୫|୩୪|୧୫',
            sunset: 'ଘ୬|୦|୩୧',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୬|୨୨ ରୁ ଘ୯|୩୩ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୩୭ ରୁ ଘ୯|୧୩ ପର୍ଯ୍ୟନ୍ତ |(ମାହେନ୍ଦ୍ର) ପ୍ରାତଃରୁ ଘ୬|୨୨ ମଧ୍ୟେ , ଘ୧୨|୪୫ ରୁ ଘ୧|୩୩ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୪୯ ରୁ ରାତ୍ରି ଘ୭|୩୭ ମଧ୍ୟେ , ଘ୧୨|୪୯ ରୁ ଘ୩|୨୫ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୧୦ ରୁ ଘ୧|୨୩ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୫ ରୁ ଘ୨|୩୨ ପର୍ଯ୍ୟନ୍ତ |',
        }
    ]

    const eventsForEnglishMonth = [

    ]

    const CUSTOMOdia_DATE = [
        { id: 1, showDate: '୩୦', disable: 'yes', date: '30/03/2025', spclEvent: 'no' },
        { id: 2, showDate: '୩୧', disable: 'yes', date: '31/03/2025', spclEvent: 'no' },
        { id: 3, showDate: '୧', disable: 'no', date: '01/04/2025', spclEvent: 'yes' },
        { id: 4, showDate: '୨', disable: 'no', date: '02/04/2025', spclEvent: 'no' },
        { id: 5, showDate: '୩', disable: 'no', date: '03/04/2025', spclEvent: 'yes' },
        { id: 6, showDate: '୪', disable: 'no', date: '04/04/2025', spclEvent: 'yes' },
        { id: 7, showDate: '୫', disable: 'no', date: '05/04/2025', spclEvent: 'yes' },
        { id: 8, showDate: '୬', disable: 'no', date: '06/04/2025', spclEvent: 'yes' },
        { id: 9, showDate: '୭', disable: 'no', date: '07/04/2025', spclEvent: 'yes' },
        { id: 10, showDate: '୮', disable: 'no', date: '08/04/2025', spclEvent: 'yes' },
        { id: 11, showDate: '୯', disable: 'no', date: '09/04/2025', spclEvent: 'yes' },
        { id: 12, showDate: '୧୦', disable: 'no', date: '10/04/2025', spclEvent: 'yes' },
        { id: 13, showDate: '୧୧', disable: 'no', date: '11/04/2025', spclEvent: 'yes' },
        { id: 14, showDate: '୧୨', disable: 'no', date: '12/04/2025', spclEvent: 'yes' },
        { id: 15, showDate: '୧୩', disable: 'no', date: '13/04/2025', spclEvent: 'yes' },
        { id: 16, showDate: '୧୪', disable: 'yes', date: '14/04/2025', spclEvent: 'no' },
        { id: 17, showDate: '୧୫', disable: 'yes', date: '15/04/2025', spclEvent: 'no' },
        { id: 18, showDate: '୧୬', disable: 'yes', date: '16/04/2025', spclEvent: 'no' },
        { id: 19, showDate: '୧୭', disable: 'yes', date: '17/04/2025', spclEvent: 'no' },
        { id: 20, showDate: '୧୮', disable: 'yes', date: '18/04/2025', spclEvent: 'no' },
        { id: 21, showDate: '୧୯', disable: 'yes', date: '19/04/2025', spclEvent: 'no' },
        { id: 22, showDate: '୨୦', disable: 'yes', date: '20/04/2025', spclEvent: 'no' },
        { id: 23, showDate: '୨୧', disable: 'yes', date: '21/04/2025', spclEvent: 'no' },
        { id: 24, showDate: '୨୨', disable: 'yes', date: '22/04/2025', spclEvent: 'no' },
        { id: 25, showDate: '୨୩', disable: 'yes', date: '23/04/2025', spclEvent: 'no' },
        { id: 26, showDate: '୨୪', disable: 'yes', date: '24/04/2025', spclEvent: 'no' },
        { id: 27, showDate: '୨୫', disable: 'yes', date: '25/04/2025', spclEvent: 'no' },
        { id: 28, showDate: '୨୬', disable: 'yes', date: '26/04/2025', spclEvent: 'no' },
        { id: 29, showDate: '୨୭', disable: 'yes', date: '27/04/2025', spclEvent: 'no' },
        { id: 30, showDate: '୨୮', disable: 'yes', date: '28/04/2025', spclEvent: 'no' },
        { id: 31, showDate: '୨୯', disable: 'yes', date: '29/04/2025', spclEvent: 'no' },
        { id: 32, showDate: '୩୦', disable: 'yes', date: '30/04/2025', spclEvent: 'no' },
        { id: 33, showDate: '୧', disable: 'yes', date: '31/05/2025', spclEvent: 'no' },
        { id: 34, showDate: '୨', disable: 'yes', date: '01/05/2025', spclEvent: 'no' },
        { id: 35, showDate: '୩', disable: 'yes', date: '02/05/2025', spclEvent: 'no' },
    ];

    const CUSTOMEnglish_DATE = [
        { id: 1, showDate: '30', disable: 'yes', date: '30/03/2025', spclEvent: 'no' },
        { id: 2, showDate: '31', disable: 'yes', date: '31/03/2025', spclEvent: 'no' },
        { id: 3, showDate: '1', disable: 'no', date: '01/04/2025', spclEvent: 'yes' },
        { id: 4, showDate: '2', disable: 'no', date: '02/04/2025', spclEvent: 'no' },
        { id: 5, showDate: '3', disable: 'no', date: '03/04/2025', spclEvent: 'yes' },
        { id: 6, showDate: '4', disable: 'no', date: '04/04/2025', spclEvent: 'yes' },
        { id: 7, showDate: '5', disable: 'no', date: '05/04/2025', spclEvent: 'yes' },
        { id: 8, showDate: '6', disable: 'no', date: '06/04/2025', spclEvent: 'yes' },
        { id: 9, showDate: '7', disable: 'no', date: '07/04/2025', spclEvent: 'yes' },
        { id: 10, showDate: '8', disable: 'no', date: '08/04/2025', spclEvent: 'yes' },
        { id: 11, showDate: '9', disable: 'no', date: '09/04/2025', spclEvent: 'yes' },
        { id: 12, showDate: '10', disable: 'no', date: '10/04/2025', spclEvent: 'yes' },
        { id: 13, showDate: '11', disable: 'no', date: '11/04/2025', spclEvent: 'yes' },
        { id: 14, showDate: '12', disable: 'no', date: '12/04/2025', spclEvent: 'yes' },
        { id: 15, showDate: '13', disable: 'no', date: '13/04/2025', spclEvent: 'yes' },
        { id: 16, showDate: '14', disable: 'yes', date: '14/04/2025', spclEvent: 'no' },
        { id: 17, showDate: '15', disable: 'yes', date: '15/04/2025', spclEvent: 'no' },
        { id: 18, showDate: '16', disable: 'yes', date: '16/04/2025', spclEvent: 'no' },
        { id: 19, showDate: '17', disable: 'yes', date: '17/04/2025', spclEvent: 'no' },
        { id: 20, showDate: '18', disable: 'yes', date: '18/04/2025', spclEvent: 'no' },
        { id: 21, showDate: '19', disable: 'yes', date: '19/04/2025', spclEvent: 'no' },
        { id: 22, showDate: '20', disable: 'yes', date: '20/04/2025', spclEvent: 'no' },
        { id: 23, showDate: '21', disable: 'yes', date: '21/04/2025', spclEvent: 'no' },
        { id: 24, showDate: '22', disable: 'yes', date: '22/04/2025', spclEvent: 'no' },
        { id: 25, showDate: '23', disable: 'yes', date: '23/04/2025', spclEvent: 'no' },
        { id: 26, showDate: '24', disable: 'yes', date: '24/04/2025', spclEvent: 'no' },
        { id: 27, showDate: '25', disable: 'yes', date: '25/04/2025', spclEvent: 'no' },
        { id: 28, showDate: '26', disable: 'yes', date: '26/04/2025', spclEvent: 'no' },
        { id: 29, showDate: '27', disable: 'yes', date: '27/04/2025', spclEvent: 'no' },
        { id: 30, showDate: '28', disable: 'yes', date: '28/04/2025', spclEvent: 'no' },
        { id: 31, showDate: '29', disable: 'yes', date: '29/04/2025', spclEvent: 'no' },
        { id: 32, showDate: '30', disable: 'yes', date: '30/04/2025', spclEvent: 'no' },
        { id: 33, showDate: '1', disable: 'yes', date: '31/05/2025', spclEvent: 'no' },
        { id: 34, showDate: '2', disable: 'yes', date: '01/05/2025', spclEvent: 'no' },
        { id: 35, showDate: '3', disable: 'yes', date: '02/05/2025', spclEvent: 'no' },
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
                            <TouchableOpacity onPress={() => navigation.navigate('March2025')}>
                                <AntDesign name="caretleft" color={'#000'} size={25} />
                            </TouchableOpacity>
                            {selectedLanguage === "Odia" &&
                                <Text style={{ color: '#000', fontSize: 17, fontWeight: '600' }}>ଏପ୍ରିଲ  ୨୦୨୫</Text>
                            }
                            {selectedLanguage === "English" &&
                                <Text style={{ color: '#000', fontSize: 17, fontWeight: '600' }}>April  2025</Text>
                            }
                            <View>
                                <AntDesign name="caretright" color={'#919191'} size={25} />
                            </View>
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

export default April2025

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