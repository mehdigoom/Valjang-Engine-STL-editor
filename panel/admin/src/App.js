import React, { Component } from 'react'
import  './App.css'
import login from './login'
import logo from './img/DOOD_Logo600.png';
import panel from './panel';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      Iflogin:false,
      client:"[no select]",
      token : "",
      ServerBackend: "http://public.valjang.fr:5000",
      DoodLogo :true,
      clientID:"1",
    }
    this.BDDGetclient = this.BDDGetclient.bind(this);
  }


HabdelChargeclient(Value){
  this.setState({
    client : Value
   });return(Value)
}

   BDDGetclient(IDclient) {
    var myRequest = new Request(this.state.ServerBackend+"/client");
   
    var NameOfClient 
    fetch(myRequest)
        .then(function(response) { return response.json(); })
        .then(function(data) {
            for (var i = 0; i < data.length; i++) {
                var Newdata = data[IDclient]
              
                 NameOfClient = Newdata["name"]
                
                console.log("Nom du client: " + NameOfClient)
                    // console.log("Client dans la BDD : "+ data.length)
                  
            }
            


        });
        return(NameOfClient)
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
    this.BDDGetclient(this.state.clientID)
    
   
    return (
 
      <div className="App">
      <header className="App-header">
      <input type="submit" value="Envoyer" onClick={this.BDDGetclient(this.state.clientID)} />
      {this.renderlogo(this.state.DoodLogo)}
      <p>Panel viewver admin de {this.BDDGetclient(this.state.clientID)} </p>
{this.rendercondition() // rendu dynamique des pages
                                                     }
      
     
      
      </header>
    </div>
    )
  }
}

export default App