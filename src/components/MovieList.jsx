import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {imageUrl} from '../constant/urls';
import n, {SCREEN_HEIGHT, SCREEN_WIDTH} from '../helpers/normalizer';
import {theme} from '../theme/colors';

const MovieList = ({title, data, hideall}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {!hideall && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AllMovieScreen', {title: title, data: data})
            }>
            <Text style={([styles.title], {color: theme.text})}>See All</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={data}
        horizontal
        contentContainerStyle={styles.flatlistContainer}
        renderItem={({item, index}) => {
          const name = item?.original_title;
          const img = imageUrl + item?.poster_path;
          return (
            <Pressable
              key={index}
              onPress={() => navigation.navigate('MovieScreen', {item: item})}
              style={styles.imageWrapper}>
              <Image
                source={{uri: img}}
                style={{
                  width: SCREEN_WIDTH * 0.4,
                  height: SCREEN_HEIGHT * 0.26,
                  borderRadius: n(15),
                }}
              />
              <Text style={styles.name}>
                {name.length > 20 ? name.slice(0, 20) + '...' : name}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default MovieList;

const styles = StyleSheet.create({
  container: {paddingTop: n(20), paddingHorizontal: n(10)},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {color: 'white', fontSize: n(20), fontWeight: '500'},
  name: {color: 'white', fontSize: n(15), fontWeight: '400', paddingTop: n(10)},
  flatlistContainer: {
    paddingTop: n(15),
    gap: n(20),
    alignItems: 'center',
  },
  imageWrapper: {alignItems: 'center'},
});
