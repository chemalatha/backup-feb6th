import axios from 'axios';

const instance = axios.create({
    baseURL:'https://react-myburger-6fa4e.firebaseio.com'
});

export default instance;