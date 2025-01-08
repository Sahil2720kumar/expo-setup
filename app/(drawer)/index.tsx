import { Stack } from 'expo-router';
import { Dimensions, View, FlatList, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
// import { ScrollView } from 'react-native';
import Carousel from '~/components/Carousel';

import ProductCategoryTabs from '~/components/ProductCategoryTabs';
import ProductSliderCard from '~/components/ProductSliderCard';
import { Icon } from '~/components/ui/icon';
import { Text } from '~/components/ui/text';
import { ListChecks, Truck, UserRoundCheck } from 'lucide-react-native';
import Footer from '~/components/Footer';

export default function Home() {
  const screenHeight = Dimensions.get('window').height;
  const calculatedHeight = screenHeight - 100; // Subtract 100px from screen height
  const calculatedAdditionalHeight=screenHeight+100
  const carouselData = [
    { id: 1, title: 'Item 1', image: 'https://via.placeholder.com/300x200?text=Item+1' },
    { id: 2, title: 'Item 2', image: 'https://via.placeholder.com/300x200?text=Item+2' },
    { id: 3, title: 'Item 3', image: 'https://via.placeholder.com/300x200?text=Item+3' },
  ];
  const sliderData = [1, 2, 34, 4, 5];
  const tags = [
    '#2023',
    '#summer',
    '#collection',
    '#jeans',
    'jeans',
    '#shirt',
    '#shoes',
    '#dropsquad',
  ];

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff' }} // Ensures scrolling when content overflows
        showsVerticalScrollIndicator={false} // Optional: Hides scroll indicator
      >
        {/* CAROUSEL SECTION */}
        <View className="h-screen" style={{ height: calculatedHeight }}>
          <Carousel data={carouselData} buttonVisible={true} height={"90%"} />
        </View>

        {/* PRODUCT CATEGORY TABS */}
        <View className="h-screen">
          <Text className="text-center text-2xl font-semibold text-black">NEW ONES</Text>
          <ProductCategoryTabs />
        </View>

        {/* JUST FOR CUSTOMERS SECTION  */}
        <View className="mt-10 h-screen" style={{ height: calculatedHeight }}>
          <Text className="text-center text-2xl font-semibold text-black">JUST FOR YOU</Text>
          <View >
            <FlatList
              data={sliderData}
              renderItem={({ item }) => <ProductSliderCard width={227} height={314} imageHeight='86%'/>}
              horizontal
              contentContainerClassName="gap-4 px-4"
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <Text className="mt-16 text-center text-2xl font-semibold text-black">@TRENDING</Text>
          <View className="mt-5 flex-row flex-wrap gap-3 p-4">
            {tags.map((tag, index) => (
              <TouchableOpacity
                activeOpacity={0.5}
                key={index}
                className="rounded-full bg-[#F1F1F1] px-3 py-1 text-sm text-white">
                <Text className="text-black">{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* DropSquad Services Section */}
        <View className="h-screen" style={{ height: calculatedAdditionalHeight }}>
          <View className="h-[510] items-center justify-center gap-8 bg-[#F1F1F1] p-12">
            <View className="gap-2">
              <Text className="text-center text-3xl font-semibold text-black">DropSquad</Text>
              <Text className="text-center">
                We are proud to design and deliver quality and comfortable clothing for you.
              </Text>
            </View>
            <View className="w-[140] items-center justify-center gap-2">
              <Truck color={'black'} size={36} />
              <Text className="text-center">Fast shipping. Free on orders over $10.</Text>
            </View>
            <View className="w-[140] items-center justify-center gap-2">
              <ListChecks color={'black'} size={36} />
              <Text className="text-center">Sustainable process from start to finish.</Text>
            </View>
            <View className="w-[140] items-center justify-center gap-2">
              <UserRoundCheck color={'black'} size={36} />
              <Text className="text-center">Unique designs and high-quality materials.</Text>
            </View>
          </View>
          <View className="">
            <Footer />
          </View>
        </View>
      </ScrollView>
    </>
  );
}
