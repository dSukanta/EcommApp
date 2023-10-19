import React, {useState,useContext,useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {HeadingStyle, textStyle} from '../../utils/GlobalStyles';
import { Colors } from '../../utils/Colors';
import { restrictedRequest } from '../../utils/Functions';
import { Appcontext } from '../../context/AppContext';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';


const Cart = ({navigation}) => {

  const {userData,userToken,cartItem,setCartItem}= useContext(Appcontext);


  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'Product 1',
      price: 20,
      quantity: 2,
      image: require('../../assests/electronics.jpg'),
    },
    {
      id: 2,
      title: 'Product 2',
      price: 30,
      quantity: 1,
      image: require('../../assests/electronics.png'),
    },
    // Add more items as needed
  ]);


  const getCartItems= async()=>{

    if(userToken){
      const res= await restrictedRequest(`cart/mycart/${userToken}`,"GET",userToken);
      if(res.status === 200){
        // Toast.show({
        //   type: 'success',
        //   text1:res.message
        // });
        setCartItem(res?.data);
        // console.log(res,'cart items')
      }else{
        Toast.show({
          type: 'error',
          text1:res.message
        })
      }
    }else{
      console.log('user not logged in')
    }
  };

  useEffect(()=>{
    getCartItems();
    return(()=> console.log('user leaves'))
  },[userToken]);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = ()=> console.log('user unsubscribed');

      return () => unsubscribe();
    }, [])
  );


  const getTotalPrice = () => {
    return cartItem.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  };

  const increaseQuantity = itemId => {
    const updatedCartItem = cartItem.map(item =>
      item.product._id === itemId ? {...item, quantity: item.quantity + 1} : item,
    );
    setCartItem(updatedCartItem);
  };

  const decreaseQuantity = itemId => {
    const updatedCartItems = cartItems.map(item =>
      item.id === itemId && item.quantity > 1
        ? {...item, quantity: item.quantity - 1}
        : item,
    );
    setCartItems(updatedCartItems);
  };

  const removeItem = itemId => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  const handleCheckout=()=>{
    navigation.navigate('Checkout',{product:cartItems});
  }

  const renderItem = item => {
    return (
      <View style={styles.cartItem} key={item?._id}>
        <Image source={{uri:item?.product?.image}} style={styles.cartItemImage} />
        <View style={styles.cartItemDetails}>
          <Text style={styles.cartItemTitle}>{item?.product?.title}</Text>
          <Text style={styles.cartItemPrice}>${item?.product?.price}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityBtn}
              onPress={() => decreaseQuantity(item.product.id)}
              disabled={item?.quantity <= 1}>
              <Text style={[textStyle, {color: 'white', fontSize: 18}]}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item?.quantity}</Text>
            <TouchableOpacity
              style={styles.quantityBtn}
              onPress={() => increaseQuantity(item.product.id)}>
              <Text style={[textStyle, {color: 'white', fontSize: 18}]}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => removeItem(item.product.id)}>
          <Text>X</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if(!userData || !userToken){
    return <View style={{flex:1,width:'90%',justifyContent:'center',alignItems:'center',alignSelf:'center'}}>
      <Text>you are not logged in. Please login/signup to see your cart</Text>
    </View>
  };

  // console.log(cartItem);

  return (
    <View style={styles.container}>
  
      {cartItem?.length > 0 ? (
        <>
          <FlatList
            data={cartItem}
            renderItem={({item}) => renderItem(item)}
            keyExtractor={({item,index}) => index}
            contentContainerStyle={styles.cartList}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>
              Total: ${getTotalPrice()?.toFixed(2)}
            </Text>
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={[textStyle,{color:'#fff'}]}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
          <View style={styles.emptyCart}>
            <Image source={require('../../assests/emptycart.webp')} style={{width:'100%', height:200, resizeMode:'contain'}}/>
           <Text style={[HeadingStyle,{padding:5}]}>Your cart is empty</Text>
           <Text style={[textStyle,{padding:5}]}>Looks like you haven't added anything to your cart. Go ahead and explore top Categories.</Text>
          </View>
      )}
      <Toast/>
    </View>
  );
};
export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cartList: {
    paddingBottom: 100,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
  },
  cartItemImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  cartItemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  cartItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    fontSize: 14,
    color: 'gray',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  deleteIcon: {
    marginLeft: 10,
  },
  totalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: Colors.active_tab,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  deleteBtn: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  quantityBtn: {
    width: 30,
    height: 30,
    backgroundColor: 'black',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCart: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
});
