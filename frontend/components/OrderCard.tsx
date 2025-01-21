import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, Dimensions } from 'react-native';
import { CheckCircleIcon } from 'lucide-react-native'; // Install heroicons for React Native
import { Image } from './ui/image';
import { Link } from 'expo-router';

// OrderCard Component
const OrderCard = ({ order }) => (
  <View className="mb-6 rounded-lg border-b border-t border-gray-200 bg-white shadow-sm">
    {/* Order Summary */}
    <View className="flex flex-row items-center border-b border-gray-200 p-4">
      <View className="flex-1 flex-row justify-between">
        <View>
          <Text className="font-medium text-gray-900">Order number</Text>
          <Text className="text-gray-500">{order.number}</Text>
        </View>
        <View>
          <Text className="font-medium text-gray-900">Date placed</Text>
          <Text className="text-gray-500">{order.createdDate}</Text>
        </View>
        <View>
          <Text className="font-medium text-gray-900">Total amount</Text>
          <Text className="font-medium text-gray-900">{order.total}</Text>
        </View>
      </View>
    </View>

    {/* Products List */}
    <View>
      <Text className="sr-only">Items</Text>
      {order.products.map((product) => (
        <View key={product.id} className="flex flex-col p-4">
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
              <Text className="mt-2 text-gray-900">{product.price}</Text>
              <Text className="text-gray-500 ">Qty: 2</Text>
            </View>
          </View>

          {/* Delivery Info */}
          <View className="mt-4 flex flex-row items-center">
            <CheckCircleIcon color="green" size={20} />
            <Text className="ml-2 text-sm text-gray-500">
              Delivered on <Text className="font-medium">{product.deliveredDate}</Text>
            </Text>
          </View>

          {/* Action Buttons */}
          <View className="mt-4 flex flex-row justify-between">
            <Link href={`/orders/${product.id}`} asChild>
              <TouchableOpacity className="mr-2 flex-1 items-center rounded-lg bg-[#F93C00] px-4 py-2">
                <Text className="text-sm text-white">View product</Text>
              </TouchableOpacity>
            </Link>
            <Link href={`/products/${product.id}`} asChild>
              <TouchableOpacity className="ml-2 flex-1 items-center rounded-lg bg-gray-200 px-4 py-2">
                <Text className="text-sm text-[#00000]">Buy again</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      ))}
    </View>
  </View>
);

export default OrderCard;
