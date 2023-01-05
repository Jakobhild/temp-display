import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function Log(props) {
    const [log, setLog] = useState();

    useEffect(() => {
        fetch(props.ip)
        .then((response) => response.json())
        .then((data) => {
          setLog(data);
        })
        .catch((err) => {
          console.log(err.message);
        })
    }, [])

    return(
        <h1>Hello</h1>
    )
}

export default Log;