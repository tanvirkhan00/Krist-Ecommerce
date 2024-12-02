import React from 'react';

// Image
import Story from "../assets/Fashion.png";
import Story1 from "../assets/Fashion1.png";
import Story2 from "../assets/Fashion2.png";
import Story3 from "../assets/Fashion3.png";

const InstagramStories = () => {
    return (
        <>

            <section>
                <div className="container mt-[50px]">
                    <div className='flex flex-col gap-5'>
                        <h1 className='text-[35px] font-semibold text-center'>Our Instagram Stories</h1>
                        <div className='flex items-center flex-wrap gap-4'>
                            <div className='basis-[46%] md:basis-[23%]'><img className='w-full h-[350px] upScallHover' src={Story} alt="" /></div>
                            <div className='basis-[46%] md:basis-[23%]'><img className='w-full h-[350px] upScallHover' src={Story1} alt="" /></div>
                            <div className='basis-[46%] md:basis-[23%]'><img className='w-full h-[350px] upScallHover' src={Story2} alt="" /></div>
                            <div className='basis-[46%] md:basis-[23%]'><img className='w-full h-[350px] upScallHover' src={Story3} alt="" /></div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default InstagramStories;