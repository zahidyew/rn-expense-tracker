import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '@styles/restyle';
import { PieChart } from 'react-native-chart-kit';
import { useAppSelector } from '@src/redux/reduxHooks';
import { filterExpenses } from '@src/helpers/Filters';
import { buildChartData } from './chartsLogic';

const Box = createBox<Theme>();
const Text = createText<Theme>();

const Charts = () => {
  const screenWidth = Dimensions.get('window').width - 50;
  const expensesDataFromStore = useAppSelector((state) => state.expenses);
  const { month, year } = useAppSelector((state) => state.date);
  const [expenses, setExpenses] = useState(expensesDataFromStore);
  const chartData = buildChartData(expenses);
  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };

  useEffect(() => {
    setExpenses(filterExpenses(expensesDataFromStore, month, year));
  }, [month, year, expensesDataFromStore]);

  return (
    <Box
      backgroundColor="background"
      flex={1}
      justifyContent="center"
      alignItems="center"
      paddingLeft="l"
      paddingRight="l">
      {chartData.length === 0 ? (
        <Text variant="centeredText"> No data yet </Text>
      ) : (
        <PieChart
          data={chartData}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          accessor={'total'}
          backgroundColor={'white'}
          paddingLeft={'15'}
          center={[10, 0]}
          absolute
        />
      )}
    </Box>
  );
};

export default Charts;

const styles = StyleSheet.create({});
