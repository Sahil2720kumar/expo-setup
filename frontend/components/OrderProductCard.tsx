import { View } from 'react-native';
import React from 'react';
import { Image } from './ui/image';
import { Text } from './ui/text';

const OrderProductCard = ({product,price ,quantity}) => {
  return (
    <View className="flex flex-col">
      {/* Product Details */}
      <View className="flex flex-row items-start">
        <Image
          source={product.images ? { uri: product.images[0] } : require('./../assets/cloth.png')}
          resizeMode="cover"
          alt={product.name}
          className="h-24 w-20 max-w-20 rounded-lg bg-gray-200"
        />
        <View className="ml-4 flex-1">
          <Text className="font-medium text-gray-900">{product.name}</Text>
          <Text className="mt-1 text-gray-500">{product.description}</Text>
          <View className="flex-row  gap-2">
            <Text className=" text-gray-500">price: {price}</Text>
            <Text className="text-gray-500 ">Qty: {quantity}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderProductCard;
