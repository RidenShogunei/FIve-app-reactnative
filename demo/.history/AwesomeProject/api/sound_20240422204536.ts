// @ts-nocheck
import axios from 'axios';

const sendAudio = async (uid, file) => {
  let formData = new FormData();
  formData.append('uid', uid);
  formData.append('file', file);

  try {
    const response = await axios({
      method: 'post',
      url: `https://chenjinxu.top:6002/audio`,
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

const getAudio = async uid => {
  try {
    const response = await axios.get(`https://chenjinxu.top:6002/audio/${uid}`);
    return response.data;
  } catch (error) {
    console.error('Error during API Call', error);
    return {error: error.message};
  }
};

const deleteAudio = async audioId => {
  try {
    const response = await axios.delete(
      `https://chenjinxu.top:6002/audio/${audioId}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error during API Call', error);
    return {error: error.message};
  }
};

const api = {
  sendAudio,
  getAudio,
  deleteAudio,
};

export default api;
