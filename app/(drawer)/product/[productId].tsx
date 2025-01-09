import { FlatList, View } from 'react-native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native-virtualized-view';
import { Text } from '~/components/ui/text';
import { ChevronLeft, Heart, Share2 } from 'lucide-react-native';
import { Dimensions } from 'react-native';
import Carousel from '~/components/Carousel';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DoNotDryTumble, DoNotUse, DryClean, Iron } from '~/components/Icons';
import { Icon } from '~/components/ui/icon';
import ProductAccordion from '~/components/ProductAccordion';
import ProductSliderCard from '~/components/ProductSliderCard';
import Footer from '~/components/Footer';
import { useBreakpointValue } from '~/components/ui/utils/use-break-point-value';

const ProductDetailsScreen = () => {
  // console.log('re render');
  const [selectedColor, setSelectedColor] = useState('393944');
  const [selectedSize, setSelectedSize] = useState('S');
  const sliderData = [1, 2, 34, 4, 5];
  const { width: screenWidth } = Dimensions.get('window');

  const marginAuto = useBreakpointValue({
    default: '',
    sm: 'auto',
    md: 'auto',
  });

  const careAdvice = [
    { id: 1, icon: Iron, description: 'Iron at a maximum of 110ºC/230ºF' },
    { id: 2, icon: DryClean, description: 'Dry clean with tetrachloroethylene' },
    { id: 3, icon: DoNotUse, description: 'Do not use bleach' },
    { id: 4, icon: DoNotDryTumble, description: 'Do not tumble dry' },
  ];

  const screenHeight = Dimensions.get('window').height;
  const calculatedHeight = screenHeight - 200; // Subtract 100px from screen height
  const carouselData = [
    { id: 1, title: 'Item 1', image: 'https://via.placeholder.com/300x200?text=Item+1' },
    { id: 2, title: 'Item 2', image: 'https://via.placeholder.com/300x200?text=Item+2' },
    { id: 3, title: 'Item 3', image: 'https://via.placeholder.com/300x200?text=Item+3' },
  ];
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: '#fff',
        padding: 15,
        overflowX: 'hidden',
        maxWidth: 600,
        overflowY:'hidden',
        marginHorizontal: marginAuto,
      }} // Ensures scrolling when content overflows
      showsVerticalScrollIndicator={false} // Optional: Hides scroll indicator
      // className='max-w-[600] mx-auto'
    >
      {/* TOP BUTTONS */}
      <View className=" mt-[14] flex-row items-center justify-between">
        <View className="flex-row gap-2">
          <ChevronLeft color={'black'} />
          <Text className="text-lg font-medium text-black">Back</Text>
        </View>
        <View className="flex-row items-center justify-between gap-2">
          <Heart color={'black'} />
          <Share2 color={'black'} />
        </View>
      </View>
      <View className='flex-1 h-[100%]'>
        {/* PRODUCT IMAGE CAROUSEL */}
        <View className="mt-4" style={{ height: calculatedHeight,maxHeight:900 }}>
          <Carousel data={carouselData} buttonVisible={false} height={'100%'} />
        </View>

        {/* PRODUCT DETAILS SECTION */}
        <View className="gap-6" style={{ height: calculatedHeight + 110, maxHeight: 800,minHeight:600 }}>
          {/* BASIS PRODUCT INFORMATION */}
          <View className="mt-4 h-[100] flex-row items-center justify-between">
            <View className="gap-0.5">
              <Text className="text-2xl font-bold text-black ">Shirt Polo</Text>
              <Text className="text-md text-[#888888]">Short sleeve polo shirt</Text>
              <Text className="text-xl font-bold text-[#F93C00]">$179</Text>
            </View>
            <View className=" justify-end">
              <MaterialIcons name="add-shopping-cart" size={30} color="black" />
            </View>
          </View>

          {/* COLOR AND SIZE SECTION */}
          <View className="flex flex-row items-center justify-between gap-3">
            <View className="flex-row items-center gap-3">
              <Text className="text-[#888888]">Color</Text>

              <View className=" h-[26] w-[26] rounded-[12]  border-2 border-[#888888] p-0.5">
                <View className="flex-1 rounded-[10] bg-[#393944]" />
              </View>
              <View className=" h-[26] w-[26] rounded-[12]  border-none border-[#888888] p-0.5">
                <View className="flex-1 rounded-[10] bg-[#F93C00]" />
              </View>
              <View className=" h-[26] w-[26] rounded-[12]   border-none border-[#888888] p-0.5">
                <View className="flex-1 rounded-[10] bg-[#6666FF]" />
              </View>
            </View>
            <View className="flex-row items-center justify-between gap-3 ">
              <Text className="text-[#888888]">Size</Text>
              <View className="h-[26] w-[26] items-center justify-center rounded-[13] bg-[#F93C00]">
                <Text className="text-white">S</Text>
              </View>
              <View className="h-[26] w-[26] items-center justify-center rounded-[13]">
                <Text className="text-[#888888]">M</Text>
              </View>
              <View className="h-[26] w-[26] items-center  justify-center rounded-[13]">
                <Text className="text-[#888888]">L</Text>
              </View>
            </View>
          </View>
          <View className=" h-0.5 w-full bg-[#F1F1F1]"></View>

          {/* MATERIALS SECTION */}
          <View className="gap-1.5">
            <Text className="text-lg font-semibold text-[#000000]">MATERIALS</Text>
            <Text className="text-[#888888]">
              We work with monitoring programmes to ensure compliance with safety, health and
              quality standards for our products.
            </Text>
          </View>

          {/* CARE SECTION */}
          <View className="gap-2">
            <View className="gap-1.5">
              <Text className="text-lg font-semibold text-[#000000]">CARE</Text>
              <Text className="text-[#888888]">
                To keep your jackets and coats clean, you only need to freshen them up and go over
                them with a cloth or a clothes brush. If you need to dry clean a garment, look for a
                dry cleaner that uses technologies that are respectful of the environment.
              </Text>
            </View>
            <View>
              <FlatList
                data={careAdvice}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                columnWrapperClassName="items-center justify-between gap-8"
                renderItem={({ item }) => (
                  <View className="mt-[24] flex-1  ">
                    <Icon as={item.icon} />
                    <Text className="text-[#888888]">{item.description}</Text>
                  </View>
                )}
              />
            </View>
          </View>
        </View>

        {/* CARE ACCORDION & PRODUCT suggestion SECTION */}
        <View className="gap-4" style={{ height: calculatedHeight + 320, maxHeight: 700 }}>
          <View className="mt-3">
            <Text className="text-lg font-semibold text-[#000000]">CARE</Text>

            <ProductAccordion />
          </View>

          {/* CUSTOMERS LIKE SECTION */}
          <View className="mt-[60]">
            <Text className="text-center text-2xl font-bold text-black">YOU MAY ALSO LIKE</Text>
            <View className="">
              <FlatList
                data={sliderData}
                renderItem={({ item }) => (
                  <ProductSliderCard
                    width={168}
                    height={268}
                    description="Short sleeve polo shirt"
                  />
                )}
                horizontal
                contentContainerClassName="gap-4"
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>

          {/* FOOTER SECTION */}
          <View>
            <Footer />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetailsScreen;
