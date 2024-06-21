import { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';

const BookingModal4s = ({ itemValue, setItemValue, selectedDate2, refetch }) => {

    // treatment is just another name of appointmentOptions with name, slots, _id
    const { _id, img, title,paid, productId, description, sellerName, location, sellerEmail, originalPrice, resalePrice, yearsOfUse, postedTime, conditionType, sellerMobileNumber, YearOfPurchase } = itemValue;
    console.log(_id);
    const date2 = new Date().getTime();
    const { user } = useContext(AuthContext);

    console.log();

    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
       
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
      
       
       
        const booking2 = {
            postedTime: date2,
          
         
            mongobdProductId: _id,
         
            name, 
            img,          
            buyerEmail: email,
            buyerPhoneNumber: phone,
           
        }

        // TODO: send data to the server
        // and once data is saved then close the modal 
        // and display success toast
        fetch('https://social-media-world-server.onrender.com/bookingsProduct', {
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
                    setItemValue(null);
                    toast.success('Order Confirmed');
                    refetch();
                }
                else{
                    toast.error(data.message);
                }
            })


    }

    return (
        <>
            <input type="checkbox" id="booking-modal2" className="modal-toggle" />
            <div className="modal modalColor ">
                <div className="modal-box relative bg-purple-300 w-900">
                    <label htmlFor="booking-modal2" className="btn btn-sm btn-circle absolute left-0 top-2 sticky ">✕</label>
                    <h3 className="text-lg font-bold ">{title}</h3>

                    
                    {/* bg-fuchsia-500 */}
            <figure><img src={img} alt="pic" /></figure>
            <div className="card-body modalColor w-100">

  

                <h2 className="card-title text-3xl">{title}</h2>
                <p className='text-2xl  font-semibold'>Seller Name: {sellerName}</p> 
\       
                <div className='text-left'>
                {
                    description
                }
                </div>
                
            </div>
            
        

            <p className='text-3xl text-black-600 font-semibold text-center'>Submit The Form To Confirm Order</p>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>
                    <label for="cars">Order Date</label>
                        <input type="text" disabled value={date2} className="input w-full input-bordered " />
                        <label for="cars">Product Id</label>
                        <input name="id" type="text" defaultValue={_id} disabled placeholder="id" className="input w-full input-bordered" />
                        
                        <label for="cars">Buyer Name</label>
                        <input name="name" type="text" defaultValue={user?.displayName} disabled placeholder="Your Name" className="input w-full input-bordered" />
                        <label for="cars">Buyer Email </label>
                        <input name="email" type="email" defaultValue={user?.email} disabled placeholder="Email Address" className="input w-full input-bordered" />
                        <label for="cars"> CommentsPhone</label>
                        <textarea name="phone" type="text" placeholder="CommentsPhone" className="input w-full input-bordered" />
                  


                        <br />
                        <input className='btn btn-accent w-full' type="submit" value="Comment" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal4s;