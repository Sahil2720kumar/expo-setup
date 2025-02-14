import {  TouchableOpacity, View, Image } from 'react-native';
import { Text } from './ui/text';
import { Link } from 'expo-router';

export default function ProductCard({
  name = '',
  description = '',
  rating = '',
  price = '',
  id = 1,
  images
}) {  
  return (
    <Link href={`/(drawer)/products/${id}`} asChild>
      <TouchableOpacity
        activeOpacity={0.8}
        className="rounded-lg"
        style={{ width: 168, marginTop: 20, backgroundColor: '' }}>
        <View style={{ width: '100%', height: 190, borderRadius: 5 }}>
          <Image
            resizeMode="cover"
            className="flex-1 rounded-lg"
            source={images?.[0]?{uri:images?.[0]}:require('./../assets/shirt.png')}
          />
        </View>
        <View className="mt-1.5">
          <Text numberOfLines={1} isTruncated className="text-black">{name}</Text>
          <Text
            style={{ display: description !== '' ? 'flex' : 'none' }}
            numberOfLines={1}
            isTruncated>
            {description}
          </Text>
          <Text className="text-xl font-semibold text-[#F93C00]">{price ? "₹ "+price : '$179'}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}
