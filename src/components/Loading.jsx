import React from 'react';
import {StyleSheet, View} from 'react-native';
import * as Progress from 'react-native-progress';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../helpers/normalizer';
import {theme} from '../theme/colors';
const Loading = () => {
  return (
    <View style={styles.container}>
      <Progress.CircleSnail size={160} thickness={10} color={theme.text} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    left: 0,
    bottom: 10,
    backgroundColor: 'black',
  },
});
