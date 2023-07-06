import React from 'react';
import { useState } from 'react';
import './SubmitBlog.css';
import {submitBlog}  from '../../api/internal';
import { useSelector } from 'react-redux';
import Textinput from '../../components/Textinput/Textinput';
import { useNavigate } from 'react-router-dom';

function SubmitBlog() {
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [photo,setPhoto] = useState('');
    const author = useSelector(state => state.user._id);
    const navigate = useNavigate();

    const getPhoto = (e)=>{
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = ()=>{
            setPhoto(reader.result);
        } 
    };
    //9:31:00
    const submitHandler = async ()=>{
        const data ={
            author,
            content,
            photo,
            title
        };
         const response =  await submitBlog(data);
         if (response.status === 201){
             navigate('/');
         }
    }
  return (
 <div className="Wrapper">
    <div className='header'>Create a Blog
    </div>
    <Textinput type='text' name='title' placeholder='title' value={title} onChange={(e)=>{setTitle(e.target.value)}} style={{width:'90%'}}/>
    <div className='content'><textArea placeholder='your text goes here' maxLength={400} value={content} onChange={(e)=>{setContent(e.target.value)}} /></div>
    <div className="photoPrompt">
        <p>Choose a photo</p>
        <input type='file' name='photo' id='photo' accept='image/jpg,image/jpeg,image/png' onChange={getPhoto}/>
        {photo!==''? <img src={photo} width={150} height={150} alt={''}/> : ""}
    </div>
    <button className='btn btn-primary mt-3'onClick={submitHandler} disabled={title ==='' || content ==='' || photo === ''} >Submit</button>
 </div>
  )
  }

export default SubmitBlog;