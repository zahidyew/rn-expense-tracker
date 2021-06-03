import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, useColorScheme, View} from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '@containers/Home';
import Money from '@containers/Money';
import myStrings from '@locales';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => {
  const getIcon = (
    routeName: string,
    focused: boolean,
    color: string,
    size: number,
  ) => {
    if (routeName === myStrings.home) {
      return focused ? 'home' : 'home-outline';
    } else if (routeName === myStrings.money) {
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
      <Tab.Screen name={myStrings.home} component={Home} />
      <Tab.Screen name={myStrings.money} component={Money} />
    </Tab.Navigator>
  );
};

const App = () => {
  const scheme = useColorScheme();

  return (
    <View style={styles.viewContainer}>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="MainPage"
            component={MainTabs}
            options={{title: myStrings.expenseTracker}}
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
