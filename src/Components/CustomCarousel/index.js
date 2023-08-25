import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const sliderWidth = windowWidth;
const itemWidth = windowWidth * 0.8;

const CustomCarousel = () => {
  const entries = [
    {
      id: 1,
      title: 'Sel Elektrolisis',
      image: require('../../assets/images/petaKonsep/1.png'),
    },
    {
      id: 2,
      title: 'Sel Volta',
      image: require('../../assets/images/petaKonsep/2.png'),
    },
    {
      id: 3,
      title: 'Korosi',
      image: require('../../assets/images/petaKonsep/3.png'),
    },
    // Add more items as needed
  ];

  const navigation = useNavigation();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const carouselRef = useRef(null);

  const _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Fullscreen', { image: item.image })}>
          <Image source={item.image} style={styles.image} resizeMode="cover" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <Carousel
        data={entries}
        ref={carouselRef}
        renderItem={_renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        containerCustomStyle={styles.carouselContainer}
        contentContainerStyle={{ alignItems: 'center' }}
        onSnapToItem={(index) => setActiveSlideIndex(index)}
      />
      <View style={styles.paginationContainer}>
        <Pagination
          dotsLength={entries.length}
          activeDotIndex={activeSlideIndex}
          dotStyle={styles.dot}
          inactiveDotStyle={styles.inactiveDot}
          inactiveDotOpacity={0.6}
          inactiveDotScale={0.7}
        />
      </View>
    </View>
  );
};

export default CustomCarousel;

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 20,
    marginBottom: 0,
  },
  slide: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    color: 'black',
    textAlign: "center",
    paddingBottom: 10,
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
    marginTop: 10,
    color: 'black',
  },
  image: {
    height: 391,
    width: 272,
    marginBottom: 10,
    borderRadius: 5,
  },
  paginationContainer: {
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: '#7E370C',
  },
  inactiveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
});