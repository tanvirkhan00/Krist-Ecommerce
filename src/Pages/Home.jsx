import React from 'react';
import HiroHome from '../Components/HiroHome';
import ShopByCategory from '../Components/ShopByCategory';
import OfferMonthly from '../Components/OfferMonthly';
import Reviews from '../Components/Reviews';
import InstagramStories from '../Components/InstagramStories';
import OurService from '../Components/OurService';

const Home = () => {
    return (
        <>
            <HiroHome />
            <ShopByCategory />
            <OfferMonthly />
            <Reviews />
            <InstagramStories />
            <OurService />
        </>
    );
};

export default Home;