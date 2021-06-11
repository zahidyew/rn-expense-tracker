import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '@styles/restyle';

const Box = createBox<Theme>();
const Text = createText<Theme>();

const Charts = () => {
  return (
    <Box
      backgroundColor="background"
      flex={1}
      justifyContent="center"
      alignItems="center">
      <Text variant="centeredText"> Charts </Text>
    </Box>
  );
};

export default Charts;

const styles = StyleSheet.create({});
