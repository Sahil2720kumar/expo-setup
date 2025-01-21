import { Pressable, TouchableOpacity, View } from 'react-native';
import { Card } from './ui/card';
import { Heading } from './ui/heading';
import { HStack } from './ui/hstack';
import { ArrowRightIcon, Icon } from './ui/icon';
import { Text } from './ui/text';
import { Image } from 'react-native';
import { Link } from 'expo-router';

export default function ProductCard({ description = '', rating = '', price = '', id = 1 }) {
  return (
    <Link href={`/(drawer)/products/${id}`} asChild>
      <TouchableOpacity activeOpacity={0.8} className="rounded-lg" style={{ width: 168, marginTop: 20, backgroundColor: '' }}>
        <View style={{ width: '100%', height: 190, borderRadius: 5 }}>
          <Image
            resizeMode="cover"
            className="flex-1 rounded-lg"
            source={require('./../assets/shirt.png')}
          />
        </View>
        <View className="mt-1.5">
          <Text className="text-black">Short sleeve polo shirt</Text>
          <Text
            style={{ display: description !== '' ? 'flex' : 'none' }}
            numberOfLines={1}
            isTruncated>
            {description}
          </Text>
          <Text className="text-xl font-semibold text-[#F93C00]">{price ? price : '$179'}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}
