import React from 'react';
import '../App.css';
import  '../scripts/login';
import '../scripts/GetAdmin';
class LoginP extends React.Component {
   constructor(props) {
      super(props);
		
      this.state = {
        ifconnect : false,
        user : "",
        password:"",
        redirect : false,
        message :"Loading"
      };
      async function log() {
   


  
  var result

    var login = document.getElementById("login").value;
    var password = document.getElementById("password").value;
    await fetch('public.valjang.fr:5000/user/login', {
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
       if (response.ok == true) {
         console.log(response.ok);
         result = response.ok
        
         var now = new Date();
         
    var annee   = now.getFullYear();
    var mois    = ('0'+now.getMonth()+1).slice(-2);
    var jour    = ('0'+now.getDate()   ).slice(-2);
    localStorage.setItem('Login',login)
    localStorage.setItem('password',password)
    localStorage.setItem('date',jour+mois+annee)
         this.Getadmin(login)
       }
       else {
         console.log(response.ok);
         result = response.ok
        
       
       }
       
     })
    
    .catch(function (error) {
     console.log(error);
    
    });
    
    }
    //end login
  
   }
   
   render() {
   
    async function log() {
   


  
        var result
      
          var login = document.getElementById("login").value;
          var password = document.getElementById("password").value;
          await fetch('public.valjang.fr:5000/user/login', {
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
             if (response.ok == true) {
               console.log(response.ok);
               result = response.ok
              
               var now = new Date();
               
          var annee   = now.getFullYear();
          var mois    = ('0'+now.getMonth()+1).slice(-2);
          var jour    = ('0'+now.getDate()   ).slice(-2);
          localStorage.setItem('Login',login)
          localStorage.setItem('password',password)
          localStorage.setItem('date',jour+mois+annee)
               this.Getadmin(login)
             }
             else {
               console.log(response.ok);
               result = response.ok
              
             
             }
             
           })
          
          .catch(function (error) {
           console.log(error);
          
          });
          
          }
          //end login
        

  
      return (
         <div>

<form>
  <label>
    Login :
    <input id="login" type="text" name="Login" />
  </label>
  <br></br>
  <label>
    Password:
    <input id="password" type="text" name="pasword" />
  </label>
  <input id="btn" type="button"  onClick={log()} value="Envoyer" />
</form>
        
         </div>
      );
   }
}
export default LoginP;