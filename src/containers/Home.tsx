import DateBar from '@components/DateBar';
import ExpenseItem from '@components/ExpenseItem';
import ExpensesBox from '@components/ExpensesBox';
import FloatingButton from '@components/FloatingButton';
import NewExpenseModal from '@components/NewExpenseModal';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useAppSelector } from '@redux/reduxHooks';
import { Expense } from '@models/Expense';
import { createBox } from '@shopify/restyle';
import { Theme } from '@styles/restyle';
import { filterExpenses } from '@helpers/Filters';

const Box = createBox<Theme>();

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const expensesDataFromStore = useAppSelector((state) => state.expenses);
  const { month, monthNumber, year } = useAppSelector((state) => state.date);
  const [expenses, setExpenses] = useState(expensesDataFromStore);

  useEffect(() => {
    setExpenses(filterExpenses(expensesDataFromStore, monthNumber, year));
  }, [monthNumber, year, expensesDataFromStore]);

  const renderItem = (item: Expense) => {
    return (
      <ExpenseItem
        id={item.id}
        name={item.name}
        price={item.price}
        date={item.date}
      />
    );
  };

  return (
    <Box backgroundColor="background" flex={1}>
      <NewExpenseModal isOpen={modalVisible} closeModal={setModalVisible} />
      <Box flex={1} marginTop={'s'}>
        <Box minHeight={30}>
          <DateBar month={month} year={year} />
        </Box>
        <Box minHeight={70} marginTop={'s'}>
          <ExpensesBox data={expenses} />
        </Box>
        <Box flex={1} marginTop={'xs'}>
          <FlatList
            data={expenses}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(_item, index) => index.toString()}
          />
        </Box>
      </Box>
      <View style={styles.floatingBtnContainer}>
        <FloatingButton onClick={() => setModalVisible(true)} />
      </View>
    </Box>
  );
};

export default Home;

const styles = StyleSheet.create({
  floatingBtnContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingBottom: 15,
    paddingRight: 15,
  },
});
