// @ts-nocheck
import React, {useState} from 'react';
import {View, Text, Button, Image} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import api from '../api/document';

const FileUploadManager = () => {
  const [document, setDocument] = useState(null);

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

  const manageDocument = async () => {
    
    const documentList = await api.getDocument('123');
    console.log(documentList);

    const deleteResult = await api.deleteDocument('123');
    console.log(deleteResult);
  };

  return (
    <View>
      {document ? (
        <Image source={{uri: document.uri}} style={{width: 200, height: 200}} />
      ) : (
        <Text>No document picked</Text>
      )}
      <Button onPress={pickDocument} title="Pick Document" />
      <Button onPress={manageDocument} title="Manage Document" />
    </View>
  );
};

export default FileUploadManager;
