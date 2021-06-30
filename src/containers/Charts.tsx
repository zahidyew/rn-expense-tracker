import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '@styles/restyle';
import { PieChart } from 'react-native-chart-kit';
import { useAppSelector } from '@src/redux/reduxHooks';
import { Expense } from '@src/models/Expense';

const Box = createBox<Theme>();
const Text = createText<Theme>();

interface ChartData {
  name: string;
  total: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

const Charts = () => {
  const screenWidth = Dimensions.get('window').width - 50;
  const expensesDataFromStore = useAppSelector((state) => state.expenses);

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

  const extractCategories = (expenses: Expense[]) => {
    const categories = new Map();

    expenses.forEach((expense) => {
      if (categories.has(expense.name)) {
        const value = categories.get(expense.name);
        categories.set(expense.name, value + expense.price);
      } else {
        categories.set(expense.name, expense.price);
      }
    });
    return categories;
  };

  const buildChartData = (expenses: Expense[]): ChartData[] => {
    const chartData: ChartData[] = [];
    const categories = extractCategories(expenses);
    const sliceColors = ['red', 'blue', 'yellow', 'green'];
    let index = 0;

    categories.forEach((value, key) => {
      chartData.push({
        name: key,
        total: value,
        color: sliceColors[index++],
        legendFontColor: '#7F7F7F',
        legendFontSize: 10,
      });
    });
    return chartData;
  };

  const data = buildChartData(expensesDataFromStore);

  return (
    <Box
      backgroundColor="background"
      flex={1}
      justifyContent="center"
      alignItems="center"
      paddingLeft="l"
      paddingRight="l">
      <Text variant="centeredText"> Charts </Text>
      <PieChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        accessor={'total'}
        backgroundColor={'white'}
        paddingLeft={'15'}
        center={[10, 0]}
        absolute
      />
      {/* <LineChart
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={Dimensions.get('window').width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
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
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      /> */}
    </Box>
  );
};

export default Charts;

const styles = StyleSheet.create({});
