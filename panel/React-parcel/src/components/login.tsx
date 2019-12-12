import React, { Component } from 'react';

class Login extends React.Component {
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