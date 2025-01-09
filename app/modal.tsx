import { StatusBar } from 'expo-status-bar';
import { Minus, Plus } from 'lucide-react-native';
import { Dimensions, Platform, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-virtualized-view';
import CartItem from '~/components/CartItem';
import { Bag } from '~/components/Icons';

import { ScreenContent } from '~/components/ScreenContent';
import { Button, ButtonText } from '~/components/ui/button';
import { Image } from '~/components/ui/image';
import { Text } from '~/components/ui/text';
import { useBreakpointValue } from '~/components/ui/utils/use-break-point-value';

export default function Modal() {
  const { width, height: screenHeight } = Dimensions.get('window');
  const calculatedHeight = screenHeight - 200; // Subtract 100px from screen height

  const marginAuto = useBreakpointValue({
    default: '',
    sm: 'auto',
    md: 'auto',
  });
  const cartItems = [1, 2, 3, 4, 5, 6];
  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: '#fff',
          paddingHorizontal: 15,
          paddingTop:15,
          overflowX: 'hidden',
          maxWidth: 600,

          marginHorizontal: marginAuto,
        }} // Ensures scrolling when content overflows
        showsVerticalScrollIndicator={false} // Optional: Hides scroll indicator
        // className='max-w-[600] mx-auto'
      >
        <View className="" style={{ height: calculatedHeight + 130,justifyContent:"space-between"}}>
          <View className="gap-6" style={{ height: calculatedHeight-50 }}>
            <Text size="2xl" className="font-semibold text-black">
              CART
            </Text>
            <FlatList
              data={cartItems}
              renderItem={({ item }) => <CartItem key={item} />}
              contentContainerClassName="gap-6"
              scrollEnabled
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View className="w-full gap-3.5 " style={{height:154,gap:14}}>
            <View className="w-full flex-row justify-between">
              <Text size="xl" className="font-bold text-black ">
                SUB TOTAL
              </Text>
              <Text size="xl" className="font-bold text-[#F93C00]">
                $179
              </Text>
            </View>
            <Text className="w-[269] text-[#888888]">
              *shipping charges, taxes and discount codes are calculated at the time of accounting.
            </Text>

            <Button size="md" variant="solid" className='bg-[#F93C00] rounded-[28]' style={{borderRadius:28,height:48}}>
              <Bag/>
              <ButtonText size='lg'>BUY NOW</ButtonText>
            </Button>
          </View>
        </View>
      </ScrollView>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </>
  );
}
