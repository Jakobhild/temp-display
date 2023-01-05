import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Log from './Log.js'

function App(){
  const [ app, setApp ] = useState(true)
  const [ ip, setIp] = useState("192.168.1.204:5000")
  const [ name, setName ] = useState("Jakobs rum")

  return (<>
  <button style={{margin: "3px", backgroundColor: "#03a9F4", height: "30px", color: "white", border: "transparent", borderRadius: "10px"}}
    onClick={() => {setIp('http://192.168.1.203:5000'); setName('Jakobs rum')}}>Jakobs rum</button>
  <div className="App">
  <header className="App-header">
  <button style={{margin: "3px", backgroundColor: "#03a9F4", height: "30px", color: "white", border: "transparent", borderRadius: "10px"}} 
          onClick={() => {app ? setApp(false) : setApp(true)}}> 
    {app ? "Log" : "Show temp"} 
  </button>
  {app ? <BaseApp name={name} ip={ip} /> : <Log />}
  </header>
  </div>
  </>)
}


function BaseApp(props) {
  const [temp, setTemp] = useState({current: 0, stats: {top24:0, bottom24: 0, top7:0, bottom7:0}});

  useEffect(() => {
    setTimeout(() => {
      fetch(props.ip)
        .then((response) => response.json())
        .then((data) => {
          setTemp(data);
        })
        .catch((err) => {
          console.log(err.message);
        })
    }, 1000)
  });

  const reset = () => {
    fetch(props.ip + '/reset')
  }

  return (<>
        <h1>
          {props.name}s temperatur: {temp.current} °C
        </h1>
	<p>
	  Sedan reset: {temp.stats.top24}/{temp.stats.bottom24}
	  <button
            style={{margin: "3px", backgroundColor: "#03a9F4", height: "30px", color: "white", border: "transparent", borderRadius: "10px"}}
            onClick={() => {reset()}}>
          Reset
          </button><br />
	  Under veckan: {temp.stats.top7}/{temp.stats.bottom7}
	</p></>
  );
}

export default App;
