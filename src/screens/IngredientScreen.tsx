import React from 'react';
import { View, Text, FlatList, Image, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import { tailwind } from '../utils/tailwind';
import { useRoute, RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';
import dishes from '../data/dishes.json';
import type { Dish } from '../types';

type R = RouteProp<RootStackParamList, 'Ingredient'>;

const { width } = Dimensions.get('window');

export default function IngredientScreen() {
  const route = useRoute<R>();
  const dish = (dishes as Dish[]).find(d => d.id === route.params.dishId);

  if (!dish) {
    return (
      <SafeAreaView style={tailwind('flex-1 justify-center items-center bg-white')}>
        <Text style={tailwind('text-lg text-gray-600')}>Dish not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={tailwind('flex-1 bg-white')}>
      <ScrollView contentContainerStyle={tailwind('p-4')}>
        <View style={{ flexDirection: width > 600 ? 'row' : 'column', alignItems: 'flex-start' }}>
          {/* Left side - text */}
          <View style={{ flex: 1 }}>
            <Text style={tailwind('text-2xl font-semibold')}>{dish.name}</Text>
            <Text style={tailwind('text-sm text-gray-600 mt-2')}>{dish.description}</Text>

            <Text style={tailwind('text-lg font-medium mt-4')}>Ingredients</Text>
            <FlatList
              data={dish.ingredients || []}
              keyExtractor={(_, i) => i.toString()}
              scrollEnabled={false} // So FlatList doesn't scroll inside ScrollView
              renderItem={({ item }) => (
                <Text style={tailwind('text-base text-gray-700 mt-2')}>• {item}</Text>
              )}
            />
          </View>

          {/* Right side - image */}
          {dish.image ? (
            <Image
              source={{ uri: dish.image }}
              style={{
                width: width > 600 ? 200 : '100%',
                height: width > 600 ? 200 : 200,
                borderRadius: 12,
                marginLeft: width > 600 ? 16 : 0,
                marginTop: width > 600 ? 0 : 16
              }}
              resizeMode="cover"
            />
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
