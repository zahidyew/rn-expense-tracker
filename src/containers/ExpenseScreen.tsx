import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { createBox, createText, useTheme } from '@shopify/restyle';
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
import { getDate } from '@src/helpers/Dates';
import myStrings from '@src/locales/english';

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
  const [isNumpadOpen, setIsNumpadOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [price, setPrice] = useState('0');
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

  const handleClick = (isNumpadOpen: boolean, categoryName: string) => {
    setIsNumpadOpen(isNumpadOpen);
    setCategoryName(categoryName);
  };

  const theme = useTheme<Theme>();
  const { border } = theme.colors;

  const generateId = () => {
    return new Date().valueOf();
  };

  useEffect(() => {
    setPrice(expense?.price.toString() ?? '0');
    setCategoryName(expense?.name ?? '');
  }, [expense?.price, expense?.name]);

  useEffect(() => {
    if (price.length === 0) {
      setPrice('0');
    }
  }, [price]);

  const numpadFirstRow = ['7', '8', '9'];
  const numpadSecondRow = ['4', '5', '6'];
  const numpadThirdRow = ['1', '2', '3'];

  const drawNumpadNumbers = (number: string) => {
    return (
      <TouchableOpacity
        key={number}
        onPress={() => {
          if (price === '0') {
            setPrice(number);
          } else {
            setPrice(price + number);
          }
        }}
        style={[styles.numpadButtons, { borderColor: border }]}>
        <Text variant="body">{number}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Box backgroundColor="background" flex={1}>
      <CategoriesIcons itemName={categoryName} onClick={handleClick} />
      {(isNumpadOpen || route.params.isEditing) && (
        <Box
          backgroundColor="foreground"
          position="absolute"
          bottom={0}
          height="35%"
          width="100%">
          <Box
            flex={1}
            flexDirection="row"
            justifyContent="flex-end"
            alignItems="center"
            borderWidth={0.5}
            borderColor="border">
            <Box paddingRight="ms">
              <Text variant="body">{price}</Text>
            </Box>
          </Box>
          <Box
            flex={1}
            flexDirection="row"
            borderWidth={0.5}
            borderColor="border">
            {numpadFirstRow.map((num) => {
              return drawNumpadNumbers(num);
            })}
            <TouchableOpacity
              style={[styles.numpadButtons, { borderColor: border }]}>
              <Text variant="body">{expense?.date.substr(0, 6)}</Text>
            </TouchableOpacity>
          </Box>
          <Box
            flex={1}
            flexDirection="row"
            borderWidth={0.5}
            borderColor="border">
            {numpadSecondRow.map((num) => {
              return drawNumpadNumbers(num);
            })}
            <TouchableOpacity
              style={[styles.numpadButtons, { borderColor: border }]}>
              <Text variant="body">{'+'}</Text>
            </TouchableOpacity>
          </Box>
          <Box
            flex={1}
            flexDirection="row"
            borderWidth={0.5}
            borderColor="border">
            {numpadThirdRow.map((num) => {
              return drawNumpadNumbers(num);
            })}
            <TouchableOpacity
              style={[styles.numpadButtons, { borderColor: border }]}>
              <Text variant="body">{'-'}</Text>
            </TouchableOpacity>
          </Box>
          <Box
            flex={1}
            flexDirection="row"
            borderWidth={0.5}
            borderColor="border">
            <TouchableOpacity
              onPress={() => {
                if (price.includes('.')) {
                  return;
                }
                setPrice(price + '.');
              }}
              style={[styles.numpadButtons, { borderColor: border }]}>
              <Text variant="body">.</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (price === '0') {
                  return;
                }
                setPrice(price + '0');
              }}
              style={[styles.numpadButtons, { borderColor: border }]}>
              <Text variant="body">0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (price === '0') {
                  return;
                }
                setPrice(price.substr(0, price.length - 1));
              }}
              style={[styles.numpadButtons, { borderColor: border }]}>
              <Text variant="body">x</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (route.params.isEditing) {
                  dispatch(
                    updateExpense({
                      id: expense?.id as number,
                      name: categoryName,
                      price: parseFloat(price),
                      date: expense?.date as string,
                    }),
                  );
                } else {
                  dispatch(
                    addNewExpense({
                      id: generateId(),
                      name: categoryName,
                      price: parseFloat(price),
                      date: getDate('dayMonthYear'),
                      //date: '01 Jun 2020',
                    }),
                  );
                }
                navigation.pop();
              }}
              style={[styles.numpadButtons, { borderColor: border }]}>
              <Text variant="body">{'>'}</Text>
            </TouchableOpacity>
          </Box>
        </Box>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  numpadButtons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 0.5,
  },
});

export default ExpenseScreen;
