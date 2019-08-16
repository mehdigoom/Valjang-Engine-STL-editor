var Module = null;


//======Backend===========
ServerBackend = "Plase set IP and port"

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
        alert("Backend not set. Err : 404")
        retour = " Backend not set.Err: 404 "
    }
    if (ServerBackend = "") {
        alert("Backend not set. Err : Nullset")
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

BDDGetinfoDataBase()

function ValjangGetAPI() {

    const userAction = async() => {
        const response = await fetch('http://Valjang.fr/Api.json');
        const myJson = await response.json(); //extract JSON from the http response
        return (myJson)

    }

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