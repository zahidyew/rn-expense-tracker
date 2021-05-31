import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Money = () => {
  return (
    <View style={styles.viewContainer}>
      <Text style={styles.title}> Money</Text>
    </View>
  );
};

export default Money;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
  },
});
