import React, { Component } from 'react'

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {ifcorrect: false};
  }
 postlogin(login,password){
  fetch('http://public.valjang.fr:5000/user/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstParam: login,
      secondParam: password,
    })
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
    
}
 registreorlogin(e){
if(e == false){
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
    <input type="password" name="password" />
  </label>
  <br></br>
  <input type="submit" value="Envoyer" />

</form>
<br></br>
      </header>
    </div>
  );
}else{
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
    <input type="password" name="password" />
  </label>

  <label>
  <br></br>
    Mail:
    <input type="text" name="password" />
  </label>
  <br></br>

  <input type="submit" value="Valider" />*
  
</form>
      </header>
    </div>
  );
}
}

}
function login() {
 
  return (
    <div className="App">
   {this.registreorlogin(false)}
    </div>
  );
}

export default login;
