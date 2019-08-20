var Module = null;



//////CONFIGURATION HERE ////////


//Use api Valjang? True = Yes, False = no.
var GETApiValjang = false;

// Use last version of ValjangEngine.js ? True = Yes, False = no.
var ValjangEngineAutoUpdate = true;

// You can Use this Variable For set Name clent. You can Set "BDD" for use Sql DataBase Client
var NameOfClient = "Dood Studio"

//Use Backend ? True = Yes, False = no.
var Backend = true;

// Set IP Backend server
ServerBackend = "Plase set IP and port"




///////////////////////////////////////////




//======Backend===========


function BDDGetAllModel(type) {

    const userAction = async() => {
        const response = await fetch('http://' + ServerBackend + "/" + +type + '/models');
        const myJson = await response.json(); //extract JSON from the http response
        // do something with myJson
        return (myJson)
    }

}


function BDDGetModel(type, name) {

    const userAction = async() => {
        const response = await fetch('http://' + ServerBackend + "/" + +type + '/models');
        const myJson = await response.json(); //extract JSON from the http response
        // do something with myJson
        return (myJson)
    }

}


function BDDGetModel(type, name) {

    const userAction = async() => {
        const response = await fetch('http://' + ServerBackend + "/" + +type + '/models');
        const myJson = await response.json(); //extract JSON from the http response
        // do something with myJson
        return (myJson)
    }

}



function BDDGetinfoDataBase() {
    retour = ServerBackend

    if (ServerBackend = "Plase set IP and port") {
        alert("Backend not set. Err : 404. Please configure on appload.js.")

        retour = " Backend not set.Err: 404 "
        console.error(retour)
    }
    if (ServerBackend = "") {
        alert("Backend not set. Err : Nullset. Please configure on appload.js.")
    }
    var searchTerm = '192.168';
    var indexOfFirst = ServerBackend.indexOf(searchTerm);
    if (indexOfFirst == -1) {

    } else {
        alert("Backend not open on internet. Err : Local-IP")
        console.log("INDEX :" + indexOfFirst)
    }
    return (retour)
}


if (Backend) {
    BDDGetinfoDataBase()
}


function ValjangGetAPI() {

    const userAction = async() => {
        const response = await fetch('http://Valjang.fr/Api.json');
        const myJson = await response.json(); //extract JSON from the http response
        return (myJson)

    }

}
if (GETApiValjang) {
    ValjangGetAPI();
}

function InitModule() {


    Module = {};
    Module.onRuntimeInitialized = function() {
        window.onerror = null;
        console.log("Emscripten library initalisation ended.");
        let appScript = document.createElement('script');
        appScript.src = "src/app.js";
        appScript.onload = function() {
            console.log("APP loaded. Valjang Engine : Ready !");
            AppSDK_Init();
            StartAppMain();
        }
        document.head.appendChild(appScript);
    }
}

if (1) {
    console.log("Start load WASM library.");
    InitModule();
    let request = new XMLHttpRequest();
    request.open('GET', 'src/cpplib_wasm.wasm');
    request.responseType = 'arraybuffer';
    request.send();
    request.onload = function() {
        Module.wasmBinary = request.response;
        let cpplibwasmScript = document.createElement('script');
        cpplibwasmScript.src = "src/cpplib_wasm.js";
        document.head.appendChild(cpplibwasmScript);
        window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
            //alert("WASM failed to initialize, fallback to ASM.JS library.");
            // console.log("WASM failed to initialize, fallback to ASM.JS library.");
            InitModule();
            let cpplibasmjsScript = document.createElement('script');
            cpplibasmjsScript.src = "src/cpplib.js";
            document.head.appendChild(cpplibasmjsScript);
            window.onerror = null;
            return true;
        }
    }
} else {
    InitModule();
    let cpplibScript = document.createElement('script');
    cpplibScript.src = "src/cpplib.js";
    document.head.appendChild(cpplibScript);
}