import React from 'react';
import {Text, Dimensions, StyleSheet, View, Image} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';

const Slider = () => {
  const slideData = [
    {
      image:
        'https://media-asia-cdn.oriflame.com/contentImage?u=2310100407&externalMediaId=820c2b7a-8098-4361-ba52-6bf29f27cd40&name=best+festive+deal+2&inputFormat=png',
      text: 'Festive Session Offers',
    },
    {
      image:
        'https://media-asia-cdn.oriflame.com/contentImage?u=2308311117&externalMediaId=0b0f81a0-2f6f-413f-a199-21741cc5c7c9&name=Business+Class+Loyalty2&inputFormat=png',
      text: 'Festive Session Offers',
    },
    {
      image:
        'https://png.pngtree.com/png-clipart/20221017/original/pngtree-festival-offer-hot-sale-design-png-image_8700278.png',
      text: 'Festive Session Offers',
    },
  ];

  return (
    <View style={styles.container}>
      <SwiperFlatList
        autoplay
        autoplayDelay={2}
        autoplayLoop
        index={2}
        showPagination
        paginationStyleItem={{
          width: 5,
          height: 5,
          margin: 0,
          padding: 0,
          gap: 0,
        }}
        // paginationStyleItemActive={}
      >
        {slideData?.map((el, i) => (
          <View style={[styles.child, {backgroundColor: 'tomato'}]}>
            <Image source={{uri:el.image}} style={{width:'100%',height:'100%',resizeMode:'contain'}}/>
          </View>
        ))}
      </SwiperFlatList>
    </View>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  child: {width, justifyContent: 'center', height: 150},
  text: {fontSize: 20, textAlign: 'center'},
});

export default Slider;
