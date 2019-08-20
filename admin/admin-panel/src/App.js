import React from 'react';
import logo from './logo.svg';
import './App.css';




function App() {
  return (

    <div className="App">
    <header>
    <p>panel admin</p>
    </header>
     
 
     
     <form>
  <label>
    Login:
    <input type="text" name="name" />
    Password :
    <input type="password" name="Password" />
  </label>
  <input type="submit" value="Envoyer" />
</form>




    </div>
    
  );
}

export default App;
