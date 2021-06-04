import DateBar from '@components/DateBar';
import ExpenseItem, { ExpenseItemProps } from '@components/ExpenseItem';
import ExpensesBox from '@components/ExpensesBox';
import FloatingButton from '@components/FloatingButton';
import NewExpenseModal from '@components/NewExpenseModal';
import { getDate } from '@helpers/Dates';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addNewExpense } from '@redux/slices/expenses';

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const dataFromStore = useSelector((state) => state.expenses);
  const dispatch = useDispatch();
  /* const [displayedData, setDisplayedData] = useState(
    data.filter((item) => {
      const [day, month, year] = item.date.split('/');
      return parseInt(month) != 5;
    }),
  ); */

  const addNewData = (itemName: string, price: number) => {
    dispatch(
      addNewExpense({
        name: itemName,
        value: price,
        date: getDate('dayMonthYear'),
      }),
    );
  };

  const renderItem = (item: ExpenseItemProps) => {
    return <ExpenseItem name={item.name} value={item.value} date={item.date} />;
  };

  return (
    <View style={styles.viewContainer}>
      <NewExpenseModal
        isOpen={modalVisible}
        closeModal={setModalVisible}
        addNewExpense={addNewData}
      />
      <View style={styles.boxContainer}>
        <DateBar />
        <View style={styles.spacer}></View>
        <ExpensesBox data={dataFromStore} />
        <View style={styles.itemContainer}>
          <FlatList
            data={dataFromStore}
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
