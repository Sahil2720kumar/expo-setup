import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import OrderTrackingBar from '~/components/OrderTrackingBar';
import { useCommonBreakPoints } from '~/utils/breakPoints';
import { ScrollView } from 'react-native-virtualized-view';
import { Text } from '~/components/ui/text';
import { ChevronLeft, Truck } from 'lucide-react-native';
import { Divider } from '~/components/ui/divider';
import OrderProductCard from '~/components/OrderProductCard';
import { router, useLocalSearchParams } from 'expo-router';
import { getOrderById } from '~/api/oders';
import useAuthStore from '~/store/authStore';
import { useQuery } from '@tanstack/react-query';
import { DisplayOrder, Order } from '~/types/order';

const OrderProductTrackingScreen = () => {
  const { orderId } = useLocalSearchParams();
  const { productId } = useLocalSearchParams();

  const { minWidth, marginAuto } = useCommonBreakPoints();
  const [currentStep, setCurrentStep] = useState(1);

  const incrementStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const decrementStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const { sessionUser, sessionToken } = useAuthStore();

  const {
    data: orderData,
    isLoading,
    error,
  } = useQuery<DisplayOrder>({
    queryKey: ['order', orderId, productId],
    queryFn: () => getOrderById(Number(orderId), Number(productId), sessionToken!),
  });

  useEffect(() => {
    const status = orderData?.orderItems?.[0]?.status;
    switch (status?.toLocaleLowerCase()) {
      case 'pending':
        setCurrentStep(0);
        break;
      case 'order confirmed':
        setCurrentStep(1);
        break;
      case 'shipped':
        setCurrentStep(2);
        break;
      case 'out for delivery':
        setCurrentStep(3);
        break;
      case 'delivered':
        setCurrentStep(4); // or any logic you prefer for cancelled orders
        break;
      default:
        setCurrentStep(0); // Default to step 0 if status is undefined or unknown
        break;
    }
  }, [orderData]);

  if (isLoading) {
    return (
      <View
        style={{
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{error.message}</Text>
      </View>
    );
  }

  // console.log(orderData,sessionUser);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingTop: 15,
        overflowX: 'hidden',
        // overflowY: 'scroll',
        maxWidth: 600,
        minWidth: minWidth,
        marginHorizontal: marginAuto,
      }} // Ensures scrolling when content overflows
      showsVerticalScrollIndicator={false}>
      <View className="gap-y-[18]">
        {/* TOP BUTTONS */}
        <View className=" mt-[14] flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.push('/(drawer)/orders')}
            className="flex-row gap-2">
            <ChevronLeft color={'black'} />
            <Text className="text-lg font-medium text-black">Back</Text>
          </TouchableOpacity>
          <View className="flex-row items-center justify-between gap-2"></View>
        </View>
        <View className="flex-row ">
          <View className="flex-1">
            <Text size="xl" className="font-bold text-black">
              Order ID: {orderData?.id}
            </Text>
          </View>
        </View>
        <View className="flex-row gap-8">
          <View className="flex-row gap-1.5">
            <Text>Order date:</Text>
            <Text>{orderData?.orderDate}</Text>
          </View>
          <View className="flex-1 flex-row gap-1">
            <Truck size={20} color={'#12B76A'} />
            <View className="flex-wrap items-start sm:flex-col md:flex-row">
              <Text className="text-[#12B76A]">Estimated delivery: </Text>
              <Text className="text-[#12B76A]">
                {orderData?.orderItems?.[0]?.deliveryDate || 'not assigned'}
              </Text>
            </View>
          </View>
        </View>
        <Divider className="bg-[#D0D5DD]" />
        <View>
          <OrderTrackingBar currentStep={currentStep} />
        </View>
        <View>
          <OrderProductCard
            product={orderData?.orderItems?.[0]?.product}
            price={orderData?.orderItems?.[0]?.price}
            quantity={orderData?.orderItems?.[0]?.quantity}
          />
        </View>
        <Divider />
        <View>
          <Text size="lg" className="font-semibold text-black">
            Delivery
          </Text>
          <Text size="sm">Address</Text>
          <Text className="text-[#888888] ">{orderData?.address?.street}</Text>
          <Text className="text-[#888888]">
            {orderData?.address?.zip} {orderData?.address?.city} {orderData?.address?.state}, India{' '}
          </Text>
          <Text className="text-[#888888]">{sessionUser?.phone || 'not assigned'}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderProductTrackingScreen;
