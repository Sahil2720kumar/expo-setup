import { View } from 'react-native';
import { Card } from './ui/card';
import { Heading } from './ui/heading';
import { HStack } from './ui/hstack';
import { ArrowRightIcon, Icon } from './ui/icon';
import { Link } from './ui/link';
import { Text } from './ui/text';
import { Image } from 'react-native';

export default function ProductCard() {
  return (
    <View
      className="rounded-lg"
      style={{ flex: 1, aspectRatio: 1 / 1.5, marginTop: 20, backgroundColor: '' }}>
      <View style={{ width: '100%', height: 190, overflow: 'hidden',borderRadius:5 }}>
        <Image
          resizeMode="cover"
          className="flex-1 rounded-lg"
          source={require('./../assets/shirt.png')}
        />
      </View>
      <View className='mt-1.5'>
        <Text className="text-black">Short sleeve polo shirt</Text>
        <Text className="text-xl font-semibold text-[#F93C00]">$179</Text>
      </View>
    </View>
  );
}
