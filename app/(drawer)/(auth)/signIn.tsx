import { View, Dimensions } from 'react-native';
import React from 'react';
import { useBreakpointValue } from '~/components/ui/utils/use-break-point-value';
import { ScrollView } from 'react-native-virtualized-view';
import { Text } from '~/components/ui/text';

const SignIn = () => {
  const { width, height: screenHeight } = Dimensions.get('window');
  const calculatedHeight = screenHeight - 200; // Subtract 100px from screen height

  const marginAuto = useBreakpointValue({
    default: '',
    sm: 'auto',
    md: 'auto',
  });

  const minWidth = useBreakpointValue({
    default: 300,
    sm: 600,
    md: 600,
  });
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingTop: 15,
        overflowX: 'hidden',
        // overflowY: 'scroll',
        maxWidth: 600,
        minWidth: minWidth,
        marginHorizontal: marginAuto,
      }} // Ensures scrolling when content overflows
      showsVerticalScrollIndicator={false} // Optional: Hides scroll indicator
      // className='max-w-[600] mx-auto'
      style={{ height: screenHeight }}>
      <View className="">
        <Text className="text-center">DropSquad</Text>
      </View>
    </ScrollView>
  );
};

export default SignIn;
