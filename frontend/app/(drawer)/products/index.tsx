import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { LayoutList } from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { getAllProducts } from '~/api/products';
import FilterDrawer from '~/components/FilterDrawer';
import Footer from '~/components/Footer';
import Pagination from '~/components/Pagination';
import ProductCard from '~/components/ProductCard';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { useCommonBreakPoints } from '~/utils/breakPoints';
import { useLocalSearchParams } from 'expo-router';

const ProductsScreen = () => {
  const { category,q } = useLocalSearchParams();
  console.log(category,q);

  const [currentPage, setCurrentPage] = useState(1);
  const [filterOptions, setFilterOptions] = useState(null);
  // const totalPages = 10; // Example total number of pages
  const { marginAuto, minWidth, iconProductSize: iconSize, noColumns } = useCommonBreakPoints();
  const [searchQuery,setSearchQuery]=useState();
const [isSearchQueryExist,setIsSearchQueryExist]=useState(false)

  const handleProductsFilters = useCallback((data) => {
    // console.log('print from produts: ', data);
    setFilterOptions(data);
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    if (category) {
      setFilterOptions({
        genderAndAgeCategories: [category],
      });
    }
    if(q){
      setSearchQuery(q)
      setIsSearchQueryExist(true)
    }
  }, [category,q]);

  const {
    data: productsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products', currentPage, filterOptions,searchQuery],
    queryFn: () => getAllProducts(currentPage, 6, filterOptions,searchQuery),
    placeholderData: keepPreviousData,
  });

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

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);

    // Here you would typically fetch data for the new page
    console.log(`Fetching data for page ${newPage}`);
  };
  // const []=useState(products)

  // console.log(productsData);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 15,
        paddingTop: 15,
        maxWidth: 600,
        minWidth,
        marginHorizontal: marginAuto,
        backgroundColor: 'white',
      }}
      showsVerticalScrollIndicator={false}>
      {/* <FilterDrawer isShowDrawer={showDrawer} setIsShowDrawer={setShowDrawer} /> */}
      {/* <Stack.Screen options={{ headerShown: false }} /> */}

      {/* TOP BUTTONS */}
      <View className=" mt-[14] flex-row items-center justify-between ">
        <View className="flex-row gap-2">
          <Text size="xl" className="text-xl font-bold text-black">
            Apparel (4500)
          </Text>
        </View>
        <View className="flex-row items-center justify-between gap-4">
          <Button
            size="lg"
            variant="solid"
            action="secondary"
            className="items-center  justify-center  rounded-full bg-[#F1F1F1] p-[12] ">
            <LayoutList size={iconSize} color="black" />
          </Button>
          <FilterDrawer handleProductsFilters={handleProductsFilters} />
        </View>
      </View>
      <View className="flex-1 flex-grow">
        <View
          className=""
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '',
          }}>
          <View
            className=" w-full  items-center justify-center"
            style={{ justifyContent: 'center' }}>
            {productsData.productsList.length ? (
              <FlatList
                key={noColumns}
                className="w-full items-center"
                columnWrapperClassName={`gap-y-2 ${noColumns !== 2 ? 'gap-x-4' : 'gap-x-2'}`}
                numColumns={noColumns}
                data={productsData.productsList}
                renderItem={({ item }) => (
                  <ProductCard
                    key={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    id={item.id}
                    images={item.images}
                  />
                )}
              />
            ) : (
              <View className=" items-center justify-center" style={{ minHeight: 300 }}>
                <Text size="lg" className="font-bold">
                  No Products found {productsData.length}
                </Text>
              </View>
            )}
          </View>
          <View className="pt-[32] md:pt-11  ">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(productsData.totalProductsCount / 6)}
              onPageChange={handlePageChange}
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

export default ProductsScreen;
