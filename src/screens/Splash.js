import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import {useNavigation} from '@react-navigation/native';
import { Colors } from '../../utils/Colors';

const Splash = () => {
  const navigation= useNavigation();

  useEffect(()=>{
    setTimeout(()=>{
      navigation.navigate('Main', {screen: 'Home'});
    },2000)
  },[])
  return (
    <View style={styles.container}>
      <Text>Splash</Text>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: Colors.global,
    justifyContent: 'center',
    alignItems: 'center',
  }
})