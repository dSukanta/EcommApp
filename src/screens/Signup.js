import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HeadingStyle, textStyle} from '../../utils/GlobalStyles';
import {Button} from '@rneui/base';
import {Colors} from '../../utils/Colors';
import Toast from 'react-native-toast-message';

const Signup = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const handleRegister = () => {
    if (!email) {
      Toast.show({
        type: 'error',
        text1: 'email is required.',
        position: 'top',
      });
      return;
    }
    if (!name) {
      Toast.show({
        type: 'error',
        text1: 'name is required.',
        position: 'top',
      });
      return;
    }
    if (!password) {
      Toast.show({
        type: 'error',
        text1: 'password is required.',
        position: 'top',
      });
      return;
    }

    
    Toast.show({
      type: 'success',
      text1: 'Succcess!',
      text2: `Thanks ${name} for registered with us.`,
      position: 'top',
    });

    setTimeout(()=>{
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    },1000)
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image style={styles.logo} source={require('../../assests/logo.jpg')} />
      </View>

      <KeyboardAvoidingView>
        <View style={{alignItems: 'center'}}>
          <Text
            style={[HeadingStyle, {marginTop: 10, color: Colors.secondary}]}>
            Create your account
          </Text>
          <Text style={[textStyle, {padding: 10, color: Colors.global}]}>
            Let's start your journey . Tell us few details about you.
          </Text>
        </View>
        <View>
          <View style={styles.inputContainer}>
            <Ionicons
              name="person"
              size={24}
              color={Colors.input_icon}
              style={{marginLeft: 8}}
            />
            <TextInput
              value={name}
              onChangeText={text => setName(text)}
              style={styles.inputStyle}
              placeholder="Enter your name"
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons
              style={{marginLeft: 8}}
              name="email"
              size={24}
              color={Colors.input_icon}
            />

            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.inputStyle}
              placeholder="Enter your email"
            />
          </View>
        </View>

        <View>
          <View style={styles.inputContainer}>
            <AntDesign
              name="lock1"
              size={24}
              color={Colors.input_icon}
              style={{marginLeft: 8}}
            />

            <TextInput
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
              style={styles.inputStyle}
              placeholder="Enter your password"
            />
          </View>
        </View>

        <View
          style={{
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Text style={[textStyle, {color: Colors.textLink}]}>
            Forgot Password
          </Text>
        </View>

        <Button
          title={'Register'}
          buttonStyle={{
            backgroundColor: Colors.active_tab,
            borderRadius: 10,
            padding: 10,
          }}
          containerStyle={{padding: 5}}
          onPress={handleRegister}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            marginTop: 10,
            alignSelf: 'center',
          }}>
          <Text style={[textStyle]}>Already have an account? Awesome!</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[textStyle, {color: Colors.textLink}]}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <Toast/>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.input_background2,
    borderRadius: 5,
    marginTop: 30,
  },
  inputStyle: {
    color: 'gray',
    width: '70%',
    alignSelf: 'center',
  },
});
