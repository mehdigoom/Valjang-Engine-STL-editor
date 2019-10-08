import React, { Component } from 'react'
import Async from 'react-async';
const model = () =>
  fetch("http://public.valjang.fr:5000/model")
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())

class pan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IfErr:false,
      mmessage:""
    }
    this.errdetector = this.errdetector.bind(this);
  } 
}


function Getliste() {
  return(      <Async promiseFn={model}>
    {({ data, err, isLoading }) => {
      if (isLoading) return "Loading..."
      if (err) return `Something went wrong: ${err.message}`

      if (data)
        return (
          <div>
            <div>
            <input class="favorite styled" type="button" name="Loginbtn" value="Ajouter un model" />
           
            </div>
            {data.map(user=> (
              <div key={user.username} className="row">
                <div className="col-md-12">
                <h1>{user.name}</h1>
                <img class="fit-picture"src={user.image} />
                <br></br>
                <input class="favorite styled" type="button" name="Loginbtn" value="Modifier" />
                <input class="favorite styled" type="button" name="Loginbtn" value="Supprimer" />
                <input class="favorite styled" type="button" name="Loginbtn" value="Voir dans le viwver" />
                  
                </div>
              </div>
            ))}
          </div>
        )
    }}
  </Async>)
}









function panel(clientID,client,login) {

  return (
    <div className="App">
      {Getliste()}
    </div> 
  );
}

export default panel;
