import React from 'react';
import logo from './img/DOOD_Logo600.png';
import './App.css';


function renderlogo (condition){
  let result = ""
  if (condition === false){
   result =<img src={logo}/>
  }else{
    result = ""
  }

return(result)
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
   {renderlogo(false)}
       <p>Panel viewver admin</p>
      </header>
    </div>
  );
}

export default App;
