import { GoogleAuthProvider } from 'firebase/auth';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useState } from 'react';

import toast from 'react-hot-toast';

import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';



const GoogleLogin = () => {

    const { setUser, providerLogin, setLoading } = useContext(AuthContext);

    const { createUser, updateUser } = useContext(AuthContext);
    const [signUpError, setSignUPError] = useState('');
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken(createdUserEmail);
   

const value ='user';
   

    const location = useLocation();
    const navigate = useNavigate();

   
    const from = location.state?.from?.pathname || '/';

    if (token) {
        navigate(from, { replace: true });
    }

    const googleProvider = new GoogleAuthProvider();

    const handleGoogleSignIn = (event) => {
        event.preventDefault();
        providerLogin(googleProvider)
            .then(result => {
                const user = result.user;
                event.preventDefault();
                toast('User Created Successfully.')
                const currentUser = {
                    email: user.email
                }
                
                console.log(user);


                toast('User Created Successfully.')
                const userInfo = {
                    displayName: user.name
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(user.name, user.email, value);

                        console.log(user.name);
                        console.log(user.email);
                         console.log(value);

                    })
                    .catch(err => console.log(err));
            })
            .catch(error => {
                console.log(error)
                setSignUPError(error.message)



                           })
    }
    
    const saveUser = (name, email, role) =>{
        const user ={name, email, role};
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data =>{
            setCreatedUserEmail(email);
        })
    }



    return (
        <div>
            <button onClick={handleGoogleSignIn} className="btn btn-outline w-full">Sign Up with Google</button>
        </div>
    );
};

export default GoogleLogin;