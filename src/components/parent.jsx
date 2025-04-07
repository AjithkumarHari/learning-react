import React from 'react';
import Child from './child';

const Parent = () => {

    const data = {
        title: "This is the Child Component",
        description: "This is the description of the Child Component"
    }

    return (
        <div>
            <h1>This is the Parent Component</h1>
            <Child {...data} />
        </div>
    );
};

export default Parent;