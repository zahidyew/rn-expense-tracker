import { StyleSheet } from 'react-native';
import { Colors } from '@colors';

const createGlobalStyles = (colors: Colors) => {
  const globalStyles = StyleSheet.create({
    viewContainer: {
      flex: 1,
    },
    centeredModalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 40,
    },
    modalViewContainer: {
      width: '100%',
      margin: 20,
      borderRadius: 20,
      paddingHorizontal: 35,
      paddingBottom: 16,
      paddingTop: 14,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      backgroundColor: colors.card,
    },
    button: {
      borderRadius: 10,
      paddingVertical: 8,
      paddingHorizontal: 12,
      elevation: 2,
      marginTop: 8,
      backgroundColor: colors.primary,
    },
    normalText: {
      color: colors.text,
    },
    centeredText: {
      color: colors.text,
      textAlign: 'center',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    subtitleText: {
      fontSize: 12,
      color: colors.text,
      opacity: 0.5,
    },
    // Todo: spacing for Android
  });
  return globalStyles;
};

export { createGlobalStyles };
