import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { HeadingStyle, textStyle } from '../../utils/GlobalStyles';
import { Colors} from '../../utils/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Login = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../../assests/login_screen3.png')}
        style={styles.image}
      />
      <View style={styles.overlay}>
        <Text style={[HeadingStyle,{fontSize:25}]}>Login</Text>
        <Text style={[textStyle,{color:'blue', paddingVertical:10}]}>Welcome back!</Text>
        <Text style={[textStyle,{paddingBottom:5}]}>We missed you a lot ! Let's resume the journey</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
          <MaterialCommunityIcons name='account-arrow-right' size={25} color={'white'}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleButton}>
          <Image source={require('../../assests/google.png')} style={{height:30,width:30,resizeMode:'contain'}}/>
          <Text style={textStyle}>Login with Google</Text>
        </TouchableOpacity>

        <Text style={[textStyle,{padding:5}]}>
          
          <TouchableOpacity onPress={()=>navigation.navigate('Signup')}>
          
          </TouchableOpacity>
        </Text>
        <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
          <Text style={[textStyle]}>Don't have an account?</Text>
          <TouchableOpacity onPress={()=>navigation.navigate('Signup')}>
          <Text style={[textStyle,{color:Colors.textLink}]}>Sign up</Text>
          </TouchableOpacity>
        </View>
        <Text style={[textStyle,{color:Colors.textLink,paddingVertical:5}]}>Forgot your password?</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    resizeMode: 'cover',
    height:'40%',
    overflow:'hidden'
  },
  overlay: {
    flex: 1,
    backgroundColor: 'white', 
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    position: 'absolute', 
    bottom: 0, 
    left: 0,
    right: 0,
  },
  welcomeText: {
    fontSize: 18,
    marginTop: 10,
  },
  input: {
    backgroundColor:Colors.input_background2,
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  loginButton: {
    backgroundColor:Colors.active_tab,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 10,
    flexDirection:'row',
    justifyContent: 'center',
    gap:10
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  googleButton: {
    flexDirection:'row',
    gap:10,
    backgroundColor: Colors.input_background, 
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 5,
  },
  createAccountText: {
    marginTop: 20,
    fontSize: 16,
  },
  signupLink: {
    color: '#007bff',
  },
  forgotPasswordText: {
    marginTop: 10,
    fontSize: 16,
    color: '#007bff',
  },
});

export default Login;
