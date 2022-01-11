import React from 'react';

import Article from '@/templates/forms/Article';

export default function ArticleNew() {

    return (
        <div className='mt-5 flex justify-center items-center'>
            <div className='w-2/3 md:w-1/2 xl:w-1/3 bg-white border border-l-8 border-indigo-700 shadow rounded p-5'>
                <h1 className='antialiased text-center font-medium tracking-widest'>New Article</h1>
                <Article />
            </div>
        </div>
    )
}