import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const ReportedProduct = () => {

    const [deletingProduct, setDeletingProduct] = useState(null);

    const closeModal = () => {
        setDeletingProduct(null);
    }



    const { user } = useContext(AuthContext);

    const url = `https://social-media-world-server.onrender.com/reporttoadmin`;

    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ['bookings'],
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
        fetch(`https://social-media-world-server.onrender.com/reporttoadmin/${booking._id}`, {
            method: 'DELETE', 
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0){
                refetch();
                toast.success(`Post deleted successfully`)
            }
        })
    }

    // const handleUserDeleteByAdmin = id => {
    //     fetch(`https://social-media-world-server.onrender.com/users/${id}`, {
    //         method: 'DELETE', 
    //         headers: {
    //             authorization: `bearer ${localStorage.getItem('accessToken')}`
    //         }
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         if(data.deletedCount > 0){
    //             refetch();
    //             toast.success(`User is deleted successfully`)
    //         }
    //     })
    // }

    if (isLoading) {
        return <Loading></Loading>
    }

    // _id
    // 637efd889d00f8ca86abb91e
    // orderDate
    // "Nov 24, 2022"
    // title
    // "Samsung Galaxy M13 5G"
    // name
    // "Nazmul Hasan"
    // email
    // "user22@gmail.com"
    // phone
    // "01978473483"
    // resalePrice
    // "7,990"


    return (
        <div>
            <h3 className="text-3xl mb-5">All Reported Posts</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Title</th>
                            <th>Image</th>
                            <th>Post Date</th>
                         
                            <th>delete</th>
                          
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings &&
                            bookings?.map((booking, i) => <tr key={booking._id}>
                                <th>{i + 1}</th>
                                <td>{booking.sellerName}</td>
                                <td>{booking.sellerEmail}</td>
                                <td>{booking.title}</td>
                                <td>

                                <div className="rounded w-24 h-15">
                        {
                         
                            
                            
                            <img src={booking.img} alt="" />
                             
                          }
                    </div>

                                </td>
                                <td>{booking.postedTime}</td>
                                
                                <td>
                                    <label onClick={() => setDeletingProduct(booking)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>
                                </td>

                                
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingProduct && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete Report Post. It cannot be undone.`}
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

export default ReportedProduct;