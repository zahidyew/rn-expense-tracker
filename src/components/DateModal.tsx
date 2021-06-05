import { Colors } from '@colors';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface DateModalProps {
  isOpen: boolean;
  closeModal: (isOpen: boolean) => void;
}

const DateModal = (props: DateModalProps) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { isOpen, closeModal } = props;
  const months = [
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
            {months.map((item, index) => {
              if (index > 5) {
                return;
              }
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.monthContainer}
                  onPress={() => {
                    console.log(item);
                    closeModal(!isOpen);
                  }}>
                  <Text style={styles.textStyle}>{item}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.rowContainer}>
            {months.map((item, index) => {
              if (index < 6) {
                return;
              }
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.monthContainer}
                  onPress={() => {
                    console.log(item);
                    closeModal(!isOpen);
                  }}>
                  <Text style={styles.textStyle}>{item}</Text>
                </TouchableOpacity>
              );
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
