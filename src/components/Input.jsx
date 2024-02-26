import React from 'react'
import Img from "../img/img.png"
const Input = () => {
  return (
    <div className="input">
      <input type="text" placeholder='Type something...' />
      <div className="send">
        <input type="file" id="file" style={{display: 'none'}} /> 
        <label htmlFor="file">
          <img src={Img} alt="attach" />
        </label>

        <button>Send</button>
      </div>
    </div>
  )
}

export default Input