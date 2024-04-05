import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getAPI} from '../api/api';
import Loading from '../components/Loading';
import MovieList from '../components/MovieList';
import Trending from '../components/Trending';
import {topRatedMovies, trendingMovies, upcomingMovies} from '../constant/urls';
import n from '../helpers/normalizer';
import {color, theme} from '../theme/colors';

const HomeScreen = () => {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const trendingData = await getAPI(trendingMovies);
      setTrending(trendingData?.data?.results);
      const upcoming = await getAPI(upcomingMovies);
      setUpcoming(upcoming?.data?.results);
      const topRated = await getAPI(topRatedMovies);
      setTopRated(topRated?.data?.results);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <FontAwesome5 name="bars" color={color.WHITE} size={25} />
          </TouchableOpacity>
          <Text style={styles.outerText}>
            <Text style={styles.innerText}>C</Text>inemaScope
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
            <Ionicons name="search" color={color.WHITE} size={25} />
          </TouchableOpacity>
        </View>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Trending data={trending} />
            <MovieList title={'Upcoming'} data={upcoming} hideall={false} />
            <MovieList title={'Toprated'} data={topRated} hideall={false} />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: n(15),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: n(5),
    alignItems: 'center',
  },
  outerText: {
    color: 'white',
    fontSize: n(25),
    fontWeight: '500',
  },
  innerText: {
    color: theme.text,
  },
});
