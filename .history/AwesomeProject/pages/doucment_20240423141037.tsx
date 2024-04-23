// @ts-nocheck
import React, {useEffect, useState} from 'react';
import {FlatList, View, Text, Button, Image} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import api from '../api/document';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Item = ({item, onPress, style}) => (
  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
    <Text>{item.file_name}</Text>
    <Text>{item.upload_date}</Text>
    <View style={{flexDirection: 'row'}}>
      <Button title="Download" onPress={onPress} />
    </View>
  </View>
);

const FileUploadManager = () => {
  renderItem = ({item}) => {
    return (
      <Item
        item={item}
        onPress={() => {
          /* 寻找下载和删除操作 */
        }}
      />
    );
  };
  const [document, setDocument] = useState(null);
  const [documentList, setDocumentList] = useState([]);
  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setDocument({
        uri: res.uri,
        type: res.type,
        name: res.name,
        size: res.size,
      });
      const value = await AsyncStorage.getItem('@storage_Key');
      console.log('take host key', value);
      const result = await api.sendDocument(value, document);
      console.log(result);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.error('Unknown Error', err);
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_Key');
        console.log('take host key', value);
        const result = await api.getDocument(value);
        console.log('take data', result);
        if (result.length === 0) {
          setDocumentList([]);
        } else {
          const dataWithKey = result.data.map(item => ({
            ...item,
            key: item.doc_id,
          })); // 使用doc_id作为key
          setDocumentList(dataWithKey);
        }
      } catch (error) {
        console.error('Error during data fetching:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <View>
      {document ? (
        <Image source={{uri: document.uri}} style={{width: 200, height: 200}} />
      ) : (
        <Text>No document picked</Text>
      )}
      <Button onPress={pickDocument} title="Pick Document" />
      <FlatList
        data={documentList}
        renderItem={this.renderItem}
        keyExtractor={item => item.doc_id}
      />
    </View>
  );
};

export default FileUploadManager;
