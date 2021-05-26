import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Home = () => {
  return (
    <View style={styles.viewContainer}>
      <Text style={styles.title}>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
  }
});
