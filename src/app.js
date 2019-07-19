var ManipulatorMode;
var activmanipulator= Boolean("true");
var raduislimit
var Ymax
var Ysize
(function (ManipulatorMode) {
    ManipulatorMode[ManipulatorMode["Move"] = 0] = "Move";
    ManipulatorMode[ManipulatorMode["Rotate"] = 1] = "Rotate";
    ManipulatorMode[ManipulatorMode["Scale"] = 2] = "Scale";
})(ManipulatorMode || (ManipulatorMode = {}));
var Manipulator = /** @class */ (function () {
    function Manipulator(engine, scene, camera) {
        this._scene = scene;
        this._engine = engine;
        this._camera = camera;
        this._selectedMeshMaterial = new ValjangEngine.StandardMaterial("meshMaterial", this._scene);
        this._selectedMeshMaterial.ambientColor = new ValjangEngine.Color3(0.0 / 255.0, 0.0 / 255.0, 0.0 / 255.0);
        this._selectedMeshMaterial.emissiveColor = new ValjangEngine.Color3(0.0 / 255.0, 0.0 / 255.0, 255.0 / 255.0);
        this._selectedMeshMaterial.diffuseColor = new ValjangEngine.Color3(255.0 / 255.0, 255.0 / 255.0, 255.0 / 255.0);
        this._selectedMeshMaterial.specularColor = new ValjangEngine.Color3(200.0 / 255.0, 200.0 / 255.0, 200.0 / 255.0);
        this._selectedMeshMaterial.specularPower = 1000;
        this._selectedMeshMaterial.backFaceCulling = true;
        this._selectedMeshMaterial.freeze();
        this._xDirMeshMaterial = new ValjangEngine.StandardMaterial("xDirMeshMaterial", this._scene);
        this._xDirMeshMaterial.diffuseColor = new ValjangEngine.Color3(1.0, 0.0, 0.0);
        this._xDirMeshMaterial.freeze();
        this._yDirMeshMaterial = new ValjangEngine.StandardMaterial("yDirMeshMaterial", this._scene);
        this._yDirMeshMaterial.diffuseColor = new ValjangEngine.Color3(0.0, 1.0, 0.0);
        this._yDirMeshMaterial.freeze();
        this._zDirMeshMaterial = new ValjangEngine.StandardMaterial("zDirMeshMaterial", this._scene);
        this._zDirMeshMaterial.diffuseColor = new ValjangEngine.Color3(0.0, 0.0, 1.0);
        this._zDirMeshMaterial.freeze();
        this._allDirMeshMaterial = new ValjangEngine.StandardMaterial("allDirMeshMaterial", this._scene);
        this._allDirMeshMaterial.diffuseColor = new ValjangEngine.Color3(1.0, 1.0, 0.0);
        this._allDirMeshMaterial.freeze();
        this._mode = ManipulatorMode.Move;







    }
    Manipulator.prototype.Start = function () {
        this._mode = ManipulatorMode.Move;
        this.StartMode(this._mode);
        
    };
    Manipulator.prototype.Stop = function () {
        this.StopMode(this._mode);
        this._curSelectedMesh = null;
        this._forcedMeshSelect = null;
    };
    Manipulator.prototype.onPointerDown = function (e, p) {
        var pickResult = p; //this._scene.pick(e.clientX, e.clientY);
        switch (this._mode) {
            case ManipulatorMode.Move:
                if ((pickResult.pickedMesh != null) && ((pickResult.pickedMesh == this._forcedMeshSelect) || (this._forcedMeshSelect == null))) {
                    this._pickResult = pickResult;
                    this._pickDeltaFromMeshOrigin = pickResult.pickedPoint.subtract(pickResult.pickedMesh.position); // Get delta from pick point to mesh origin, will be used when moving cursor
                    this._camera.detachControl(this._engine.getRenderingCanvas()); // Block camera
                }
                break;
            case ManipulatorMode.Rotate:
                if ((pickResult.pickedMesh != null) && ((pickResult.pickedMesh == this._meshRotPitch) || (pickResult.pickedMesh == this._meshRotYaw) || (pickResult.pickedMesh == this._meshRotRoll))) {
                    this._pickResult = pickResult;
                    this._pickDeltaFromMeshOrigin = pickResult.pickedPoint.subtract(pickResult.pickedMesh.position); // Get delta from pick point to manipulator origin, will be used when rotating on pitch/yaw
                    this._camera.detachControl(this._engine.getRenderingCanvas()); // Block camera
                    if (this._curSelectedMesh.rotationQuaternion != null)
                        this._initialRot = this._curSelectedMesh.rotationQuaternion.clone();
                    else
                        this._initialRot = new ValjangEngine.Quaternion();
                }
                break;
            case ManipulatorMode.Scale:
                if ((pickResult.pickedMesh != null) && ((pickResult.pickedMesh == this._meshScaleX) || (pickResult.pickedMesh == this._meshScaleY) || (pickResult.pickedMesh == this._meshScaleZ) || (pickResult.pickedMesh == this._meshScaleAll))) {
                    this._pickResult = pickResult;
                    this._camera.detachControl(this._engine.getRenderingCanvas()); // Block camera
                    this._initialScale = this._curSelectedMesh.scaling.clone();
                }
                break;
        }
    };
    Manipulator.prototype.onPointerMove = function (e, p) {
        if ((this._pickResult != null) && (this._pickResult.pickedMesh != null)) {
            switch (this._mode) {
                case ManipulatorMode.Move:
                    {
                        var curPickRay = this._scene.createPickingRay(e.clientX, e.clientY, null, this._camera);
                        // Project current object position onto mouse ray
                        var origToCurPos = this._pickResult.pickedMesh.position.add(this._pickDeltaFromMeshOrigin).subtract(curPickRay.origin);
                        var projPos = curPickRay.origin.add(curPickRay.direction.scale(origToCurPos.length()));
                        this._pickResult.pickedMesh.position = projPos.subtract(this._pickDeltaFromMeshOrigin);
                    }
                    break;
                case ManipulatorMode.Rotate:
                    {
                        var curPickRay = this._scene.createPickingRay(e.clientX, e.clientY, null, this._camera);
                        var curDraggedPickPoint = curPickRay.origin.add(curPickRay.direction.scale(this._pickResult.distance));
                        var updateManipulatorsTransforms = false;
                        var dirMeshOriginToPickOrigin = this._pickResult.pickedPoint.subtract(this._curSelectedMesh.position).normalize();
                        var dirMeshOriginToCurDraggedPoint = curDraggedPickPoint.subtract(this._curSelectedMesh.position).normalize();
                        var dot = ValjangEngine.Vector3.Dot(dirMeshOriginToPickOrigin, dirMeshOriginToCurDraggedPoint);
                        if (dot < 1.0) {
                            var angle = Math.acos(dot);
                            var cross = ValjangEngine.Vector3.Cross(dirMeshOriginToPickOrigin, dirMeshOriginToCurDraggedPoint);
                            if (this._pickResult.pickedMesh == this._meshRotPitch) {
                                // Check if we are rotating clockwize or not and modify angle accordingly
                                var xAxis = this._curSelectedMesh.getWorldMatrix().getRow(0).toVector3();
                                xAxis.normalize();
                                if (ValjangEngine.Vector3.Dot(xAxis, cross) < 0.0)
                                    angle = -angle;
                                // Rotate selected mesh
                                var pitchQuat = ValjangEngine.Quaternion.RotationYawPitchRoll(0.0, angle, 0.0);
                                this._curSelectedMesh.rotationQuaternion = this._initialRot.multiply(pitchQuat);
                                updateManipulatorsTransforms = true;
                            }
                            else if (this._pickResult.pickedMesh == this._meshRotYaw) {
                                // Check if we are rotating clockwize or not and modify angle accordingly
                                var yAxis = this._curSelectedMesh.getWorldMatrix().getRow(1).toVector3();
                                yAxis.normalize();
                                if (ValjangEngine.Vector3.Dot(yAxis, cross) < 0.0)
                                    angle = -angle;
                                // Rotate selected mesh
                                var yawQuat = ValjangEngine.Quaternion.RotationYawPitchRoll(angle, 0.0, 0.0);
                                this._curSelectedMesh.rotationQuaternion = this._initialRot.multiply(yawQuat);
                                updateManipulatorsTransforms = true;
                            }
                            else if (this._pickResult.pickedMesh == this._meshRotRoll) {
                                // Check if we are rotating clockwize or not and modify angle accordingly
                                var zAxis = this._curSelectedMesh.getWorldMatrix().getRow(2).toVector3();
                                zAxis.normalize();
                                if (ValjangEngine.Vector3.Dot(zAxis, cross) < 0.0)
                                    angle = -angle;
                                // Rotate selected mesh
                                var rollQuat = ValjangEngine.Quaternion.RotationYawPitchRoll(0.0, 0.0, angle);
                                this._curSelectedMesh.rotationQuaternion = this._initialRot.multiply(rollQuat);
                                updateManipulatorsTransforms = true;
                            }
                        }
                        if (updateManipulatorsTransforms) {
                            if (this._meshRotPitch.rotationQuaternion == null)
                                this._meshRotPitch.rotationQuaternion = this._curSelectedMesh.rotationQuaternion.clone();
                            else
                                this._meshRotPitch.rotationQuaternion.copyFrom(this._curSelectedMesh.rotationQuaternion);
                            if (this._meshRotYaw.rotationQuaternion == null)
                                this._meshRotYaw.rotationQuaternion = this._curSelectedMesh.rotationQuaternion.clone();
                            else
                                this._meshRotYaw.rotationQuaternion.copyFrom(this._curSelectedMesh.rotationQuaternion);
                            if (this._meshRotRoll.rotationQuaternion == null)
                                this._meshRotRoll.rotationQuaternion = this._curSelectedMesh.rotationQuaternion.clone();
                            else
                                this._meshRotRoll.rotationQuaternion.copyFrom(this._curSelectedMesh.rotationQuaternion);
                            if (this._meshScaleX.rotationQuaternion == null)
                                this._meshScaleX.rotationQuaternion = this._curSelectedMesh.rotationQuaternion.clone();
                            else
                                this._meshScaleX.rotationQuaternion.copyFrom(this._curSelectedMesh.rotationQuaternion);
                            if (this._meshScaleY.rotationQuaternion == null)
                                this._meshScaleY.rotationQuaternion = this._curSelectedMesh.rotationQuaternion.clone();
                            else
                                this._meshScaleY.rotationQuaternion.copyFrom(this._curSelectedMesh.rotationQuaternion);
                            if (this._meshScaleZ.rotationQuaternion == null)
                                this._meshScaleZ.rotationQuaternion = this._curSelectedMesh.rotationQuaternion.clone();
                            else
                                this._meshScaleZ.rotationQuaternion.copyFrom(this._curSelectedMesh.rotationQuaternion);
                            if (this._meshScaleAll.rotationQuaternion == null)
                                this._meshScaleAll.rotationQuaternion = this._curSelectedMesh.rotationQuaternion.clone();
                            else
                                this._meshScaleAll.rotationQuaternion.copyFrom(this._curSelectedMesh.rotationQuaternion);
                        }
                    }
                    break;
                case ManipulatorMode.Scale:
                    {
                        var curPickRay = this._scene.createPickingRay(e.clientX, e.clientY, null, this._camera);
                        var curDraggedPickPoint = curPickRay.origin.add(curPickRay.direction.scale(this._pickResult.distance));
                        var curPickOriginToDraggedPickPoint = curDraggedPickPoint.subtract(this._pickResult.pickedPoint);
                        var meshBsphere = this._curSelectedMesh.getBoundingInfo().boundingSphere;
                        var realRadius = meshBsphere.radius / Math.sqrt(3.0); // ValjangEngine bsphere radius is incorrect
                        if (this._pickResult.pickedMesh == this._meshScaleX) {
                            // Project onto "right" dir
                            var xAxis = this._curSelectedMesh.getWorldMatrix().getRow(0).toVector3();
                            xAxis.normalize();
                            var dot = ValjangEngine.Vector3.Dot(xAxis, curPickOriginToDraggedPickPoint);
                            var resultingAbsoluteScale = dot / realRadius;
                            // Scale selected mesh
                            this._curSelectedMesh.scaling.x = Math.max(0.001, this._initialScale.x + resultingAbsoluteScale);
                            this._meshScaleX.scaling.x = this._curSelectedMesh.scaling.x;
                        }
                        else if (this._pickResult.pickedMesh == this._meshScaleY) {
                            // Project onto "up" dir
                            var yAxis = this._curSelectedMesh.getWorldMatrix().getRow(1).toVector3();
                            yAxis.normalize();
                            var dot = ValjangEngine.Vector3.Dot(yAxis, curPickOriginToDraggedPickPoint);
                            var resultingAbsoluteScale = dot / realRadius;
                            // Scale selected mesh
                            this._curSelectedMesh.scaling.y = Math.max(0.001, this._initialScale.y + resultingAbsoluteScale);
                            this._meshScaleY.scaling.y = this._curSelectedMesh.scaling.y;
                        }
                        else if (this._pickResult.pickedMesh == this._meshScaleZ) {
                            // Project onto "at" dir
                            var zAxis = this._curSelectedMesh.getWorldMatrix().getRow(2).toVector3();
                            zAxis.normalize();
                            var dot = ValjangEngine.Vector3.Dot(zAxis, curPickOriginToDraggedPickPoint);
                            var resultingAbsoluteScale = dot / realRadius;
                            // Scale selected mesh
                            this._curSelectedMesh.scaling.z = Math.max(0.001, this._initialScale.z + resultingAbsoluteScale);
                            this._meshScaleZ.scaling.z = this._curSelectedMesh.scaling.z;
                        }
                        else if (this._pickResult.pickedMesh == this._meshScaleAll) {
                            // Project onto skew dir (blend of at, up and right)
                            var xAxis = this._curSelectedMesh.getWorldMatrix().getRow(0).toVector3();
                            xAxis.x /= this._curSelectedMesh.scaling.x;
                            var yAxis = this._curSelectedMesh.getWorldMatrix().getRow(1).toVector3();
                            yAxis.y /= this._curSelectedMesh.scaling.y;
                            var zAxis = this._curSelectedMesh.getWorldMatrix().getRow(2).toVector3();
                            zAxis.z /= this._curSelectedMesh.scaling.z;
                            var skewAxis = xAxis;
                            skewAxis.addInPlace(yAxis);
                            skewAxis.addInPlace(zAxis);
                            skewAxis.scaleInPlace(1.0 / 3.0); // Normalize
                            var dot = ValjangEngine.Vector3.Dot(skewAxis, curPickOriginToDraggedPickPoint);
                            var resultingAbsoluteScale = dot / realRadius;
                            // Scale selected mesh
                            this._curSelectedMesh.scaling.x = Math.max(0.001, this._initialScale.x + resultingAbsoluteScale);
                            this._curSelectedMesh.scaling.y = Math.max(0.001, this._initialScale.y + resultingAbsoluteScale);
                            this._curSelectedMesh.scaling.z = Math.max(0.001, this._initialScale.z + resultingAbsoluteScale);
                            this._meshScaleX.scaling.x = this._curSelectedMesh.scaling.x;
                            this._meshScaleY.scaling.y = this._curSelectedMesh.scaling.y;
                            this._meshScaleZ.scaling.z = this._curSelectedMesh.scaling.z;
                        }
                    }
                    break;
            }
        }
    };
    Manipulator.prototype.onPointerUp = function (e, p) {
        switch (this._mode) {
            case ManipulatorMode.Move:
                if (this._pickResult != null) {
                    this._pickResult = null;
                    this._camera.attachControl(this._engine.getRenderingCanvas(), true);
                }
                break;
            case ManipulatorMode.Rotate:
                if (this._pickResult != null) {
                    this._pickResult = null;
                    this._camera.attachControl(this._engine.getRenderingCanvas(), true);
                }
                break;
            case ManipulatorMode.Scale:
                if (this._pickResult != null) {
                    this._pickResult = null;
                    this._camera.attachControl(this._engine.getRenderingCanvas(), true);
                }
                break;
        }
    };
    Manipulator.prototype.ForceMeshSelection = function (mesh) {
        
        this._forcedMeshSelect = mesh;
        this.SelectObject(mesh);
    };
    Manipulator.prototype.SwitchToMode = function (mode) {
        this.StopMode(this._mode);
        this._mode = mode;
        this.StartMode(this._mode);
        
    };
    Manipulator.prototype.StartMode = function (mode) {
        switch (mode) {
            case ManipulatorMode.Move:
                this._curSelectedMesh.isPickable = true;
                break;
            case ManipulatorMode.Rotate:
                {
                    this._curSelectedMesh.isPickable = false;
                    var meshBsphere = this._curSelectedMesh.getBoundingInfo().boundingSphere;
                    var realRadius = meshBsphere.radius / Math.sqrt(3.0); // ValjangEngine bsphere radius is incorrect
                    // Pitch, yaw and roll manipulator
                    this._meshRotPitch.setAbsolutePosition(this._curSelectedMesh.getAbsolutePosition());
                    this._meshRotPitch.isVisible = true;
                    this._meshRotYaw.setAbsolutePosition(this._curSelectedMesh.getAbsolutePosition());
                    this._meshRotYaw.isVisible = true;
                    this._meshRotRoll.setAbsolutePosition(this._curSelectedMesh.getAbsolutePosition());
                    this._meshRotRoll.isVisible = true;
                    
                }
                break;
            case ManipulatorMode.Scale:
                {
                    this._curSelectedMesh.isPickable = false;
                    // Scale X manipulator
                    this._meshScaleX.setAbsolutePosition(this._curSelectedMesh.getAbsolutePosition());
                    this._meshScaleX.isVisible = true;
                    // Scale Y manipulator
                    this._meshScaleY.setAbsolutePosition(this._curSelectedMesh.getAbsolutePosition());
                    this._meshScaleY.isVisible = true;
                    // Scale Z manipulator
                    this._meshScaleZ.setAbsolutePosition(this._curSelectedMesh.getAbsolutePosition());
                    this._meshScaleZ.isVisible = true;
                    // Scale all manipulator
                    this._meshScaleAll.setAbsolutePosition(this._curSelectedMesh.getAbsolutePosition());
                    this._meshScaleAll.isVisible = true;
                }
                break;
        }
    };
    Manipulator.prototype.StopMode = function (mode) {
        switch (mode) {
            case ManipulatorMode.Move:
                // Nothing to do
                break;
            case ManipulatorMode.Rotate:
                if (this._meshRotPitch != null)
                    this._meshRotPitch.isVisible = false;
                if (this._meshRotYaw != null)
                    this._meshRotYaw.isVisible = false;
                if (this._meshRotRoll != null)
                    this._meshRotRoll.isVisible = false;
                break;
            case ManipulatorMode.Scale:
                if (this._meshScaleX != null)
                    this._meshScaleX.isVisible = false;
                if (this._meshScaleY != null)
                    this._meshScaleY.isVisible = false;
                if (this._meshScaleZ != null)
                    this._meshScaleZ.isVisible = false;
                if (this._meshScaleAll != null)
                    this._meshScaleAll.isVisible = false;
                break;
        }
    };
    Manipulator.prototype.SelectObject = function (mesh) {
        mesh.material = this._selectedMeshMaterial;
        this._curSelectedMesh = mesh;
        // Create manipulator meshes
        var meshBbox = this._curSelectedMesh.getBoundingInfo().boundingBox;
        var sideMaxExtend = Math.max(meshBbox.extendSize.x, meshBbox.extendSize.y);
        var minExtend = Math.min(Math.min(meshBbox.extendSize.x, meshBbox.extendSize.y), meshBbox.extendSize.z);
        var pitchYawRollThicknessRatio = 0.2;
        // Pitch manipulator
        if (this._meshRotPitch != null) {
            this._meshRotPitch.dispose();
            this._meshRotPitch = null;
        }
        this._meshRotPitch = ValjangEngine.Mesh.CreateTorus("meshRotPitch", sideMaxExtend * 2.0, sideMaxExtend * pitchYawRollThicknessRatio, 32, this._scene, false);
        this._meshRotPitch.setPivotMatrix(ValjangEngine.Matrix.RotationZ(Math.PI / 2.0));
        this._meshRotPitch.renderingGroupId = 1;
        this._meshRotPitch.material = this._xDirMeshMaterial;
        this._meshRotPitch.isVisible = false;
        // Yaw manipulator
        if (this._meshRotYaw != null) {
            this._meshRotYaw.dispose();
            this._meshRotYaw = null;
        }
        this._meshRotYaw = ValjangEngine.Mesh.CreateTorus("meshRotPitch", sideMaxExtend * 2.0, sideMaxExtend * pitchYawRollThicknessRatio, 32, this._scene, false);
        this._meshRotYaw.renderingGroupId = 1;
        this._meshRotYaw.material = this._yDirMeshMaterial;
        this._meshRotYaw.isVisible = false;
        // Roll manipulator
        if (this._meshRotRoll != null) {
            this._meshRotRoll.dispose();
            this._meshRotRoll = null;
        }
        this._meshRotRoll = ValjangEngine.Mesh.CreateTorus("meshRotRoll", sideMaxExtend * 2.0, sideMaxExtend * pitchYawRollThicknessRatio, 32, this._scene, false);
        this._meshRotRoll.setPivotMatrix(ValjangEngine.Matrix.RotationX(Math.PI / 2.0));
        this._meshRotRoll.renderingGroupId = 1;
        this._meshRotRoll.material = this._zDirMeshMaterial;
        this._meshRotRoll.isVisible = false;
        // Scale X manipulator
        if (this._meshScaleX != null) {
            this._meshScaleX.dispose();
            this._meshScaleX = null;
        }
        var axisTipSizeRatio = 0.4;
        var scaleAllSizeRatio = 0.5;
        this._meshScaleX = ValjangEngine.Mesh.CreateCylinder("meshScaleX", meshBbox.extendSize.x, 0, minExtend * axisTipSizeRatio, 32, 1, this._scene, false);
        var pivotTranslate = ValjangEngine.Matrix.Translation(0, -meshBbox.extendSize.x / 2.0, 0);
        var pivotRot = ValjangEngine.Matrix.RotationZ(Math.PI / 2.0);
        this._meshScaleX.setPivotMatrix(pivotTranslate.multiply(pivotRot));
        this._meshScaleX.renderingGroupId = 1; // To avoid z-buffer test
        this._meshScaleX.material = this._xDirMeshMaterial;
        this._meshScaleX.isVisible = false;
        // Scale Y manipulator
        if (this._meshScaleY != null) {
            this._meshScaleY.dispose();
            this._meshScaleY = null;
        }
        this._meshScaleY = ValjangEngine.Mesh.CreateCylinder("meshScaleY", meshBbox.extendSize.y, 0, minExtend * axisTipSizeRatio, 32, 1, this._scene, false);
        pivotTranslate = ValjangEngine.Matrix.Translation(0, -meshBbox.extendSize.y / 2.0, 0);
        pivotRot = ValjangEngine.Matrix.RotationX(Math.PI);
        this._meshScaleY.setPivotMatrix(pivotTranslate.multiply(pivotRot));
        this._meshScaleY.renderingGroupId = 1;
        this._meshScaleY.material = this._yDirMeshMaterial;
        this._meshScaleY.isVisible = false;
        // Scale Z manipulator
        if (this._meshScaleZ != null) {
            this._meshScaleZ.dispose();
            this._meshScaleZ = null;
        }
        this._meshScaleZ = ValjangEngine.Mesh.CreateCylinder("meshScaleZ", meshBbox.extendSize.z, 0, minExtend * axisTipSizeRatio, 32, 1, this._scene, false);
        pivotTranslate = ValjangEngine.Matrix.Translation(0, -meshBbox.extendSize.z / 2.0, 0);
        pivotRot = ValjangEngine.Matrix.RotationX(-Math.PI / 2.0);
        this._meshScaleZ.setPivotMatrix(pivotTranslate.multiply(pivotRot));
        this._meshScaleZ.renderingGroupId = 1;
        this._meshScaleZ.material = this._zDirMeshMaterial;
        this._meshScaleZ.isVisible = false;
        // Scale all manipulator
        if (this._meshScaleAll != null) {
            this._meshScaleAll.dispose();
            this._meshScaleAll = null;
        }
        this._meshScaleAll = ValjangEngine.Mesh.CreateSphere("meshScaleAll", 16, minExtend * scaleAllSizeRatio, this._scene, false);
        var manipulatorOffset = this._meshScaleAll.getBoundingInfo().boundingBox.extendSize.scale(-0.5);
        this._meshScaleAll.setPivotMatrix(ValjangEngine.Matrix.Translation(manipulatorOffset.x, manipulatorOffset.y, manipulatorOffset.z));
        this._meshScaleAll.renderingGroupId = 1;
        this._meshScaleAll.material = this._allDirMeshMaterial;
        this._meshScaleAll.isVisible = false;
        
    };
    return Manipulator;
}());
var ValjangEngineSubMesh = /** @class */ (function () {
    function ValjangEngineSubMesh(scene, parentNode, subMesh, material) {
        this._subMesh = subMesh;
        this._ID = subMesh.GetID();
        this._versionNumber = subMesh.GetVersionNumber();
        this._ValjangEnginesMesh = new ValjangEngine.Mesh("subMesh-" + this._ID, scene, parentNode);
        this._ValjangEnginesMesh.freezeWorldMatrix();
        if (material != null) {
            this._ValjangEnginesMesh.material = material;
            this._ValjangEnginesMesh.material.freeze();
        }
        
        var meshData = new ValjangEngine.VertexData();
        var buf = this._subMesh.Triangles();
        var triangles = new Uint32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
        buf = this._subMesh.Vertices();
        var vertices = new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
        buf = this._subMesh.Normals();
        var normals = new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
        meshData.indices = triangles;
        meshData.positions = vertices;
        meshData.normals = normals;
        this._ValjangEnginesMesh.sideOrientation = ValjangEngine.Mesh.FRONTSIDE;
        this._ValjangEnginesMesh.isPickable = false;
        meshData.applyToMesh(this._ValjangEnginesMesh, true);
    }
    ValjangEngineSubMesh.prototype.Cleanup = function () {
        this._subMesh.delete();
        this._subMesh = null;
        this._ValjangEnginesMesh.dispose();
        this._ValjangEnginesMesh = null;
    };
    ValjangEngineSubMesh.prototype.Update = function () {
      
        var curVersionNumber = this._subMesh.GetVersionNumber();
        if (this._versionNumber != curVersionNumber) {
            this._versionNumber = curVersionNumber;
            this.UpdataMeshData();
            
        }
    };
    ValjangEngineSubMesh.prototype.UpdataMeshData = function () {
        var buf = this._subMesh.Triangles();
        var triangles = new Uint32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
        buf = this._subMesh.Vertices();
        var vertices = new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
        buf = this._subMesh.Normals();
        var normals = new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
        // Vertices and normals
        if (this._ValjangEnginesMesh._geometry.getTotalVertices() < vertices.length / 3) {
            this._ValjangEnginesMesh.setVerticesData(ValjangEngine.VertexBuffer.PositionKind, vertices, true);
            this._ValjangEnginesMesh.setVerticesData(ValjangEngine.VertexBuffer.NormalKind, normals, true);
        }
        else {
            this._ValjangEnginesMesh.updateVerticesData(ValjangEngine.VertexBuffer.PositionKind, vertices, false, false);
            this._ValjangEnginesMesh.updateVerticesData(ValjangEngine.VertexBuffer.NormalKind, normals, false, false);
        }
        // Triangle indices
        this._ValjangEnginesMesh.setIndices(triangles);
    };
    ValjangEngineSubMesh.prototype.GetID = function () {
        return this._ID;
    };
    return ValjangEngineSubMesh;
}());
/// <reference path="Manipulator.ts"/>
/// <reference path="SubMesh.ts"/>
var BrushType;
(function (BrushType) {
    BrushType[BrushType["Draw"] = 0] = "Draw";
    BrushType[BrushType["Flatten"] = 1] = "Flatten";
    BrushType[BrushType["Drag"] = 2] = "Drag";
    BrushType[BrushType["Dig"] = 3] = "Dig";
})(BrushType || (BrushType = {}));
var CsgType;
(function (CsgType) {
    CsgType[CsgType["Merge"] = 0] = "Merge";
    CsgType[CsgType["Subtract"] = 1] = "Subtract";
    CsgType[CsgType["Intersect"] = 2] = "Intersect";
})(CsgType || (CsgType = {}));
// Get URL parameters
/*function getQueryStringValue(key)
{
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace("/[\.\+\*]/g", "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}*/
// App class
var AppMain = /** @class */ (function () {
    function AppMain(canvasElement) {
        this._isInCombineMode = false;
        this._uiCursorScreenPos = ValjangEngine.Vector2.Zero();
        this._sculpting = false;
        this._brushType = BrushType.Draw;
        this._revert = false;
        this._modelRadius = 1;
        this._sculptingRadius = 0.12;
        this._sculptingStrengthRatio = 0.5;
        this._uiSculptingSize = 0.12;
        this._fullScreen = false;
        this._rayLength = 3.402823466e+38;
        this._useSubMeshes = false;
        this._ValjangEngineSubMeshes = {}; // map submesh ID to submesh
        this._sculptLimitBoundingPercent = 0.0;
        this._cameraSpinningSpeed = 0.0; // In degrees per second
        this._cameraHasToSpin = false;
        if (Module.SculptEngine.HasExpired())
            alert("Product has expired on " + Module.SculptEngine.GetExpirationDate() + "\nIt won't function anymore, please update your version.");
        // Create canvas and engine
        this._canvas = document.getElementById(canvasElement);
        this._engine = new ValjangEngine.Engine(this._canvas, true);
    }
    AppMain.prototype.SetSculptingStrengthRatio = function (ratio) {
        this._sculptingStrengthRatio = ratio;
    };
    AppMain.prototype.SetSculptingRadiusRatio = function (ratio) {
        ratio = this.clamp(ratio, 0.01, 1.0);
        this._uiSculptingSize = ratio;
        this._sculptingRadius = this._modelRadius * this._uiSculptingSize;
    };
    AppMain.prototype.selectBrushType = function (brushType) {
        this._brushType = brushType;
    };
    AppMain.prototype.changeColor = function (color) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
        var colorRed = parseInt(result[1], 16);
        var colorGreen = parseInt(result[2], 16);
        var colorBlue = parseInt(result[3], 16);
        this._mesh.material.unfreeze();
        if (color == "#F0DCC8")
            this._mesh.material.emissiveColor = new ValjangEngine.Color3(50.0 / 255.0, 25.0 / 255.0, 0.0 / 255.0);
        else
            this._mesh.material.emissiveColor = new ValjangEngine.Color3(colorRed / (255 * 15), colorGreen / (255 * 15), colorBlue / (255 * 15));
        this._mesh.material.diffuseColor = new ValjangEngine.Color3(colorRed / 255, colorGreen / 255, colorBlue / 255);
        setTimeout(function () {
            this._mesh.material.freeze();
        }, 100);
    };
    AppMain.prototype.IsInFullScreen = function () {
        return this._fullScreen;
    };
    AppMain.prototype.StartFullScreen = function (element) {
        if (!this._fullScreen) {
            this._fullScreen = true;
            if (element.requestFullscreen)
                element.requestFullscreen();
            else if (element.mozRequestFullScreen)
                element.mozRequestFullScreen();
            else if (element.webkitRequestFullscreen)
                element.webkitRequestFullscreen();
            else if (element.msRequestFullscreen)
                element.msRequestFullscreen();
        }
    };
    AppMain.prototype.StopFullscreen = function () {
        if (this._fullScreen) {
            this._fullScreen = true;
            if (document.exitFullscreen)
                document.exitFullscreen();
            else if (document.mozCancelFullScreen)
                document.mozCancelFullScreen();
            else if (document.webkitExitFullscreen)
                document.webkitExitFullscreen();
        }
    };
    AppMain.prototype.showBBoxes = function () {
        this._DEBUG_BoundingBoxRenderer.reset();
        var bboxes = this._meshItem.GetFragmentsBBox();
        for (var i = 0; i < bboxes.size(); ++i) {
            var bbox = bboxes.get(i);
            var bMin = bbox.Min();
            var bMax = bbox.Max();
            this._DEBUG_BoundingBoxRenderer.renderList.push(new ValjangEngine.BoundingBox(new ValjangEngine.Vector3(bMin.X(), bMin.Y(), bMin.Z()), new ValjangEngine.Vector3(bMax.X(), bMax.Y(), bMax.Z())));
        }
        bboxes.delete();
    };
    AppMain.prototype.CreateUIRingCursor = function () {
        // Create wireframe ring (diameter 1.0)
        
        var nbSegments = 100;
        var stepAngle = (2.0 * Math.PI) / nbSegments;
        var circleVertices = [];
        var curAngle = 0.0;
        for (var i = 0; i <= nbSegments; ++i, curAngle += stepAngle)
            circleVertices.push(new ValjangEngine.Vector3(Math.cos(curAngle), 0.0, Math.sin(curAngle)));
        // Register it to ValjangEngine
        this._uiRingCursor = ValjangEngine.Mesh.CreateLines("UIRingCursor", circleVertices, this._scene);
        this._uiRingCursor.renderingGroupId = 1; // To avoid z-buffer test
        this._uiRingCursor.isVisible = true; // Hidden while an object isn't set in the scene
        
    };
    AppMain.prototype.CreateUISculptBoundary = function (bounds) {
        // Create wireframe box
        var bMin = bounds.Min();
        var bMax = bounds.Max();
        var boxVertices = [];
        boxVertices.push(new ValjangEngine.Vector3(bMin.X(), bMin.Y(), bMin.Z()));
        boxVertices.push(new ValjangEngine.Vector3(bMin.X(), bMax.Y(), bMin.Z()));
        boxVertices.push(new ValjangEngine.Vector3(bMax.X(), bMax.Y(), bMin.Z()));
        boxVertices.push(new ValjangEngine.Vector3(bMax.X(), bMin.Y(), bMin.Z()));
        boxVertices.push(new ValjangEngine.Vector3(bMin.X(), bMin.Y(), bMin.Z()));
        boxVertices.push(new ValjangEngine.Vector3(bMin.X(), bMin.Y(), bMax.Z()));
        boxVertices.push(new ValjangEngine.Vector3(bMin.X(), bMax.Y(), bMax.Z()));
        boxVertices.push(new ValjangEngine.Vector3(bMin.X(), bMax.Y(), bMin.Z()));
        boxVertices.push(new ValjangEngine.Vector3(bMin.X(), bMax.Y(), bMax.Z()));
        boxVertices.push(new ValjangEngine.Vector3(bMax.X(), bMax.Y(), bMax.Z()));
        boxVertices.push(new ValjangEngine.Vector3(bMax.X(), bMax.Y(), bMin.Z()));
        boxVertices.push(new ValjangEngine.Vector3(bMax.X(), bMax.Y(), bMax.Z()));
        boxVertices.push(new ValjangEngine.Vector3(bMax.X(), bMin.Y(), bMax.Z()));
        boxVertices.push(new ValjangEngine.Vector3(bMax.X(), bMin.Y(), bMin.Z()));
        boxVertices.push(new ValjangEngine.Vector3(bMax.X(), bMin.Y(), bMax.Z()));
        boxVertices.push(new ValjangEngine.Vector3(bMin.X(), bMin.Y(), bMax.Z()));
        this.Ymax =bMax.Y()
    this.Ysize = bMin.Y()
    console.log("Ymax= "+ this.Ymax)
    console.log("Ysize ="+ this.Ysize )
        // Register it to ValjangEngine
        if (this._uiSculptBoundary != null) {
            this._uiSculptBoundary.dispose();
            this._uiSculptBoundary = null;
            
        }
        this._uiSculptBoundary = ValjangEngine.Mesh.CreateLines("UISculptBoundary", boxVertices, this._scene);
        this._uiSculptBoundary.isVisible = true;

    
    };
    AppMain.prototype.ReadaptToModelSize = function () {
        // Get model size (to adjust sculpting radius)
        var firstMeshBBox = this._meshItem.GetBBox();
        this._modelRadius = Math.max(Math.max(firstMeshBBox.Extents().X(), firstMeshBBox.Extents().Y()), firstMeshBBox.Extents().Z());
        this._sculptingRadius = this._modelRadius * this._uiSculptingSize;
        var boundFirstMin = firstMeshBBox.Min();
        var boundFirstMax = firstMeshBBox.Max();
        var boundMin = new ValjangEngine.Vector3(boundFirstMin.X(), boundFirstMin.Y(), boundFirstMin.Z());
        var boundMax = new ValjangEngine.Vector3(boundFirstMax.X(), boundFirstMax.Y()*2, boundFirstMax.Z());




       firstMeshBBox.delete();
      
        if (this._isInCombineMode && this._meshToCombine) {
            var secondMeshBoundingInfo = this._meshToCombine.getBoundingInfo();
            var secondMeshMatrix = this._meshToCombine.getWorldMatrix();
            var secondMeshMinBound = ValjangEngine.Vector3.TransformCoordinates(secondMeshBoundingInfo.minimum, secondMeshMatrix);
            var secondMeshMaxBound = ValjangEngine.Vector3.TransformCoordinates(secondMeshBoundingInfo.maximum, secondMeshMatrix);
            boundMin.x = Math.min(boundMin.x, secondMeshMinBound.x);
            boundMin.y = Math.min(boundMin.y, secondMeshMinBound.y);
            boundMin.z = Math.min(boundMin.z, secondMeshMinBound.z);
            boundMax.x = Math.max(boundMax.x, secondMeshMaxBound.x);
            boundMax.y = Math.max(boundMax.y, secondMeshMaxBound.y);
            boundMax.z = Math.max(boundMax.z, secondMeshMaxBound.z);
            var delta = boundMax.subtract(boundMin);
          
        }
        
       
        // Retarget camera
        this._camera.setTarget(new ValjangEngine.Vector3((boundMin.x + boundMax.x) * 0.5, (boundMin.y + boundMax.y) * 0.5, (boundMin.z + boundMax.z) * 0.5));
        this._camera.minZ = 0;
        this._camera.radius = this._modelRadius * 3.4;
        this._camera.lowerRadiusLimit = this._camera.radius * 0.5;
        this._camera.upperRadiusLimit = this._camera.radius * 2.0;

        //console.log("Raduis Objet :"+this._modelRadius)
        //console.log("Valeur Max: "+boundMin +" et Valeur Min : "+boundMax )

       console.log("Taille profondeur: "+ boundMax.x*2 + " mm")
       console.log("Taille Largeur: "+ boundMax.z*2 + " mm")
       console.log("Taille Hauteur: "+ boundMax.Y*2 + " mm")
     

    };



AppMain.prototype.GenRegle = function(){
    var materialPlane = new ValjangEngine.StandardMaterial("texturePlane", this._scene);
    materialPlane.diffuseTexture = new ValjangEngine.Texture("re.png", this._scene);
    materialPlane.specularColor = new ValjangEngine.Color3(0 ,0, 0);
   materialPlane.diffuseTexture.hasAlpha = true;
    
    //materialPlane.backFaceCulling = true;//Allways show the front and the back of an element
    
    //Creation of a plane
    var plane = ValjangEngine.Mesh.CreatePlane("Regle", this._modelRadius*4, this._scene);
    //plane.rotation.x = Math.PI / 2;
    plane.material = materialPlane;
    plane.position.y =-1
    
    plane.position.x =200
    plane.rotation.y= Math.PI / 2;
    plane.position.y =-1
//----------------------REGLE 2--------------------------------
var materialPlane2 = new ValjangEngine.StandardMaterial("texturePlane", this._scene);
materialPlane2.diffuseTexture = new ValjangEngine.Texture("re.png", this._scene);
materialPlane2.specularColor = new ValjangEngine.Color3(0 ,0, 0);
materialPlane2.diffuseTexture.hasAlpha = true;

//materialPlane.backFaceCulling = true;//Allways show the front and the back of an element

//Creation of a plane
var plane2 = ValjangEngine.Mesh.CreatePlane("Regle", this._modelRadius*4, this._scene);
//plane.rotation.x = Math.PI / 2;
plane2.material = materialPlane2;
plane2.position.y =-1

plane2.position.x =0
plane2.rotation.y= Math.PI / 1;
plane2.position.z = -200

plane2.position.y =-1
//----------------------REGLE 3--------------------------------
var materialPlane3 = new ValjangEngine.StandardMaterial("texturePlane", this._scene);
materialPlane3.diffuseTexture = new ValjangEngine.Texture("re.png", this._scene);
materialPlane3.specularColor = new ValjangEngine.Color3(0 ,0, 0);
materialPlane3.diffuseTexture.hasAlpha = true;

//materialPlane.backFaceCulling = true;//Allways show the front and the back of an element

//Creation of a plane
var plane3 = ValjangEngine.Mesh.CreatePlane("Regle", this._modelRadius*4, this._scene);
//plane.rotation.x = Math.PI / 2;
plane3.material = materialPlane3;
plane3.position.y =-1

plane3.position.x =-0
plane3.position.z = 200
plane3.rotation.y= Math.PI / 200;

plane3.position.y =-1


}

///FLECHE
AppMain.prototype.Genfleche = function(){

//Fleche Y
    var materialfleche = new ValjangEngine.StandardMaterial("texturePlane", this._scene);
    materialfleche.diffuseTexture = new ValjangEngine.Texture("Y.png", this._scene);
    materialfleche.specularColor = new ValjangEngine.Color3(0, 100, 0);
    materialfleche.diffuseTexture.hasAlpha = true;
    
    //materialPlane.backFaceCulling = true;//Allways show the front and the back of an element
    
    //Creation of a plane
    var plane = ValjangEngine.Mesh.CreatePlane("Plane", this._modelRadius*2, this._scene);
    //plane.rotation.x = Math.PI / 2;
    plane.material = materialfleche;
    plane.position.y =-100
    
    plane.position.x =200
    plane.rotation.y= Math.PI / 2;
  //  plane.position.y =-1
    
    //fleche X

    
    var materialflecheX = new ValjangEngine.StandardMaterial("texturePlaneX", this._scene);
    materialflecheX.diffuseTexture = new ValjangEngine.Texture("X.png", this._scene);
    materialflecheX.specularColor = new ValjangEngine.Color3(100, 0, 0);
    materialflecheX.diffuseTexture.hasAlpha = true;
    
    //materialPlane.backFaceCulling = true;//Allways show the front and the back of an element
    
    //Creation of a plane
    var plane2 = ValjangEngine.Mesh.CreatePlane("Plane2", this._modelRadius*2, this._scene);
    //plane.rotation.x = Math.PI / 2;
    plane2.material = materialflecheX;
    plane2.position.y =-200
    plane2.rotation.z = Math.PI / 2;
    plane2.position.x =200
    plane2.rotation.y= Math.PI / 2;
    plane2.position.z =100






    //Fleche Z



    var materialflecheZ = new ValjangEngine.StandardMaterial("texturePlaneZ", this._scene);
    materialflecheZ.diffuseTexture = new ValjangEngine.Texture("Z.png", this._scene);
    materialflecheZ.specularColor = new ValjangEngine.Color3(0, 0, 100);
    materialflecheZ.diffuseTexture.hasAlpha = true;
    
    //materialPlane.backFaceCulling = true;//Allways show the front and the back of an element
    console.log("Raduis x2:"+this._modelRadius*2)
    //Creation of a plane
    var plane2 = ValjangEngine.Mesh.CreatePlane("Plane2", this._modelRadius*2, this._scene);
    //plane.rotation.x = Math.PI / 2;
    plane2.material = materialflecheZ;
   
    plane2.rotation.z = Math.PI / 1;

    plane2.rotation.y= Math.PI / 2;
  
    plane2.rotation.x = Math.PI / 2;


    plane2.position.y =-200
    
    plane2.position.x =100
    plane2.rotation.y= Math.PI / 2;
    
        }


















AppMain.prototype.Gengrille = function(){


var materialPlane = new ValjangEngine.StandardMaterial("texturePlane", this._scene);
materialPlane.diffuseTexture = new ValjangEngine.Texture("grille.png", this._scene);
materialPlane.specularColor = new ValjangEngine.Color3(1, 1, 1);
materialPlane.diffuseTexture.hasAlpha = true;

//materialPlane.backFaceCulling = true;//Allways show the front and the back of an element

//Creation of a plane
var plane = ValjangEngine.Mesh.CreatePlane("Plane", this._modelRadius*4, this._scene);
plane.rotation.x = Math.PI / 2;
plane.material = materialPlane;
plane.position.y =-200




    }
    AppMain.prototype.GetCurMeshItem = function () {
        return this._meshItem;
    };
    AppMain.prototype.GetCurMeshItemToCombine = function () {
        return this._meshItemToCombine;
    };
    AppMain.prototype.ClearMeshItemToCombine = function (eraseData) {
        if (this._meshItemToCombine != null) {
            if (eraseData)
                this._meshItemToCombine.delete();
            this._meshItemToCombine = null;
            
        }
    };
    AppMain.prototype.IsInCombineMode = function () {
       
      

        //BOUCLE
       
if(this._isInCombineMode){
    
    var firstMeshBBox = this._meshItem.GetBBox();
    this._modelRadius = Math.max(Math.max(firstMeshBBox.Extents().X(), firstMeshBBox.Extents().Y()), firstMeshBBox.Extents().Z());
    this._sculptingRadius = this._modelRadius * this._uiSculptingSize;
    var boundFirstMin = firstMeshBBox.Min();
    var boundFirstMax = firstMeshBBox.Max();
    var boundMin = new ValjangEngine.Vector3(boundFirstMin.X(), boundFirstMin.Y(), boundFirstMin.Z());
    var boundMax = new ValjangEngine.Vector3(boundFirstMax.X(), boundFirstMax.Y(), boundFirstMax.Z());
    firstMeshBBox.delete();
    if (this._isInCombineMode && this._meshToCombine) {
        var secondMeshBoundingInfo = this._meshToCombine.getBoundingInfo();
        var secondMeshMatrix = this._meshToCombine.getWorldMatrix();
        var secondMeshMinBound = ValjangEngine.Vector3.TransformCoordinates(secondMeshBoundingInfo.minimum, secondMeshMatrix);
        var secondMeshMaxBound = ValjangEngine.Vector3.TransformCoordinates(secondMeshBoundingInfo.maximum, secondMeshMatrix);
        boundMin.x = Math.min(boundMin.x, secondMeshMinBound.x);
        boundMin.y = Math.min(boundMin.y, secondMeshMinBound.y);
        boundMin.z = Math.min(boundMin.z, secondMeshMinBound.z);
        boundMax.x = Math.max(boundMax.x, secondMeshMaxBound.x);
        boundMax.y = Math.max(boundMax.y, secondMeshMaxBound.y);
        boundMax.z = Math.max(boundMax.z, secondMeshMaxBound.z);
        var delta = boundMax.subtract(boundMin);
        this._modelRadius = Math.max(Math.max(delta.x, delta.y), delta.z) * 0.5;
    }
    // Retarget camera
    this._camera.setTarget(new ValjangEngine.Vector3((boundMin.x + boundMax.x) * 0.5, (boundMin.y + boundMax.y) * 0.5, (boundMin.z + boundMax.z) * 0.5));
    this._camera.minZ = 0;
    this._camera.radius = this._modelRadius * 3.4;
    this._camera.lowerRadiusLimit = this._camera.radius * 0.5;
    this._camera.upperRadiusLimit = this._camera.radius * 2.0;
    

};




        return this._isInCombineMode;
      
    };
    AppMain.prototype.StartCombineToSceneMode = function (meshItemToCombine) {
        
    
        
        
        
        if (meshItemToCombine == null)
        
            return;
            
        this._cameraHasToSpin = false; // Strop camera spinning, if user starts to interact
        this._meshItemToCombine = meshItemToCombine;
        // Hide ring cursor
        this._uiRingCursor.isVisible = false;
        // Create ValjangEngine mesh
        var meshData = new ValjangEngine.VertexData();
        var buf = this._meshItemToCombine.Triangles();
        var triangles = new Int32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
        buf = this._meshItemToCombine.Vertices();
        var vertices = new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
        buf = this._meshItemToCombine.Normals();
        var normals = new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
        meshData.indices = triangles;
        meshData.positions = vertices;
        meshData.normals = normals;
        this._meshToCombine = new ValjangEngine.Mesh("newMesh", this._scene);
        this._meshToCombine.sideOrientation = ValjangEngine.Mesh.FRONTSIDE;
        this._meshToCombine.isPickable = true;
        meshData.applyToMesh(this._meshToCombine, false);
        // Position mesh to combine

        var bbox = this._meshItem.GetBBox();
        var firstModelRadius = Math.max(Math.max(bbox.Extents().X(), bbox.Extents().Y()), bbox.Extents().Z());
        bbox.delete();
        bbox = this._meshItemToCombine.GetBBox();
        var secondModelRadius = Math.max(Math.max(bbox.Extents().X(), bbox.Extents().Y()), bbox.Extents().Z());
        bbox.delete();
        bbox = null;
        var positionShift = firstModelRadius + secondModelRadius;
        var position = ValjangEngine.Vector3.Up(); //this._camera.getWorldMatrix().getRow(0).toVector3();
       
        position.scaleInPlace(positionShift);
        this._meshToCombine.position = position;
        
        this._meshToCombine.computeWorldMatrix(true);
        this._isInCombineMode = true;
        this.ReadaptToModelSize();
       // position.scaleInPlace(this._uiRingCursor.position);
        // Set manipulator to handle that object
        this._manipulator.ForceMeshSelection(this._meshToCombine);
        this._manipulator.Start();
    };
    AppMain.prototype.StopCombineToSceneMode = function () {
        
        if (this._isInCombineMode) {
         
            this.ClearMeshItemToCombine(true);
           this._manipulator.Stop();
            this._meshToCombine.dispose();
            this._meshToCombine = null;
            this._uiRingCursor.isVisible = true;
            this._isInCombineMode = false;
           // this.ReadaptToModelSize();
           
        }
        //limite tempon 
// BUG A CORRIGER !
        if(this._modelRadius >this.raduislimit){
            console.log("Aie ! Tu à depassé la limite !")
            AppSDK_Undo()
            
        }else if (this._modelRadius > Ysize) {
            console.log("Aie ! Tu à depassé la limite !")
            AppSDK_Undo()
        }
            
        
    };

    AppMain.prototype.DoCSGOperation = function (opType) {
        var that = this;
        setTimeout(function () {
            var babWorldMtx = that._meshToCombine.getWorldMatrix();
            var otherMeshPos = new Module.Vector3(babWorldMtx.getTranslation().x, babWorldMtx.getTranslation().y, babWorldMtx.getTranslation().z);
            var otherMeshRight = new Module.Vector3(babWorldMtx.getRow(0).x, babWorldMtx.getRow(1).x, babWorldMtx.getRow(2).x);
            var otherMeshUp = new Module.Vector3(babWorldMtx.getRow(0).y, babWorldMtx.getRow(1).y, babWorldMtx.getRow(2).y);
            var otherMeshFront = new Module.Vector3(babWorldMtx.getRow(0).z, babWorldMtx.getRow(1).z, babWorldMtx.getRow(2).z);
            var otherMeshRotAndScale = new Module.Matrix3(otherMeshRight, otherMeshUp, otherMeshFront);
            switch (opType) {
                case CsgType.Merge:
                    that._meshItem.CSGMerge(that._meshItemToCombine, otherMeshRotAndScale, otherMeshPos, true);
                    break;
                case CsgType.Subtract:
                    that._meshItem.CSGSubtract(that._meshItemToCombine, otherMeshRotAndScale, otherMeshPos, true);
                    break;
                case CsgType.Intersect:
                    that._meshItem.CSGIntersect(that._meshItemToCombine, otherMeshRotAndScale, otherMeshPos, true);
                    break;
            }
            that.StopCombineToSceneMode();
            that.UpdateValjangEngineMesh();
            otherMeshPos.delete();
            otherMeshRight.delete();
            otherMeshUp.delete();
            otherMeshFront.delete();
            otherMeshRotAndScale.delete();
            AppSDK_EndCSGOperation();
        }, 100);
    };
    AppMain.prototype.CSGMerge = function () {
        this.DoCSGOperation(CsgType.Merge);
    };
    AppMain.prototype.CSGSubtract = function () {
        this.DoCSGOperation(CsgType.Subtract);
    };
    AppMain.prototype.CSGIntersect = function () {
        this.DoCSGOperation(CsgType.Intersect);
    };

    AppMain.prototype.limiteactualise = function(){
        this._meshItem.SetSculptingBoudary(sculptBound);
        this.CreateUISculptBoundary(sculptBound);
        
    }
    AppMain.prototype.CreateNewScene = function (meshItem) {
        if (this._meshItem != null)
            this._meshItem.delete();
        this._meshItem = meshItem;
        if (this._sculptLimitBoundingPercent > 100.0) {
            var meshBound = this._meshItem.GetBBox();
            var bMin = meshBound.Min();
            var bMax = meshBound.Max();
            var scaleRatio = this._sculptLimitBoundingPercent / 100.0;
            var sculptBound = new Module.BBox(new Module.Vector3(bMin.X() * scaleRatio, bMin.Y() * scaleRatio, bMin.Z() * scaleRatio), new Module.Vector3(bMax.X() * scaleRatio, bMax.Y() * scaleRatio, bMax.Z() * scaleRatio));
            this._meshItem.SetSculptingBoudary(sculptBound);
            this.CreateUISculptBoundary(sculptBound);
         
        }
        this._cameraHasToSpin = true;
        //this._meshItem.SetBBoxRenderer(this._DEBUG_BoundingBoxRenderer);
        if (this._brushDraw != null)
            this._brushDraw.delete();
        this._brushDraw = new Module.BrushDraw(this._meshItem);
        if (this._brushFlatten != null)
            this._brushFlatten.delete();
        this._brushFlatten = new Module.BrushFlatten(this._meshItem);
        if (this._brushDrag != null)
            this._brushDrag.delete();
        this._brushDrag = new Module.BrushDrag(this._meshItem);
        if (this._brushDig != null)
            this._brushDig.delete();
        this._brushDig = new Module.BrushDig(this._meshItem);
        this._material = new ValjangEngine.StandardMaterial("meshMaterial", this._scene);
        //this._scene.ambientColor = new ValjangEngine.Color3(0.4, 0.4, 0.4);
        //this._material.ambientColor = new ValjangEngine.Color3(90.0 / 255.0, 90.0 / 255.0, 90.0 / 255.0);
       // this._material.emissiveColor = new ValjangEngine.Color3(50.0 / 255.0, 25.0 / 255.0, 0.0 / 255.0);
        this._material.diffuseColor = new ValjangEngine.Color3(240.0 / 255.0, 220.0 / 255.0, 200.0 / 255.0);
        this._material.specularColor = new ValjangEngine.Color3(200.0 / 255.0, 200.0 / 255.0, 200.0 / 255.0);
        this._material.specularPower = 100;
        this._material.backFaceCulling = true;
        this._material.freeze();
        if (this._useSubMeshes == false) {
            var meshData = new ValjangEngine.VertexData();
            var buf = this._meshItem.Triangles();
            var triangles = new Int32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
            buf = this._meshItem.Vertices();
            var vertices = new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
            buf = this._meshItem.Normals();
            var normals = new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
            meshData.indices = triangles;
            meshData.positions = vertices;
            meshData.normals = normals;
            if (this._mesh == null) {
                this._mesh = new ValjangEngine.Mesh("mesh", this._scene);
                this._mesh.freezeWorldMatrix();
                this._mesh.material = this._material;
               // this._mesh.material.freeze();
            }
            this._mesh.sideOrientation = ValjangEngine.Mesh.FRONTSIDE;
            this._mesh.isPickable = false;
            meshData.applyToMesh(this._mesh, true);
        }
        else
            this.UpdateValjangEngineMesh();
        // Update model size, sculpting radius, camera placement
        this.ReadaptToModelSize();
        // Show cursor
        this._uiRingCursor.isVisible = true;
        //appelle fonction  this.Gengrille()
    
        this.Gengrille()
        this.GenRegle()
        this.Genfleche()
this.raduislimit = this._modelRadius*2

        
    };
    AppMain.prototype.GenSphere = function () {
        var generator = new Module.GenSphere();
        var mesh = generator.Generate(100);
       
        generator.delete();
        
        return mesh;
    };
    AppMain.prototype.GenBox = function () {
        var generator = new Module.GenBox();
        var mesh = generator.Generate(180.0, 100.0, 100.0);
        generator.delete();
        return mesh;
    };
    AppMain.prototype.GenCylinder = function () {
        var generator = new Module.GenCylinder();
        var mesh = generator.Generate(180.0, 50.0);
        generator.delete();
        return mesh;
    };
    AppMain.prototype.GenCube = function () {
        var generator = new Module.GenBox();
        var mesh = generator.Generate(100.0, 100.0, 100.0);
        generator.delete();
        return mesh;
    };
    AppMain.prototype.GenPyramid = function () {
        var generator = new Module.GenPyramid();
        var mesh = generator.Generate(100.0, 150.0, 100.0);
        generator.delete();
        return mesh;
    };
    AppMain.prototype.GenDisk = function () {
        var generator = new Module.GenCylinder();
        var mesh = generator.Generate(10.0, 100.0);
        generator.delete();
        return mesh;
    };
    AppMain.prototype.SaveToFile = function (fileName, fileExt) {
        saveAs(this.SaveToBlob(fileExt), fileName + "." + fileExt);
    };
    AppMain.prototype.SetSculptLimitBoundingPercent = function (percent) {
        this._sculptLimitBoundingPercent = percent;
    };
    AppMain.prototype.SetCameraSpinningSpeed = function (speed) {
        this._cameraSpinningSpeed = speed;
    };
    AppMain.prototype.SaveToBlob = function (fileExt) {
        var bbox = this._meshItem.GetBBox();
        var bboxSize = bbox.Size();
        var maxSideSize = Math.max(bboxSize.X(), Math.max(bboxSize.Y(), bboxSize.Z()));
        var scaleToTenCentimeter = 1.0; //100.0 / maxSideSize;
        var meshRecorder = new Module.MeshRecorder();
        var babMeshTransform = ValjangEngine.Matrix.RotationYawPitchRoll(0, Math.PI * 0.5, 0).multiply(ValjangEngine.Matrix.Scaling(scaleToTenCentimeter, scaleToTenCentimeter, scaleToTenCentimeter));
        var meshTransformRight = new Module.Vector3(babMeshTransform.getRow(0).x, babMeshTransform.getRow(1).x, babMeshTransform.getRow(2).x);
        var meshTransformUp = new Module.Vector3(babMeshTransform.getRow(0).y, babMeshTransform.getRow(1).y, babMeshTransform.getRow(2).y);
        var meshTransformFront = new Module.Vector3(babMeshTransform.getRow(0).z, babMeshTransform.getRow(1).z, babMeshTransform.getRow(2).z);
        var meshTransform = new Module.Matrix3(meshTransformRight, meshTransformUp, meshTransformFront);
        meshRecorder.SetTransformMatrix(meshTransform);
        var objStringFileData = meshRecorder.SaveToTextBuffer(window.app.GetCurMeshItem(), fileExt);
        meshRecorder.delete();
        var objBinFileData = new Uint8Array(objStringFileData.length);
        for (var i = 0; i < objStringFileData.length; ++i)
            objBinFileData[i] = objStringFileData.charCodeAt(i);
        return new Blob([objBinFileData], { type: "application/octet-binary" });
    };
    AppMain.prototype.UpdateValjangEngineMesh = function () {
       
        if (this._useSubMeshes) {
            // Update sub meshes internal structure
            this._meshItem.UpdateSubMeshes();
            // Update it to ValjangEngine



            
            for (var i = 0; i < this._meshItem.GetSubMeshCount(); ++i) {
                var submesh = this._meshItem.GetSubMesh(i);
                var subMeshID = submesh.GetID().toString();
                if (this._ValjangEngineSubMeshes.hasOwnProperty(subMeshID))
                    this._ValjangEngineSubMeshes[subMeshID].Update();
                else
                    this._ValjangEngineSubMeshes[subMeshID] = new ValjangEngineSubMesh(this._scene, null, submesh, this._material);
            }
            // Remove submeshes that were deleted
            for (var key in this._ValjangEngineSubMeshes) {
                if (this._ValjangEngineSubMeshes.hasOwnProperty(key)) {
                    if (this._meshItem.IsSubMeshExist(this._ValjangEngineSubMeshes[key].GetID()) == false) {
                        this._ValjangEngineSubMeshes[key].Cleanup();
                        delete this._ValjangEngineSubMeshes[key];
                    }
                }
            }
            
        }
        else {
            var buf = this._meshItem.Triangles();
            var triangles = new Uint32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
            buf = this._meshItem.Vertices();
            var vertices = new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
            buf = this._meshItem.Normals();
            var normals = new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
            // Vertices and normals
            if (this._mesh._geometry.getTotalVertices() < vertices.length / 3) {
                this._mesh.setVerticesData(ValjangEngine.VertexBuffer.PositionKind, vertices, true);
                this._mesh.setVerticesData(ValjangEngine.VertexBuffer.NormalKind, normals, true);
            }
            else {
                this._mesh.updateVerticesData(ValjangEngine.VertexBuffer.PositionKind, vertices, false, false);
                this._mesh.updateVerticesData(ValjangEngine.VertexBuffer.NormalKind, normals, false, false);
            }
            // Triangle indices
            this._mesh.setIndices(triangles);
        }
    };

 
   
    AppMain.prototype.createScene = function () {
        var _this = this;
        // create a basic BJS Scene object
        this._scene = new ValjangEngine.Scene(this._engine);
        this._scene.useRightHandedSystem = true;
        //this._DEBUG_BoundingBoxRenderer = new ValjangEngine.BoundingBoxRenderer(this._scene);
        //this._scene.debugLayer.show(true);
        //this._scene.clearColor = new ValjangEngine.Color3(0.2, 0.2, 0.2);
        // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
        this._camera = new ValjangEngine.ArcRotateCamera("Camera", Math.PI / 2, 0.8, 3, ValjangEngine.Vector3.Zero(), this._scene);
        this._camera.lowerRadiusLimit = 3;
        this._camera.upperRadiusLimit = 3;
        // target the camera to scene origin
        this._camera.setTarget(ValjangEngine.Vector3.Zero());
        // attach the camera to the canvas
        this._camera.attachControl(this._canvas, false);
        // create a basic light, aiming 0,1,0 - meaning, to the sky

       // POUR DEMO A SUPPRIMER 
       // Load3DModel('bust.stl');


//lumiere color et back 

        this._light = new ValjangEngine.PointLight('light1', new ValjangEngine.Vector3(0, 1, 0), this._scene);
        this._light.diffuse = new ValjangEngine.Color3(0.5, 0.5, 0.5);
        // Ring cursor
        this.CreateUIRingCursor();
        // Create move, rot, scale manipulator
        this._manipulator = new Manipulator(this._engine, this._scene, this._camera);
        // Create starting model
        Module.SculptEngine.SetTriangleOrientationInverted(true);
    
        // Bbox update
        //this.showBBoxes();
        // Set the target of the camera to the first imported mesh
        if ((this._useSubMeshes == false) && (this._meshItem != null))
            this._camera.target = this._mesh.position;
        else
            this._camera.target = ValjangEngine.Vector3.Zero();
        // Set background color
        this._scene.clearColor.r = 140/ 255;
        this._scene.clearColor.g = 175/ 255;
        this._scene.clearColor.b = 175/ 255;
        // Move the light with the camera
        this._scene.registerBeforeRender(function () {
            _this._light.position = _this._camera.position;
            
            if (_this.IsInCombineMode()) {
            
            }
            else if (_this._meshItem != null) {
                /*let mat: ValjangEngine.Matrix = this._camera.getWorldMatrix();
                this._light.position = this._camera.position.add(mat.getRow(0).toVector3().scale(this._modelRadius * 2)).add(mat.getRow(1).toVector3().scale(this._modelRadius * 2));*/
                if (_this._sculptPoint != null) {
                    _this.Sculpt(_this._sculptPoint);
                    if (_this._brushType != BrushType.Drag)
                        _this._sculptPoint = null;
                }
                // Update cursor
             //   UPDATE CERCLE
                var babRay = _this._scene.createPickingRay(_this._uiCursorScreenPos.x, _this._uiCursorScreenPos.y, null, _this._camera);
                var intersection = new Module.Vector3(0, 0, 0);
                var intersectionNormal = new Module.Vector3(0, 0, 0);
                var rayOrigin = new Module.Vector3(babRay.origin.x, babRay.origin.y, babRay.origin.z);
                var rayDirection = new Module.Vector3(babRay.direction.x, babRay.direction.y, babRay.direction.z);
                var ray = new Module.Ray(rayOrigin, rayDirection, _this._rayLength);
                if (_this._meshItem.GetClosestIntersectionPoint(ray, intersection, intersectionNormal, true)) {
                    var at = new ValjangEngine.Vector3(intersectionNormal.X(), intersectionNormal.Y(), intersectionNormal.Z());
                    var up = ValjangEngine.Vector3.Up(); // 0, 1, 0
                    if (Math.abs(ValjangEngine.Vector3.Dot(up, at)) > 0.95)
                        up = ValjangEngine.Vector3.Right(); // 1, 0, 0
                    var left = ValjangEngine.Vector3.Cross(up, at);
                    left.normalize();
                    up = ValjangEngine.Vector3.Cross(left, at);
                    up.normalize();
                    var mat = new ValjangEngine.Matrix();
                    ValjangEngine.Matrix.FromXYZAxesToRef(left.scale(_this._sculptingRadius), at.scale(_this._sculptingRadius), up.scale(_this._sculptingRadius), mat);
                   //posision cecle
                    mat.setTranslation(new ValjangEngine.Vector3(intersection.X(), intersection.Y(), intersection.Z()));
                    _this._uiRingCursor.setPivotMatrix(mat);
                }
               
            }
        });
        

        // input events
        this._scene.onPointerDown = function (e, p) {
            if (_this.IsInCombineMode()) {
               
                _this._manipulator.onPointerDown(e, p);
            }
            else if (_this._meshItem != null) {
                var babRay = _this._scene.createPickingRay(e.clientX, e.clientY, null, _this._camera);
                var intersection = new Module.Vector3(0, 0, 0);
                var rayOrigin = new Module.Vector3(babRay.origin.x, babRay.origin.y, babRay.origin.z);
                var rayDirection = new Module.Vector3(babRay.direction.x, babRay.direction.y, babRay.direction.z);
                var ray = new Module.Ray(rayOrigin, rayDirection, _this._rayLength);
                // we pick an object, activate sculpting
                if (_this._meshItem.GetClosestIntersectionPoint(ray, intersection, null, true)) {
                    _this._camera.detachControl(_this._canvas);
                    _this._sculpting = true;
                    _this._cameraHasToSpin = false; // Strop camera spinning, if user starts to interact
                    switch (_this._brushType) {
                        case BrushType.Draw:
                            _this._brushDraw.StartStroke();
                            break;
                        case BrushType.Flatten:
                            _this._brushFlatten.StartStroke();
                            break;
                        case BrushType.Drag:
                            _this._brushDrag.StartStroke();
                            break;
                        case BrushType.Dig:
                            _this._brushDig.StartStroke();
                            break;
                    }
                    _this._lastSculptPoint = new ValjangEngine.Vector2(e.clientX, e.clientY);
                }
                ray.delete();
                rayDirection.delete();
                rayOrigin.delete();
                intersection.delete();
                
            }
        };
        this._scene.onPointerMove = function (e, p) {
            if (_this.IsInCombineMode()) {
                _this._manipulator.onPointerMove(e, p);
            }
            else if (_this._meshItem != null) {
                if (_this._sculpting)
                    _this._sculptPoint = new ValjangEngine.Vector2(e.clientX, e.clientY);
                _this._uiCursorScreenPos.x = e.clientX;
                _this._uiCursorScreenPos.y = e.clientY;
                if (((e.buttons & 1) == 0) && _this._sculpting)
                    _this._scene.onPointerUp(e, p);
            }
        };
        this._scene.onPointerUp = function (e, p) {
            if (_this.IsInCombineMode()) {
                _this._manipulator.onPointerUp(e, p);
            }
            else if (_this._meshItem != null) {
                if (_this._sculpting) {
                    _this._camera.attachControl(_this._canvas, true);
                    _this._sculpting = false;
                    _this._sculptPoint = null;
                    switch (_this._brushType) {
                        case BrushType.Draw:
                            _this._brushDraw.EndStroke();
                            break;
                        case BrushType.Flatten:
                            _this._brushFlatten.EndStroke();
                            break;
                        case BrushType.Drag:
                            _this._brushDrag.EndStroke();
                            break;
                        case BrushType.Dig:
                            _this._brushDig.EndStroke();
                            break;
                         
                    }
                    // Update model size, sculpting radius, camera placement
                    //this.ReadaptToModelSize();
                    // Call external code to do on stroke ending
                    AppSDK_EndStroke();
                }
            }
        };
    };
    AppMain.prototype.animate = function () {
        var _this = this;
        // run the render loop
        this._engine.runRenderLoop(function () {
            if (_this._cameraHasToSpin && (_this._cameraSpinningSpeed > 0.0) && (_this._camera != null))
                _this._camera.alpha += _this._cameraSpinningSpeed * (_this._engine.getDeltaTime() / 1000.0) * (Math.PI / 180.0);
            _this._scene.render();
            //this._DEBUG_BoundingBoxRenderer.render();
        });
        // the canvas/window resize event handler
        window.addEventListener('resize', function () {
            _this._engine.resize();
        });
    };
    AppMain.prototype.clamp = function (value, min, max) {
        return Math.min(Math.max(value, min), max);
    };
    AppMain.prototype.Sculpt = function (screenPoint) {
        var babRay = this._scene.createPickingRay(screenPoint.x, screenPoint.y, null, this._camera);
        var intersection = new Module.Vector3(0, 0, 0);
        var rayOrigin = new Module.Vector3(babRay.origin.x, babRay.origin.y, babRay.origin.z);
        var rayDirection = new Module.Vector3(babRay.direction.x, babRay.direction.y, babRay.direction.z);
        var ray = new Module.Ray(rayOrigin, rayDirection, this._rayLength);
        switch (this._brushType) {
            case BrushType.Draw:
                this._brushDraw.UpdateStroke(ray, this._sculptingRadius, this._sculptingStrengthRatio);
                break;
            case BrushType.Flatten:
                this._brushFlatten.UpdateStroke(ray, this._sculptingRadius, this._sculptingStrengthRatio);
                break;
            case BrushType.Drag:
                this._brushDrag.UpdateStroke(ray, this._sculptingRadius, this._sculptingStrengthRatio);
                break;
            case BrushType.Dig:
                this._brushDig.UpdateStroke(ray, this._sculptingRadius, this._sculptingStrengthRatio);
                break;
        }

     
        ray.delete();
        rayDirection.delete();
        rayOrigin.delete();
        intersection.delete();
        // Mesh update
        //Bloque model ici
      

                this.UpdateValjangEngineMesh();
            
            
      
   
        // Bbox update
        //this.showBBoxes();
    };
    
    return AppMain;
}());
//# sourceMappingURL=app.js.map