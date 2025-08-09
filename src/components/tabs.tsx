import React from 'react';
import { View, TouchableOpacity, Text, ScrollView, Dimensions } from 'react-native';
import { tailwind } from '../utils/tailwind';

interface Props {
  active: string | null;
  onSelect: (cat: string | null) => void;
  selectedCounts?: Record<string, number>;
}

const CATEGORIES = ['Starter', 'Main Course', 'Dessert', 'Sides'];

export default function Tabs({ active, onSelect, selectedCounts }: Props) {
  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={tailwind('mb-3')}
      contentContainerStyle={{ paddingHorizontal: 16 }}
    >
      <View style={{ flexDirection: 'row' }}>
        {CATEGORIES.map((cat) => {
          const isActive = active === cat;
          const count = selectedCounts?.[cat] ?? 0;

          return (
            <TouchableOpacity
              key={cat}
              onPress={() => onSelect(isActive ? null : cat)}
              style={[
                tailwind(
                  `px-3 py-2 rounded-full mr-3 ${
                    isActive ? 'bg-amber-500' : 'bg-gray-200'
                  }`
                ),
                {
                  minWidth: screenWidth > 350 ? 84 : 72,
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              ]}
              activeOpacity={0.85}
            >
              <Text
                style={tailwind(
                  isActive
                    ? 'text-white font-semibold text-xs'
                    : 'text-black text-xs'
                )}
              >
                {cat}
                {count > 0 && ` (${count})`}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}
