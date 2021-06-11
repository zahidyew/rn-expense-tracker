import { useAppDispatch } from '@redux/reduxHooks';
import { updateMonth, decrementYear, incrementYear } from '@redux/slices/date';
import { createBox, createText, useTheme } from '@shopify/restyle';
import { Theme } from '@styles/restyle';
import React from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface DateModalProps {
  isOpen: boolean;
  month: string;
  year: string;
  closeModal: (isOpen: boolean) => void;
}

const Box = createBox<Theme>();
const Text = createText<Theme>();

const DateModal = (props: DateModalProps) => {
  const { isOpen, year, closeModal } = props;
  const dispatch = useAppDispatch();
  const theme = useTheme<Theme>();
  const { primary } = theme.colors;
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
    const isSelectedMonth = month === props.month;
    const isMostRightColumn = index === 5 || index === 11;

    return (
      <TouchableOpacity
        key={index}
        style={styles.monthContainer}
        onPress={() => {
          const monthNumber = index + 1;
          dispatch(
            updateMonth({ month: month, monthNumber: monthNumber.toString() }),
          );
          closeModal(!isOpen);
        }}>
        {isMostRightColumn ? (
          <Box>
            <Text variant={isSelectedMonth ? 'selectedText' : 'centeredText'}>
              {month}
            </Text>
          </Box>
        ) : (
          <Box borderColor="border" borderRightWidth={1}>
            <Text variant={isSelectedMonth ? 'selectedText' : 'centeredText'}>
              {month}
            </Text>
          </Box>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {}}>
      <View style={styles.centeredModalContainer}>
        <Box backgroundColor="foreground" style={styles.modalViewContainer}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => {
              closeModal(!isOpen);
            }}>
            <Ionicons name={'close-circle'} size={24} color={primary} />
          </TouchableOpacity>
          <View style={styles.container}>
            <View style={styles.yearContainer}>
              <TouchableOpacity onPress={() => dispatch(decrementYear())}>
                <Ionicons name={'chevron-back'} size={14} color={primary} />
              </TouchableOpacity>
              <Text variant="centeredText" paddingHorizontal="xs">
                {year}
              </Text>
              <TouchableOpacity onPress={() => dispatch(incrementYear())}>
                <Ionicons name={'chevron-forward'} size={14} color={primary} />
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
        </Box>
      </View>
    </Modal>
  );
};

export default DateModal;

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
  container: {
    marginTop: 10,
    marginBottom: 10,
  },
  yearContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  centeredModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
  },
  modalViewContainer: {
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
  },
});
