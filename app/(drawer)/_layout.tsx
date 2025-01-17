import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import {
  Home,
  HomeIcon,
  LogOut,
  MapPin,
  PhoneIcon,
  Settings,
  Shirt,
  ShoppingCart,
  StarIcon,
  User,
} from 'lucide-react-native';

import 'react-native-gesture-handler';
import { HeaderButton } from '../../components/HeaderButton';

import CustomDrawerContent from '~/components/CustomDrawerContent';
import { Icon } from '~/components/ui/icon';

const DrawerLayout = () => (
  <Drawer
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={{
      drawerHideStatusBarOnOpen: true,
      headerTitleAlign: 'center',
      drawerActiveBackgroundColor: '#F1F1F1',
      drawerActiveTintColor: '#000000',
      // drawerIcon:({focused})=>{
      //   return(

      //   )
      // },
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
            <HeaderButton iconName="shopping-cart" />
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

export default DrawerLayout;
