// @ts-nocheck
import React, {useEffect, useState} from 'react';
import {View, Text, Button, Image} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import api from '../api/document';

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
  useEffect(async()=>{
    const value = await AsyncStorage.getItem('@storage_Key');
    const result=await api.getDocument(value);
    if(result.length===0){
        setDocumentList([]);
    }else{
        const dataWithKey = response.data.map(item => ({ ...item, key: item.doc_id })); // Using doc_id as key
        setDocumentList(dataWithKey);
    }
  },[])
  return (
    <View>
      {document ? (
        <Image source={{uri: document.uri}} style={{width: 200, height: 200}} />
      ) : (
        <Text>No document picked</Text>
      )}
      <Button onPress={pickDocument} title="Pick Document" />
    </View>
  );
};

export default FileUploadManager;
