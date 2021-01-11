import axios from 'axios';

export const setToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const googleLogin = async (response: any) => {
  const googleProfile = response.profileObj;

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(googleProfile);

  try {
    return await axios.post('http://localhost:3001/api/users/login', body, config);
  } catch (error) {
    console.log(error);
    alert(error.response.data.message);
  }
};
