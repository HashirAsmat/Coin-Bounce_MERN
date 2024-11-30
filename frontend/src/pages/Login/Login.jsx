import React from 'react';
import './Login.css';
import Textinput from '../../components/Textinput/Textinput';
import { useFormik } from 'formik';
import loginSchema from '../../schemas/LoginSchema';
import { login } from '../../api/internal';
import {setUser} from'../../store/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error,setError] = useState('');
    //time:6:50:00 -> handleLogin
   const handleLogin = async ()=>{
    console.log("login clicked")
    const data = {
        username:values.username,
        password:values.password
    }
    const response = await login(data);
    if (response.status === 200){
        // 1. setUser
        const user = {
            _id:response.data.user._id,
            email:response.data.user.email,
            username:response.data.user.username,
            auth:response.data.auth
        }
        dispatch(setUser(user)); 
        // 2. redirect -> homePage
        navigate('/')
    } 
    // console.log(response.code);
    // console.log(response.response.data.message);
    //setError(response.response.data.message);
     if ( response.code ==='ERR_BAD_REQUEST' || response.code ==='ERR_BAD_RESPONSE' ){
      setError(response.response.data.message);
    }
   }
    const {values,touched,handleBlur,handleChange,errors} = useFormik({
        initialValues:{
            username:'',
            password:'',
        },
        validationSchema:loginSchema
    });
  return (
    <div className='loginWrapper'>
        <div className="loginHeader">
            Log in to your account
        </div>
        {/* time:6:30:00 */}
        <Textinput  type='text' value={values.username} name='username' onBlur={handleBlur} onChange={handleChange} placeholder='username' error={errors.username && touched.username?1:undefined} errormessage={errors.username} />
        <Textinput  type='text' value={values.password} name='password' onBlur={handleBlur} onChange={handleChange} placeholder='password' error={errors.password && touched.password?1:undefined} errormessage={errors.password} />
        <button className='loginButton' onClick={handleLogin}>Log In</button>
        <span>
        Don't have an account? <button className='createAccount' onClick={()=>navigate('/sign-up')}>Register</button>
        </span>
        {error !== ''?<p style={{color:'red',fontFamily:'sans-serif'}}>{error}</p>:""}
    </div>
  )
}
export default Login;




////////formik (npm i formik) for frontend form validation in react --> 6:32:30//////

//Formik is a small library that helps you with the 3 most annoying parts:
//Getting values in and out of form state
//Validation and error messages
//Handling form submission
