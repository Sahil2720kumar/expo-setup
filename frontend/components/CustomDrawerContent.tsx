import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Text } from './ui/text';
import { FlatList, Pressable, View } from 'react-native';
import { Image } from './ui/image';
import { Divider } from './ui/divider';
import { VStack } from './ui/vstack';
import {
  Home,
  HomeIcon,
  LogOut,
  MapPin,
  PhoneIcon,
  ShoppingCart,
  StarIcon,
  User,
} from 'lucide-react-native';
import { Icon } from './ui/icon';
import { ScrollView } from 'react-native-virtualized-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, ButtonIcon, ButtonText } from './ui/button';
import { Link, router } from 'expo-router';
import useAuthStore from '~/store/authStore';
import { memo } from 'react';

function CustomDrawerContent(props: any) {
  // console.log(props.navigation);
  const { top, bottom } = useSafeAreaInsets();
  const { sessionToken, sessionUser, clearSession } = useAuthStore();

  const handleAuth = (task: 'login' | 'logout') => {
    if (task === 'login') {
      router.push('/(drawer)/(auth)/signIn');
      return;
    }
    if (task === 'logout' || (sessionToken && sessionUser)) {
      clearSession();
    }
  };

  return (
    <View className="flex-1 p-6">
      <ScrollView {...props} style={{ backgroundColor: '', paddingTop: 10 + top }}>
        <View className="gap-1">
          <View className="items-center">
            <Image
              source={
                sessionUser?.profileImg
                  ? { uri: sessionUser.profileImg }
                  : require('assets/defaultUser.png')
              }
              alt="UserProfileImage"
              className="h-[138] w-[138] rounded-full"
            />
          </View>
          <VStack className="items-center justify-center">
            <Text size="xl" className="text-center">
              {sessionUser?.name}
            </Text>
            <Text size="lg" className="text-center text-typography-600">
              {sessionUser?.email}
            </Text>
          </VStack>
        </View>
        <Divider className="" style={{ marginVertical: 16 }} />
        <View>
          {/* <FlatList
            data={routes}
            className="gap-2"
            renderItem={({ item }) => (
              <Link asChild href={item.route}>
                <Pressable className="flex-row items-center gap-3 rounded-md p-2 hover:bg-background-50">
                  <Icon as={item.icon} size="lg" className="text-typography-600" />
                  <Text size="xl">{item.name}</Text>
                </Pressable>
              </Link>
            )}
          /> */}
          <DrawerItemList {...props} />
        </View>
      </ScrollView>
      <View style={{ paddingBottom: 10 + bottom }}>
        <Button
          onPress={() => {
            sessionToken && sessionUser ? handleAuth('logout') : handleAuth('login');
          }}
          className="w-full gap-2"
          variant="outline"
          action="secondary">
          <ButtonText>{sessionToken && sessionUser ? 'Logout' : 'Login'}</ButtonText>
          {/* LogOut is imported from 'lucide-react-native' */}
          <ButtonIcon as={LogOut} />
        </Button>
      </View>
    </View>
  );
}

export default memo(CustomDrawerContent);
