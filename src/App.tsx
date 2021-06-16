import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '@containers/Home';
import Charts from '@containers/Charts';
import myStrings from '@locales/english';
import { store, persistor } from '@redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider, useTheme } from '@shopify/restyle';
import { theme, darkTheme, Theme } from '@styles/restyle';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => {
  const theme = useTheme<Theme>();
  const { foreground, border } = theme.colors;
  const tabBarOptions = {
    keyboardHidesTabBar: true,
    style: {
      backgroundColor: foreground,
      borderTopColor: border,
    },
  };

  const getIcon = (routeName: string, focused: boolean) => {
    if (routeName === myStrings.home) {
      return focused ? 'home' : 'home-outline';
    } else if (routeName === myStrings.charts) {
      return focused ? 'bar-chart' : 'bar-chart-outline';
    } else {
      return 'help-circle';
    }
  };

  const displayTabBarIcon = (
    routeName: string,
    focused: boolean,
    color: string,
    size: number,
  ) => {
    return (
      <Ionicons name={getIcon(routeName, focused)} size={size} color={color} />
    );
  };

  return (
    <Tab.Navigator
      tabBarOptions={tabBarOptions}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return displayTabBarIcon(route.name, focused, color, size);
        },
      })}>
      <Tab.Screen name={myStrings.home} component={Home} />
      <Tab.Screen name={myStrings.charts} component={Charts} />
    </Tab.Navigator>
  );
};

const App = () => {
  const scheme = useColorScheme();
  const userTheme = scheme === 'dark' ? darkTheme : theme;
  const stackScreenOptions = {
    title: myStrings.expenseTracker,
    headerStyle: {
      backgroundColor: userTheme.colors.foreground,
      shadowColor: userTheme.colors.border,
    },
    headerTitleStyle: {
      color: userTheme.colors.text,
    },
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={userTheme}>
          <SafeAreaView style={styles.viewContainer}>
            <StatusBar barStyle={'default'} />
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="MainPage"
                  component={MainTabs}
                  options={stackScreenOptions}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
});

export default App;
