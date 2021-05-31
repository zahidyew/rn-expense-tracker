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
        <View style={styles.mainRow}>
          <Text>{props.name}</Text>
          <Text>{props.value}</Text>
        </View>
        <View style={styles.subtitleRow}>
          <Text style={styles.subtitle}>date here</Text>
        </View>
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
    width: 325,
    height: 70,
    backgroundColor: 'white',
    shadowOpacity: 0.15,
    shadowOffset: {width: 1, height: 2},
    elevation: 2,
    justifyContent: 'center',
  },
  mainRow: {
    paddingTop: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subtitleRow: {
    paddingHorizontal: 16,
  },
  subtitle: {
    fontSize: 12,
    color: 'gray',
  },
});
