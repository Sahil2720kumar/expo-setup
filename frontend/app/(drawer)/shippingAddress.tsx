import { useQuery } from '@tanstack/react-query';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pencil, Plus } from 'lucide-react-native';
import { ActivityIndicator, Dimensions, Platform, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { getAddresses } from '~/api/addresses';
import { Divider } from '~/components/ui/divider';
import { Text } from '~/components/ui/text';
import useAuthStore from '~/store/authStore';
import { Address } from '~/types/user';
import { useCommonBreakPoints } from '~/utils/breakPoints';

export default function ShippingAddressScreen() {
  const { sessionUser, sessionToken } = useAuthStore();
  const router = useRouter();
  const { marginAuto, minWidth } = useCommonBreakPoints();
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const calculatedHeight = screenHeight - 200; // Subtract 100px from screen height

  const {
    data: addresses=[],
    isLoading,
    error,
  } = useQuery<Address[]>({
    queryKey: ['shippingAddresses', sessionUser?.id],
    queryFn: () => getAddresses(sessionUser?.id!, sessionToken!),
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
            {addresses.map((address,index) => (
              <Link key={index} replace href={`/checkout/addAddress?id=${address.id}`} asChild>
                <TouchableOpacity activeOpacity={0.7} className="gap-0.5">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-black">Address {index+1}</Text>
                    <Pencil color={'black'} size={20} />
                  </View>
                  <Text className="w-[70%] text-[#888888]">
                    {address.street} {address.city} {address.state} {address.zip}
                  </Text>
                </TouchableOpacity>
              </Link>
            ))}
            {!addresses.length && (
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                No shipping addresses available
              </Text>
            )}

            <Divider className="bg-[#F1F1F1]" />
            <Link href={'/checkout/addAddress'} asChild>
              <TouchableOpacity
                activeOpacity={0.7}
                className="flex-row justify-between rounded-[28]">
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
