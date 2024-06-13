import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AllMovieScreen from '../screens/AllMovieScreen';
import HomeScreen from '../screens/HomeScreen';
import MovieScreen from '../screens/MovieScreen';
import PersonScreen from '../screens/PersonScreen';
import SearchScreen from '../screens/SearchScreen.';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    // <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="home"
        options={{headerShown: false}}
        component={HomeScreen}
      />
      <Stack.Screen
        name="MovieScreen"
        options={{headerShown: false}}
        component={MovieScreen}
      />
      <Stack.Screen
        name="AllMovieScreen"
        options={{headerShown: false}}
        component={AllMovieScreen}
      />
      <Stack.Screen
        name="PersonScreen"
        options={{headerShown: false}}
        component={PersonScreen}
      />
      <Stack.Screen
        name="SearchScreen"
        options={{headerShown: false}}
        component={SearchScreen}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default Navigation;
