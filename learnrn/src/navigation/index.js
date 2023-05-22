import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Home from '../screens/home';
import Login from '../screens/login';
import Account from '../screens/account';
import Register from '../screens/register';
import Work from '../screens/work';
import ForgetPassword from '../screens/forgetPassword';
import ResetPassword from '../screens/resetPassword';
import {useShallowEqualSelector} from '../store/selector';

const RootStack = createNativeStackNavigator();

export const RoutesName = {
  Login: 'Login',
  Home1: 'Home',
  ForgetPassword: 'ForgetPassword',
  Register: 'Register',
  Work: 'Work',
};

const AppNavigation = () => {
  const {userId} = useShallowEqualSelector(state => ({
    userId: state.me.userId,
  }));
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={userId ? 'Home' : 'Login'}
        screenOptions={{headerShown: false}}>
        <RootStack.Screen
          key={RoutesName.Login}
          name={RoutesName.Login}
          component={Login}
        />
        <RootStack.Screen
          // key={RoutesName.Home1}
          name={RoutesName.Home1}
          component={Home}
        />
        <RootStack.Screen
          // key={RoutesName.Home1}
          name={RoutesName.Work}
          component={Work}
        />
        <RootStack.Screen name="Account" component={Account} />
        <RootStack.Screen name={RoutesName.Register} component={Register} />
        <RootStack.Screen
          // key={RoutesName.ForgetPassword}
          name={RoutesName.ForgetPassword}
          component={ForgetPassword}
        />
        <RootStack.Screen name="ResetPassword" component={ResetPassword} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
