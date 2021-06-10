import { Colors } from '@colors';
import { Expense } from '@models/Expense';
import { useTheme } from '@react-navigation/native';
import { createGlobalStyles } from '@styles/globalStyles';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NewExpenseModal from './NewExpenseModal';

const ExpenseItem = (props: Expense) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const globalStyles = createGlobalStyles(colors);
  const { id, name, price, date } = props;
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.box}
        onPress={() => setModalVisible(true)}>
        <View style={styles.mainRow}>
          <Text style={globalStyles.normalText}>{name}</Text>
          <Text style={globalStyles.normalText}>{price}</Text>
        </View>
        <View style={styles.subtitleRow}>
          <Text style={globalStyles.subtitleText}>{date}</Text>
        </View>
      </TouchableOpacity>
      <NewExpenseModal
        isOpen={modalVisible}
        closeModal={setModalVisible}
        expense={{ id, name, price, date }}
        isUpdate={true}
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
    subtitleRow: {
      paddingHorizontal: 16,
    },
  });
  return styles;
};
