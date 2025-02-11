import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ChevronRight, Package, Plus } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Platform, TouchableOpacity, View } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import { ScrollView } from 'react-native-virtualized-view';

import { getAddresses } from '~/api/addresses';
import { insertOrder } from '~/api/oders';
import { createPayment } from '~/api/payments';
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
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const {
    data: addresses = [],
    isLoading,
    error,
  } = useQuery<Address[]>({
    queryKey: ['shippingAddresses', sessionUser?.id],
    queryFn: () => getAddresses(sessionUser?.id!, sessionToken!),
  });

  const [selectedAddress, setSelectedAddress] = useState<number>(addresses?.[0]?.id || 1);

  //RAZORPAY CREATE ORDER
  const { mutate: createRazorpayOrder, isPending: razorpayIsPending } = useMutation({
    mutationFn: (data: number) => createPayment(data, sessionToken!),
    onSuccess(data) {
      console.log('✅ Order Created:', data); // 👈 Order created in backend
      if (data.razorpayOrderId) {
        handlePayment(data); // 🛒 Open Razorpay payment UI
      } else {
        console.log('Error', 'Failed to get Razorpay Order ID.');
        // setLoading(false);
      }
    },
    onError(error) {
      setIsCheckoutLoading(false)
      console.error('❌ Order Creation Failed', error);
    },
  });

  //BACKEND DB CREATE ORDER
  const { mutate: insertOrderToDb, isPending } = useMutation({
    mutationFn: (data: { order: Pick<Order, 'addressId'>; items: InsertOrderItem[] }) =>
      insertOrder(data, sessionUser?.id!, sessionToken!),
    onSuccess(data) {
      createRazorpayOrder(data.id);
      console.log('inserted order', data);
      // clearCart();
    },
    onError(error) {
      setIsCheckoutLoading(false)
      console.log('insert Failed', error);
    },
  });

  // ✅ Function to initiate Razorpay Payment
  const handlePayment = async (order) => {
    try {
      console.log('🔹 Opening Razorpay Payment Modal...', order);
      const options = {
        description: 'Order Payment',
        image: 'https://yourwebsite.com/logo.png',
        currency: 'INR',
        key: 'rzp_test_7gab4oSDkJm8bL', // Replace with Razorpay Key ID
        amount: order.totalAmount * 100, // Convert to paisa
        name: 'Dropsquad',
        order_id: order.razorpayOrderId, // ✅ Razorpay Order ID from backend
        prefill: {
          email: sessionUser?.email,
          contact: sessionUser?.phone,
          name: sessionUser?.name,
        },
        theme: { color: '#F93C00' },
      };

      // ✅ Open Razorpay Payment Modal
      const paymentResult = await RazorpayCheckout.open(options);

      if (paymentResult.razorpay_payment_id) {
        console.log('✅ Payment Success:', paymentResult);
        // Alert.alert("Success", "Payment successful!");
        clearCart();
        client.invalidateQueries({ queryKey: ['orders', sessionUser?.id] });
        setIsCheckoutLoading(false);
        router.push('/(drawer)/orders'); // Navigate to orders page
      } else {
        // Alert.alert("Payment Failed", "Something went wrong.");
      }
    } catch (error) {
      console.error('❌ Payment Error:', error);
      setIsCheckoutLoading(false)
      // Alert.alert("Payment Error", "Transaction failed.");
    }
  };

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
    setIsCheckoutLoading(true);

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
    insertOrderToDb({ order: insertedOrderData, items: insertedOrderItemsData });
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
            isDisabled={isCheckoutLoading}
            disabled={isCheckoutLoading}
            className="h-[48px] rounded-full bg-[#F93C00]"
            onPress={onCheckOut}
            >
            {isCheckoutLoading ? (
              <View className="flex-row gap-3">
                <ActivityIndicator color={'white'} />
                <ButtonText size="lg" className="uppercase ">
                  Loading...
                </ButtonText>
              </View>
            ) : (
              <>
                <Bag />
                <ButtonText className="uppercase">Checkout</ButtonText>
              </>
            )}
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
