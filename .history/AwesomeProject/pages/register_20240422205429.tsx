// Register.jsx
// @ts-nocheck
import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, StyleSheet, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 引入 AsyncStorage
import {useNavigation} from '@react-navigation/native';
import api from '../api/login';
const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [Realname, setRealname] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({headerShown: false});
  }, []);
  const storeData = async value => {
    try {
      await AsyncStorage.setItem('@storage_Key', value);
    } catch (e) {
      console.log(e);
    }
  };
  const handleRegister = async () => {
    try {
      const result = await api.register(username, password, Realname);
      if (result.data && result.data !== 'fail') {
        alert('注册成功!!');
        storeData(result.data);
        navigation.navigate('main');
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log('注册失败:', error);
      alert('登录失败，发生了一些错误，稍后再试');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
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
      <TextInput
        style={styles.input}
        placeholder=" Realname"
        secureTextEntry
        value={Realname}
        onChangeText={setRealname}
      />
      <View style={styles.buttonContainer}>
        <Button title="Register" onPress={handleRegister} />
        <View style={styles.spacingView} />
        <Button title="Back" onPress={() => navigation.navigate('login')} />
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

export default Register;
