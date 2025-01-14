import { View, Dimensions } from 'react-native';
import React from 'react';
import { Text } from './ui/text';
import { Bag, SmileHeartIcon, SuccessIcon } from './Icons';
import { Divider } from './ui/divider';
import { Frown, Smile, X } from 'lucide-react-native';
import { Button, ButtonText } from './ui/button';
import { useBreakpointValue } from './ui/utils/use-break-point-value';

const PaymentSuccess = ({ screenHeight, isPaymentSuccessful, setIsPaymentSuccessful }) => {
  const iconSize = useBreakpointValue({
    default: 24,
    sm: 34,
    md: 34,
  });

  const screenDivisibleValue=useBreakpointValue({
    default: 2,
    sm: 2,
    md: 2,
    xl:2.5
  });
  const handleClose = () => {
    setIsPaymentSuccessful(false);
  };
  return (
    <View
      style={{
        flex: 1,
        position: 'absolute',
        top: -15,
        bottom: 0,
        left: -15,
        right: -15,
        backgroundColor: '#000',
        opacity: 0.9,
      }}>
      {/* Spacer to push the child view to the bottom */}
      <View style={{ flex: 1, backgroundColor: '' }} />
      <View
        style={{
          height: screenHeight / screenDivisibleValue,
          backgroundColor: '#fff',
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          paddingVertical: 30,
          paddingHorizontal: 15,
        }}>
        <View style={{ backgroundColor: '' }}>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <Text size="2xl" className="font-bold uppercase text-black">
              Payment success
            </Text>
            <X onPress={handleClose} size={iconSize} color={'black'} />
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: '' }}>
          <View
            style={{
              flex: 1.5,
              gap: 6,
              backgroundColor: '',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <SuccessIcon />
            <Text className="text-[#888888]">Payment ID: 24585471</Text>
          </View>
          <Divider />
          <View
            style={{
              flex: 1,
              backgroundColor: '',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}>
            <Text size="lg" className="mt-1.5 font-semibold text-black">
              Rate your purchase
            </Text>
            <View className="flex-row gap-6">
              <Frown color={'#888888'} size={34} />
              <Smile color={'#888888'} size={34} />
              <SmileHeartIcon />
            </View>
          </View>
          <View style={{ flex: 1, backgroundColor: '' }}>
            <View
              style={{
                backgroundColor: '',
                flexDirection: 'row',
                gap: 9,
                flex: 1,
                alignItems: 'flex-end',
              }}>
              <Button
                size="md"
                variant="outline"
                className="rounded-[28]"
                style={{ borderRadius: 28, height: 48, flex: 1 }}>
                <ButtonText numberOfLines={1} className="uppercase" size="lg">
                  Back to home
                </ButtonText>
              </Button>
              <Button
                size="md"
                variant="solid"
                className="rounded-[28] bg-[#F93C00]"
                style={{ borderRadius: 28, height: 48, flex: 1 }}>
                <ButtonText className="uppercase" size="lg">
                  submit
                </ButtonText>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PaymentSuccess;
