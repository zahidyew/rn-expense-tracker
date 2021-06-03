import {Colors} from '@colors';
import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export interface ExpenseItemProps {
  name: string;
  value: number;
  date: string;
  time?: string;
}

const ExpenseItem = (props: ExpenseItemProps) => {
  const {colors} = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.box}>
        <View style={styles.mainRow}>
          <Text style={styles.mainText}>{props.name}</Text>
          <Text style={styles.mainText}>{props.value}</Text>
        </View>
        <View style={styles.subtitleRow}>
          <Text style={styles.subtitle}>{props.date}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ExpenseItem;

const createStyles = (colors: Colors) => {
  const styles = StyleSheet.create({
    container: {
      marginTop: 8,
      alignItems: 'center',
    },
    box: {
      width: 325,
      height: 70,
      shadowOpacity: 0.15,
      shadowOffset: {width: 1, height: 2},
      elevation: 2,
      justifyContent: 'center',
      backgroundColor: colors.card,
    },
    mainRow: {
      paddingTop: 8,
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    mainText: {
      color: colors.text,
    },
    subtitleRow: {
      paddingHorizontal: 16,
    },
    subtitle: {
      fontSize: 12,
      color: colors.text,
      opacity: 0.5,
    },
  });
  return styles;
};
