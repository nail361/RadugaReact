import axios from 'axios';

export default axios.create({
  baseURL: 'http://188.225.46.145/api.php',
  responseType: 'json',
});
