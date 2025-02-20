import { useMutation } from '@tanstack/react-query';
import { Link, Redirect, useRouter } from 'expo-router';
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  View,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { signUpUser } from '~/api/auth';

import { Button, ButtonText } from '~/components/ui/button';
import { FormControl } from '~/components/ui/form-control';
import { HStack } from '~/components/ui/hstack';
import { Icon } from '~/components/ui/icon';
import { Input, InputField, InputIcon, InputSlot } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import useAuthStore from '~/store/authStore';
import { useCommonBreakPoints } from '~/utils/breakPoints';
import { userSignUpSchema } from '~/vaildators/userSchema';

const SignUpScreen = () => {
  const { width, height: screenHeight } = Dimensions.get('window');
  const { marginAuto, minWidth } = useCommonBreakPoints();
  const { setSessionUser, setSessionToken, sessionToken ,sessionUser} = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone:'',
  });
  const [errors, setErrors] = useState({});
  const [signUpError, setSignUpError] = useState<string | null>(null);

  const [isInvalid, setIsInvalid] = React.useState(false);
  const router = useRouter();

  const handleState = () => {
    setShowPassword((prev) => !prev);
  };

  //Mutation SignUp
  const { mutate, isPending } = useMutation({
    mutationFn: (data: { firstName: string; lastName: string; email: string; password: string }) =>
      signUpUser(data),
    onSuccess(data) {
      router.push('/(drawer)/(auth)/signIn');
    },
    onError(error) {
      console.log('signUp Failed', error.message);
      setSignUpError(error.message);
      setIsInvalid(true);
    },
  });

  const handleInputChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  

  const handleSubmit = async () => {
    console.log('onSubmit...');
    try {
      const user = await userSignUpSchema.validate(formData, { abortEarly: false }); // Collect all errors
      console.log(user);
      setErrors({});
      setSignUpError(null)
      mutate(user);
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

  if (sessionToken && sessionUser) {
    return <Redirect href={'/(drawer)'} />;
  }

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
        }}
        showsVerticalScrollIndicator={false}>
        <View className="mt-[40] flex-row items-end justify-between">
          <Text size="2xl" className="font-bold text-black">
            REGISTER
          </Text>
          <Link href={'/(drawer)/(auth)/signIn'}>
            <Text size="lg" underline={true} className="text-lg font-semibold text-black underline">
              SIGN IN
            </Text>
          </Link>
        </View>
        <View className="mt-[50] gap-[10]">
          <Text size="lg" className="text-lg font-semibold uppercase text-black">
            New to open fashion?
          </Text>
          <Text className="w-[70%] text-[#888888]">
            Register to speed up the checkout process and manage your order
          </Text>
        </View>
        <View className="mt-[70] h-[50%] max-h-[500] justify-between">
          <FormControl
            isInvalid={isInvalid}
            size="md"
            isDisabled={false}
            isReadOnly={false}
            isRequired={true}
            className="gap-6">
            <View>
              <View className="flex-row gap-[9] ">
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
              </View>
              <HStack
                className={`mt-1 ${errors.firstName ? 'flex' : 'hidden'} flex-row items-center gap-1`}>
                <Icon color="#DC3545" as={AlertCircleIcon} className="" />
                <Text className="text-[#DC3545]"> {errors.firstName ?? errors.firstName}</Text>
              </HStack>
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
                  placeholder="Email Address"
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
                isReadOnly={false}>
                <InputField
                  placeholder="Password"
                  onChangeText={(password) => handleInputChange('password', password)}
                  value={formData.password}
                  placeholderClassName="text-[#000000]"
                  type={showPassword ? 'text' : 'password'}
                />
                <InputSlot className="pr-3" onPress={handleState}>
                  <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                </InputSlot>
              </Input>
              <HStack
                className={`mt-1 ${errors.password ? 'flex' : 'hidden'} flex-row items-center gap-1`}>
                <Icon color="#DC3545" as={AlertCircleIcon} className="" />
                <Text className="text-[#DC3545]"> {errors.password ?? errors.password}</Text>
              </HStack>
            </View>
            <View>
              <Input
                variant="underlined"
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}>
                <InputField
                  placeholder="Phone number"
                  onChangeText={(phone) => handleInputChange('phone', phone)}
                  value={formData.phone}
                  placeholderClassName="text-[#000000]"
                  keyboardType='numeric'
                />
              </Input>
              <HStack 
                className={`mt-1 ${errors.phone ? 'flex' : 'hidden'} flex-row items-center gap-1`}>
                <Icon color="#DC3545" as={AlertCircleIcon} className="" />
                <Text className="text-[#DC3545]"> {errors.phone ?? errors.phone}</Text>
              </HStack>
              <HStack
                className={`mt-1 ${signUpError ? 'flex' : 'hidden'} flex-row items-center gap-1`}>
                <Icon color="#DC3545" as={AlertCircleIcon} />
                <Text className="w-[80%] text-[#DC3545] ">{signUpError ?? signUpError}</Text>
              </HStack>
            </View>
            <View className="flex w-[75%] items-start justify-start">
              <Text size="md" className=" text-[#888888] " style={{}}>
                By you clicking Register Now, you agree to our{' '}
                <Text className="font-semibold text-[#F93C00]">Term & Conditions</Text> and
                <Text className="font-semibold text-[#F93C00]">Privacy Policy.</Text>
              </Text>
            </View>
          </FormControl>

          <Button
            size="md"
            variant="solid"
            className="rounded-[28] bg-[#F93C00]"
            onPress={handleSubmit}
            style={{ borderRadius: 28, height: 48 }}>
            {/* <ButtonText size="lg" className="uppercase">
              Register now
            </ButtonText> */}
            {isPending ? (
              <View className="flex-row gap-3">
                <ActivityIndicator color={'white'} />
                <ButtonText size="lg" className="uppercase ">
                  Loading...
                </ButtonText>
              </View>
            ) : (
              <ButtonText size="lg" className="uppercase ">
                REGISTER
              </ButtonText>
            )}
          </Button>
        </View>
        {/* <View>
          <Text size='md' className='uppercase text-center text-black'>or</Text>
          <View>
            <Google/>
          </View>
        </View> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
