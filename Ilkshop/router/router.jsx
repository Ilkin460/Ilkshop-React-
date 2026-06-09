import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Shop from '../Shop';

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Shop view="list" />} />
            <Route path="/product/:id" element={<Shop view="detail" />} />
        </Routes>
    );
}

export default AppRouter;