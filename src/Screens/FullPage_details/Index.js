import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, FlatList, useWindowDimensions, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';

const Daily_timings = (props) => {

    const [modalVisible, setModalVisible] = useState(false);
    const closeModal = () => {
        setModalVisible(false);
    };
    const [selectedLanguage, setSelectedLanguage] = useState("English");
    useEffect(() => {
        const fetchLanguage = async () => {
            try {
                const language = await AsyncStorage.getItem('selectedLanguage');
                if (language) {
                    setSelectedLanguage(language);
                }
            } catch (error) {
                setSelectedLanguage("English");
                console.error('Error checking selected language:', error);
            }
        };
        fetchLanguage();
    }, []);

    return (
        <ScrollView style={styles.cell}>
            {props.route.data.name &&
                <TouchableOpacity onPress={() => props.route.data.spclDesc ? setModalVisible(true) : undefined} style={styles.smallCell}>
                    <Text style={{ color: '#000', fontSize: 16, fontWeight: '600', textAlign: 'center' }}>{props.route.data.name}</Text>
                </TouchableOpacity>
            }
            {selectedLanguage === 'Odia' &&
                <View style={styles.smallCell}>
                    <Text style={{ color: '#000', fontSize: 16, fontWeight: '500', lineHeight: 24 }}><Text style={{ color: '#000', fontSize: 16, fontWeight: '600', textDecorationLine: 'underline' }}>ତିଥି</Text> :- {props.route.data.tithi}</Text>
                </View>
            }
            {selectedLanguage === 'English' &&
                <View style={styles.smallCell}>
                    <Text style={{ color: '#000', fontSize: 15, fontWeight: '400', lineHeight: 24 }}><Text style={{ color: '#000', fontSize: 16, fontWeight: '600', textDecorationLine: 'underline' }}>Tithi</Text> :- {props.route.data.tithi}</Text>
                </View>
            }
            {selectedLanguage === 'Odia' &&
                <View style={styles.smallCell}>
                    <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ color: '#000', fontSize: 16, fontWeight: '600' }}>ପୁରୀକୁ ସୂର୍ଯ୍ୟୋଦୟ :- </Text>
                        <Text style={{ color: '#000', fontSize: 16, fontWeight: '500' }}>{props.route.data.sunrise}</Text>
                    </View>
                    <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ color: '#000', fontSize: 16, fontWeight: '600' }}>ପୁରୀକୁ ସୂର୍ଯ୍ୟାସ୍ତ :- </Text>
                        <Text style={{ color: '#000', fontSize: 16, fontWeight: '500' }}>{props.route.data.sunset}</Text>
                    </View>
                </View>
            }
            {selectedLanguage === 'English' &&
                <View style={styles.smallCell}>
                    <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ color: '#000', fontSize: 16, fontWeight: '600' }}>Sunrise in Puri :- </Text>
                        <Text style={{ color: '#000', fontSize: 15, fontWeight: '400' }}>{props.route.data.sunrise}</Text>
                    </View>
                    <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ color: '#000', fontSize: 16, fontWeight: '600' }}>Sunset in Puri :- </Text>
                        <Text style={{ color: '#000', fontSize: 15, fontWeight: '400' }}>{props.route.data.sunset}</Text>
                    </View>
                </View>
            }
            {selectedLanguage === 'Odia' &&
                <View style={styles.smallCell}>
                    <Text style={{ color: '#000', fontSize: 16, fontWeight: '500', lineHeight: 24, marginBottom: 6, letterSpacing: 0.3 }}><Text style={{ color: '#000', fontSize: 16, fontWeight: '600', textDecorationLine: 'underline' }}>ଶୁଭବେଳା</Text> :- {props.route.data.gdTime}</Text>
                    <Text style={{ color: '#000', fontSize: 16, fontWeight: '500', lineHeight: 24, marginBottom: 6, letterSpacing: 0.3 }}><Text style={{ color: '#000', fontSize: 16, fontWeight: '600', textDecorationLine: 'underline' }}>ଅଶୁଭବେଳା</Text> :- {props.route.data.bdTime}</Text>
                </View>
            }
            {selectedLanguage === 'English' &&
                <View style={styles.smallCell}>
                    <Text style={{ color: '#000', fontSize: 15, fontWeight: '400', lineHeight: 24, marginBottom: 6, letterSpacing: 0.3 }}><Text style={{ color: '#000', fontSize: 16, fontWeight: '600', textDecorationLine: 'underline' }}>Auspicious Time</Text> :- {props.route.data.gdTime}</Text>
                    <Text style={{ color: '#000', fontSize: 15, fontWeight: '400', lineHeight: 24, marginBottom: 6, letterSpacing: 0.3 }}><Text style={{ color: '#000', fontSize: 16, fontWeight: '600', textDecorationLine: 'underline' }}>Inauspicious Time</Text> :- {props.route.data.bdTime}</Text>
                </View>
            }

            <Modal
                isVisible={modalVisible}
                onBackdropPress={closeModal}
                animationIn="zoomIn"
                animationOut="slideOutUp"
                animationInTiming={400}
                animationOutTiming={400}
            >
                <View style={styles.modalContainer}>
                    <View style={{ marginTop: 15, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: '#000', fontWeight: '500', fontSize: 16, textAlign: 'center', width: '90%', letterSpacing: 0.6 }}>{props.route.data.spclDesc}</Text>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    )
}

