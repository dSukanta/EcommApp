import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {useFetch} from '../../utils/customHook';
import {BASE_URL} from '@env';
import {Colors} from '../../utils/Colors';
import {Dimensions} from 'react-native';
import {textStyle} from '../../utils/GlobalStyles';
import {Button} from '@rneui/base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ProductCard from '../components/ProductCard';
import { FetchData } from '../../utils/Functions';

const {width, height} = Dimensions.get('window');

const Mens = ({navigation}) => {
  const [products,setProducts]= useState([]);
  const [loading,setLoading]= useState(false);
  const getProducts= async()=>{
    setLoading(true);
    const res= await FetchData('products');
    const data= await res?.filter((product)=>product?.category==="Men");
    setProducts(data);
    setLoading(false)
  };

  useEffect(()=>{
    getProducts();
  },[])

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color={Colors.active_tab} size={30} />
      ) : (
        <View>
          <FlatList
            numColumns={2}
            data={products}
            renderItem={({item}) => <ProductCard item={item} navigation={navigation}/>}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

export default Mens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 5,
  },
  column: {
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 10,
    position:'relative',
  },
  card: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    backgroundColor: 'lightblue',
    position: 'relative',
  },
  cardImage: {
    width: width / 2.3,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 10,
    zIndex:-1
  },
});
