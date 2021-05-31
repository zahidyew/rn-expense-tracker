import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '@containers/Home';
import Money from '@containers/Money';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => {
  const getIcon = (
    routeName: string,
    focused: boolean,
    color: string,
    size: number,
  ) => {
    if (routeName === 'Home') {
      return focused ? 'home' : 'home-outline';
    } else if (routeName === 'Money') {
      return focused ? 'wallet' : 'wallet-outline';
    } else {
      return 'help-circle';
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          return (
            <Ionicons
              name={getIcon(route.name, focused, color, size)}
              size={size}
              color={color}
            />
          );
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Money" component={Money} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <View style={styles.viewContainer}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MainPage"
            component={MainTabs}
            options={{title: 'Expense Tracker'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
});

export default App;
