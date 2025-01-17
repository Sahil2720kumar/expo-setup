import React from 'react';
import { View, Text } from 'react-native';
import { CheckCircleIcon } from 'lucide-react-native';
import { useBreakpointValue } from './ui/utils/use-break-point-value';

interface OrderTrackingBarProps {
  currentStep: number;
}

const steps = ['Order Confirmed', 'Shipped', 'Out for Delivery', 'Delivered'];

export default function OrderTrackingBar({ currentStep }: OrderTrackingBarProps) {
  const paddingHorizontalValue=useBreakpointValue({
    default:"px-8",
    sm:"px-11",
    md:"px-11"
  })
  return (
    <View className='py-8'>
      <View className="mb-4 flex-row  justify-between">
        {steps.map((step, index) => (
          <View key={step} className="items-start">
            <Text className="text-xs font-medium text-center">{step}</Text>
          </View>
        ))}
      </View>
      <View className={`w-full  ${paddingHorizontalValue}`}>
        <View>
          {/* Steps labels */}

          {/* Progress bar */}
          <View className="relative h-2">
            <View className="absolute left-0 top-1/2 h-0.5 w-full bg-gray-200" />
            <View
              className="absolute left-0 top-1/2 h-0.5 bg-[#F93C00]"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />

            {/* Small dots */}
            {steps.map((step, index) => (
              <>
                <View
                  key={index}
                  className={`absolute top-0 h-5 w-5 rounded-full ${
                    index <= currentStep - 1 ? 'bg-[#F93C00]' : 'bg-gray-200'
                  }`}
                  style={{
                    left: `${(index / (steps.length - 1)) * 100}%`,
                    marginLeft: -4,
                    marginTop: -4,
                  }}
                />
              </>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
