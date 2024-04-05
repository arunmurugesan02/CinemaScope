import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import n, {SCREEN_HEIGHT} from '../helpers/normalizer';
import HomeScreen from '../screens/HomeScreen';
import {theme} from '../theme/colors';
import Navigation from './Navigation';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <DrawerContentScrollView {...props}>
        <View
          style={{flex: 1, justifyContent: 'space-between', display: 'flex'}}>
          <FastImage
            style={{height: SCREEN_HEIGHT * 0.2}}
            resizeMode={FastImage.resizeMode.contain}
            source={require('../../assets/CinemaScope_logo-removebg-preview.png')}
          />
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{backgroundColor: 'black', marginBottom: n(20)}}>
        <Pressable
          onPress={() => props.navigation.navigate('home')}
          style={{
            flexDirection: 'row',
            gap: n(10),
            marginHorizontal: n(15),
            paddingVertical: n(15),
          }}>
          <Ionicons name="exit-outline" size={22} color={'white'} />
          <Text style={{color: 'white', fontSize: n(15)}}>Sign out</Text>
        </Pressable>
      </View>
    </View>
  );
}

const MyDrawer = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerActiveBackgroundColor: theme.background,
          drawerActiveTintColor: 'black',
          drawerInactiveTintColor: '#fff',
          // drawerLabelStyle: {
          //   marginLeft: -25,
          //   fontFamily: 'Roboto-Medium',
          //   fontSize: 15,
          // },
        }}>
        <Drawer.Screen name="Home" component={Navigation} />
        <Drawer.Screen name="Trending" component={HomeScreen} />
        <Drawer.Screen name="Upcoming" component={HomeScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MyDrawer;
