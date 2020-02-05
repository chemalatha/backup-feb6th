
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore } from 'redux';
import {Provider} from 'react-redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import counterReducer from './store/reducers/counter';
import resultsReducer from './store/reducers/results';


const Ctx = React.createContext();

const store = createStore(reducer);

ReactDOM.render(<Ctx.Provider store={store}><App /></Ctx.Provider>, document.getElementById('root'));
registerServiceWorker();
