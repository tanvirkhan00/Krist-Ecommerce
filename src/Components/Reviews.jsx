import React, { useContext, useEffect, useState } from 'react';
import { apiData } from './ContextApi';

const Reviews = () => {

    let products =useContext(apiData)

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // Extract and limit reviews to the first 5 when the component mounts
        const allReviews = products.flatMap(product => product.reviews || []);
        setReviews(allReviews.slice(0, 5)); // Set only the first 5 reviews in state
    }, [products]); // Only run when `products` changes
    
    

    return (
        <>

            <section>
                <div className="container mt-[50px]">
                    <div className='flex flex-col gap-5'>
                        <div>
                            <h1 className='font-semibold text-[35px]'>What our Customar say's</h1>
                        </div>
                        <div className='flex gap-3 flex-wrap'>
                            {reviews.map((item) =>(
                                <div className='basis-[48%] lg:basis-[19%] truncate border-2 border-black rounded-md p-5 btnHover'>
                                    <p>Rating: {item.rating}</p>
                                    <p>Comment: {item.comment}</p>
                                    <p>Date: {item.date}</p>
                                    <p>Name: {item.reviewerName}</p>
                                    <p>Gmail: {item.reviewerEmail}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            
        </>
    );
};

export default Reviews;