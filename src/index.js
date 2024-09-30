import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GeoProvider } from './context/GeoContext';
import {AdhanParamProvider} from './context/AdhanParamContext'
import {store} from './store'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GeoProvider>
    <AdhanParamProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AdhanParamProvider>
  </GeoProvider>
);
