import {Image, StyleSheet, Text, View, TouchableOpacity,Alert} from 'react-native';
import React, {useEffect, useState,useContext} from 'react';
import {Button, Dialog} from '@rneui/base';
import {useNavigation} from '@react-navigation/native';
import {Colors, TAB_BACKG_COLOR} from '../../utils/Colors';
import {
  getFromStorage,
  removeFromStorage,
  restrictedRequest,
} from '../../utils/Functions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {HeadingStyle} from '../../utils/GlobalStyles';
import Toast from 'react-native-toast-message';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Appcontext } from '../../context/AppContext';

const CustomHeader = () => {
  const navigation = useNavigation();
  const [dialogVisible, setDialogVisible] = useState(false);
  const {userData,setUserData,userToken,setUserToken}= useContext(Appcontext);


  const logout = async () => {
    setDialogVisible(false);
    const res = await removeFromStorage('token');
    if (res !== 'Error removing') {
      Toast.show({
        type: 'success',
        text1: 'Logout successfully',
      });
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      }, 500);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong. try again later.',
      });
    }
  };

  const handleLogout = () => {

    setDialogVisible(false);

    Alert.alert('Are your sure?', 'Are you sure you want to Logout?', [
      {
        text: 'Yes',
        onPress: () => logout(),
      },
      {
        text: 'No',
        onPress: () => setDialogVisible(true),
      },
    ]);
    // ...
  };

  const options = [
    {
      title: 'Profile',
      onPress: () => {setDialogVisible(false); navigation.navigate('Profile')},
      icon: <FontAwesome5 name="user-cog" size={20} />,
    },
    {
      title: 'Logout',
      onPress: () => handleLogout(),
      icon: <FontAwesome5 name="sign-out-alt" size={20} />,
    },
  ];


  const getUser = async () => {
    const token = await getFromStorage('token');

    if (token) {
      const res = await restrictedRequest('user/auth/me', 'GET', token);
      setUserData(res.data);
      setUserToken(token);
    }
  };

  // console.log('header render')


  useEffect(() => {
    getUser();
  }, [userToken]);
  

  return (
    <View style={styles.container}>
      <View>
        <Image source={require('../../assests/logo.jpg')} style={styles.logo} />
      </View>
      {!userData ? (
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
            onPress={() => navigation.navigate('Login')}
          />
          <Button
            title="Signup"
            buttonStyle={{
              backgroundColor: 'rgba(39, 39, 39, 1)',
              borderRadius: 5,
            }}
            containerStyle={{
              width: 'auto',
            }}
            titleStyle={{color: 'white', marginHorizontal: 10}}
            onPress={() => navigation.navigate('Signup')}
          />
        </View>
      ) : (
        <TouchableOpacity onPress={() => setDialogVisible(true)}>
          <Image source={{uri: userData?.user_image}} style={styles.logo} />
        </TouchableOpacity>
      )}
      <Dialog
        isVisible={dialogVisible}
        onBackdropPress={() => setDialogVisible(false)}
        overlayStyle={{backgroundColor: '#fff', padding: 0}}>
        <View>
          <View style={styles.modalContainer}>
            <FontAwesome name="user-circle" size={30} />
            <Text style={[HeadingStyle, {color: Colors.secondary}]}>
              {userData?.name}
            </Text>
          </View>
          <View>
            {options.map((option, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.btnContainer,
                  {
                    padding: 10,
                    borderBottomWidth: 1,
                    borderColor: Colors.input_background2,
                  },
                ]} onPress={option.onPress}>
                {option?.icon}
                <Text>{option?.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Dialog>
      <Toast/>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
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
  modalContainer: {
    flexDirection: 'row',
    gap: 10,
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.input_background2,
  },
});
