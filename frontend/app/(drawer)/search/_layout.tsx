import { Slot, Stack } from 'expo-router';

const searchLayout = () => {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Search',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
    </Stack>
  );
};

export default searchLayout;
