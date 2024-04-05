import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {imageUrl} from '../constant/urls';
import n, {SCREEN_HEIGHT, SCREEN_WIDTH} from '../helpers/normalizer';

const Card = ({item, handleClick}) => {
  const img = imageUrl + item.poster_path;
  return (
    <TouchableOpacity onPress={() => handleClick(item)}>
      <Image
        source={{uri: img}}
        style={{
          width: SCREEN_WIDTH * 0.6,
          height: SCREEN_HEIGHT * 0.4,
          borderRadius: n(10),
        }}
      />
    </TouchableOpacity>
  );
};

export default Card;
