import { Colors } from '@colors';
import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NewExpenseModal from './NewExpenseModal';

export interface ExpenseItemProps {
  name: string;
  price: number;
  date: string;
  time?: string;
}

const ExpenseItem = (props: ExpenseItemProps) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { name, price, date } = props;
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.box}
        onPress={() => setModalVisible(true)}>
        <View style={styles.mainRow}>
          <Text style={styles.mainText}>{name}</Text>
          <Text style={styles.mainText}>{price}</Text>
        </View>
        <View style={styles.subtitleRow}>
          <Text style={styles.subtitle}>{date}</Text>
        </View>
      </TouchableOpacity>
      <NewExpenseModal
        isOpen={modalVisible}
        closeModal={setModalVisible}
        itemName={name}
        itemPrice={price}
      />
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
      shadowOffset: { width: 1, height: 2 },
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
