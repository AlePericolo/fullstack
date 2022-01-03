import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Search() {

    const navigate = useNavigate();

    return (
        <>
        <h1>Home</h1>
        <button onClick={()=>navigate('random')}>random</button>
        <button onClick={()=>navigate('test')}>test</button>
        </>
    )
}