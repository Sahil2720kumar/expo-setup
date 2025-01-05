import { Stack } from 'expo-router';
import { ScrollView, View } from 'react-native';
import Carousel from '~/components/Carousel';

import { Container } from '~/components/Container';
import CustomDrawerContent from '~/components/CustomDrawerContent';
import { ScreenContent } from '~/components/ScreenContent';
import { Button, ButtonText } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function Home() {
  const carouselData = [
    { id: 1, title: 'Item 1', image: 'https://via.placeholder.com/300x200?text=Item+1' },
    { id: 2, title: 'Item 2', image: 'https://via.placeholder.com/300x200?text=Item+2' },
    { id: 3, title: 'Item 3', image: 'https://via.placeholder.com/300x200?text=Item+3' },
  ];
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }} // Ensures scrolling when content overflows
        showsVerticalScrollIndicator={false} // Optional: Hides scroll indicator
      >
        <View className="h-screen ">
          <Carousel data={carouselData} />
          </View>
        <View className="h-screen bg-pink-200">
          <Text>hello there</Text>
        </View>
      </ScrollView>
    </>
  );
}
