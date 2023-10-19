import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {HeadingStyle, textStyle} from '../../utils/GlobalStyles';
import {useFetch} from '../../utils/customHook';
import {BASE_URL} from '@env';
import {Button} from '@rneui/themed';
import {Colors} from '../../utils/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Rating} from '@rneui/themed';
import {FetchData, restrictedPost} from '../../utils/Functions';
import {Appcontext} from '../../context/AppContext';

const {width, height} = Dimensions.get('window');

const ProductDetails = ({route, navigation}) => {
  const [readMore, setReadMore] = useState(false);
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  const {userData, userToken} = useContext(Appcontext);

  const getProductdetails = async id => {
    setLoading(true);
    const res = await FetchData(`products/${id}`);
    setProduct(res);
    setLoading(false);
  };

  useEffect(() => {
    getProductdetails(route?.params.product);
  }, [route?.params.product]);

  // const {data, loading, error} = useFetch(
  //   `${BASE_URL}/products/${route?.params.product}`,
  // );

  const checkoutData = [
    {
      title: product?.title,
      price: product?.price,
      quantity: 1,
    },
  ];

  const addTocart = async (productid,quantity) => {
    console.log(productid,'productid')
    const res = await restrictedPost(
      `cart/mycart/addtocart/${userToken}`,
      'POST',
      {quantity:quantity,productid:productid},
      userToken,
    );
    console.log(res,'response');
  };

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
      <FontAwesome
        name="cart-plus"
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
        onPress={()=>addTocart(route?.params.product,1)}
      />
      <Image source={{uri: product?.image}} style={styles.cardImage} />
      <View
        style={{
          alignSelf: 'flex-start',
          padding: 10,
          marginBottom: 0,
          borderWidth: 1,
          borderColor: Colors.input_background2,
        }}>
        <Text style={[textStyle, {textTransform: 'capitalize'}]}>
          {product?.category}
        </Text>
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
