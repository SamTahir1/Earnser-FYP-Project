import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
// import {Provider} from 'react-redux';
// import {PersistGate} from "redux-persist/integration/react";
// import PersistStore from "redux-persist/es/persistStore";
// import store from './store'

// let persistedStore = PersistStore(store);
 

ReactDOM.render(
  <React.StrictMode>
    {/* <PersistGate loading={null} persistor={[persistedStore]}> */}

    <App />
    {/* </PersistGate> */}
  </React.StrictMode>,
  document.getElementById('root')
);


