import myStrings from '@locales/english';
import { Expense } from '@models/Expense';
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '@styles/restyle';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Card from './Card';

interface ExpensesBoxProps {
  data: Expense[];
}

const Box = createBox<Theme>();
const Text = createText<Theme>();

const ExpensesBox = (props: ExpensesBoxProps) => {
  const { data } = props;

  const totals = data.reduce(
    (accumulator, current) => accumulator + current.price,
    0,
  );

  return (
    <View style={styles.container}>
      <Card variant="centeredTextCard">
        <Text variant="body">{myStrings.expenses}</Text>
        <Text variant="body">{totals}</Text>
      </Card>
    </View>
  );
};

export default ExpensesBox;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
