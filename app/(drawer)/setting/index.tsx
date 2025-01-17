import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ChevronRight, Minus, Package, Plus } from 'lucide-react-native';
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

export default function CheckoutScreen() {
  const { marginAuto, minWidth } = useCommonBreakPoints();

  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const calculatedHeight = screenHeight - 200; // Subtract 100px from screen height

  const cartItems = [1, 2, 3, 4, 5, 6];
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
            Setting
          </Text>
          <View className="gap-5">
            <Link href={`/(drawer)/setting/profile`} asChild>
              <TouchableOpacity activeOpacity={0.7} className="gap-0.5">
                <View className="flex-row items-center justify-between">
                  <Text className="text-lg font-semibold text-black">Profile</Text>
                  <ChevronRight color={'black'} size={20} />
                </View>
                <View className="mt-[10]">
                  <Text className=" text-[#888888]">New Fashion</Text>
                  <Text className="text-[#888888]">Support@newfashion.design</Text>
                  <Text className="text-[#888888]">(777) 121-8000</Text>
                </View>
              </TouchableOpacity>
            </Link>
            <Divider className="bg-[#F1F1F1]" />
            <Link href={`/(drawer)/setting/passwordChange`} asChild>
              <TouchableOpacity activeOpacity={0.7}  className="gap-0.5">
                <View className="flex-row items-center justify-between">
                  <Text className="text-lg font-semibold text-black">Password</Text>
                  <ChevronRight color={'black'} size={20} />
                </View>
                <View className="mt-[10]">
                  <Text className=" text-[#888888]">Change your password</Text>
                </View>
              </TouchableOpacity>
            </Link>
            <Divider className="bg-[#F1F1F1]" />
            <View className="gap-0.5" style={{ opacity: 0.5 }} pointerEvents="none">
              <Pressable className="flex-row items-center justify-between">
                <Text className="text-lg font-semibold text-black">Email Notifications</Text>
                <ChevronRight color={'black'} size={20} />
              </Pressable>
              <View className="mt-[10]">
                <Text className=" text-[#888888]">Unsubcribed to all</Text>
              </View>
            </View>
            <Divider className="bg-[#F1F1F1]" />
            <View className="gap-0.5" style={{ opacity: 0.5 }} pointerEvents="none">
              <View className="flex-row items-center justify-between">
                <Text className="text-lg font-semibold text-black">Push Notifications</Text>
                <ChevronRight color={'black'} size={20} />
              </View>
              <View className="mt-[10]">
                <Text className=" text-[#888888]">Unsubcribed to all</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
