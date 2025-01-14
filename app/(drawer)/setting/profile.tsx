import { StatusBar } from 'expo-status-bar';
import {
  AlertCircleIcon,
  ChevronRight,
  EyeIcon,
  EyeOffIcon,
  Minus,
  Package,
  Plus,
  Upload,
} from 'lucide-react-native';
import { useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
// import { ScrollView } from 'react-native-virtualized-view';
import { ScrollView } from 'react-native';
import CartItem from '~/components/CartItem';
import { Bag } from '~/components/Icons';

import { ScreenContent } from '~/components/ScreenContent';
import { Button, ButtonIcon, ButtonText } from '~/components/ui/button';
import { FormControl } from '~/components/ui/form-control';
import { HStack } from '~/components/ui/hstack';
import { Icon } from '~/components/ui/icon';
import { Image } from '~/components/ui/image';
import { Input, InputField, InputSlot, InputIcon } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { useBreakpointValue } from '~/components/ui/utils/use-break-point-value';
import addressSchema from '~/vaildators/addressSchema';
import profileSchema from '~/vaildators/profileSchema';
import { useCommonBreakPoints } from '~/utils/breakPoints';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const { marginAuto, minWidth, profileImageSize, imageSize, iconSize } = useCommonBreakPoints();

  const { width, height: screenHeight } = Dimensions.get('window');
  const calculatedHeight = screenHeight - 200; // Subtract 100px from screen height
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });
  const [image, setImage] = useState<string | null>(null);

  const uploadImage = async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync()
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (err) {
      console.log('Image Uploading Error, ', err);
    }
  };
  const [errors, setErrors] = useState({});

  const [isInvalid, setIsInvalid] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const cartItems = [1, 2, 3, 4, 5, 6];

  const handleSubmit = async () => {
    console.log('onSubmit...');
    try {
      const user = await profileSchema.validate(formData, { abortEarly: false }); // Collect all errors
      console.log(user);
      setErrors({});
    } catch (error) {
      if (error.name === 'ValidationError') {
        const fieldErrors = {};
        error.inner.forEach((err) => {
          fieldErrors[err.path] = err.message; // Map field names to their errors
        });
        console.log(fieldErrors);
        setErrors(fieldErrors);
        // Handle errors (e.g., show them to the user)
      } else {
        console.log('Unexpected error:', error);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 15,
          paddingTop: 15,
          maxWidth: 600,
          minWidth: minWidth,
          marginHorizontal: marginAuto,
          backgroundColor: '#fff',
        }}
        showsVerticalScrollIndicator={false}>
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

        <View
          className=""
          style={{
            paddingBottom: 3,
            backgroundColor: '',
            //   flex:1,
            //   justifyContent: 'flex-start',
            ...(Platform.OS === 'web' && {
              justifyContent: 'space-between', // Web-specific style
            }),
          }}>
          <View className="gap-8" style={{ height: calculatedHeight + 50, backgroundColor: '' }}>
            <Text size="2xl" className="text-center font-semibold uppercase text-black">
              Profile
            </Text>

            <View style={{ flex: 0.4, backgroundColor: '' }}>
              <View style={{ flex: 1 }}>
                <View className="flex-row items-center justify-between">
                  <View className="flex-1 items-center">
                    <View
                      className="rounded-full bg-white"
                      style={{
                        width: profileImageSize, // Fixed size for the parent view
                        height: profileImageSize,
                        marginLeft: iconSize,
                        overflow: 'hidden', // Ensures rounded corners clip the child content
                        // alignItems: 'center', // Center content horizontally
                        // justifyContent: 'center', // Center content vertically
                      }}>
                      <Image
                        size={imageSize}
                        style={{
                          width: '100%', // Cover full width of the parent
                          height: '100%', // Cover full height of the parent
                        }}
                        source={image?{uri:image}:require('assets/defaultUser.png')}
                        alt="userImage"
                      />
                    </View>
                  </View>
                  <TouchableOpacity onPress={uploadImage}>
                    <Upload size={iconSize} color={'black'} />
                  </TouchableOpacity>
                </View>
                <Text size="lg" className="mt-[10] text-center text-black ">
                  New Fashion
                </Text>
              </View>
            </View>

            <View className="flex-1" style={{ flex: 1, backgroundColor: '' }}>
              <FormControl
                isInvalid={isInvalid}
                size="md"
                isDisabled={false}
                isReadOnly={false}
                isRequired={true}
                className="gap-6">
                <View className="">
                  <Input
                    variant="underlined"
                    size="md"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                    className="min-w-[50%] ">
                    <InputField
                      placeholder="First name"
                      onChangeText={(firstName) => handleInputChange('firstName', firstName)}
                      value={formData.firstName}
                      placeholderClassName="text-[#000000]"
                    />
                  </Input>
                  <HStack
                    className={`mt-1 ${errors.firstName ? 'flex' : 'hidden'} flex-row items-center gap-1`}>
                    <Icon color="#DC3545" as={AlertCircleIcon} className="" />
                    <Text className="text-[#DC3545]">{errors.firstName ?? errors.firstName}</Text>
                  </HStack>
                </View>
                <View>
                  <Input
                    variant="underlined"
                    size="md"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                    className="min-w-[50%]">
                    <InputField
                      placeholder="Last name"
                      onChangeText={(lastName) => handleInputChange('lastName', lastName)}
                      value={formData.lastName}
                      placeholderClassName="text-[#000000]"
                    />
                  </Input>
                  <HStack
                    className={`mt-1 ${errors.lastName ? 'flex' : 'hidden'} flex-row items-center gap-1`}>
                    <Icon color="#DC3545" as={AlertCircleIcon} className="" />
                    <Text className="text-[#DC3545]"> {errors.lastName ?? errors.lastName}</Text>
                  </HStack>
                </View>

                <View>
                  <Input
                    variant="underlined"
                    size="md"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                    className="min-w-[250px]">
                    <InputField
                      placeholder="Email address"
                      onChangeText={(email) => handleInputChange('email', email)}
                      value={formData.email}
                      placeholderClassName="text-[#000000]"
                    />
                  </Input>
                  <HStack
                    className={`mt-1 ${errors.email ? 'flex' : 'hidden'} flex-row items-center gap-1`}>
                    <Icon color="#DC3545" as={AlertCircleIcon} className="" />
                    <Text className="text-[#DC3545]"> {errors.email ?? errors.email}</Text>
                  </HStack>
                </View>

                <View>
                  <Input
                    variant="underlined"
                    size="md"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                    className="min-w-[250px]">
                    <InputField
                      placeholder="Phone number"
                      onChangeText={(phoneNumber) => handleInputChange('phoneNumber', phoneNumber)}
                      value={formData.phoneNumber}
                      placeholderClassName="text-[#000000]"
                    />
                  </Input>
                  <HStack
                    className={`mt-1 ${errors.phoneNumber ? 'flex' : 'hidden'} flex-row items-center gap-1`}>
                    <Icon color="#DC3545" as={AlertCircleIcon} className="" />
                    <Text className="text-[#DC3545]">
                      {errors.phoneNumber ?? errors.phoneNumber}
                    </Text>
                  </HStack>
                </View>
              </FormControl>
            </View>
          </View>
          <View
            className="w-full"
            style={{
              paddingVertical: 10,
              gap: 8,
              justifyContent: 'flex-end',
              backgroundColor: '',
            }}>
            <Button
              size="md"
              variant="solid"
              className="rounded-[28] bg-[#F93C00]"
              style={{ borderRadius: 28, height: 48 }}
              onPress={handleSubmit}>
              <ButtonText className="uppercase" size="lg">
                Save
              </ButtonText>
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
