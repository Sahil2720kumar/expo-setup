import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {  Package } from 'lucide-react-native';
import { Dimensions, Platform, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-virtualized-view';
// import { ScrollView } from 'react-native';
import CartItem from '~/components/CartItem';
import { Bag } from '~/components/Icons';

import { Button, ButtonText } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import useCartStore from '~/store/store';
import { useCommonBreakPoints } from '~/utils/breakPoints';

export default function CheckoutScreen() {
  const {products:cartItems,addProduct,reduceProduct,totalPrice}=useCartStore()


  
  const router=useRouter()
  const {marginAuto,minWidth}=useCommonBreakPoints()
  const { width, height: screenHeight } = Dimensions.get('window');
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
      }} // Ensures scrolling when content overflows
      showsVerticalScrollIndicator={false} // Optional: Hides scroll indicator
      >
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

      <View
        className=""
        style={{
          paddingBottom: 3,
          backgroundColor:"",
        //   flex:1,
        //   justifyContent: 'flex-start',
          ...(Platform.OS === 'web' && {
            justifyContent: 'space-between', // Web-specific style
          }),
        }}>
        <View className="gap-6" style={{ height: calculatedHeight-5, backgroundColor: '' }}>
          <Text size="2xl" className="font-semibold text-black uppercase text-center">
          Checkout
          </Text>
          <View className="flex-1 justify-center">
            <FlatList
              data={cartItems.slice(0, 5)}
              renderItem={({ item }) => <CartItem key={item.id} item={item} />}
              contentContainerClassName="gap-6"
              scrollEnabled
              showsVerticalScrollIndicator={false}
            />
            {/* <Text size='lg' className='text-[#888888] text-center'>You have no items in your Shopping Bag.</Text> */}
          </View>
        </View>
        <View
          className="w-full"
          style={{ paddingVertical:10,gap: 8, justifyContent: 'flex-end', backgroundColor: '' }}>
          <View className='flex-row items-center justify-between'>
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
            ₹ {totalPrice.toFixed(2)}
            </Text>
          </View>

          <Button
            size="md"
            onPress={()=>router.push("/(drawer)/checkout/second")}
            variant="solid"
            className="rounded-[28] bg-[#F93C00]"
            style={{ borderRadius: 28, height: 48 }}>
            <Bag />
            <ButtonText className='uppercase' size="lg">Checkout</ButtonText>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
