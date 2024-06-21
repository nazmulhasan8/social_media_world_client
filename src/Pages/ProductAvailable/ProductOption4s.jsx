
import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import face from '../../assets/images/face.jpg';
import pic5 from '../../assets/images/pic5.jpg';
import verify from '../../assets/images/verify.png';
import { AuthContext } from '../../contexts/AuthProvider';
import AddComment from '../Dashboard/MyOrders/AddComment';
import MyComments from '../Dashboard/MyOrders/MyComments';
import ConfirmationModal from '../Shared/ConfirmationModal/ConfirmationModal';


const ProductOption4s = ({ productValue, setItemValue, refetch2 }) => {

    const { _id, likeValue, img, title, categoryName, description, sellerName, paid, sellerEmail, location, originalPrice, resalePrice, yearsOfUse, postedTime, conditionType, sellerMobileNumber, YearOfPurchase  } = productValue;
    
    const { user } = useContext(AuthContext);

    let [like, setLike] = useState(1);



    const handleStatusUpdate = id => {
        setLike(like+1);
        fetch(`http://localhost:5000/orders4/${id}`, {
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
                    refetch2()
                 
                        toast.success(`Like Added`)
                        
                    }
                    else{
                        toast.error(data.message);
                    }
                
            })
    }


    
    const {data: mongobdUsers = [], refetch} = useQuery({
        queryKey: ['mongobdUsers'],
        queryFn: async() =>{
            const res = await fetch('http://localhost:5000/sellers');
            const data = await res.json();
            return data;
        }
    });

    





console.log(_id);

const [reportedProduct, setReportedProduct] = useState(null);
const closeModal = () => {
    setReportedProduct(null);
    
}

const handleReportProduct = productValue => {
    fetch(`http://localhost:5000/reporttoadmin`, {
        method: 'POST', 
        headers: {
            'content-type': 'application/json', 
            authorization: `bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({ img, title, categoryName, description, sellerName, paid, sellerEmail, location, originalPrice, resalePrice, yearsOfUse, postedTime, conditionType, sellerMobileNumber, YearOfPurchase  })
    })
    .then(res => res.json())
    .then(data => {
        
        console.log(data);
        if (data.acknowledged) {
           
            toast.success(`Post Repored to Admin successfully`)
            
        }
        else{
            toast.error(data.message);
        }

    })
}

    return (
        refetch2() && <div className="card card-compact w-80 h-30 bg-fuchsia-500 shadow-xl my-10 mx-36">
           

{
                                          !mongobdUsers?.verified && <p className='text-2xl  font-semibold inline-block'> 
                                          
                                          <div className="my-3 mx-3">
                                          <img className='w-12 inline-block rounded-full' src={face} alt="" /> {sellerName} <img className='w-6 inline-block rounded-full' src={pic5} alt="" /> 
                                         </div>
                                          </p>
                                    }

                                    {
                                          mongobdUsers?.verified && <p className='text-2xl  font-semibold inline-block'> 
                                          
                                          <div className="my-3 mx-3">
                                         <img className='w-12 inline-block rounded-full' src={face} alt="" /> {sellerName} <img className='w-6 inline-block rounded-full' src={verify} alt="" /> 
                                         </div>
                                          </p>
                                    }

            <figure><img src={img} alt="missing" /></figure>
            

            <div className="card-body w-100">
            <td className="card-title text-3xl">
            


                                   


                                    

                                </td>
                                <td>
                                {user?.email && <label onClick={() => setReportedProduct(productValue)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Report Post</label>}
                                </td>

                                <h2 className="card-title text-3xl font-bold">{title}</h2>

               
                
                
             
                    
                <div>
                {
                    description.length > 105 ?
                        <>{description.slice(0, 105) + '...'}  
                       
                        </>
                        :
                        <>{description}</> 
                }
                </div>
                
                <div className="card-actions justify-center">
                {user?.email &&  <Link to={`/checkout/${_id}`}><label
    // disabled={slots.length === 0}
    htmlFor="booking-modal2"
    className="btn btn-primary text-white"
    onClick={() => setItemValue(productValue)}
>Details</label></Link>}
</div>

{/* setLike(like+1) && handleStatusUpdate(_id) */}

<div className="card-actions justify-center">
                {user?.email && <label
    // disabled={slots.length === 0}
    htmlFor="booking-modal2"
    className="btn btn-primary text-white"
    onClick={() => handleStatusUpdate(_id)}
>Like</label>}
</div>

<p className='text-center text-2xl'>{likeValue} Likes </p>

{user?.email && <AddComment  key={_id} products2={productValue} refetch2={refetch2}></AddComment>}
<MyComments key={_id} _id={_id}  refetch2={refetch2}></MyComments>

            </div>


           


            {
                reportedProduct && <ConfirmationModal
                    title={`Are you sure you want to Report ${reportedProduct.title} Product?`}
                    message={`If you want to Report Product ${reportedProduct.title}. Click Report The Product `}
                    successAction = {handleReportProduct}
                    successButtonName="Report The Product"
                    modalData = {reportedProduct}
                    closeModal = {closeModal}
                >
                </ConfirmationModal>
            }
            
        </div>
           
           
    

    );
};

export default ProductOption4s;