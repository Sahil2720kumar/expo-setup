import React, { useState, useRef, memo } from 'react';
import { View, FlatList, StyleSheet, Platform, Image } from 'react-native';
import clothImage from './../assets/cloth.png';
import { Button, ButtonText } from './ui/button';
import { Text } from './ui/text';
// import { Image } from './ui/image';

//Memo not work in this case
const Carousel = ({ data, buttonVisible, height: carouselHeight }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const flatListRef = useRef(null);

  const renderItem = ({ item }) => (
    <View style={[styles.itemContainer, { width: containerWidth }]}>
      <Image resizeMode="cover" source={clothImage} style={styles.image} />

      <Text size="xl" style={styles.title}>
        LACOSTE
      </Text>
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
    <View
      style={[styles.container, { height: carouselHeight }]}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setContainerWidth(width);
      }}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        // className='bg-blue-400 '
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
      <Button
        className="bottom-[90] rounded-[30] bg-[#F93C00]"
        style={[styles.button, { display: buttonVisible ? 'flex' : 'none' }]}
        size="xl"
        variant="solid"
        action="primary">
        <ButtonText>View Collection</ButtonText>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: 'hidden',
    // backgroundColor:"pink"
  },
  itemContainer: {
    height: '100%', // Match container height
    position: 'relative',
    // backgroundColor: 'pink',
    ...(Platform.OS === 'web' && {
      aspectRatio: 1 / 1.85, // Web-specific style
    }),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  title: {
    position: 'absolute',
    left: 16,
    top: 16,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18,
  },
  button: {
    position: 'absolute',
    //bottom: 90,
    left: '50%',
    transform: [{ translateX: -70 }],
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 24,
    width: '100%',
  },
  paginationDot: {
    width: 60,
    height: 6,
    borderRadius: 4,
    backgroundColor: '#888888',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#F93C00',
  },
});

export default memo(Carousel);
