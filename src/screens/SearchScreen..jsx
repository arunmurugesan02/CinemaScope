import { useNavigation } from '@react-navigation/native';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getAPI } from '../api/api';
import { imageUrl, searchApi } from '../constant/urls';
import n, { SCREEN_HEIGHT, SCREEN_WIDTH } from '../helpers/normalizer';

const SearchScreen = () => {
  const [text, setText] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const [result, setResult] = useState(null);
  const navigation = useNavigation();
  const handleSearch = v => setText(v);
  const handleTextDebounce = useCallback(debounce(handleSearch, 500), []);

  useEffect(() => {
    const fetchData = async () => {
      if (![null, 0, undefined].includes(text)) {
        const data = await getAPI(searchApi(text));
        setResult(data?.data?.total_results);
        setSearchData(data?.data?.results);
      }
    };

    fetchData();
  }, [text]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search movie"
          placeholderTextColor="lightgray"
          style={styles.text}
        />
        <TouchableOpacity
          onPressIn={() => navigation.navigate('home')}
          style={{paddingRight: n(10)}}>
          <AntDesign name="closecircle" size={40} color={'grey'} />
        </TouchableOpacity>
      </View>
      <View style={styles.wrapper}>
        {searchData?.length > 0 && (
          <Text style={styles.resultText}>{`Result(${result})`}</Text>
        )}
        {result == 0 && !['', 0, null].includes(text) ? (
          <View style={styles.notFoundWrapper}>
            <FastImage
              style={styles.notFound}
              source={require('../../assets/images-removebg-preview.png')}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
        ) : (
          <FlatList
            data={searchData}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            renderItem={({item, index}) => {
              const img = imageUrl + item?.poster_path;
              const name = item?.original_title;
              return (
                <Pressable
                  key={index}
                  onPress={() =>
                    navigation.navigate('MovieScreen', {item: item})
                  }>
                  <FastImage
                    source={{uri: img}}
                    resizeMode={FastImage.resizeMode.contain}
                    style={styles.image}
                  />
                  <Text style={styles.name}>
                    {name.length > 10 ? name.slice(0, 15) + '...' : name}
                  </Text>
                </Pressable>
              );
            }}
          />
        )}
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: n(15),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'white',
    padding: n(2),
    borderRadius: n(30),
  },
  text: {
    color: 'white',
    paddingLeft: n(15),
    fontSize: n(15),
  },
  resultText: {
    color: 'white',
  },
  wrapper: {
    marginTop: n(15),
  },
  columnWrapper: {
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: n(15),
  },
  image: {
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_HEIGHT * 0.3,
    borderRadius: n(10),
  },
  notFoundWrapper: {
    // width: SCREEN_WIDTH,
    // height: SCREEN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFound: {
    width: SCREEN_WIDTH * 0.5,
    height: SCREEN_HEIGHT * 0.4,
    borderRadius: n(10),
  },
  name: {
    color: 'white',
    fontSize: n(15),
    fontWeight: '500',
    paddingTop: n(5),
    textAlign: 'center',
  },
});
