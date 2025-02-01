import { StatusBar } from 'expo-status-bar';
import { AlertCircleIcon, Plus } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
// import { ScrollView } from 'react-native-virtualized-view';
import { Button, ButtonIcon, ButtonText } from '~/components/ui/button';
import { FormControl } from '~/components/ui/form-control';
import { HStack } from '~/components/ui/hstack';
import { Icon } from '~/components/ui/icon';
import { Input, InputField } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import addressSchema from '~/vaildators/addressSchema';
import { useCommonBreakPoints } from '~/utils/breakPoints';
import useAuthStore from '~/store/authStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAddressById, insertAddress, updateAddress } from '~/api/addresses';
import { router, useLocalSearchParams } from 'expo-router';
import { Address } from '~/types/user';

export default function AddAddressScreen() {
  const { id: addressId } = useLocalSearchParams();
  // console.log('id is', addressId);
  useEffect(() => {
    setFormData({
      street: '',
      state: '',
      city: '',
      zipCode: '',
    });
  }, [addressId]);

  const client = useQueryClient();

  const { marginAuto, minWidth } = useCommonBreakPoints();
  const { width, height: screenHeight } = Dimensions.get('window');
  const calculatedHeight = screenHeight - 200; // Subtract 100px from screen height
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [errors, setErrors] = useState({});
  const [mutateError, setMutateError] = useState<string | null>(null);
  const [isInvalid, setIsInvalid] = useState(false);
  const handleInputChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const { sessionUser, sessionToken } = useAuthStore();

  // Submit address
  const { mutate, isPending } = useMutation({
    mutationFn: (data: { state: string; city: string; street: string; zip: string }) =>
      addressId
        ? updateAddress(data, Number(sessionUser?.id), Number(addressId), sessionToken!)
        : insertAddress(data, Number(sessionUser?.id), sessionToken!),
    onSuccess(data) {
      client.invalidateQueries({ queryKey: ['shippingAddresses', sessionUser?.id] });
      client.invalidateQueries({ queryKey: ['shippingAddress', addressId] });
      router.push('/(drawer)/shippingAddress');
    },
    onError(error) {
      // console.log('insert Failed', error);
      setIsInvalid(true);
      setMutateError(error.message);
    },
  });

  //Get address By Id
  const {
    data: address,
    isLoading,
    error,
    isSuccess,
  } = useQuery<Address>({
    queryKey: ['shippingAddress', addressId],
    queryFn: () => getAddressById(Number(sessionUser?.id), Number(addressId), sessionToken!),
    enabled: !!addressId,
  });

  useEffect(() => {
    if (address) {
      setFormData({
        street: address.street || '',
        state: address.state || '',
        city: address.city || '',
        zipCode: address.zip || '',
      });
    }
  }, [address]);
  

  if (addressId && isLoading) {
    return (
      <View
        style={{
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  const handleSubmit = async () => {
    console.log('onSubmit...');
    try {
      const address = await addressSchema.validate(formData, { abortEarly: false }); // Collect all errors
      console.log(address);
      setErrors({});
      setMutateError(null);
      mutate({
        state: address.state,
        city: address.city,
        street: address.street,
        zip: address.zipCode,
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
            <Text size="2xl" className="text-center font-semibold uppercase text-black">
              Add shipping adress
            </Text>
            <Text size="lg" className="text-left font-semibold uppercase text-black">
              Shipping adress
            </Text>
            <View className="justify-between">
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
                      placeholder="Street"
                      onChangeText={(street) => handleInputChange('street', street)}
                      value={formData.street || ''}
                      placeholderClassName="text-[#000000]"
                    />
                  </Input>
                  <HStack
                    className={`mt-1 ${errors.street ? 'flex' : 'hidden'} flex-row items-center gap-1`}>
                    <Icon color="#DC3545" as={AlertCircleIcon} className="" />
                    <Text className="text-[#DC3545]"> {errors.street ?? errors.street}</Text>
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
                      placeholder="City"
                      onChangeText={(city) => handleInputChange('city', city)}
                      value={formData.city || ''}
                      placeholderClassName="text-[#000000]"
                    />
                  </Input>
                  <HStack
                    className={`mt-1 ${errors.city ? 'flex' : 'hidden'} flex-row items-center gap-1`}>
                    <Icon color="#DC3545" as={AlertCircleIcon} className="" />
                    <Text className="text-[#DC3545]"> {errors.city ?? errors.city}</Text>
                  </HStack>
                </View>
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
                        placeholder="State"
                        onChangeText={(state) => handleInputChange('state', state)}
                        value={formData.state || ''}
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
                        placeholder="Zip code"
                        onChangeText={(zipCode) => handleInputChange('zipCode', zipCode)}
                        value={formData.zipCode || ''}
                        placeholderClassName="text-[#000000]"
                      />
                    </Input>
                  </View>
                  <HStack
                    className={`mt-1 ${errors.state ? 'flex' : 'hidden'} flex-row items-center gap-1`}>
                    <Icon color="#DC3545" as={AlertCircleIcon} className="" />
                    <Text className="text-[#DC3545]"> {errors.state ?? errors.state}</Text>
                  </HStack>
                  <HStack
                    className={`mt-1 ${errors.zipCode ? 'flex' : 'hidden'} flex-row items-center gap-1`}>
                    <Icon color="#DC3545" as={AlertCircleIcon} className="" />
                    <Text className="text-[#DC3545]"> {errors.zipCode ?? errors.zipCode}</Text>
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
                  <ButtonIcon as={Plus} className="text-white" />

                  <ButtonText size="lg" className="uppercase ">
                    {addressId ? 'UPDATE NOW' : 'ADD NOW'}
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
