import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import face from '../../../assets/images/face.jpg';
import { AuthContext } from '../../../contexts/AuthProvider';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const MyComments = ({_id}) => {

    console.log(_id);

    const [deletingProduct, setDeletingProduct] = useState(null);

    const closeModal = () => {
        setDeletingProduct(null);
    }



    const { user } = useContext(AuthContext);

    console.log(user);

    const url = `http://localhost:5000/bookingsProduct2/${_id}`;
   

    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ['bookings', _id],
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


    const handleDeleteProduct = booking => {
        fetch(`http://localhost:5000/bookingsProduct/${booking._id}`, {
            method: 'DELETE', 
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0){
                refetch();
                toast.success(`Comment deleted successfully`)
            }
        })
    }

    if (isLoading) {
       
        return <Loading></Loading>
        
    }

    
    

    return (

        <div className='text-1xl text-sm'>




            
           
            <h3 className="text-3xl mb-5 mt-5 text-center"></h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    
                    <tbody>
                        {
                            bookings &&
                            bookings?.map((booking, i) => <tr key={booking._id}>
                                <th>{i + 1}</th>
                                <td className='px-20 bg-purple-300'>
                                
                         
                            
                            
                         <img src={face} alt="" className="w-14 inline-block rounded-full" /> {booking.name}
                          
                         
                                
                                </td>
                              
                               
                                <td>
                                    
                                </td>
                                
                                <td>
                                    
                                </td>

                               
                                <td className=" " >{booking.buyerPhoneNumber}</td>
                                
                                {user?.email && <td>
                                    <label onClick={() => setDeletingProduct(booking)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete Comment</label>
                                </td>}


                               

                                


<td>

</td>


                            </tr>
                            
                            
                            )
                        }
                    </tbody>
                </table>
            </div>
            {
                 
                 refetch() && deletingProduct && <ConfirmationModal
                    title={`Are you sure you want to Delete Comment?`}
                    message={`If you Delete Comment. It cannot be undone.`}
                    successAction = {handleDeleteProduct}
                    successButtonName="Delete"
                    modalData = {deletingProduct}
                    closeModal = {closeModal}
                >
                </ConfirmationModal>
            }
        </div>
    );
};

export default MyComments;