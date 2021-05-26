import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Money = () => {
  return (
    <View style={styles.viewContainer}>
      <Text style={styles.title}> Money </Text>
    </View>
  );
};

export default Money;

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
