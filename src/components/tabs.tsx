import React from 'react';
import {  Text, ScrollView, TouchableOpacity } from 'react-native';
import { tailwind } from '../utils/tailwind';

const categories = ['STARTER', 'MAIN COURSE', 'DESSERT', 'SIDES'];

interface Props {
  active: string | null;
  onSelect: (category: string | null) => void;
  selectedCounts?: {
    Starter: number;
    'Main Course': number;
    Dessert: number;
    Sides: number;
  };
}

const Tabs = ({ active, onSelect }: Props) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tailwind('mb-4')}>
      <TouchableOpacity onPress={() => onSelect(null)} style={tailwind('mr-2')}>
        <Text style={tailwind(`px-4 py-2 rounded-full ${!active ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`)}>
          All
        </Text>
      </TouchableOpacity>
      {categories.map((cat, index) => (
        <TouchableOpacity key={index} onPress={() => onSelect(cat)} style={tailwind('mr-2')}>
          <Text style={tailwind(`px-4 py-2 rounded-full ${active === cat ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`)}>
            {cat}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Tabs;
