import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { HeadingStyle, textStyle } from '../../utils/GlobalStyles'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { GLOBAL_COLOR } from '../../utils/Colors';
const Search = () => {
  const [focused,setFocused]= useState(false);

  return (
    <View>
      <Text style={[HeadingStyle,{padding:10}]}>Search</Text>
      <View>
          <TextInput
            placeholder='Looking for an item? Serach here...'
            style={[styles.inputStyle,{borderColor: focused? GLOBAL_COLOR: 'grey'}]}
            onFocus={()=>setFocused(true)}
            onEndEditing={()=>setFocused(false)}
          />
          {!focused && <EvilIcons name='search' size={30} color={'grey'} style={styles.serachIcon}/>}
      </View>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container:{
    padding: 10,
  },
  inputStyle:{
    borderWidth:1,
    padding:10,
    width:'90%',
    alignSelf:'center',
    borderRadius:50,
    position: 'relative',
  },
  serachIcon:{
    position: 'absolute',
    top:'20%',
    right:'10%'
  }
})