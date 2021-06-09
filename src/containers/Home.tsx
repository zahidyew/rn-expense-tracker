import DateBar from '@components/DateBar';
import ExpenseItem from '@components/ExpenseItem';
import ExpensesBox from '@components/ExpensesBox';
import FloatingButton from '@components/FloatingButton';
import NewExpenseModal from '@components/NewExpenseModal';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useAppSelector } from '@redux/reduxHooks';
import { Expense } from '@models/Expense';

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const expensesDataFromStore = useAppSelector((state) => state.expenses);
  const { month, monthNumber, year } = useAppSelector((state) => state.date);
  const [expenses, setExpenses] = useState(expensesDataFromStore);

  useEffect(() => {
    setExpenses(
      expensesDataFromStore.filter(
        (item) => item.date.split('/')[1] == monthNumber,
      ),
    );
  }, [month, expensesDataFromStore]);

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
    <View style={styles.viewContainer}>
      <NewExpenseModal isOpen={modalVisible} closeModal={setModalVisible} />
      <View style={styles.boxContainer}>
        <DateBar month={month} year={year} />
        <View style={styles.spacer}></View>
        <ExpensesBox data={expenses} />
        <View style={styles.itemContainer}>
          <FlatList
            data={expenses}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(_item, index) => index.toString()}
          />
        </View>
      </View>
      <View style={styles.floatingBtnContainer}>
        <FloatingButton onClick={() => setModalVisible(true)} />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  spacer: {
    marginTop: 10,
  },
  viewContainer: {
    flex: 1,
  },
  boxContainer: {
    flex: 1,
    paddingTop: 10,
  },
  itemContainer: {
    flex: 1,
    marginTop: 10,
  },
  floatingBtnContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingBottom: 15,
    paddingRight: 15,
  },
});
