import React, { Component } from 'react'
import  './App.css'
import login from'./login';
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
    }
    this.BDDGetclient = this.BDDGetclient.bind(this);
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
    return(login())
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