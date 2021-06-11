import { createBox } from '@shopify/restyle';
import { Theme } from '@styles/restyle';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface props {
  onClick: () => void;
}

const Box = createBox<Theme>();

const FloatingButton = (props: props) => {
  const { onClick } = props;

  return (
    <TouchableOpacity onPress={onClick}>
      <Box
        backgroundColor="primary"
        borderColor="primary"
        style={styles.floatingBtn}>
        <Ionicons name={'add'} size={25} color={'white'} />
      </Box>
    </TouchableOpacity>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  floatingBtn: {
    height: 40,
    width: 40,
    borderRadius: 100,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 5 },
    elevation: 2,
  },
});
