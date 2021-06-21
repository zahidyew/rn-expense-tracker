import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
  RouteProp,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '@containers/Home';
import Charts from '@containers/Charts';
import { store, persistor } from '@redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider, useTheme } from '@shopify/restyle';
import { theme, darkTheme, Theme } from '@styles/restyle';
import ExpenseScreen from './containers/ExpenseScreen';

type BottomStackParamList = {
  Home: undefined;
  Charts: undefined;
  //Profile: { userId: string };
};

export type HomeStackParamList = {
  Home: undefined;
  ExpenseScreen: { isEditing: boolean };
};

export type ChartStackParamList = {
  Charts: undefined;
};

const HomeStack = createStackNavigator<HomeStackParamList>();
const ChartStack = createStackNavigator<ChartStackParamList>();
const BottomTab = createBottomTabNavigator<BottomStackParamList>();

const createHomeStacks = () => {
  const theme = useTheme<Theme>();
  const { foreground, border, text, primary } = theme.colors;
  const stackScreenOptions = {
    headerStyle: {
      backgroundColor: foreground,
      shadowColor: border,
    },
    headerTitleStyle: {
      color: text,
    },
    headerTintColor: primary,
    //headerBackTitleVisible: false,
    //animationEnabled: false,
  };

  return (
    <HomeStack.Navigator screenOptions={stackScreenOptions}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="ExpenseScreen" component={ExpenseScreen} />
    </HomeStack.Navigator>
  );
};

const createChartStacks = () => {
  const theme = useTheme<Theme>();
  const { foreground, border, text, primary } = theme.colors;
  const stackScreenOptions = {
    headerStyle: {
      backgroundColor: foreground,
      shadowColor: border,
    },
    headerTitleStyle: {
      color: text,
    },
    headerTintColor: primary,
    //headerBackTitle: '',
    //animationEnabled: false,
  };

  return (
    <ChartStack.Navigator screenOptions={stackScreenOptions}>
      <ChartStack.Screen name="Charts" component={Charts} />
    </ChartStack.Navigator>
  );
};

const App = () => {
  const scheme = useColorScheme();
  const userTheme = scheme === 'dark' ? darkTheme : theme;
  const tabBarOptions = {
    keyboardHidesTabBar: true,
    style: {
      backgroundColor: userTheme.colors.foreground,
      borderTopColor: userTheme.colors.border,
    },
  };

  const getIcon = (routeName: string, focused: boolean) => {
    if (routeName === 'Home') {
      return focused ? 'home' : 'home-outline';
    } else if (routeName === 'Charts') {
      return focused ? 'bar-chart' : 'bar-chart-outline';
    }
    return 'help-circle';
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

  const shouldBottomTabBeVisible = (
    route: RouteProp<Record<string, object | undefined>, string>,
  ) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? '';

    if (routeName === 'Home' || routeName == '') {
      return true;
    }
    return false;
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={userTheme}>
          <SafeAreaView style={styles.viewContainer}>
            <StatusBar barStyle={'default'} />
            <NavigationContainer>
              <BottomTab.Navigator
                tabBarOptions={tabBarOptions}
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    return displayTabBarIcon(route.name, focused, color, size);
                  },
                })}>
                <BottomTab.Screen
                  name="Home"
                  component={createHomeStacks}
                  options={({ route }) => ({
                    tabBarVisible: shouldBottomTabBeVisible(route),
                  })}
                />
                <BottomTab.Screen name="Charts" component={createChartStacks} />
              </BottomTab.Navigator>
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
