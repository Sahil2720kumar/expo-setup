import {
  Dimensions,
  View,
  FlatList,
  TouchableOpacity,
 
  ActivityIndicator,
} from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
// import { ScrollView } from 'react-native';
import Carousel from '~/components/Carousel';

import ProductSliderCard from '~/components/ProductSliderCard';
import { Text } from '~/components/ui/text';
import { ListChecks, Truck, UserRoundCheck } from 'lucide-react-native';
import Footer from '~/components/Footer';
import { useBreakpointValue } from '~/components/ui/utils/use-break-point-value';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '~/api/products';

export default function Home() {
  const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
  const isMobile = screenWidth < 768;
  // const calculatedHeight = isMobile ? screenHeight - 100 : '90%';
  // const calculatedAdditionalHeight = screenHeight + 100;

  const marginAuto = useBreakpointValue({
    default: '',
    sm: 'auto',
    md: 'auto',
  });

  const carouselData = [
    { id: 1, title: 'Men', image: 'https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 2, title: 'Women', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 3, title: 'Kids', image: 'https://images.pexels.com/photos/1619801/pexels-photo-1619801.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
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

  const {
    data: productsSliderData,
    isLoading: productsSliderIsLoading,
    error,
  } = useQuery({
    queryKey: ['products', 1],
    queryFn: () => getAllProducts(1, 20),
  });

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: '#fff',
        maxWidth: 600,
        marginHorizontal: marginAuto,
      }}
      showsVerticalScrollIndicator={false}>
      {/* CAROUSEL SECTION */}
      <View style={{ flex: 1, minHeight: 600, maxHeight: 740 }}>
        <Carousel isClickable={true} data={carouselData} buttonVisible={true} height={600} />
      </View>

      {/* PRODUCT CATEGORY TABS */}
      {/* <View style={{ paddingVertical: 20 }}>
        <Text size="2xl" style={{ textAlign: 'center', fontWeight: '600', color: 'black' }}>
          NEW ONES
        </Text>
        <ProductCategoryTabs />
      </View> */}

      {/* JUST FOR CUSTOMERS SECTION  */}
      <View style={{ marginTop: 40, height: 600, maxHeight: 700 }}>
        <Text size="2xl" style={{ textAlign: 'center', fontWeight: '600', color: 'black' }}>
          JUST FOR YOU
        </Text>
        <View className="">
          {productsSliderIsLoading ? (
            <View
              style={{
                height: '100%',
                minHeight:400,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size={'large'} />
            </View>
          ) : (
            <FlatList
              data={productsSliderData?.productsList}
              renderItem={({ item }) => (
                <ProductSliderCard item={item} width={207} height={304} imageHeight={'81%'} />
              )}
              horizontal
              contentContainerStyle={{ gap: 16, paddingHorizontal: 16, flexGrow: 1 }}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
        <Text
          size="2xl"
          style={{ marginTop: 40, textAlign: 'center', fontWeight: '600', color: 'black' }}>
          @TRENDING
        </Text>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 12,
            padding: 16,
          }}>
          {tags.map((tag, index) => (
            <TouchableOpacity
              activeOpacity={0.5}
              key={index}
              style={{
                borderRadius: 50,
                backgroundColor: '#F1F1F1',
                paddingHorizontal: 12,
                paddingVertical: 4,
              }}>
              <Text style={{ color: 'black' }}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {/* DropSquad Services Section */}
      <View style={{ maxHeight: 800 }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            gap: 32,
            backgroundColor: '#F1F1F1',
            paddingHorizontal: 48,
            paddingVertical: 32, // Ensures spacing instead of flex
          }}>
          <View style={{ gap: 8 }}>
            <Text size="4xl" style={{ textAlign: 'center', fontWeight: '600', color: 'black' }}>
              DropSquad
            </Text>
            <Text style={{ textAlign: 'center' }}>
              We are proud to design and deliver quality and comfortable clothing for you.
            </Text>
          </View>
          <View style={{ width: 140, justifyContent: 'center', alignItems: 'center', gap: 8 }}>
            <Truck color={'black'} size={36} />
            <Text style={{ textAlign: 'center' }}>Fast shipping. Free on orders over $10.</Text>
          </View>
          <View style={{ width: 140, justifyContent: 'center', alignItems: 'center', gap: 8 }}>
            <ListChecks color={'black'} size={36} />
            <Text style={{ textAlign: 'center' }}>Sustainable process from start to finish.</Text>
          </View>
          <View style={{ width: 140, justifyContent: 'center', alignItems: 'center', gap: 8 }}>
            <UserRoundCheck color={'black'} size={36} />
            <Text style={{ textAlign: 'center' }}>Unique designs and high-quality materials.</Text>
          </View>
        </View>
        <View className="bg-white">
          <Footer />
        </View>
      </View>
    </ScrollView>
  );
}
