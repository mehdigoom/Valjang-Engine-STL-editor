//dont tuch



//this variable is used to check if it is possible to connect to the backend
 Onconnect = true;


//////CONFIGURATION HERE ////////


//Use api Valjang? True = Yes, False = no.
 GETApiValjang = false;

// Use last version of ValjangEngine.js ? True = Yes, False = no.
 ValjangEngineAutoUpdate = true;

// You can Use this Variable For set Name client. You can Set "BDD" for use Sql DataBase Client
 NameOfClient = "BDD"
// If you use the Database for your client name, please set Your ID client
IDclient ="1"
//Use Backend ? True = Yes, False = no.
 Backend = true;
// Set IP Backend server
 ServerBackend = "http://35.180.189.176:5000";

 //set uplaud server
 Serveruplaud = "http://35.180.189.176/model/"





///////////////////////////////////////////


//======Backend function===========

function Getmodels(categorie){

  var myRequest = new Request(ServerBackend+"/model");
  bootbox.hideAll();
  fetch(myRequest)
  
    .then(function(response) { return response.json(); })
    
    .then(function(data) {
   
   
      for (var i = 0; i < data.length; i++) {
    
        var elem = document.getElementById('liste')
        var Newdata = data[i]
        if(categorie == Newdata["type"]){
          var lien ="'"+ Serveruplaud +Newdata["link"]+"'"
          var img = Newdata["image"]
  
          var objet = objet+'<div class="item"><img src="'+img+'" alt="A" style="   width:90%;" onclick="javascript:bootbox.hideAll();Load3DModel('+lien+');"></a></div>'
        
        }
        
 
      }
   
      var closebtn = '<button onclick="bootbox.hideAll();">Fermer</button>'
      elem.innerHTML = closebtn + objet;
    });
}



//c'est moche mais sa marche !
function BDDGetclient() {
    var myRequest = new Request(ServerBackend+"/client");
    fetch(myRequest)
      .then(function(response) { return response.json(); })
      .then(function(data) {
        for (var i = 0; i < data.length; i++) {
          var Newdata = data[IDclient]
         NameOfClient=Newdata["name"]
         console.log("Nom du client: "+NameOfClient)
         console.log("Client dans la BDD : "+ data.length)
        }

      });
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
if (Backend) {
  
    console.log("SERVEUR : "+BDDGetinfoDataBase())
    BDDGetinfoDataBase()
  if(NameOfClient == "BDD"){
    BDDGetclient()
  }

    

}
