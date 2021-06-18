import { createBox } from '@shopify/restyle';
import { HomeScreenNavigationProp } from '@src/containers/Home';
import { Theme } from '@styles/restyle';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* interface props {
  navigation: any;
  onClick: () => void;
} */

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Box = createBox<Theme>();

const FloatingButton = (props: Props) => {
  const { navigation } = props;

  return (
    <TouchableOpacity onPress={() => navigation.navigate('ExpenseScreen')}>
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
