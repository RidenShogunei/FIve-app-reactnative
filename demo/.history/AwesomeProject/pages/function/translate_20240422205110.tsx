// @ts-nocheck
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

async function fetchData(setData, setLoading, userInput) {
  setLoading(true);
  const response = await axios.get(
    `https://api.oick.cn/api/fanyi?text=${userInput}`,
  );
  setData(response.data);
  setLoading(false);
}

export default function RiddleScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: '在线翻译',
    });
  }, []);

  const [userInput, setUserInput] = useState(''); // 用户输入
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.box}>
        <TextInput
          style={styles.input}
          placeholder="在此输入中文"
          multiline
          numberOfLines={10}
          value={userInput}
          onChangeText={text => setUserInput(text)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => fetchData(setData, setLoading, userInput)}
          disabled={loading || userInput.trim() === ''}>
          <Text style={styles.buttonText}>翻译</Text>
        </TouchableOpacity>
        {loading ? (
          <Text style={styles.loadingText}>加载中...</Text>
        ) : (
          data && (
            <Text style={styles.artisticText}>
              翻译结果：{data.data.result}
            </Text>
          )
        )}
      </View>
    </ScrollView>
  );
}

// Styles..
const styles = StyleSheet.create({
  input: {
    height: 50,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
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
