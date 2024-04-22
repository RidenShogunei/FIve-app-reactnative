import React, {useState, useEffect} from 'react';
import {View, Text,StyleSheet, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
async function fetchData(setData, setLoading) {
  setLoading(true);
  const response = await axios.get('https://api.oick.cn/api/yhyl');
  setData(response.data.data);
  setLoading(false);
}

export default function RiddleScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: '英汉语录', // 设置头标题
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
      {loading && <Text style={styles.loadingText}>加载中...</Text>}
      {data && !loading && (
        <View style={styles.box}>
          <Text style={styles.artisticText}>英文：{data.content}</Text>
          <Text style={styles.artisticText}>译文：{data.note}</Text>
          <View style={styles.click}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                fetchData(setData, setLoading);
                setRevealAnswer(false);
              }}
              disabled={loading}>
              <Text style={styles.buttonText}>获取新语录</Text>
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
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  loadingText: {
    fontSize: 24,
    fontStyle: 'italic',
    color: '#999',
  },
  artisticText: {
    fontSize: 24,
    fontStyle: 'italic', // 斜体
    color: '#333', // 颜色变深
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // 文字阴影色
    textShadowOffset: {width: -1, height: 1}, // 文字阴影偏移
    textShadowRadius: 2, // 文字阴影模糊度
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
