
import React from 'react'
import { useState,useEffect } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { getAllBlogs } from '../../api/internal';
import './Blog.css';
import { useNavigate } from 'react-router-dom';
function Blog() {
  const navigate = useNavigate();
    const [Blogs,setBlogs] = useState([]);
    const [loaded,setLoaded] = useState(false);

useEffect(()=>{   
 setLoaded(false);   
(async function getAllBlogsApiCall(){
try{    
const response = await getAllBlogs();
if(response.status === 200){
    setLoaded(true);
    setBlogs(response.data.blogs);
}
}   
catch(error){
console.log(error);
}
})();
setBlogs([]); // this is use to reset the blog state to zero when leave this page.
},[]);

  return (
   <div className="container">
   {loaded?<>
   {Blogs.map((blog)=>{
    return(
      <> 
      <div className="blog">
        <div id={blog._id} className='blog-div' onClick={()=>navigate(`/blog/${blog._id}`)}>
            <h2 className='title'>{blog.title}</h2>
            <img  src={blog.photo} alt="" />
            <p className='content'>{blog.content}</p>
        </div>
        </div>
        </>
    )
   })}
   </> : <><TailSpin height={80} width={80} radius={1} color={'#800080'} /></>}
   </div>
  )
}

export default Blog;