import React, { Component } from 'react'
import  './App.css'

import logo from './img/DOOD_Logo600.png';
import panel from './panel';
import Async from 'react-async';


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
      ifcorrect: false,
      title: '',
    }
    this.BDDGetclient = this.BDDGetclient.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
//send Login and password to backend
handleSubmit(login, password) {
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

};
  
handleChange(event) { this.setState({ title: event.target.value })
console.log(this.state.title) };

login(){
  return (
    <div className="App">

      <header className="App-header">
        <form >
          <label>
            Login :
      <input type="text" name="title" value={this.state.title}  onChange={this.handleChange}/>
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







  BDDGetclient(IDclient) {
    
    if (IDclient)
    return (
      <Async promiseFn={loadUsers}>
      {({ data, err, isLoading }) => {
        if (isLoading) return "Connenxion à la base de donées."
        if (err) return `Backend Hors service :'( : ${err.message}`

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
                 
                    {this.rendercondition() // rendu dynamique des pages
}
            </div>
          )
      }}
    </Async>
    )
}


HabdelChargeclient(Value){
  this.setState({
    client : Value
   });return(Value)
}

  

 renderlogo (condition){
    let result = ""
    if (condition === true){
     result =<img src={logo}/>
    }else{
      result = ""
    }
    
  return(result)
  }

rendercondition(){
  if(this.state.Iflogin == false){
    return(this.login())
  }else{
    return(panel())
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