import { View } from 'react-native';
import React from 'react';
import { Image } from './ui/image';
import { Text } from './ui/text';

const OrderProductCard = () => {
  const product = {
    id: 'p1',
    name: 'Product 1',
    description: 'Description of product 1',
    price: '$40.00',
    imageSrc: 'https://via.placeholder.com/100',
  };
  return (
    <View className="flex flex-col">
      {/* Product Details */}
      <View className="flex flex-row items-start">
        <Image
          source={require('assets/cloth.png')}
          resizeMode="cover"
          alt={product.name}
          className="h-24 w-20 max-w-20 rounded-lg bg-gray-200"
        />
        <View className="ml-4 flex-1">
          <Text className="font-medium text-gray-900">{product.name}</Text>
          <Text className="mt-1 text-gray-500">{product.description}</Text>
          <View className="flex-row  gap-2">
            <Text className="mt-2 text-gray-900">{product.price}</Text>
            <Text className="text-gray-500 mt-2 ">Qty: 2</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderProductCard;
