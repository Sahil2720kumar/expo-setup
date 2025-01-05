import { Stack } from 'expo-router';
import { TbShoppingBag } from 'react-icons/tb';

import { Container } from '~/components/Container';
import CustomDrawerContent from '~/components/CustomDrawerContent';
import { ScreenContent } from '~/components/ScreenContent';
import { Button, ButtonText } from '~/components/ui/button';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <ScreenContent path="app/(drawer)/index.tsx" title="Home" />
        <CustomDrawerContent/>
        <Button size="md" variant="solid" action="primary">
          <ButtonText>Hello World!</ButtonText>
        </Button>
      </Container>
    </>
  );
}
