import myStrings from '@locales/english';
import { Expense } from '@models/Expense';
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '@styles/restyle';
import React from 'react';
import { StyleSheet } from 'react-native';
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
    <Box flex={1} paddingHorizontal={'ml'}>
      <Card variant="expensesCard" alignItems={'center'}>
        <Text variant="body">{myStrings.expenses}</Text>
        <Text variant="body">{totals}</Text>
      </Card>
    </Box>
  );
};

export default ExpensesBox;

const styles = StyleSheet.create({});
