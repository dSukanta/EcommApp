import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from '@rneui/base';
import {useNavigation} from '@react-navigation/native';
import { TAB_BACKG_COLOR } from '../../utils/Colors';


const CustomHeader = () => {

  const navigation= useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <Image source={require('../../assests/logo.jpg')} style={styles.logo} />
      </View>
      <View style={styles.btnContainer}>
        <Button
          title="Login"
          buttonStyle={{
            backgroundColor: 'rgba(78, 116, 289, 1)',
            borderRadius: 5,
          }}
          containerStyle={{
            width: 'auto',
          }}
          titleStyle={{color: 'white', marginHorizontal: 10}}
          onPress={()=>navigation.navigate('Login')}
        />
        <Button
          title="Signup"
          buttonStyle={{backgroundColor: 'rgba(39, 39, 39, 1)', borderRadius: 5,}}
          containerStyle={{
            width: 'auto',
          }}
          titleStyle={{color: 'white', marginHorizontal: 10}}
          onPress={()=>navigation.navigate('Signup')}
        />
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between',
    alignItems:'center',
    backgroundColor: TAB_BACKG_COLOR,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 50,
    resizeMode: 'contain',
  },
  btnContainer: {
    flexDirection: 'row',
    gap: 10,
  },
});
