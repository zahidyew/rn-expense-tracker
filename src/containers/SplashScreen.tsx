import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const showSplashScreen = async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('something');
        }, 2500);
        navigation.navigate('MainPage');
      });
    };
    showSplashScreen();
  }, []);

  return (
    <View style={styles.viewContainer}>
      <Text style={styles.title}> Splash Screen </Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
  }
});
