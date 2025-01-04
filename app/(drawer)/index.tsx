import { Stack } from 'expo-router';

import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import { Button, ButtonText } from '~/components/ui/button';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <ScreenContent path="app/(drawer)/index.tsx" title="Home" />

        <Button size="md" variant="solid" action="primary">
          <ButtonText>Hello World!</ButtonText>
        </Button>
      </Container>
    </>
  );
}
