import React from 'react'

const Message = () => {
  return (
    <div className="message owner">
      <div className="messageInfo">
      <img src="https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png?20200924235321" alt="img" />
      <span>Just now</span>
      </div>
      <div className="messageContent">
        <p>hello</p>
        <img src="https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png?20200924235321" alt="img" />
      </div>
    </div>
  )
}

export default Message