//////CONFIGURATION HERE ////////

////////////////////////////////////////////
//Use  Valjang API? (for demo version)     /
//allows auto configuration of the backend /
//no administrator panel if activate.      /
//True = Yes, False = no.                  /
//-----------------------------------------/
GETApi = false;                       


// You can Use this Variable For set Name client. You can Set "BDD" for use Sql DataBase Client
NameOfClient = "BDD";
// If you use the Database for your client name, please set Your ID client
IDclient = "0";
//Use Backend ? True = Yes, False = no. //If you use the valjang API this option will replace
Backend = true;
// Set IP Backend server //If you use the valjang API this option will replace
ServerBackend = "http://public.valjang.fr:5000";

//set uplaud server //If you use the valjang API this option will replace
Serveruplaud = "http://public.valjang.fr";

//preload model ? true = yes, false = no.
preload = false;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
































///////////////////////////////////////////

//this variable is used to check if it is possible to connect to the backend
Onconnect = true;
ifadmin =false;
message = document.getElementById("message")
//======Backend function===========//



function Panel(){
if(ifadmin){

    var myRequest = new Request(ServerBackend + "/model");
var from = document.getElementById("myForm")
var fun = document.getElementById("fun")
var up =document.getElementById("Sign Up")
var int = document.getElementById("Sign In")
var dont = document.getElementById("dont")
var div = document.getElementById('Div')
var form = document.getElementById("formContent")
form.classList.remove('login')
div.innerHTML = "<H1>Loading Panel... <H1/>"
int.classList.add('hiden')
up.classList.add('hiden')
from.classList.add('hiden')
fun.classList.add('hiden')
dont.classList.add('hiden')
form.classList.add('panel')
var result
    fetch(myRequest)
    
    .then(function(response) { return response.json(); })
    
    .then(function(data) {
    
        console.log(data)
      //data.length
      for (var i = 0; i < data.length; i++) {
        newdata = data[i]
      image = "<br><img class='picture'src="+newdata.image+"><br>" 
      nom = "<p>"+newdata.name+"<p/><br>"
     categorie = "<p>"+newdata.type+"<p/><br>"
 modif = "<input type='button' id="+newdata.name+" class='fadeIn fourth' value='edit'>"
 remove = "<input type='button' id="+newdata.name+" class='fadeIn fourth' value='remove'>"
 console.log(image + nom + categorie+modif+remove)
result = result + image + nom + categorie+modif+remove
      }
      div.innerHTML = "<div id='pan'>"+result+"<div/>"
     });
console.log(result)
    
}else{
    alert('Err: auth')
}



}





//fun fact
function rng(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
fun = document.getElementById("fun")
fun.innerHTML = '<p> Loading.. <p/>'

var myRequest = new Request(ServerBackend + "/model");

fetch(myRequest)

.then(function(response) { return response.json(); })

.then(function(data) {

    console.log(data)
    numberdata = rng(data.length)

fun.innerHTML = '<H1> Fun object <H1/> <img class="picture"src='+data[numberdata].image+">"+"<p class='funI'>"+data[numberdata].name+"</p>" 
 });


// end fun 






























function Getadmin(name){

    var myRequest = new Request(ServerBackend + "/admin");

    fetch(myRequest)

    .then(function(response) { return response.json(); })

    .then(function(data) {


        for (var i = 0; i < data.length; i++) {
            var Newdata = data[i]
            if(Newdata.name === name){
                message.innerHTML = "<p>Admin detected... please wait...<p/>"
                ifadmin = true
            }
        }
redirect = document.getElementById("redirect")
        if(ifadmin){
           
            message.innerHTML = "<p>Admin detected... please wait...<p/>"
            Panel()
        }else{
            message.innerHTML = "<p>please wait...<p/>"
            window.location = 'editor.html'

        }
       





    }); ////end admin
}



function Getmodels(categorie) {
   // SwitchSpinner(true);
    var myRequest = new Request(ServerBackend + "/model");

    fetch(myRequest)

    .then(function(response) { return response.json(); })

    .then(function(data) {


        for (var i = 0; i < data.length; i++) {


            var elem = document.getElementById('liste')
            var btn = document.getElementById('filtre')

            var Newdata = data[i]
            var JS = ""
            var mod = ""

            if (categorie == "G") {
                if (Newdata["statut"] == 1) {
                    mod = "Modifiable"
                } else {
                    mod = "Non Modifiable"
                }
            }


            var img = Newdata["image"]

            if (categorie == Newdata["type"]) {
                var lien = "'" + Serveruplaud + "/model/" + Newdata["link"] + "'"
                if (categorie == "G") {
                    JS = 'javascript:bootbox.hideAll(); Load3DModel(' + lien + '); AppSDK_CreateNewScene(meshItemToCreateOrCombine); meshItemToCreateOrCombine = null; '
                } else {
                    JS = 'javascript:bootbox.hideAll(); Load3DModel(' + lien + '); '
                }


                if (objet === undefined) {
                    var objet = '<div  class="item"><img src="' + img + '" id="img" style="   width:90%;" onclick="' + JS + '">' + mod + '</a></div>'
                } else {
                    var objet = objet + '<div class="item"><img src="' + img + '"id="img" style="   width:90%;" onclick="' + JS + ' ">' + mod + '</a></div>'
                }



            }






        }

        if (objet === undefined) {
            objet = "Error please check the console."
            console.error("The 'object' variable is empty. It is possible that he has a problem with the Backend or that the database is empty.")
        } else {
            var closebtn = '<button id="close">Fermer</button>'
            var categorieFORM = '<img id="FROM" class="fit-picture"src="./src/img/2_SOUS_PARTI_1.png" >'
            var categorieALPHABET = '<img id="A" class="fit-picture2"src="./src/img/2_SOUS_PARTI_2.png" >'
            if (categorie == "G") {
                elem.innerHTML = closebtn + objet;
            } else {

                elem.innerHTML = closebtn + objet;
                btn.classList.remove("hiden");
                btn.innerHTML = categorieFORM + categorieALPHABET

            }

            var close = document.getElementById('close')
            close.onclick = function() {

                bootbox.hideAll();
                btn.classList.add("hiden");

            }

        }

        //SwitchSpinner(false);

    });

}




function BDDGetclient() {
    var myRequest = new Request(ServerBackend + "/client");
    fetch(myRequest)
        .then(function(response) { return response.json(); })
        .then(function(data) {
            for (var i = 0; i < data.length; i++) {
                var Newdata = data[IDclient]
                NameOfClient = Newdata["name"]
                console.log("Nom du client: " + NameOfClient)
                    // console.log("Client dans la BDD : "+ data.length)
            }
            return (NameOfClient)

        });

}

function GETApiValjang() {
    Backend = true;
    ServerBackend = "http://public.valjang.fr:5000";
    Serveruplaud = "http://public.valjang.fr";
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


console.log("Backend enebled ? :" + Backend)
if (GETApi) {
    GETApiValjang()
    console.log("SERVEUR : " + " valjangAPI (api.valjang.fr)")
} else {
    console.log("SERVEUR : " + BDDGetinfoDataBase())
}



if (Backend) {


    BDDGetinfoDataBase()
    if (NameOfClient == "BDD") {
        BDDGetclient()
    }


}