import { Dimensions, View } from 'react-native';
import React from 'react';
import { useCommonBreakPoints } from '~/utils/breakPoints';
import { ScrollView } from 'react-native-virtualized-view';
import { Text } from '~/components/ui/text';
import OrderCard from '~/components/OrderCard';
import Footer from '~/components/Footer';

const MyOrdersScreen = () => {
  const { minWidth, marginAuto } = useCommonBreakPoints();
  const screenHeight = Dimensions.get('window').height;

  const orders = [
    {
      number: '12345',
      createdDate: '2025-01-12',
      createdDatetime: '2025-01-12T10:00:00Z',
      total: '$120.00',
      products: [
        {
          id: 'p1',
          name: 'Product 1',
          description: 'Description of product 1',
          price: '$40.00',
          imageSrc: 'https://via.placeholder.com/100',
        },
        {
          id: 'p2',
          name: 'Product 2',
          description: 'Description of product 2',
          price: '$80.00',
          imageSrc: 'https://via.placeholder.com/100',
        },
      ],
      deliveredDate: '2025-01-14',
      deliveredDatetime: '2025-01-14T12:00:00Z',
    },
    {
      number: '123456',
      createdDate: '2025-01-12',
      createdDatetime: '2025-01-12T10:00:00Z',
      total: '$120.00',
      products: [
        {
          id: 'p1',
          name: 'Product 1',
          description: 'Description of product 1',
          price: '$40.00',
          imageSrc: 'https://via.placeholder.com/100',
        },
      ],
      deliveredDate: '2025-01-14',
      deliveredDatetime: '2025-01-14T12:00:00Z',
    },
    {
      number: '1234567',
      createdDate: '2025-01-12',
      createdDatetime: '2025-01-12T10:00:00Z',
      total: '$120.00',
      products: [
        {
          id: 'p1',
          name: 'Product 1',
          description: 'Description of product 1',
          price: '$40.00',
          imageSrc: 'https://via.placeholder.com/100',
        },
        {
          id: 'p2',
          name: 'Product 2',
          description: 'Description of product 2',
          price: '$80.00',
          imageSrc: 'https://via.placeholder.com/100',
        },
        {
          id: 'p3',
          name: 'Product 2',
          description: 'Description of product 2',
          price: '$80.00',
          imageSrc: 'https://via.placeholder.com/100',
        },
      ],
      deliveredDate: '2025-01-14',
      deliveredDatetime: '2025-01-14T12:00:00Z',
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: 15,
        backgroundColor: 'white',
        minWidth,
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
        {orders.map((order) => (
          <OrderCard key={order.number} order={order} />
        ))}
        <View>
          <Footer/>
        </View>
      </View>
    </ScrollView>
  );
};

export default MyOrdersScreen;
