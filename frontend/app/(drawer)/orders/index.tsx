import { ActivityIndicator, Dimensions, View } from 'react-native';
import React from 'react';
import { useCommonBreakPoints } from '~/utils/breakPoints';
import { ScrollView } from 'react-native-virtualized-view';
import { Text } from '~/components/ui/text';
import OrderCard from '~/components/OrderCard';
import Footer from '~/components/Footer';
import { useQuery } from '@tanstack/react-query';
import useAuthStore from '~/store/authStore';
import { getAllOrders } from '~/api/oders';
import { DisplayOrder, Order } from '~/types/order';

const MyOrdersScreen = () => {
  const { minWidth, marginAuto } = useCommonBreakPoints();
  const screenHeight = Dimensions.get('window').height;
  const { sessionUser, sessionToken } = useAuthStore();

  const {
    data: ordersData=[],
    isLoading,
    error,
  } = useQuery<DisplayOrder[]>({
    queryKey: ['orders', sessionUser?.id],
    queryFn: () => getAllOrders(sessionToken!),
  });

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

  
  

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: 15,
        backgroundColor: 'white',
        minWidth,
        maxWidth: 600,
        marginHorizontal: marginAuto,
      }}
      showsVerticalScrollIndicator={false}>
      <View style={{ minHeight: screenHeight }}>
        <Text className="mb-4 text-2xl font-extrabold tracking-tight text-gray-900">
          Order History
        </Text>
        <Text className="mb-8 text-sm text-gray-500">
          Check the status of recent orders, manage returns, and discover similar products.
        </Text>
        {ordersData.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
        <View>
          <Footer/>
        </View>
      </View>
    </ScrollView>
  );
};

export default MyOrdersScreen;
