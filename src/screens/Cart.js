import React, {useState,useContext} from 'react';
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
import { Appcontext } from '../../context/AppContext';
import { restrictedRequest } from '../../utils/Functions';
import Toast from 'react-native-toast-message';


const Cart = ({navigation}) => {

  const {cartItem,setCartItem,userToken,userData}= useContext(Appcontext);

  // console.log(cartItem,'cart')

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

  const getTotalPrice = () => {
    return cartItem.reduce(
      (total, item) => total + Number(item?.product?.price) * Number(item.quantity),
      0,
    );
  };

  const increaseQuantity = itemId => {
    // console.log(cartItem,itemId,'data')
    const updatedCartItems = cartItem?.map(item =>
      item?._id === itemId ? {...item, quantity: (Number(item?.quantity)) + 1} : item,
    );
    console.log(updatedCartItems)
    setCartItem(updatedCartItems);
  };

  const decreaseQuantity = itemId => {
    const updatedCartItems = cartItem?.map(item =>
      item?._id === itemId && item?.quantity > 1
        ? {...item, quantity: item.quantity - 1}
        : item,
    );
    setCartItem(updatedCartItems);
  };

  const removeItem = async(productid) => {
    if(!productid){
      return Toast.show({
        type: 'error',
        text1:'Product not available right now',
      });
    };
    if(!userData || !userToken){
      return Toast.show({
        type: 'error',
        text1:'You are unauthorized',
      });
    }
     const res= await restrictedRequest(`cart/mycart/deleteitem/${userToken}/${productid}`,'DELETE',userToken);
     if(res.error){
       Toast.show({
        type:'error',
        text1: res?.message
       })
     }else{
      Toast.show({
        type:'success',
        text1: res?.message
       })
        const getCartItem= await restrictedRequest(`cart/mycart/${userToken}`,'GET',userToken);
        // console.log(res);
        if(getCartItem.error){
          Toast.show({
            type:'error',
            text1: getCartItem?.message
           })
        }else{
          setCartItem(getCartItem?.data)
        }
     }
  };  
  const handleCheckout=()=>{
    navigation.navigate('Checkout',{product:cartItem, total: getTotalPrice()});
  }

  const renderItem = item => {
    return (
      <View style={styles.cartItem}>
        <Image source={{uri:item?.product?.image[0]}} style={styles.cartItemImage} />
        <View style={styles.cartItemDetails}>
          <Text style={styles.cartItemTitle}>{item?.product?.title}</Text>
          <Text style={styles.cartItemPrice}>${item?.product?.price}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityBtn}
              onPress={() => decreaseQuantity(item?._id)}
              disabled={item?.quantity <= 1}>
              <Text style={[textStyle, {color: 'white', fontSize: 18}]}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity
              style={styles.quantityBtn}
              onPress={() => increaseQuantity(item?._id)}
              >
              <Text style={[textStyle, {color: 'white', fontSize: 18}]}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => removeItem(item?._id)}>
          <Text>X</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {cartItem.length > 0 ? (
        <>
          <FlatList
            data={cartItem}
            renderItem={({item}) => renderItem(item)}
            keyExtractor={({item,index}) =>index}
            contentContainerStyle={styles.cartList}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>
              Total: ${getTotalPrice()}
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