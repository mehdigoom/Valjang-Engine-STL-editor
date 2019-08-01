// ========== Init ==========

function AppSDK_Init()
{
    // Create the game using the 'renderCanvas'
    window.app = new AppMain('renderCanvas');

    // Create the scene
    window.app.createScene();

    // start animation
    window.app.animate();

//ajout d'un delay le temps du chargement des animations 
        var element = document.getElementById("mainUI");
        //element.classList.add("hiden");
        var delayInMilliseconds = 4000;
        setTimeout(function() {
            element.classList.remove("hiden");
          }, delayInMilliseconds);
         






}

// ========== Generate meshItem ==========

function AppSDK_GenSphere() // Return an object holding the mesh
{
    if(window.app != null)
        return window.app.GenSphere();
    return null;
}

function AppSDK_GenBox() // Return an object holding the mesh
{
    if(window.app != null)
        return window.app.GenBox();
    return null;
}

function AppSDK_GenCylinder() // Return an object holding the mesh
{
    if(window.app != null)
        return window.app.GenCylinder();
    return null;
}

function AppSDK_GenCube() // Return an object holding the mesh
{
    if(window.app != null)
        return window.app.GenCube();
    return null;
}

// ========== Load meshItem ==========

function AppSDK_LoadFromTextBuffer(data, filename)  // return an object holding the loaded mesh
{
    let meshLoader = new Module.MeshLoader();
    let meshItem = meshLoader.LoadFromTextBuffer(data, filename);
    meshLoader.delete();
    return meshItem;
}

// ========== Test meshItem ==========

function AppSDK_IsMeshItemManifold(meshItem)    // return true if meshItem is manifold
{
    if(meshItem != null)
        return meshItem.IsManifold();
    return false;
}

// ========== Set meshItem to scene ==========

function AppSDK_IsSceneEmpty()
{
    if(window.app != null)
        return window.app._meshItem == null;
    return false;
}

function AppSDK_CreateNewScene(meshItem)
{
    if(window.app != null)
        window.app.CreateNewScene(meshItem);
}

// ========== Combine mode ==========

function AppSDK_StartCombineToSceneMode(meshItemToCombine)
{
    if(window.app != null)
        window.app.StartCombineToSceneMode(meshItemToCombine)
}

function AppSDK_CombineMoveObject()
{
    if(window.app != null)
        window.app._manipulator.SwitchToMode(ManipulatorMode.Move);
}

function AppSDK_CombineRotateObject()
{
    if(window.app != null)
        window.app._manipulator.SwitchToMode(ManipulatorMode.Rotate);
}

function AppSDK_CombineScaleObject()
{
    if(window.app != null)
        window.app._manipulator.SwitchToMode(ManipulatorMode.Scale);
}

function AppSDK_CombineCSGMerge()
{
    if(window.app != null)
        window.app.CSGMerge();
}

function AppSDK_CombineCSGSubtract()
{
    if(window.app != null)
        window.app.CSGSubtract();
}

function AppSDK_CombineCSGIntersect()
{
    if(window.app != null)
        window.app.CSGIntersect();
}

function AppSDK_StopCombineToSceneMode()
{
    if(window.app != null)
        window.app.StopCombineToSceneMode();
}

// ========== Save current object ==========

function AppSDK_SaveToFile(fileName, fileExt)   // fileName and fileExt are two strings. fileExt could be "stl" or "obj" regarding the file type you want to get. The function will pop a save as file dialog 
{
    if(window.app != null)
        window.app.SaveToFile(fileName, fileExt);
}

function AppSDK_SaveToBlob(fileExt)   // fileExt could be "stl" or "obj" regarding the file type you want to get. The function return a blob containing the data, this way you can handle it yourself. The blob is typed as "application/octet-binary"
{
    if(window.app != null)
        return window.app.SaveToBlob(fileExt);
    return null;
}

// ========== Color ==========

function AppSDK_ChangeColor(color)  // Color is a str.ing in the form "#rrggbb", like #F5BFA8
{
    if(window.app != null)
        window.app.changeColor(color);
}

// ========== Fullscreen ==========

function AppSDK_IsInFullScreen()   // return a boolean, true if fullscreen is on
{
    if(window.app != null)
        return window.app.IsInFullScreen();
    return false;
}

function AppSDK_StartFullScreen()
{
    if(window.app != null)
        window.app.StartFullScreen(document.documentElement);
}

function AppSDK_StopFullscreen()
{
    if(window.app != null)
        window.app.StopFullscreen();
}

// ========== Brush selection ==========

function AppSDK_UseDrawBrush()
{
    if(window.app != null)
        window.app.selectBrushType(BrushType.Draw);
}

function AppSDK_UseDigBrush()
{
    if(window.app != null)
        window.app.selectBrushType(BrushType.Dig);
}

function AppSDK_UseDragBrush()
{
    if(window.app != null)
        window.app.selectBrushType(BrushType.Drag);
}

function AppSDK_UseFlattenBrush()
{
    if(window.app != null)
        window.app.selectBrushType(BrushType.Flatten);
}

// ========== Brush properties ==========

function AppSDK_SetSculptingStrengthRatio(ratio)    // ratio goes from 0.0 to 1.0
{
    if(window.app != null)
        window.app.SetSculptingStrengthRatio(ratio);
}


function AppSDK_SetSculptingRadiusRatio(ratio)    // ratio regarding model size, 1.0 encompass the whole model
{
    if(window.app != null)
        window.app.SetSculptingRadiusRatio(ratio);
}

// ========== Mirror mode ==========

function AppSDK_SwitchMirrorMode(onOrOff)   // true to turn mirror mode on
{
    Module.SculptEngine.SetMirrorMode(onOrOff);
}

function AppSDK_IsMirrorModeActivated() // Return true if mirror mode is on
{
    return Module.SculptEngine.IsMirrorModeActivated();
}

// ========== Undo / redo ==========

function AppSDK_CanUndo()  // Return true if undo is possible
{
    if((window.app != null) && (window.app.GetCurMeshItem() != null))
        return window.app.GetCurMeshItem().CanUndo();
    return false;
}

function AppSDK_CanRedo()  // Return true if redo is possible
{
    if((window.app != null) && (window.app.GetCurMeshItem() != null))
        return window.app.GetCurMeshItem().CanRedo();
    return false;
}

function AppSDK_Undo()
{
    if((window.app != null) && (window.app.GetCurMeshItem() != null))
    {
        window.app.GetCurMeshItem().Undo();
        window.app.UpdateValjangEngineMesh();
    }
}

function AppSDK_Redo()
{
    if((window.app != null) && (window.app.GetCurMeshItem() != null))
    {
        window.app.GetCurMeshItem().Redo();
        window.app.UpdateValjangEngineMesh();
    }
}

// ========== sculpt limit ==========
function AppSDK_SetSculptLimitBoundingPercent(limit)   // Put a value over 100 (corresponding to 100%) to activate it
{
    if(window.app != null)
        window.app.SetSculptLimitBoundingPercent(limit);
}

// ========== camera related ==========
function AppSDK_SetCameraSpinningSpeed(speed) // speed is in degrees per second
{
    if(window.app != null)
        window.app.SetCameraSpinningSpeed(speed);
}

// ========== Link to some event ==========

var AppSDK_EndStroke = function () { }
var AppSDK_EndCSGOperation = function () { }
