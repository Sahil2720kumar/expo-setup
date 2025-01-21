import { TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import OrderTrackingBar from '~/components/OrderTrackingBar';
import { useCommonBreakPoints } from '~/utils/breakPoints';
import { ScrollView } from 'react-native-virtualized-view';
import { Text } from '~/components/ui/text';
import { ChevronLeft, Truck } from 'lucide-react-native';
import { Divider } from '~/components/ui/divider';
import OrderProductCard from '~/components/OrderProductCard';
import { router } from 'expo-router';

const OrderProductTrackingScreen = () => {
  const { minWidth, marginAuto } = useCommonBreakPoints();
  const [currentStep, setCurrentStep] = useState(1);

  const incrementStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const decrementStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

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
              Order ID: 3354654654526
            </Text>
          </View>
        </View>
        <View className="flex-row gap-8">
          <View className="flex-row gap-1.5">
            <Text>Order date:</Text>
            <Text>Feb 16, 2022</Text>
          </View>
          <View className="flex-1 flex-row gap-1">
            <Truck size={20} color={'#12B76A'} />
            <View className="sm:flex-col md:flex-row flex-wrap items-start">
              <Text className="text-[#12B76A]">Estimated delivery: </Text>
              <Text className="text-[#12B76A]">May 16, 2022</Text>
            </View>
          </View>
        </View>
        <Divider className="bg-[#D0D5DD]" />
        <View>
          <OrderTrackingBar currentStep={currentStep} />
        </View>
        <View>
          <OrderProductCard />
        </View>
        <Divider />
        <View>
          <Text size="lg" className="font-semibold text-black">
            Delivery
          </Text>
          <Text size="sm">Address</Text>
          <Text className="text-[#888888] ">847 Jewess Bridge Apt.</Text>
          <Text className="text-[#888888]">174 London, UK</Text>
          <Text className="text-[#888888]">474-769-3919</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderProductTrackingScreen;
