import ExpenseItem from '@components/ExpenseItem';
import ExpensesBox from '@components/ExpensesBox';
import FloatingButton from '@components/FloatingButton';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Money = () => {
  const dummyData = [
    {

    },
    {

    },
  ];
  const [data, setData] = useState(dummyData);

  const addNewData = () => {
    setData([...data, {}]);
  };

  return (
    <View style={styles.viewContainer}>
      <View style={styles.boxContainer}>
        <ExpensesBox />
        <View style={styles.itemContainer}>
          {data.map((item) => {
            return <ExpenseItem />;
          })}
        </View>
      </View>
      <View style={styles.floatingBtnContainer}>
        <FloatingButton onClick={addNewData} />
      </View>
    </View>
  );
};

export default Money;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
  },
  boxContainer: {
    flex: 1,
    paddingTop: 10,
  },
  itemContainer: {
    paddingTop: 10,
  },
  floatingBtnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: 15,
    paddingRight: 15,
  }
});
