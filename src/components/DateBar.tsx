import { Colors } from '@colors';
import { getDate } from '@helpers/Dates';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DateBar = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const month = getDate('monthInText');

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <TouchableOpacity onPress={() => console.log('pressed')}>
          <Text style={styles.text}>{month}</Text>
        </TouchableOpacity>
      </View>
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
