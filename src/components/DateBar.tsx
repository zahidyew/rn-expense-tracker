import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import DateModal from './DateModal';
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '@styles/restyle';

interface DateBarProps {
  month: string;
  year: string;
}

const Box = createBox<Theme>();
const Text = createText<Theme>();

const DateBar = (props: DateBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { month, year } = props;

  return (
    <View style={styles.container}>
      <Box backgroundColor="foreground" style={styles.box}>
        <TouchableOpacity onPress={() => setIsOpen(true)}>
          <Text variant="body">{`${month.substr(0, 3)}, ${year}`}</Text>
        </TouchableOpacity>
      </Box>
      <DateModal
        isOpen={isOpen}
        month={month.substr(0, 3)}
        year={year}
        closeModal={setIsOpen}
      />
    </View>
  );
};

export default DateBar;

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
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 2 },
    elevation: 2,
  },
});
