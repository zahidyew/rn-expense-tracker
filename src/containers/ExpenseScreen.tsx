import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '@styles/restyle';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '@src/App';
import { RouteProp } from '@react-navigation/native';
import CategoriesIcons from '@src/components/CategoriesIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Expense } from '@src/models/Expense';
import { useDispatch } from 'react-redux';
import {
  addNewExpense,
  deleteExpense,
  updateExpense,
} from '@src/redux/slices/expenses';
import myStrings from '@src/locales/english';
import Numpad from '@src/components/Numpad';

export type ExpenseScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'ExpenseScreen'
>;

export type ExpenseScreenRouteProp = RouteProp<
  HomeStackParamList,
  'ExpenseScreen'
>;

type Props = {
  navigation: ExpenseScreenNavigationProp;
  route: ExpenseScreenRouteProp;
};

const Box = createBox<Theme>();
const Text = createText<Theme>();

const ExpenseScreen = ({ navigation, route }: Props) => {
  const expense: Expense | undefined = route.params?.expense;
  const price = expense?.price.toString() ?? '0';
  const [isNumpadOpen, setIsNumpadOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const dispatch = useDispatch();

  const setDeleteButton = () => {
    return (
      <TouchableOpacity
        style={{ paddingRight: 8 }}
        onPress={() => {
          expense && dispatch(deleteExpense(expense.id));
          navigation.pop();
        }}>
        <Ionicons name="trash" size={24} color="red" />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (route.params.isEditing) {
      navigation.setOptions({
        title: myStrings.updateExpense,
        headerRight: () => setDeleteButton(),
      });
    } else {
      navigation.setOptions({ title: myStrings.newExpense });
    }
  }, []);

  useEffect(() => {
    setCategoryName(expense?.name ?? '');
  }, [expense?.name]);

  const handleCategoryIsClicked = (
    isNumpadOpen: boolean,
    categoryName: string,
  ) => {
    setIsNumpadOpen(isNumpadOpen);
    setCategoryName(categoryName);
  };

  const generateExpenseId = () => {
    return new Date().valueOf();
  };

  const dispatchActionOnSubmit = (price: string, date: string) => {
    if (route.params.isEditing) {
      dispatch(
        updateExpense({
          id: expense?.id as number,
          name: categoryName,
          price: parseFloat(price),
          date: date,
        }),
      );
    } else {
      dispatch(
        addNewExpense({
          id: generateExpenseId(),
          name: categoryName,
          price: parseFloat(price),
          date: date,
          //date: '01 Jun 2020',
        }),
      );
    }
    navigation.pop();
  };

  return (
    <Box backgroundColor="background" flex={1}>
      <CategoriesIcons
        itemName={categoryName}
        onClick={handleCategoryIsClicked}
      />
      {(isNumpadOpen || route.params.isEditing) && (
        <Numpad
          price={price}
          date={expense?.date}
          onClickSubmit={dispatchActionOnSubmit}
        />
      )}
    </Box>
  );
};

const styles = StyleSheet.create({});

export default ExpenseScreen;
