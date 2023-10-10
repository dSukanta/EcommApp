import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {textStyle} from '../../utils/GlobalStyles';

const User = () => {
  const navigation = useNavigation();
  // const logout = async () => {
  //   await AsyncStorage.removeItem('IS_USER_LOGGED_IN');
  //   navigation.navigate('Login');
  // };
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assests/defaultuser.png')}
        style={styles.user}
      />
      <Text style={styles.name}>{'User'}</Text>
      <Text style={[styles.name, {fontSize: 16, marginTop: 0}]}>
        {'user@gmail.com'}
      </Text>
      <TouchableOpacity style={[styles.tab, {marginTop: 40}]}>
        <AntDesign name="edit" color={'black'} size={20} />
        <Text style={[textStyle, {padding: 5}]}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, {marginTop: 10}]}>
        <MaterialCommunityIcons name="truck-delivery" color={'black'} size={20}/>
        <Text style={[textStyle, {padding: 5}]}>Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, {marginTop: 10}]}>
        <Entypo name="address" color={'black'} size={20} />
        <Text style={[textStyle, {padding: 5}]}>Address</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, {marginTop: 10}]}>
        <FontAwesome name="credit-card" color={'black'} size={20} />
        <Text style={[textStyle, {padding: 5}]}>Payment Methods</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, {marginTop: 10}]}>
        <AntDesign name="logout" color={'black'} size={20} />
        <Text style={[textStyle, {padding: 5}]}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default User;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  user: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 50,
  },
  name: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  tab: {
    width: '90%',
    height: 50,
    borderBottomWidth: 0.3,
    borderBottomColor: '#DBDBDB',
    paddingLeft: 20,
    flexDirection: 'row',
    // justifyContent:'center',
    alignItems: 'center',
  },
});
