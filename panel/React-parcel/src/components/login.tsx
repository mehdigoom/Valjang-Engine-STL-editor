
import React from 'react'
class Login extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
          Iflogin:false,
          client:"[no select]",
          token : "",
          ServerBackend: "http://public.valjang.fr:5000",
          DoodLogo :true,
          clientID:"0",
          
          step:0,
          login: '',
          password:'',
          message:'',
        
       

        }

    }
    
    render() {
        return (
            
            <form>
  <label>
    Login
    <input type="text" name="name" />

  </label>
  <label>
    Password
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Envoyer" />
</form>
            
        )
    }
}

// L'export par défault de notre fichier login.tsx est la class login qui a été extends par React
// Mon login peut être désormais importé dans d'autres fichiers de mon projet
export default Login;