import React, { useContext, useEffect, useRef} from 'react'
import './App.css'
import gptLogo from './assets/chatgpt.svg'
import addBtn from './assets/add-30.png'
import msgIcon from './assets/message.svg'
import home from './assets/home.svg'
import saved from './assets/bookmark.svg'
import rocket from './assets/rocket.svg'
import sendBtn from './assets/send.svg'
import userIcon from './assets/user-icon.png'
import gptImgLogo from './assets/chatgptLogo.svg'
import { Context } from './context/Context'
import run from './config/gemini'

function App() {
  
  const msgend=useRef(null);
  const {input,setInput,onSent,messages,setMessages}=useContext(Context);
  useEffect(()=>{
    msgend.current.scrollIntoView();
  },[messages])
  const handleEnter = async(e)=>{
    if(e.key==='Enter') await onSent();
  }
  const handleQuery= async(e)=>{
        const text= e.target.value;
        setMessages([...messages,{text,isBot: false}])
       const res=await run(text);
       setMessages([...messages,{ text, isBot: false},
        {text: res, isBot: true}
       ])
  }
  return (
    <div className="App">
      <div className="sidebar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptLogo} alt="" className="logo" />
            <span className='brand'>ChatGPT</span>
          </div>
          <button className='midBtn' onClick={()=>window.location.reload()}>
              <img className='addBtn' src={addBtn} alt="" />New Chat
          </button>
          <div className="upperSideBottom">
              <button onClick={handleQuery} className="query" value={"What is programming?"}><img src={msgIcon} alt="" />What is Programming ?</button>
              <button onClick={handleQuery} className="query" value={"How to use an API?"}><img src={msgIcon} alt="" />How to use an API ?</button>
          </div>
        </div>
        <div className="lowerSide">
            <div className="listItems">
              <img src={home} alt="" className='listitemsImg'/>Home
            </div>
            <div className="listItems">
              <img src={saved} alt="" className='listitemsImg'/>Saved
            </div>
            <div className="listItems">
              <img src={rocket} alt="" className='listitemsImg'/>Upgrade to pro
            </div>
        </div>
        </div>
      <div className="main">
          <div className="chats">
            {messages.map((message,i)=>
              <div key={i} className={message.isBot?"chat bot":"chat"}>
                <img className='chatImg'src={message.isBot?gptImgLogo:userIcon} alt="" /><p className='txt'>{message.text}</p>
            </div>
            )}
            <div ref={msgend} />
            </div>
          <div className="chatFooter">
            <div className="inp">
              <input onKeyDown={handleEnter} onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Send a message' /><button onClick={onSent} className="send"><img src={sendBtn} alt="" /></button>
            </div>
            <p>ChatGPT may produce inaccurate information about people, places or facts. ChatGPT June 20 version</p>
          </div>
        </div>
      </div>
  )
}

export default App