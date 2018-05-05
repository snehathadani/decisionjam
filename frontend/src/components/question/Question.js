import React from 'react';
import "./Question.css";

const Question = () => {
    return(
        <div>
            <div>
                <label> Question or decision </label>   
                <input type = "text"/>
            </div>    
            <button> Create Question </button>
        </div>
    )
};

export default Question;