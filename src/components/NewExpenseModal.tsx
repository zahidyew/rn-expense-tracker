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

interface MyModalProps {
  isOpen: boolean;
  closeModal: (isOpen: boolean) => void;

  expenseName?: string;
  itemPrice?: number;
  itemDate?: string;
  isUpdate?: boolean;
}

const NewExpenseModal = (props: MyModalProps) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { isOpen, closeModal, expenseName, itemPrice, itemDate, isUpdate } =
    props;
  const [itemName, setItemName] = useState(expenseName ? expenseName : '');
  const [price, setPrice] = useState(itemPrice ? itemPrice.toString() : '');
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

  const handleSubmit = (itemName: string, price: string): void => {
    if (isUpdate) {
      dispatch(
        updateExpense({
          name: itemName,
          price: parseFloat(price),
          date: itemDate as string,
        }),
      );
    } else {
      dispatch(
        addNewExpense({
          name: itemName,
          price: parseFloat(price),
          date: getDate('dayMonthYear'),
        }),
      );
    }
    clearAndCloseModal();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        clearAndCloseModal();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => {
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
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
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
            <Text style={styles.textStyle}>{myStrings.ok}</Text>
          </TouchableOpacity>
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
      paddingVertical: 10,
      paddingHorizontal: 20,
      elevation: 2,
      marginTop: 8,
    },
    buttonClose: {
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
  });
  return styles;
};
