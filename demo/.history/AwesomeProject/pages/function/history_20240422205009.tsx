// @ts-nocheck
import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
async function fetchData(setData, setLoading) {
  setLoading(true);
  const response = await axios.get('https://api.oick.cn/api/lishi');
  setData(response.data);
  setLoading(false);
}

export default function RiddleScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: '历史今日', // 设置头标题
    });
  }, []);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // 使用 useEffect 来在组件挂载后进行数据获取
  useEffect(() => {
    fetchData(setData, setLoading);
  }, []);

  // 渲染页面
  return (
    <View style={styles.container}>
      {data && !loading && (
        <ScrollView contentContainerStyle={styles.container}>
          {data.result.map((item, index) => {
            return (
              <View style={styles.card} key={index}>
                <Text style={styles.artisticText}>时间: {item.date}</Text>
                <Text style={styles.artisticText}>事件: {item.title}</Text>
              </View>
            );
          })}
          <View style={styles.click}></View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20, // Add padding
    backgroundColor: '#F5FCFF',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  card: {
    padding: 10,
    backgroundColor: '#fff', // 背景色
    borderRadius: 10, // 圆角
    marginBottom: 10, // Add margin to bottom
    shadowColor: '#000', // 阴影色
    shadowOffset: {width: 0, height: 2}, // 阴影偏移
    shadowOpacity: 0.3, // 阴影不透明度
    shadowRadius: 4, // 阴影模糊度
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: 10,
    backgroundColor: '#FAF3DD', // 轻黄色背景
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#757575', // 修改阴影颜色
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5, // 修改阴影不透明度
    shadowRadius: 6, // 修改阴影模糊度
    elevation: 6,
    alignItems: 'center',
  },
  artisticText: {
    fontSize: 24,
    fontStyle: 'italic', // 斜体
    color: '#5F0F40', // 修改字体颜色为深紫色
    textShadowColor: 'rgba(95, 15, 64, 0.75)', // 修改阴影颜色与字体颜色保持一致，增加深度感
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 2,
    fontFamily: 'serif', // 使用预设的"serif"字体
  },
  box: {
    padding: 20,
    backgroundColor: '#fff', // 背景色
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // 圆角
    shadowColor: '#000', // 阴影色
    shadowOffset: {width: 0, height: 2}, // 阴影偏移
    shadowOpacity: 0.3, // 阴影不透明度
    shadowRadius: 4, // 阴影模糊度
    elevation: 5,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginTop: 10,
    width: 200,
    height: 60,
  },
  buttonText: {
    fontSize: 20,
  },
  click: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
