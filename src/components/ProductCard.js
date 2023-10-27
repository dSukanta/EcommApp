import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BASE_URL } from '@env';
import { Colors } from '../../utils/Colors';
import { Dimensions } from 'react-native';
import { textStyle } from '../../utils/GlobalStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

const ProductCard = ({ item, navigation }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const handleImageChange = (index) => {
    setImageIndex(index);
  };

  return (
    <TouchableOpacity
      key={item.id}
      style={styles.column}
      onPress={() =>
        navigation.navigate('Productdetails', {
          product: item._id,
          title: item.title,
        })
      }
    >
      <View style={styles.imageSlider}>
        {item.image.map((img, index) => (
          <Image
            key={index}
            source={{ uri: img }}
            style={[styles.cardImage, index !== imageIndex && styles.hidden]}
          />
        ))}
      </View>
      {/* <View style={styles.dotsContainer}>
        {item.image.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === imageIndex && styles.activeDot,
            ]}
            onTouchEnd={() => handleImageChange(index)}
          />
        ))}
      </View> */}
      <Text style={[textStyle, { fontSize: 16, padding: 5 }]}>
        {item.title.substring(0, 15)}
      </Text>
      <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
        <Text
          style={[textStyle, { padding: 5, textDecorationLine: 'line-through'}]}
        >
          ${Number(item.price) + 30}
        </Text>
        <Text style={[textStyle, { color: 'green'}]}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

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
    position: 'relative',
  },
  imageSlider: {
    position: 'relative',
  },
  cardImage: {
    width: width / 2.3,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: 'lightgray',
    margin: 5,
  },
  activeDot: {
    backgroundColor: 'blue',
  },
  hidden: {
    display: 'none',
  },
});
