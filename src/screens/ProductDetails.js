import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {HeadingStyle, textStyle} from '../../utils/GlobalStyles';
import {useFetch} from '../../utils/customHook';
import {BASE_URL} from '@env';
import {Button} from '@rneui/themed';
import {Colors} from '../../utils/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Rating} from '@rneui/themed';
import {
  FetchData,
  restrictedPost,
  restrictedRequest,
} from '../../utils/Functions';
import {Appcontext} from '../../context/AppContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import { useIsFocused } from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const ProductDetails = ({route, navigation}) => {
  const [readMore, setReadMore] = useState(false);
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  const {userData, userToken, cartItem, setCartItem} = useContext(Appcontext);
  const [imageIndex, setimageIndex] = useState(0);
  const focused= useIsFocused();

  const getProductdetails = async id => {
    setLoading(true);
    const res = await FetchData(`products/${id}`);
    setProduct(res);
    setLoading(false);
  };

  useEffect(() => {
    getProductdetails(route?.params.product);
  }, [route?.params.product]);

  const checkoutData = [
    {
      title: product?.title,
      price: product?.price,
      quantity: 1,
    },
  ];

  const getCartItem = async () => {
    if(userData && userToken){
      const res = await restrictedRequest(
        `cart/mycart/${userToken}`,
        'GET',
        userToken,
      );
      setCartItem(res.data)
    }
    // console.log(res);
  };

  const addTocart = async (productid, quantity) => {
    if (!userData) {
      return Toast.show({
        type: 'error',
        text1: 'Please Login to Add Items to Cart',
      });
    }

    const res = await cartItem?.filter(
      (el, i) => el?.product?._id === productid,
    );

    if (!res?.length) {
      const addToCart = await restrictedPost(
        `cart/mycart/addtocart/${userToken}`,
        'POST',
        {quantity: quantity, productid: productid},
        userToken,
      );
      // console.log(res);
      if (addToCart.error) {
        Toast.show({
          type: 'error',
          text1: addToCart.message,
        });
      } else {
        Toast.show({
          type: 'success',
          text1: addToCart.message,
        });
        getCartItem();
      }
    }
  };

  useEffect(()=>{
    getCartItem();
  },[userData,focused]);

  // console.log(cartItem, 'cartItem');

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color={Colors.active_tab} size={'large'} />
      </View>
    );
  }

  return (
    <ScrollView
      key={product?.id}
      contentContainerStyle={styles.column}
      showsVerticalScrollIndicator={false}>
      <MaterialCommunityIcons
        name={
          cartItem?.filter((el, i) => el?.product?._id === product?._id)
            ?.length <= 0 || !cartItem?.length
            ? 'cart-plus'
            : 'cart-check'
        }
        size={20}
        color={'white'}
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 1,
          padding: 5,
          borderRadius: 20,
          backgroundColor: Colors.input_background2,
        }}
        onPress={() => addTocart(route?.params.product, 1)}
        disabled={
          cartItem?.filter((el, i) => el?.product?._id === product?._id)
            ?.length > 0
        }
      />
      <Image
        source={{uri: product?.image[imageIndex]}}
        style={styles.cardImage}
      />
      <View style={{flexDirection: 'row', gap: 5, flexWrap: 'wrap'}}>
        {product?.image?.map((el, i) => (
          <TouchableOpacity
            onPress={() => setimageIndex(i)}
            style={{borderWidth: i === imageIndex ? 1 : 0}}
            key={i}>
            <Image
              source={{uri: el}}
              style={{width: 50, height: 50, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
        ))}
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-start',
          gap: 5,
          marginTop: 10,
        }}>
        {product?.category &&
          product?.category?.map(el => (
            <View
              style={{
                alignSelf: 'flex-start',
                padding: 10,
                marginBottom: 0,
                borderWidth: 1,
                borderColor: Colors.input_background2,
              }}>
              {
                <Text style={[textStyle, {textTransform: 'capitalize'}]}>
                  {el}
                </Text>
              }
            </View>
          ))}
      </View>
      <Text
        style={[
          textStyle,
          {fontSize: 15, padding: 10, alignSelf: 'flex-start'},
        ]}>
        {product?.title}
      </Text>
      <View style={{alignSelf: 'flex-start'}}>
        <Text
          style={[textStyle, {paddingHorizontal: 10, alignSelf: 'flex-start'}]}>
          {product?.description?.length > 150
            ? readMore
              ? product?.description
              : product?.description?.substring(0, 150) + '...'
            : product?.description}
        </Text>
        <TouchableOpacity onPress={() => setReadMore(!readMore)}>
          {product?.description?.length > 150 && (
            <Text
              style={[
                textStyle,
                {color: Colors.textLink, paddingHorizontal: 10},
              ]}>
              {readMore ? 'read less' : 'read more'}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          alignSelf: 'flex-start',
          padding: 10,
          alignItems: 'center',
        }}>
        <Text style={[textStyle, {textDecorationLine: 'line-through'}]}>
          ${Number(product?.price) + 30}
        </Text>
        <Text style={[textStyle, {color: 'green', fontSize: 20}]}>
          ${product?.price}
        </Text>
      </View>
      <View style={{width: '100%'}}>
        <Button
          title={'Buy Now'}
          icon={{
            name: 'electric-bolt',
            type: 'material-icons',
            color: 'white',
            size: 10,
          }}
          iconPosition="left"
          buttonStyle={{backgroundColor: Colors.secondary_btn, margin: 10}}
          titleStyle={[textStyle, {color: 'white'}]}
          onPress={() =>
            navigation.navigate('Checkout', {product: checkoutData})
          }
        />
      </View>
      <Toast />
    </ScrollView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  column: {
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 10,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    alignSelf: 'center',
    flexWrap: 'wrap',
  },
  cardImage: {
    width: width / 2.3,
    height: height / 2.5,
    resizeMode: 'contain',
    borderRadius: 10,
    zIndex: -1,
  },
});
