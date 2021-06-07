import { Colors } from '@colors';
import { useTheme } from '@react-navigation/native';
import { useAppDispatch } from '@redux/reduxHooks';
import { updateMonth } from '@redux/slices/date';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface DateModalProps {
  isOpen: boolean;
  month: string;
  closeModal: (isOpen: boolean) => void;
}

const DateModal = (props: DateModalProps) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { isOpen, month, closeModal } = props;
  const dispatch = useAppDispatch();
  const monthsArray = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const displayMonth = (item: string, index: number) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.monthContainer}
        onPress={() => {
          dispatch(updateMonth(item));
          closeModal(!isOpen);
        }}>
        <Text style={styles.textStyle}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {}}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => {
              closeModal(!isOpen);
            }}>
            <Ionicons name={'close-circle'} size={24} color={colors.primary} />
          </TouchableOpacity>
          <View style={styles.rowContainer}>
            {monthsArray.map((item, index) => {
              if (index > 5) {
                return;
              }
              return displayMonth(item, index);
            })}
          </View>
          <View style={styles.rowContainer}>
            {monthsArray.map((item, index) => {
              if (index < 6) {
                return;
              }
              return displayMonth(item, index);
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DateModal;

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
    textStyle: {
      color: colors.text,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    closeBtn: {
      alignSelf: 'flex-start',
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingTop: 10,
    },
    monthContainer: {
      flex: 1,
    },
  });
  return styles;
};
