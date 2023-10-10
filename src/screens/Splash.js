import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { GLOBAL_COLOR } from '../../utils/Colors';
import {useNavigation} from '@react-navigation/native';

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
    backgroundColor: GLOBAL_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  }
})