const Temple_rituals = (props) => {

    const dailyNiti = [
        {
            id: 1,
            name: 'ଦ୍ଵାରଫିଟା ଓ ଦୈନିକ ମଙ୍ଗଳ ଆଳତି',
            time: 'ଭୋର ୫ଘଟିକା ବା ତତପୂର୍ବରୁ',
            desc: 'ଉପରୋକ୍ତ ନୀତି ପ୍ରତ୍ୟହ ଉଷାକାଳ ଅର୍ଥାତ ଭୋର ୫ଘଟିକା ବା ତତପୂର୍ବରୁ ହେବାର ନିୟମ | କେବଳ ଦଶହରା ପର ଏକାଦଶୀ ଠାରୁ କାର୍ତ୍ତିକ ପୂର୍ଣିମା ପର୍ୟଂତ , ଧନୁ ସଂକ୍ରାନ୍ତି ଠାରୁ ମକର ସଂକ୍ରାନ୍ତି ପର୍ୟଂତ ଓ ବିଶେଷ ନୀତି ଦିନମାନଙ୍କରେ ରାତ୍ର ପ୍ରହର ଥାଉ ହେବାର ନିୟମ |',
            itemHeading: 'ନୀତି ସକାଶେ ଆବଶ୍ୟକ ଉପକରଣମାନ',
            itemList: '(କ) କର୍ପୂର , (ଖ) ପିଠଉ , (ଗ) ବଳିତା , (ଘ) ଘିଅ , (ଓଁ) ଆଳତି ବଇଠା , (ଚ) ପାଣିଝରି , (ଛ) ତେଲ , ଓ (ଜ) ମଶାଲ',
            sebakHeading: 'ନିମ୍ନଲିଖିତ ସେବକମାନଙ୍କଦ୍ଵାରା ଏହି ନୀତି ସମ୍ପନ୍ନ ହୁଏ',
            sebakList: '(୧) ରାଜା ସୁପରିଟେଣ୍ଡଙ୍କ ତରଫରୁ ମନ୍ଦିର କର୍ମଚାରୀ , (୨) ପ୍ରତିହାରୀ , (୩) ଭିତରଛୁ ମହାପାତ୍ର , (୪) ମୁଦୁଲି , (୫) ଅଖଣ୍ଡ ମେକାପ , (୬) ପାଳିଆ ମେକାପ , (୭) ଖଟଶେଯ ମେକାପ , (୮) ପାଳିଆ ସୁଆରବଡୁ , (୯) ଖୁଣ୍ଟିଆ , (୧୦) ଗରାବଡୁ , (୧୧) ବଳିତଦେବା ଲୋକ , (୧୨) ପୁଷ୍ପାଳକ |'
        },
        {
            id: 2,
            name: 'ମଇଲମ',
            time: 'ପୂର୍ବାହ୍ନ ୬ ଘଟିକା',
            desc: 'ଏହି ନୀତିର ନିର୍ଦ୍ଧାରିତ ସମୟ ପୂର୍ବାହ୍ନ ୬ ଘଟିକା | କିନ୍ତୁ ଯେଉଁଦିନ ମଙ୍ଗଳ ଆଳତି ଯେତେଶୀଘ୍ର ସାରିବ ତେତେ ଶୀଘ୍ର ମଇଲମ ହେବ | ନୀତି ସକାଶେ ଆବଶ୍ୟକ ଉପକରଣମାନ – ଏହି ନୀତିରେ ୪ ଖଣ୍ଡ ତଡପ, ୨ ଖଣ୍ଡ ଉତ୍ତରୀୟ ଓ ୧ ଖଣ୍ଡ ଖଣ୍ଡୁଆ ଆବଶ୍ୟକ | ଏହି ସମସ୍ତ ଜିନିଷ ମନ୍ଦିରର ଭଣ୍ଡାର ଓ ଚାଙ୍ଗଡା ଘରୁ ଯୋଗାହୁଏ |',
            itemHeading: 'ନୀତି ସକାଶେ ଆବଶ୍ୟକ ଉପକରଣମାନ',
            itemList: '(୧)୪ ଖଣ୍ଡ ତଡପ, (୨) ୨ ଖଣ୍ଡ ଉତ୍ତରୀୟ, (୩)୧ ଖଣ୍ଡ ଖଣ୍ଡୁଆ ',
            sebakHeading: 'ନିମ୍ନଲିଖିତ ସେବକମାନଙ୍କଦ୍ଵାରା ଏହି ନୀତି ସମ୍ପନ୍ନ ହୁଏ',
            sebakList: '(୧) ପୁଷ୍ପାଳକ ୩ ଜଣ , (୨) ଖୁଣ୍ଟିଆ , (୩) ଚାଙ୍ଗଡା ମେକାପ , (୪) ଧୋବା |',
        },
        {
            id: 3,
            name: 'ଅବକାଶ',
            time: 'ପୂର୍ବାହ୍ନ ଘ୬ -୬|୩୦ ମଧ୍ୟନ୍ତ୍ରର',
            desc: 'ମଇଲମପରେ ଅବକାଶ ହୁଏ | ପୂର୍ବାହ୍ନ ଘ୬ -୬|୩୦ ମଧ୍ୟନ୍ତ୍ରର ନିର୍ଦ୍ଧାରିତ ସମୟ |',
            itemHeading: 'ନୀତି ସକାଶେ ଆବଶ୍ୟକ ଉପକରଣମାନ',
            itemList: '(୧) ପିତା , (୨) ପାଣି , (୩) ଖଟୁଳି , (୪) ଦାନ୍ତକାଠି , (୫) ଜିଭଛେଲା , (୬) ୩ ଗୋଟି ବଟା , (୭) ଫୁଲ ଓ ତୁଳସୀ , (୮) ଚନ୍ଦନ , (୯) ଅଁଳା , (୧୦) କର୍ପୂର , (୧୧) ଦର୍ପଣ , (୧୨) ଗରା , (୧୩) ହାଣ୍ଡି ',
            sebakHeading: 'ନିମ୍ନଲିଖିତ ସେବକମାନଙ୍କଦ୍ଵାରା ଏହି ନୀତି ସମ୍ପନ୍ନ ହୁଏ',
            sebakList: '(୧) ପୁଷ୍ପାଳକ , (୨) ସୁଆରବଡୁ , (୩) ପାଣି ଆପଟ , (୪) ଖଟୁଳି ସେବକ , (୫) ଦପଣିଆ , (୬) ମୁଖପଖାଳ ପ୍ରତିହାରୀ , (୭) ମୁଖପଖାଳ ପୁଷ୍ପାଳକ , (୮) ଅଁଳା ଘଟୁଆରୀ , (୯) ଭଣ୍ଡାରମେକାପ , (୧୦) ମହାଭୋଇ , (୧୧) ଜୋତିଶ ଖୁରି ନାଏକ |',
        },
        {
            id: 4,
            name: 'ଅବକାଶ ପର ମୈଲମ',
            time: ' ଘ ୬ .୪୫ ମିନିଟ୍ ପୂର୍ବାହ୍ନ ',
            desc: 'ଏହି ନୀତି ଅବକାଶ ପରେ ହୁଏ | ନିର୍ଦ୍ଧାରିତ ସମୟ ଘ ୬ .୪୫ ମିନିଟ୍ ପୂର୍ବାହ୍ନ | ବାରଲାଗି ଲୁଗା ଓ ରାଶିତେଲ ଏହି ନୀତି ସକାଶେ ଆବଶ୍ୟକ | ରାଜା ସୁପରଟେଣ୍ଡଙ୍କ ତରଫରୁ ଭଣ୍ଡାରରୁ ଚାଙ୍ଗଡା ମେକାପ ଜିମାରେ ବାରଲାଗି ଲୁଗା ଦିଆଯାଏ | ଏମାନେ ଠାକୁରଙ୍କ ନୀତିବେଳେ ଏହା ଯୋଗାନ୍ତି |',
            itemHeading: 'ନୀତି ସକାଶେ ଆବଶ୍ୟକ ଉପକରଣମାନ',
            itemList: '(୧) ବାରଲାଗି ଲୁଗା, (୨) ରାଶିତେଲ ',
            sebakHeading: 'ନିମ୍ନଲିଖିତ ସେବକମାନଙ୍କଦ୍ଵାରା ଏହି ନୀତି ସମ୍ପନ୍ନ ହୁଏ',
            sebakList: '(୧) ପୁଷ୍ପାଳକ , (୨) ଚାଙ୍ଗଡା ମେକାପ , (୩) ଅଖଣ୍ଡ ମେକାପ , (୪) ଧୋବା , (୫) ସୁଆରବଡୁ  ',
        },
        {
            id: 5,
            name: 'ସାହାଣମେଳା ବା ସର୍ବସାଧାରଣ ଦର୍ଶନ ',
            time: ' ଘ ୭ ପୂର୍ବାହ୍ନ ',
            desc: 'ଏହି ନୀତିର ନିର୍ଦ୍ଧାରିତ ସମୟ ସକାଳ ୭ ଘଣ୍ଟା |',
            sebakHeading: 'ନିମ୍ନଲିଖିତ ସେବକମାନଙ୍କଦ୍ଵାରା ଏହି ନୀତି ସମ୍ପନ୍ନ ହୁଏ',
            sebakList: '(୧) ପୁଷ୍ପାଳକ , (୨) ଖୁଣ୍ଟିଆ , (୩) ମେକାପ , (୪) ତଡଉ ପଟ୍ଟନାୟକ , (୫) ଗୋଛିକାର , (୬) ପ୍ରତିହାରୀ , (୭) ସୁଆର ବଡୁ , (୮) ଦେଉଳ ପୋଲିସ ଓ ଅଫିସର ',
        },
        {
            id: 6,
            name: 'ବେଶଲାଗି ',
            time: ' ସକାଳ ୮ ଟା  ଠାରୁ ୮|୩୦ ମିନିଟ୍ ମଧ୍ୟରେ ',
            desc: 'ବେଶଲାଗି ସକାଳ ୮ ଟା  ଠାରୁ ୮|୩୦ ମିନିଟ୍ ମଧ୍ୟରେ ହେବାର ନିୟମ | ରାଜା ସୁପରଟେଣ୍ଡଙ୍କ ତରଫରୁ ରତ୍ନଭଣ୍ଡାରରୁ ଯୋଗାଯାଏ | ପୁଷ୍ପାଳକମାନେ ସବୁ ବେଶ କରନ୍ତି | ଠାକୁରମାନଙ୍କର ଭିନ୍ନ ଭିନ୍ନ ସମୟରେ ଓ ଭିନ୍ନ ଭିନ୍ନ ଋତୁରେ ଭିନ୍ନ ଭିନ୍ନ ବେଶ କରାଯାଏ | ',
            sebakHeading: 'ନିମ୍ନଲିଖିତ ସେବକମାନଙ୍କଦ୍ଵାରା ଏହି ନୀତି ସମ୍ପନ୍ନ ହୁଏ',
            sebakList: '(୧) ପୁଷ୍ପାଳକ, (୨)ରାଜା ସୁପରଟେଣ୍ଡ ',
        },
        {
            id: 7,
            name: 'ରୋଷ ହୋମ ',
            time: ' ସକାଳ ୮ ଟା  ଠାରୁ ୮|୩୦ ମିନିଟ୍ ମଧ୍ୟରେ ',
            desc: 'ଏହି ନୀତିର ନିର୍ଦ୍ଧାରିତ ସମୟ ସକାଳ ଘ ୮ – ୮|୩୦ ମିନିଟ୍ ମଧ୍ୟରେ |',
            itemHeading: 'ନୀତି ସକାଶେ ଆବଶ୍ୟକ ଉପକରଣମାନ',
            itemList: '(୧) ମାଣିକିଏ ଘିଅ , (୨) ନଡିଆ , (୩) ହୋମ କାଠ , (୪) କାଠ ଆସନ  ',
            sebakHeading: 'ନିମ୍ନଲିଖିତ ସେବକମାନଙ୍କଦ୍ଵାରା ଏହି ନୀତି ସମ୍ପନ୍ନ ହୁଏ',
            sebakList: '(୧) ଧୋପଖାଳିଆ , (୨) ଦେଉଳ ପୁରୋହିତ ବା ପାଳିଆ ପୂଜାପଣ୍ଡା , (୩) ନିକାପ ',
        },
        {
            id: 8,
            name: 'ସୂର୍ଯ୍ୟ ପୂଜା ',
            time: ' ସକାଳ ଘ ୮|୩୦ ମିନିଟ୍ ରୁ ଘ ୮|୪୫ ମିନିଟ୍ ମଧ୍ୟରେ ',
            desc: 'ଏହି ନୀତିର ନିର୍ଦ୍ଧାରିତ ସମୟ ସକାଳ ଘ ୮|୩୦ ମିନିଟ୍ ରୁ ଘ ୮|୪୫ ମିନିଟ୍ ମଧ୍ୟରେ |',
            itemHeading: 'ନୀତି ସକାଶେ ଆବଶ୍ୟକ ଉପକରଣମାନ',
            itemList: '(1)କୋରା ଦୁଇଗୋଟି , (2) ଫୁଲ, (3) ଚନ୍ଦନ , (4) ଘଣ୍ଟି , (5)ଶଙ୍ଖ , (6)ପିଢା, (7) ଝରୀ  ',
            sebakHeading: 'ନିମ୍ନଲିଖିତ ସେବକମାନଙ୍କଦ୍ଵାରା ଏହି ନୀତି ସମ୍ପନ୍ନ ହୁଏ',
            sebakList: '(୧) ନିକାପ , (୨) ପାଳିଆପତ୍ରି , (୩)ପୂଜାପଣ୍ଡା ',
        },
        {
            id: 9,
            name: 'ଦ୍ଵାରପାଳ ପୂଜା ',
            time: ' ସକାଳ ଘ ୮|୪୫ ମିନିଟ୍ ରୁ ଘ ୯|00 ମିନିଟ୍ ମଧ୍ୟରେ ',
            desc: 'ସୂର୍ଯ୍ୟ ପୂଜାପରେ ଉକ୍ତପାଳିଆ ପୂଜାପଣ୍ଡା ଓ ପାଳିଆପତ୍ର ଜୟବିଜୟ ଦ୍ଵାରକୁ ଯାଆନ୍ତି | ପାଳିଆପତ୍ରି ଫୁଲ , ଚନ୍ଦନ , ଘଣ୍ଟି , ଶଙ୍ଖ , ପିଢା ଓ ଝରୀ ସୂର୍ଯ୍ୟପୂଜା ପରେ ସେଠାକୁ ନିଏ | ',
            itemHeading: 'ନୀତି ସକାଶେ ଆବଶ୍ୟକ ଉପକରଣମାନ',
            itemList: '(1) ଫୁଲ, (2) ଚନ୍ଦନ, (3)ଘଣ୍ଟି , (4) ଶଙ୍ଖ , (5) ପିଢା, (6)ଝରୀ  ',
            sebakHeading: 'ନିମ୍ନଲିଖିତ ସେବକମାନଙ୍କଦ୍ଵାରା ଏହି ନୀତି ସମ୍ପନ୍ନ ହୁଏ',
            sebakList: '(୧)ପୂଜାପଣ୍ଡା, (2)ପାଳିଆପତ୍ର ',
        },
        {
            id: 10,
            name: 'ଗୋପାଳବଲ୍ଲଭ ଭୋଗ ',
            time: ' ସକାଳ ଘ ୯ଣ୍ଟା ମଧ୍ୟରେ ',
            desc: 'ଏହି ନୀତିର ନିର୍ଦ୍ଧାରିତ ସମୟ ସକାଳ ଘ ୯ଣ୍ଟା |',
            itemHeading: 'ନୀତି ସକାଶେ ଆବଶ୍ୟକ ଉପକରଣମାନ',
            itemList: '(୧) ୪୩ ଓଳି ପାଗଖାଇ  , (୨)  ନଡିଆ କୋରା ୨୯୪ (ସାନ ୨୨୫ + ବଡ ୬୯) , (3) ଦହି ୬ ସରା , (4)ମାଖନ ୩ ସରା , (5) ପାତି ବା ଖୁଦି ନଡିଆ ୩ ସରା, (6)୩ ଟା ଥାଳି, (7)  ୩ ଟା ପରଖ',
            sebakHeading: 'ନିମ୍ନଲିଖିତ ସେବକମାନଙ୍କଦ୍ଵାରା ଏହି ନୀତି ସମ୍ପନ୍ନ ହୁଏ',
            sebakList: '(୧) ସୁଦୁ ସୁଆର , (୨) ବଲ୍ଲଭ ଯୋଗାଣିଆ , (୩) ଚର୍ଚା ପାଇକ , (୪) ସୁଆରବଡୁ , (୫) ପତ୍ରିବଡୁ , (୬) ଗରାବଡୁ , (୭) ପାଳିଆ ମହାସୁଆର , (୮) ପ୍ରଧାନ ସେବକ , (୯) ପୂଜାପଣ୍ଡା ୩ ଜଣ |',
        },
        {
            id: 11,
            name: 'ସକାଳ ଧୂପ ',
            time: ' ଦିବା ୧୦ ଘଣ୍ଟା ସମୟରେ ',
            desc: 'ଏହି ନୀତି ବଲ୍ଲଭ ପରେ ଦିବା ୧୦ ଘଣ୍ଟା ସମୟରେ ହେବାର ନିୟମ |',
            itemHeading: 'ନୀତି ସକାଶେ ଆବଶ୍ୟକ ଉପକରଣମାନ',
            itemList: '(୧) ପାଣି , (୨) ସକାଳ ଧୂପ ବା ରାଜଭୋଗ – ବିରିର ବଡ କାନ୍ତି ୮ ସରା , ମାଠପୁଳି ୧୨ , ସାନ ବାନ୍ତି ୧୨ , ଚଣ୍ଡମାଠପୁଳି ୯ , ହଂସକେଳି ୪ , କାକତୁଆ ଝିଲି ୧ ସରା , ଅଦାପାଚିଡି ୩ ସରା , ଏଣ୍ଡୁରୀ ୧୨ , ଶାଗ ୫ ଓଳି , ଥାଳି ଖେଚୁଡି ୨୦ କୁଡୁଆ , ଲୁଖୁରା ଖେଚୁଡି ୯ କୁଡୁଆ , ଅଙ୍ଗବାସଓଳି ଖେଚୁଡି ୪ , ସାନଓଳି ଖେଚୁଡି ୨ , କନିକା ୪ , ପିଠାପୁଳି ୪ , ବୁନ୍ଦିଆ ଖିରୀ ୧ , (୩) ଥାଳି ଓ ପରଖ , (୪) ମୁରୁଜ ଗୁଣ୍ଡ , (୫) ପାଣିଝରି , (୬) ଆସନ , ପିଢା , (୭) ଷୋଡଶଉପଚାର ପୂଜାସାମଗ୍ରୀ – ଅଳେଇଚ , ଯବଧାନ , ଲବଙ୍ଗ , ଗୁଡ , ପଇତା ଓ ପାତ୍ରସଜ ଇତ୍ୟାଦି , (୮) ମାଳ ତୁଳସୀ , (୯) ୩ ଗୋଟି ସୁନା ପଦକ , (୧୦) ପୂଜା ବସ୍ତ୍ର , (୧୧) ଘଷା ଜଳ , (୧୨) ୩ ଗୋଟି ଦର୍ପଣ , (୧୩) ବିଡିଆ ',
            sebakHeading: 'ନିମ୍ନଲିଖିତ ସେବକମାନଙ୍କଦ୍ଵାରା ଏହି ନୀତି ସମ୍ପନ୍ନ ହୁଏ',
            sebakList: '(୧) ସୁଆରବଡୁ , (୨) ଧୁକୁଡିଦ୍ଵାର , (୩) ପାଣିଆପଟ , (୪)ପ୍ରଧାନ ସେବକ , (୫)  ପ୍ରତିହାରୀ , (୬) ପାଳିଆ ମହାସୁଆର , (୭)ପୂଜା ପଣ୍ଡା  , (୮) ପନ୍ତିବଡୁ, (୯) ରୋଷପାଇକ , (୧୦) ପାଳିଆ ପତ୍ରି , (୧୧) ଗରାବଡୁ , (୧୨) ଚାଙ୍ଗଡା ମେକାପ , (୧୩) ପତ୍ରୀବଡୁ , (୧୪) ମଦୁଲି , (୧୫) ଚନ୍ଦନ ଘଟୁଆରୀ , (୧୬)ପରୀକ୍ଷାବଡୁ , (୧୭) ପାଳିଆ ମେକାପ , (୧୮) ପାଳିଆ ଖୁଣ୍ଟିଆ , (୧୯) ପରୀକ୍ଷା (ରାଜଗୁରୁ) , (୨୦) ପାଳିଆ ମାହାରି , (୨୧) ପାଳିଆ ମାବେଳି , (୨୨) ଝାଞ୍ଜପିଟା ଲୋକ , (୨୩) ହଡପ ନାୟକ , (୨୪) ବିଡିଆ ଯୋଗାଣିଆ ,(୨୫) ବୋଝିଆ , (୨୬) ମୁଦୁସୁଆର , (୨୭) ପୁରାଣ ପଣ୍ଡା , (୨୮) ଗୋଛିକାର , (୨୯) ଦକ୍ଷିଣ ଦୁଆର ପଢିହାରୀ , (୩୦) ଦ୍ଵାରି ନାଏକ , (୩୧) ଘଣ୍ଟୁଆ , (୩୨) ବଜନ୍ତୀ |',
        },
        {
            id: 12,
            name: 'ମଇଲମ ଓ ଭୋଗମଣ୍ଡପ',
            time: ' ଦିବା ୧୧ ଘଣ୍ଟା ସମୟରେ ',
            desc: 'ଏହି ନୀତିର ନିର୍ଦ୍ଧାରିତ ସମୟ ସକାଳ ୧୧ ଘଣ୍ଟା | ଏହି ନୀତିରେ ଯାହା ଭୋଗଲାଗେ ସେଥି ସକାଶେ ମନ୍ଦିର ଫଣ୍ଡରୁ କିଛି ଖର୍ଚ୍ଚ ହୁଏ ନାହିଁ  | ଏହି ଭୋଗ ମଠସୁଆର ଓ ଅନ୍ୟାନ୍ୟମାନଙ୍କ ବରାଦ ଅନୁଯାୟୀ ହୁଏ କେବଳ ପୂଜୋପକରଣ ସବୁ ଛାମୁ ଦୁଆରରୁ ନେଇ ବ୍ୟବହୃତ ହୁଏ | ',
            sebakHeading: 'ନିମ୍ନଲିଖିତ ସେବକମାନଙ୍କଦ୍ଵାରା ଏହି ନୀତି ସମ୍ପନ୍ନ ହୁଏ',
            sebakList: '(୧) ପାଳିଆ ପୁଷ୍ପାଳକ , (୨) ଚାଙ୍ଗଡା ମେକାପ , (୩) ପାଳିଆ ମେକାପ , (୪)ଭୋଗମଣ୍ଡପ ପ୍ରତିହାରୀ , (୫)  ସୁଆରବଡୁ , (୬) ଭୋଗମଣ୍ଡପ ଦ୍ଵାର ପ୍ରତିହାରୀ , (୭) ସୁଆର , (୮) ମହାସୁଆର, (୯) ମେକାପ ଖୁଣ୍ଟିଆ , (୧୦) ପତ୍ରିବଡୁ , (୧୧) ଗରାବଡୁ ,(୧୨) ଚର୍ଚ୍ଚାବାଲା , (୧୩) ପୂଜାପଣ୍ଡା',
        },
        {
            id: 13,
            name: 'ମଧ୍ୟାହ୍ନ ଧୂପ ',
            time: ' ଦିବା ୧୨|୩୦ ମିନିଟ୍ ଓ ୧ ଘଣ୍ଟା ମଧ୍ୟରେ ',
            desc: 'ଏହି ଧୂପ ଦିବା ୧୨|୩୦ ମିନିଟ୍ ଓ ୧ ଘଣ୍ଟା ମଧ୍ୟରେ ହେବାର ନିୟମ | ଏହି ଧୂପରେ ସକାଳ ଧୂପ ପରି ଷୋଡଶ ଉପଚାରରେ ପୂଜାହୁଏ | କେବଳ ପଟୁଆର ହୁଏ ନାହିଁ ଓ ଭୋଗ ସାମଗ୍ରୀ ସକାଳ ଧୂପର ଭୋଗ ସାମଗ୍ରୀଠାରୁ ପୃଥକ | ',
            sebakHeading: 'ନିମ୍ନଲିଖିତ ସେବକମାନଙ୍କଦ୍ଵାରା ଏହି ନୀତି ସମ୍ପନ୍ନ ହୁଏ',
            sebakList: '(୧) ପଢିଆରି , (୨)ସୁଆରବଡୁ , (୩) ପାଣିଆପଟ , (୪) ଘଣ୍ଟୁଆରୀ , (୫) ପୂଜାପଣ୍ଡା ',
        },
        {
            id: 14,
            name: 'ମଧ୍ୟାହ୍ନ ପାହୁଡ ',
            time: ' ଦିବା ୧ ଘଟିକା ବା ୧|୩୦ ମିନିଟ୍ ମଧ୍ୟରେ',
            desc: 'ଏହି ନୀତି ଦିବା ୧ ଘଟିକା ବା ୧|୩୦ ମିନିଟ୍ ମଧ୍ୟରେ ମଧ୍ୟାହ୍ନ ପହୁଡ ହେବାର ନିୟମ | ଏହି ପହୁଡ ନୀତି ସକାଶେ ରାଜ ସୁପରଟେଣ୍ଡଙ୍କ ତରଫରୁ ଶାଢି , ଖଣ୍ଡୁଆ , ଫୁଟା , ମାଳଫୁଲ , କର୍ପୂର ଓ ବିଡିଆ ଯୋଗାହୁଏ ',
            itemHeading: 'ନୀତି ସକାଶେ ଆବଶ୍ୟକ ଉପକରଣମାନ',
            itemList: '(୧)ଶାଢି, (୨) ଖଣ୍ଡୁଆ, (୩) ଫୁଟା, (୪) ମାଳଫୁଲ, (୫)କର୍ପୂର,(୬) ବିଡିଆ  ',
            sebakHeading: 'ନିମ୍ନଲିଖିତ ସେବକମାନଙ୍କଦ୍ଵାରା ଏହି ନୀତି ସମ୍ପନ୍ନ ହୁଏ',
            sebakList: '(୧) ସୁଆରବଡୁ , (୨) ପାଳିଆ ଖୁଣ୍ଟିଆ , (୩) ପୁଷ୍ପାଳକ , (୪) ଚାଙ୍ଗଡା ମେକାପ , (୫) ଖଟଶେଯ ମେକାପ , (୬) ପାଳିଆ ପ୍ରତିହାରୀ , (୭) ବଡଦ୍ଵାର ପ୍ରତିହାରୀ , (୮) ମୁଦୁଲି ',
        },
        {
            id: 15,
            name: 'ପହୁଡ ଫିଟିବା ଓ ସନ୍ଧ୍ୟା ଆଳତି ',
            time: 'ଅପରାହ୍ନ ୬ ଘଣ୍ଟା ସମୟରେ',
            desc: 'ପ୍ରାୟ ଅପରାହ୍ନ ୬ ଘଣ୍ଟା ସମୟରେ ପହୁଡ ଫିଟିବାର ନିୟମ | ଏହି ନୀତି ସକାଶେ କର୍ପୂର , ପାଟ ପତନି , ଫୁଲ ଓ ଚନ୍ଦନ ରାଜ ସୁପରଟେଣ୍ଡଙ୍କ ତରଫରୁ ଯୋଗାହୁଏ |',
            itemHeading: 'ନୀତି ସକାଶେ ଆବଶ୍ୟକ ଉପକରଣମାନ',
            itemList: '(୧)କର୍ପୂର, (୨) ପାଟ ପତନି , (୩) ଫୁଲ , (୪) ଚନ୍ଦନ ',
            sebakHeading: 'ନିମ୍ନଲିଖିତ ସେବକମାନଙ୍କଦ୍ଵାରା ଏହି ନୀତି ସମ୍ପନ୍ନ ହୁଏ',
            sebakList: '(୧) ଭିତରଛୁ ମହାପାତ୍ର , (୨) ପାଳିଆ ମେକାପ (୩) ଅଖଣ୍ଡ ମେକାପ , (୪) ମୁଦୁଲି , (୫) ଖଟଶେଯ ମେକାପ ,(୬) ପାଳିଆ ପୁଷପାଳକ , (୭) ଗରାବଡୁ , (୮) ତଳିଛୁ ମହାପାତ୍ର , (୯) ଖୁଣ୍ଟିଆ |',
        },
        {
            id: 16,
            name: 'ସନ୍ଧ୍ୟା ଧୂପ ',
            time: 'ରାତ୍ର ୭ ଘଣ୍ଟା ଓ ୮ ଘଣ୍ଟା ମଧ୍ୟରେ',
            desc: 'ରାତ୍ର ୭ ଘଣ୍ଟା ଓ ୮ ଘଣ୍ଟା ମଧ୍ୟରେ ସନ୍ଧ୍ୟା ଧୂପ ହେବାର ନିୟମ | ଏହି ଧୂପରେ କର୍ପୂର ,୨୧ ବତୀ ଓ ପିଠଉ ବଦେ ଆଉ ୨ ଗୋଟି ଅଧିକ ଆଳତି ହୁଏ | ଏହା ରୂପାବଟାରେ ହୁଏ ଓ ଏହାକୁ ଜୟମଙ୍ଗଳ ଆଳତି କୁହାଯାଏ |',
            itemHeading: 'ନୀତି ସକାଶେ ଆବଶ୍ୟକ ଉପକରଣମାନ',
            itemList: '(୧) ୨୧ ବତୀ , (୨) କର୍ପୂର , (୩) ପିଠଉ , (୪) ଆଳତି ',
            sebakHeading: 'ନିମ୍ନଲିଖିତ ସେବକମାନଙ୍କଦ୍ଵାରା ଏହି ନୀତି ସମ୍ପନ୍ନ ହୁଏ',
            sebakList: '(୧) ସୁଆର , (୨) ପୂଜାପଣ୍ଡା',
        },
        {
            id: 17,
            name: 'ସନ୍ଧ୍ୟାଧୂପ ପର ସାହାଣମେଲା ',
            time: 'ରାତ୍ର ଘଣ୍ଟା ୯ – ୯|୩୦ ମିନିଟ୍ ମଧ୍ୟରେ',
            desc: 'ସନ୍ଧ୍ୟାଧୂପ ପରେ ରାତ୍ର ଘଣ୍ଟା ୯ – ୯|୩୦ ମିନିଟ୍ ମଧ୍ୟରେ |',
            sebakHeading: 'ନିମ୍ନଲିଖିତ ସେବକମାନଙ୍କଦ୍ଵାରା ଏହି ନୀତି ସମ୍ପନ୍ନ ହୁଏ',
            sebakList: '(୧) ପୁଷ୍ପାଳକ , (୨) ଖୁଣ୍ଟିଆ , (୩) ମେକାପ , (୪) ତଡଉ ପଟ୍ଟନାୟକ , (୫) ଗୋଛିକାର , (୬) ପ୍ରତିହାରୀ , (୭) ସୁଆର ବଡୁ , (୮) ଦେଉଳ ପୋଲିସ ଓ ଅଫିସର |',
        },
        {
            id: 18,
            name: 'ମଇଲମ ଓ ଚନ୍ଦନଲାଗି ',
            time: 'ରାତ୍ର ଘଣ୍ଟା ୧୦ ସମୟରେ',
            desc: 'ରାତ୍ର ଘଣ୍ଟା ୧୦ ସମୟରେ ମଇଲମ ହୋଇ ଚନ୍ଦନଲାଗି ହେବାର ନିୟମ |',
            itemHeading: 'ନୀତି ସକାଶେ ଆବଶ୍ୟକ ଉପକରଣମାନ',
            itemList: '(୧) ଚନ୍ଦନ , (୨) କର୍ପୂର , (୩) କେଶର , (୪) କସ୍ତୁରୀ , (୫) ଠାକୁରଙ୍କ ଭଣ୍ଡାରରୁ ମୁଦୁଲି ୩ ଗୋଟି ରୂପା ପିଙ୍ଗଣ ଦିଏ | ',
            sebakHeading: 'ନିମ୍ନଲିଖିତ ସେବକମାନଙ୍କଦ୍ଵାରା ଏହି ନୀତି ସମ୍ପନ୍ନ ହୁଏ',
            sebakList: '(୧) ସୁଆର ବଡୁ , (୨) ପୁଷ୍ପାଳକ , (୩) ଘଟୁଆରୀ , (୪) ମୁଦୁଲି , (୫) ପାଳିଆ ମେକାପ , (୬) ପାଳିଆ ପଢିଆରି , (୭) ଗରାବଡୁ , (୮) ହଡପ ନାଏକ ଓ (୯) ପାଳିଆ ଖୁଣ୍ଟିଆ |',
        },
        {
            id: 19,
            name: 'ବଡ ସିଂହାର ବେଶ',
            time: 'ରାତ୍ର ୧୦.୩୦ ମିନିଟ୍ ସମୟରେ',
            desc: 'ରାତ୍ର ୧୦.୩୦ ମିନିଟ୍ ସମୟରେ ବଡସିଂହାର ବେଶ ହେବାର ନିୟମ | ଏହି ବେଶ ପାଇଁ ଶ୍ରୀରାମ ଦାସମଠ ଫୁଲର କରପଲ୍ଲଭ , କୁଣ୍ଡଳ ଓ ତଡ଼ିଗ ଯୋଗାଏ | ଏମାର ମଠ ଫୁଲର ଚନ୍ଦ୍ରିକା ଯୋଗାଏ |',
            sebakHeading: 'ନିମ୍ନଲିଖିତ ସେବକମାନଙ୍କଦ୍ଵାରା ଏହି ନୀତି ସମ୍ପନ୍ନ ହୁଏ',
            sebakList: '(୧) ଚାଙ୍ଗଡା ମେକାପ , (୨) ପୁଷ୍ପାଳକ',
        },
        {
            id: 20,
            name: 'ବଡସିଂହାର ଧୂପ ',
            time: 'ରାତ୍ର ଘଣ୍ଟା ୧୧|୧୫ ମିନିଟ୍ ସମୟରେ',
            desc: 'ରାତ୍ର ଘଣ୍ଟା ୧୧|୧୫ ମିନିଟ୍ ରେ ବଡସିଂହାର ଧୂପ ହେବାର ନିୟମ | ଏହି ଧୂପରେ ସିଂହାସନ ତଳେ ପୂଜା ଠା ହୁଏ | ଏହି ଧୂପରେ ଭୋଗପାରେ କଟାଯାଏ ନାହିଁ | ରୋଷପାଇକ ରୂପ ପିଙ୍ଗଣରେ ଖାଲି ଘିଅ ଆଣି ଠାକୁରମାନଙ୍କ ଭୋଗ ସକାଶେ ଦିଏ | ଟେରା ପଡିବା ଆଗରୁ ଧୂପ ଦୀପ  ଦିଆହୁଏ |',
            sebakHeading: 'ନିମ୍ନଲିଖିତ ସେବକମାନଙ୍କଦ୍ଵାରା ଏହି ନୀତି ସମ୍ପନ୍ନ ହୁଏ',
            sebakList: '(୧) ରୋଷପାଇକ , (୨) ପୂଜାପଣ୍ଡା ',
        },
        {
            id: 21,
            name: 'ଖଟଶେଯଲାଗି , ବୀଣା ଓ ଗାନ , ପୁଷ୍ପାଞ୍ଜଳି , ପୁଷ୍ପଲାଗି , ପହୁଡ , ମୁଦ ଓ ଶୋଧ ',
            time: 'ରାତ୍ର ଘଣ୍ଟା ୧୧|୪୫ ମିନିଟ୍ ଓ ୧୨ ଘଣ୍ଟା ମଧ୍ୟରେ',
            desc: 'ରାତ୍ର ଘଣ୍ଟା ୧୧|୪୫ ମିନିଟ୍ ଓ ୧୨ ଘଣ୍ଟା ମଧ୍ୟରେ ଉପରୋକ୍ତ ନୀତି ହେବାର ନିୟମ |',
            itemHeading: 'ନୀତି ସକାଶେ ଆବଶ୍ୟକ ଉପକରଣମାନ',
            itemList: '(୧) ୧୪ ଗୋଟି ପଇଡ , (୨) ପଲଙ୍କ , (୩) ଫୁଲ , (୪) ସିଲମାଟି ',
            sebakHeading: 'ନିମ୍ନଲିଖିତ ସେବକମାନଙ୍କଦ୍ଵାରା ଏହି ନୀତି ସମ୍ପନ୍ନ ହୁଏ',
            sebakList: '(୧) ମୁଦୁଲି , (୨) ବଡ ଦୁଆର ପଢିଆରି , (୩) ଖଟଶେଯ ମେକାପ , (୪) ସୁଆରବଡୁ , (୫) ଭଣ୍ଡାର ମେକାପ , (୬) ପୁଷ୍ପାଳକ , (୭) ମନ୍ଦିର ପୋଲିସ , (୮) ଅଖଣ୍ଡ ମେକାପ , (୯) ହଡପ ନାଏକ , (୧୦) ଭିତର ଗାୟଣୀ , (୧୧) ବୀଣାକର , (୧୨) ପାଳିଆ ଖୁଣ୍ଟିଆ , (୧୩) ପାଳିଆ ପଢିଆରି , (୧୪) ତଳିଛୁ ମହାପାତ୍ର , (୧୫) ଗରାବଡୁ , (୧୬) ବାସି ପାଳିଆ ଗରାବଡୁ |',
        },
    ]

    const [selectedItem, setSelectedItem] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.cell}>
            <FlatList
                showsVerticalScrollIndicator={false}
                // scrollEnabled={false}
                data={dailyNiti}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(niti) => {
                    return (
                        <TouchableOpacity onPress={() => { setSelectedItem(niti.item); setModalVisible(true); }} style={styles.smallCell1}>
                            <View style={{ width: '80%' }}>
                                <Text style={{ color: '#000', fontSize: 16, fontWeight: '600' }}>{niti.item.name}</Text>
                                <Text style={{ color: '#000', fontSize: 14, fontWeight: '500' }}>ସମୟ : {niti.item.time}</Text>
                            </View>
                            <View style={{ width: '20%', alignItems: 'center' }}>
                                <Octicons name="arrow-right" color={'#000'} size={24} />
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />

            <Modal
                isVisible={modalVisible}
                onBackdropPress={closeModal}
                animationIn="zoomIn"
                animationOut="slideOutUp"
                animationInTiming={400}
                animationOutTiming={400}
            >
                <View style={styles.modalContainer}>
                    {/* <ImageBackground style={{ width: '100%', height: '100%', opacity: 0.8 }} source={require('../../assets/Logo/modalBgImg.png')}> */}
                    <View style={{ marginTop: 15, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 21, textAlign: 'center' }}>{selectedItem ? selectedItem.name : 'No Events'}</Text>
                        <Image source={require('../../assets/Logo/headLine.png')} style={{ width: '80%', height: 20, marginTop: 8 }} />
                        {selectedItem &&
                            <Text style={{ color: '#000', fontSize: 18, fontWeight: '500', marginTop: 20 }}><Text style={{ fontSize: 18, fontWeight: '600' }}>ସମୟ : </Text>{selectedItem.time} .</Text>
                        }
                        <Text style={{ color: '#000', fontWeight: '500', fontSize: 16, textAlign: 'center', marginTop: 20, width: '90%', letterSpacing: 0.6, lineHeight: 19 }}>{selectedItem ? selectedItem.desc : 'No Events'}</Text>
                        {selectedItem?.itemHeading &&
                            <Text style={{ fontSize: 18, fontWeight: '600', color: '#000', fontSize: 18, marginTop: 20 }}>{selectedItem.itemHeading}</Text>
                        }
                        {selectedItem?.itemList &&
                            <Text style={{ color: '#000', fontWeight: '500', fontSize: 16, textAlign: 'center', marginTop: 10, width: '90%', letterSpacing: 0.6 }}>{selectedItem.itemList}</Text>
                        }
                        {selectedItem?.sebakHeading &&
                            <Text style={{ fontSize: 18, fontWeight: '600', color: '#000', fontSize: 18, marginTop: 20 }}>{selectedItem.sebakHeading}</Text>
                        }
                        {selectedItem?.sebakList &&
                            <Text style={{ color: '#000', fontWeight: '500', fontSize: 16, textAlign: 'center', marginTop: 10, width: '90%', letterSpacing: 0.6, marginBottom: 10 }}>{selectedItem.sebakList}</Text>
                        }
                    </View>
                    {/* </ImageBackground> */}
                </View>
            </Modal>
        </View>
    )
}

