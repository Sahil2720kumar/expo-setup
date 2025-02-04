import { useMutation } from '@tanstack/react-query';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AlertCircleIcon, ChevronLeft, Upload } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';

import { updateUser } from '~/api/users';
import { Button, ButtonText } from '~/components/ui/button';
import { FormControl } from '~/components/ui/form-control';
import { HStack } from '~/components/ui/hstack';
import { Icon } from '~/components/ui/icon';
import { Image } from '~/components/ui/image';
import { Input, InputField } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import useAuthStore from '~/store/authStore';
import { useCommonBreakPoints } from '~/utils/breakPoints';
import { profileSchema } from '~/vaildators/profileSchema';
import * as FileSystem from 'expo-file-system';

export default function ProfileScreen() {
  const { userId } = useLocalSearchParams();

  const { marginAuto, minWidth, profileImageSize, imageSize, iconSize } = useCommonBreakPoints();
  const { sessionUser, sessionToken, setSessionUser } = useAuthStore();
  const { width, height: screenHeight } = Dimensions.get('window');
  const calculatedHeight = screenHeight - 200; // Subtract 100px from screen height
  const [errors, setErrors] = useState({});
  const [mutateError, setMutateError] = useState<string | null>(null);
  const [isInvalid, setIsInvalid] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    setFormData({
      firstName: sessionUser?.name.split(' ')[0]!,
      lastName: sessionUser?.name.split(' ')[1]!,
      email: sessionUser?.email!,
      phone: sessionUser?.phone!,
    });
  }, [sessionUser]);

  const [image, setImage] = useState<string | null>(null);

  const uploadImage = async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      // console.log(result);

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (err) {
      console.log('Image Uploading Error, ', err);
    }
  };

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
      if (image) {
        console.log('heres');

        formDataCons.append('profileImg', {
          uri: image,
          name: 'profile.jpg',
          type: 'image/jpeg',
        } as any); // Type assertion for React Native
      }

      // 2. Use current formData state values
      formDataCons.append('name', `${formData.firstName} ${formData.lastName}`);
      formDataCons.append('phone', formData.phone); // Changed from data.phone to formData.phone


      //  // 3. Proper logging technique
      //  console.log('FormData contents:');
      //  formDataCons.forEach((value, key) => {
      //    console.log(key, value);
      //  });
   
      return updateUser(formDataCons, sessionUser?.id!, sessionToken!);
    },
    onSuccess(data) {
      setSessionUser(data.user);
      console.log(data);

      router.push('/(drawer)/setting');
    },
    onError(error) {
      console.log('Update failed:', error);
      setIsInvalid(true);
      setMutateError(error.message || 'Unknown error occurred');
    },
  });

  const handleSubmit = async () => {
    console.log('onSubmit...');
    try {
      const user = await profileSchema.validate(formData, { abortEarly: false }); // Collect all errors
      console.log(user);
      setErrors({});
      mutate({
        name: `${formData.firstName} ${formData.lastName}`,
        phone: `${formData.phone}`,
        profileImg: image,
      });
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
            {/* TOP BUTTONS */}
            <View className="flex-row items-center justify-between">
              <TouchableOpacity
                onPress={() => router.push('/(drawer)/setting')}
                className="flex-row gap-2">
                <ChevronLeft color={'black'} />
                <Text className="text-lg font-medium text-black">Back</Text>
              </TouchableOpacity>
              <View className="flex-row items-center justify-between gap-2"></View>
            </View>
            <Text size="2xl" className="text-center font-semibold uppercase text-black">
              Profile
            </Text>

            <View style={{ flex: 0.4, backgroundColor: '' }}>
              <View>
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
                        source={
                          image
                            ? { uri: image }
                            : sessionUser?.profileImg
                              ? { uri: sessionUser.profileImg }
                              : require('assets/defaultUser.png')
                        }
                        alt="userImage"
                      />
                    </View>
                  </View>
                  <TouchableOpacity onPress={uploadImage}>
                    <Upload size={iconSize} color={'black'} />
                  </TouchableOpacity>
                </View>
                <Text size="lg" className="mt-[10] text-center text-black ">
                  {sessionUser?.name}
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
                    isDisabled={true}
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
                      onChangeText={(phone) => handleInputChange('phone', phone)}
                      value={formData.phone}
                      placeholderClassName="text-[#000000]"
                    />
                  </Input>
                  <HStack
                    className={`mt-1 ${errors.phone ? 'flex' : 'hidden'} flex-row items-center gap-1`}>
                    <Icon color="#DC3545" as={AlertCircleIcon} className="" />
                    <Text className="text-[#DC3545]">{errors.phone ?? errors.phone}</Text>
                  </HStack>
                  <HStack
                    className={`mt-1 ${mutateError ? 'flex' : 'hidden'} flex-row items-center gap-1`}
                    style={{ flexDirection: 'row' }}>
                    <Icon color="#DC3545" as={AlertCircleIcon} />
                    <Text className="w-[80%] text-[#DC3545] ">{mutateError ?? mutateError}</Text>
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
