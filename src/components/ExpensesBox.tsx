import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ExpensesBox = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.box}>
        <Text>Expenses</Text>
        <Text>99.00</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExpensesBox;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  box: {
    width: 325,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 2 },
    elevation: 2,
  }
});
