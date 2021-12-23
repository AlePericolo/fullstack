import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '@/store/store';

import { App } from '@/components/App';

import '@/scss/index.scss'

render(
    <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
    , document.getElementById('root'));