
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';



const AddProducts = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [selectedDate, setSelectedDate] = useState(new Date().getTime());


    
    const { user } = useContext(AuthContext);
    
    const imageHostKey = import.meta.env.VITE_imgbb_key;

    const navigate = useNavigate();
    
   console.log(user);

    const handleAddProduct = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgData => {
            if(imgData.success){
                console.log(imgData.data.url);

      
                const productNew = {
                    categoryName: data.categoryName,
                    productId: data.productId,
                    
                    sellerEmail: user?.email,
                    sellerName: user?.displayName,
                    
                    title: data.title,
                    img: imgData.data.url,
                  
                    likeValue: 0,
                    location: data.location,
                    originalPrice: data.originalPrice,
                    resalePrice: data.resalePrice,
                    yearsOfUse: data.yearsOfUse,
                    postedTime: selectedDate,
                    sellerMobileNumber: data.sellerMobileNumber,
                    YearOfPurchase: data.YearOfPurchase,  
                    conditionType: data.conditionType,
                    description: data.description
                }

                // save Products information to the database
                fetch('social-media-world-server-nuhwx57e6-nazmulhasan8s-projects.vercel.app/allProducts', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json', 
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(productNew)
                })
                .then(res => res.json())
                .then(result =>{
                    console.log(result);
                    toast.success(`New Post is added successfully`);
                    navigate('/SAMSUNG')
                })
            }
        })
    }

   

  

    return (
        <div className='h-[500px] flex justify-center items-center'>
            
        <div className='w-96 p-7'>
        <p className="text-4xl text-orange-600 pb-16"> SAMSUNG BOOK</p>
        
            <h2 className="text-3xl">Add A Post</h2>
            <form onSubmit={handleSubmit(handleAddProduct)}>

            <div className="form-control w-full max-w-xs hidden">
                    <label className="label"> <span className="label-text">Category Name</span></label>
                    <select 
                    {...register('categoryName')}
                    className="select input-bordered w-full max-w-xs">
                       <option>SAMSUNG</option>
                      
                    </select>
                </div>

              

                
        
              
            {/* here */}
                <div className="form-control w-full max-w-xs hidden">
                    <label className="label"> <span className="label-text">Posted Time</span></label>
                    <input type="text" defaultValue={selectedDate} disabled {...register("selectedDate", {
                        
                    })} className="input input-bordered w-full max-w-xs" />
                    {errors.postedTime && <p className='text-red-500'>{errors.postedTime.message}</p>}
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Title</span></label>
                    <input type="text" {...register("title", {
                        required: "Required"
                    })} className="input input-bordered w-full max-w-xs" />
                    {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
                </div>


                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Description</span></label>
                    <textarea type="text" {...register("description", {
                        required: "Required"
                    })} className="input input-bordered w-full max-w-xs" />
                    {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
                </div>

            


              

            
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Photo</span></label>
                    <input type="file" {...register("image", {
                        required: "Photo is Required"
                    })} className="input input-bordered w-full max-w-xs" />
                    {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                </div>
                {user?.email && <input className='btn btn-accent w-80 my-4' value="Add Post" type="submit" />}
            </form>
        </div>
        </div>
    );
};


export default AddProducts;