import { View} from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-virtualized-view';
import { Text } from '~/components/ui/text';

const category = () => {
  const marginAuto = useBreakpointValue({
    default: '',
    sm: 'auto',
    md: 'auto',
  });
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: '#fff',
        padding: 15,
        overflowX: 'hidden',
        maxWidth: 600,
        // overflowY:'hidden',
        marginHorizontal: marginAuto,
      }} // Ensures scrolling when content overflows
      showsVerticalScrollIndicator={false} // Optional: Hides scroll indicator
      // className='max-w-[600] mx-auto'
    >
        <Text>Hey</Text>
    </ScrollView>
  );
};

export default category;
