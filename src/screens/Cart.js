import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {HeadingStyle, textStyle} from '../../utils/GlobalStyles';
import {Button} from '@rneui/themed';
import {ACTIVE_TAB_COLOR, GLOBAL_COLOR} from '../../utils/Colors';

const Cart = () => {
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
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const increaseQuantity = itemId => {
    const updatedCartItems = cartItems.map(item =>
      item.id === itemId ? {...item, quantity: item.quantity + 1} : item,
    );
    setCartItems(updatedCartItems);
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

  const renderItem = item => {
    return (
      <View style={styles.cartItem}>
        <Image source={item.image} style={styles.cartItemImage} />
        <View style={styles.cartItemDetails}>
          <Text style={styles.cartItemTitle}>{item.title}</Text>
          <Text style={styles.cartItemPrice}>${item.price.toFixed(2)}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityBtn}
              onPress={() => decreaseQuantity(item.id)}
              disabled={item?.quantity <= 1}>
              <Text style={[textStyle, {color: 'white', fontSize: 18}]}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity
              style={styles.quantityBtn}
              onPress={() => increaseQuantity(item.id)}>
              <Text style={[textStyle, {color: 'white', fontSize: 18}]}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => removeItem(item.id)}>
          <Text>X</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={({item}) => renderItem(item)}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.cartList}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>
              Total: ${getTotalPrice().toFixed(2)}
            </Text>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>Checkout</Text>
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
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
