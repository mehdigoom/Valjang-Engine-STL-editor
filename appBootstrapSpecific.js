function LitCurBrushButton(brushButton) {
    // Unlit all brush buttons that are not selected, and light the other
    // var brushMenu = document.getElementById("brushMenu");
    // if (brushMenu != null)
    // {
    //     var curChild = brushMenu.firstChild;
    //     while (curChild != null)
    //     {
    //         if ((curChild.getAttribute != null) && (curChild.getAttribute("userdata") == "brushButton"))
    //         {
    //             if (curChild != brushButton)
    //             {
    //                 curChild.classList.remove("btn-primary");
    //                 curChild.classList.add("btn-default");
    //             }
    //             else
    //             {
    //                 curChild.classList.add("btn-primary");
    //                 curChild.classList.remove("btn-default");
    //             }
    //         }
    //         curChild = curChild.nextSibling;
    //     }
    // }
}


function SwitchSpinner(switchOnOff) {
    let spinner = document.getElementById('spinner');
    if (spinner != null)
        spinner.style.display = switchOnOff ? "inline" : "none";
}

var meshItemToCreateOrCombine = null;

function SetMeshItemToScene(meshItem) {
    function DoStuffAfterManifoldTest() {
        if (AppSDK_IsSceneEmpty()) // First scene, then no need to prompt for merging or creating a new scene
        {
            AppSDK_CreateNewScene(meshItem);
            UpdateUndoRedoButtonStates();
        } else { // Have to prompt if user want to create a new scene or merge into existing one
            meshItemToCreateOrCombine = meshItem;
            bootbox.dialog({
                message: document.getElementById('CreateOrCombine').innerHTML,
                backdrop: true,
                onEscape: function() {
                    meshItemToCreateOrCombine.delete(); // If the mesh item isn't used, need to delete it (emscripten object)
                }
            });
        }
    }
    if (AppSDK_IsMeshItemManifold(meshItem) == false) {
        bootbox.alert({
            title: "Hazardous mesh input",
            message: "<p>Input mesh is not a closed manifold mesh.</p><p>(A manifold mesh is a mesh that could be represented in \"real life\")</p><p>You will be able to edit the mesh, but you may encounter side effects.</p>",
            backdrop: true,
            callback: function() {
                DoStuffAfterManifoldTest();
            },
            onEscape: function() {
                DoStuffAfterManifoldTest();
            }
        });
    } else
        DoStuffAfterManifoldTest();
}

function SwitchCombineModeUI(onOrOff) {
    if (onOrOff) {

        let combineUI = document.getElementById("combineUI");
        //let mainUI = document.getElementById("mainUI");
        //mainUI.style.display = "none";
        combineUI.style.display = "inline";


    } else {


        let combineUI = document.getElementById("combineUI");
        //let mainUI = document.getElementById("mainUI");

        // mainUI.style.display = "inline";
        combineUI.style.display = "none";

    }
}

function UpdateUndoRedoButtonStates() {
    let undoButton = document.getElementById("undoButton");
    if (undoButton != null) {
        if (AppSDK_CanUndo())
            undoButton.classList.remove("disabled");
        else
            undoButton.classList.add("disabled");
    }
    let redoButton = document.getElementById("redoButton");
    if (redoButton != null) {
        if (AppSDK_CanRedo())
            redoButton.classList.remove("disabled");
        else
            redoButton.classList.add("disabled");
    }
}

