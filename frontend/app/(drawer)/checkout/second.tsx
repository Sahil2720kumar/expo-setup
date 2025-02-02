import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ChevronRight, Package, Plus } from 'lucide-react-native';
import { useState } from 'react';
import { ActivityIndicator, Dimensions, Platform, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';

import { getAddresses } from '~/api/addresses';
import { insertOrder } from '~/api/oders';
import { Bag } from '~/components/Icons';
import PaymentSuccess from '~/components/PaymentSuccess';
import { Button, ButtonIcon, ButtonText } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import useAuthStore from '~/store/authStore';
import useCartStore from '~/store/cartStore';
import { Order, InsertOrderItem } from '~/types/order';
import { Address } from '~/types/user';
import { useCommonBreakPoints } from '~/utils/breakPoints';

export default function CheckoutScreen() {
  const client = useQueryClient();
  const router = useRouter();
  const { marginAuto, minWidth } = useCommonBreakPoints();
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const calculatedHeight = screenHeight - 200; // Subtract 100px from screen height
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const { sessionUser, sessionToken } = useAuthStore();
  const { products, clearCart } = useCartStore();
  const {
    data: addresses = [],
    isLoading,
    error,
  } = useQuery<Address[]>({
    queryKey: ['shippingAddresses', sessionUser?.id],
    queryFn: () => getAddresses(sessionUser?.id!, sessionToken!),
  });

  const [selectedAddress, setSelectedAddress] = useState<number>(addresses?.[0]?.id || 1);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { order: Pick<Order, 'addressId'>; items: InsertOrderItem[] }) =>
      insertOrder(data, sessionUser?.id!, sessionToken!),
    onSuccess(data) {
      console.log('inserted order', data);

      clearCart();
      client.invalidateQueries({ queryKey: ['orders', sessionUser?.id] });
      // client.invalidateQueries({ queryKey: ['shippingAddress', addressId] });
      router.push('/(drawer)/orders');
    },
    onError(error) {
      console.log('insert Failed', error);
      // setIsInvalid(true);
      // setMutateError(error.message);
    },
  });

  if (isLoading) {
    return (
      <View
        style={{
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const onCheckOut = () => {
    // setIsPaymentSuccessful(true);
    console.log(products);
    const insertedOrderData = {
      addressId: selectedAddress,
    };
    const insertedOrderItemsData = products.map((product) => {
      return {
        productId: product?.id,
        quantity: product.quantity,
      };
    });
    console.log(insertedOrderData, insertedOrderItemsData);
    mutate({ order: insertedOrderData, items: insertedOrderItemsData });
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingTop: 15,
        maxWidth: 600,
        minWidth,
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
            {addresses.map((address, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                style={{
                  opacity: selectedAddress === address?.id ? 0.9 : 1,
                  borderColor: 'black',
                  // borderBottomWidth: selectedAddress === index ? 1 : 0,
                  backgroundColor: selectedAddress === address?.id ? '#F0F4F8' : 'transparent', // Soft blue-gray
                  padding: 10, // Adds spacing for a cleaner look
                  borderRadius: 8, // Rounded corners for a modern feel
                }}
                onPress={() => setSelectedAddress(address?.id)}>
                <View className="flex-row items-center justify-between">
                  <Text className="text-black">Address {index + 1}</Text>
                  <ChevronRight size={20} />
                </View>
                <Text className="w-[70%] text-[#888888]">
                  {address.street} {address.city} {address.state} {address.zip}
                </Text>
              </TouchableOpacity>
            ))}
            {!addresses.length && (
              <Text className="text-lg font-bold">No shipping addresses available</Text>
            )}

            <Button
              size="md"
              variant="solid"
              action="secondary"
              onPress={() => router.push('/(drawer)/checkout/addAddress')}
              className="h-[48px] rounded-full bg-gray-200">
              <ButtonText className="text-left font-medium text-black">
                Add shipping address
              </ButtonText>
              <ButtonIcon as={Plus} className="text-black" />
            </Button>
          </View>

          <View className="gap-3">
            <Text className="font-semibold uppercase text-black">Payment method</Text>
            <Button
              size="md"
              variant="solid"
              action="secondary"
              className="h-[48px] rounded-full bg-gray-200">
              <ButtonText className="text-left font-medium text-black">
                Online payment method
              </ButtonText>
            </Button>
          </View>
        </View>

        <View id="view-2" className="gap-2 py-2">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Package size={20} color="black" />
              <Text className="text-black">Delivery</Text>
            </View>
            <Text className="text-black">Free</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="font-bold uppercase text-black">Est. Total</Text>
            <Text className="font-bold text-[#F93C00]">$179</Text>
          </View>

          <Button
            size="md"
            variant="solid"
            className="h-[48px] rounded-full bg-[#F93C00]"
            onPress={onCheckOut}>
            <Bag />
            <ButtonText className="uppercase">Checkout</ButtonText>
          </Button>
        </View>
      </View>

      {isPaymentSuccessful && (
        <PaymentSuccess
          screenHeight={screenHeight}
          isPaymentSuccessful={isPaymentSuccessful}
          setIsPaymentSuccessful={setIsPaymentSuccessful}
        />
      )}
    </ScrollView>
  );
}
