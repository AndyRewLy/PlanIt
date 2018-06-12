import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import react router
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';

// Our own components
import { App } from './components/index';

// Register service worker
import registerServiceWorker from './registerServiceWorker';
// Import global styles accross entire application
import './index.css'; // Our own main stylesheet

import { persistor, store } from './store';


const router = (
   <Provider store={store}>
      <PersistGate loading={<p>Loading</p>} persistor={persistor}>
      <BrowserRouter>
         <App/>
      </BrowserRouter>
      </PersistGate>
   </Provider>
)

ReactDOM.render(router, document.getElementById('root'));
registerServiceWorker();