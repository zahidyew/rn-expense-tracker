import { createBox, createText, useTheme } from '@shopify/restyle';
import { Category } from '@src/containers/ExpenseScreen';
import { Theme } from '@src/styles/restyle';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Box = createBox<Theme>();
const Text = createText<Theme>();

interface Props {
  category: Category;
  selectedId: number;
  onSelected: (id: number) => void;
}

const IconCategory = (props: Props) => {
  const theme = useTheme<Theme>();
  const { text, border } = theme.colors;
  const { category, selectedId, onSelected } = props;
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    //console.log(selectedId);
    if (category.id === selectedId) {
      setIsSelected(true);
    }
    setIsSelected(false);
  }, [selectedId]);

  return (
    <Box flex={1} alignItems="center">
      {isSelected ? (
        <>
          <TouchableOpacity
            onPress={() => onSelected(category.id)}
            style={[styles.roundContainer, { backgroundColor: 'red' }]}>
            <Ionicons name={category.icon} size={26} color={text} />
          </TouchableOpacity>
          <Text
            variant="body"
            fontSize={11}
            textAlign="center"
            allowFontScaling={false}>
            {category.name}
          </Text>
        </>
      ) : (
        <>
          <TouchableOpacity
            onPress={() => onSelected(category.id)}
            style={
              isSelected
                ? [styles.roundContainer, { backgroundColor: 'red' }]
                : [styles.roundContainer, { backgroundColor: border }]
            }>
            <Ionicons name={category.icon} size={26} color={text} />
          </TouchableOpacity>
          <Text
            variant="body"
            fontSize={11}
            textAlign="center"
            allowFontScaling={false}>
            {category.name}
          </Text>
        </>
      )}
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

export default IconCategory;
