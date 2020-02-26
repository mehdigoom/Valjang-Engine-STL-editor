import React from 'react';
import './App.css';

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
    function init() {
 
    console.log(localStorage.getItem("login"))

    }
      return (
         <div>

            <center><h2>{this.state.message}</h2></center>
            {init()}
         </div>
      );
   }
}
export default App;