import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBlogById, deleteBlog, postComment, getCommentsById } from '../../api/internal';
import { useNavigate } from 'react-router-dom';
import CommentsList from '../../components/CommentsList/CommentsList';
import './BlogDetails.css';
function BlogDetails() {
  const [blog, setBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const [ownsBlog, setOwnsBlog] = useState([]);
  const [newComment, setNewComment] = useState([]);
  const [reload, setReload] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const blogId = params.id;
  const username = useSelector((state) => { return (state.user.username) });
  const userId = useSelector(state => state.user._id);
  useEffect(() => {
    async function getBlogDetails() {
      const commentResponse = await getCommentsById(blogId);

      if (commentResponse.status === 200) {
        setComments(commentResponse.data.data);
      }

      const blogResponse = await getBlogById(blogId);
      if (blogResponse.status === 200) {
        //set owner-ship
        setOwnsBlog(username === blogResponse.data.blog.authorUserName)
        setBlogs(blogResponse.data.blog);
      }
    }
    getBlogDetails();
  }, [reload]); //10:16:00
  const postCommentHandler = async () => {
    const data = {
      author: userId,
      blog: blogId,
      content: newComment
    }
    const response = await postComment(data);
    console.log()
    if (response.status === 201) {
      setNewComment('');
      setReload(!reload);
    }
  }
  const deleteBlogHandler = async () => {
    const response = await deleteBlog(blogId);
    if (response.status === 200) {
      navigate('/');
    }
  }
  return (
    <>
      <div className="detailswrapper">
        <div className='left'>
          <h1 className="title">{blog.title}</h1>
          <div className='meta'>
            <p>@{blog.authorName + '  on  ' + ' ' + new Date(blog.createdAt).toDateString()}</p>
          </div>
          <div className='photo'>
            <img src={blog.photo} alt="" width={250} height={250} />
          </div>
          <p className='content'>{blog.content}</p>
          {ownsBlog && (
            <div className="controls">
              <button className='editbutton' onClick={() => {navigate(`/blog-update/${blog._id}`)}}>Edit</button>
              <button className='deletebutton' onClick={deleteBlogHandler}>Delete</button>
            </div>
          )}
        </div>
        <div className='right'>
          <div className='commentsWrapper'>
            <CommentsList comments={comments}/>
            <div className="postComment">
              <input className='commentinput' placeholder='Comments goes here ...' value={newComment} onChange={(e) => { setNewComment(e.target.value) }} />
              <button className='postCommentButton' onClick={postCommentHandler}>post</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogDetails