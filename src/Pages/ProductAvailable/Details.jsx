
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import AddComment from '../Dashboard/MyOrders/AddComment';
import MyComments from '../Dashboard/MyOrders/MyComments';


const Details = () => {

    const products = useLoaderData();

    const { _id, likeValue, img, title, paid, productId, description, sellerName, location, sellerEmail, originalPrice, resalePrice, yearsOfUse, postedTime, conditionType, sellerMobileNumber, YearOfPurchase } = products;

    console.log(products);
    const date2 = new Date().getTime();
    const { user } = useContext(AuthContext);

    console.log();



    let [like, setLike] = useState(1);



    const handleStatusUpdate = id => {
        setLike(like+1);
        fetch(`https://social-media-world-server.onrender.com/orders4/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ status: like })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                 
                        toast.success(`Like Added`)
                        
                    }
                    else{
                        toast.error(data.message);
                    }
                
            })
    }





    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
       
        
        const phone = form.phone.value;
      
       
       
        const booking2 = {
            postedTime: date2,
          
         
            mongobdProductId: _id,
         
            name: user?.displayName, 
            img,          
            buyerEmail: user?.email,
            buyerPhoneNumber: phone,
           
        }

        // TODO: send data to the server
        // and once data is saved then close the modal 
        // and display success toast
        fetch('https://social-media-world-server.onrender.com/bookingsProduct2', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking2)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                
                 
                    toast.success('Comment Added');
                   
                }
                else{
                    toast.error(data.message);
                }
            })


    }


    return (
        
        
        <div className="bg-purple-300 card card-compact text-3xl w-100 shadow-xl text-center ">
            <div className=" bg-purple-300 card card-compact text-3xl w-100 shadow-xl text-center mx-5">
               
               
                <h1 className=" text-3xl font-bold text-center">{title}</h1>
                
                {/* bg-fuchsia-500 */}

        <figure className="rounded w-full h-15"><img src={img} alt="pic" /></figure>
        <div className="card-body w-100">

        <p className='text-2xl  font-semibold'>Posted By: {sellerName}</p> 

            <h2 className="card-title text-3xl">{title}</h2>
            
      
            <div className='text-left text-2xl'>
            {
                description
            }
            </div>
            
        </div>
        



        <div className="card-actions justify-center">
                {user?.email && <label
    // disabled={slots.length === 0}
    htmlFor="booking-modal2"
    className="btn btn-primary text-white"
    onClick={() => handleStatusUpdate(_id)}
>Like</label>}
</div>

<p>{likeValue} Likes </p>


    
        <p className='text-3xl text-black-600 font-semibold text-center'>Comment Here</p>
       

                <AddComment  key={_id} products2={products}></AddComment>

                <div className='text-1xl text-sm'>




            
           
<h3 className="text-3xl mb-5 mt-5 text-center"></h3>
<div className="overflow-x-auto">
    <table className="table w-full">
        <thead>
            <tr>
                
                
               
                <th className="text-3xl text-center" id='go'> All Comments</th>
              
             
            </tr>
        </thead>
        </table> 
</div>

</div>


                <MyComments  key={_id} _id={_id}></MyComments>
            </div>
            
        </div>
   
    );
};

export default Details;