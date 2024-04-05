import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {imageUrl} from '../constant/urls';
import n from '../helpers/normalizer';
import {useNavigation} from '@react-navigation/native';
const Cast = ({cast}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Top Cast</Text>
      <FlatList
        horizontal
        data={cast}
        contentContainerStyle={styles.flatListContainer}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          let characterName = item?.character;
          let personName = item?.original_name;
          const img = imageUrl + item?.profile_path;
          return (
            <TouchableOpacity
              key={index}
              style={{alignItems: 'center'}}
              onPress={() => navigation.navigate('PersonScreen', {item: item})}>
              <FastImage
                source={{uri: img}}
                style={styles.img}
                resizeMode={FastImage.resizeMode.cover}
              />
              <Text style={styles.characterName}>
                {characterName.length > 10
                  ? characterName.slice(0, 10) + '...'
                  : characterName}
              </Text>
              <Text style={styles.personName}>
                {personName.length > 10
                  ? personName.slice(0, 10) + '...'
                  : personName}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Cast;

const styles = StyleSheet.create({
  container: {
    paddingTop: n(15),
    marginHorizontal: n(15),
  },
  header: {
    color: 'white',
    fontSize: n(25),
    fontWeight: '500',
  },
  img: {
    width: n(70),
    height: n(70),
    borderRadius: n(50),
  },
  flatListContainer: {
    paddingHorizontal: n(15),
    gap: n(20),
    paddingTop: n(10),
  },
  characterName: {
    color: 'white',
    fontSize: n(15),
    fontWeight: '500',
    paddingTop: n(5),
  },
  personName: {
    color: 'gray',
    fontSize: n(15),
    fontWeight: '400',
    paddingTop: n(5),
  },
});
