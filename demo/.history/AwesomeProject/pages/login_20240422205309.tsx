// Login.jsx
// @ts-nocheck
import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import api from '../api/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({headerShown: false});
  }, []);
  const storeData = async value => {
    try {
      await AsyncStorage.setItem('@storage_Key', value);
    } catch (e) {
      console.log(err);
    }
  };
  const handleLogin = async () => {
    try {
      const result = await api.login(username, password);
      console.log('登录的结果是：', result);
      if (result.data && result.data !== 'fail') {
        alert('登录成功！');
        navigation.navigate('main');
        storeData(result.data);
        // 在这里存储用户信息
      } else {
        alert('登录失败，用户名或密码错误');
        navigation.navigate('main');
      }
    } catch (error) {
      console.log('登录失败：', error);
      alert('登录失败，请稍后再试');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder=" Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder=" Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} />
        <View style={styles.spacingView} />
        <Button
          title="Register"
          onPress={() => navigation.navigate('register')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, justifyContent: 'center'},
  input: {height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10},
  buttonContainer: {
    justifyContent: 'center',
  },
  spacingView: {
    height: 20, // 调整这个值可以改变按钮之间的距离
  },
  title: {
    textAlign: 'center', // 文本居中
    fontStyle: 'italic', // 文本斜体
    fontSize: 48, // 文本大小设为24
    marginBottom: 10,
  },
});
export default Login;
