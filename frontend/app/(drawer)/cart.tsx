import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Minus, Plus } from 'lucide-react-native';
import { Dimensions, Platform, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-virtualized-view';
// import { ScrollView } from 'react-native';
import CartItem from '~/components/CartItem';
import { Bag } from '~/components/Icons';

import { ScreenContent } from '~/components/ScreenContent';
import { Button, ButtonText } from '~/components/ui/button';
import { Image } from '~/components/ui/image';
import { Text } from '~/components/ui/text';
import { useBreakpointValue } from '~/components/ui/utils/use-break-point-value';
import useCartStore from '~/store/store';
import { useCommonBreakPoints } from '~/utils/breakPoints';

export default function CartScreen() {
  const router=useRouter()
  const {marginAuto,minWidth}=useCommonBreakPoints()
  const {products:cartItems,addProduct,reduceProduct,totalPrice}=useCartStore()

  const { width, height: screenHeight } = Dimensions.get('window');
  const calculatedHeight = screenHeight - 200; // Subtract 100px from screen height
  
  const onHandleClick=()=>{
    router.push("/(drawer)/checkout")
  }
  

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
      // className='max-w-[600] mx-auto'
      style={{ height: screenHeight }}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

      <View
        className=""
        style={{
          paddingBottom: 3,
          //backgroundColor:"pink",
          flex:1,
          justifyContent: 'flex-start',
          ...(Platform.OS === 'web' && {
            justifyContent: 'space-between', // Web-specific style
          }),
        }}>
        <View className="gap-6" style={{ height: calculatedHeight-5, backgroundColor: '' }}>
          <Text size="2xl" className="font-semibold text-black">
            CART
          </Text>
          <View className="flex-1 justify-center">
            <FlatList
              data={cartItems.slice(0,5)}
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
          style={{ paddingVertical:10, gap: 4, justifyContent: 'flex-end', backgroundColor: '' }}>
          <View className="w-full flex-row justify-between">
            <Text size="xl" className="font-bold text-black ">
              SUB TOTAL
            </Text>
            <Text size="xl" className="font-bold text-[#F93C00]">
            ₹ {totalPrice.toFixed(2)}
            </Text>
          </View>
          <Text className="w-[269] text-[#888888]">
            *shipping charges, taxes and discount codes are calculated at the time of accounting.
          </Text>
         
          <Button
            onPress={()=>router.push("/(drawer)/checkout")}
            size="md"
            variant="solid"
            className="rounded-[28] bg-[#F93C00]"
            style={{ borderRadius: 28, height: 48 }}
            >
            <Bag />
            <ButtonText size="lg">BUY NOW</ButtonText>
          </Button>
          {/* <Text onPress={()=>console.log("ok")}>Press me</Text> */}
        </View>
      </View>
    </ScrollView>
  );
}
