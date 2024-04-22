/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
// @ts-nocheck
import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import api from './api/login';

import Login from './pages/login';
import Register from './pages/register';
import Main from './pages/main';

const Stack = createStackNavigator();

function NavigationStack() {
  const navigation = useNavigation();

  useEffect(() => {
    const getDataAndVerify = async () => {
      const value = await AsyncStorage.getItem('@storage_Key');

      if (value !== null) {
        const res = await api.confirm(value);
        if (res.code === 200) {
          Alert('验证成功，欢迎回来！');
          navigation.navigate('main');
        }
      }
    };

    getDataAndVerify();
  }, [navigation]);

  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        name="login"
        component={Login}
        options={{
          title: '登录',
          headerTitleAlign: 'center', // 设置标题居中
          headerTitleStyle: {
            fontWeight: 'bold', // 设置标题字体为粗体
          },
        }}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={{
          title: '注册',
          headerTitleAlign: 'center', // 设置标题居中
          headerTitleStyle: {
            fontWeight: 'bold', // 设置标题字体为粗体
          },
        }}
      />
      <Stack.Screen
        name="main"
        component={Main}
        options={{
          title: '主页',
          headerTitleAlign: 'center', // 设置标题居中
          headerTitleStyle: {
            fontWeight: 'bold', // 设置标题字体为粗体
          },
        }}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <NavigationStack />
    </NavigationContainer>
  );
}

export default App;
