import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import {getAPI} from '../api/api';
import Loading from '../components/Loading';
import MovieList from '../components/MovieList';
import {imageUrl, personApi, personMovieApi} from '../constant/urls';
import n from '../helpers/normalizer';
const PersonScreen = ({route}) => {
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);
  const [movie, setMovie] = useState([]);
  const [person, setPersonDetail] = useState([]);
  const [loading, setLoading] = useState(false);

  const personID = route.params.item;
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAPI(personApi(personID?.id));
        setPersonDetail(data?.data);
        const movieData = await getAPI(personMovieApi(personID?.id));
        setMovie(movieData?.data?.cast);
        setLoading(false);
      } catch (_) {}
    };
    fetchData();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}>
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
          <View style={styles.imageWrapper}>
            <Image
              source={{uri: imageUrl + person?.profile_path}}
              style={styles.image}
            />
          </View>
          <Text style={styles.name}>{person?.name}</Text>
          <Text style={styles.location}>{person?.place_of_birth}</Text>
          <View style={styles.profileContainer}>
            <View style={styles.wrapper1}>
              <Text style={styles.text1}>Gender</Text>
              <Text style={styles.text2}>
                {person?.gender === 1 ? 'Female' : 'Male'}
              </Text>
            </View>
            <View style={styles.wrapper1}>
              <Text style={styles.text1}>Birthday</Text>
              <Text style={styles.text2}>{person?.birthday}</Text>
            </View>
            <View style={styles.wrapper1}>
              <Text style={styles.text1}>Known for</Text>
              <Text style={styles.text2}>{person?.known_for_department}</Text>
            </View>
            <View style={styles.wrapper2}>
              <Text style={styles.text1}>Popularity</Text>
              <Text style={styles.text2}>{person?.popularity}</Text>
            </View>
          </View>
          <View style={styles.bioContainer}>
            <Text style={styles.bio}>Biography</Text>
            <Text style={styles.biodesc}>{person?.biography}</Text>
          </View>
          <MovieList title={'Movies'} hideall={true} data={movie} />
        </ScrollView>
      )}
    </>
  );
};

export default PersonScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: n(20),
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: n(15),
  },
  image: {
    height: 250,
    width: 250,
    borderRadius: 250 / 2,
  },
  name: {
    color: 'white',
    marginTop: n(15),
    fontSize: n(20),
    fontWeight: '600',
    textAlign: 'center',
  },
  location: {
    color: 'grey',
    fontSize: n(15),
    fontWeight: '500',
    textAlign: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: n(15),
    padding: n(15),
    marginHorizontal: n(5),
    borderRadius: n(35),
  },
  wrapper1: {
    alignItems: 'center',
    borderRadius: n(2),
    borderRightWidth: 2,
    borderColor: ' #F7F7FF',
    paddingRight: n(20),
  },
  wrapper2: {
    alignItems: 'center',
    borderRadius: n(2),
  },
  text1: {
    color: 'white',
    fontSize: n(15),
    fontWeight: '600',
  },
  text2: {
    color: 'white',
    fontSize: n(13),
    fontWeight: '400',
  },
  bio: {
    color: 'white',
    marginTop: n(15),
    fontSize: n(20),
    fontWeight: '600',
  },
  bioContainer: {
    padding: n(15),
  },
  biodesc: {
    marginTop: n(5),
    textAlign: 'justify',
    fontSize: n(15),
    fontWeight: '400',
    color: 'white',
  },
});
