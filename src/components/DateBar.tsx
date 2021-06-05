import { Colors } from '@colors';
import { getDate } from '@helpers/Dates';
import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateModal from './DateModal';

const DateBar = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const month = getDate('monthInText');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <TouchableOpacity onPress={() => setIsOpen(true)}>
          <Text style={styles.text}>{month}</Text>
        </TouchableOpacity>
      </View>
      <DateModal isOpen={isOpen} closeModal={setIsOpen} />
    </View>
  );
};

export default DateBar;

const createStyles = (colors: Colors) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    box: {
      width: 325,
      height: 30,
      flexDirection: 'row-reverse',
      alignItems: 'center',
      paddingHorizontal: 16,
      backgroundColor: colors.card,
      shadowOpacity: 0.15,
      shadowOffset: { width: 1, height: 2 },
      elevation: 2,
    },
    text: {
      color: colors.text,
    },
  });
  return styles;
};
