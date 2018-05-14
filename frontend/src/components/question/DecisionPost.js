import React from 'react';

const DecisionPost = ({match}) => (
    <div>
        <p> Decision code is {match.params.id} </p> 
    </div>
);

export default DecisionPost;
