import React from 'react';

import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '@/templates/pages/Home'
import Articles from '@/templates/pages/Articles'
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
            <Route path="/articles" element={<Articles />} />
            <Route path="/test" element={<Test />} />
            <Route path="/auth" element={isNil(token) ? <Auth /> : <Navigate to="/" />} />
            <Route path="/profile" element={isNil(token) ? <Navigate to="/" /> : <Profile />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}