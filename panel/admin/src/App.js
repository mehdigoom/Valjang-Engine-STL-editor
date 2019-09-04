import React from 'react';

import './App.css';





function App() {
  return (
    <div className="App">
      <p>Bienvenue dans le panel administrateur du viewver 3D de </p>
 <form>
  <label>
    Login :
    <input type="text" name="name" />
  </label>
  <br></br>
  <label>
    Password :
    <input type="text" name="Password" />
  </label>
  <br></br>
  <input type="submit" value="Envoyer" />
</form>
    </div>
  );
}

export default App;
