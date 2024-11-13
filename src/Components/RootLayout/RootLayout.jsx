import React from 'react';
import Navbar from '../Navbar';
import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from '../Footer';

const RootLayout = () => {
    return (
        <>
            <Navbar/>
            <Outlet/>
            <Footer/>
            <ScrollRestoration/>
        </>
    );
};

export default RootLayout;