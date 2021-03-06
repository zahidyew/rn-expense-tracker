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
    <Box flex={1} paddingHorizontal={'ml'}>
      <Box backgroundColor="foreground" style={styles.box}>
        <TouchableOpacity onPress={() => setIsOpen(true)}>
          <Text variant="body">{`${month} ${year}`}</Text>
        </TouchableOpacity>
      </Box>
      <DateModal
        isOpen={isOpen}
        month={month}
        year={year}
        closeModal={setIsOpen}
      />
    </Box>
  );
};

export default DateBar;

const styles = StyleSheet.create({
  box: {
    height: 30,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 16,
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 2 },
    elevation: 2,
  },
});
