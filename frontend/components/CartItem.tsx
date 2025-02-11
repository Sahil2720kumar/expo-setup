import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Image } from './ui/image';
// import { Image } from 'react-native';
import { Text } from './ui/text';
import { Minus, Plus } from 'lucide-react-native';
import { Product } from '~/types';
import useCartStore from '~/store/cartStore';

type CartItemProps = {
  item: Product & { quantity: number; productColor?: string; productSize?: string };
};

const CartItem = ({ item }: CartItemProps) => {
  console.log('cartItem', item);

  const { addProduct, reduceProduct } = useCartStore();
  return (
    <View className=" w-full flex-row gap-3" style={{ aspectRatio: 1 / 0.4 }}>
      <View className="w-[34%] rounded-[5]">
        <Image
          resizeMode="cover"
          size="full"
          style={{ width: '100%', height: '100%' }}
          className="rounded-[5]"
          source={item.images ? { uri: item.images[0] } : require('./../assets/cloth.png')}
          alt="ProductImage"
        />
      </View>
      <View className="w-[60%] justify-between">
        <View className="gap-1.5">
          <Text size="lg" className="font-semibold text-black">
            {item.name}
          </Text>
          <Text className="text-[#888888]">{item.description}</Text>
          <Text className="text-[#888888]">Color: {item.productColor}</Text>
          <Text className="text-[#888888]">Size: {item.productSize}</Text>
        </View>
        <View className="w-full flex-row items-center justify-between pb-1 ">
          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => reduceProduct(item)}
              className="h-[24] w-[24] items-center justify-center rounded-[12] bg-[#F1F1F1]">
              <Minus size={16} color={'black'} />
            </TouchableOpacity>
            <Text className="font-semibold text-black">{item.quantity}</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => addProduct(item)}
              className="h-[24] w-[24] items-center justify-center rounded-[12] bg-[#F1F1F1]">
              <Plus size={16} color={'black'} />
            </TouchableOpacity>
          </View>
          <View className="items-center justify-end">
            <Text size="xl" className="font-bold text-[#F93C00]">
              ₹ {item.price}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItem;
