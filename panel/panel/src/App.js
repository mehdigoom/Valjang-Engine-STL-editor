import React from 'react';
import Login from './Pages/Login'
import './App.css';
import  './scripts/login';

class App extends React.Component {
   constructor(props) {
      super(props);
		
      this.state = {
        ifconnect : false,
        user : "",
        password:"",
        redirect : false,
        message :"Loading"
      };
   }
   
   render() {
   
  
 

  
      return (
         <div>

<Login/>
        
         </div>
      );
   }
}
export default App;