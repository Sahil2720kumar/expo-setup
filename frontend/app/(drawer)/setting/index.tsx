import { Link } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { Dimensions, Platform, Pressable, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';

import { Divider } from '~/components/ui/divider';
import { Text } from '~/components/ui/text';
import useAuthStore from '~/store/authStore';
import { useCommonBreakPoints } from '~/utils/breakPoints';

export default function CheckoutScreen() {
  const { marginAuto, minWidth } = useCommonBreakPoints();
  const { height: screenHeight } = Dimensions.get('window');
  const calculatedHeight = screenHeight - 200; // Subtract 100px from screen height
  const { sessionUser } = useAuthStore();
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
            <Link href={`/(drawer)/setting/profile/${sessionUser?.id}`} asChild>
              <TouchableOpacity activeOpacity={0.7} className="gap-0.5">
                <View className="flex-row items-center justify-between">
                  <Text className="text-lg font-semibold text-black">Profile</Text>
                  <ChevronRight color={'black'} size={20} />
                </View>
                <View className="mt-[10]">
                  <Text className=" text-[#888888]">{sessionUser?.name}</Text>
                  <Text className="text-[#888888]">{sessionUser?.email}</Text>
                  <Text className="text-[#888888]">{sessionUser?.phone}</Text>
                </View>
              </TouchableOpacity>
            </Link>
            <Divider className="bg-[#F1F1F1]" />
            <Link href={`/(drawer)/setting/passwordChange`} asChild>
              <TouchableOpacity activeOpacity={0.7} className="gap-0.5">
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
