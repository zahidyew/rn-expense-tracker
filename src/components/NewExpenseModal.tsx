import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface MyModalProps {
  isOpen: boolean;
  closeModal: (isOpen: boolean) => void;
  addNewExpense: (itemName: string, price: number) => void;
}

const NewExpenseModal = (props: MyModalProps) => {
  const {isOpen, closeModal, addNewExpense} = props;
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');

  const clearAndCloseModal = (): void => {
    setItemName('');
    setPrice('');
    closeModal(!isOpen);
  };

  // TODO: move this as helper function
  const onlyNumbersAllowed = (input: string): void => {
    const pattern = /[^0-9.]/gm;
    setPrice(input.replace(pattern, ''));
  };

  const isFieldsEmpty = (itemName: string, price: string): boolean => {
    if (itemName === '' || price === '') {
      return true;
    }
    return false;
  };

  const createAlert = (): void =>
    Alert.alert('', 'Please complete all required fields.', [
      {
        text: 'OK',
        onPress: () => {
          return;
        },
      },
    ]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        addNewExpense(itemName, parseFloat(price));
        clearAndCloseModal();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => {
              clearAndCloseModal();
            }}>
            <Ionicons name={'close-circle'} size={24} color={'#2196F3'} />
          </TouchableOpacity>
          <Text>New Expense</Text>
          <TextInput
            style={styles.modalText}
            placeholder={'Item name'}
            autoCapitalize={'sentences'}
            value={itemName}
            onChangeText={setItemName}
          />
          <TextInput
            style={styles.modalText}
            placeholder={'Price'}
            keyboardType={'numeric'}
            value={price}
            onChangeText={onlyNumbersAllowed}
          />
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              if (isFieldsEmpty(itemName, price)) {
                createAlert();
              } else {
                addNewExpense(itemName, parseFloat(price));
                clearAndCloseModal();
              }
            }}>
            <Text style={styles.textStyle}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default NewExpenseModal;

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
    backgroundColor: '#fff',
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
    marginTop: 8,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
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
  },
  closeBtn: {
    alignSelf: 'flex-start',
  },
});
