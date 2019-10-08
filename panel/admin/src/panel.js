import React, { Component } from 'react'
import  './App.css'





class pan extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      IfErr:false,
      mmessage:""
    }
    this.errdetector = this.errdetector.bind(this);
  } 



}



// You can Use this Variable For set Name client. You can Set "BDD" for use Sql DataBase Client
var NameOfClient = "BDD";
// If you use the Database for your client name, please set Your ID client
var IDclient = "0";

// Set IP Backend server //If you use the valjang API this option will replace
var ServerBackend = "http://public.valjang.fr:5000";

//set uplaud server //If you use the valjang API this option will replace
var Serveruplaud = "http://public.valjang.fr";


function panel(clientID,client,login) {

  return (
    <div className="App">
      <header className="App-header">      
 <p>Panel de {login}.</p>
 




      </header>
    </div>
  );
}

export default panel;
