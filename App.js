/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { textStyle } from './utils/GlobalStyles';
import AppNavigator from './src/navigator/AppNavigator';




function App() {


  return (
    <AppNavigator/>
  );
}

const styles = StyleSheet.create({

});

export default App;
