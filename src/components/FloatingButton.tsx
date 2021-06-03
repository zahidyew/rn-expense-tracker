import {Colors} from '@colors';
import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface props {
  onClick: () => void;
}

const FloatingButton = (props: props) => {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const {onClick} = props;

  return (
    <TouchableOpacity style={styles.floatingBtn} onPress={onClick}>
      <Ionicons name={'add'} size={25} color={colors.text} />
    </TouchableOpacity>
  );
};

export default FloatingButton;

const createStyles = (colors: Colors) => {
  const styles = StyleSheet.create({
    floatingBtn: {
      height: 40,
      width: 40,
      borderRadius: 100,
      borderWidth: 2,
      borderColor: colors.primary,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      shadowOpacity: 0.5,
      shadowOffset: {width: 1, height: 5},
      elevation: 2,
    },
  });
  return styles;
};
