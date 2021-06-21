import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { createBox } from '@shopify/restyle';
import { Theme } from '@styles/restyle';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '@src/App';
import { RouteProp } from '@react-navigation/native';
import CategoriesIcons from '@src/components/CategoriesIcons';

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

const ExpenseScreen = ({ navigation, route }: Props) => {
  useEffect(() => {
    if (route.params.isEditing) {
      navigation.setOptions({ title: 'Update Expense' });
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
