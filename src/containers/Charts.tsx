import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '@styles/restyle';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

const Box = createBox<Theme>();
const Text = createText<Theme>();

const Charts = () => {
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
  const screenWidth = Dimensions.get('window').width - 50;
  const data = [
    {
      name: 'Groceries',
      total: 150,
      color: 'rgba(131, 167, 234, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 10,
    },
    {
      name: 'Coffee',
      total: 55,
      color: '#F00',
      legendFontColor: '#7F7F7F',
      legendFontSize: 10,
    },
    {
      name: 'Toiletries',
      total: 45,
      color: 'red',
      legendFontColor: '#7F7F7F',
      legendFontSize: 10,
    },
    {
      name: 'Telco',
      total: 30,
      color: 'green',
      legendFontColor: '#7F7F7F',
      legendFontSize: 10,
    },
    {
      name: 'Subscriptions',
      total: 150,
      color: 'rgb(0, 0, 255)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 10,
    },
  ];

  return (
    <Box
      backgroundColor="background"
      flex={1}
      justifyContent="center"
      alignItems="center"
      paddingLeft="l"
      paddingRight="l">
      <Text variant="centeredText"> Charts </Text>
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
    </Box>
  );
};

export default Charts;

const styles = StyleSheet.create({});
