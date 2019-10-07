import React, { Component } from 'react'

class Form extends Component {
  constructor(props) {
    super(props);
    //global informations for codes
    this.state = {
      //if is correct = User connected
      ifcorrect: false,
      title:'',
      render : 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //send Login and password to backend
  handleSubmit(login,password){
  fetch('http://public.valjang.fr:5000/user/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'email': login,
      'password': password,
    })
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
    
}

handleChange(event) { this.setState({title: event.target.value})}

}


function login() {
 
  return (
    <div className="App">
       
       <header className="App-header">
      <form onSubmit={this.handleSubmit}>
  <label>
    Login :
    <input type="text" name="title" value={this.state.title} onChange={this.handleChange.bind(this)}  />
  </label>
  <br></br>
  <label>
    password :
    <input type="password" name="password" />
  </label>

  <br></br>

  <input type="submit" value="Valider" />
  
</form>
      </header>
    </div>
    
  );
}

export default login;
