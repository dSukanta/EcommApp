import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CustomHeader = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={require('../../assests/logo.jpg')} style={styles.logo}/>
      </View>
      <View style={styles.btnContainer}>
        <Button title='Login'/>
        <Button title='Signup'/>
      </View>
    </View>
  )
}

export default CustomHeader

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        padding:5,
        justifyContent:'space-between'
    },
    logo:{
        width:50,
        height:50,
        borderRadius:50,
        resizeMode:'contain',
    },
    btnContainer:{
        flexDirection:'row',
        gap:10,
    }
})