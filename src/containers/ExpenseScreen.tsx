import React from 'react';
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '@styles/restyle';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '@src/App';

export type ExpenseScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'ExpenseScreen'
>;
type Props = {
  navigation: ExpenseScreenNavigationProp;
};

const Box = createBox<Theme>();
const Text = createText<Theme>();

const ExpenseScreen = ({ navigation }: Props) => {
  /* React.useLayoutEffect(() => {
     navigation.setOptions({
       headerRight: () => (
         <Button onPress={() => setCount((c) => c + 1)} title="Update count" />
       ),
     });
   }, [navigation]); */

  return (
    <Box backgroundColor="background" flex={1}>
      <Text variant="body">Something here </Text>
    </Box>
  );
};

export default ExpenseScreen;
