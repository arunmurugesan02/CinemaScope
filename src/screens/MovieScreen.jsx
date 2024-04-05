import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import {getAPI} from '../api/api';
import Cast from '../components/Cast';
import {castApi, imageUrl, similarMoviesApi} from '../constant/urls';
import n, {SCREEN_WIDTH} from '../helpers/normalizer';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import {useScrollToTop} from '@react-navigation/native';

const MovieScreen = ({route, navigation}) => {
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isFavourite, toggleFavourite] = useState(false);
  const [loading, setLoading] = useState(false);
  const {item} = route.params;
  const movieImageUrl = imageUrl + item.poster_path;
  const ref = React.useRef(null);
  useScrollToTop(ref);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const castDetail = await getAPI(castApi(item?.id));
        setCast(castDetail?.data?.cast);
        const similar = await getAPI(similarMoviesApi(item?.id));
        setSimilarMovies(similar?.data?.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cast details:', error);
      }
    };
    fetchData();
  }, [item]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          ref={ref}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollViewWrapper}>
          <ImageBackground
            source={{uri: movieImageUrl}}
            style={styles.imageBackground}
            resizeMode="cover">
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back-outline" size={30} color={'white'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                <FontAwesome
                  name="heart"
                  size={30}
                  color={isFavourite ? 'red' : 'white'}
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <Text style={styles.date}>
            Released • {item.release_date} • 170 min
          </Text>
          <Text style={styles.type}> Action • Thrill • Comedy</Text>
          <Text style={styles.desc}>{item.overview}</Text>
          <Cast cast={cast} />
          <MovieList
            title={'Similar Movies'}
            hideall={true}
            data={similarMovies}
          />
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  scrollViewWrapper: {
    backgroundColor: 'black',
  },
  imageBackground: {
    width: SCREEN_WIDTH,
    height: n(450),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: n(20),
  },
  date: {
    color: 'white',
    textAlign: 'center',
    fontSize: n(18),
    fontWeight: '600',
    paddingTop: n(15),
  },
  desc: {
    color: 'white',
    fontSize: n(14),
    fontWeight: '500',
    marginHorizontal: n(15),
    paddingTop: n(15),
    textAlign: 'justify',
  },
  type: {
    color: 'white',
    fontSize: n(15),
    fontWeight: '600',
    textAlign: 'center',
    paddingTop: n(15),
  },
});

export default MovieScreen;
