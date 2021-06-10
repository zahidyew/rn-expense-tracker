import { Colors } from '@colors';
import { useTheme } from '@react-navigation/native';
import { useAppDispatch } from '@redux/reduxHooks';
import { updateMonth, decrementYear, incrementYear } from '@redux/slices/date';
import { createGlobalStyles } from '@styles/globalStyles';
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
  const globalStyles = createGlobalStyles(colors);
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
              ? [globalStyles.centeredText, styles.selectedMonthText]
              : globalStyles.centeredText
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
      <View style={globalStyles.centeredModalContainer}>
        <View style={globalStyles.modalViewContainer}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => {
              closeModal(!isOpen);
            }}>
            <Ionicons name={'close-circle'} size={24} color={colors.primary} />
          </TouchableOpacity>
          <View style={styles.container}>
            <View style={styles.yearContainer}>
              <TouchableOpacity onPress={() => dispatch(decrementYear())}>
                <Ionicons
                  name={'chevron-back'}
                  size={14}
                  color={colors.primary}
                />
              </TouchableOpacity>
              <Text style={[globalStyles.centeredText, styles.yearText]}>
                {year}
              </Text>
              <TouchableOpacity onPress={() => dispatch(incrementYear())}>
                <Ionicons
                  name={'chevron-forward'}
                  size={14}
                  color={colors.primary}
                />
              </TouchableOpacity>
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
    yearContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    yearText: {
      paddingHorizontal: 4,
    },
  });
  return styles;
};
