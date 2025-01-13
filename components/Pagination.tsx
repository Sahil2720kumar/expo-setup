import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from './ui/text';

const Pagination = () => {
  return (
    <View className="flex flex-row items-center gap-x-2">
      {/* Back Button */}
      <Pressable
        className="h-[40] w-[40] items-center justify-center rounded-full "
        onPress={() => console.log('Back')}>
        <ChevronLeft size={16} color="#888888" />
      </Pressable>

      {/* Page Numbers */}
      {[1, 2, 3, 4].map((item) => (
        <Pressable
          key={item}
          className="h-[40] w-[40] items-center justify-center rounded-full"
          style={{ backgroundColor: item === 1 ? '#F93C00' : '' }}
          onPress={() => console.log('Back')}>
          <Text style={{ color: item === 1 ? '#fff' : '#888888' }}>{item}</Text>
        </Pressable>
      ))}

      {/* Next Button */}
      <Pressable
        className="h-[40] w-[40] items-center justify-center rounded-full "
        onPress={() => console.log('Back')}>
        <ChevronRight size={16} color="#888888" />
      </Pressable>
    </View>
  );
};

export default Pagination;
