import { Dimensions, FlatList, Pressable, ScrollView, View } from 'react-native';
import React, { useState } from 'react';
import { Text } from './ui/text';
import ProductCard from './ProductCard';
import { Button, ButtonText } from './ui/button';
import { ChevronRightIcon, Icon } from './ui/icon';
import { Platform } from 'react-native';
import { Box } from './ui/box';

const ProductCategoryTabs = () => {
  const categories = ['All', 'Shoes', 'Jeans', 'T-shirt', 'Headwear'];
  const products = [1, 2, 3, 4];
  const [activeTab, setActiveTab] = useState('All');

  const { width } = Dimensions.get('window');
  return (
    <View className="mt-4">
      <View className="h-11 items-center justify-center ">
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-6"
          renderItem={({ item }) => (
            <Pressable className="items-center justify-center gap-1.5">
              {({ pressed }) => (
                <View className="items-center justify-center ">
                  <Text
                    className="text-xl font-semibold"
                    onPress={() => setActiveTab(item)}
                    style={{
                      opacity: pressed ? 0.5 : 1,
                      color: activeTab === item ? '#F93C00' : '#888888',
                    }}>
                    {item}
                  </Text>
                  <View
                    className=" h-[4] w-[4] rounded-sm bg-[#F93C00]"
                    style={{ display: activeTab === item ? 'flex' : 'none' }}
                  />
                </View>
              )}
            </Pressable>
          )}
        />
      </View>
      <View className="px-15 min-h-[650] w-full">
        <View className='' style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
          <FlatList
            columnWrapperClassName="gap-2"
            numColumns={2}
            data={products}
            renderItem={({ item }) => <ProductCard key={item} />}
          />
        </View>
        <Button
          style={{
            borderRadius: 30,
            width:199,
            height:48,
            alignSelf:"center",
            marginTop:36,
            paddingHorizontal:0,
            ...(Platform.OS === 'web' && {
              width:220 // Web-specific style
            }),
          }}
          size="xl"
          variant="outline"
          action="primary">

          <ButtonText>EXPLORE MORE</ButtonText>
          <Icon as={ChevronRightIcon}/>
        </Button>
      </View>
    </View>
  );
};

export default ProductCategoryTabs;
