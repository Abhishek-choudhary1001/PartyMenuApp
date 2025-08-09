import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Animated, Easing, Dimensions } from 'react-native';
import { tailwind } from '../utils/tailwind';
import type { Dish } from '../types';

interface Props {
  dish: Dish;
  onPress: () => void;
  onToggleSelect: () => void;
  isSelected: boolean;
  onOpenReadMore?: () => void;
}

export default function DishCard({
  dish,
  onPress,
  onToggleSelect,
  isSelected,
  onOpenReadMore
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.92,
        duration: 110,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 220,
        easing: Easing.bounce,
        useNativeDriver: true
      })
    ]).start();
  }, [isSelected, scale]); // ✅ scale is now included

  const iconSource =
    dish.type === 'VEG'
      ? require('../../assets/veg.png')
      : require('../../assets/nonveg.png');

  return (
    <Animated.View
      style={[
        tailwind('bg-white rounded-xl p-3 mb-3'),
        {
          transform: [{ scale }],
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowRadius: 6,
          elevation: 2
        }
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* Text + Buttons */}
        <View style={{ flex: 1, paddingRight: 8 }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onOpenReadMore ?? onPress}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={iconSource}
                style={{ width: 14, height: 14, marginRight: 8 }}
              />
              <Text style={tailwind('text-base font-semibold text-black')}>
                {dish.name}
              </Text>
            </View>
            <Text
              style={tailwind('text-sm text-gray-600 mt-2')}
              numberOfLines={2}
            >
              {dish.description}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onPress} style={{ marginTop: 10 }}>
            <Text style={tailwind('text-amber-600 font-medium')}>
              Ingredient
            </Text>
          </TouchableOpacity>
        </View>

        {/* Thumbnail */}
        <View
          style={{
            width: screenWidth > 400 ? 88 : 72, // Responsive image size
            alignItems: 'flex-end'
          }}
        >
          {dish.image ? (
            <Image
              source={{ uri: dish.image }}
              style={{
                width: screenWidth > 400 ? 88 : 72,
                height: screenWidth > 400 ? 88 : 72,
                borderRadius: 12
              }}
            />
          ) : (
            <View
              style={{
                width: screenWidth > 400 ? 88 : 72,
                height: screenWidth > 400 ? 88 : 72,
                borderRadius: 12,
                backgroundColor: '#eee'
              }}
            />
          )}

          {/* Add/Remove Button */}
          <View style={{ position: 'absolute', right: -6, bottom: -6 }}>
            <TouchableOpacity
              onPress={onToggleSelect}
              style={tailwind(
                `px-3 py-1 rounded-full ${
                  isSelected ? 'bg-red-500' : 'bg-emerald-500'
                }`
              )}
            >
              <Text style={tailwind('text-white text-sm')}>
                {isSelected ? 'Remove' : 'Add +'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}
