import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React from 'react';
  import {useFetch} from '../../utils/customHook';
  import {BASE_URL} from '@env';
  import {Colors} from '../../utils/Colors';
  import {Dimensions} from 'react-native';
  import {textStyle} from '../../utils/GlobalStyles';
  import {Button} from '@rneui/base';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';

const {width, height} = Dimensions.get('window');

const ProductCard = ({item,navigation}) => {
  return (
    <View key={item.id} style={styles.column}>
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
      />
      <Image source={{uri: item?.image}} style={styles.cardImage} />
      <Text style={[textStyle, {fontSize: 16, padding: 5}]}>
        {item?.title.substring(0, 15)}
      </Text>
      <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
        <Text
          style={[textStyle, {padding: 5, textDecorationLine: 'line-through'}]}>
          ${(Number(item?.price) + 30)}
        </Text>
        <Text style={[textStyle, {color: 'green'}]}>${item.price}</Text>
      </View>
      <View>
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
            navigation.navigate('Productdetails', {
              product: item._id,
              title: item.title,
            })
          }
        />
      </View>
    </View>
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
        zIndex:-1,
      },
});
