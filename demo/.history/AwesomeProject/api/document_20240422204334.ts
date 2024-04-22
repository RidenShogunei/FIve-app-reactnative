import axios, {AxiosResponse} from 'axios';

interface ErrorType {
  error: string;
}

const sendDocument = async (
  uid: string,
  file: File,
): Promise<any | ErrorType> => {
  let formData = new FormData();
  formData.append('uid', uid);
  formData.append('file', file);

  try {
    const response: AxiosResponse = await axios({
      method: 'post',
      url: `https://chenjinxu.top:6002/document`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data;charset=utf-8',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error during API Call', error);
    return {error: error.message};
  }
};

const getDocument = async (uid: string): Promise<any | ErrorType> => {
  try {
    const response: AxiosResponse = await axios.get(
      `https://chenjinxu.top:6002/document/${uid}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error during API Call', error);
    return {error: error.message};
  }
};

const deleteDocument = async (docId: string): Promise<any | ErrorType> => {
  try {
    const response: AxiosResponse = await axios.delete(
      `https://chenjinxu.top:6002/document/${docId}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error during API Call', error);
    return {error: error.message};
  }
};

const api = {
  sendDocument,
  getDocument,
  deleteDocument,
};

export default api;
