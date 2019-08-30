





                                           //////CONFIGURATION HERE ////////


//Use  Valjang API? 
//allows auto configuration of the backend 
//no administrator panel if activate.
//True = Yes, False = no. 
 GETApi = false;


// You can Use this Variable For set Name client. You can Set "BDD" for use Sql DataBase Client
 NameOfClient = "BDD";
// If you use the Database for your client name, please set Your ID client
IDclient ="1";
//Use Backend ? True = Yes, False = no. //If you use the valjang API this option will replace
 Backend = true;
// Set IP Backend server //If you use the valjang API this option will replace
 ServerBackend = "http://35.180.189.176:5000";

 //set uplaud server //If you use the valjang API this option will replace
 Serveruplaud = "http://35.180.189.176";

//preload model ? true = yes, false = no.
preload = false;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////














































///////////////////////////////////////////

//this variable is used to check if it is possible to connect to the backend
Onconnect = true;

//======Backend function===========//






function Getmodels(categorie){

  var myRequest = new Request(ServerBackend+"/model");
  bootbox.hideAll();
  fetch(myRequest)
  
    .then(function(response) { return response.json(); })
    
    .then(function(data) {
   
   
      for (var i = 0; i < data.length; i++) {
        SwitchSpinner(true);
        var elem = document.getElementById('liste')
        var Newdata = data[i]
        var JS = ""
        var mod =""
        //
        if(categorie =="G"){
          if (Newdata["statut"]== 1){
            mod = "Modifiable"
        }else{
          mod = "Non Modifiable"
        }
        }
      
    
          var img = Newdata["image"]
         
          if(categorie == Newdata["type"]){
            var lien ="'"+ Serveruplaud+"/model/" +Newdata["link"]+"'"
            if(categorie =="G"){
              JS = 'javascript:bootbox.hideAll(); Load3DModel('+lien+'); AppSDK_CreateNewScene(meshItemToCreateOrCombine); meshItemToCreateOrCombine = null; '
            }else{
              JS = 'javascript:bootbox.hideAll(); Load3DModel('+lien+');'
            }

            if(objet === undefined){
              var objet = '<div class="item"><img src="'+img+'" alt="A" style="   width:90%;" onclick="'+JS+'">'+mod+'</a></div>'
            }else{
              var objet = objet+'<div class="item"><img src="'+img+'" alt="A" style="   width:90%;" onclick="'+JS+'">'+mod+'</a></div>'
            }
          
    
      
          }

          
          
        
        
 
      }
   if(objet === undefined){
console.error("The 'object' variable is empty. It is possible that he has a problem with the Backend or that the database is empty.")
   }else{
    var closebtn = '<button onclick="bootbox.hideAll();">Fermer</button>'
    var categorieFORM 
    var categorieALPHABET 
    elem.innerHTML = closebtn + objet;
   }

   SwitchSpinner(false);
    });
  
}




function BDDGetclient() {
    var myRequest = new Request(ServerBackend+"/client");
    fetch(myRequest)
      .then(function(response) { return response.json(); })
      .then(function(data) {
        for (var i = 0; i < data.length; i++) {
          var Newdata = data[IDclient]
         NameOfClient=Newdata["name"]
         console.log("Nom du client: "+NameOfClient)
        // console.log("Client dans la BDD : "+ data.length)
        }

      });

}

function GETApiValjang(){
  Backend = true;
  ServerBackend = "http://35.180.189.176:5000";
  Serveruplaud = "http://35.180.189.176";
}
function BDDGetinfoDataBase() {
    retour = ServerBackend

    if (ServerBackend == "Plase set IP and port") {
        Onconnect = false;
        alert("Backend not set. Err : 404. Please configure on com.js.")

        retour = " Backend not set.Err: 404 "
        
        console.error(retour)
    }
    if (ServerBackend == "") {
        Onconnect = false;
        alert("Backend not set. Err : Nullset. Please configure on com.js.")
        
    }
    var searchTerm = '192.168';
    var indexOfFirst = ServerBackend.indexOf(searchTerm);
    if (indexOfFirst == -1) {

    } else {
        Onconnect = false;
        alert("Backend not open on internet. Err : Local-IP")
        console.log("INDEX :" + indexOfFirst)
    }
    return (retour)
}


console.log("Backend enebled ? :"+ Backend)
if(GETApi){
  GETApiValjang()
  console.log("SERVEUR : "+" valjangAPI (api.valjang.fr)")
}else{
  console.log("SERVEUR : "+BDDGetinfoDataBase())
}
if (Backend) {

    
    BDDGetinfoDataBase()
  if(NameOfClient == "BDD"){
    BDDGetclient()
  }


}
