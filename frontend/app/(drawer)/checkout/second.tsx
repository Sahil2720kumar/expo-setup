import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ChevronRight, Minus, Package, Plus } from 'lucide-react-native';
import { useState } from 'react';
import { Dimensions, Platform, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-virtualized-view';
// import { ScrollView } from 'react-native';
import CartItem from '~/components/CartItem';
import { Bag } from '~/components/Icons';
import PaymentSuccess from '~/components/PaymentSuccess';

import { ScreenContent } from '~/components/ScreenContent';
import { Button, ButtonIcon, ButtonText } from '~/components/ui/button';
import { Image } from '~/components/ui/image';
import { Text } from '~/components/ui/text';
import { useBreakpointValue } from '~/components/ui/utils/use-break-point-value';
import { useCommonBreakPoints } from '~/utils/breakPoints';

export default function CheckoutScreen() {
  const router=useRouter()
  const {marginAuto,minWidth}=useCommonBreakPoints()
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const calculatedHeight = screenHeight - 200; // Subtract 100px from screen height
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  

  const cartItems = [1, 2, 3, 4, 5, 6];
  // <ScrollView
  //       contentContainerStyle={{ flexGrow: 1, backgroundColor: '#000000',maxWidth:600, marginHorizontal: marginAuto, }} // Ensures scrolling when content overflows
  //       showsVerticalScrollIndicator={false} // Optional: Hides scroll indicator
  //     ></ScrollView>
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
        position: 'relative',
      }} // Ensures scrolling when content overflows
      showsVerticalScrollIndicator={false} // Optional: Hides scroll indicator
      // className='max-w-[600] mx-auto'
    >
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <View
        className=""
        style={{
          paddingBottom: 3,
          backgroundColor: '',
          //   flex:1,
          //   justifyContent: 'flex-start',

          ...(Platform.OS === 'web' && {
            justifyContent: 'space-between', // Web-specific style
          }),
        }}>
        <View className="gap-8" style={{ height: calculatedHeight - 5, backgroundColor: '' }}>
          <Text size="2xl" className="text-center font-semibold uppercase text-black">
            Checkout
          </Text>
          <View className="gap-3 ">
            <Text className="font-semibold uppercase text-black">Shipping address</Text>
            <View className="gap-0.5">
              <View className="flex-row items-center justify-between">
                <Text className="text-black">Iris Watson</Text>
                <ChevronRight color={'black'} size={20} />
              </View>
              <Text className="w-[70%] text-[#888888]">
                606-3727 Ullamcorper. Street Roseville NH 11523
              </Text>
            </View>
            <Button
              size="md"
              variant="solid"
              action="secondary"
              onPress={()=>router.push("/(drawer)/checkout/addAddress")}
              className="justify-between rounded-[28] bg-[#F1F1F1] hover:bg-[#F1F1F1]"
              style={{ borderRadius: 28, height: 48 }}
              isHovered={false}>
              <ButtonText className="text-left font-medium text-black" size="md">
                Add shipping address
              </ButtonText>
              <ButtonIcon as={Plus} className="text-black" />
            </Button>
          </View>

          {/* Payment method */}
          <View className="gap-3">
            <Text className="font-semibold uppercase text-black">Payment method</Text>
            <Button
              size="md"
              variant="solid"
              action="secondary"
              className="justify-between rounded-[28] bg-[#F1F1F1] hover:bg-[#F1F1F1]"
              style={{ borderRadius: 28, height: 48 }}
              isHovered={false}>
              <ButtonText className="text-left font-medium text-black" size="md">
                Online payment method
              </ButtonText>
            </Button>
          </View>
        </View>
        <View
          className="w-full"
          style={{
            paddingVertical: 10,
            gap: 8,
            justifyContent: 'flex-end',
            backgroundColor: '',
          }}>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center justify-between gap-2">
              <Package size={20} color={'black'} />
              <Text className="text-black">Delivery</Text>
            </View>
            <Text className="text-black">Free</Text>
          </View>
          <View className="w-full flex-row justify-between">
            <Text size="lg" className="font-bold uppercase text-black ">
              Est. Total
            </Text>
            <Text size="lg" className="font-bold text-[#F93C00]">
              $179
            </Text>
          </View>

          <Button
            size="md"
            variant="solid"
            className="rounded-[28] bg-[#F93C00]"
            style={{ borderRadius: 28, height: 48 }}
            onPress={() => setIsPaymentSuccessful(true)}>
            <Bag />
            <ButtonText className="uppercase" size="lg">
              Checkout
            </ButtonText>
          </Button>
        </View>
      </View>
      {isPaymentSuccessful ? (
        <PaymentSuccess
          screenHeight={screenHeight}
          isPaymentSuccessful={isPaymentSuccessful}
          setIsPaymentSuccessful={setIsPaymentSuccessful}
        />
      ) : null}
    </ScrollView>
  );
}
