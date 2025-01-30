import React, { memo, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';


// Main App Component
const App = memo(() => {
    const [count, setCount] = useState(0);
    console.log(`Rendering ItemComponent:`);
 

 
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setCount(count + 1)}>
        <Text>Click to increment count: {count} </Text>
      </TouchableOpacity>

      {/* FlatList renders memoized dummy data */}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  itemContainer: {
    padding: 10,
    borderWidth: 1,
    margin: 5,
  },
});

export default App;
