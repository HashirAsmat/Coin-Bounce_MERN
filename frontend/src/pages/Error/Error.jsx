import React from 'react'
import { Link } from 'react-router-dom'
const Error = () => {
  return (
    <div style={{margin:"auto",width:'50%'}}>
        <h1 >Error 404- page not found </h1>
        <h4>Go Back <Link to='/'>Home</Link></h4>
    </div>
  )
}

export default Error;