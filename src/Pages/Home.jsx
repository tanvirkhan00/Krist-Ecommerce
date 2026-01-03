import React from 'react';
import HeroHome from '../HomePageComponents/HeroHome';
import ShopByCategory from '../HomePageComponents/ShopByCategory';
import OfferMonthly from '../HomePageComponents/OfferMonthly';
import Reviews from '../HomePageComponents/Reviews';
import InstagramStories from '../HomePageComponents/InstagramStories';
import OurService from '../HomePageComponents/OurService';

const Home = () => {
    return (
        <>
            <HeroHome/>
            <ShopByCategory />
            <OfferMonthly />
            <Reviews />
            <InstagramStories />
            <OurService />
        </>
    );
};

export default Home;