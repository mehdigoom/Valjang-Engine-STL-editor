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

//Use Backend ? True = Yes, False = no.
 Backend = true;

// Set IP Backend server
 ServerBackend = "35.180.189.176:5000";




///////////////////////////////////////////




//======Backend function===========


function BDDGetclient() {

    fetch('http://35.180.189.176:5000/client')
    .then(function (response) {
        response.json()
            .then(function (value) {
                var json = JSON.stringify(value)
               var  obj = JSON.parse(json)
           
         
                this.NameOfClient = obj.name[0];
                console.log("Client name: "+ NameOfClient) 
                return(this.NameOfClient)
                
            });
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
        alert("Backend not set. Err : Nullset. Please configure on appload.js.")
        
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
  BDDGetclient()
    

}
