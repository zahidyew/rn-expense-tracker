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
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '@src/App';

export type HomeScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'Home'
>;
type Props = {
  navigation: HomeScreenNavigationProp;
};
//type Props = StackScreenProps<HomeStackParamList, 'Home'>;

const Box = createBox<Theme>();

const Home = ({ navigation }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const expensesDataFromStore = useAppSelector((state) => state.expenses);
  const { month, year } = useAppSelector((state) => state.date);
  const [expenses, setExpenses] = useState(expensesDataFromStore);

  useEffect(() => {
    setExpenses(filterExpenses(expensesDataFromStore, month, year));
  }, [month, year, expensesDataFromStore]);

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
      <Box flex={1} marginTop={'s'}>
        <Box minHeight={30}>
          <DateBar month={month} year={year} />
        </Box>
        <Box minHeight={70} marginTop={'s'}>
          <ExpensesBox data={expenses} />
        </Box>
        <Box flex={1} marginTop={'xs'}>
          <FlatList
            keyboardShouldPersistTaps={'handled'}
            data={expenses}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item) => item.id.toString()}
          />
        </Box>
      </Box>
      <View style={styles.floatingBtnContainer}>
        <FloatingButton navigation={navigation} />
      </View>
      <NewExpenseModal isOpen={modalVisible} closeModal={setModalVisible} />
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
