import React, { useEffect } from 'react';
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
import { deleteExpense } from '@src/redux/slices/expenses';

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
        title: 'Update Expense',
        headerRight: () => setDeleteButton(),
      });
    } else {
      navigation.setOptions({ title: 'New Expense' });
    }
  }, []);

  return (
    <Box backgroundColor="background" flex={1}>
      <CategoriesIcons />
    </Box>
  );
};

const styles = StyleSheet.create({});

export default ExpenseScreen;
