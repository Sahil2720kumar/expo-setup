import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ChevronRight, Minus, Package, Pencil, Plus } from 'lucide-react-native';
import { useState } from 'react';
import { Dimensions, Platform, Pressable, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-virtualized-view';
// import { ScrollView } from 'react-native';
import CartItem from '~/components/CartItem';
import { Bag } from '~/components/Icons';
import PaymentSuccess from '~/components/PaymentSuccess';

import { ScreenContent } from '~/components/ScreenContent';
import { Button, ButtonIcon, ButtonText } from '~/components/ui/button';
import { Divider } from '~/components/ui/divider';
import { Image } from '~/components/ui/image';
import { Text } from '~/components/ui/text';
import { useBreakpointValue } from '~/components/ui/utils/use-break-point-value';
import { useCommonBreakPoints } from '~/utils/breakPoints';

export default function ShippingAddressScreen() {
  const router=useRouter()
  const { marginAuto, minWidth } = useCommonBreakPoints();
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const calculatedHeight = screenHeight - 200; // Subtract 100px from screen height

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
          ...(Platform.OS === 'web' && {
            justifyContent: 'space-between', // Web-specific style
          }),
        }}>
        <View className="gap-8" style={{ height: calculatedHeight - 5, backgroundColor: '' }}>
          <Text size="2xl" className="text-center font-semibold uppercase text-black">
            Shipping address
          </Text>
          <View className="gap-[19] ">
            <Text className="font-semibold uppercase text-black">Shipping address</Text>
            <Link replace href={'/checkout/addAddress'} asChild>
              <TouchableOpacity activeOpacity={0.7} className="gap-0.5">
                <View className="flex-row items-center justify-between">
                  <Text className="text-black">Iris Watson</Text>
                  <Pencil color={'black'} size={20} />
                </View>
                <Text className="w-[70%] text-[#888888]">
                  606-3727 Ullamcorper. Street Roseville NH 11523
                </Text>
              </TouchableOpacity>
            </Link>
            <Divider className="bg-[#F1F1F1]" />
            <Link href={'/checkout/addAddress'} asChild>
              <TouchableOpacity activeOpacity={0.7} className="flex-row justify-between rounded-[28]">
                <Text className="text-left font-medium font-semibold text-black" size="md">
                  Add shipping address
                </Text>
                <Plus size={24} color={'black'} />
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
