
import * as React from "react";
type  IState= {
    Iflogin:boolean,
    client:string,
    token :string,
    DoodLogo :boolean,
    clientID:number,
    
    
    login:string,
    password:string,
    message:string,
  
 

  }
export class Login extends React.Component<any,IState> {
  
    
    // L'export de notre fichier login.tsx est la class login qui a été extends par React
// Mon login peut être désormais importé dans d'autres fichiers de mon projet
    constructor(props) {
        super(props);
        
       
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangePa = this.handleChangePa.bind(this);
    }
    //Send Login to server 
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
             'email': this.props.login,
             'password': this.props.password,
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


      handleChange(event) {
        this.setState({ login: event.target.value 
        })
        
         console.log(this.props.login) 
        };
       
       
       
       
       
         handleChangePa(event) { 

  console.log("RESULTAT: "+this.handleSubmit)
  this.setState({ 
  password: event.target.value, 

  
});}
render() {
        
    return (
        
        <div className="App">
<p>{this.props.message}</p>
        <header className="App-header">
          <form onSubmit={this.handleSubmit}>

            <label>
              Login :
        <input type="text" name="login" value={this.props.login}  onChange={this.handleChange}/>
            </label>
            <br></br>
            <label>
              password :
              
        <input type="password" name="password" value={this.props.password}  onChange={this.handleChangePa}/>
            </label>
  
            <br></br>
  
            <input type="button" name="Loginbtn" value="Login" onClick={this.handleSubmit }/>
  
          </form>
        </header>
      </div>
        
    )

}

};