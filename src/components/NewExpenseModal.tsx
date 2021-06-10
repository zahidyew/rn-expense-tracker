import React, { useEffect, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import myStrings from '@locales/english';
import { showOneBtnAlert } from '@helpers/Alerts';
import { onlyNumbersAllowed } from '@helpers/Formatters';
import { useTheme } from '@react-navigation/native';
import { Colors } from '@colors';
import { useAppDispatch } from '@redux/reduxHooks';
import {
  addNewExpense,
  deleteExpense,
  updateExpense,
} from '@redux/slices/expenses';
import { getDate } from '@helpers/Dates';
import { Expense } from '@models/Expense';
import { createGlobalStyles } from '@styles/globalStyles';

interface MyModalProps {
  isOpen: boolean;
  closeModal: (isOpen: boolean) => void;

  expense?: Expense;
  isUpdate?: boolean;
}

const NewExpenseModal = (props: MyModalProps) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const globalStyles = createGlobalStyles(colors);
  const { isOpen, closeModal, expense, isUpdate } = props;
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const dispatch = useAppDispatch();

  // this make sure itemName & price has the correct value everytime props change
  useEffect(() => {
    setItemName(expense?.name ? expense.name : '');
    setPrice(expense?.price ? expense.price.toString() : '');
  }, [props]);

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

  const submitBtnIsPressed = () => {
    if (isFieldsEmpty(itemName, price)) {
      showOneBtnAlert(
        '',
        myStrings.alertCompleteAllRequiredFields,
        myStrings.ok,
      );
    } else {
      handleSubmit(itemName, price);
    }
  };

  const createSubmitOrUpdateBtn = () => {
    if (isUpdate) {
      return (
        // Update btn
        <Text style={globalStyles.buttonText}>
          {myStrings.udpate}{' '}
          <Ionicons name={'create'} size={15} color={'white'} />
        </Text>
      );
    } else {
      return (
        // Submit btn
        <Text style={globalStyles.buttonText}>
          {myStrings.submit}{' '}
          <Ionicons name={'chevron-forward'} size={15} color={'white'} />
        </Text>
      );
    }
  };

  const createDeleteBtn = () => {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          dispatch(deleteExpense(expense?.id as number));
          clearAndCloseModal();
        }}>
        <Text style={globalStyles.buttonText}>
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
      <View style={globalStyles.centeredModalContainer}>
        <View style={globalStyles.modalViewContainer}>
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
          <Text style={styles.textStyle}>
            {isUpdate ? myStrings.updateExpense : myStrings.newExpense}
          </Text>
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
              style={globalStyles.button}
              onPress={submitBtnIsPressed}>
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
  const globalStyles = createGlobalStyles(colors);
  const styles = StyleSheet.create({
    textStyle: {
      ...globalStyles.normalText,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      ...globalStyles.normalText,
      height: 32,
      width: '100%',
      marginVertical: 10,
      borderWidth: 0.5,
      borderColor: 'gray',
      paddingLeft: 8,
    },
    closeBtn: {
      alignSelf: 'flex-start',
    },
    buttonsContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-around',
    },
    deleteButton: {
      ...globalStyles.button,
      backgroundColor: 'red',
    },
  });
  return styles;
};
