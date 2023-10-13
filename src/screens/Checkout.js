import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {textStyle} from '../../utils/GlobalStyles';
import {Colors} from '../../utils/Colors';
import { useFetch } from '../../utils/customHook';
import {BASE_URL} from '@env';

const CheckoutPage = ({route,navigation}) => {
  
  const {product}= route?.params;

  console.log(product,'product')

  const getTotalPrice = () => {
    return product?.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Order Details</Text>

      {/* Product List */}
      <View style={styles.productList}>
        {/* Table Headers */}
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Product</Text>
          <Text style={styles.tableHeader}>Price</Text>
          <Text style={styles.tableHeader}>Quantity</Text>
          <Text style={styles.tableHeader}>Total</Text>
        </View>

        {/* Replace with a dynamic list of products */}
        {/* Example row for a product */}
       {product?.map((el,i)=>
        <View style={styles.tableRow} key={i}>
        <Text style={styles.tableCell}>{el?.title}</Text>
        <Text style={styles.tableCell}>${el?.price}</Text>
        <Text style={styles.tableCell}>{el?.quantity}</Text>
        <Text style={styles.tableCell}>${el?.price*el?.quantity}</Text>
      </View>
        )}
        <View style={[styles.tableRow, {paddingBottom:5}]}>
          <Text style={styles.tableCell}>Grand Total</Text>
          <Text style={styles.tableCell}></Text>
          <Text style={styles.tableCell}></Text>
          <Text style={styles.tableCell}>${getTotalPrice()?.toFixed(2)}</Text>
        </View>
      </View>

      {/* Address Section */}
      <View style={styles.addressSection}>
        {/* Replace with address information */}
        <View style={styles.addressContainer}>
          <Text style={[textStyle, {fontSize: 15}]}>Your Address:</Text>
          <Text style={[textStyle]}>123 Main St</Text>
          <Text style={[textStyle]}>City, State, Zip Code</Text>
        </View>
        <TouchableOpacity style={styles.changeButton}>
          <Text style={styles.changeButtonText}>Change</Text>
        </TouchableOpacity>
      </View>

      {/* Add New Address */}
      <TouchableOpacity style={styles.addAddressButton}>
        <Text style={styles.addAddressText}>+ Add a New Address</Text>
      </TouchableOpacity>

      {/* Pay Button */}
      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payButtonText}>Pay ${getTotalPrice()?.toFixed(2)}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  productList: {
    marginBottom: 16,
  },
  addressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  addressContainer: {
    flex: 1,
  },
  changeButton: {
    backgroundColor: 'transparent',
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.input_background2,
  },
  changeButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.active_tab,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  addAddressText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  payButton: {
    backgroundColor: Colors.secondary,
    padding: 10,
    borderRadius: 8,
  },
  payButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.input_background2,
  },
  tableHeader: {
    flex: 1,
    fontWeight: 'bold',
  },
  tableCell: {
    flex: 1,
    color:'black'
  },
});

export default CheckoutPage;
