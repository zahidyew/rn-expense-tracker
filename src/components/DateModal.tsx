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
  year: string;
  closeModal: (isOpen: boolean) => void;
}

const DateModal = (props: DateModalProps) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { isOpen, year, closeModal } = props;
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

  const displayMonth = (month: string, index: number) => {
    const selectedMonth = month === props.month;
    const mostRightColumn = index === 5 || index === 11;

    return (
      <TouchableOpacity
        key={index}
        style={
          mostRightColumn
            ? styles.monthContainer
            : [styles.monthContainer, styles.rightSideBorder]
        }
        onPress={() => {
          const monthNumber = index + 1;
          dispatch(
            updateMonth({ month: month, monthNumber: monthNumber.toString() }),
          );
          closeModal(!isOpen);
        }}>
        <Text
          style={
            selectedMonth
              ? [styles.textStyle, styles.selectedMonthText]
              : styles.textStyle
          }>
          {month}
        </Text>
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
          <View style={styles.container}>
            <View>
              <Text style={styles.textStyle}>{year}</Text>
            </View>
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
      paddingBottom: 10,
    },
    monthContainer: {
      flex: 1,
    },
    selectedMonthText: {
      color: 'green',
      fontWeight: 'bold',
    },
    rightSideBorder: {
      borderRightWidth: 1,
      borderColor: colors.border,
    },
    container: {
      marginTop: 10,
      marginBottom: 10,
    },
  });
  return styles;
};
