import { StatusBar } from 'expo-status-bar';
import { AlertCircleIcon, Image } from 'lucide-react-native';
import { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  View,
  ScrollView
} from 'react-native';

import { Button, ButtonText } from '~/components/ui/button';
import { FormControl } from '~/components/ui/form-control';
import { HStack } from '~/components/ui/hstack';
import { Icon } from '~/components/ui/icon';
import { Input, InputField} from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { useCommonBreakPoints } from '~/utils/breakPoints';
import * as ImagePicker from 'expo-image-picker';
import { useMutation } from '@tanstack/react-query';
import contactSchema from '~/vaildators/contactShema';
import { insertContact } from '~/api/contacts';

export default function ProfileScreen() {
  const { marginAuto, minWidth } = useCommonBreakPoints();
  const [mutateError, setMutateError] = useState<string | null>(null);
  const { height: screenHeight } = Dimensions.get('window');
  // const calculatedHeight = screenHeight - 200; // Subtract 100px from screen height
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
  });
  const [contactImg, setContactImg] = useState<string | null>(null);

  const uploadImage = async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
      });

      // console.log(result);

      if (!result.canceled) {
        setContactImg(result.assets[0].uri);
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

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      // Remove unused data parameter
      const formDataCons = new FormData();

      // 1. Append image properly
      if (contactImg) {
        // console.log('heres');

        formDataCons.append('contactImg', {
          uri: contactImg,
          name: 'profile.jpg',
          type: 'image/jpeg',
        } as any); // Type assertion for React Native
      }

      // 2. Use current formData state values
      formDataCons.append('name', `${formData.firstName} ${formData.lastName}`);
      formDataCons.append('phone', formData.phoneNumber); // Changed from data.phone to formData.phone
      formDataCons.append('email', formData.email); // Changed from data.phone to formData.phone
      formDataCons.append('message', formData.message); // Changed from data.phone to formData.phone

      //  // 3. Proper logging technique
      //  console.log('FormData contents:');
      //  formDataCons.forEach((value, key) => {
      //    console.log(key, value);
      //  });

      return insertContact(formDataCons);
    },
    onSuccess(data) {
      // console.log(data);
    },
    onError(error) {
      console.log('failed:', error);
      setIsInvalid(true);
      setMutateError(error.message || 'Unknown error occurred');
    },
  });

  const handleSubmit = async () => {
    // console.log('onSubmit...');
    try {
      const user = await contactSchema.validate(formData, { abortEarly: false }); // Collect all errors
      // console.log(user);
      setErrors({});
      mutate();
    } catch (error) {
      if (error.name === 'ValidationError') {
        const fieldErrors = {};
        error.inner.forEach((err) => {
          fieldErrors[err.path] = err.message; // Map field names to their errors
        });
        // console.log(fieldErrors);
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
          <View className="gap-8 py-8" style={{ backgroundColor: '' }}>
            <Text size="4xl" className="text-center font-bold uppercase text-black">
              Contact Us
            </Text>

            <View style={{ flex: 0.2, backgroundColor: '' }}>
              <Text size="lg" className="text-[#888888]">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates esse facere
                eveniet, amet totam odit quod blanditiis. Odit sint eum nihil voluptas, atque enim?
                Tenetur atque debitis amet rerum temporibus!
              </Text>
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
                <View>
                  <Input
                    variant="underlined"
                    size="md"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                    className="min-w-[250px]">
                    <InputField
                      placeholder="Leave a comment..."
                      onChangeText={(message) => handleInputChange('message', message)}
                      value={formData.message}
                      placeholderClassName="text-[#000000]"
                    />
                  </Input>
                  <HStack
                    className={`mt-1 ${errors.message ? 'flex' : 'hidden'} flex-row items-center gap-1`}>
                    <Icon color="#DC3545" as={AlertCircleIcon} className="" />
                    <Text className="text-[#DC3545]"> {errors.message ?? errors.message}</Text>
                  </HStack>
                  <HStack
                    className={`mt-1 ${mutateError ? 'flex' : 'hidden'} flex-row items-center gap-1`}
                    style={{ flexDirection: 'row' }}>
                    <Icon color="#DC3545" as={AlertCircleIcon} />
                    <Text className="w-[80%] text-[#DC3545] ">{mutateError ?? mutateError}</Text>
                  </HStack>
                </View>
                <Pressable onPress={uploadImage}>
                  <View className="flex min-w-[250px] flex-row items-center border-b border-gray-300">
                    <Image size={24} color={`${contactImg ? 'black' : '#888888'}`} />
                    <Text
                      numberOfLines={1}
                      className={`ml-2 text-sm ${contactImg ? 'text-[#000000]' : 'text-[#888888]'}`}>
                      {contactImg || 'Choose a screenshot'}
                    </Text>
                  </View>
                </Pressable>
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
            {/* <Link href={"/hh"}>click me</Link> */}
            <Button
              size="md"
              variant="solid"
              className="rounded-[28] bg-[#F93C00]"
              style={{ borderRadius: 28, height: 48 }}
              onPress={handleSubmit}>
              {isPending ? (
                <View className="flex-row gap-3">
                  <ActivityIndicator color={'white'} />
                  <ButtonText size="lg" className="uppercase ">
                    Loading...
                  </ButtonText>
                </View>
              ) : (
                <>
                  <ButtonText size="lg" className="uppercase ">
                    {'SAVE'}
                  </ButtonText>
                </>
              )}
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
