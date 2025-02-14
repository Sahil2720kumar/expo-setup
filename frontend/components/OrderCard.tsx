import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, Dimensions } from 'react-native';
import { CheckCircleIcon } from 'lucide-react-native'; // Install heroicons for React Native
import { Image } from './ui/image';
import { Link } from 'expo-router';
import { DisplayOrder } from '~/types/order';
 
// OrderCard Component
const OrderCard = ({ order }: { order: DisplayOrder }) => (
  <View className="mb-6 rounded-lg border-b border-t border-gray-200 bg-white shadow-sm">
    {/* Order Summary */}
    <View className="flex flex-row items-center border-b border-gray-200 p-4">
      <View className="flex-1 flex-row justify-between">
        <View>
          <Text className="font-medium text-gray-900">Order number</Text>
          <Text className="text-gray-500">{order.id}</Text>
        </View>
        <View>
          <Text className="font-medium text-gray-900">Date placed</Text>
          <Text className="text-gray-500">{order.orderDate}</Text>
        </View>
        <View>
          <Text className="font-medium text-gray-900">Total amount</Text>
          <Text className="font-medium text-gray-900">{order.totalAmount}</Text>
        </View>
      </View>
    </View>

    {/* Products List */}
    <View>
      <Text className="sr-only">Items</Text>
      {order.orderItems.map((item,index) => (
        <View key={index} className="flex flex-col p-4">
          <View className="flex flex-row items-start">
            <Image
              source={item.product.images ? { uri: item.product.images[0] } : require('./../assets/cloth.png')}
              resizeMode="cover"
              alt={item.product.name}
              className="h-24 w-20 max-w-20 rounded-lg bg-gray-200"
            />
            <View className="ml-4 flex-1">
              <Text className="font-medium text-gray-900">{item.product.name}</Text>
              <Text className="mt-0 text-gray-500">{item.product.description}</Text>
              <Text className="mt-1 text-gray-900">price: {item.price}  </Text>
              <Text className="text-gray-500 ">Qty: {item.quantity} size: {item.size} color: {item.color} </Text>
            </View>
          </View>

          <View className="mt-4 flex flex-row items-center">
            <CheckCircleIcon color="green" size={20} />
            <Text className="ml-2 text-sm text-gray-500">
              Delivered on <Text className="font-medium">{item.deliveryDate || 'not assigned'}</Text>
            </Text>
          </View>

          <View className="mt-4 flex flex-row justify-between">
            <Link href={`/orders/${item.orderId}?productId=${item.productId}`} asChild>
              <TouchableOpacity className="mr-2 flex-1 items-center rounded-lg bg-[#F93C00] px-4 py-2">
                <Text className="text-sm text-white">View product</Text>
              </TouchableOpacity>
            </Link>
            <Link href={`/products/${item.productId}`} asChild>
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
