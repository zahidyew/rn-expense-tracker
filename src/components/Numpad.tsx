import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { createBox, createText, useTheme } from '@shopify/restyle';
import { Theme } from '@styles/restyle';
import { getDate } from '@src/helpers/Dates';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  price: string;
  date?: string;
  onClickSubmit: (price: string, date: string) => void;
}

const Box = createBox<Theme>();
const Text = createText<Theme>();

const Numpad = (props: Props) => {
  const [price, setPrice] = useState('0');
  const date = props.date ?? getDate('dayMonthYear');
  const theme = useTheme<Theme>();
  const { border, text, highlight } = theme.colors;
  const numpadFirstRow = ['7', '8', '9'];
  const numpadSecondRow = ['4', '5', '6'];
  const numpadThirdRow = ['1', '2', '3'];

  useEffect(() => {
    setPrice(props.price);
  }, [props.price]);

  useEffect(() => {
    if (price.length === 0) {
      setPrice('0');
    }
  }, [price]);

  const drawNumpadNumber = (number: string) => {
    return (
      <TouchableOpacity
        key={number}
        onPress={() => {
          if (price === '0') {
            setPrice(number);
          } else {
            setPrice(price + number);
          }
        }}
        style={[styles.numpadButtons, { borderColor: border }]}>
        <Text variant="numpadText">{number}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Box
      backgroundColor="foreground"
      position="absolute"
      bottom={0}
      height="35%"
      width="100%">
      <Box
        flex={1}
        flexDirection="row"
        justifyContent="flex-end"
        alignItems="center"
        borderWidth={0.5}
        borderColor="border">
        <Box paddingRight="ms">
          <Text variant="numpadText" fontSize={24}>
            {price}
          </Text>
        </Box>
      </Box>
      <Box flex={1} flexDirection="row" borderWidth={0.5} borderColor="border">
        {numpadFirstRow.map((num) => {
          return drawNumpadNumber(num);
        })}
        <TouchableOpacity
          style={[styles.numpadButtons, { borderColor: border }]}>
          <Text variant="body">{date.substr(0, 6)}</Text>
        </TouchableOpacity>
      </Box>
      <Box flex={1} flexDirection="row" borderWidth={0.5} borderColor="border">
        {numpadSecondRow.map((num) => {
          return drawNumpadNumber(num);
        })}
        <TouchableOpacity
          // Todo: implement addition
          style={[styles.numpadButtons, { borderColor: border }]}>
          <Text variant="numpadText">{'+'}</Text>
        </TouchableOpacity>
      </Box>
      <Box flex={1} flexDirection="row" borderWidth={0.5} borderColor="border">
        {numpadThirdRow.map((num) => {
          return drawNumpadNumber(num);
        })}
        <TouchableOpacity
          // Todo: implement subtraction
          style={[styles.numpadButtons, { borderColor: border }]}>
          <Text variant="numpadText">{'-'}</Text>
        </TouchableOpacity>
      </Box>
      <Box flex={1} flexDirection="row" borderWidth={0.5} borderColor="border">
        <TouchableOpacity
          onPress={() => {
            if (price.includes('.')) {
              return;
            }
            setPrice(price + '.');
          }}
          style={[styles.numpadButtons, { borderColor: border }]}>
          <Text variant="numpadText">.</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (price === '0') {
              return;
            }
            setPrice(price + '0');
          }}
          style={[styles.numpadButtons, { borderColor: border }]}>
          <Text variant="numpadText">0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (price === '0') {
              return;
            }
            setPrice(price.substr(0, price.length - 1));
          }}
          style={[styles.numpadButtons, { borderColor: border }]}>
          <Ionicons name={'backspace-outline'} size={26} color={text} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.onClickSubmit(price, date);
          }}
          style={[
            styles.numpadButtons,
            { borderColor: border, backgroundColor: highlight },
          ]}>
          <Ionicons name={'checkmark-circle-outline'} size={26} color={text} />
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  numpadButtons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 0.5,
  },
});

export default Numpad;
