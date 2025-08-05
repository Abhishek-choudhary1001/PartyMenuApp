import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { tailwind } from '../utils/tailwind';
import { Dish } from '../types';

interface Props {
  dish: Dish;
  onPress: () => void;
  onToggleSelect: () => void;
  isSelected: boolean;
}

const DishCard = ({ dish, onPress, onToggleSelect, isSelected }: Props) => {
  const iconSource =
    dish.type === 'VEG'
      ? require('../../assets/veg.png')
      : require('../../assets/nonveg.png');

  return (
    <View style={tailwind('flex-row items-center p-4 mb-2 bg-gray-100 rounded justify-between')}>
      {/* Dish Thumbnail */}
      {dish.image && (
        <Image
          source={{ uri: dish.image }}
          style={{ width: 60, height: 60, borderRadius: 8, marginRight: 12 }}
        />
      )}

      {/* Dish Info */}
      <TouchableOpacity onPress={onPress} style={tailwind('flex-1')}>
        <View style={tailwind('flex-row items-center mb-1')}>
          <Image source={iconSource} style={{ width: 14, height: 14, marginRight: 6 }} />
          <Text style={tailwind('text-base font-semibold text-black')}>{dish.name}</Text>
        </View>
        <Text style={tailwind('text-sm text-gray-600')}>
          {dish.category.name}
        </Text>
      </TouchableOpacity>

      {/* Add/Remove Button */}
      <TouchableOpacity
        onPress={onToggleSelect}
        style={tailwind(
          `ml-4 px-3 py-1 rounded ${
            isSelected ? 'bg-red-500' : 'bg-green-500'
          }`
        )}
      >
        <Text style={tailwind('text-white text-sm')}>
          {isSelected ? 'Remove' : 'Add'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DishCard;
