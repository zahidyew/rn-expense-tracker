import { Colors } from '@colors';
import { getDate } from '@helpers/Dates';
import myStrings from '@locales';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DateBar = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const month = getDate('month');

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.box}>
        <Text style={styles.text}>{month}</Text>
      </TouchableOpacity>
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
