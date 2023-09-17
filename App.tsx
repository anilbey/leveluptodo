import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Tasks from './screens/Tasks';
import Stats from './screens/Stats';
import History from './screens/History';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppContextProvider } from './src/store/appContext';
import { AsyncStorageSynchronizer } from './src/components/asyncStorageSynchronizer';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AppContextProvider>
      <AsyncStorageSynchronizer>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Status') {
                  iconName = focused
                    ? 'ios-information-circle'
                    : 'ios-information-circle-outline';
                } else if (route.name === 'Tasks') {
                  iconName = focused ? 'ios-list' : 'ios-list-outline';
                }
                else if (route.name === 'History') {
                  iconName = focused ? 'checkmark-done-outline' : 'checkmark-done';
                }
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
            })}
          // sceneContainerStyle={{backgroundColor: '#000000'}}
          >

            <Tab.Screen name="Tasks" component={Tasks} />
            <Tab.Screen name="Status" component={Stats} />
            <Tab.Screen name="History" component={History} />
          </Tab.Navigator>
        </NavigationContainer>
      </AsyncStorageSynchronizer>
    </AppContextProvider>
  );
}