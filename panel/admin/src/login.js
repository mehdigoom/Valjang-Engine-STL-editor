import React from 'react';
import logo from './img/DOOD_Logo600.png';
import './App.css';

loginProsses(login,password){
  const options = {
    method: 'POST',
    url: '----API url------',
    headers: {
  Authorization: "Basic " + new Buffer("---API credentials---").toString("base64")
    },
    body: {
       login,
       password,
    }
    json: true  // JSON stringifies the body automatically
  }
  
  request(options)
    .then(function (response) {
      // Handle success response data
    })
    .catch(function (err) {
      // Handle err response
    })
}

function login() {
 
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
