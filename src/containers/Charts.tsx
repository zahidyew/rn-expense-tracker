import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Charts = () => {
  return (
    <View style={styles.viewContainer}>
      <Text style={styles.title}> Charts </Text>
    </View>
  );
};

export default Charts;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    color: 'white',
  },
});
