import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import Splash from '../screens/Splash';
import Main from '../screens/Main';
import TabNavigator from './TabNavigator';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Mens from '../screens/Mens';
import Womens from '../screens/Womens';
import Kids from '../screens/Kids';
import Electronics from '../screens/Electronics';

const Stack= createStackNavigator();

const AppNavigator = () => {
  return (
   <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name='Splash' component={Splash} options={{headerShown:false}}/>
        <Stack.Screen name='Main' component={TabNavigator} options={{headerShown:false}}/>
        <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
        <Stack.Screen name='Signup' component={Signup} options={{headerShown:false}}/>
        <Stack.Screen name='Mens' component={Mens} options={{headerShown:false}}/>
        <Stack.Screen name='Womens' component={Womens} options={{headerShown:false}}/>
        <Stack.Screen name='Kids' component={Kids} options={{headerShown:false}}/>
        <Stack.Screen name='Electronics' component={Electronics} options={{headerShown:false}}/>
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})