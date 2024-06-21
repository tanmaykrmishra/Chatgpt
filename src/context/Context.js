import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context= createContext();
const ContextProvider= (props)=>{
    const[input,setInput]=useState('');
    const [messages,setMessages]= useState([
        {
            text: 'Hi I am ChatGPT, a state-of-the-art language model developed by OpenAI. I am designed to understand and generate human like response',
            isBot: true,
        },
    ]);


    const onSent= async (prompt)=>{
        const text= input;
        setInput('');
        setMessages([...messages,{text,isBot: false}])
       const res=await run(text);
       setMessages([...messages,{ text, isBot: false},
        {text: res, isBot: true}
       ])
       
    }
    
    const contextValue={
        onSent,
        input,setInput,messages,setMessages
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider