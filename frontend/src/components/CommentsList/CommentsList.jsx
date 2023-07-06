import React from 'react'
import Comment from '../Comment/Comment'
import './CommentsList.css'
//time 10:21:00
function CommentsList({comments}) {
  return (
  <>
<div className="commentListWrapper">
{comments.length === 0 ? <> 
<div className="noComments"> No Comments Posted</div></> : 
<>{comments.map((comment)=>{
return (<Comment key={comment._id} comment={comment}/>)
})}</>}
  </div>
  </>
  )
}

export default CommentsList