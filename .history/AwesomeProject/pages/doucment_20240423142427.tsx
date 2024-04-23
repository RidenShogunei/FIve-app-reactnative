// @ts-nocheck
import React, {useEffect, useState} from 'react';
import {FlatList, View, Text, Button, Image, StyleSheet} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import api from '../api/document';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Item = ({item, onPress, style}) => {
  return (
    <View style={[styles.card, style]}>
      <Text>{item.file_name}</Text>
      <View style={{flexDirection: 'row'}}>
        <Button title="Download" onPress={onPress} />
      </View>
    </View>
  );
};

const FileUploadManager = () => {
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
        <>
          <Image
            source={{uri: document.uri}}
            style={{width: 200, height: 200}}
          />
        </>
      ) : (
        <Text>No document picked</Text>
      )}
      <Button onPress={pickDocument} title="Pick Document" />
      <FlatList
        data={documentList}
        renderItem={({item}) => (
          <Item
            item={item}
            onPress={() => {
              console.log('press');
            }}
          />
        )}
        keyExtractor={item => item.key} // 假设key是item的唯一标识符
      />
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    a
    textAlign: 'center',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
export default FileUploadManager;
