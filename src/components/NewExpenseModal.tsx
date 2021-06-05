import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import myStrings from '@locales';
import { showOneBtnAlert } from '@helpers/Alerts';
import { onlyNumbersAllowed } from '@helpers/Formatters';
import { useTheme } from '@react-navigation/native';
import { Colors } from '@colors';
import { useAppDispatch } from '@redux/reduxHooks';
import { addNewExpense, updateExpense } from '@redux/slices/expenses';
import { getDate } from '@helpers/Dates';
import { Expense } from '@models/Expense';

interface MyModalProps {
  isOpen: boolean;
  closeModal: (isOpen: boolean) => void;

  expense?: Expense;
  isUpdate?: boolean;
}

const NewExpenseModal = (props: MyModalProps) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { isOpen, closeModal, expense, isUpdate } = props;
  const [itemName, setItemName] = useState(expense?.name ? expense.name : '');
  const [price, setPrice] = useState(
    expense?.price ? expense.price.toString() : '',
  );
  const dispatch = useAppDispatch();

  const clearAndCloseModal = (): void => {
    if (isUpdate) {
      closeModal(!isOpen);
    } else {
      setItemName('');
      setPrice('');
      closeModal(!isOpen);
    }
  };

  const isFieldsEmpty = (itemName: string, price: string): boolean => {
    if (itemName === '' || price === '') {
      return true;
    }
    return false;
  };

  const generateId = () => {
    return new Date().valueOf();
  };

  const handleSubmit = (itemName: string, price: string): void => {
    if (isUpdate) {
      dispatch(
        updateExpense({
          id: expense?.id as number,
          name: itemName,
          price: parseFloat(price),
          date: expense?.date as string,
        }),
      );
    } else {
      dispatch(
        addNewExpense({
          id: generateId(),
          name: itemName,
          price: parseFloat(price),
          date: getDate('dayMonthYear'),
        }),
      );
    }
    clearAndCloseModal();
  };

  const createSubmitOrUpdateBtn = () => {
    if (isUpdate) {
      return (
        // Update btn
        <Text style={styles.textStyle}>
          {myStrings.udpate}{' '}
          <Ionicons name={'create'} size={15} color={'white'} />
        </Text>
      );
    } else {
      return (
        // Submit btn
        <Text style={styles.textStyle}>
          {myStrings.submit}{' '}
          <Ionicons name={'chevron-forward'} size={15} color={'white'} />
        </Text>
      );
    }
  };

  const createDeleteBtn = () => {
    return (
      <TouchableOpacity
        style={[styles.button, { backgroundColor: 'red' }]}
        onPress={() => {
          clearAndCloseModal();
        }}>
        <Text style={styles.textStyle}>
          {myStrings.delete}{' '}
          <Ionicons name={'trash'} size={15} color={'white'} />
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        if (isUpdate) {
          setItemName(expense?.name as string);
          setPrice(expense?.price.toString() as string);
        }
        clearAndCloseModal();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => {
              if (isUpdate) {
                setItemName(expense?.name as string);
                setPrice(expense?.price.toString() as string);
              }
              clearAndCloseModal();
            }}>
            <Ionicons name={'close-circle'} size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.textStyle}>{myStrings.newExpense}</Text>
          <TextInput
            style={styles.modalText}
            placeholder={myStrings.itemName}
            autoCapitalize={'sentences'}
            value={itemName}
            onChangeText={setItemName}
          />
          <TextInput
            style={styles.modalText}
            placeholder={myStrings.price}
            keyboardType={'numeric'}
            value={price}
            onChangeText={(value) => setPrice(onlyNumbersAllowed(value))}
          />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (isFieldsEmpty(itemName, price)) {
                  showOneBtnAlert(
                    '',
                    myStrings.alertCompleteAllRequiredFields,
                    myStrings.ok,
                  );
                } else {
                  handleSubmit(itemName, price);
                }
              }}>
              {createSubmitOrUpdateBtn()}
            </TouchableOpacity>
            {isUpdate && createDeleteBtn()}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NewExpenseModal;

const createStyles = (colors: Colors) => {
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 40,
    },
    modalView: {
      width: '100%',
      margin: 20,
      borderRadius: 20,
      paddingHorizontal: 35,
      paddingBottom: 16,
      paddingTop: 14,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      backgroundColor: colors.card,
    },
    button: {
      borderRadius: 10,
      paddingVertical: 8,
      paddingHorizontal: 12,
      elevation: 2,
      marginTop: 8,
      backgroundColor: colors.primary,
    },
    textStyle: {
      color: colors.text,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      height: 32,
      width: '100%',
      marginVertical: 10,
      borderWidth: 0.5,
      borderColor: 'gray',
      paddingLeft: 8,
      color: colors.text,
    },
    closeBtn: {
      alignSelf: 'flex-start',
    },
    buttonsContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-around',
    },
  });
  return styles;
};
