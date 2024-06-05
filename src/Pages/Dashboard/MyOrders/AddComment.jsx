
import { useContext } from 'react';


import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';



const AddComment = ({products2}) => {

    

    const { _id, img, title, paid, productId, description, sellerName, location, sellerEmail, originalPrice, resalePrice, yearsOfUse, postedTime, conditionType, sellerMobileNumber, YearOfPurchase } = products2;

    console.log(products2);
    const date2 = new Date().getTime();
    const { user } = useContext(AuthContext);

    console.log();

   


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
        fetch('social-media-world-server-nuhwx57e6-nazmulhasan8s-projects.vercel.app/bookingsProduct2', {
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
        
        
        <div className="bg-purple-300 card card-compact text-3xl w-100 shadow-xl text-center">
            <div className=" bg-purple-300 card card-compact text-3xl w-100 shadow-xl text-center">
               
               
                
    

        
                <form onSubmit={handleBooking} className='grid grid-cols-1 gap-0 mt-1'>

                    
                    <textarea name="phone" type="text" placeholder="Write The Comment Here" className="input w-full input-bordered" />
              


                    <br />
                   
                    <input className='btn btn-accent w-full' type="submit" value="Click To Add Comment" />
                  
                    
                </form>
              
            </div>
            
        </div>
   
    );
};

export default AddComment;