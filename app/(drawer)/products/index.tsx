import { View } from 'react-native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native-virtualized-view';
import { Text } from '~/components/ui/text';
import { useBreakpointValue } from '~/components/ui/utils/use-break-point-value';
import { Filter, Heart, LayoutList, Share2 } from 'lucide-react-native';
import { Button, ButtonIcon } from '~/components/ui/button';
import FilterDrawer from '~/components/FilterDrawer';
import { FlatList } from 'react-native';
import { products } from '@/assets/data/product.json';
import ProductCard from '~/components/ProductCard';
import Pagination from '~/components/Pagination';
import Footer from '~/components/Footer';
import { Stack } from 'expo-router';

const CategoryScreen = () => {
  // console.log('category screen re render');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // Example total number of pages

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Here you would typically fetch data for the new page
    console.log(`Fetching data for page ${newPage}`);
  };
  // const []=useState(products)

  const marginAuto = useBreakpointValue({
    default: '',
    sm: 'auto',
    md: 'auto',
  });
  const minWidth = useBreakpointValue({
    default: 300,
    sm: 600,
    md: 600,
  });
  const iconSize = useBreakpointValue({
    default: 20,
    sm: 24,
    md: 24,
  });
  const noColumns = useBreakpointValue({
    default: 2,
    sm: 3,
    md: 3,
  });

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 15,
        paddingTop: 15,
        maxWidth: 600,
        minWidth: minWidth,
        marginHorizontal: marginAuto,
        backgroundColor: 'white',
      }}
      showsVerticalScrollIndicator={false}>
      {/* <FilterDrawer isShowDrawer={showDrawer} setIsShowDrawer={setShowDrawer} /> */}
      {/* <Stack.Screen options={{ headerShown: false }} /> */}

      {/* TOP BUTTONS */}
      <View className=" mt-[14] flex-row items-center justify-between ">
        <View className="flex-row gap-2">
          <Text className="text-xl font-bold font-medium text-black">Apparel (4500)</Text>
        </View>
        <View className="flex-row items-center justify-between gap-4">
          <Button
            size="lg"
            variant="solid"
            action="secondary"
            className="items-center  justify-center  rounded-full bg-[#F1F1F1] p-[12] ">
            <LayoutList size={iconSize} color="black" />
          </Button>
          <FilterDrawer />
        </View>
      </View>
      <View className="flex-1 flex-grow">
        <View className="" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View className=" w-full  items-center">
            <FlatList
              key={noColumns}
              className="w-full items-center"
              columnWrapperClassName={`gap-y-2 ${noColumns !== 2 ? 'gap-x-4' : 'gap-x-2'}`}
              numColumns={noColumns}
              data={products.slice(0, 6)}
              renderItem={({ item }) => (
                <ProductCard
                  key={item.id}
                  description={item.description}
                  price={item.price}
                  id={item.id}
                />
              )}
            />
          </View>
          <View className="pt-[32] md:pt-11  ">
            <Pagination
            // currentPage={currentPage}
            // totalPages={totalPages}
            // onPageChange={handlePageChange}
            />
          </View>
        </View>
      </View>
      <View>
        <Footer />
      </View>
    </ScrollView>
  );
};

export default CategoryScreen;
