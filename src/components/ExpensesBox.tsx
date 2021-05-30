import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ExpenseItemProps} from './ExpenseItem';

interface ExpensesBoxProps {
  data: ExpenseItemProps[];
}

const ExpensesBox = (props: ExpensesBoxProps) => {
  const {data} = props;

  const totals = data.reduce(
    (accumulator, current) => accumulator + current.value,
    0,
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.box}>
        <Text>Expenses</Text>
        <Text>{totals}</Text>
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
    shadowOffset: {width: 1, height: 2},
    elevation: 2,
  },
});
