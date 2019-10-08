import React, { Component } from 'react'
import  './App.css'

import logo from './img/DOOD_Logo600.png';
import panel from './panel';
import Async from 'react-async';
import { promises } from 'dns';

const loadUsers = () =>
  fetch("http://public.valjang.fr:5000/client")
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      Iflogin:false,
      client:"[no select]",
      token : "",
      ServerBackend: "http://public.valjang.fr:5000",
      DoodLogo :true,
      clientID:"0",
   
      login: '',
      password:'',
      message:'',
      
    }
    this.BDDGetclient = this.BDDGetclient.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangePa = this.handleChangePa.bind(this);
  
  }
//send Login and password to backend
handleSubmit = async () => {
 var result
 var message
  await fetch('http://public.valjang.fr:5000/user/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'email': this.state.login,
      'password': this.state.password,
    })
  })
  
    .then(function (response) {
        console.log(response);
        if (response.ok == true) {
          console.log(response.ok);
          result = response.ok
        }
        else {
          console.log(response.ok);
          result = response.ok
          message= "Err: Login incorrect"
        }
        
      })
    
    .catch(function (error) {
      console.log(error);
    });
   console.log(result)
   this.setState({ 
   Iflogin: result,
  message:message
    
  })

};

handleChange(event) { this.setState({ login: event.target.value })
console.log(this.state.login) };

handleChangePa(event) { 

  console.log("RESULTAT: "+this.handleSubmit)
  this.setState({ 
  password: event.target.value, 

  
})
console.log(this.state.password) };

login(){
  return (
    <div className="App">

      <header className="App-header">
        <form onSubmit={this.handleSubmit}>
          <label>
            Login :
      <input type="text" name="login" value={this.state.login}  onChange={this.handleChange}/>
          </label>
          <br></br>
          <label>
            password :
            
      <input type="password" name="password" value={this.state.password}  onChange={this.handleChangePa}/>
          </label>

          <br></br>

          <input class="favorite styled" type="button" name="Loginbtn" value="Login" onClick={this.handleSubmit }/>

        </form>
      </header>
    </div>

  );
}







  BDDGetclient(IDclient) {
    
    if (IDclient)
    return (
      <Async promiseFn={loadUsers}>
      {({ data, err, isLoading }) => {
        if (isLoading) return ("Please wait...")
        if (err) return `Backend Out :'( : ${err.message}`

        if (data){
        var client ="" 
        for (var i = 0; i < data.length; i++) {
          var Newdata = data[IDclient]
          if(client =="" ){
            client= Newdata["name"]
          
          }
        }
        
         
      }
      
          return (
            <div>
            
             {this.renderlogo(true)}
             
                    <p>Login to {client} Viewer</p>
                 <p>{this.state.message}</p>
                    {this.rendercondition() // rendu dynamique des pages
}
            </div>
          )
      }}
    </Async>
    )
}




  

 renderlogo (condition){
    let result = ""
    if (condition === true){
     result =<img src={logo} className="App-logo"/>
    }else{
      result = ""
    }
    
  return(result)
  }

rendercondition(){
  if(this.state.Iflogin == false){
    return(this.login())
  }else if(this.state.Iflogin == true){
    return(panel(this.state.IDclient,this.state.client,this.state.login))
  }else{
    return("Err: BackEnd: Invalid reponses: "+this.state.Iflogin)
  }
}


 
  render() {
  
    
   
    return (
 
      <div className="App">
      <header className="App-header">
    
      
      <p>{this.BDDGetclient(this.state.clientID)} </p>

     


     
      
      </header>
  
  
    </div>
    )
  }
}

export default App