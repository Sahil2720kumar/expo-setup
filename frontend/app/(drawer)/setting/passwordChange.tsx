import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AlertCircleIcon, ChevronLeft } from 'lucide-react-native';
import { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';

import { updateUser } from '~/api/users';
import { Button, ButtonText } from '~/components/ui/button';
import { FormControl } from '~/components/ui/form-control';
import { HStack } from '~/components/ui/hstack';
import { Icon } from '~/components/ui/icon';
import { Input, InputField } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import useAuthStore from '~/store/authStore';
import { useCommonBreakPoints } from '~/utils/breakPoints';
import { passwordChangeSchema } from '~/vaildators/profileSchema';

export default function PasswordChangeScreen() {
  const { marginAuto, minWidth} = useCommonBreakPoints();

  const { width, height: screenHeight } = Dimensions.get('window');
  const calculatedHeight = screenHeight - 200; // Subtract 100px from screen height
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [mutateError, setMutateError] = useState<string | null>(null);
  const [isInvalid, setIsInvalid] = useState(false);
  const { sessionUser, sessionToken, setSessionUser } = useAuthStore();

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
      formDataCons.append('password', formData.newPassword);
      formDataCons.append("oldPassword",formData.currentPassword)
      return updateUser(formDataCons, sessionUser?.id!, sessionToken!);
    },
    onSuccess(data) {
      setSessionUser(data.user);
      // console.log(data);
      router.push('/(drawer)/setting');
    },
    onError(error) {
      console.log('Update failed:', error);
      setIsInvalid(true);
      setMutateError(error.message || 'Unknown error occurred');
    },
  });

  const handleSubmit = async () => {
    // console.log('onSubmit...');
    try {
      const user = await passwordChangeSchema.validate(formData, { abortEarly: false }); // Collect all errors
      // console.log(user);
      setErrors({});
      mutate()
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
            <View style={{ flex: 0.4 }} />

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
                      placeholder="Enter Current Password"
                      onChangeText={(currentPassword) =>
                        handleInputChange('currentPassword', currentPassword)
                      }
                      value={formData.currentPassword}
                      placeholderClassName="text-[#000000]"
                    />
                  </Input>
                  <HStack
                    className={`mt-1 ${errors.currentPassword ? 'flex' : 'hidden'} flex-row items-center gap-1`}>
                    <Icon color="#DC3545" as={AlertCircleIcon} className="" />
                    <Text className="text-[#DC3545]">
                      {errors.currentPassword ?? errors.currentPassword}
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
                    className="min-w-[50%]">
                    <InputField
                      placeholder="Enter New Password"
                      onChangeText={(newPassword) => handleInputChange('newPassword', newPassword)}
                      value={formData.newPassword}
                      placeholderClassName="text-[#000000]"
                    />
                  </Input>
                  <HStack
                    className={`mt-1 ${errors.newPassword ? 'flex' : 'hidden'} flex-row items-center gap-1`}>
                    <Icon color="#DC3545" as={AlertCircleIcon} className="" />
                    <Text className="text-[#DC3545]">
                      {' '}
                      {errors.newPassword ?? errors.newPassword}
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
                      placeholder="Confirm New Password"
                      onChangeText={(confirmNewPassword) =>
                        handleInputChange('confirmNewPassword', confirmNewPassword)
                      }
                      value={formData.confirmNewPassword}
                      placeholderClassName="text-[#000000]"
                    />
                  </Input>
                  <HStack
                    className={`mt-1 ${errors.confirmNewPassword ? 'flex' : 'hidden'} flex-row items-center gap-1`}>
                    <Icon color="#DC3545" as={AlertCircleIcon} className="" />
                    <Text className="text-[#DC3545]">
                      {' '}
                      {errors.confirmNewPassword ?? errors.confirmNewPassword}
                    </Text>
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
