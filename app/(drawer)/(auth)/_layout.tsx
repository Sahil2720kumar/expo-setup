import { Slot, Stack } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, View, Image, Text, StatusBar } from 'react-native';

export default function Layout() {
  return (
    <SafeAreaView style={styles.container}>
      <View className="h-[64] items-center justify-center bg-white">
        <Text className='font-semibold text-black' style={{fontSize:22}}>DropSquad</Text>
      </View>
      <Slot />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'white',
  },
});
