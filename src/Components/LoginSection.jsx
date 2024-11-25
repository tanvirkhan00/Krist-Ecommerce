import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";





// Image
import title from "../assets/LogoWebsite.png";
import image from "../assets/Image.png";

// Icons
import { FaEyeSlash, FaHandSparkles } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaRegEye } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { clientAccount } from './Slice/productSlice';





const LoginSection = () => {

    let [email, setEmail] = useState('')
    let [emailErr, setEmailErr] = useState('')
    let [passWord, setPassWord] = useState('')
    let [passWordErr, setPassWordErr] = useState('')
    let [passShow, setPassShow] =useState(false)
    const auth = getAuth();
    let navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    let dispatch =useDispatch()



    let handleLogin = (e) => {
        e.preventDefault()
        if (!email) {
            setEmailErr('Please Input Your Email')
        } else {
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                setEmailErr('Please Input Valid Email Address')
            }
        }

        if (!passWord) {
            setPassWordErr('Please Input Password')
        } else {
            if (!/(?=.*[a-z])/.test(passWord)) {
                setPassWordErr("Must be one lowerCase")
            } else if (!/(?=.*[A-Z])/.test(passWord)) {
                setPassWordErr('Must contain at least one uppercase')
            } else if (!/(?=.*[0-9])/.test(passWord)) {
                setPassWordErr('Must contain at least one number')
            } else if (!/(?=.*[!@#$%^&*])/.test(passWord)) {
                setPassWordErr('Must contain at least one special character')
            } else if (!/(?=.{8,})/.test(passWord)) {
                setPassWordErr('Must at least 8 character')
            }
        }
        if (email && passWord && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            signInWithEmailAndPassword(auth, email, passWord)
                .then((user) => {
                    if(user.user.emailVerified === true){
                        setTimeout(() => {
                            navigate('/')
                        }, 2000)
                        dispatch(clientAccount(user.user))
                    } else {
                        setPassWordErr('Please verify your email')
                    }
                   
                })
                .catch((error) => {
                    const errorCode = error.code;
                    if (errorCode.includes('auth/invalid-credential')) {
                        setPassWordErr('Please Input Valid Credentials');
                    }
                });
        }
    }


    let handleEmail = (e) => {
        setEmail(e.target.value)
        setEmailErr('')
    }
    let handlePass = (e) => {
        setPassWord(e.target.value)
        setPassWordErr('')
    }
    let handleGoogle = (e) => {
        signInWithPopup(auth, provider)
        .then(() => {
            navigate('/');
            
        }).catch((error) => {
            const errorCode = error.code;
        });
    }
    let handleEye =() =>{
        setPassShow(!passShow) 
    }

    return (
        <>
            <section>
                <div className="container">
                    <div className='flex items-center flex-wrap gap-10'>
                        <div className='md:basis-[60%] relative'>
                            <img className='absolute top-10 left-10' src={title} alt="" />
                            <img className='w-full h-[700px]' src={image} alt="" />
                        </div>
                        <div className='md:basis-[30%] flex flex-col gap-3'>
                            <h1 className='flex items-center gap-2 text-[45px] font-bold font-serif'>Welcome <span className='text-yellow-400'><FaHandSparkles /></span></h1>
                            <p className='text-slate-500'>Please login here</p>
                            <form className='flex flex-col gap-3'>
                                <div className='flex flex-col'>
                                    <label htmlFor="email">Email Address</label>
                                    <input onChange={handleEmail} className='border-2 border-slate-300 px-2 py-2 rounded-md outline-none borderHover' type="email" placeholder='abje@gmail.com' />
                                    {emailErr &&
                                        <p className='flex items-center gap-1'><span className='text-red-500'><MdErrorOutline /></span> {emailErr}</p>
                                    }
                                </div>
                                <div className='flex  flex-col relative'>
                                    <label htmlFor="pass">Password</label>
                                    <input onChange={handlePass} className='border-2 border-slate-300 px-2 py-2 rounded-md outline-none borderHover' type={passShow ? 'text' : 'password'} />
                                    <span onClick={handleEye} className='absolute right-3 top-10 '>{passShow ? <FaEyeSlash/> :  <FaRegEye/>
                                     }</span>

                                    {passWordErr &&
                                        <p className='flex items-center gap-1'><span className='text-red-500'><MdErrorOutline /></span> {passWordErr}</p>
                                    }
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='flex items-center gap-2'>
                                        <input type="checkbox" id='pass' />
                                        <label for='pass'>Remember Me</label>
                                    </div>
                                    <p>Forget Password?</p>
                                </div>
                                <button onClick={handleLogin} className='border-black border-2 rounded-md py-2 text-[20px] font-semibold btnHover'>Login</button>
                            </form>
                            <p>If You Haven't Account.  <span className='font-semibold border-b-2 border-slate-600'><Link to="/signUp"> SignUp</Link></span></p>
                            <p onClick={handleGoogle} className='flex items-center gap-2 justify-center border-2 border-slate-500 py-2 rounded-md btnHover'>Login with Google <span><FcGoogle /></span></p>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default LoginSection;