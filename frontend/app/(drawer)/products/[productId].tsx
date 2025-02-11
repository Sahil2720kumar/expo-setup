import { ActivityIndicator, FlatList, Pressable, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView } from 'react-native-virtualized-view';
import { Text } from '~/components/ui/text';
import { ChevronLeft, Heart, Share2 } from 'lucide-react-native';
import { Dimensions } from 'react-native';
import Carousel from '~/components/Carousel';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Bag, DoNotDryTumble, DoNotUse, DryClean, Iron } from '~/components/Icons';
import { Icon } from '~/components/ui/icon';
import ProductAccordion from '~/components/ProductAccordion';
import ProductSliderCard from '~/components/ProductSliderCard';
import Footer from '~/components/Footer';
import { useBreakpointValue } from '~/components/ui/utils/use-break-point-value';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useCommonBreakPoints } from '~/utils/breakPoints';
import { getProductById } from '~/api/products';
import { useQuery } from '@tanstack/react-query';
import { Product } from '~/types';
import useCartStore from '~/store/cartStore';
import useAuthStore from '~/store/authStore';

const ProductDetailsScreen = () => {
  const { productId } = useLocalSearchParams();

  //width & height calculations
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const calculatedHeight = useMemo(() => screenHeight - 200, [screenHeight]); // Subtract 100px from screen height

  //hooks
  const { marginAuto } = useCommonBreakPoints();
  const router = useRouter();
  const { addProduct, products } = useCartStore();
  const { sessionUser, sessionToken } = useAuthStore();
  const isAlreadyInCart = products.find((product) => product.id === Number(productId));
  // console.log('productID', productId);
  // console.log('isAlreadyInvar', isAlreadyInCart);

  const sliderData = [1, 2, 34, 4, 5];
  const careAdvice = [
    { id: 1, icon: Iron, description: 'Iron at a maximum of 110ºC/230ºF' },
    { id: 2, icon: DryClean, description: 'Dry clean with tetrachloroethylene' },
    { id: 3, icon: DoNotUse, description: 'Do not use bleach' },
    { id: 4, icon: DoNotDryTumble, description: 'Do not tumble dry' },
  ];

  const {
    data: productData,
    isLoading,
    error,
  } = useQuery<Product>({
    queryKey: ['product', Number(productId)],
    queryFn: () => getProductById(Number(productId)),
  });

  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState('S');
  
  useEffect(() => {
    if (productData?.color?.length > 0) {
      setSelectedColor(productData.color[0]); // Set the first available color when data is loaded
      setSelectedSize(productData?.size[1])
    }
  }, [productData]); // Runs when `productData` changes


  const carouselData = useMemo(
    () =>
      productData?.images?.map((image, index) => {
        return {
          id: index + 1,
          image: image,
        };
      }),
    [productData]
  ); // Empty dependency array means it will only be created once
  console.log("datat",carouselData);

  const addToCart = () => {
    if (!sessionUser || !sessionToken) {
      router.push('/(drawer)/(auth)/signIn');
    }    
     addProduct(productData!,selectedSize,selectedColor!);
  };

  if (isLoading) {
    return (
      <View
        style={{
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{error.message}</Text>
      </View>
    );
  }
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: '#fff',
        padding: 15,
        overflowX: 'hidden',
        maxWidth: 600,
        // overflowY:'hidden',
        marginHorizontal: marginAuto,
      }} // Ensures scrolling when content overflows
      showsVerticalScrollIndicator={false} // Optional: Hides scroll indicator
      // className='max-w-[600] mx-auto'
    >
      {/* <Stack.Screen options={{headerShown:false}}/> */}
      {/* TOP BUTTONS */}
      <View className=" mt-[14] flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => router.push('/(drawer)/products')}
          className="flex-row gap-2">
          <ChevronLeft color={'black'} />
          <Text className="text-lg font-medium text-black">Back</Text>
        </TouchableOpacity>
        <View className="flex-row items-center justify-between gap-2">
          <Heart color={'black'} />
          <Share2 color={'black'} />
        </View>
      </View>
      <View className="h-[100%] flex-1">
        {/* PRODUCT IMAGE CAROUSEL */}
        <View className="mt-4" style={{ height: calculatedHeight, maxHeight: 900 }}>
          <Carousel data={carouselData} buttonVisible={false} height={'100%'} />
        </View>

        {/* PRODUCT DETAILS SECTION */}
        <View
          className="gap-6"
          style={{ height: calculatedHeight + 110, maxHeight: 800, minHeight: 600 }}>
          {/* BASIS PRODUCT INFORMATION */}
          <View className="mt-4 h-[100] flex-row items-center justify-between">
            <View className="flex-1 gap-0.5">
              <Text className="w-full text-2xl font-bold text-black">
                {productData?.name} id #{productData?.id}
              </Text>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                className="text-md w-full text-[#888888]">
                {productData?.description}
              </Text>
              {/* <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                className="text-md w-full text-[#888888]">
                For {productData?.category}
              </Text> */}
              <Text className="w-full text-xl font-bold text-[#F93C00]">{productData?.price}</Text>
            </View>
            <TouchableOpacity
              onPress={addToCart}
              activeOpacity={0.7}
              className="justify-end rounded-full p-2"
              style={{ backgroundColor: isAlreadyInCart ? '#F93C00' : 'white' }}>
              <Bag color={isAlreadyInCart ? 'white' : 'black'} size={30} />
            </TouchableOpacity>
          </View>

          {/* COLOR AND SIZE SECTION */}
          <View
            className="flex flex-row items-center justify-between gap-3"
            style={{ marginTop: 18 }}>
            <View className="flex-1 flex-row gap-2">
              <Text className="text-[#888888]">Color</Text>
              {productData?.color.map((color) => (
                <TouchableOpacity
                  key={color}
                  activeOpacity={0.7}
                  onPress={()=>setSelectedColor(color)}
                  className={`h-[26] w-[26] rounded-[12] ${selectedColor===color?" border-2 border-[#888888]":""} p-0.5 `}>
                  <View
                    className="flex-1 rounded-[10]"
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <View className="flex-row flex-wrap items-center justify-between gap-2 ">
              <Text className="text-[#888888]">Size</Text>
              {productData?.size.map((size, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.7}
                  onPress={()=>setSelectedSize(size)}
                  className={`h-[28] w-[28] items-center justify-center rounded-[13] items-center jus ${selectedSize===size?"bg-[#F93C00]":" border-2 border-[#F1F1F1]"}`}
                  // className="h-[28] w-[28] bg-slate-700"
                  >
                  <Text className={`font-semibold  ${selectedSize===size?"text-white":" text-[#888888]"}`}>{size}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View className=" h-0.5 w-full bg-[#F1F1F1]"></View>

          {/* Add to cart button */}

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
