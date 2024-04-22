// @ts-nocheck
import Reactfrom 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

function PersonalHomeScreen() {
  const navigation = useNavigation();

  const removeData = async () => {
    try {
      await AsyncStorage.removeItem('@storage_Key');
      // 数据删除成功后，导航回 login 页面
      navigation.navigate('login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={removeData} style={styles.button}>
        <Text style={styles.buttonText}>退出登录</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    width: 300,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center', // 添加这一行
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30, // 控制文本大小
    textAlign: 'center', // 控制文本水平居中
  },
});

export default PersonalHomeScreen;
