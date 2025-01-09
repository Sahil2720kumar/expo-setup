import { Stack } from 'expo-router';
import Drawer from 'expo-router/drawer';

const StackLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerTitle:"DropSquad",
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    />
  );
};

export default StackLayout;
