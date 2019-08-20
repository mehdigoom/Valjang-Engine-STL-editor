import React from 'react';

import reacDOM from 'react-dom';




function App() {
  return (

    <div className="App">
    <header>
    <p>panel admin</p>
    </header>
 

 
     
     <form>
  <label>
    Login:
    <input type="text" name="name" />
    Password :
    <input type="password" name="Password" />
  </label>
  <input type="submit" value="Envoyer" />


</form>




    </div>
    
  );
}

export default App;
