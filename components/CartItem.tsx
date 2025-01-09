import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Image } from './ui/image';
import { Text } from './ui/text';
import { Minus, Plus } from 'lucide-react-native';

const CartItem = () => {
  return (
    <View className="h-[150] w-full flex-row gap-3">
      <View className="w-[34%] rounded-[5]">
        <Image
          size="full"
          className="rounded-[5]"
          source={require('./../assets/cloth.png')}
          alt="ProductImage"
        />
      </View>
      <View className="w-[60%] justify-between">
        <View className="gap-1.5">
          <Text size="lg" className="font-semibold text-black">
            SHIRT
          </Text>
          <Text className="text-[#888888]">Short sleeve polo shirt</Text>
        </View>
        <View className="w-full flex-row items-center justify-between pb-1 ">
          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              activeOpacity={0.5}
              className="h-[24] w-[24] items-center justify-center rounded-[12] bg-[#F1F1F1]">
              <Minus size={16} color={'black'} />
            </TouchableOpacity>
            <Text className="font-semibold text-black">1</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              className="h-[24] w-[24] items-center justify-center rounded-[12] bg-[#F1F1F1]">
              <Plus size={16} color={'black'} />
            </TouchableOpacity>
          </View>
          <View className="items-center justify-end">
            <Text size="xl" className="font-bold text-[#F93C00]">
              $179
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItem;
