import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import n from '../helpers/normalizer';
import Card from './Card';
import {useNavigation} from '@react-navigation/native';

const {width: viewportWidth} = Dimensions.get('window');

const Trending = ({data}) => {
  const navigation = useNavigation();
  const handleClick = item => {
    navigation.navigate('MovieScreen', {item: item});
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trending</Text>
      <Carousel
        data={data}
        firstItem={1}
        renderItem={({item}) => <Card item={item} handleClick={handleClick} />}
        sliderWidth={viewportWidth}
        itemWidth={viewportWidth * 0.6}
        slideStyle={styles.slider}
      />
    </View>
  );
};

export default Trending;

const styles = StyleSheet.create({
  container: {
    paddingTop: n(20),
  },
  title: {
    color: 'white',
    fontSize: n(20),
    fontWeight: '500',
  },
  slider: {marginTop: n(20)},
});
