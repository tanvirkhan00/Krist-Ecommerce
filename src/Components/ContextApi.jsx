import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

let apiData =createContext()

const ContextApi = ({children}) => {

    let [info, setInfo] =useState([])

    useEffect(() => {
        axios.get("https://dummyjson.com/products?&limit=0").then((response) => {
            setInfo(response.data.products)
        })
    },[])
    return (
        <>
            <apiData.Provider value={info}>{children}</apiData.Provider>
            
        </>
    );
};

export {ContextApi, apiData};