import React from 'react';

import './App.css';

function init(){
return("Loading...")
}
function App() {
  return (
    <div className="wrapper fadeInDown">
      <header className="formContent">
        
        <h1 id="Load">
          STL editor
        </h1>
        <a>
        {init()}
        </a>
      </header>
    </div>
  );
}

export default App;
