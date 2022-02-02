import React from 'react';

import Card from '@/templates/components/Card';

import { getArticles } from '@/store/rest'

import { isNil } from 'lodash';

export default function Articles() {

    const { data: articlesData } = getArticles()

    console.log(articlesData)

    const renderArticles = () => {
        if (isNil(articlesData)) return null

        return (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5'>
                {(articlesData || []).map(a => {
                    return (<div key={a._id}
                        className='w-100 bg-gray-200 shadow'>
                        <p>{a.title}</p>
                        <p>{a.subtitle}</p>
                        <p>{a.text}</p>
                    </div>
                    )
                })}
            </div>
        )
    }

    return renderArticles()
}