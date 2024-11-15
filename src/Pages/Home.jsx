import React from 'react';
import HiroHome from '../Components/HiroHome';
import ShopByCategory from '../Components/ShopByCategory';
import OfferMonthly from '../Components/OfferMonthly';
import Reviews from '../Components/Reviews';

const Home = () => {
    return (
        <>
            <HiroHome />
            <ShopByCategory />
            <OfferMonthly />
            <Reviews />
        </>
    );
};

export default Home;