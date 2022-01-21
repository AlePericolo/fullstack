import React from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '@/store/store';

import Toast from '@/templates/components/Toast'
import Nav from '@/templates/routes/Nav'
import Routing from '@/templates/routes/Routing'

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                <Toast />
                <Nav />
                <Routing />
            </PersistGate>
        </Provider>
    )
}