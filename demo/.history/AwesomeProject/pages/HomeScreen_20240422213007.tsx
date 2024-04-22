// @ts-nocheck
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Bottom,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BarChart} from 'react-native-chart-kit';
import api from '../api/getdata'; // 你的API地址
import AsyncStorage from '@react-native-async-storage/async-storage';
function getCurrentDate() {
  // 创建一个日期对象，添加 8 小时以获取到中国时区 (CST) 的时间
  let date = new Date(Date.now() + 8 * 60 * 60 * 1000);
  // 将日期格式化为 YYYY-MM-DD
  return date.toISOString().split('T')[0];
}

function HomeScreen() {
  const [data, setData] = useState(null); // Set initial state as an empty array
  const [visitTimes, setVisitTimes] = useState(1);

  const navigation = useNavigation();
  const [show, setShow] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_Key');
        if (value === null) throw new Error('UserId not found in Storage');
        const {data, error} = await api.getanalysis(value);
        if (error) throw new Error(`Error getting analysis data: ${error}`);
        setData(data);

        // 获取并更新访问次数
        let times = await AsyncStorage.getItem('visitTimes');
        if (times) {
          let newTimes = Number(times) + 1;
          setVisitTimes(newTimes);
          AsyncStorage.setItem('visitTimes', String(newTimes));
        }
      } catch (error) {
        console.log('Error during data fetching and processing:', error);
      }
    })();
  }, []);

  useEffect(() => {
    const getDataAndVerify = async () => {
      const value = await AsyncStorage.getItem('@looked_key');

      if (value === 'false') {
        setShow(false);
      }
    };
    getDataAndVerify();
  }, [navigation]);

  let labels = ['totalSizeKB', 'fileSizeKB', 'videoSizeKB', 'audioSizeKB'];
  let dataValues = data
    ? [data.totalSizeKB, data.fileSizeKB, data.videoSizeKB, data.audioSizeKB]
    : [0, 0, 0, 0];
  let chartData = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
      },
    ],
  };
  const storeData = async value => {
    setShow(false);
    try {
      await AsyncStorage.setItem('@looked_key', value);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.container}>
      <Modal visible={show} transparent={true} animationType="slide">
        <View style={styles.modalView}>
          <Text style={{fontSize: 20}}>
            你好,欢迎来到本软件,需要说明的有以下几点:
          </Text>
          <Text style={{fontSize: 20}}>
            1.本软件的文件系统是和本人的网站五系统联动的,同时账号系统也是
          </Text>
          <Text style={{fontSize: 20}}>
            2.本人的网站地址是:https://chenjinxu.top
          </Text>
          <Text style={{fontSize: 20}}>
            3.本提示只会在您第一次打开本软件时自动展示
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                storeData('false');
              }}>
              <Text style={styles.buttonTextStyle}>我已看过</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={styles.helpIcon} onPress={() => setShow(true)}>
        <Bottom name="question-circle" size={30} color="#000" />
      </TouchableOpacity>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.largeText}>当前日期: {getCurrentDate()}</Text>
          <Text style={styles.largeText}>使用次数: {visitTimes}</Text>
        </View>
      </View>
      <View style={styles.card2}>
        {data ? (
          <>
            <Text style={styles.title}>服务器存储使用情况:</Text>
            <BarChart
              data={chartData}
              width={Dimensions.get('window').width - 16}
              height={220}
              fromZero
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {borderRadius: 16},
              }}
              style={{marginVertical: 8, borderRadius: 16}}
            />
          </>
        ) : (
          <Text style={styles.largeText}>暂无数据</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#87CEFA',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center', // 使文字垂直居中
    alignItems: 'center', // 使文字水平居中
  },
  buttonTextStyle: {
    color: 'white', // 文字颜色
    fontSize: 20, // 文字大小
    fontWeight: 'bold',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: '4%',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  helpIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  header: {
    marginTop: 10,
  },
  largeText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: '2%',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 10,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    marginTop: '20%',
    width: '100%',
  },
  card2: {
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
  },
});

export default HomeScreen;
