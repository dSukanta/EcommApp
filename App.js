/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { textStyle } from './utils/GlobalStyles';
import AppNavigator from './src/navigator/AppNavigator';
import SplashScreen from 'react-native-splash-screen'
import { AppContextProvider } from './context/AppContext';



function App() {

  useEffect(()=>{
    SplashScreen.hide();
  },[]);
  
  return (
    <AppContextProvider>
    <AppNavigator/>
    </AppContextProvider>
  );
}

const styles = StyleSheet.create({

});

export default App;
