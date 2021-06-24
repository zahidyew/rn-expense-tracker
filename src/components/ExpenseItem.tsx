import { Expense } from '@models/Expense';
import { createBox, createText } from '@shopify/restyle';
import { HomeScreenNavigationProp } from '@src/containers/Home';
import { Theme } from '@styles/restyle';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Card from './Card';

interface Props {
  expense: Expense;
  navigation: HomeScreenNavigationProp;
}

const Box = createBox<Theme>();
const Text = createText<Theme>();

const ExpenseItem = (props: Props) => {
  const { id, name, price, date } = props.expense;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('ExpenseScreen', {
            isEditing: true,
            expense: props.expense,
          })
        }>
        <Card variant="expensesCard">
          <View style={styles.mainRow}>
            <Text variant="body">{name}</Text>
            <Text variant="body">{price}</Text>
          </View>
          <View style={styles.subtitleRow}>
            <Text variant="subtitle">{date.substr(0, 6)}</Text>
          </View>
        </Card>
      </TouchableOpacity>
    </View>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    marginHorizontal: 20,
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
});
