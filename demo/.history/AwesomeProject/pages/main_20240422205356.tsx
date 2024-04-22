// @ts-nocheck
import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import FeaturesScreen from './FeaturesScreen';
import PersonalHomeScreen from './PersonalHomeScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({headerShown: false});
  }, []);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="首页"
        component={HomeScreen}
        options={{
          tabBarLabel: '首页',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          headerTitleAlign: 'center', // 设置标题居中
          headerTitleStyle: {
            fontWeight: 'bold', // 设置标题字体为粗体
          },
        }}
      />
      <Tab.Screen
        name="功能"
        component={FeaturesScreen}
        options={{
          tabBarLabel: '功能',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="square" color={color} size={size} />
          ),
          headerTitleAlign: 'center', // 设置标题居中
          headerTitleStyle: {
            fontWeight: 'bold', // 设置标题字体为粗体
          },
        }}
      />
      <Tab.Screen
        name="个人主页"
        component={PersonalHomeScreen}
        options={{
          tabBarLabel: '个人主页',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person" color={color} size={size} />
          ),
          headerTitleAlign: 'center', // 设置标题居中
          headerTitleStyle: {
            fontWeight: 'bold', // 设置标题字体为粗体
          },
        }}
      />
    </Tab.Navigator>
  );
}
