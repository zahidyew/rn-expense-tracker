import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '@containers/Home';
import Charts from '@containers/Charts';
import myStrings from '@locales';
import { store, persistor } from '@redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

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
    } else if (routeName === myStrings.charts) {
      return focused ? 'bar-chart' : 'bar-chart-outline';
    } else {
      return 'help-circle';
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
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
      <Tab.Screen name={myStrings.charts} component={Charts} />
    </Tab.Navigator>
  );
};

const App = () => {
  const scheme = useColorScheme();

  return (
    <View style={styles.viewContainer}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer
            theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack.Navigator>
              <Stack.Screen
                name="MainPage"
                component={MainTabs}
                options={{ title: myStrings.expenseTracker }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
});

export default App;