function InitGUIRelatedElements() {
    // Top Left
    document.getElementById("fullScreenButton").onclick = function() {
        if (!AppSDK_IsInFullScreen())
            AppSDK_StartFullScreen();
        else
            AppSDK_StopFullscreen();
    };
    // Top right
    document.getElementById("drawButton").onclick = function() {
        AppSDK_UseDrawBrush();
        LitCurBrushButton(this);
    };
    document.getElementById("digButton").onclick = function() {
        AppSDK_UseDigBrush();
        LitCurBrushButton(this);
    };
    document.getElementById("flattenButton").onclick = function() {
        AppSDK_UseFlattenBrush();
        LitCurBrushButton(this);
    };
    document.getElementById("dragButton").onclick = function() {
        AppSDK_UseDragBrush();
        LitCurBrushButton(this);
    };
    let mirrorSwitch = document.getElementById('mirrorSwitch');
    if (mirrorSwitch != null) {
        mirrorSwitch.onchange = function() {
            AppSDK_SwitchMirrorMode(mirrorSwitch.checked);
        };
    }
    // Bottom right
    let sliderStrength = new Slider('#sliderStrength', {
        formatter: function(value) {
            AppSDK_SetSculptingStrengthRatio(value);

        }
    });
    let sliderSize = new Slider('#sliderSize', {
        formatter: function(value) {
            AppSDK_SetSculptingRadiusRatio(value);

        }
    });
    // Bottom left
    document.getElementById("loadButton").onchange = function(event) {
        let input = event.target;
        let files = input.files;
        if (files.length > 0) {
            let f = files[0];
            let reader = new FileReader();
            let filename = f.name;
            console.log("File name: " + filename);
            SwitchSpinner(true);
            reader.onload = function(e) {
                let target = e.target;
                let data = target.result;
                try {
                    SwitchSpinner(false);
                    let meshItem = AppSDK_LoadFromTextBuffer(data, filename);
                    if (meshItem == null) {
                        bootbox.alert({
                            title: "File loading failure",
                            message: "<p> Can't load file " + filename + "</p>",
                            backdrop: true
                        });
                    } else
                        SetMeshItemToScene(meshItem);
                } catch (err) {
                    SwitchSpinner(false);
                    bootbox.alert({
                        title: "File loading failure",
                        message: "<p>The file " + filename + " fails to load. This is most of the time due to the lack of memory.</p><p>On the browser version the memory is <span style=\"text-decoration: underline;\">for the moment</span> limited. You shouldn't be able to load a mesh over one million triangles.</p><p>Please use Unity version if you want to load bigger meshes.</p>",
                        backdrop: true
                    });
                }
            };
            reader.readAsArrayBuffer(f);
            input.value = ""; // To be able to load the same file again (as we are on a "onchange" callback)
        }
    };
    let saveButton = document.getElementById("saveButton");
    saveButton.onclick = function() {
        bootbox.dialog({
            message: document.getElementById('ChoosOutputFormat').innerHTML,
            backdrop: true,
            onEscape: function() {} // So that backdrop works on dialog
        });
    }
    let printButton = document.getElementById("printButton");
    if (printButton != null) {
        printButton.onclick = function() {
            var blob = AppSDK_SaveToBlob('stl');
            astroprint.importDesignByBlob(blob, "application/sla", "output.stl");
        }
    }
    document.getElementById("openButton").onclick = function() {
        bootbox.hideAll();
        bootbox.dialog({

            message: document.getElementById('ChoseObject').innerHTML,
            backdrop: true,
            onEscape: function() {} // So that backdrop works on dialog
        });



    };



    document.getElementById("openObject").onclick = function() {
        bootbox.hideAll();
        bootbox.dialog({

            message: document.getElementById('Chose').innerHTML,
            backdrop: true,
            onEscape: function() {} // So that backdrop works on dialog
        });



    };

    // Undo/redo
    UpdateUndoRedoButtonStates();
    document.getElementById("undoButton").onclick = function() {
        AppSDK_Undo();
        UpdateUndoRedoButtonStates();
    };
    document.getElementById("redoButton").onclick = function() {
        AppSDK_Redo();
        UpdateUndoRedoButtonStates();
    };
    // Combine mode related
    document.getElementById("moveButton").onclick = function() {
        AppSDK_CombineMoveObject();
    };
    document.getElementById("rotateButton").onclick = function() {
        AppSDK_CombineRotateObject();
    };
    document.getElementById("scaleButton").onclick = function() {
        AppSDK_CombineScaleObject();
    };
    document.getElementById("cancelCombineButton").onclick = function() {
        AppSDK_StopCombineToSceneMode();
        SwitchCombineModeUI(false);
    };
    document.getElementById("mergeButton").onclick = function() {
        SwitchSpinner(true);
        AppSDK_CombineCSGMerge();
    };
    document.getElementById("subtractButton").onclick = function() {
        SwitchSpinner(true);
        AppSDK_CombineCSGSubtract();
    };
    document.getElementById("intersectButton").onclick = function() {
        SwitchSpinner(true);
        AppSDK_CombineCSGIntersect();
    };
}
//ex oReq oReq.open("GET", "./3d_models/" + filename, true);
function Load3DModel(filename) {
    let oReq = new XMLHttpRequest();
    oReq.open("GET", filename, true);
    oReq.responseType = "arraybuffer";
    oReq.onload = function(oEvent) {
        let arrayBuffer = oReq.response;
        SetMeshItemToScene(AppSDK_LoadFromTextBuffer(arrayBuffer, filename));
        SwitchSpinner(false);
    };
    oReq.send(null);
}



function getQueryStringValue(key) {
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace("/[\.\+\*]/g", "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

function StartAppMain() {
    // Init GUI
    InitGUIRelatedElements();

    // Init sculpting limit
    AppSDK_SetSculptLimitBoundingPercent(200); // 120%

    // Set camera spin
    AppSDK_SetCameraSpinningSpeed(4); // In degrees per second

    // Create starting model    
    let modelToLoad = getQueryStringValue("model");
    switch (modelToLoad) {
        //model list hear
        case "sphere":
            SetMeshItemToScene(AppSDK_GenSphere());
            break;
        case "box":
            SetMeshItemToScene(AppSDK_GenBox());
            break;
        case "cylinder":
            SetMeshItemToScene(AppSDK_GenCylinder());
            break;
        case "cube":
            SetMeshItemToScene(AppSDK_GenCube());
            break;
        case "pyramid":
            Load3DModel('pyramid.tct');
            break;
        case "disk":
            Load3DModel('disk.tct');
            break;
        case "ring":
            Load3DModel('ring.tct');
            break;
        case "mug":
            Load3DModel('mug.tct');
            break;
        case "head":
            Load3DModel('head.tct');
            break;
        case "girl":
            Load3DModel('girl.tct');
            break;
        case "boy":
            Load3DModel('boy.tct');
            break;
        case "cat":
            Load3DModel('cat.tct');
            break;
        case "gearknob":
            Load3DModel('gearknob.tct');
            break;
        default:
            SetMeshItemToScene(AppSDK_GenSphere());
    }

    // Stop spinner now app is fully loaded and initialized
    SwitchSpinner(false);

    // Undo redo update on mouse up (after sculpting)
    AppSDK_EndStroke = function() {
        UpdateUndoRedoButtonStates();
    }

    // Stuff to do when CSG operation is done
    AppSDK_EndCSGOperation = function() {
        SwitchCombineModeUI(false);
        SwitchSpinner(false);
    }



}