import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


// Image
import image from "../assets/Image1.png"
import title from "../assets/LogoWebsite.png";

// Icon
import { MdErrorOutline } from "react-icons/md";




const SignUpSection = () => {

    let [fName, setFName] = useState('')
    let [nameErr, setNameErr] = useState('')
    let [lName, setLName] = useState('')
    let [lNameErr, setLNameErr] = useState('')
    let [email, setEmail] = useState('')
    let [emailErr, setEmailErr] = useState('')
    let [passWord, setPassWord] = useState('')
    let [passWordErr, setPassWordErr] = useState('')
    let navigate = useNavigate()
    const auth = getAuth();

    let handleSignUp = (e) => {
        e.preventDefault();
        if (!fName) {
            setNameErr('Please Input Your First Name')
        }
        if (!lName) {
            setLNameErr('Please Input Your Last Name')
        }

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
    }



    let handleFName = (e) => {
        setFName(e.target.value)
        setNameErr('')
    }
    let handleLName = (e) => {
        setLName(e.target.value)
        setLNameErr('')
    }
    let handleEmail = (e) => {
        setEmail(e.target.value)
        setEmailErr('')
    }
    let handlePass = (e) => {
        setPassWord(e.target.value)
        setPassWordErr('')
    }

    
    createUserWithEmailAndPassword(auth, email, passWord)
        .then(() => {
            setTimeout(() => {
                navigate('/login')
            },2000)
        })
        .catch((error) => {
            const errorCode = error.code;
            if(errorCode.includes('auth/email-already-in-use')) {
                setEmailErr('This Email Already Used')
            }
            
        });


    return (
        <>

            <section>
                <div className="container">
                    <div className='flex items-center flex-wrap gap-10'>
                        <div className='md:basis-[55%] relative'>
                            <img className='absolute top-10 left-10' src={title} alt="" />
                            <img className='w-full h-[700px]' src={image} alt="" />
                        </div>
                        <div className='md:basis-[40%] flex flex-col gap-3'>
                            <h1 className='flex items-center gap-2 text-[45px] font-bold font-serif'>Create New Account</h1>
                            <p className='text-slate-500'>Please enter details</p>
                            <form className='flex flex-col gap-3'>
                                <div className='flex flex-col'>
                                    <label htmlFor="name">First Name</label>
                                    <input onChange={handleFName} className='border-2 border-slate-300 px-2 py-2 rounded-md outline-none borderHover' type="text" placeholder='Tanvir' />
                                    {nameErr &&
                                        <p className='flex items-center gap-1'><span className='text-red-500'><MdErrorOutline /></span> {nameErr}</p>
                                    }
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="name">Last Name</label>
                                    <input onChange={handleLName} className='border-2 border-slate-300 px-2 py-2 rounded-md outline-none borderHover' type="text" placeholder='Khan' />
                                    {lNameErr &&
                                        <p className='flex items-center gap-1'><span className='text-red-500'><MdErrorOutline /></span> {lNameErr}</p>
                                    }
                                </div>
                                <div className='flex  flex-col'>
                                    <label htmlFor="email">Email Address</label>
                                    <input onChange={handleEmail} className='border-2 border-slate-300 px-2 py-2 rounded-md outline-none borderHover' type="email" placeholder='abcd@gmail.com' />
                                    {emailErr &&
                                        <p className='flex items-center gap-1'><span className='text-red-500'><MdErrorOutline /></span> {emailErr}</p>
                                    }
                                </div>
                                <div className='flex  flex-col'>
                                    <label htmlFor="password">Password</label>
                                    <input onChange={handlePass} className='border-2 border-slate-300 px-2 py-2 rounded-md outline-none borderHover' type="password" />
                                    {passWordErr &&
                                        <p className='flex items-center gap-1'><span className='text-red-500'><MdErrorOutline /></span> {passWordErr}</p>
                                    }
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='flex items-center gap-2'>
                                        <input type="checkbox" id='pass' />
                                        <label for='pass'>I agree to the <span>Terms & Conditions</span></label>
                                    </div>
                                </div>
                                <button onClick={handleSignUp} className='border-black border-2 rounded-md py-2 text-[20px] font-semibold btnHover'>SignUp</button>
                            </form>
                            <p>If You Have Already an Account.  <span className='font-semibold border-b-2 border-slate-600'><Link to="/login"> LogIn</Link></span></p>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default SignUpSection;