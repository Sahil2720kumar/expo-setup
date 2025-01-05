import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { Button, ButtonIcon, ButtonText } from './ui/button';
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from './ui/drawer';
import { Avatar, AvatarFallbackText, AvatarImage } from './ui/avatar';
import { Divider } from './ui/divider';
import { Icon, StarIcon, PhoneIcon } from './ui/icon';
import { VStack } from './ui/vstack';
import { Text } from './ui/text';

export default function CustomDrawerContent() {
  const [showDrawer, setShowDrawer] = useState(false);
  return (
    <>
      <Button
        onPress={() => {
          setShowDrawer(true);
        }}>
        <ButtonText>Show Drawer</ButtonText>
      </Button>
      <Drawer
        isOpen={showDrawer}
        onClose={() => {
          setShowDrawer(false);
        }}>
        <DrawerBackdrop />
        <DrawerContent className="w-[270px] md:w-[300px]">
          <DrawerHeader className="flex-col justify-center gap-2">
            <Avatar size="2xl">
              <AvatarFallbackText>User Image</AvatarFallbackText>
              <AvatarImage
                source={{
                  uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                }}
              />
            </Avatar>
            <VStack className="items-center justify-center">
              <Text size="lg">User Name</Text>
              <Text size="sm" className="text-typography-600">
                abc@gmail.com
              </Text>
            </VStack>
          </DrawerHeader>
          <Divider className="my-4" />
          <DrawerBody contentContainerClassName="gap-2">
            <Pressable className="flex-row items-center gap-3 rounded-md p-2 hover:bg-background-50">
              {/* User is imported from 'lucide-react-native' */}
              <Icon as={User} size="lg" className="text-typography-600" />
              <Text>My Profile</Text>
            </Pressable>
            <Pressable className="flex-row items-center gap-3 rounded-md p-2 hover:bg-background-50">
              {/* Home is imported from 'lucide-react-native' */}
              <Icon as={Home} size="lg" className="text-typography-600" />
              <Text>Saved Address</Text>
            </Pressable>
            <Pressable className="flex-row items-center gap-3 rounded-md p-2 hover:bg-background-50">
              {/* ShoppingCart is imported from 'lucide-react-native' */}
              <Icon as={ShoppingCart} size="lg" className="text-typography-600" />
              <Text>Orders</Text>
            </Pressable>
            <Pressable className="flex-row items-center gap-3 rounded-md p-2 hover:bg-background-50">
              {/* Wallet is imported from 'lucide-react-native' */}
              <Icon as={Wallet} size="lg" className="text-typography-600" />
              <Text>Saved Cards</Text>
            </Pressable>
            <Pressable className="flex-row items-center gap-3 rounded-md p-2 hover:bg-background-50">
              <Icon as={StarIcon} size="lg" className="text-typography-600" />
              <Text>Review App</Text>
            </Pressable>
            <Pressable className="flex-row items-center gap-3 rounded-md p-2 hover:bg-background-50">
              <Icon as={PhoneIcon} size="lg" className="text-typography-600" />
              <Text>Contact Us</Text>
            </Pressable>
          </DrawerBody>
          <DrawerFooter>
            <Button className="w-full gap-2" variant="outline" action="secondary">
              <ButtonText>Logout</ButtonText>
              {/* LogOut is imported from 'lucide-react-native' */}
              <ButtonIcon as={LogOut} />
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
