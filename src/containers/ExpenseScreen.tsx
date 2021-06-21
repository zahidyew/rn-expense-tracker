import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { createBox, createText, useTheme } from '@shopify/restyle';
import { Theme } from '@styles/restyle';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '@src/App';
import Ionicons from 'react-native-vector-icons/Ionicons';

export type ExpenseScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'ExpenseScreen'
>;

type Props = {
  navigation: ExpenseScreenNavigationProp;
};

export interface Category {
  id: number;
  name: string;
  icon: string;
}

const Box = createBox<Theme>();
const Text = createText<Theme>();

const ExpenseScreen = ({ navigation }: Props) => {
  const theme = useTheme<Theme>();
  const { text, border, success } = theme.colors;
  const rowsOfIcons: JSX.Element[] = [];
  const [selectedId, setSelectedId] = useState(0);

  const categories: Category[] = [
    {
      id: 1,
      name: 'Food',
      icon: 'fast-food-outline',
    },
    {
      id: 2,
      name: 'Transportation',
      icon: 'bus-outline',
    },
    {
      id: 3,
      name: 'Home',
      icon: 'home-outline',
    },
    {
      id: 4,
      name: 'Car',
      icon: 'car-sport-outline',
    },
    {
      id: 5,
      name: 'Beverages',
      icon: 'fast-food-outline',
    },
    {
      id: 6,
      name: 'Bus',
      icon: 'bus-outline',
    },
    {
      id: 7,
      name: 'Utilities',
      icon: 'home-outline',
    },
    /* {
      id: 8,
      name: 'Insurance of car yearly',
      icon: 'car-sport-outline',
    }, */
  ];

  const getNumberOfRows = (categoriesLength: number) => {
    const rows = Math.ceil(categoriesLength / 4);
    return rows;
  };

  /* Need 4 categories/icons on each Row to maintain UI consistency.
    Workaround right now is to push extra dummy data, so that each 
    row has "4 icons". */
  const padCategoriesIfNeeded = (categories: Category[]) => {
    const remainder = categories.length % 4;
    if (remainder !== 0) {
      const extraCols = 4 - remainder;
      for (let i = 0; i < extraCols; i++) {
        const dummyId = Math.floor(Math.random() * 10000);
        categories.push({
          id: dummyId,
          name: 'null',
          icon: 'null',
        });
      }
      return categories;
    }
    return categories;
  };

  const drawRowsOfIcons = (categories: Category[], rowNumber: number) => {
    return (
      <Box
        key={rowNumber}
        height={'10%'}
        flexDirection={'row'}
        marginTop={'m'}
        paddingHorizontal={'ml'}>
        {categories.map((item, index) => {
          const minIndex = rowNumber * 4;
          const maxIndex = rowNumber * 4 + 3;
          if (index < minIndex || index > maxIndex) {
            return;
          }
          if (item.name == 'null') {
            return <Box key={index + 1} flex={1} alignItems="center"></Box>;
          }
          return (
            <Box key={item.id} flex={1} alignItems="center">
              <TouchableOpacity
                onPress={() => setSelectedId(item.id)}
                style={
                  selectedId === item.id
                    ? [styles.roundContainer, { backgroundColor: success }]
                    : [styles.roundContainer, { backgroundColor: border }]
                }>
                <Ionicons name={item.icon} size={26} color={text} />
              </TouchableOpacity>
              <Text
                variant="body"
                fontSize={11}
                textAlign="center"
                allowFontScaling={false}>
                {item.name}
              </Text>
            </Box>
            /* <IconCategory
              key={item.id}
              category={item}
              selectedId={selectedId}
              onSelected={setSelectedId}
            /> */
          );
        })}
      </Box>
    );
  };

  const drawIcons = (categories: Category[]) => {
    const rows = getNumberOfRows(categories.length);
    const columns = padCategoriesIfNeeded(categories);

    for (let rowNumber = 0; rowNumber < rows; rowNumber++) {
      rowsOfIcons.push(drawRowsOfIcons(columns, rowNumber));
    }
  };

  /*  useEffect(() => {
    drawIcons(categories);
  }, [selectedId]); */

  return (
    <Box backgroundColor="background" flex={1}>
      {drawIcons(categories)}
      {rowsOfIcons}
      {/* <Box
        height={'10%'}
        flexDirection={'row'}
        marginTop={'m'}
        paddingHorizontal={'ml'}>
        {categories.map((item, index) => {
          if (index > 3) (index < 4 || index > 7)  { 
            return;
          }
          return (
            <Box key={item.id} flex={1} alignItems={'center'}>
              <TouchableOpacity
                style={[styles.roundContainer, { backgroundColor: border }]}>
                <Ionicons name={item.icon} size={26} color={text} />
              </TouchableOpacity>
              <Text
                variant="body"
                fontSize={11}
                textAlign="center"
                allowFontScaling={false}>
                {item.name}
              </Text>
            </Box>
          );
        })}
      </Box>*/}
    </Box>
  );
};

const styles = StyleSheet.create({
  roundContainer: {
    width: 42,
    height: 42,
    borderRadius: 100,
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ExpenseScreen;
