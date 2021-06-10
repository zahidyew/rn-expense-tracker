import { Colors } from '@colors';
import myStrings from '@locales/english';
import { Expense } from '@models/Expense';
import { useTheme } from '@react-navigation/native';
import { createGlobalStyles } from '@styles/globalStyles';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ExpensesBoxProps {
  data: Expense[];
}

const ExpensesBox = (props: ExpensesBoxProps) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const globalStyles = createGlobalStyles(colors);
  const { data } = props;

  const totals = data.reduce(
    (accumulator, current) => accumulator + current.price,
    0,
  );

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={globalStyles.normalText}>{myStrings.expenses}</Text>
        <Text style={globalStyles.normalText}>{totals}</Text>
      </View>
    </View>
  );
};

export default ExpensesBox;

const createStyles = (colors: Colors) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    box: {
      width: 325,
      height: 70,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.card,
      shadowOpacity: 0.15,
      shadowOffset: { width: 1, height: 2 },
      elevation: 2,
    },
  });
  return styles;
};
