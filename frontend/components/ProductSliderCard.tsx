import { TouchableOpacity, View } from 'react-native';
import { Card } from './ui/card';
import { Heading } from './ui/heading';
import { HStack } from './ui/hstack';
import { ArrowRightIcon, Icon } from './ui/icon';
import { Text } from './ui/text';
import { Image } from 'react-native';
import { Link } from 'expo-router';

export default function ProductSliderCard({
  width,
  height,
  imageHeight = '70%',
  description = '',
  item,
}) {
  return (
    <Link href={`/(drawer)/products/${item.id}`} asChild>
      <TouchableOpacity
        activeOpacity={0.7}
        className="rounded-lg"
        style={{ width, height: height, marginTop: 20 }}>
        <View style={{ width: '100%', height: imageHeight, borderRadius: 5 }}>
          <Image
            resizeMode="cover"
            className="rounded-lg"
            style={{ width: '100%', height: '100%' }}
            source={item?.images ? { uri: item.images[0] } : require('./../assets/shirt.png')}
          />
        </View>
        <View className="mt-1.5">
          <Text numberOfLines={1} isTruncated className="text-black">{item?.name}</Text>
          <Text
            numberOfLines={1}
            isTruncated
            style={{ display: description !== '' ? 'flex' : 'none' }}>
            {item?.description}
          </Text>
          <Text className="text-xl font-semibold text-[#F93C00]">₹ {item?.price}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}
