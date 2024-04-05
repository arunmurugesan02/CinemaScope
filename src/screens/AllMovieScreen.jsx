import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import {imageUrl} from '../constant/urls';
import n, {SCREEN_HEIGHT, SCREEN_WIDTH} from '../helpers/normalizer';
import {theme} from '../theme/colors';

const AllMovieScreen = ({route}) => {
  const navigation = useNavigation();
  const {title, data} = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={30} color={'white'} />
        </TouchableOpacity>
        <Text style={styles.outerText}>
          <Text style={styles.innerText}>
            {title.length > 1 ? title.slice(0, 1) : title}
          </Text>
          {title.length > 1 ? title.slice(1) : title}
        </Text>
      </View>
      <FlatList
        data={data}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({item, index}) => {
          const img = imageUrl + item?.poster_path;
          const name = item?.original_title;
          return (
            <Pressable
              key={index}
              onPress={() => navigation.navigate('MovieScreen', {item: item})}>
              <FastImage
                source={{uri: img}}
                resizeMode={FastImage.resizeMode.cover}
                style={styles.image}
              />
              <Text style={styles.name}>
                {name.length > 15 ? name.slice(0, 15) + '...' : name}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default AllMovieScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: n(15),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: n(100),
  },
  outerText: {color: 'white', fontSize: n(20), fontWeight: '500'},
  innerText: {color: theme.text},
  image: {
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_HEIGHT * 0.3,
    borderRadius: n(10),
  },
  name: {
    color: 'white',
    fontSize: n(15),
    fontWeight: '500',
    paddingTop: n(5),
    textAlign: 'center',
  },
  columnWrapper: {
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: n(15),
  },
});
