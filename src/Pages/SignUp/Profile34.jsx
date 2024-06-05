
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';

const Profile34 = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser, user } = useContext(AuthContext);
    const [signUpError, setSignUPError] = useState('');
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();
    const location = useLocation();

    

    const from = location.state?.from?.pathname || '/';

    if (token) {
        navigate(from, { replace: true });
    }

    const handleSignUp = (data) => {
        setSignUPError('');
       console.log(data);
                const userInfo = {
                    displayName: data.name,
                    

                }
                updateUser(userInfo)
                    .then(() => {
                        toast('User Updated Successfully.');
                       
                    })
            .catch(error => {
                console.log(error)
                setSignUPError(error.message)
            });
    }

    return (
        <div className='h-[800px] flex justify-center items-center'>
        <div className='w-96 p-7'>
            <h2 className='text-xl text-center'>{user?.displayName} Information</h2>
            <form onSubmit={handleSubmit(handleSignUp)}>


            <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Email</span></label>
                    <input type="email" defaultValue={user?.email} {...register("email", {
                        required: true
                    })} className="input input-bordered w-full max-w-xs" />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Name</span></label>
                    <input type="text" defaultValue={user?.displayName} {...register("name", {
                        required: "Name is Required"
                    })} className="input input-bordered w-full max-w-xs" />
                    {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                </div>

                

              

              

                <input className='btn btn-accent w-80 my-4' value="Edit" type="submit" />
                {signUpError && <p className='text-red-600'>{signUpError}</p>}
            </form>
           

        </div>
    </div>
    );
};

export default Profile34;