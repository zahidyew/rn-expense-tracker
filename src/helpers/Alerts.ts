import {Alert} from 'react-native';

export const showOneBtnAlert = (
  title: string,
  message: string,
  btnText: string,
): void =>
  Alert.alert(title, message, [
    {
      text: btnText,
      onPress: () => {
        return;
      },
    },
  ]);
