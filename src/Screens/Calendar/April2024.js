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

const April2024 = (props) => {

    const eventsForOdiaMonth = [
        {
            id: 1,
            date: '14/04/2024',
            day: 'ରବିବାର',
            name: 'ମହାବିଷୁବ(ପଣା) ସଂକ୍ରାନ୍ତି , ହନୁମାନ ଜୟନ୍ତୀ , ବାସନ୍ତିକ ମୃଣ୍ମୟୀ ଦେବୀଙ୍କର ବିଲ୍ୱବରଣ ଓ ପୀଠ ଦେବୀଙ୍କର ବାସନ୍ତିକ ସପ୍ତମୀ ପୂଜା , ଶ୍ରୀମନ୍ଦିରରେ ଚୈତ୍ର ଗୁଣ୍ଡିଚା ଯାତ୍ରା , ଶ୍ରୀରାଧାରମଣଙ୍କ ଦେବଙ୍କ ଜନ୍ମ',
            spclDesc: 'ଏହି ଯାତ୍ରା ବୈଶାଖ ମହା ବିଷୁବ ସଂକ୍ରାନ୍ତି ଦିନ ଅନୁଷ୍ଠିତ ହୁଏ | ଏହି ଦିନ ସକାଳ ଧୂପ ବଢିବାପରେ ହନୁମନ୍ତ ଆଜ୍ଞାମାଳ ପାଇ ଝୁଲଣ ମଣ୍ଡପ ତଳେ ଥିବା ବିମାନରେ ବିଜେ କରିବେ | ଘଣ୍ଟ , ଛତା , କାହାଳୀ ସହ ପଣ୍ଡା ଶ୍ରୀଅଙ୍ଗରୁ ଆଣିଥିବା ଗୋଟା ଆଜ୍ଞାମାଳ ଚାରିଦ୍ଵାର ମହାବୀର ଓ ବାରଭାଇ ମହାବୀରଙ୍କୁ ଦେବା ଉତ୍ତାରେ ବିମାନ ବଡୁମାନେ ଘଣ୍ଟ , ଛତା , କାହାଳୀ ସହ ବିମାନ ଜଗନ୍ନାଥ ବଲ୍ଲଭ ମଠଠାକୁ ବିଜେ କରିଇବେ ଓ ମହାବୀର ବିମାନରେ ବିଜେହୋଇ ରହିଥିବେ | ସେଠାରୁ ପଣ୍ଡା ଜଗନ୍ନାଥ ବଲ୍ଲଭ ମହାବୀରମାନଙ୍କୁ ଆଜ୍ଞାମାଳ ଦେବା ଉଭାରେ ଘଣ୍ଟା , ଛତା , କାହାଳୀସହ ଦରିଆ ମହାବୀରଙ୍କୁ ଆଜ୍ଞାମାଳ ଦେବା ନିମନ୍ତେ ଯିବେ | ସେଠାରେ ଫେରିଆସି ଜଗନ୍ନାଥ ବଲ୍ଲଭଠାରେ ଭୋଗ ବନ୍ଦାପନା ହୋଇବ | ଏଠାରେ ଭୋଗ ବନ୍ଦାପନା ବଢିବା ଉଭାରେ ବାହୁଡା ବିଜେ ହୋଇ ଆସି ଦକ୍ଷିଣଘର ସିଂହାସନଠାରେ ବିଜେ କରିବେ | ହନୁମାନ ଆଜ୍ଞାମାଳ ପାଇ ଯାଇ ସାରିବାପରେ ଭୋଗ ମଣ୍ଡପ ସରି ମୈଲମ ହୋଇବେ | ମହାସ୍ନାନସାରି ନୂଆ ଲୁଗା ଲାଗି ହେବେ | ଘଟୁଆରି ଘରଠାରୁ ପଣ୍ଡା , ପତି , ମୁଦିରସ୍ତେ ଚନ୍ଦନ ବିଜେ କରାଇ ଆଣି ଚନ୍ଦନ ଲାଗି କରିବେ | ଏହାପରେ ୬ ମୂର୍ତ୍ତି ଅଳଙ୍କାର ମାଳ , ଫୁଲ , କର୍ପୂର ଲାଗି ହୋଇବେ ଓ ବେଶ ବଢିବ | ଏ ଉଭାରେ ପାଣି ପଡି ରୋଷକୁ ଦ୍ଵିପ୍ରହର ଧୂପ ଡାକିଗଲେ , ଭୋଗ ଆସିବାପରେ ମୁଦିରସ୍ତେ ପ୍ରସାଦ ଲାଗି କରିବେ | ଷୋଡଶଉପଚାର ପୂଜାରେ ଭୋଗ ହେବ | ପୂଜା ବଢି ଟେରା ପଡିଲା ଉଭାରେ ଜଣେ ପଣ୍ଡା ଉଠି ପତ୍ରି ଗରାବଡୁ ସହ ରୋଷ ପାଇକ ସଙ୍ଗେ ବଳି ଭାତ ଧାରି ମନ୍ଦିର ଚାରି ପାର୍ଶ୍ଵରେ ଦିଗ ବଳୀ କରିବାପରେ ଭିତରକୁ ଯାଇ ଭୋଗ ମଣୋହି କରାଇବେ | ଏ ଉତ୍ତାରେ ପାଣି ପଡିଲେ ପଣ୍ଡା , ପତି , ମୁଦିରସ୍ତେ ତିନି ବାଡ଼ରେ ବନ୍ଦାପନା କରନ୍ତି | ଏ ଉଭାରେ ଅନ୍ୟାନ୍ୟ ନୀତିମାନ ହୋଇବ |',
            Image: require('../../assets/EventsImages/AprilImages/PanaSankranti_14.04.24.png'),
            tithi: '(୧୪) ଅପ୍ରେଲ , ରବିବାର(ବୈଶାଖ ) ମେଷ ୧ ଦିନ , ସୱାଲ ତାରିଖ ୫ , ସାୟନ ଚୈତ୍ର ଦିନ ୨୫',
            sunrise: 'ଘ୫|୩୩|୧୯',
            sunset: 'ଘ୬|୦|୫୫',
            gdTime: '(ଅମୃତ) ପ୍ରାତଃ ଘ ୬|୨୧ ରୁ ୯|୩୩ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୩୮ ରୁ ୯|୧୪ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ପ୍ରାତଃରୁ ଘ୬|୨୧ ମଧ୍ୟେ , ଘ ୧୨|୪୫ ରୁ ଘ ୧|୩୩ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୫୦ ରୁ ରାତ୍ରି ଘ୭|୩୮ ମଧ୍ୟେ , ଘ୧୨|୨୫ ରୁ ଘ୩|୩୭ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ ୧୦|୬ ରୁ ଘ ୧|୧୯ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ ୧|୬ ରୁ ଘ ୨|୩୩ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 2,
            date: '15/04/2024',
            day: 'ସୋମବାର',
            name: 'ବାସନ୍ତିକ ମୃଣ୍ମୟୀ ଦେବୀଙ୍କ ସପ୍ତମୀ ପୂଜା , ପୀଠ ଦେବୀଙ୍କ ମହାଷ୍ଟମୀ ପୂଜା',
            spclDesc: '',
            Image: require('../../assets/Images/LaxmiPuja.png'),
            tithi: '(୧୫) ଅପ୍ରେଲ , ସୋମବାର(ବୈଶାଖ ) ମେଷ ୨ ଦିନ , ସୱାଲ ତାରିଖ ୬ , ସାୟନ ଚୈତ୍ର ଦିନ ୨୬',
            sunrise: 'ଘ୫|୩୨|୩୨',
            sunset: 'ଘ୬|୧|୨',
            gdTime: '(ଅମୃତ) ପ୍ରାତଃରୁ ଘ ୭|୫ ପର୍ଯ୍ୟନ୍ତ , ଦିବା ଘ୧୦|୧୬ ରୁ ଘ୧୨|୪୦ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୫୧ ରୁ ରାତ୍ରି ଘ୯|୧୫ ମଧ୍ୟେ , ଘ୧୧|୩୯ ରୁ ଘ୨|୫୧ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୪ ରୁ ୪|୪୦ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୬|୪୮ ରୁ ଘ୮|୨୯ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୨|୫୪ ରୁ ଘ୪|୩୦ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୧୯ ରୁ ଘ୧୧|୪୩ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 3,
            date: '16/04/2024',
            day: 'ମଙ୍ଗଳବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରେ ଗର୍ଭୋଦକ ବନ୍ଦାପନା ଓ ଜେଉଡ ଭୋଗ , ବାସନ୍ତିକ ମୃଣ୍ମୟୀ ଦେବୀଙ୍କ ମହାଷ୍ଟମୀ ପୂଜା , ପୀଠେ ନବମୀ ପୂଜା , ସନ୍ଧିପୂଜା , ଅଶୋକାଷ୍ଟମୀ , ଶ୍ରୀଲିଙ୍ଗରାଜ ଦେବଙ୍କ ରୁକୁଣା ରଥଯାତ୍ରା',
            spclDesc: 'ଉପରୋକ୍ତ ନୀତି ଚୈତ୍ର ଶୁକ୍ଳ ପକ୍ଷ ଅଷ୍ଟମୀ ତିଥିରେ ଅନୁଷ୍ଠିତ ହୁଏ | ନିମ୍ନଲିଖିତ ସେବକମାନଙ୍କ ଦ୍ଵାରା ଏହି ନୀତିକାର୍ଯ୍ୟ ସମ୍ପନ୍ନ ହୁଏ – (୧) ମହାଜନେ , (୨) ପାଳିଆ ଖୁଣ୍ଟିଆ , (୩) ବିମାନ ବଡୁ , (୪) ଗରାବଡୁ , (୫)ଭିତରଛ ମହାପାତ୍ର | ଏ ଦିନ ସକାଳ ଧୂପ ବଢିବା ପରେ ଭଣ୍ଡାରରୁ ଲୋକନାଥ ଦେବଙ୍କୁ ମହାଜନେ ହାତରେ ବିଜେ କରାଇ ନେଇ ଝୁଲଣ ମଣ୍ଡପ ତଳେ ଥିବା ପାଲିଙ୍କିରେ ବିଜେ କରାଇବେ | ପରେ ବିମାନ ବଡୁମାନେ ଆସି ପାଲିଙ୍କି ଘେନି ଘଣ୍ଟ , ଛତା , କାହାଳିସହ ଶ୍ରୀ ଈଶାନେଶ୍ଵରଙ୍କ ମନ୍ଦିରଠାକୁ ଘେନି ଯିବେ | ପାଳିଆ ଖୁଣ୍ଟିଆ ଖଣ୍ଡେ ଅମଣିଆ ମାଳ ହାତରେ ଧରି ନେଇଥିବେ | ଗରାବଡୁ ସାଥିରେ ଥିବେ | ପାଲିଙ୍କିରୁ ମହାଜନେ ଲୋକନାଥଙ୍କୁ ଈଶାନେଶ୍ଵରଙ୍କ ମନ୍ଦିର ଭିତରେ ବିଜେ କରାଇବେ ଉଭାରେ ଭିତରଛ ମହାପାତ୍ର ଉକ୍ତ ମାଳା ନେଇ ଈଶାନେଶ୍ଵରଙ୍କୁ ଲାଗି କଲା ଉଭାରେ ସେ ମାଳ ଲୋକନାଥଙ୍କୁ ଦେଇ ହାତରେ ବିଜେ କରାଇ ଆଣି ପାଲିଙ୍କିରେ ବିଜେ କରାଇବେ | ଏହାପରେ ବିମାନଗଡୁ ମାନେ ପାଲିଙ୍କି ଘେନି ସିଂହଦ୍ଵାର ବଡଦାଣ୍ଡ ଦେଇ ଜଗନ୍ନାଥବଲ୍ଲଭ ଠାକୁ ବିଜେ ହୋଇବେ | ଏଠାରେ ଭୋଗ ବନ୍ଦାପନା ହୋଇ ଅଶୋକ ମଣୋହି ହୋଇ ବାହୁଡା ବିଜେ କରି ଭଣ୍ଡାରକୁ ବିଜେ କରିବେ |',
            Image: require('../../assets/EventsImages/AprilImages/Ashokasthami_16.04.24.png'),
            tithi: '(୧୬) ଅପ୍ରେଲ , ମଙ୍ଗଳବାର(ବୈଶାଖ) ମେଷ ୩ ଦିନ , ସୱାଲ ତାରିଖ ୭ , ସାୟନ ଚୈତ୍ର ଦିନ ୨୭',
            sunrise: 'ଘ୫|୩୧|୪୬',
            sunset: 'ଘ୬|୧|୨୮',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୭|୫୭ ରୁ ଘ୧୦|୧୬ ମଧ୍ୟେ ,ଘ୧୨|୪୨ ରୁ ଘ୨|୧୮ମଧ୍ୟେ , ଘ୨|୫୬ ରୁ ଘ୪|୨୮ ମଧ୍ୟେ , ଅସ୍ତରୁ ସନ୍ଧ୍ୟା ଘ୬|୬ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୨୯ ରୁ ଘ୧୦|୫୩ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୨୦ ରୁ ଘ୩|୦ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୬|୫୭ ରୁ ଘ୮|୩୩ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୩୭ ରୁ ଘ୮|୫୪ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 4,
            date: '17/04/2024',
            day: ' ବୁଧବାର',
            name: 'ପୀଠ ଦେବୀଙ୍କ ବିଶ୍ରାମ ପୂଜା , ମୃଣ୍ମୟୀ ଦେବୀଙ୍କ ବାସନ୍ତିକ ନବମୀ ପୂଜା , ଶ୍ରୀମନ୍ଦିରରେ ଓ ସର୍ବତ୍ର ଶ୍ରୀରାମ ନବମୀ , ରାମଚରିତମାନସ ଜୟନ୍ତୀ',
            spclDesc: 'ଏହି ନୀତି ଚୈତ୍ର ଶୁକ୍ଳ ନବମୀ ଦିନ ଅନୁଷ୍ଠିତ ହୁଏ | ଏହି ଦିନ ମଧ୍ୟାହ୍ନ ଧୂପ ଉଠିଲେ ଜୟ ବିଜୟ ଦ୍ଵାର ବନ୍ଦ ହୋଇବ | ସୁଦୁ ସୁଆର ଭଣ୍ଡାର ଆଗରେ ପୋଛା ମାରିବା ପରେ ପଣ୍ଡା ଆସି ପଞ୍ଚୁବର୍ଣ୍ଣ ମୁରୁଜରେ ଜନ୍ମ ମଣ୍ଡଳ କାଟିବେ | ମଧ୍ୟାହ୍ନ ଧୂପ ସାରିବା ପରେ ଉତ୍ତରରେ ଦକ୍ଷିଣ ଘର ଭୋଗ ସାରିବା ପରେ ରମ ଦେବଙ୍କୁ ମହାଜନେ ଭିତର ସିଂହାସନକୁ ବିଜେ କରାଇବେ | ଏଠାରେ ମୁଦିରସ୍ତେ ଧଣ୍ଡି ପ୍ରସାଦ ଲାଗି କରିବ | ଉତ୍ତରେ ପ୍ରସାଦ ଉଲାଗି ହୋଇ ରମ ଦେବଙ୍କୁ ଆଜ୍ଞାମାଳ ଦେବ ଉତ୍ତରେ ମହାଜନେ ବିଜେ କରାଇ ଆଣି ମଣ୍ଡଳ ଉପରେ ବିଜେ କରାଇବେ | ଏଠାରେ ମହାଜନଙ୍କ ଭିତରୁ ୨ ଜଣ ଦଶରଥ , କୌଶଲ୍ୟା ହୋଇଥିବେ | ଖଣ୍ଡୁଆ ଘୋଡାଇ ଜନ୍ମ ବିଧି ହୋଇବ | କର୍ପୂର ଆଳତି ବନ୍ଦାପନା ହୋଇବା ପରେ ମହାସୁଆର ଗଣ୍ଡୁସ ମସଲା , କ୍ଷୀର ମଣୋହି କରାଇବେ | ଏ ଉତ୍ତାରୁ ପଣ୍ଡା ଜନ୍ମ ବିଧିମାନ କରାଇ ପିଇତା ଲାଗି ବଢିବା ପରେ ଶୀତଳ ଭୋଗ ମଣୋହି କରାଇବେ | ମହାସୁଆର ଜୟ ବିଜୟ ଦ୍ଵାରଠାରେ ଚରୁ ଭାତ ମଣୋହି କରାଇବେ | ଏ ଉତ୍ତାରେ ବାହୁଡା ବିଜେ ହୋଇ ଦକ୍ଷିଣ ଘରକୁ ବିଜେ କରିବେ |',
            Image: require('../../assets/EventsImages/AprilImages/RamNavami_17.04.24.png'),
            tithi: '(୧୭) ଅପ୍ରେଲ , ବୁଧବାର(ବୈଶାଖ) ମେଷ ୪ ଦିନ , ସୱାଲ ତାରିଖ ୮ , ସାୟନ ଚୈତ୍ର ଦିନ ୨୮',
            sunrise: 'ଘ୫|୩୧|୧',
            sunset: 'ଘ୬|୧|୪୫',
            gdTime: '(ଅମୃତ) ପ୍ରାତଃରୁ ଦିବା ଘ୭|୨୪ ମଧ୍ୟେ , ଘ୧୨|୧୦ ରୁ ଘ୧|୪୬ ମଧ୍ୟେ , ଅସ୍ତରୁ ସନ୍ଧ୍ୟା ଘ୬|୫୨ ମଧ୍ୟେ , ଘ୯|୧୬ ରୁ ଘ୧୧|୪୦ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୨୭ ରୁ ଘ୧୦|୧୫ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୪୪ ରୁ ଘ୧|୨୧ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୩୨ ରୁ ଘ୩|୫୬ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 5,
            date: '18/04/2024',
            day: 'ଗୁରୁବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ ଯଜ୍ଞରକ୍ଷା , ସୁଦଶାବ୍ରତ , ପୀଠେ ମୃଣ୍ମୟୀ ଦେବୀଙ୍କ ବାସନ୍ତିକ ଦଶହରା',
            spclDesc: 'ଏହି ନୀତି ଚୈତ୍ର ଶୁକ୍ଳ ଦଶମୀ ଦିନ ଅନୁଷ୍ଠିତ ହୁଏ | ଏ ଦିନ ସନ୍ଧ୍ୟା ଧୂପ ବଢିବା ଉତ୍ତରେ ଦକ୍ଷିଣ ଘର ଭୋଗ ସାରିବା ପରେ ମହାଜନେ ରମ ଲକ୍ଷ୍ମଣଙ୍କୁ ହାତରେ ବିଜେ କରାଇ ନେଇ ସିଂହାସନ ଉପରେ ବିଜେ କରାଇବେ | ପଣ୍ଡା ଆସି ଆଜ୍ଞାମାଳ ଦେବା | ଉତ୍ତାରେ ମହାଜନେ ବିଜେ କରାଇ ଆଣି ବଟମୁଳେ ଥିବା ପାଲିଙ୍କିରେ ବିଜେ କରାଇଲେ ବିମାନବଡୁମାନେ ପାଲିଙ୍କି , ଘଣ୍ଟା , ଛତା , କାହାଳିସହ ଜଗନ୍ନାଥ ବଲ୍ଲଭ ମଠକୁ ନେବେ | ଏହି ଦିନ ହରଚଣ୍ଡି ସାହି ଲୋକେ ଯାନି ଯାତ୍ରା ବାହାର କଲା  ଉତ୍ତାରେ ଦିଅଁ ବାହୁଡା ବିଜେ ହୋଇ ଆସି ଦକ୍ଷିଣ ଘରେ ବିଜେ କରନ୍ତି |',
            Image: require('../../assets/EventsImages/AprilImages/SudusaBrata_18.04.24.png'),
            tithi: '(୧୮) ଅପ୍ରେଲ , ଗୁରୁବାର(ବୈଶାଖ) ମେଷ ୫ ଦିନ , ସୱାଲ ତାରିଖ ୯ , ସାୟନ ଚୈତ୍ର ଦିନ ୨୯',
            sunrise: 'ଘ୫|୩୦|୧୬',
            sunset: 'ଘ୬|୨|୨',
            gdTime: '(ଅମୃତ) ରାତ୍ରି ଘ୧|୧୬ ରୁ ଘ୩|୩୦ ମଧ୍ୟେ | (ମାହେନ୍ଦ୍ର) ପ୍ରାତଃରୁ ଘ୭|୩ ମଧ୍ୟେ , ଘ୧୦|୧୪ ରୁ ଘ୧୨|୩୮ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୨|୫୪ ରୁ ଘ୬|୨ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୪୪ ରୁ ଘ୧|୧୨ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 6,
            date: '19/04/2024',
            day: 'ଶୁକ୍ରବାର ',
            name: 'ସର୍ବସମ୍ମତ କାମଦା ଏକାଦଶୀ , ଅନନ୍ତ ମହିମା ମେଳା , ଶ୍ରୀମନ୍ଦିରରେ ସୀତା ବିବାହ ଲୀଳା',
            spclDesc: 'ଏହି ନୀତି ଚୈତ୍ର ଶୁକ୍ଳ ଏକାଦଶୀ ଦିନ ହେବାର ପ୍ରଥା ଅଛି | ଏ ଦିନ ସନ୍ଧ୍ୟା ଆରତିରେ ତିନି ଖଣ୍ଡ ଆଜ୍ଞାମାଳ ଲାଗି ହୋଇଥିବେ | ସନ୍ଧ୍ୟା ଧୂପ ସାରିବା ପରେ ଦକ୍ଷିଣ ଘର ଭୋଗ ସାରିବାପରେ ମହାଜନେ ରାମ ଲକ୍ଷ୍ମଣ ସୀତାଙ୍କୁ ଭିତର ସିଂହାସନକୁ ବିଜେ କରାଇବେ | ପଣ୍ଡା ଆସି ଆଜ୍ଞାମାଳ ଦେବା ସହ ଉତ୍ତାରେ ମହାଜନେ ବିଜେ କରାଇ ଆଣି ବଟମୁଳେ ଥିବା ପାଲିଙ୍କିରେ ବିଜେ କରାଇବେ | ବିମାନବଡୁ ଆସି ଘଣ୍ଟା , ଛତା ,କାହାଳିସହ ଜଗନ୍ନାଥ ବଲ୍ଲଭ ମଠକୁ ବିଜେ କରାଇ ନେଇ ଖଟ ଉପରେ ବିଜେ କରାଇବେ | ଏଠାରେ ହରଚଣ୍ଡି ସାହି ଲୋକେ ଯାନି ଯାତ୍ରା (ପର୍ଶୁରାମ) ବାହାର କରିବା ଉତ୍ତାରେ ଦିଅଁ ବାହୁଡା ବିଜେ ହୋଇ ଦକ୍ଷିଣ ଘରେ ବିଜେ ହେବେ |',
            Image: require('../../assets/EventsImages/AprilImages/SitaBibah_19.04.24.png'),
            tithi: '(୧୯) ଅପ୍ରେଲ , ଶୁକ୍ରବାର(ବୈଶାଖ) ମେଷ ୬ ଦିନ , ସୱାଲ ତାରିଖ ୧୦ , ସାୟନ ଚୈତ୍ର ଦିନ ୩୦',
            sunrise: 'ଘ୫|୨୯|୩୧',
            sunset: 'ଘ୬|୨|୧୯',
            gdTime: '(ଅମୃତ) ପ୍ରାତଃରୁ ଘ୭|୪ ମଧ୍ୟେ , ଘ୭|୫୦ ରୁ ଘ୧୦|୧୪ ମଧ୍ୟେ , ଘ୧୨|୩୮ ରୁ ଘ୨|୧୦ ମଧ୍ୟେ , ଘ୩|୪୬ ରୁ ଘ୫|୨୨ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୪୦ ରୁ ଘ୯|୧୮ ମଧ୍ୟେ , ଘ୩|୨ ରୁ ଘ୪|୩୦ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୧୦|୫୪ ରୁ ଘ୧୧|୪୨ ମଧ୍ୟେ , ଘ୪|୩୦ ରୁ ଘ ୫|୨୯ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୮|୩୧ ରୁ ଘ୧୧|୪୩ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୫୧ ରୁ ଘ୧୦|୧୯ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 7,
            date: '20/04/2024',
            day: 'ଶନିବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ ଶ୍ରୀରାମ ବନବାସ , କନ୍ଦର୍ପ ଅଧିବାସ',
            spclDesc: 'ଏହି ନୀତି ଚୈତ୍ର ଶୁକ୍ଳ ଦ୍ଵାଦଶୀ ଦିନ ହେବାର ନିୟମ | ଏଦିନ ସନ୍ଧ୍ୟା ଧୂପ ବେଶରେ ତିନି ଖଣ୍ଡ ଆଜ୍ଞାମାଳ ଲାଗି ହୋଇଥିବେ | ଧୂପବଢି ଦକ୍ଷିଣ ଘର ଭୋଗ ସରିବା ପରେ ମହାଜନେ ରାମକୃଷ୍ଣ ଓ ସୀତା ଦେବୀଙ୍କୁ ଛାମୁ ଦିହୁଡି ଥାଇ ସିଂହାସନକୁ ବିଜେ କରାଇବା ପରେ ପଣ୍ଡା ଆଜ୍ଞାମାଳ ଦେଲେ ବତାମୂଳେଥିବା ପାଲିଙ୍କିରେ ବିଜେ କରାଇବେ | ବିମାନବଡୁମାନେ ଘଣ୍ଟ , ଛତା , କାହାଳିସହ ପାଲିଙ୍କି ଜଗନ୍ନାଥ ବଲ୍ଲଭ ମଠକୁ ବିଜେ କରାଇବେ | ଏଠାରେ ମାର୍କେଣ୍ଡେଶ୍ଵର ସାହି ଲୋକେ ବନବାସ ପ୍ରସ୍ତାବ କରିବେ (ଅର୍ଥାତ ବନବାସ ଲୀଳା କରିବେ) | ଶୀତଳ ଭୋଗ ମଣୋହି ପରେ ବାହୁଡା ବିଜେ କରିବେ | ଏ ଉତ୍ତାରେ ଭିତରେ ବଡ ସିଂହାର ଓ ଅନ୍ୟାନ୍ୟ ନୀତି ହୋଇବ | ଭିତରେ ଚନ୍ଦନ ଲାଗି ବଢିବା ଉତ୍ତାରେ ଦକ୍ଷିଣ ଘରେ କନ୍ଦର୍ପ ପଟି ଅର୍ଥାତ (ଚିତ୍ରକର ଗୋଟିଏ କନ୍ଦର୍ପ ପଟି ଦେଇଥିବ) ଅଧିବାସ ହୋଇବ | ପଣ୍ଡା ଏହାଙ୍କୁ ମହାସ୍ନାନ କରାନ୍ତି | ଏହାପରେ ଭୋଗ ଓ ବନ୍ଦାପନା ହୁଅନ୍ତି |',
            Image: require('../../assets/EventsImages/AprilImages/Baanwas_20.04.24.png'),
            tithi: '(୨୦) ଅପ୍ରେଲ , ଶନିବାର(ବୈଶାଖ) ମେଷ ୭ ଦିନ , ସୱାଲ ତାରିଖ ୧୧ , ସାୟନ ଚୈତ୍ର ଦିନ ୩୧',
            sunrise: 'ଘ୫|୨୮|୪୭',
            sunset: 'ଘ୬|୨|୩୯',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୯|୨୧ ରୁ ଘ୧୨|୩୩ ମଧ୍ୟେ , ରାତ୍ରି ଘ୮|୨୮ ରୁ ଘ୧୦|୫୨ ମଧ୍ୟେ , ଘ୧୨|୨୮ ରୁ ଘ୨|୪ ମଧ୍ୟେ , ଘ୨|୫୨ ରୁ ଘ୪|୨୮ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ପ୍ରାତଃରୁ ଘ୬|୫୪ ମଧ୍ୟେ , ଅପରାହ୍ନ ଘ୪|୩୦ ରୁ ଘ୬|୩ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୨୧ ରୁ ଘ୧|୩୧ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ଅସ୍ତରୁ ରାତ୍ରି ଘ୭|୩୪ ମଧ୍ୟେ , ରାତ୍ରି ଘ୪|୪୫ ରୁ ନିଶାନ୍ତ ଘ୫|୨୮ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 8,
            date: '21/04/2024',
            day: 'ରବିବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ ଦୟଣା ଚୋରୀ , ଅନଙ୍ଗ ତ୍ରୟୋଦଶୀ',
            spclDesc: 'ଏହି ଯାତ୍ରା ଚୈତ୍ରଶୁକ୍ଳ ତ୍ରୟୋଦଶୀ ଦିନ ହେବାର ବିଧି । ଏ ଦିନ ଦମନକ ଚୋରି ଯୋଗୁଁ ରାମଲୀଳା ଯାତ୍ରା ବନ୍ଦ ହେବ । ମଧ୍ୟାହ୍ନ ଧୂପ ସରିବା ପରେ ଦକ୍ଷିଣ ଘର ଭୋଗ ସରିବା ପରେ ରାମ କୃଷ୍ଣ ଦୁଇ ଦେବ ଭିତର ସିଂହାସନକୁ ବିଜେ କଲେ ଉତ୍ତାରେ ପଣ୍ଡା ଆଜ୍ଞାମାଳ ଦେବେ । ଏ ଉତ୍ତାରେ ମହାଜନେ ରାମକୃଷ୍ଣଙ୍କୁ ନେଇ ଖଟ ଉପରେ ବିଜେ କରାଇବେ ଓ କନ୍ଦର୍ପ ପଟିକୁ ଏହାଙ୍କ ଆଗରେ ବିଜେ କରାଇବେ । ଏଠାରେ ପର୍ବଯାତ୍ରା ଯୋଗାଣିଆ ଦେଇଥିବା ହୋମ ସାମଗ୍ରୀମାନ ପଣ୍ଡା, ପତି, ମୁଦିରସ୍ତେ ଥାଇ ସଙ୍କଳ୍ପ ବାକ୍ୟାନୁଯାୟୀ ହୋମ ହୋଇବ । ଏ ଉତ୍ତାରେ ଦୟାଣମାଳି ଗଛମାନଙ୍କୁ ଉପୁଡାଇ ଜଗନ୍ନାଥ ବଲ୍ଲଭ ମହାବୀରଙ୍କ ପାଖ ଦୟଣା ବଗିଚାରେ ୬ ଗଛ କରି ଲଗାଇବ । ଭୋଗ ସରିବା ପରେ ମହାଜନେ ଠାକୁରଙ୍କ ନିଶବ୍ଦରେ ହାତରେ ବିଜେ କରାଇ ନବେ । ଏଠାରେ ଭିତରଛ ମହାପାତ୍ରେ ରାମକୃଷ୍ଣଙ୍କ ଶ୍ରୀହସ୍ତେ ଦୁଇଗଛ ଦୟାଣ ଲାଗି କରିବେ ବାକି ଚାରି ଗଛ ଦୟାଣ ପତ୍ରି ନୂଆ ତାଡ଼ରେ ଖଣ୍ଡୁଆ ଘୋଡ଼ାଇ ରାମକୃଷ୍ଣଙ୍କ ସଙ୍ଗରେ ପାଲିଙ୍କିଠାକୁ ଆଣିବେ । ଠାକୁରଙ୍କୁ ମହାଜନେ ପାଲିଙ୍କିରେ ବିଜେ କରାଇବା ଉତ୍ତାରେ ବିମାନ ବଡୁମାନେ ଘଣ୍ଟା , ଛତା , କାହାଳି ସହ ସିଂହଦ୍ୱାର ଦେଇ ବଟମୂଳେ ପାଲିଙ୍କି ରଖିବେ । ବାହୁଡ଼ା ବିଜେ ପୂର୍ବରୁ ଭୋଗ ମଣ୍ଡପ ଘର ଧୋ-ପଖାଳ ହୋଇ ଚାନ୍ଦୁଆ ଟଣା ହୋଇ ରହିଥିବ । ଚାନ୍ଦୁଆ ତଳେ ବାଲିବନ୍ଧ ଉପରେ ଦୟାଣ ମରୁଆ ସୁବାସ ଗଛମାନ ଲାଗିଥିବ । ପାଲିଙ୍କିରୁ ମହାଜନେ ହାତରେ ବିଜେ କରାଇ ଆଣି ଗରୁଡ଼ ଦ୍ୱାରଠାରେ ଦୟାଣ, ପତ୍ରି ମାରଫତ୍ ଉକ୍ତ ଶ୍ରୀହସ୍ତ ଗଛ ଶ୍ରୀଅଙ୍ଗରୁ ମୈଲମ କରିଦେବେ । ସେ ତାହାକୁ ନେଇ ତାଡ଼ରେ ରଖିବ । ଏ ଉତ୍ତାରୁ ଭିତରେ ପାଣି ପଡି ବଡ଼ ସିଂହାର ଭୋଗ ସରିବା ଉତ୍ତାରେ  ମଦନମୋହନ ଦେବ ଭିତରକୁ ବିଜେ କଲାପରେ ପଣ୍ଡା ଆସି ଲକ୍ଷ୍ମୀ , ସରସ୍ୱତୀ ଓ ମଦନମୋହନକୁ ଆଜ୍ଞାମାଳ ଦେବା ଉତ୍ତାରେ ମହାଜନେ ହାତରେ ବିଜେ କରାଇଆଣି ଅଧିବାସ ଭୋଗମଣ୍ଡପ ଘରେ ଖଟ ଶେଯ ମେକାପ କରାଇଥିବା ଶେଯ ଉପରେ ବିଜେ କରାଇବେ । ଏ ଉତ୍ତାରେ ଉକ୍ତ ଦୟାଣ ଗଛଗୁଡିକୁ ତଡ଼ାଉ ପଟ ଗୁଡ଼ାଇ ରଖିଥିବେ । ଦିଅଁ ବିଜେକଲା ଉତ୍ତାରୁ ମହାଜନେ ଲକ୍ଷ୍ମୀ, ସରସ୍ୱତୀ ଓ ମଦନମୋହନଙ୍କ ହାତରେ ତିନିଗଛ ବାନ୍ଧି ଦେବେ । ଏହାଙ୍କ ଆଗରେ ପର୍ବଯାତ୍ରା ଯୋଗଣିଆ ଦେଇଥିବା ତିନିଗୋଟି ଚାଙ୍ଗୁଡିରେ ତିନିଗୋଟି ଗଛକୁ ରଖିବେ | ପଣ୍ଡା ଆସି ଚେମେଡି ପତନି ଫୁଲ ଚନ୍ଦନ ଦେଇ ମଣ୍ଡଳ ଉପରେ ତିନିଟି ଚାଙ୍ଗୁଡିକୁ ରଖିବେ । ଏହାପରେ ଆସ୍ଥାନ ପଢିଆରି ପାଣି ପକାଇ ଏଠାରେ ଶୀତଳ ଭୋଗ ବାଢିଲେ ପଞ୍ଚୋଉପଚାରରେ ମଣୋହି ହେବ । ଭୋଗ ମଣ୍ଡପ ଘର ଦ୍ୱାରମାନଙ୍କୁ ବନ୍ଦ କରି ତଡାଉ ମୁଦ ଦେବେ । ଲେଙ୍କା ପାଇକ ଦ୍ୱାରମାନ ଯଗି ରହିବ । ଏ ଉତ୍ତାରେ  ଭିତରେ ପାଣିପଡି ବଲ୍ଲଭ ବଡ଼ସିଂହାର ଭୋଗ, ଘଣ୍ଟା , ଛତା , କାହାଳିସହ ତଳୁଛ ପଟୁଆର ହୋଇ ଛାମୁକୁ ଆସିବ । ପଣ୍ଡା ଆସି ଏ ଭୋଗ ପଞ୍ଚ ଉପଚାର ପୂଜାରେ ମଣୋହି କରାଇବେ | ଏ ଉତ୍ତାରେ ପହୁଡ଼ ଆଳତି ହୋଇବ ।',
            Image: require('../../assets/EventsImages/AprilImages/Dayanachori_21.04.24.png'),
            tithi: '(୨୧) ଅପ୍ରେଲ , ରବିବାର(ବୈଶାଖ) ମେଷ ୮ ଦିନ , ସୱାଲ ତାରିଖ ୧୨ , ସାୟନ ବୈଶାଖ ଦିନ ୧',
            sunrise: 'ଘ୫|୨୮|୧',
            sunset: 'ଘ୬|୨|୫୭',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୬|୧୨ ରୁ ଘ୯|୨୪ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୪୧ ରୁ ଘ୯|୧୭ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ପ୍ରାତଃରୁ ଦିବା ଘ୬|୧୩ ମଧ୍ୟେ , ଘ୧୨|୩୬ ରୁ ଘ୧|୨୪ ମଧ୍ୟେ , ରାତ୍ରି ଘ୬|୫୩ ରୁ ଘ୭|୪୧ ମଧ୍ୟେ , ଘ୧୨|୨୯ ରୁ ଘ୩|୪୧ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୫ ରୁ ଘ୧|୨୨ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୬ ରୁ ଘ୨|୨୭ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 9,
            date: '22/04/2024',
            day: ' ସୋମବାର',
            name: 'ଶ୍ରୀବିଷ୍ଣୁ ଦମନକ ଓ ଶିବ ଦମନକ ଯାତ୍ରା , ଦୟଣା ବେଢା , ମାୟାମୃଗ ପ୍ରସ୍ତାବ , ସୀତାଚୋରୀ , ହିଙ୍ଗୁଳା ଯାତ୍ରା',
            spclDesc: 'ଏହି ପର୍ବ ଚୈତ୍ରଶୁକ୍ଳ ଚତୁର୍ଦ୍ଦଶୀ ଦିନ ଅନୁଷ୍ଠିତ ହୁଏ । ଏ ଦିନ ସକାଳ ଧୂପ ସରିବା ପରେ ମହାସ୍ନାନ ବଢିବା ଉତ୍ତାରେ ପଣ୍ଡା, ପତି, ମୁଦିରସ୍ତେ ଘଟୁଆରି ଘରଠାରୁ ତିନିଗୋଟା ରୂପା ପିଙ୍ଗଣରେ ଚନ୍ଦନ, ଘଣ୍ଟ , ଛତା , କାହାଳିସହ ସିଂହାସନକୁ ବିଜେ କରାଇ ଆଣି ସିଂହାସନ ଉପରକୁ ଉଠି ସର୍ବାଙ୍ଗଲାଗି କରାଇବେ । ନୂଆ ଲୁଗା ଲାଗି ହୋଇବ । ଏ ଉତ୍ତାରେ ବେଶ ହୋଇବେ ଓ ୬ମୂର୍ତ୍ତି ଅଳଙ୍କାର ଲାଗି ହୋଇବେ । ଗତ ଦିନ ଅଧିବାସ ହୋଇଥିବା ଭୋଗ ମଣ୍ଡପ ଘରଠାକୁ ପଣ୍ଡା, ପତି, ମୁଦିରସ୍ତେ ଯିବେ । ତିନିବାଡ଼ ପାଳିଆ ପୁଷ୍ପାଳକ ତିନିବାଡ଼ ଚାଙ୍ଗୁଡିକୁ ଧରିବେ । ମହାଜନମାନେ ଲକ୍ଷ୍ମୀ, ସରସ୍ୱତୀ ଓ ମଦନମୋହନଙ୍କୁ ହାତରେ ବିଜେ କରାଇ ଘଣ୍ଟ , ଛତା , କାହାଳିସହ ତଳୁଛ ପଟୁଆର ହୋଇ ବଡ଼ ଦେଉଳକୁ ତିନିଘେରା ବୁଲି ଭିତର ସିଂହାସନରେ ବିଜେ କରାଇବେ । ଏ ଉତ୍ତାରେ ଚାଙ୍ଗୁଡିରେ ଦୟାଣ ଗଛମାନ ଓ ଶ୍ରୀଅଙ୍ଗରେ ଲାଗି ହୋଇଥିବା ଦୟଣା ଗଛମାନ ମୈଲମ କରାଇ ଶ୍ରୀଜଗନ୍ନାଥ ବଡ଼ଠାକୁର ଓ ସୁଭଦ୍ରାଙ୍କୁ ଉକ୍ତ ୬ ଗଛ ଲାଗି କରାଇବେ । ଏ ଉତ୍ତାରେ ଭିତରେ ପାଣିପଡି ଧୋ-ପଖାଳ ହୋଇ ମଧ୍ୟାହ୍ନ ଧୂପ ରୋଷରୁ ଘଣ୍ଟ , ଛତା , କାହାଳିସହ ତଳିଛ ପଟୁଆରରେ ଛାମୁକୁ ଆଣିବ । ମୁଦିରସ୍ତ ପ୍ରସାଦଲାଗି କଲାପରେ ତିନିଜଣ ପଣ୍ଡା ଷୋଡ଼ଶପଚାରରେ ଭୋଗ କରିବା । ଏ ଉତ୍ତାରେ ଭିତରେ ପାଣି ପଡିବା ପରେ ବନ୍ଦାପନା ବଢିବ ଓ ଚାଙ୍ଗଡ଼ା ମେକାପଠାରୁ ଶ୍ରୀକପଡ଼ା ଏକ ମୂର୍ତ୍ତି ଭଣ୍ଡାର ମେକାପ ନେଇ ସିଂହାସନ ତଳେ ତଡ଼ାଉ ଦେଉଳ କରଣ ଥାଇ ଉକ୍ତ ଦୟାଣଗଛମାନ ମୈଲମ କରି ମୁଦକରି ରାଜା ସୁପରିଟେଣ୍ଡଙ୍କ ନଅରକୁ ପଠାଇବେ | ମଦନମୋହନ ଦକ୍ଷିଣ ଘରକୁ ବିଜେ କଲା ପରେ ଭୋଗ ମଣ୍ଡପ ସରିବ | ସନ୍ଧ୍ୟା ଧୂପ ସରିବାପରେ ରାମ ଲକ୍ଷ୍ମଣ ଦେବ ଆଜ୍ଞାମାଳ ପାଇଁ ବଟମୂଳେ ଥିବା ପାଲିଙ୍କିରେ ଜଗନ୍ନାଥ ବଲ୍ଲଭକୁ ପୂର୍ବ ଦିନପରି ବିଜେ କରିବେ । ଏ ଦିନ କୁଣ୍ଡେଇବେ ସାହି ଲୋକେ ମାୟାମୃଗ ପ୍ରସ୍ତାବ କରିବେ । ମାୟା ମୃଗ ଲୀଳା ବଢିବା ପରେ ବାହୁଡ଼ା ବିଜେ ହେବେ ଓ ମନ୍ଦିରର ଅନ୍ୟାନ୍ୟ ନୀତି ହେବ ।',
            Image: require('../../assets/Images/KhajaBhoga.png'),
            tithi: '(୨୨) ଅପ୍ରେଲ , ସୋମବାର(ବୈଶାଖ) ମେଷ ୯ ଦିନ , ସୱାଲ ତାରିଖ ୧୩ , ସାୟନ ବୈଶାଖ ଦିନ ୨',
            sunrise: 'ଘ୫|୨୭|୨୦',
            sunset: 'ଘ୬|୩|୧୪',
            gdTime: '(ଅମୃତ) ପ୍ରାତଃରୁ ଦିବା ଘ୭|୧ ମଧ୍ୟେ ,ଘ୧୦|୧୨ ରୁ ଘ୧୨|୩୬ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୫୩ ରୁ ରାତ୍ରି ଘ୯|୧୭ ମଧ୍ୟେ , ଘ୧୧|୪୧ ରୁ ଘ୨|୫୩ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୬|୪୯ ରୁ ଘ୯|୧ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୩|୦ ରୁ ଘ୪|୪୮ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୧୧ ରୁ ଘ୧୧|୪୪ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 10,
            date: '23/04/2024',
            day: 'ମଙ୍ଗଳବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ ଲଙ୍କାପୋଡି ପ୍ରସ୍ତାବ , ଚୈତ୍ର ପୂର୍ଣ୍ଣିମା , ଚୈତ୍ର ପର୍ବ , ନାବପୂଜା , ସଙ୍କଟ ତାରିଣୀ ବ୍ରତ , ମଙ୍ଗଳ ପୂର୍ଣ୍ଣିମା ବ୍ରତ , ତାରାତାରିଣୀ ଯାତ୍ରା ଶେଷ , ମୁକୁନ୍ଦବାବାଙ୍କ ଜନ୍ମ ଉତ୍ସବ',
            spclDesc: 'ଏହି ନୀତି ଚୈତ୍ର ପୂର୍ଣ୍ଣିମାାରେ ଅନୁଷ୍ଠିତ ହୁଏ । ବିମାନବଢୁ, ମହାଜନେ, ଘଣ୍ଟାର , ଛତାର , କାହାଳିଆ ଓ ଦୋଳମଣ୍ଡପ ସାହି ଲୋକଙ୍କ ଦ୍ୱାରା ଏହି ନୀତି କାର୍ଯ୍ୟ ସମ୍ପନ୍ନ ହୁଏ । ଏ ଦିନ ସନ୍ଧ୍ୟା ଧୂପ ସରିବା ପରେ ରାମ ଲକ୍ଷ୍ମଣ ଦୁଇମୂର୍ତ୍ତି ଭିତରୁ ଆଜ୍ଞାମାଳ ପାଇ ବଟମୂଳେ ଥିବା ପାଲିଙ୍କିରେ ବିଜେ କରିବେ । ବିମାନ ବଢୁମାନେ ଆସି ପାଲିଙ୍କି ଜଗନ୍ନାଥ ବଲ୍ଲଭ ମଠକୁ ବିଜେ କରାଇବେ । ଏହି ବିଜେ ସମୟରେ ଘଣ୍ଟାର ଓ କାହାଳିଆ ଘଣ୍ଟା ଓ କାହାଳି ବଜାଇବେ । ଛତାର ଛତା ଧରିବେ । ପାଲିଙ୍କି ଜଗନ୍ନାଥ ବଲ୍ଲଭ ମଠରେ ପହୁଞ୍ଚିଲାପରେ ଦୋଳମଣ୍ଡପ ସାହିର ଲୋକେ ଲଙ୍କାପୋଡି ପ୍ରସ୍ତାବ କରିବେ । ଏହାପରେ ଦିଅଁ ପାଲିଙ୍କିରେ ବାହୁଡ଼ା ବିଜେ କରି ଦକ୍ଷିଣ ଘରକୁ ବିଜେ କରିବେ । ଏହାପରେ ଭିତରେ ଅନ୍ୟାନ ନୀତି ହେବ ।',
            Image: require('../../assets/EventsImages/AprilImages/ChaitraPurnima_23.04.24.png'),
            tithi: '(୨୩) ଅପ୍ରେଲ , ମଙ୍ଗଳବାର(ବୈଶାଖ) ମେଷ ୧୦ ଦିନ ,ସୱାଲ ତାରିଖ ୧୪ ,ସାୟନ ବୈଶାଖ ଦିନ ୩',
            sunrise: 'ଘ୫|୨୬|୩୮',
            sunset: 'ଘ୬|୩|୩୨',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୭|୪୭ ରୁ ଘ୧୦|୧୧ ମଧ୍ୟେ ,ଘ୧୨|୩୫ ରୁ ଘ୨|୧୧ ମଧ୍ୟେ , ଘ୨|୫୯ ରୁ ଘ୪|୩୫ ମଧ୍ୟେ , ଅସ୍ତରୁ ରାତ୍ରି ଘ୬|୫୩ ମଧ୍ୟେ , ଘ୯|୧୭ ରୁ ଘ୧୧|୪୧ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୨୨ ରୁ ଘ୪|୧ ମଧ୍ୟେ | (ବାରବେଳା) ପ୍ରାତଃ ଘ୬|୫୦ ରୁ ଘ୮|୨୮ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୪୦ ରୁ ଘ୯|୧ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 11,
            date: '24/04/2024',
            day: 'ବୁଧବାର',
            name: 'ଶ୍ରୀ ମନ୍ଦିରରେ ସେତୁବନ୍ଧ ପ୍ରସ୍ତାବ , ବୈଶାଖ ବ୍ରତାରମ୍ଭ',
            spclDesc: 'ଏହି ନୀତି ଚୈତ୍ରପୂର୍ଣ୍ଣିମାର ବୈଶାଖ କୃଷ୍ଣପକ୍ଷ ପ୍ରତିପଦା ତିଥିରେ ଅନୁଷ୍ଠିତ ହୁଏ । ଏ ଦିନ ସନ୍ଧ୍ୟା ଧୂପ ସରିବା ପରେ ରାମ ଲକ୍ଷ୍ମଣ ଦୁଇ ମୂର୍ତ୍ତି ଭିତରୁ ଆଜ୍ଞାମାଳ ପାଇ ବଟମୂଳେ ଥିବା ପାଲିଙ୍କିରେ ବିଜେ ହୋଇ ଜଗନ୍ନାଥ ବଲ୍ଲଭ ମଠକୁ ଯିବେ । ଏଠାରେ ବାଲିସାହି ଲୋକେ ସେତୁବନ୍ଧ ପ୍ରସ୍ତାବ କରିବେ । ଏହାପରେ ଦିଅଁ ପାଲିଙ୍କିରେ ବାହୁଡ଼ା ବିଜେକରି ଦକ୍ଷିଣ ଘରକୁ ଯିବେ । ',
            Image: require('../../assets/EventsImages/AprilImages/SetuBandhaPrastab_24.04.24.png'),
            tithi: '(୨୪) ଅପ୍ରେଲ , ବୁଧବାର(ବୈଶାଖ) ମେଷ ୧୧ ଦିନ , ସୱାଲ ତାରିଖ ୧୫ , ସାୟନ ବୈଶାଖ ଦିନ ୪',
            sunrise: 'ଘ୫|୨୫|୫୭',
            sunset: 'ଘ୬|୩|୫୧',
            gdTime: '(ଅମୃତ) ପ୍ରାତଃରୁ ଦିବା ଘ୬|୫୯ ମଧ୍ୟେ, ଘ୧୧|୪୬ ରୁ ଘ ୧|୨୨ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୫୪ ରୁ ଘ୯|୧୮ମଧ୍ୟେ , ରାତ୍ରି ଘ୨|୭ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୨୫ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୩|୪୬ ରୁ ଘ୫|୨୨ ମଧ୍ୟେ , ରାତ୍ରି ଘ୯|୧୮ ରୁ ଘ୧୦|୫୪ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୮|୩୦ ରୁ ଘ୧୦|୬ ମଧ୍ୟେ | (ବାରବେଳା) ଦିବା ଘ୧୧|୪୩ ରୁ ଘ୧|୧୯ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୨|୩୦ ରୁ ଘ୩|୫୩ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 12,
            date: '25/04/2024',
            day: 'ଗୁରୁବାର',
            name: '',
            spclDesc: '',
            Image: require('../../assets/Images/Konark.png'),
            tithi: '(୨୫) ଅପ୍ରେଲ , ଗୁରୁବାର(ବୈଶାଖ) ମେଷ ୧୨ ଦିନ , ସୱାଲ ତାରିଖ ୧୬ , ସାୟନ ବୈଶାଖ ଦିନ ୫',
            sunrise: 'ଘ୫|୨୫|୧୬',
            sunset: 'ଘ୬|୪|୧୦',
            gdTime: '(ଅମୃତ) ରାତ୍ରି ଘ୧୦|୧୮ ରୁ ଘ୩|୪୨ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ପ୍ରାତଃରୁ ଦିବା ଘ୬|୫୯ ମଧ୍ୟେ , ଘ୧୦|୧୦ ରୁ ଘ୧୨|୩୪ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୨|୫୬ ରୁ ଘ୬|୪ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୧|୪୩ ରୁ ଘ୧|୬ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 13,
            date: '26/04/2024',
            day: 'ଶୁକ୍ରବାର',
            name: 'ଶ୍ରୀମନ୍ଦିରରେ ରାବଣ ବଧ ପ୍ରସ୍ତାବ',
            spclDesc: 'ଏହି ନୀତି ବୈଶାଖ କୃଷ୍ଣପକ୍ଷ ଦ୍ଵିତୀୟା ତିଥିରେ ହୁଏ । ଏ ଦିନ ସନ୍ଧ୍ୟା ଧୂପ ପୂଜା ବସିଥିବା ସମୟରେ ବାଲିସାହିରୁ ରାବଣ (ଜଣେ ଲୋକ ରାବଣ ବେଶ ହୋଇଥିବ) ଆସି ଜଗମୋହନ କାଠ ପାଖରେ ଠିଆ ହେବ ଓ ସିଂହାସନ ଛୁଆଁ ଆଜ୍ଞାମାଳ ପାଇ ସାହି ବୁଲିବା ନିମନ୍ତେ ଯିବେ । ସନ୍ଧ୍ୟା ଧୂପ ବଢିଲା ପରେ ରାମ ଲକ୍ଷ୍ମଣ ଦୁଇ ମୂର୍ତ୍ତି ଭିତର ସିଂହାସନକୁ ବିଜେ କରିବେ । ଆଜ୍ଞାମାଳ ପାଇଁ ବଟମୂଳେ ଥିବା ପାଲିଙ୍କିରେ ବିଜେ ହୋଇ ଜଗନ୍ନାଥ ବଲ୍ଲଭ ମଠକୁ ଯିବେ । ଏଠାରେ ବାଲିସାହି ଲୋକେ ରାବଣ ବଧ ପ୍ରସ୍ତାବ କରିବା ପରେ ବାହୁଡ଼ା ବିଜେ ହୋଇ ଦିଅଁ ଦକ୍ଷିଣ ଘରକୁ ବିଜେ କରିବେ ।',
            Image: require('../../assets/EventsImages/AprilImages/RavanaBaddhaPrastav_26.04.24.png'),
            tithi: '(୨୬) ଅପ୍ରେଲ ,ଶୁକ୍ରବାର(ବୈଶାଖ) ମେଷ ୧୩ ଦିନ ,ସୱାଲ ତାରିଖ ୧୭ ,ସାୟନ ବୈଶାଖ ଦିନ ୬',
            sunrise: 'ଘ୫|୨୪|୩୫',
            sunset: 'ଘ୬|୪|୨୯',
            gdTime: '(ଅମୃତ) ପ୍ରାତଃରୁ ଦିବା ଘ୬|୫୮ ମଧ୍ୟେ , ଘ୭|୪୫ ରୁ ଘ ୧୦|୯ ମଧ୍ୟେ , ଘ୧୨|୩୩ ରୁ ଘ୨|୯ ମଧ୍ୟେ , ଘ୩|୪୫ ରୁ ଘ୫|୨୧ ମଧ୍ୟେ , ରାତ୍ରି ଘ୭|୪୨ ରୁ ଘ୯|୧୮ ମଧ୍ୟେ , ଘ୩|୩୨ ରୁ ଘ୪|୨୦ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ରାତ୍ରି ଘ୧୦|୫୪ ରୁ ଘ୧୨|୩୨ ମଧ୍ୟେ , ଘ୪|୨୧ ରୁ ରାତ୍ରିଶେଷ ଘ୫|୨୪ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୮|୩୦ ରୁ ଘ୧୧|୪୫ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୮|୫୬ ରୁ ଘ୧୦|୧୯ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 14,
            date: '27/04/2024',
            day: 'ଶନିବାର',
            name: '',
            spclDesc: '',
            Image: require('../../assets/Images/Mahaprasad.png'),
            tithi: '(୨୭) ଅପ୍ରେଲ ,ଶନିବାର(ବୈଶାଖ) ମେଷ ୧୪ ଦିନ ,ସୱାଲ ତାରିଖ ୧୮,ସାୟନ ବୈଶାଖ ଦିନ ୨୭',
            sunrise: 'ଘ୫|୨୩|୫୫',
            sunset: 'ଘ୬|୪|୪୯',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୯|୨୧ ରୁ ଘ୧୨|୩୩ ମଧ୍ୟେ ,ରାତ୍ରି ଘ୭|୩୦ ରୁ ଘ୯|୫୪ ମଧ୍ୟେ , ଘ୧୧|୩୦ ରୁ ଘ୧|୬ ମଧ୍ୟେ , ଘ୧|୫୪ ରୁ ଘ୩|୩୦ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ପ୍ରାତଃରୁ ଘ୬|୫୩ ମଧ୍ୟେ , ଘ୪|୨୯ ରୁ ସୂର୍ଯାସ୍ତ ଘ୬|୫ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୧|୧୯ ରୁ ଘ୨|୫୬ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ଅସ୍ତରୁ ରାତ୍ରି ଘ୭|୩୩ ମଧ୍ୟେ , ଘ୩ |୧୫ରୁ ନିଶାନ୍ତ ଘ୫|୨୩ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 15,
            date: '28/04/2024',
            day: 'ରବିବାର',
            name: '',
            spclDesc: '',
            Image: require('../../assets/Images/PuriBeach.png'),
            tithi: '(୨୮) ଅପ୍ରେଲ , ରବିବାର(ବୈଶାଖ) ମେଷ ୧୫ ଦିନ , ସୱାଲ ତାରିଖ ୧୯ , ସାୟନ ବୈଶାଖ ଦିନ ୮',
            sunrise: 'ଘ୫|୨୩|୧୬',
            sunset: 'ଘ୬|୫|୧୦',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୬|୮ ରୁ ଘ୯|୨୦ ମଧ୍ୟେ ,ରାତ୍ରି ଘ୭|୪୩ ରୁ ଘ୯|୧୯ ମଧ୍ୟେ | (ମାହେନ୍ଦ୍ର) ପ୍ରାତଃରୁ ଘ୬|୯ ମଧ୍ୟେ , ଘ୧୨|୩୨ ରୁ ଘ୧|୨୦ ମଧ୍ୟେ , ସନ୍ଧ୍ୟା ଘ୬|୫୫ ରୁ ଘ ୭|୪୩ ମଧ୍ୟେ , ଘ୧୨|୩୧ ରୁ ଘ୩|୪୩ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(ବାର ଓ କାଳବେଳା) ଦିବା ଘ୧୦|୦୭ ରୁ ଘ୧|୧୯ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧|୧୨ ରୁ ଘ୨|୨୯ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 16,
            date: '29/04/2024',
            day: 'ସୋମବାର',
            name: '',
            spclDesc: '',
            Image: require('../../assets/Images/PuriTemple.png'),
            tithi: '(୨୯) ଅପ୍ରେଲ , ସୋମବାର(ବୈଶାଖ) ମେଷ ୧୬ ଦିନ , ସୱାଲ ତାରିଖ ୨୦, ସାୟନ ବୈଶାଖ ଦିନ ୯',
            sunrise: 'ଘ୫|୨୨|୩୯',
            sunset: 'ଘ୬|୫|୨୯',
            gdTime: '(ଅମୃତ) ପ୍ରାତଃରୁ ଦିବା ଘ୬|୫୭ ମଧ୍ୟେ ,ଘ୧୦|୮ ରୁ ଘ୧୨|୩୨ମଧ୍ୟେ , ରାତ୍ରି ଘ୬|୫୫ ରୁ ଘ୯|୧୯ ମଧ୍ୟେ , ଘ୧୧|୪୩ ରୁ ଘ ୨|୫୫ ପର୍ଯ୍ୟନ୍ତ | (ମାହେନ୍ଦ୍ର) ଦିବା ଘ୨|୫୬ ରୁ ଘ୪|୩୨ ମଧ୍ୟେ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୨୦ ରୁ ଘ୩|୦ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୩|୨ ରୁ ଘ୪|୪୨ ପର୍ଯ୍ୟନ୍ତ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୧୦|୨୩ ରୁ ଘ୧୧|୪୬ ପର୍ଯ୍ୟନ୍ତ |',
        },
        {
            id: 17,
            date: '30/04/2024',
            day: 'ମଙ୍ଗଳବାର',
            name: 'ଶରଣ ଆରମ୍ଭ',
            spclDesc: '',
            Image: require('../../assets/Images/Konark.png'),
            tithi: '(୩୦) ଅପ୍ରେଲ ,ମଙ୍ଗଳବାର(ବୈଶାଖ) ମେଷ ୧୭ ଦିନ ,ସୱାଲ ତାରିଖ ୨୧,ସାୟନ ବୈଶାଖ ଦିନ ୧୦',
            sunrise: 'ଘ୫|୨୨|୪',
            sunset: 'ଘ୬|୫|୪୮',
            gdTime: '(ଅମୃତ) ଦିବା ଘ୭|୪୩ ରୁ ଘ୧୦|୭ ମଧ୍ୟେ ,ଘ୧୨|୩୧ ରୁ ଘ୨|୭ ମଧ୍ୟେ , ଘ୨|୫୫ ରୁ ଘ୪|୩୫ ମଧ୍ୟେ , ଅସ୍ତରୁ ରାତ୍ରି ଘ୬|୫୬ ମଧ୍ୟେ , ଘ୯|୨୦ ରୁ ଘ୧୧|୪୪ ପର୍ଯ୍ୟନ୍ତ |',
            bdTime: '(କାଳବେଳା) ଦିବା ଘ୧|୨୩ ରୁ ଘ୪|୨ ପର୍ଯ୍ୟନ୍ତ | (ବାରବେଳା) ଦିବା ଘ୬|୫୧ ରୁ ଘ୮|୩୦ ମଧ୍ୟେ | (କାଳରାତ୍ରି) ରାତ୍ରି ଘ୭|୪୨ ରୁ ଘ୯|୪ ପର୍ଯ୍ୟନ୍ତ |',
        },
    ]

    const eventsForEnglishMonth = [
        {
            id: 1,
            date: '14/04/2024',
            day: 'Sunday',
            name: "Mahabisuba (Pana) Sankranti, Hanuman Jayanti, Basantika Mrinmayee Devi's bilva decoration and Peeth Devi's Basantika Saptami Puja, Chaitra Gundicha Yatra at Shrimandir, and Shriradha's birth",
            spclDesc: '',
            Image: require('../../assets/EventsImages/AprilImages/PanaSankranti_14.04.24.png'),
            tithi: '(14) April, Sunday (Baisakh) Mesh 1, Sowal date 5, evening Chaitra day 25.',
            sunrise: '5:33:19',
            sunset: '6:00:55',
            gdTime: '(Amrita) morning 6:21 to 9:33, night 7:38 to 9:14 | (Mahendra) from morning 6:21, from 12:45 to 1:33, evening 6:50 to night 7:38, from 12:25 to 3:37.',
            bdTime: '(day and night) from 10:06 to 1:19 | Night - from 1:06 to 2:33.',
        },
        {
            id: 2,
            date: '15/04/2024',
            day: 'Monday',
            name: "Vasanti's Mrinmayee Devi's Saptami Puja, Peeth Devi's Mahashtami Puja",
            spclDesc: '',
            Image: require('../../assets/Images/Konark.png'),
            tithi: 'April 15, Monday (Baisakh), Mesh 2, Sowal date 6, evening Chaitra day 26. ',
            sunrise: '5:32:32',
            sunset: '6:1:2',
            gdTime: '(Amrita) from morning 7:5 to 10:16, day from 10:16 to 12:40, evening from 6:51 to night 9:15, from 11:39 to 2:51 (Mahendra) day from 3:4 to 4:40',
            bdTime: '(Kaala) day and night - from',
        },
        {
            id: 3,
            date: '16/04/2024',
            day: 'Tuesday',
            name: "Garbhadak Vandapana and any other offerings in the temple, Vasanti's Mrinmayee Devi's Mahashtami Puja, Nabaami Puja on the Peeth, Sandhi Puja, Ashoka Ashtami, Shreelingaraja Dev's Rukuna Rath Yatra",
            spclDesc: '',
            Image: require('../../assets/EventsImages/AprilImages/Ashokasthami_16.04.24.png'),
            tithi: 'April 16, Tuesday (Baisakh), Mesh 3, Sowal date 7, evening Chaitra day 27 ',
            sunrise: '5:31:46',
            sunset: '6:1:28',
            gdTime: '(Amrita) from morning 7:57 to 10:16, from 12:42 to 2:18, from 2:56 to 4:28, and from evening 6:6 to night 8:29, from night 10:53 to 10:53 .',
            bdTime: '(Kaala) day from 1:20 to 3:00, (Barabela) day from 6:57 to 8:33, night from 7:37 to 8:54 .',
        },
        {
            id: 4,
            date: '17/04/2024',
            day: 'Wednesday',
            name: "Peeth Devi's Vishrama Puja, Mrinmayee Devi's Vasanti Navami Puja, Sri Mandir and everywhere Shri Ram Navami, Ramacharitamanas Jayanti",
            spclDesc: '',
            Image: require('../../assets/EventsImages/AprilImages/RamNavami_17.04.24.png'),
            tithi: 'April 17, Wednesday (Baisakh), Mesh 4, Sowal date 8, evening Chaitra day 28 ',
            sunrise: '5:31:1',
            sunset: '6:1:45',
            gdTime: '(Amrita) from morning 7:24 to 10:46, from 6:52 to 6:16 in the evening, from 9:16 to 11:40 at night .',
            bdTime: '(Kaala) day from 8:27 to 10:15, (Barabela) day from 11:44 to 12:21, night from 2:32 to 3:56 .',
        },
        {
            id: 5,
            date: '18/04/2024',
            day: 'Thursday',
            name: "Yagnyaraksha, Sudashavrata, Peetha's Mrinmayee Devi's Vasanti Dashahara",
            spclDesc: '',
            Image: require('../../assets/EventsImages/AprilImages/SudusaBrata_18.04.24.png'),
            tithi: 'April 18, Thursday (Baisakh), Mesh 5, Sowal date 9, evening Chaitra day 29',
            sunrise: '5:30:16',
            sunset: '6:2:2',
            gdTime: '(Amrita) night from 1:16 to 3:30, (Mahendra) morning from 7:3 to 12:38 .',
            bdTime: '(Bara and Kaala) day from 2:54 to 6:2, night from 11:44 to 1:12 .',
        },
        {
            id: 6,
            date: '19/04/2024',
            day: 'Friday',
            name: 'Sarbasammata Kamada Ekadashi, Ananta Mahima Mela, Srimandira re Seeta Bibaha Leela',
            spclDesc: '',
            Image: require('../../assets/EventsImages/AprilImages/SitaBibah_19.04.24.png'),
            tithi: 'April 19, Friday (Baisakh), Mesh 6, Sowal date 10, evening Chaitra day 30',
            sunrise: '5:29:31',
            sunset: '6:2:19',
            gdTime: '(Amrita) morning from 7:4 to 10:14, noon from 12:38 to 2:10, evening from 3:46 to 5:22, night from 7:40 to 9:18, and (Mahendra) night from 10:54 to 11:42, and midnight from 12:30 to 5:29 .',
            bdTime: '(Bara and Kaala) day from 8:31 to 11:43, night from 8:51 to 10:19 .',
        },
        {
            id: 7,
            date: '20/04/2024',
            day: 'Saturday',
            name: 'Mandirare Shree Rama Banabasa, Kandarpa Adhibasa',
            spclDesc: '',
            Image: require('../../assets/EventsImages/AprilImages/Baanwas_20.04.24.png'),
            tithi: 'April 20, Saturday (Baisakh), Mesh 7, Sowal date 11, evening Chaitra day 31',
            sunrise: '5:28:47',
            sunset: '6:2:39',
            gdTime: '(Amrita) morning from 9:21 to 12:33, night from 8:28 to 10:52, and midnight from 12:28 to 4:28 .',
            bdTime: '(Kalabela) morning from 6:54, afternoon from 4:30 to 6:3, and (Barabela) day from 11:21 to 1:31, and (Kalaraatri) evening from 7:34 to midnight, and night from 4:45 to 5:28 .',
        },
        {
            id: 8,
            date: '21/04/2024',
            day: 'Sunday',
            name: 'Mandirare Dayana Chori, Ananga Trayodasi',
            spclDesc: '',
            Image: require('../../assets/EventsImages/AprilImages/Dayanachori_21.04.24.png'),
            tithi: 'April 21, Sunday (Baisakh), Mesh 8, Sowal date 12, evening Baisakha day 1',
            sunrise: '5:28:01',
            sunset: '6:2:57',
            gdTime: '(Amrita) day from 6:12 to 9:24, night from 7:41 to 9:17, and (Mahendra) morning from 6:13, midday from 12:36 to 1:24, night from 6:53 to 7:41, and midnight from 12:29 to 3:41 .',
            bdTime: '(Barabela) day from 10:5 to 11:22, and (Kalaraatri) night from 1:6 to 2:27 .',
        },
        {
            id: 9,
            date: '22/04/2024',
            day: 'Monday',
            name: 'Sri Vishnu Damanka and Shiva Damanka Yatra, Dayana Bedha, Mayamriga Prastaba, Sita Chori, Hingula Yatra',
            spclDesc: '',
            Image: require('../../assets/Images/PuriTemple.png'),
            tithi: 'April 22, Monday (Baisakh), Mesh 9, Sowal date 13, evening Baisakha day 2',
            sunrise: '5:27:20',
            sunset: '6:3:14',
            gdTime: '(Amrita) morning from 7:1, midday from 10:12 to 12:36, evening from 6:53 to night 9:17, and night from 11:41 to 2:53 .',
            bdTime: '(Kalabela) day from 6:49 to 9:1, (Barabela) day from 3:0 to 4:48, and (Kalaraatri) night from 10:11 to 11:44 .',
        },
        {
            id: 10,
            date: '23/04/2024',
            day: 'Tuesday',
            name: 'Sri Mandira Ra Lankapodi Prastaba, Chaitra Purnima, Chaitra Parba, Nabapuja, Sankata Tarini Brata, Mangala Purnima Brata, Taratarini Yatra Sesha, Mukundababank Janma Utsaba .',
            spclDesc: '',
            Image: require('../../assets/EventsImages/AprilImages/ChaitraPurnima_23.04.24.png'),
            tithi: 'April 23, Tuesday (Baisakh), Mesh 10, Sowal date 14, evening Baisakha day 3',
            sunrise: '5:26:38',
            sunset: '6:3:32',
            gdTime: '(Amrita) morning from 7:47 to 10:11, from 12:35 to 2:11, and from 5:59 to 9:17 in the evening .',
            bdTime: '(Kalabela) day from 7:22 to 9:1, (Barabela) morning from 6:50 to 8:28, and (Kalaraatri) night from 7:40 to 9:1 .',
        },
        {
            id: 11,
            date: '24/04/2024',
            day: 'Wednesday',
            name: 'Sri Mandirare Setubandha Prastaba, Baishakha Bratarambha',
            spclDesc: '',
            Image: require('../../assets/EventsImages/AprilImages/SetuBandhaPrastab_24.04.24.png'),
            tithi: 'April 24, Wednesday (Baisakh), Mesha 11, Swal Tithi 15, evening Baishakha day 4 .',
            sunrise: '5:25:57',
            sunset: '6:3:51',
            gdTime: '(Amrita) morning from 6:59 to 11:22, evening from 6:54 to 9:18, and night from 2:7 to end .',
            bdTime: '(Kalabela) day from 8:30 to 10:6, (Barabela) day from 11:43 to 1:19, and (Kalaraatri) night from 2:30 to 3:53 .',
        },
        {
            id: 12,
            date: '25/04/2024',
            day: 'Thursday',
            name: '',
            spclDesc: '',
            Image: require('../../assets/Images/Mahaprasad.png'),
            tithi: 'April 25, Thursday (Baisakh), Mesha 12, Swal Tithi 16, evening Baishakha day 5',
            sunrise: '5:25:16',
            sunset: '6:4:10',
            gdTime: '(Amrita) night from 10:18 to 3:42, (Mahendra) morning from 6:59 to 12:34 .',
            bdTime: '(Kalabela) day from 8:56 to 6:4, (Kalaraatri) night from 11:43 to 1:6 .',
        },
        {
            id: 13,
            date: '26/04/2024',
            day: 'Friday',
            name: 'Sri Mandirare Ravana Badha Prastaba .',
            spclDesc: '',
            Image: require('../../assets/EventsImages/AprilImages/RavanaBaddhaPrastav_26.04.24.png'),
            tithi: 'April 26, Friday (Baisakh), Mesha 13, Swal Tithi 17, evening Baishakha day 6 ',
            sunrise: '5:24:35',
            sunset: '6:4:29',
            gdTime: '(Amrita) morning from 6:58 to 10:9, noon from 12:33 to 2:9, afternoon from 3:45 to 5:21, evening from 7:42 to 9:18, and night from 10:54 to end .',
            bdTime: '(Kalabela) day from 8:30 to 11:45, (Kalaraatri) night from 8:56 to 10:19 .',
        },
        {
            id: 14,
            date: '27/04/2024',
            day: 'Saturday',
            name: '',
            spclDesc: '',
            Image: require('../../assets/Images/PuriBeach.png'),
            tithi: 'April 27, Saturday (Baisakh), Mesha 14, Swal Tithi 18, evening Baishakha day 27 .',
            sunrise: '5:23:55',
            sunset: '6:4:49',
            gdTime: '(Amrita) day from 9:21 to 12:33, night from 7:30 to 9:54, morning from 11:30 to 1:6, noon from 1:54 to 3:30 .',
            bdTime: '(Kalabela) morning from 6:53 to sunrise, from 4:29 to sunset, (Barabaela) day from 1:19 to 2:56, (Kalaraatri) night from 7:33 to 12:23, from 3:15 to midnight .',
        },
        {
            id: 15,
            date: '28/04/2024',
            day: 'Sunday',
            name: '',
            spclDesc: '',
            Image: require('../../assets/Images/LaxmiPuja.png'),
            tithi: 'On April 28, Sunday (Baishakh), the 15th day of Mesha, solar date 19, evening Baishakh day 8 .',
            sunrise: '5:23:16 AM',
            sunset: '6:05:10 PM',
            gdTime: '(Amrita) from 6:08 AM to 9:20 AM, from 7:43 PM to 9:19 PM; (Mahendra) from 6:09 AM to 6:32 AM, from 12:32 PM to 1:20 PM, in the evening from 6:55 PM to 7:43 PM, from 12:31 AM to 3:43 AM .',
            bdTime: '(Kaalabela) from 10:07 AM to 1:19 PM; (Kalaraatri) from 1:12 AM to 2:29 AM .',
        },
        {
            id: 16,
            date: '29/04/2024',
            day: 'Monday',
            name: '',
            spclDesc: '',
            Image: require('../../assets/Images/KhajaBhoga.png'),
            tithi: 'On April 29, Monday (Baishakh), the 16th day of Mesha, solar date 20, evening Baishakh day 9',
            sunrise: '5:22:39 AM',
            sunset: '6:05:29 PM',
            gdTime: '(Amrita) from 6:57 AM to 7:32 AM, from 10:08 AM to 12:32 PM, in the evening from 6:55 PM to 9:19 PM; (Mahendra) from 6:56 AM to 8:32 AM .',
            bdTime: '(Kaalabela) from 1:20 PM to 3:00 PM; (Barabela) from 3:02 PM to 4:42 PM; (Kalaratri) from 10:23 PM to 11:46 PM .',
        },
        {
            id: 17,
            date: '30/04/2024',
            day: 'Tuesday',
            name: 'Sarana Arambha',
            spclDesc: '',
            Image: require('../../assets/Images/PuriTemple.png'),
            tithi: 'On April 30, Tuesday (Baishakh), the 17th day of Mesha, solar date 21, evening Baishakh day 10 .',
            sunrise: '5:22:04 AM',
            sunset: '6:05:48 PM',
            gdTime: '(Amrita) from 7:43 AM to 10:07 AM, from 12:31 PM to 2:07 PM, from 2:55 PM to 4:35 PM, and from 6:56 PM to 9:20 PM; (Astara) until night from 6:56 PM to 9:44 PM .',
            bdTime: '(Kaalabela) from 1:23 PM to 4:02 PM; (Barabela) from 6:51 PM to 8:30 PM; (Kalaratri) from 7:42 PM to 9:04 PM .',
        },
    ]

    const CUSTOMOdia_DATE = [
        { id: 1, showDate: '୩୧', disable: 'yes', date: '31/03/2024', spclEvent: 'no' },
        { id: 2, showDate: '୧', disable: 'yes', date: '01/04/2024', spclEvent: 'no' },
        { id: 3, showDate: '୨', disable: 'yes', date: '02/04/2024', spclEvent: 'no' },
        { id: 4, showDate: '୩', disable: 'yes', date: '03/04/2024', spclEvent: 'no' },
        { id: 5, showDate: '୪', disable: 'yes', date: '04/04/2024', spclEvent: 'no' },
        { id: 6, showDate: '୫', disable: 'yes', date: '05/04/2024', spclEvent: 'no' },
        { id: 7, showDate: '୬', disable: 'yes', date: '06/04/2024', spclEvent: 'no' },
        { id: 8, showDate: '୭', disable: 'yes', date: '07/04/2024', spclEvent: 'no' },
        { id: 9, showDate: '୮', disable: 'yes', date: '08/04/2024', spclEvent: 'no' },
        { id: 10, showDate: '୯', disable: 'yes', date: '09/04/2024', spclEvent: 'no' },
        { id: 11, showDate: '୧୦', disable: 'yes', date: '10/04/2024', spclEvent: 'no' },
        { id: 12, showDate: '୧୧', disable: 'yes', date: '11/04/2024', spclEvent: 'no' },
        { id: 13, showDate: '୧୨', disable: 'yes', date: '12/04/2024', spclEvent: 'no' },
        { id: 14, showDate: '୧୩', disable: 'yes', date: '13/04/2024', spclEvent: 'no' },
        { id: 15, showDate: '୧୪', disable: 'no', date: '14/04/2024', spclEvent: 'yes' },
        { id: 16, showDate: '୧୫', disable: 'no', date: '15/04/2024', spclEvent: 'yes' },
        { id: 17, showDate: '୧୬', disable: 'no', date: '16/04/2024', spclEvent: 'yes' },
        { id: 18, showDate: '୧୭', disable: 'no', date: '17/04/2024', spclEvent: 'yes' },
        { id: 19, showDate: '୧୮', disable: 'no', date: '18/04/2024', spclEvent: 'yes' },
        { id: 20, showDate: '୧୯', disable: 'no', date: '19/04/2024', spclEvent: 'yes' },
        { id: 21, showDate: '୨୦', disable: 'no', date: '20/04/2024', spclEvent: 'yes' },
        { id: 22, showDate: '୨୧', disable: 'no', date: '21/04/2024', spclEvent: 'yes' },
        { id: 23, showDate: '୨୨', disable: 'no', date: '22/04/2024', spclEvent: 'yes' },
        { id: 24, showDate: '୨୩', disable: 'no', date: '23/04/2024', spclEvent: 'yes' },
        { id: 25, showDate: '୨୪', disable: 'no', date: '24/04/2024', spclEvent: 'yes' },
        { id: 26, showDate: '୨୫', disable: 'no', date: '25/04/2024', spclEvent: 'no' },
        { id: 27, showDate: '୨୬', disable: 'no', date: '26/04/2024', spclEvent: 'yes' },
        { id: 28, showDate: '୨୭', disable: 'no', date: '27/04/2024', spclEvent: 'no' },
        { id: 29, showDate: '୨୮', disable: 'no', date: '28/04/2024', spclEvent: 'no' },
        { id: 30, showDate: '୨୯', disable: 'no', date: '29/04/2024', spclEvent: 'no' },
        { id: 31, showDate: '୩୦', disable: 'no', date: '30/04/2024', spclEvent: 'yes' },
        { id: 32, showDate: '୧', disable: 'yes', date: '01/05/2024', spclEvent: 'no' },
        { id: 33, showDate: '୨', disable: 'yes', date: '02/05/2024', spclEvent: 'no' },
        { id: 34, showDate: '୩', disable: 'yes', date: '03/05/2024', spclEvent: 'no' },
        { id: 35, showDate: '୪', disable: 'yes', date: '04/05/2024', spclEvent: 'no' },
    ];

    const CUSTOMEnglish_DATE = [
        { id: 1, showDate: '31', disable: 'yes', date: '31/03/2024', spclEvent: 'no' },
        { id: 2, showDate: '1', disable: 'yes', date: '01/04/2024', spclEvent: 'no' },
        { id: 3, showDate: '2', disable: 'yes', date: '02/04/2024', spclEvent: 'no' },
        { id: 4, showDate: '3', disable: 'yes', date: '03/04/2024', spclEvent: 'no' },
        { id: 5, showDate: '4', disable: 'yes', date: '04/04/2024', spclEvent: 'no' },
        { id: 6, showDate: '5', disable: 'yes', date: '05/04/2024', spclEvent: 'no' },
        { id: 7, showDate: '6', disable: 'yes', date: '06/04/2024', spclEvent: 'no' },
        { id: 8, showDate: '7', disable: 'yes', date: '07/04/2024', spclEvent: 'no' },
        { id: 9, showDate: '8', disable: 'yes', date: '08/04/2024', spclEvent: 'no' },
        { id: 10, showDate: '9', disable: 'yes', date: '09/04/2024', spclEvent: 'no' },
        { id: 11, showDate: '10', disable: 'yes', date: '10/04/2024', spclEvent: 'no' },
        { id: 12, showDate: '11', disable: 'yes', date: '11/04/2024', spclEvent: 'no' },
        { id: 13, showDate: '12', disable: 'yes', date: '12/04/2024', spclEvent: 'no' },
        { id: 14, showDate: '13', disable: 'yes', date: '13/04/2024', spclEvent: 'no' },
        { id: 15, showDate: '14', disable: 'no', date: '14/04/2024', spclEvent: 'yes' },
        { id: 16, showDate: '15', disable: 'no', date: '15/04/2024', spclEvent: 'yes' },
        { id: 17, showDate: '16', disable: 'no', date: '16/04/2024', spclEvent: 'yes' },
        { id: 18, showDate: '17', disable: 'no', date: '17/04/2024', spclEvent: 'yes' },
        { id: 19, showDate: '18', disable: 'no', date: '18/04/2024', spclEvent: 'yes' },
        { id: 20, showDate: '19', disable: 'no', date: '19/04/2024', spclEvent: 'yes' },
        { id: 21, showDate: '20', disable: 'no', date: '20/04/2024', spclEvent: 'yes' },
        { id: 22, showDate: '21', disable: 'no', date: '21/04/2024', spclEvent: 'yes' },
        { id: 23, showDate: '22', disable: 'no', date: '22/04/2024', spclEvent: 'yes' },
        { id: 24, showDate: '23', disable: 'no', date: '23/04/2024', spclEvent: 'yes' },
        { id: 25, showDate: '24', disable: 'no', date: '24/04/2024', spclEvent: 'yes' },
        { id: 26, showDate: '25', disable: 'no', date: '25/04/2024', spclEvent: 'no' },
        { id: 27, showDate: '26', disable: 'no', date: '26/04/2024', spclEvent: 'yes' },
        { id: 28, showDate: '27', disable: 'no', date: '27/04/2024', spclEvent: 'no' },
        { id: 29, showDate: '28', disable: 'no', date: '28/04/2024', spclEvent: 'no' },
        { id: 30, showDate: '29', disable: 'no', date: '29/04/2024', spclEvent: 'no' },
        { id: 31, showDate: '30', disable: 'no', date: '30/04/2024', spclEvent: 'yes' },
        { id: 32, showDate: '1', disable: 'yes', date: '01/05/2024', spclEvent: 'no' },
        { id: 33, showDate: '2', disable: 'yes', date: '02/05/2024', spclEvent: 'no' },
        { id: 34, showDate: '3', disable: 'yes', date: '03/05/2024', spclEvent: 'no' },
        { id: 35, showDate: '4', disable: 'yes', date: '04/05/2024', spclEvent: 'no' },
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
                            <View>
                                <AntDesign name="caretleft" color={'#919191'} size={25} />
                            </View>
                            {selectedLanguage === "Odia" &&
                                <Text style={{ color: '#000', fontSize: 17, fontWeight: '600' }}>ଅପ୍ରେଲ  ୨୦୨୪</Text>
                            }
                            {selectedLanguage === "English" &&
                                <Text style={{ color: '#000', fontSize: 17, fontWeight: '600' }}>April  2024</Text>
                            }
                            <TouchableOpacity onPress={() => navigation.navigate('May2024')}>
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

export default April2024

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