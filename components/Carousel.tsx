import React, { useState, useRef } from 'react';
import { View, FlatList, Dimensions, StyleSheet, Image } from 'react-native';
import { Button, ButtonText } from './ui/button';
import { Text } from './ui/text';

const { width, height } = Dimensions.get('window');
const Carousel = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image resizeMode="cover" source={require('./../assets/cloth.png')} style={styles.image} />
      <Text size="xl" className="absolute  left-4 top-5  font-semibold text-black">
        LACOSTE
      </Text>
      <Button
        style={{
          position: 'absolute',
          bottom: 75,
          left: '50%',
          transform: [{ translateX: -70 }, { translateY: 0 }], // Adjust these values based on button dimension
          backgroundColor: '#F93C00',
          borderRadius: 30,
        }}
        size="xl"
        variant="solid"
        action="primary">
        <ButtonText>View Collection</ButtonText>
      </Button>
    </View>
  );

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex ? styles.paginationDotActive : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height: '85%',
  },
  itemContainer: {
    width,
  },
  image: {
    width,
    height: '100%',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 24,
    marginInline: 'auto',
  },
  paginationDot: {
    width: 60,
    height: 6,
    borderRadius: 4,
    backgroundColor: '#888888',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#fff',
  },
});

export default Carousel;
