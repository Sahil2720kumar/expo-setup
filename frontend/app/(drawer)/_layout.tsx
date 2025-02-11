import { MaterialIcons } from '@expo/vector-icons';
import { Link, router, useNavigation, useSegments } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { HomeIcon, MapPin, PhoneIcon, Settings, Shirt, ShoppingCart } from 'lucide-react-native';

import 'react-native-gesture-handler';
import { HeaderButton } from '../../components/HeaderButton';

import CustomDrawerContent from '~/components/CustomDrawerContent';
import { Icon } from '~/components/ui/icon';
import React, { useEffect } from 'react';
import { Badge, BadgeText } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { VStack } from '~/components/ui/vstack';
import useCartStore from '~/store/cartStore';
import useAuthStore from '~/store/authStore';

const DrawerLayout = () => {
  const { sessionToken, sessionUser } = useAuthStore();
  const { items } = useCartStore();
  const segments = useSegments();
  //console.log('segments ', segments);
  const protectedRoutes = ['checkout', 'orders', 'setting', 'shippingAddress'];
  const isProtectedRoute = protectedRoutes.includes(segments[1]!);
  // console.log(isProtectedRoute, segments[1]);
  
  useEffect(() => {
    if (!sessionUser && !sessionToken && isProtectedRoute) {
      router.replace('/(drawer)/(auth)/signIn');
    }
  }, [sessionUser, sessionToken, isProtectedRoute, router]);

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        // drawerHideStatusBarOnOpen: true,
        headerTitleAlign: 'center',
        drawerActiveBackgroundColor: '#F1F1F1',
        drawerActiveTintColor: '#000000',
        drawerItemStyle: {
          borderRadius: 10,
        },
        drawerLabelStyle: {
          fontSize: 16,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerStyle: {
          width: 261,
        },
        headerRight: () => (
          <>
            <Link href="/cart" asChild>
              <HeaderButton iconName="search" />
            </Link>
            <Link href="/cart" asChild>
              <VStack className="relative mr-4">
                <Badge
                  className="absolute z-10 -mb-3.5 -mr-3.5 h-[22px] w-[22px] self-end rounded-full bg-red-600"
                  variant="solid">
                  <BadgeText className="text-white">{items}</BadgeText>
                </Badge>
                <Button
                  onPress={() => router.push('/cart')}
                  variant="solid"
                  action="secondary"
                  className="rounded-full bg-white p-0 px-2">
                  <ShoppingCart color={'black'} size={24} />
                </Button>
              </VStack>
            </Link>
          </>
        ),
        headerTitle: 'DropSquad',
      }}>
      <Drawer.Screen
        name="index"
        options={{
          headerTitle: 'DropSquad',
          drawerLabel: 'Home',
          drawerIcon: ({ size, color }) => (
            <Icon as={HomeIcon} size="xl" className="text-typography-600" color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="(auth)"
        // redirect={true}
        options={{
          headerTitle: 'auth',
          drawerLabel: 'auth',
          headerShown: false,
          drawerItemStyle: { display: 'none' },
          drawerIcon: ({ size, color }) => (
            <MaterialIcons name="border-bottom" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="checkout"
        options={{
          drawerItemStyle: { display: 'none' },
          drawerIcon: ({ size, color }) => (
            <Icon as={Shirt} size="xl" className="text-typography-600" color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="products"
        options={{
          drawerLabel: 'Products',
          drawerIcon: ({ size, color }) => (
            <Icon as={Shirt} size="xl" className="text-typography-600" color={color} />
          ),
        }}
        listeners={({ navigation }) => ({
          drawerItemPress: () => {
            // navigation.navigate('products'); // Navigate without parameters
            router.push("/(drawer)/products")
          },
        })}
      />
      {/* <Drawer.Screen
      name="setting/profile"
      options={{       
        drawerIcon: ({ size, color }) => (
          <Icon as={User} size="xl" className="text-typography-600" />
        ),
      }}
    /> */}
      <Drawer.Screen
        name="shippingAddress"
        options={{
          drawerLabel: 'Shipping Address',
          drawerIcon: ({ size, color }) => (
            <Icon as={MapPin} size="xl" className="text-typography-600" color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="orders"
        options={{
          drawerLabel: 'Orders',
          drawerIcon: ({ size, color }) => (
            <Icon as={ShoppingCart} size="xl" className="text-typography-600" color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="contact"
        options={{
          drawerLabel: 'Contact',
          drawerIcon: ({ size, color }) => (
            <Icon as={PhoneIcon} size="xl" className="text-typography-600" color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="setting"
        options={{
          drawerLabel: 'Setting',
          drawerItemStyle: { display: '' },
          drawerIcon: ({ size, color }) => (
            <Icon as={Settings} size="xl" className="text-typography-600" color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="cart"
        options={{
          drawerLabel: 'Setting',
          drawerItemStyle: { display: 'none' },
          drawerIcon: ({ size, color }) => (
            <Icon as={Settings} size="xl" className="text-typography-600" color={color} />
          ),
        }}
      />
    </Drawer>
  );
};
export default DrawerLayout;
