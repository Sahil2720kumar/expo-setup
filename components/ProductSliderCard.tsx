import { View } from 'react-native';
import { Card } from './ui/card';
import { Heading } from './ui/heading';
import { HStack } from './ui/hstack';
import { ArrowRightIcon, Icon } from './ui/icon';
import { Link } from './ui/link';
import { Text } from './ui/text';
import { Image } from 'react-native';

export default function ProductSliderCard({width,height,imageHeight='70%',description=''}) {
  return (
    <View
      className="rounded-lg"
      style={{ width, height:height, marginTop: 20 }}>
      <View style={{ width: '100%', height: imageHeight,borderRadius:5 }}>
        <Image
          resizeMode="cover"
          className="rounded-lg"
          style={{width: '100%', height: "100%"}}
          source={require('./../assets/shirt.png')}
        />
      </View>
      <View className='mt-1.5'>
        <Text className="text-black">Short sleeve polo shirt</Text>
        <Text style={{display:description!==''?"flex":"none"}}>{description}</Text>
        <Text className="text-xl font-semibold text-[#F93C00]">$179</Text>
      </View>
    </View>
  );
}
