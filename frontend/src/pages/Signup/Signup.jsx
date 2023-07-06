import React from 'react';
import './Signup.css';
import Textinput from '../../components/Textinput/Textinput';
import { useFormik } from 'formik';
import SignupSchema from '../../schemas/SignupSchema';
import {setUser} from'../../store/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signup } from '../../api/internal';

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error,setError] = useState('');
    //time:7:35:00 -> handleSignup
   const handleSignup = async ()=>{
    console.log("Signup clicked")
    const data = {
        name:values.name,
        username:values.username,
        password:values.password,
        confirmPassword:values.confirmPassword,
        email:values.email,
    }
    const response = await signup(data);
    if (response.status === 201){
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
    else if ( response.code ==='ERR_BAD_REQUEST'){
    setError(response.response.data.errorMessage);
    }
   } //handleSignup ends here

    const {values,touched,handleBlur,handleChange,errors} = useFormik({
        initialValues:{
            name:'',
            email:'',
            username:'',
            password:'',
            confirmPassword:'',
        },
        validationSchema:SignupSchema
    });
  return (
    <div className='signupWrapper'>
        <div className="signupHeader">
            Create an Account
        </div>
        {/* time:6:30:00 */}
        <Textinput  type='text' value={values.name} name='name' onBlur={handleBlur} onChange={handleChange} placeholder='name' error={errors.name && touched.name?1:undefined} errormessage={errors.name} />
        <Textinput  type='text' value={values.username} name='username' onBlur={handleBlur} onChange={handleChange} placeholder='username' error={errors.username && touched.username?1:undefined} errormessage={errors.username} />
        <Textinput  type='text' value={values.email} name='email' onBlur={handleBlur} onChange={handleChange} placeholder='email' error={errors.email && touched.email?1:undefined} errormessage={errors.email} />
        <Textinput  type='password' value={values.password} name='password' onBlur={handleBlur} onChange={handleChange} placeholder='password' error={errors.password && touched.password?1:undefined} errormessage={errors.password} />
        <Textinput  type='password' value={values.confirmPassword} name='confirmPassword' onBlur={handleBlur} onChange={handleChange} placeholder='confirmPassword' error={errors.confirmPassword && touched.confirmPassword?1:undefined} errormessage={errors.confirmPassword} />
        <button className='signupbutton' onClick={handleSignup}>Sign Up</button>
        <span>Already have an Account? <button className='createAccount' onClick={()=>navigate('/log-in')}>Log In</button></span>
        {error !== ''?<p style={{color:'red',fontFamily:'sans-serif'}}>{error}</p>:""}
    </div>
  )
}
export default Signup;

