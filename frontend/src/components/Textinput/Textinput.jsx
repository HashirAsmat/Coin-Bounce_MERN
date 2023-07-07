import React from 'react'
import './textinput.css';
function Textinput(props) {
  return (
    <div className='textInputWrapper'>
        <input {...props}/>
        {props.error && <p className='errorMessage'>{props.errormessage} </p>}
    </div>
  )
}
 
export default Textinput