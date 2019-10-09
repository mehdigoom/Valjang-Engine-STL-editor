import React, { Component } from 'react'
import Async from 'react-async';
import modif from './modfi'
const model = () =>
  fetch("http://public.valjang.fr:5000/model")
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())

class pan extends Component {
  constructor(props) {

    this.Getliste = this.Getliste.bind(this);
    this.modify = this.modify.bind(this);
    this.Cinditionalrender = this.Cinditionalrender.bind(this)
  }
}
var step = 0;
var select = "";

const modifyModel = (id) => {
  console.log('model id : ', id)
  select = id
  step =1
  console.log('model step : ', step)
};

function Getliste() {
  return (<Async promiseFn={model}>
    {({ data, err, isLoading }) => {
      if (isLoading) return "Loading models..."
      if (err) return `Something went wrong: ${err.message}`

      if (data)
        return (
          <div>
            <div>
              <input class="favorite styled" type="button" name="Loginbtn" value="Ajouter un model" />

            </div>
            {data.map(model => (
              <div key={model.name} className="row">
                <div className="col-md-12">
                  <h1>{model.name}</h1>
                  <img class="fit-picture" src={model.image} />
                  <br></br>
                  <input class="favorite styled" type="button" onClick={() => modifyModel(model.name)} step="1" id={model.name} value="Modifier" />
                  <input class="favorite styled" type="button" id={model.name} value="Supprimer" />
                  <input class="favorite styled" type="button" id={model.name} value="Voir dans le viwver" />
                </div>
              </div>
            ))}
          </div>
        )
    }}
  </Async>)
}

function Cinditionalrender(name, st) {
  step = st
  if (step == 0) {
    return (Getliste())
  } else if (step == 1) {

    return (modify(name))
  } else { return (<h1>Err : invalid step : {step}</h1>) }
}


function modify(name) {
  console.log(name)
  return (<Async promiseFn={model}>
    {({ data, err, isLoading }) => {
      if (isLoading) return "Loading models..."
      if (err) return `Something went wrong: ${err.message}`

      if (data.name == name) {
        return (
          <div>
            <div>
              <input class="favorite styled" type="button" name="Loginbtn" value="Ajouter un model" />

            </div>
            {data.map(model => (
              <div key={model.name} className="row">
                <div className="col-md-12">
                  <h1>{model.name}</h1>
                  <img class="fit-picture" src={model.image} />
                  <br></br>


                </div>
              </div>
            ))}
          </div>
        )
      }
    }}
  </Async>)
}






function panel(clientID, client, login) {

  return (
    <div className="App">

      {Cinditionalrender(null, step)}
    </div>
  );
}

export default panel;
