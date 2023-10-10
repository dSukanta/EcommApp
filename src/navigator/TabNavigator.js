import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Profile from '../screens/Profile';
import { ACTIVE_TAB_COLOR, INACTIVE_TAB_COLOR, TAB_BACKG_COLOR } from '../../utils/Colors';
import Search from '../screens/Search';
import Favourites from '../screens/Favourites';
import CustomHeader from '../components/CustomHeader';
import Cart from '../screens/Cart';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        backgroundColor:TAB_BACKG_COLOR,
        paddingBottom: 10,
        paddingTop:5,
        height:'9%',
      },
      tabBarActiveTintColor:ACTIVE_TAB_COLOR,
      tabBarInactiveTintColor: INACTIVE_TAB_COLOR ,
      tabBarHideOnKeyboard: true,
      header: (props) => <CustomHeader {...props} />,
    }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size, focused}) =>
            <Entypo name='home' size={size} color={color}/>
        }}
      />
       <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: true,
          tabBarLabel: 'Search',
          tabBarIcon: ({color, size, focused}) =>
            <FontAwesome name='search' size={size} color={color}/>
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: true,
          tabBarLabel: 'Cart',
          tabBarIcon: ({color, size, focused}) =>
            <MaterialCommunityIcons name='cart' size={size} color={color}/>
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={Favourites}
        options={{
          headerShown: true,
          tabBarLabel: 'Wishlist',
          tabBarIcon: ({color, size, focused}) =>
            <MaterialIcons name='favorite' size={size} color={color}/>
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size, focused}) =>
            <FontAwesome name='user' size={size} color={color}/>
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
