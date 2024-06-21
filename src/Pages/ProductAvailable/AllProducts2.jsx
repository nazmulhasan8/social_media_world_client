import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ProductAvailable from './ProductAvailable';
import ProductBanner from './ProductBanner';

const AllProducts2 = () => {

    const url = `https://social-media-world-server.onrender.com/allPosts3`;
   

    const { data: products3 = [], isLoading, refetch } = useQuery({
        queryKey: ['products3'],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
                

            });
           
          
            const data = await res.json();
            
            
            return data;
            
        }
    })

    console.log(products3);
   
    
    const [selectedDate2, setSelectedDate2] = useState(new Date());
    return (
        <div>

<div>


    <div>


    </div>
    
            <ProductBanner           
                selectedDate2={selectedDate2}
                setSelectedDate2={setSelectedDate2}
            ></ProductBanner>
            <ProductAvailable
                selectedDate2={selectedDate2}
                products={products3}
                refetch={refetch}
            ></ProductAvailable>
        </div>

    </div>
    );
};

export default AllProducts2;