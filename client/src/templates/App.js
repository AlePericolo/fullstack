import React from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '@/store/store';

import Nav from '@/templates/components/Nav'
import Routing from '@/templates/components/Routing'

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                <div className="bg-blue-100 min-h-screen">
                    <Nav />
                    <Routing />
                </div>
            </PersistGate>
        </Provider>
    )
}