import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export interface ExpenseItemProps {
  name: string;
  value: number;
}

const ExpenseItem = (props: ExpenseItemProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.box}>
        <Text>{props.name}</Text>
        <Text>{props.value}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    alignItems: 'center',
  },
  box: {
    flexDirection: 'row',
    width: 325,
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: 'white',
    shadowOpacity: 0.15,
    shadowOffset: {width: 1, height: 2},
    elevation: 2,
  },
});
