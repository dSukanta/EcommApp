import {FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { Image } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { textStyle } from '../../utils/GlobalStyles';
import Slider from '../components/Slider';


const Home = () => {

  const navigation = useNavigation();

  const category = [
    {
      name: 'Mens',
      image: require('../../assests/mens.jpg'),
    },
    {
      name: 'Womens',
      image: require('../../assests/womens.jpg'),
    },
    {
      name: 'Kids',
      image: require('../../assests/kids.png'),
    },
    {
      name: 'Electronics',
      image: require('../../assests/electronics.jpg'),
    },
  ];

  const renderCard = (item) => (
    <TouchableOpacity style={styles.column} key={item.id} onPress={()=>navigation.navigate(item.name)}>
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} />
      <Text style={styles.cardText}>{item.name}</Text>
    </View>
  </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
       <View>
      <Slider/>
    </View>
      <View>
      <FlatList
        numColumns={2}
        data={category}
        renderItem={({item})=> renderCard(item)}
      />
      </View>
      <View style={styles.bannerContainer}>
      <View style={styles.bannerTextContainer}>
        <Text style={[textStyle,{fontSize:18}]}>Fast Delivery</Text>
        <Text style={textStyle}>Get your orders delivered quickly and reliably.</Text>
      </View>
      <Image source={require('../../assests/delivery.jpg')} style={styles.bannerImage} />
    </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container:{
    padding:5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  column: {
    flex: 1,
    margin:5,
  },
   card: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    backgroundColor: 'lightblue',
    position:'relative',
  },
  cardFace: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius:10
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'black',
    position:'absolute',
    alignSelf:'center',
    bottom:5,
  },
  bannerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor:'white',
    borderRadius:10,
    width:'98%',
    alignSelf:'center',
  },
  bannerTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  bannerImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
});
