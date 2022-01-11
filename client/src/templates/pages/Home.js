import React from 'react';

import Button from '@/templates/components/Button'

export default function Search() {

    return (
        <>
        <h1>Home</h1>
        <Button btn="warning"
                size="sm"
                text="random"
                style="italic"
                href="/random"/>
        <Button btn="info"
                size="sm"
                text="test"
                href="/test"/>
        </>
    )
}