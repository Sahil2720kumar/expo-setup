import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

import 'react-native-gesture-handler';
import { HeaderButton } from '../../components/HeaderButton';
import CustomDrawerContent from '~/components/CustomDrawerContent';

const DrawerLayout = () => (
  <Drawer
    screenOptions={{
      drawerHideStatusBarOnOpen:true,
      headerTitleAlign:"center",
      headerTitleStyle:{
        fontWeight:"bold"
      },
      
      headerRight: () => (
        <>
          <Link href="/modal" asChild>
            <HeaderButton iconName="search" />
          </Link>
          <Link href="/modal" asChild>
            <HeaderButton iconName="shopping-cart" />
          </Link>
        </>
      ),
      headerTitle:"DropSquad"
    }}
  >
    <Drawer.Screen
      name="index"
      options={{
        headerTitle: 'DropSquad',
        drawerLabel: 'Home',
        drawerIcon: ({ size, color }) => <Ionicons name="home-outline" size={size} color={color} />,
        
      }}
    />
    <Drawer.Screen
      name="(tabs)"
      options={{
        headerTitle: 'Tabs',
        drawerLabel: 'Tabs',
        drawerIcon: ({ size, color }) => (
          <MaterialIcons name="border-bottom" size={size} color={color} />
        ),
      }}
    />
  </Drawer>
);

export default DrawerLayout;
