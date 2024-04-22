import axios from 'axios';

const getanalysis = async uid => {
  try {
    const response = await axios.get(
      `https://chenjinxu.top:6002/getanalysis/${uid}`,
    );
    console.log(`https://chenjinxu.top:6002/getanalysis/${uid}`);
    return response;
  } catch (error) {
    console.error('Error during API Call', error);
    return {error: error.message};
  }
};

const api = {
  getanalysis,
};

export default api;
