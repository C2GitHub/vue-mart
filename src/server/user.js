import Axios from 'axios';

export default {
  login(user) {
    return Axios.get('api/login', { params: user });
  },
};
