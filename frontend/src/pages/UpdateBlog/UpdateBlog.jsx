import React from 'react';
import { useState ,useEffect } from 'react';
import './UpdateBlog.css';
import {getBlogById, updateBlog}  from '../../api/internal';
import { useSelector } from 'react-redux';
import Textinput from '../../components/Textinput/Textinput';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateBlog() {
    const navigate = useNavigate();
    const params = useParams();
    const blogId = params.id;
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [photo,setPhoto] = useState('');
    useEffect(()=>{
        async function getBlogDetails() {
            const Response = await getBlogById(blogId);
            if (Response.status === 200) {
             setTitle(Response.data.blog.title);
             setContent(Response.data.blog.content);
             setPhoto(Response.data.blog.photo);
            }  
          }
          getBlogDetails();
    },[]);
    const getPhoto = (e)=>{
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = ()=>{
            setPhoto(reader.result);
        }};

    const author = useSelector((state)=>{return(state.user._id)});
    const updateHandler = async ()=>{
        //11:11:00
        let data;
        if(photo.includes('http')){
             data ={
                author,
                content,
                title,
                blogId}}
        else{
            data = {
            author,
            content,
            photo,
            title,
            blogId}}
         const response =  await updateBlog(data);
         if (response.status === 200){
             navigate('/');
         }
    }

  return (
    <div className="Wrapper">
    <div className='header'>Edit your Blog
    </div>
    <Textinput type='text' name='title' placeholder='title' value={title} onChange={(e)=>{setTitle(e.target.value)}} style={{width:'90%'}}/>
    <div className='content'><textarea placeholder='text goes here' maxLength={600} value={content} onChange={(e)=>{setContent(e.target.value)}} /></div>
    <div className="photoPrompt">
        <p>Choose a photo</p>
        <input type='file' name='photo' id='photo' accept='image/jpg,image/jpeg,image/png' onChange={getPhoto}/>
        {<img src={photo} width={150} height={150} alt={''}/> }
    </div>
    <button className='btn btn-primary mt-3'onClick={updateHandler}>Update</button>
 </div>
  )
}

export default UpdateBlog;