const Index = (props) => {

    const navigation = useNavigation();
    // const openDrawer = () => { navigation.openDrawer() };
    const [data, setData] = useState({});
    const layout = useWindowDimensions();
    const [selectedLanguage, setSelectedLanguage] = useState("English");
    const [index, setIndex] = useState(0);
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        const fetchLanguage = async () => {
            try {
                const language = await AsyncStorage.getItem('selectedLanguage');
                if (language) {
                    setSelectedLanguage(language);
                }
            } catch (error) {
                setSelectedLanguage("English");
                console.error('Error checking selected language:', error);
            }
        };
        fetchLanguage();
    }, []);

    useEffect(() => {
        setRoutes([
            { key: 'first', title: selectedLanguage === 'English' ? 'Daily Timings' : 'ଦୈନିକ ସମୟ ', data: props.route.params },
            { key: 'second', title: selectedLanguage === 'English' ? 'Temple Rituals' : 'ମନ୍ଦିରର ଦୈନିକ ନୀତିକାନ୍ତି' },
        ]);
    }, [selectedLanguage, props.route.params]);

    const renderScene = SceneMap({
        first: Daily_timings,
        second: Temple_rituals,
    });

    const renderTabBar = props => (
        <TabBar
            {...props}
            activeColor={'#B7070A'}
            inactiveColor={'#000'}
            labelStyle={{ textTransform: 'capitalize', fontFamily: 'Roboto-Bold', fontSize: 15, fontWeight: '800' }}
            indicatorStyle={{ backgroundColor: '#df0225' }}
            style={{ backgroundColor: '#FFBE00' }}
        />
    );

    useEffect(() => {
        console.log("Props Data", props.route.params);
        setData(props.route.params);
    }, [])

    // Function to convert Arabic numerals to Odia numerals
    const convertToOdiaNumerals = (number) => {
        const odiaNumerals = ['୦', '୧', '୨', '୩', '୪', '୫', '୬', '୭', '୮', '୯'];
        return String(number).split('').map(digit => odiaNumerals[digit]).join('');
    };

    // Format date to Odia numeric format
    const formatDateToOdiaNumeric = (dateStr) => {
        if (!dateStr) return '';
        const [day, month, year] = dateStr.split('/');
        if (!day || !month || !year) return '';
        const odiaDay = convertToOdiaNumerals(day);
        const odiaMonth = convertToOdiaNumerals(month);
        const odiaYear = convertToOdiaNumerals(year);
        return `${odiaDay}-${odiaMonth}-${odiaYear}`;
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerPart}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Entypo name="chevron-left" color={'#fff'} size={27} />
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600', marginBottom: 1 }}>Event's Detail</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                {props.route.params.Image ?
                    <Image source={props.route.params.Image} style={styles.iamge} />
                    :
                    <Image source={require('../../assets/Images/3rathas.jpg')} style={styles.iamge} />
                }
            </View>
            <View style={{ flex: 1, backgroundColor: '#FFBE00', paddingTop: 1 }}>
                {selectedLanguage === 'Odia' &&
                    <View style={{ backgroundColor: '#B7070A', paddingVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>{formatDateToOdiaNumeric(data.date)}, {data.day}</Text>
                    </View>
                }
                {selectedLanguage === 'English' &&
                    <View style={{ backgroundColor: '#B7070A', paddingVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>{data.date}, {data.day}</Text>
                    </View>
                }
                <TabView
                    style={{ height: 650 }}
                    swipeEnabled={true}
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    renderTabBar={renderTabBar}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                />
            </View>
        </View>
    )
}

export default Index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#FFBE00',
    },
    headerPart: {
        width: '100%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#B7070A',
        paddingVertical: 13,
        paddingHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 13,
        elevation: 5
    },
    imageContainer: {
        backgroundColor: '#FFBE00',
        height: 250,
        width: '100%'
    },
    iamge: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    cell: {
        flex: 1,
        // backgroundColor: '#e6e6e6',
        marginHorizontal: 10,
        padding: 10,
        marginVertical: 15,
        // borderRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomEndRadius: 20,
        shadowColor: '#FFBE00',
        shadowOffset: { width: 6, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 0,
        elevation: 9,
    },
    smallCell: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 15,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5
    },
    smallCell1: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 15,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5
    },
    modalContainer: {
        backgroundColor: '#fff',
        position: 'absolute',
        paddingVertical: 10,
        borderRadius: 10,
        width: '100%',
        alignSelf: 'center',
        minHeight: 330,
    },
})
