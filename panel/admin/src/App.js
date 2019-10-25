import React, { Component } from 'react'
import  './App.css'

import logo from './img/DOOD_Logo600.png';
import Async from 'react-async';
import { promises } from 'dns';

const loadUsers = () =>
  fetch("http://public.valjang.fr:5000/client")
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())




const model = () =>
  fetch("http://public.valjang.fr:5000/model")
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())  

class App extends Component {
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
      //Info modelselection
      select:"",//Name model
      description:"",
      link:"",
      type:"",
      image:"",
      price:"",
      size:"",
      tag:"",
      statut:"",
      created_at:"",
      updated_at:"",
    }
    this.BDDGetclient = this.BDDGetclient.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangePa = this.handleChangePa.bind(this);
  
  }
//---------------------PANEL------------------------------------//
modifyModel = (id,description,link,type,image,price,size,tag,statut,created_at,updated_at) => {
  this.setState({ 
    step: 1, 
  select:id,
  description:description,
      link:link,
      type:type,
      image:image,
      price:price,
      size:size,
      tag:tag,
      statut:statut,
      created_at:created_at,
      updated_at:updated_at,
    
  })
  
};
 Getmodel() {
  return (<Async promiseFn={model}>
    {({ data, err, isLoading }) => {
      if (isLoading) return "Loading models..."
      if (err) return `Something went wrong: ${err.message}`

      if (data)
        return (
          <div>
            <input class="favorite styled" type="button" id={model.name} onClick={() => this.setState({Iflogin:false}} value="Deconnecter" />
            <div>
              <input class="favorite styled" type="button" name="Loginbtn" value="Ajouter un model" />

            </div>
            {data.map(model => (
              <div key={model.name} className="row">
                <div className="col-md-12">
                  <h1>{model.name}</h1>
                  <img className="fit-picture" src={model.image} />
                  <br></br>
                  <input class="favorite styled" type="button" onClick={() => this.modifyModel(model.name,model.description,model.link,model.type,model.image,model.price,model.size,model.tag,model.statut,model.created_at,model.updated_at)} step="1" id={model.name} value="Modifier" />
                  <input class="favorite styled" type="button" id={model.name} value="Supprimer" onClick= {() =>this.modifyModel(model.name,model.description,model.link,model.type,model.image,model.price,model.size,model.tag,model.statut,model.created_at,model.updated_at)} step="2" id={model.name}/>
                  <input class="favorite styled" type="button" id={model.name} value="Voir dans le viwver" />
                </div>
              </div>
            ))}
          </div>
        )
    }}
  </Async>)
}
//Render modif
Rendermodif(){
  return (<Async promiseFn={model}>
    {({ data, err, isLoading }) => {
      if (isLoading) return "Loading.."
      if (err) return `Something went wrong: ${err.message}`
if(data)
       return (
          <div>
            <input class="favorite styled" type="button" onClick={() => this.setState({step:0})} value="Retour" />
            <form>
      <label>
    Changer le nom :
          <input type="text" name="name" value={this.state.select}/>
    </label>
    <br></br>
          <img className="fit-picture" src={this.state.image} />
          <br></br>
      
     

          Changer l'image (Lien) <input type="text" name="link" value={this.state.image}/>
<br></br>
Tags : 
<input type="text" name="link" value={this.state.tag}/>
<br></br>
Modifiable ? 
<input type="checkbox" name="link" value={this.state.statut}/>
<br></br>
Prix
<input type="text" name="link" value={this.state.price}/>
<br></br>
Taille
<input type="text" name="link" value={this.state.size}/>
<br></br>
Description
<input type="text" name="link" value={this.state.description}/>
<br></br>
Crée le : {this.state.created_at}
<br></br>
modifier le : {this.state.updated_at}
<br></br>
            </form>
          
            </div>
            
            
        )
    }}
  </Async>)
}

popupsupprimer(id,image){
  return(
    <div>
Voulez-supprimer {id} ? 
<img className="fit-picture" src={image} />
<input class="favorite styled" type="button" id="oui" value="Supprimer" />
<input class="favorite styled" type="button" id="non"onClick={() => this.setState({step:0})} value="Non" />

    </div>
  )
}




//-------------------END--PANEL------------------------------------//
















//send Login and password to backend
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
      'email': this.state.login,
      'password': this.state.password,
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

handleChange(event) { this.setState({ login: event.target.value })
console.log(this.state.login) };

handleChangePa(event) { 

  console.log("RESULTAT: "+this.handleSubmit)
  this.setState({ 
  password: event.target.value, 

  
})
console.log(this.state.password) };

login(){
  return (
    <div className="App">

      <header className="App-header">
        <form onSubmit={this.handleSubmit}>
          <label>
            Login :
      <input type="text" name="login" value={this.state.login}  onChange={this.handleChange}/>
          </label>
          <br></br>
          <label>
            password :
            
      <input type="password" name="password" value={this.state.password}  onChange={this.handleChangePa}/>
          </label>

          <br></br>

          <input class="favorite styled" type="button" name="Loginbtn" value="Login" onClick={this.handleSubmit }/>

        </form>
      </header>
    </div>

  );
}







  BDDGetclient(IDclient) {
    
    if (IDclient)
    return (
      <Async promiseFn={loadUsers}>
      {({ data, err, isLoading }) => {
        if (isLoading) return ("Please wait...")
        if (err) return `Backend Out :'( : ${err.message}`

        if (data){
        var client ="" 
        for (var i = 0; i < data.length; i++) {
          var Newdata = data[IDclient]
          if(client =="" ){
            client= Newdata["name"]
          
          }
        }
        
         
      }
      
          return (
            <div>
            
             {this.renderlogo(true)}
             
                    <p>Login to {client} Viewer</p>
                 <p>{this.state.message}</p>
                    {this.rendercondition() // rendu dynamique des pages
                    }
            </div>
          )
      }}
    </Async>
    )
}




  

 renderlogo (condition){
    let result = ""
    if (condition === true){
     result =<img src={logo} className="App-logo"/>
    }else{
      result = ""
    }
    
  return(result)
  }

rendercondition(){
  if(this.state.Iflogin == false){
    return(this.login())
  }else if(this.state.Iflogin == true){
    
    if(this.state.step == 0){
      return(this.Getmodel())
    }else if(this.state.step == 1){
      return(this.Rendermodif())
    }else if(this.state.step ==2)
    { this.popupsupprimer()}
      else{
        return("Err: LocalBuild: Invalid step: "+this.state.step)
      }
      
    
    
// Logic panel




  }else{
    return("Err: BackEnd: Invalid reponses: "+this.state.Iflogin)
  }
}


 
  render() {
  
    
   
    return (
 
      <div className="App">
      <header className="App-header">
    
      
      <p>{this.BDDGetclient(this.state.clientID)} </p>

     


     
      
      </header>
  
  
    </div>
    )
  }
}

export default App