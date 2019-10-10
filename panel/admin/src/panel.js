import React, { Component } from 'react'
import  './App.css'


import Async from 'react-async';
import { promises } from 'dns';


class panel extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      Iflogin:false,
     
      
    }
  
  
  }











  

 

rendercondition(){
  if(this.state.Iflogin == false){
    return(this.login())
  }else if(this.state.Iflogin == true){

  }else{
    return("Err: BackEnd: Invalid reponses: "+this.state.Iflogin)
  }
}


 
  render() {
  
    
   
    return (
 
      <div className="App">
  
    
      
      <p>ok </p>

     


     

  
  
    </div>
    )
  }
}

export default panel