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
  const [operatorIsClicked, setOperatorIsClicked] = useState(false);
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

  const zero = (price: string) => {
    if (price === '0') {
      return;
    }
    setPrice(price + '0');
  };

  const dot = (price: string) => {
    if (operatorIsClicked) {
      const [_firstNum, _operator, secondNum] = price.split(' ');
      if (secondNum && secondNum.includes('.')) {
        return;
      }
      secondNum && setPrice(price + '.');
      return;
    }
    if (price.includes('.')) {
      return;
    }
    setPrice(price + '.');
  };

  const backspace = (price: string) => {
    if (price === '0') {
      return;
    }
    setPrice(price.substr(0, price.length - 1));
  };

  const submit = (price: string) => {
    if (operatorIsClicked) {
      setPrice(calculate(price));
      setOperatorIsClicked(false);
    } else {
      props.onClickSubmit(price, date);
    }
  };

  const addition = (price: string) => {
    if (operatorIsClicked) {
      return;
    }
    setOperatorIsClicked(true);
    setPrice(`${price.trim()} + `);
  };

  const subtraction = (price: string) => {
    if (operatorIsClicked) {
      return;
    }
    setOperatorIsClicked(true);
    setPrice(`${price.trim()} - `);
  };

  // Todo: improve calculation method.
  // Known issue: x +y = x. Because space is needed to split string.
  const calculate = (price: string) => {
    const [firstNum, operator, secondNum] = price.split(' ');

    if (secondNum === '' || secondNum == null) {
      return firstNum;
    }
    if (operator === '+') {
      return (parseFloat(firstNum) + parseFloat(secondNum)).toString();
    }
    if (operator === '-') {
      return (parseFloat(firstNum) - parseFloat(secondNum)).toString();
    }
    return firstNum ?? 0;
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
          style={[styles.numpadButtons, { borderColor: border }]}
          onPress={() => {
            addition(price);
          }}>
          <Text variant="numpadText">{'+'}</Text>
        </TouchableOpacity>
      </Box>
      <Box flex={1} flexDirection="row" borderWidth={0.5} borderColor="border">
        {numpadThirdRow.map((num) => {
          return drawNumpadNumber(num);
        })}
        <TouchableOpacity
          style={[styles.numpadButtons, { borderColor: border }]}
          onPress={() => {
            subtraction(price);
          }}>
          <Text variant="numpadText">{'-'}</Text>
        </TouchableOpacity>
      </Box>
      <Box flex={1} flexDirection="row" borderWidth={0.5} borderColor="border">
        <TouchableOpacity
          onPress={() => {
            dot(price);
          }}
          style={[styles.numpadButtons, { borderColor: border }]}>
          <Text variant="numpadText">.</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            zero(price);
          }}
          style={[styles.numpadButtons, { borderColor: border }]}>
          <Text variant="numpadText">0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            backspace(price);
          }}
          style={[styles.numpadButtons, { borderColor: border }]}>
          <Ionicons name={'backspace-outline'} size={26} color={text} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            submit(price);
          }}
          style={[
            styles.numpadButtons,
            { borderColor: border, backgroundColor: highlight },
          ]}>
          {operatorIsClicked ? (
            <Text variant="numpadText">{'='}</Text>
          ) : (
            <Ionicons
              name={'checkmark-circle-outline'}
              size={26}
              color={text}
            />
          )}
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
