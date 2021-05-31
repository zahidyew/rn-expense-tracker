import ExpenseItem, {ExpenseItemProps} from '@components/ExpenseItem';
import ExpensesBox from '@components/ExpensesBox';
import FloatingButton from '@components/FloatingButton';
import NewExpenseModal from '@components/NewExpenseModal';
import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

const Home = () => {
  const dummyData: ExpenseItemProps[] = [
    {
      name: 'Groceries',
      value: 44.5,
    },
    {
      name: 'Dinner',
      value: 10,
    },
  ];
  const [data, setData] = useState(dummyData);
  const [modalVisible, setModalVisible] = useState(false);

  const addNewData = (itemName: string, price: number) => {
    setData([...data, {name: itemName, value: price}]);
  };

  const renderItem = (item: ExpenseItemProps) => {
    return <ExpenseItem name={item.name} value={item.value} />;
  };

  return (
    <View style={styles.viewContainer}>
      <NewExpenseModal
        isOpen={modalVisible}
        closeModal={setModalVisible}
        addNewExpense={addNewData}
      />
      <View style={styles.boxContainer}>
        <ExpensesBox data={data} />
        <View style={styles.itemContainer}>
          <FlatList
            data={data}
            renderItem={({item}) => renderItem(item)}
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
