import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LogLevel, OneSignal } from 'react-native-onesignal';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import RNScreenshotPrevent, { addListener } from 'react-native-screenshot-prevent';
RNScreenshotPrevent.enabled(true);

// SplashScreen
import SplashScreen from './src/Screens/SplashScreen/Index'

//Drawer
import DrawerNav from './src/components/DrawerNav/Index'

// Pages
import About from './src/Screens/About/Index'
import IntroPage from './src/Screens/IntroPage/Index'
import Select_language from './src/Screens/Select_language/Index'
import Event_details from './src/Screens/Event_details/Index'
import FullPage_details from './src/Screens/FullPage_details/Index'
import MainAboutPage from './src/Screens/MainAboutPage/Index'
import MainLanguagePage from './src/Screens/MainLanguagePage/Index'
import TimeZone from './src/Screens/TimeZone/Index'

// Calendar
import April2024 from './src/Screens/Calendar/April2024'
import May2024 from './src/Screens/Calendar/May2024'
import June2024 from './src/Screens/Calendar/June2024'
import July2024 from './src/Screens/Calendar/July2024'
import August2024 from './src/Screens/Calendar/August2024'
import September2024 from './src/Screens/Calendar/September2024'
import October2024 from './src/Screens/Calendar/October2024'
import November2024 from './src/Screens/Calendar/November2024'
import December2024 from './src/Screens/Calendar/December2024'
import January2025 from './src/Screens/Calendar/January2025'
import February2025 from './src/Screens/Calendar/February2025'
import March2025 from './src/Screens/Calendar/March2025'
import April2025 from './src/Screens/Calendar/April2025'

const Stack = createNativeStackNavigator()

const App = () => {

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 5000)
  }, []);

  useEffect(() => {
    // Remove this method to stop OneSignal Debugging
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);

    // OneSignal Initialization
    OneSignal.initialize("4442cd56-d570-4186-8190-2fa00169b2be");

    // requestPermission will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
    OneSignal.Notifications.requestPermission(true);

    // Method for listening for notification clicks
    OneSignal.Notifications.addEventListener('click', (event) => {
      console.log('OneSignal: notification clicked:', event);
    });

  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {showSplash ? (<Stack.Screen name="SplashScreen" component={SplashScreen} options={{ presentation: 'modal', animationTypeForReplace: 'push', animation: 'slide_from_right' }} />) : null}
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="DrawerNav" component={DrawerNav} />
        <Stack.Screen name="IntroPage" component={IntroPage} />
        <Stack.Screen name="Select_language" component={Select_language} />
        <Stack.Screen name="Event_details" component={Event_details} />
        <Stack.Screen name="FullPage_details" component={FullPage_details} />
        <Stack.Screen name="MainAboutPage" component={MainAboutPage} />
        <Stack.Screen name="MainLanguagePage" component={MainLanguagePage} />
        <Stack.Screen name="TimeZone" component={TimeZone} />
        <Stack.Screen name="April2024" component={April2024} />
        <Stack.Screen name="May2024" component={May2024} />
        <Stack.Screen name="June2024" component={June2024} />
        <Stack.Screen name="July2024" component={July2024} />
        <Stack.Screen name="August2024" component={August2024} />
        <Stack.Screen name="September2024" component={September2024} />
        <Stack.Screen name="October2024" component={October2024} />
        <Stack.Screen name="November2024" component={November2024} />
        <Stack.Screen name="December2024" component={December2024} />
        <Stack.Screen name="January2025" component={January2025} />
        <Stack.Screen name="February2025" component={February2025} />
        <Stack.Screen name="March2025" component={March2025} />
        <Stack.Screen name="April2025" component={April2025} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})