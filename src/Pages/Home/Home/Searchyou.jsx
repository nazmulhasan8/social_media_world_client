import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';



const Searchyou = () => {

   
    const url = `social-media-world-server-nuhwx57e6-nazmulhasan8s-projects.vercel.app/allProducts4`;
   

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




 

  const url2 = `social-media-world-server-nuhwx57e6-nazmulhasan8s-projects.vercel.app/searchResult?value=${value}`;

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










      </div>
    );
};

export default Searchyou;