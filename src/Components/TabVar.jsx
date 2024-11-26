import React, { useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { apiData } from './ContextApi';
import { useParams } from 'react-router';


// Icons
import { CiStar } from "react-icons/ci";



const TabVar = () => {

    const products = useContext(apiData)
    const { id } = useParams()
    const product = products.find((item) => item.id === parseInt(id));
    let dimentions = product.dimensions
    let meta = product.meta





    return (
        <>

            <section>
                <div className="container mt-10">
                    <div>
                        <div>
                            <Tabs>
                                <TabList>
                                    <Tab>Descriptions</Tab>
                                    <Tab>Additional Information</Tab>
                                    <Tab>Reviews</Tab>
                                </TabList>

                                <TabPanel>
                                    <h2>{product.description}</h2>
                                </TabPanel>
                                <TabPanel>
                                    <div>
                                        <p className='flex items-center gap-2 font-semibold'>Tags:<span className='capitalize font-normal'>{product.tags}</span></p>
                                        <p className='flex items-center gap-2 font-semibold'>Weight:<span className='capitalize font-normal'>{product.weight}</span></p>
                                        <p className='flex items-center gap-2 font-semibold'>Shipping Information:<span className='capitalize font-normal'>{product.shippingInformation}</span></p>
                                        <p className='flex items-center gap-2 font-semibold'>Width:<span className='capitalize font-normal'>{dimentions.width}</span></p>
                                        <p className='flex items-center gap-2 font-semibold'>Height:<span className='capitalize font-normal'>{dimentions.height}</span></p>
                                        <p className='flex items-center gap-2 font-semibold'>Depth:<span className='capitalize font-normal'>{dimentions.depth}</span></p>
                                        <p className='flex items-center gap-2 font-semibold'>QRCode:<span className='capitalize font-normal'>{meta.qrCode}</span></p>
                                        <p className='flex items-center gap-2 font-semibold'>Bar Code:<span className='capitalize font-normal'>{meta.barcode}</span> </p>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className='flex gap-5 flex-wrap'>
                                        {product?.reviews?.map((item) => (
                                            <div>
                                                <p><span className='font-semibold'>Rating:</span> {item.rating}</p>
                                                <p><span className='font-semibold'>Comment:</span> {item.comment}</p>
                                                <p><span className='font-semibold'>Date:</span> {item.date}</p>
                                                <p><span className='font-semibold'>Name:</span> {item.reviewerName}</p>
                                                <p><span className='font-semibold'>Email:</span> {item.reviewerEmail}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className='mt-5 border-t-2 border-slate-300 pt-3'>
                                        <h1 className='font-bold text-[20px]'>Add your Review</h1>
                                        <p className='py-1'>Your Rating</p>
                                        <div className='flex items-center gap-3'>
                                            <div>
                                                <span><CiStar /></span>
                                            </div>
                                            <div className='flex items-center'>
                                                <span><CiStar /></span>
                                                <span><CiStar /></span>
                                            </div>
                                            <div className='flex items-center'>
                                                <span><CiStar /></span>
                                                <span><CiStar /></span>
                                                <span><CiStar /></span>
                                            </div>
                                            <div className='flex items-center'>
                                                <span><CiStar /></span>
                                                <span><CiStar /></span>
                                                <span><CiStar /></span>
                                                <span><CiStar /></span>
                                            </div>
                                            <div className='flex items-center'>
                                                <span><CiStar /></span>
                                                <span><CiStar /></span>
                                                <span><CiStar /></span>
                                                <span><CiStar /></span>
                                                <span><CiStar /></span>
                                            </div>
                                        </div>
                                        <form className='mt-5 flex flex-col gap-4 w-[50%]'>
                                            <div>
                                                <label htmlFor="name">Name</label>
                                                <input id='name' type="text" className='w-full border-2 border-slate-300 py-2 px-2 rounded-md borderHover' placeholder='Enter Your Name' />
                                            </div>
                                            <div>
                                                <label htmlFor="email">Email Address</label>
                                                <input id='email' type="email" placeholder='Enter Your Email' className='w-full border-2 border-slate-300 py-2 px-2 rounded-md borderHover' />
                                            </div>
                                            <div>
                                                <label htmlFor="address">Your Address</label>
                                                <input id='address' type="email" placeholder='Enter Your Email' className='w-full border-2 border-slate-400 py-10 px-2 rounded-md borderHover' />
                                            </div>
                                            <input className='border-2 border-black rounded-md px-10 py-2 btnHover font-semibold max-w-fit' type="submit" />
                                        </form>
                                    </div>
                                </TabPanel>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default TabVar;