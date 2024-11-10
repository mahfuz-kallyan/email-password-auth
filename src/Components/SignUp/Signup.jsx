import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase.init';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    const [showPass, setShowPass] = useState(false)

    const handleSignUp = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const terms = e.target.terms.checked;

        //   reset error status
        setError('');
        setSuccess(false);

        if (password.length < 6) {
            setError('Password should be 6 characters or longer')
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!passwordRegex.test(password)) {
            setError('password doest not meet requirements')
            return;
        }

        if(!terms){
            setError('Please accept our terms and conditions');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess(true)

                // send verification code
                sendEmailVerification(auth.currentUser)
                .then(()=> {
                    console.log('verification code send');
                })

                // update profile information
                const profile ={
                    displayName: name,
                    photoURL: photo,
                }

                updateProfile(auth.currentUser, profile)
                .then(()=>{
                    console.log('user profile updated');  
                })
                .catch(error=> console.log(error, 'user not found')
                )
            })
            .catch(error => {
                setError(error.message)
                setSuccess(false)
            })
    }
    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto my-8">
            <h3 className="text-3xl ml-4 font-bold">Sign Up now!</h3>
            <form onSubmit={handleSignUp} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="name" name='name' className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo URL</span>
                    </label>
                    <input type="text" placeholder="URL" name='photo' className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="email" name='email' className="input input-bordered" required />
                </div>
                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type={showPass ? 'text' : 'password'}
                        name='password'
                        placeholder="password" className="input input-bordered" required />
                    <button onClick={() => setShowPass(!showPass)}
                        className='btn btn-xs absolute right-3 top-12'>
                        {
                            showPass ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                        }
                    </button>
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label justify-start cursor-pointer">
                        <input type="checkbox" name='terms' className="checkbox" />
                        <span className="label-text ml-2">Accept our terms and condition.</span>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Sign Up</button>
                </div>
            </form>
            {
                error && <p className='text-red-600'>{error}</p>
            }
            {
                success && <p className='text-green-500'> Sign Up Successful.</p>
            }
            <p className='m-2'> Already have an account? please <Link to="/login"><span className='text-blue-600 font-bold'>Log In</span></Link> </p>
        </div>
    );
};

export default Signup;