import {View, Text, StyleSheet, TextInput, Alert} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import { Button } from '@rneui/base';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const loginUser = () => {
    // firestore()
    //   .collection('Users')
    //   .where('email', '==', email)
    //   .get()
    //   .then(querySnapshot => {
    //     console.log(querySnapshot.doc[0]._data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Login'}</Text>

      <TextInput
        placeholder="Enter Email"
        style={styles.input}
        value={email}
        onChangeText={txt => setEmail(txt)}
      />

      <TextInput
        placeholder="Enter password"
        style={styles.input}
        value={pass}
        onChangeText={txt => setPass(txt)}
      />

      <Button title={'Login'} containerStyle={{paddingVertical:10,width:'90%',alignSelf:'center'}}/>
      <Text
        style={styles.loginText}
        onPress={() => {
          navigation.navigate('Signup');
        }}>
        {'Sign up'}
      </Text>
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    color: '#000',
    fontSize: 40,
    marginLeft: 20,
    marginTop: 50,
    marginBottom: 50,
  },
  input: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    paddingLeft: 20,
    alignSelf: 'center',
    marginTop: 10,
  },
  loginText: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 18,
    textDecorationLine: 'underline',
  },
});