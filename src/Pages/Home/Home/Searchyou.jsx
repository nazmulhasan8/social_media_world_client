
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import BookingModal4s from '../../BookingModal2/BookingModal4s';
import ProductOption4s from '../../ProductAvailable/ProductOption4s';










const Searchyou = () => {

   
    const url = `http://localhost:5000/allProducts4`;
   

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

    // console.log(products3);   



  const [value, setValue] = useState("");


  
const onChange = (event) => {
setValue(event.target.value);
};

  const onSearch = (searchTerm) => {
setValue(searchTerm);


    console.log("search", searchTerm);
  };

  console.log(value);


  

  

  const url2 = `http://localhost:5000/searchResult?value=${value}`;

  const {data: manageProducts2 = [] } = useQuery({
      queryKey: ['manageProducts2'],
      queryFn: async () => {
          const res = await fetch(url2, {
            
            headers: {
              authorization: `bearer ${localStorage.getItem('accessToken')}`
          }

          });
          const data = await res.json();
          return data;
      }
  })
console.log(manageProducts2);











const [selectedDate2, setSelectedDate2] = useState(new Date());
const [itemValue7, setItemValue7] = useState(null);











    return (
        <div className="App">
<h1></h1>
  <div className='search-container'>
    <div className='search-inner'>
      <input type="text" value={value} onChange={onChange} />
      <button onClick={() => onSearch(value)}> Search </button>
    </div>




    
<div className='dropdown'>
{products3
.filter((item) => {
const searchTerm = value.toLowerCase();
const fullName = item.title.toLowerCase();

return (searchTerm && fullName.startsWith(searchTerm) && fullName !== searchTerm);
})
.slice(0, 10)
.map((item => (
<div
onClick={() => onSearch(item.title)}
className="dropdown-row"
key={item.title}
> {item.title}</div>




)))

}



</div>

  </div>
       
  
  <div className='mt-9'>Search Result: {value} </div>







  {
       <section className='my-16'>
             <div className='text-center mb-4 mt-10'>
            <p className="text-5xl font-bold text-orange-600 my-10"></p>
            
            <p></p>
        </div>
        <div className='grid gap-6 justify-items-center grid-cols-1 md:grid-cols-1 lg:grid-cols-1 mt-10 my-30'>
            
        {


itemValue7 &&
 <ProductOption4s
                 
                 productValue={manageProducts2}
                 setItemValue={setItemValue7}
                 refetch2={refetch}
                 
                 
                 >

                 </ProductOption4s>
            
        }

        </div>
        {
            itemValue7 &&
            <BookingModal4s
            
            
            selectedDate2={selectedDate2}
            itemValue={itemValue7}
            setItemValue={setItemValue7}
            
            >

            </BookingModal4s>
            
                
            
        }
    </section>
}








      </div>
    );
};

export default Searchyou;