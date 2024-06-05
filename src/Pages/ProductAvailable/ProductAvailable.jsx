import { useQuery } from '@tanstack/react-query';

import React, { useState } from 'react';
import Loading from '../Shared/Loading/Loading';

import BookingModal2 from '../BookingModal2/BookingModal2';

import ProductOption from './ProductOption';


const ProductAvailable = ({ selectedDate2, products, refetch }) => {

    const [itemValue, setItemValue] = useState(null);
   
    

    return (
        <section className='my-16'>
             <div className='text-center mb-4 mt-10'>
            <p className="text-5xl font-bold text-orange-600 my-10">All Post</p>
            
            <p></p>
        </div>
        <div className='grid gap-6 justify-items-center grid-cols-1 md:grid-cols-1 lg:grid-cols-1 mt-10 my-30'>
            {
                products.map(option => <ProductOption
                    key={option._id}
                    productValue={option}
                    setItemValue={setItemValue}
                    refetch2={refetch}
                ></ProductOption>)
            }
        </div>
        {
            itemValue &&
            <BookingModal2
            selectedDate2={selectedDate2}
            itemValue={itemValue}
                setItemValue={setItemValue}
                
            ></BookingModal2>
        }
    </section>
    );
};

export default ProductAvailable;