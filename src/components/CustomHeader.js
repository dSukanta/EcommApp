import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Dialog} from '@rneui/base';
import {useNavigation} from '@react-navigation/native';
import {TAB_BACKG_COLOR} from '../../utils/Colors';
import {getFromStorage, restrictedRequest} from '../../utils/Functions';

const CustomHeader = () => {
  const [user, setUser] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const navigation = useNavigation();

  const getUser = async () => {
    const token = await getFromStorage('token');
    if (token) {
      const res = await restrictedRequest('user/auth/me', 'GET', token);
      setUser(res.data);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Image source={require('../../assests/logo.jpg')} style={styles.logo} />
      </View>
      {!user ? (
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
        <TouchableOpacity onPress={()=>setDialogVisible(true)}>
          <Image source={{uri: user?.user_image}} style={styles.logo} />
        </TouchableOpacity>
      )}
      <Dialog isVisible={dialogVisible} onBackdropPress={()=>setDialogVisible(false)}>
        <Dialog.Title title="Dialog Title" />
        <Text>Dialog body text. Add relevant information here.</Text>
        <Dialog.Actions>
          <Dialog.Button
            title="ACTION 1"
            onPress={() => console.log('Primary Action Clicked!')}
          />
          <Dialog.Button
            title="ACTION 2"
            onPress={() => console.log('Secondary Action Clicked!')}
          />
        </Dialog.Actions>
      </Dialog>
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
});
