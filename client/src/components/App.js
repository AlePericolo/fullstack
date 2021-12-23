import React from 'react';

import axios from 'axios';


export function App() {

    const testApi = () => {
        axios.get(`http://localhost:3000/api/v1/users`)
            .then(res => {
                console.log(res)
            })
    }

    return (
        <div className="w-2/3 m-auto">
            <h1 className="text-9xl">React APP</h1>
            <p>Lorem ipsum</p>
            <button onClick={() => testApi()}>test api</button>
        </div>
    )
}