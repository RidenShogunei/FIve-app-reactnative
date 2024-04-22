// @ts-nocheck
import axios from 'axios';

const sendVideo = async (uid, file) => {
  let formData = new FormData();
  formData.append('uid', uid);
  formData.append('file', file);

  try {
    const response = await axios({
      method: 'post',
      url: `https://chenjinxu.top:6002/video`,
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

const getVideo = async uid => {
  try {
    const response = await axios.get(`https://chenjinxu.top:6002/video/${uid}`);
    return response.data;
  } catch (error) {
    console.error('Error during API Call', error);
    return {error: error.message};
  }
};

const deleteVideo = async videoId => {
  try {
    const response = await axios.delete(
      `https://chenjinxu.top:6002/video/${videoId}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error during API Call', error);
    return {error: error.message};
  }
};

const api = {
  sendVideo,
  getVideo,
  deleteVideo,
};

export default api;
