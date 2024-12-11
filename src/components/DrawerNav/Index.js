import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Drawer Pages
import Event_details from '../../Screens/Event_details/Index'
import MainAboutPage from '../../Screens/MainAboutPage/Index'
import MainLanguagePage from '../../Screens/MainLanguagePage/Index'
import April2024 from '../../Screens/Calendar/April2024'

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView contentContainerStyle={{ width: '100%', flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={{ padding: 10, alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/Logo/panji.png')}
                        style={styles.drawerLogo}
                    />
                </View>
                <View style={{ backgroundColor: '#ffd443', height: 0.5 }}></View>
                <DrawerItemList {...props} />
            </View>
            <View style={{ alignItems: 'center', paddingBottom: 10 }}>
                <Text style={{ color: '#ffd443', fontSize: 13, fontWeight: '400', letterSpacing: 0.4 }}>version- 1.0.00</Text>
            </View>
        </DrawerContentScrollView>
    );
}

const Index = () => {
    return (
        <Drawer.Navigator screenOptions={{ drawerStyle: { backgroundColor: '#bd1604' }, }} drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Event_details" component={Event_details} options={{
                headerShown: false,
                headerTransparent: true,
                title: 'Events',
                drawerInactiveTintColor: '#fff',
                drawerActiveTintColor: '#ffd443',
                drawerIcon: ({ focused, size }) => (
                    <Entypo name='home' size={30} color={focused ? '#ffd443' : '#fff'} />
                ),
            }} />
            <Drawer.Screen name="MainAboutPage" component={MainAboutPage} options={{
                headerShown: false,
                headerTransparent: true,
                title: 'About',
                drawerInactiveTintColor: '#fff',
                drawerActiveTintColor: '#ffd443',
                drawerIcon: ({ focused, size }) => (
                    <Entypo name='info-with-circle' size={30} color={focused ? '#ffd443' : '#fff'} />
                ),
            }} />
            <Drawer.Screen name="MainLanguagePage" component={MainLanguagePage} options={{
                headerShown: false,
                headerTransparent: true,
                title: 'Language',
                drawerInactiveTintColor: '#fff',
                drawerActiveTintColor: '#ffd443',
                drawerIcon: ({ focused, size }) => (
                    <Ionicons name='language' size={30} color={focused ? '#ffd443' : '#fff'} />
                ),
            }} />
        </Drawer.Navigator>
    )
}

export default Index

const styles = StyleSheet.create({
    drawerLogo: {
        width: 130,
        height: 130,
        resizeMode: 'contain'
    }
})