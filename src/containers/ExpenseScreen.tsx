import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '@styles/restyle';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '@src/App';
import { RouteProp } from '@react-navigation/native';
import CategoriesIcons from '@src/components/CategoriesIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
  useEffect(() => {
    if (route.params.isEditing) {
      navigation.setOptions({
        title: 'Update Expense',
        headerRight: () => (
          <TouchableOpacity style={{ paddingRight: 8 }} onPress={() => {}}>
            <Ionicons name="trash" size={24} color="red" />
          </TouchableOpacity>
        ),
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
