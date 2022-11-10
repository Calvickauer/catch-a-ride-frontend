import React, { useState, useEffect } from 'react';
import axios from 'axios';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;



function Messages(props) { 
    console.log('MESSAGE ARRAY', props.arr)


let messageBoard = props.arr.map((m, idx) => {
        return (
            <div key={idx}>
                <h4>
                    {m.title}
                </h4>
                <p>
                    {m.content}
                </p>
            </div>
        )
    })

    console.log('BEFORE', messageBoard);

    if (messageBoard.length) {
        let messageBoard = <p>'No Messages'</p>
    }

    console.log('AFTER', messageBoard);
  
    return (
        
        <div>
            <h3>Messages:</h3>
            
    {/* {messageBoard} */}
        </div>
        
    ) 
}


export default Messages;