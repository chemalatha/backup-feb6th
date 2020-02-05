import axios from 'axios';

const instance = axios.create({
    baseURL:'https://jsonplaceholder.typicode.com/'
});
instance.defaults.headers.post['Content-Type'] = 'application/json';

export default instance;
