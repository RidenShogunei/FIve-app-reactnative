// @ts-nocheck
import React, {useState, useEffect} from 'react';
import {View, Text,StyleSheet, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
async function fetchData(setData, setLoading) {
  setLoading(true);
  const response = await axios.get('https://api.oick.cn/api/miyu');
  setData(response.data.data);
  setLoading(false);
}

export default function RiddleScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: '随机谜语', // 设置头标题
    });
  }, []);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // 新增状态变量来控制是否揭示谜底
  const [revealAnswer, setRevealAnswer] = useState(false);

  // 使用 useEffect 来在组件挂载后进行数据获取
  useEffect(() => {
    fetchData(setData, setLoading);
    setRevealAnswer(false); // 每次获取新谜语时默认不揭示谜底
  }, []);

  // 渲染页面
  return (
    <View style={styles.container}>
      {loading && <Text style={styles.text}>加载中...</Text>}
      {data && !loading && (
        <View>
          <Text style={styles.text}>题目：{data.topic}</Text>
          <Text style={styles.text}>类型：{data.type}</Text>
          <Text style={styles.text}>提示：{data.tip}</Text>
          <Text style={styles.text}>
            答案：{revealAnswer ? data.answer : '******'}
          </Text>
          <View style={styles.click}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setRevealAnswer(!revealAnswer)}>
              <Text style={styles.buttonText}>
                {revealAnswer ? '隐藏谜底' : '揭示谜底'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                fetchData(setData, setLoading);
                setRevealAnswer(false);
              }}
              disabled={loading}>
              <Text style={styles.buttonText}>获取新谜语</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginTop: 10, // 增加上边距产生空隙
    width: 200, // 宽200
    height: 60, // 高60
  },
  buttonText: {
    fontSize: 20,
  },
  click: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
