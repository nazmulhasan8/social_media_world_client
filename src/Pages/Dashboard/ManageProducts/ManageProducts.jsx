import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const ManageProducts = () => {
    const [deletingProduct, setDeletingProduct] = useState(null);

    const [advertiseProduct, setAdvertiseProduct] = useState(null);

    

    const closeModal = () => {
        setDeletingProduct(null);
        setAdvertiseProduct(null);
    }

    

    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const url = `social-media-world-server-nuhwx57e6-nazmulhasan8s-projects.vercel.app/allProducts?email=${user?.email}`;

    const {data: manageProducts = [], isLoading, refetch  } = useQuery({
        queryKey: ['manageProducts', user?.email],
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
console.log(manageProducts);
    
    const handleDeleteProduct = booking => {
        fetch(`social-media-world-server-nuhwx57e6-nazmulhasan8s-projects.vercel.app/allProducts/${booking._id}`, {
            method: 'DELETE', 
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0){
                refetch();
                toast.success(`Post ${booking.title} deleted successfully`)
            }
        })
    }


    




    const handleAdvertiseProduct = booking => {
        fetch(`social-media-world-server-nuhwx57e6-nazmulhasan8s-projects.vercel.app/advertise`, {
            method: 'POST', 
            headers: {
                'content-type': 'application/json', 
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data => {
            
            console.log(data);
            if (data.acknowledged) {
                refetch();
                toast.success(`Post ${booking.title} advertised successfully`)
                navigate('/');
            }
            else{
                toast.error(data.message);
            }

        })
    }


    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h3 className="text-3xl mb-5">My Posts</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Post Title</th>
                            <th>Post Image</th>
                            
                            <th>Delete Product</th>
                          
                            
                        </tr>
                    </thead>
                    <tbody>


                  

                        {
                           manageProducts &&
                           manageProducts?.map((booking, i) => <tr key={booking._id}>
                                <th>{i + 1}</th>
                                <td>{booking.sellerName}</td>
                                <td>{booking.sellerEmail}</td>
                                <td>{booking.title}</td>
                                <td>

                                <div className="rounded w-24 h-15">
                        {
                         
                            
                            
                            <img src={booking?.img} alt="" />
                             
                          }
                    </div>

                                </td>
                               


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
                    message={`If you Delete Post. It cannot be undone.`}
                    successAction = {handleDeleteProduct}
                    successButtonName="Delete"
                    modalData = {deletingProduct}
                    closeModal = {closeModal}
                >
                </ConfirmationModal>
            }





{
                advertiseProduct && <ConfirmationModal
                    title={`Are you sure you want to Advertise ${advertiseProduct.title} Product?`}
                    message={`If you want to advertise Product ${advertiseProduct.title}. Click Advertise`}
                    successAction = {handleAdvertiseProduct}
                    successButtonName="Advertise"
                    modalData = {advertiseProduct}
                    closeModal = {closeModal}
                >
                </ConfirmationModal>
            }
        </div>
    );
};

export default ManageProducts;