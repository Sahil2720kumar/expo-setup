import { FlatList, Pressable, ScrollView, View } from 'react-native';
import React, { useState } from 'react';
import { Text } from './ui/text';
import ProductCard from './ProductCard';
import { Button, ButtonText } from './ui/button';
import { ChevronRightIcon, Icon } from './ui/icon';

const ProductCategoryTabs = () => {
  const categories = ['All', 'Shoes', 'Jeans', 'T-shirt', 'Headwear'];
  const products = [1, 2, 3, 4];
  const [activeTab, setActiveTab] = useState('All');
  return (
    <View className="mt-4">
      <View className="h-11 items-center justify-center">
        <FlatList
          data={categories}
          horizontal
          contentContainerClassName="gap-7"
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
      <View className="" style={{ width: '100%', height: 620, paddingHorizontal: 15}}>
        <FlatList
          contentContainerClassName="gap-5 m-5"
          columnWrapperClassName="gap-2"
          numColumns={2}
          data={products}
          renderItem={({ item }) => <ProductCard key={item} />}
        />
        <Button
          style={{
            borderRadius: 30,
            width:199,
            height:48,
            alignSelf:"center",
            marginTop:36
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
