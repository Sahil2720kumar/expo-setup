import { Link, useRouter } from 'expo-router';
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import { View, Dimensions, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

import { Button, ButtonText } from '~/components/ui/button';
import {
  FormControl,
  FormControlHelper,
  FormControlHelperText,
} from '~/components/ui/form-control';
import { HStack } from '~/components/ui/hstack';
import { Icon } from '~/components/ui/icon';
import { Input, InputField, InputIcon, InputSlot } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { useBreakpointValue } from '~/components/ui/utils/use-break-point-value';
import { userSignInSchema } from '~/vaildators/userSchema';

const SignIn = () => {
  const { width, height: screenHeight } = Dimensions.get('window');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const [isInvalid, setIsInvalid] = React.useState(false);
  const router = useRouter();

  const handleState = () => {
    setShowPassword((prev) => !prev);
  };

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

  const handleInputChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log('onSubmit...');
    try {
      const user = await userSignInSchema.validate(formData, { abortEarly: false }); // Collect all errors
      setErrors({})
      console.log(user);
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
        }}
        showsVerticalScrollIndicator={false}>
        <View className="mt-[40] flex-row items-end justify-between">
          <Text size="2xl" className="font-bold text-black">
            SIGN IN
          </Text>
          <Link href={'/(drawer)/(auth)/register'}>
            <Text size="lg" underline={true} className="text-lg font-semibold text-black underline">
              REGISTER
            </Text>
          </Link>
        </View>
        <View className="mt-[50] gap-[10]">
          <Text size="lg" className="text-lg font-semibold uppercase text-black">
            Have an account?
          </Text>
          <Text className="w-[70%] text-[#888888]">
            Sign in to speed up the checkout process and manage your orders
          </Text>
        </View>
        <View className="mt-[70] h-[45%] max-h-[300] justify-between">
          <FormControl
            isInvalid={isInvalid}
            size="md"
            isDisabled={false}
            isReadOnly={false}
            isRequired={true}
            className="gap-6">
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
                  className=""
                />
              </Input>
              <HStack
                className={`mt-1 ${errors.email ? 'flex' : 'hidden'} flex-row items-center gap-1`}
                >
                <Icon color="#DC3545" as={AlertCircleIcon} className='' />
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
              <FormControlHelper className={`${errors.password ? 'hidden' : 'block'}`}>
                <FormControlHelperText className="text-[#888888]">
                  Must be atleast 6 characters.
                </FormControlHelperText>
              </FormControlHelper>
              <View
                className={`mt-1 ${errors.password ? 'flex' : 'hidden'} flex-row items-center gap-1`} style={{flexDirection:"row"}}>
                <Icon color="#DC3545" as={AlertCircleIcon} />
                <Text className="text-[#DC3545] w-[80%]"> {errors.password ?? errors.password}</Text>
              </View>
            </View>

            <View className="flex items-end justify-end">
              <Text
                size="md"
                className=" border-black text-right font-medium uppercase text-black "
                style={{ fontWeight: '600', borderBottomWidth: 1 }}>
                Forgot password?
              </Text>
            </View>
          </FormControl>

          <Button
            size="md"
            variant="solid"
            className="rounded-[28] bg-[#F93C00]"
            onPress={handleSubmit}
            style={{ borderRadius: 28, height: 48 }}>
            <ButtonText className="uppercase" size="lg">
              sign In
            </ButtonText>
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

export default SignIn;