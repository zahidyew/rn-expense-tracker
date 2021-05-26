import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface props {
  onClick: () => void;
}

const FloatingButton = (props: props) => {
  const { onClick } = props;

  return (
    <TouchableOpacity
      style={styles.floatingBtn}
      onPress={onClick}
    >
      <Ionicons
        name={'add'}
        size={25}
        color={'black'} />
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
    borderColor: 'aqua',
    backgroundColor: 'aqua',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 5 },
    elevation: 2,
  }
});
