import React, { useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { apiData } from './ContextApi';
import { useParams } from 'react-router';


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