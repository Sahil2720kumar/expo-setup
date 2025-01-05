import FontAwesome from '@expo/vector-icons/FontAwesome';
import { forwardRef } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

// Get the valid names for Feather icons
type FeatherIconName = keyof typeof Feather.glyphMap;

export const HeaderButton = forwardRef<
  typeof Pressable,
  { onPress?: () => void; iconName: FeatherIconName }
>(({ onPress, iconName }, ref) => {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <Feather
          name={iconName}
          size={24}
          color={iconName}
          style={[
            styles.headerRight,
            {
              opacity: pressed ? 0.5 : 1,
            },
          ]}
        />
      )}
    </Pressable>
  );
});

export const styles = StyleSheet.create({
  headerRight: {
    marginRight: 15,
  },
});
