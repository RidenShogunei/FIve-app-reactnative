// @ts-nocheck
import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import RandomRiddles from './function/riddle';
import English from './function/english';
import Chicken from './function/chicken';
import Histoy from './function/history';
import Tran from './function/translate';
import Docu from './function/doucment';
import Video from "./function/video"
import Sound from './function/'
const Stack = createStackNavigator();
function FeaturesScreen({navigation}) {
  useEffect(() => {
    navigation.setOptions({headerShown: false}); // 将此行移至此处
  }, []);
  const data = [
    {id: 1, name: '文件管理'},
    {id: 2, name: '音频管理'},
    {id: 3, name: '视频管理'},
    {id: 4, name: '每日鸡汤'},
    {id: 5, name: '英汉语录'},
    {id: 6, name: '历史今日'},
    {id: 7, name: '在线翻译'},
    {id: 8, name: '随机谜语'},
    // 在这里你可以添加更多的功能
  ];

  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.box}
          onPress={() => {
            if (item.name === '随机谜语') {
              navigation.navigate('RandomRiddles');
            } else if (item.name === '英汉语录') {
              navigation.navigate('English');
            } else if (item.name === '每日鸡汤') {
              navigation.navigate('Chicken');
            } else if (item.name === '历史今日') {
              navigation.navigate('Histoy');
            } else if (item.name === '在线翻译') {
              navigation.navigate('Tran');
            } else if (item.name === '文件管理') {
              navigation.navigate('Docu');
            }
          }}>
          <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
export default function FeaturesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Features" component={FeaturesScreen} />
      <Stack.Screen name="RandomRiddles" component={RandomRiddles} />
      <Stack.Screen name="English" component={English} />
      <Stack.Screen name="Chicken" component={Chicken} />
      <Stack.Screen name="Histoy" component={Histoy} />
      <Stack.Screen name="Tran" component={Tran} />
      <Stack.Screen name="Docu" component={Docu} />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: '10%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: '45%',
    height: 100,
    marginTop: '6%',
    margin: '2%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
});
