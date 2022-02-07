import React, { useState, useEffect } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';

import { searchArticlesHandler } from '@/store/rest'
import { getRandomImage } from '@/utils/utils';

import { isNil } from 'lodash';
import { DateTime } from "luxon";

export default function Articles() {

    const [page, setPage] = useState(1) 
    const [items, setItems] = useState([])
    const [searchArticles, { data: articlesData }] = searchArticlesHandler()


    useEffect(() => {
        if(isNil(articlesData)) return

        setItems([...items, ...articlesData.items])

    }, [articlesData])

    useEffect(() => {
        searchArticles({page: page})
    }, [page])

    const renderCategories = (categories) => {
        return (
            (categories || []).map((c, index) => {
                return (
                    <span key={index} className='badge'>
                        {c}
                    </span>
                )
            })
        )
    }

    return (
        <InfiniteScroll
            next={() => {setPage(page + 1)}}
            dataLength={items.length}
            hasMore={isNil(articlesData) ? true : items.length < articlesData.totalItems}
            loader={
                <p style={{ textAlign: 'center' }}>
                    <b>Loading..</b>
                </p>
            }
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5'>
            {items.map(a => {
                        return (
                            <div key={a._id} className='card-article'>
                                <div className='image-container'>
                                    <img src={getRandomImage()} />
                                </div>
                                <div className='title-container '>
                                    <p className='title'>{a.title}</p>
                                    <p className='subtitle'>{a.subtitle}</p>
                                </div>
                                <div className='categories-container'>
                                    {renderCategories(a.categories)}
                                </div>
                                <div className='info-container'>
                                    <span className='date'>{DateTime.fromISO(a.created_at).toFormat('dd LLLL y')}</span>
                                    <span className='author'>{a.user.email}</span>
                                </div>
                            </div>
                        )
                    })}
                    </div>
        </InfiniteScroll>
        )
}