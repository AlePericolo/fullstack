import React from 'react';

import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '@/templates/pages/Home'

import NavArticle from '@/templates/routes/NavArticle'
import Articles from '@/templates/pages/article/Articles'
import Article from '@/templates/pages/article/Article'
import ArticleHandler from '@/templates/pages/article/ArticleHandler'
import ArticleUser from '@/templates/pages/article/ArticleUser'
import ArticleNew from '@/templates/pages/article/ArticleNew'
import Test from '@/templates/pages/Test'

import Profile from '@/templates/pages/Profile'

import Auth from '@/templates/pages/Auth'

import NotFound from '@/templates/pages/NotFound'

import {isNil} from 'lodash'

export default function Routing() {

    const token = useSelector((state) => state.app.token);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="articles" element={isNil(token) ? <Articles /> : <NavArticle />}>
                <Route index element={<Articles />} />
                <Route path=":id" element={<Article />} />
                <Route path="edit/:id" element={isNil(token) ? <Navigate to="/articles" /> : <ArticleHandler />} />
                <Route path="user" element={isNil(token) ? <Navigate to="/articles" /> : <ArticleUser />} />
                <Route path="new" element={isNil(token) ? <Navigate to="/articles" /> : <ArticleNew />} />
                <Route path="*" element={<Articles />} />
            </Route>
            <Route path="test" element={<Test />} />
            <Route path="auth" element={isNil(token) ? <Auth /> : <Navigate to="/" />} />
            <Route path="profile" element={isNil(token) ? <Navigate to="/" /> : <Profile />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}