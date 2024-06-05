import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ProductAvailable from './ProductAvailable';
import ProductBanner from './ProductBanner';

const AllProducts = () => {

    // const products = useLoaderData();





    const url = `social-media-world-server-nuhwx57e6-nazmulhasan8s-projects.vercel.app/allProducts4`;
   

    const { data: products4 = [], isLoading, refetch } = useQuery({
        queryKey: ['products4'],
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

    console.log(products4);











    
    const [selectedDate2, setSelectedDate2] = useState(new Date());
    return (
        <div>

<div>




            <ProductBanner           
                selectedDate2={selectedDate2}
                setSelectedDate2={setSelectedDate2}
            ></ProductBanner>
            <ProductAvailable
                selectedDate2={selectedDate2}
                products={products4}
                refetch={refetch}
            ></ProductAvailable>
        </div>

    </div>
    );
};

export default AllProducts;