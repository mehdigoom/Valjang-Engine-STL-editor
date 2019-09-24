import React from 'react';
import logo from './img/DOOD_Logo600.png';
import './App.css';



function login() {
  let iflogin = false
  return (
    <div className="App">
      <header className="App-header">
      <form>
  <label>
    Login :
    <input type="text" name="Login" />
  </label>
  <br></br>
  <label>
    password :
    <input type="text" name="password" />
  </label>
  <br></br>
  <input type="submit" value="Envoyer" />
</form>
      </header>
    </div>
  );
}

export default login;
