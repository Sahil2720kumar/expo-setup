import { ScrollView, Pressable, TouchableOpacity } from 'react-native';
// import { Input, InputField, InputIcon, Button, ButtonIcon, Text, VStack, HStack, Box } from "@gluestack-ui/themed"
import { Search, X } from 'lucide-react-native';
import { VStack } from '~/components/ui/vstack';
import { Box } from '~/components/ui/box';
import { Input, InputField, InputIcon, InputSlot } from '~/components/ui/input';
import { useCommonBreakPoints } from '~/utils/breakPoints';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function SearchInterface() {
  const { marginAuto, minWidth, iconProductSize: iconSize, noColumns } = useCommonBreakPoints();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      const q = encodeURIComponent(searchQuery.trim());
      console.log(q);
      
      router.push(`/products?q=${q}`);
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 15,
        paddingTop: 15,
        maxWidth: 600,
        minWidth,
        marginHorizontal: marginAuto,
        backgroundColor: 'white',
      }}
      showsVerticalScrollIndicator={false}>
      <VStack space="md">
        {/* Search Bar */}
        <Box>
          <Input variant="underlined">
            <InputSlot>
              <Search size={24} />
            </InputSlot>
            <InputField
              placeholder="Search items"
              className="pl-[20] text-xl"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearchSubmit} // Handles Enter key press
              returnKeyType="search" // Makes keyboard return key a search button
            />
            <InputSlot className="pl-3">
              <X  size={24} onPress={() => router.push("/(drawer)")} />
            </InputSlot>
          </Input>
        </Box>

        {/* Recent Search */}
        {/* <VStack space="sm">
          <Text className='text-[#888888]'>Recent search</Text>
          <HStack space="sm">
            {['Adidas', 'Polo'].map((tag) => (
              <TouchableOpacity activeOpacity={0.7} key={tag} className=' border-2 border-[#F1F1F1] rounded-[30] px-[10] py-[4]'>
                <HStack space="xs" className='justify-center items-center'>
                  <Text className='text-[#000]' style={{fontWeight:400}}>{tag}</Text>
                  <X size={20}/>
                </HStack>
              </TouchableOpacity>
            ))}
          </HStack>
        </VStack> */}

        {/* Popular Search Terms */}
        {/* <VStack className='mt-3' space="sm">
          <Text className='text-[#888888]'>Popular search terms</Text>
          <VStack space="md">
            {['New', 'Jeans', 'Shirt', 'Headwear', 'Shoes'].map((term) => (
              <TouchableOpacity activeOpacity={0.7} key={term} onPress={() => {}}>
                <Text className='text-[#000]' style={{fontWeight:400}} >{term}</Text>
              </TouchableOpacity>
            ))}
          </VStack>
        </VStack> */}
      </VStack>
    </ScrollView>
  );
}
