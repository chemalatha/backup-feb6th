import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'Auth_Token';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use((config)=>{
    console.log(config);
    return config;
},(error)=>{
    console.log(error);
    console.log(error);
    return Promise.reject(error);
});
axios.interceptors.response.use((config)=>{
    console.log(config);
    console.log(config);
    return config;
},(error)=>{
    console.log(error);
    return Promise.reject(error);
})
ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
