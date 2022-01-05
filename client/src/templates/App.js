import React from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '@/store/store';

import Notify from '@/templates/components/Notify'
import Nav from '@/templates/routes/Nav'
import Routing from '@/templates/routes/Routing'

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                <div className="bg-blue-100 min-h-screen">
                    <Notify />
                    <Nav />
                    <Routing />
                </div>
            </PersistGate>
        </Provider>
    )
}